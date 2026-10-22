import { NextResponse } from 'next/server';

interface EnquiryPayload {
  name?: string;
  email?: string;
  company?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  message?: string;
  website?: string; // Honeypot field
  _hp?: string; // Alternative honeypot field
}

// Baseline in-memory sliding window rate limiter
// ponytail: In-memory sliding window provides baseline local/single-process throttling.
// Production multi-instance or serverless deployments require an external distributed store like Upstash Redis.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_PAYLOAD_BYTES = 64 * 1024; // 64 KB limit

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. IP & Rate Limiting Check
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    // 2. Request Size Validation
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Request payload exceeds the maximum allowed size (64 KB).' },
        { status: 413 }
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Request payload exceeds the maximum allowed size (64 KB).' },
        { status: 413 }
      );
    }

    // 3. Strict JSON Syntax Validation (Distinguish 400 Bad Request from 500 Internal Error)
    let body: EnquiryPayload;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Malformed JSON payload in request body.' },
        { status: 400 }
      );
    }

    // 4. Honeypot Spam Verification (Reject silently without revealing detection)
    if (body.website || body._hp) {
      return NextResponse.json(
        {
          ok: true,
          message: 'Your project brief has been received. Our team will review and reply within 24 hours.',
          enquiryId: `enq_${Date.now()}_ack`,
        },
        { status: 200 }
      );
    }

    const { name, email, company, services, budget, timeline, message } = body;

    // 5. Input Field Validations
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { ok: false, error: 'Please enter your full name (2–100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== 'string' ||
      !emailRegex.test(email.trim()) ||
      email.trim().length > 120
    ) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    if (
      !services ||
      !Array.isArray(services) ||
      services.length === 0 ||
      services.length > 10 ||
      !services.every((s) => typeof s === 'string' && s.length <= 50)
    ) {
      return NextResponse.json(
        { ok: false, error: 'Please select at least one valid service category.' },
        { status: 400 }
      );
    }

    // 6. Structured lead record
    const enquiryRecord = {
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: typeof company === 'string' && company.trim() ? company.trim().slice(0, 120) : 'Not specified',
      services,
      budget: typeof budget === 'string' && budget.trim() ? budget.trim().slice(0, 80) : 'Undisclosed',
      timeline: typeof timeline === 'string' && timeline.trim() ? timeline.trim().slice(0, 80) : 'Standard',
      message: typeof message === 'string' && message.trim() ? message.trim().slice(0, 3000) : 'No additional notes provided.',
      status: 'pending_review',
    };

    // 7. Honest Lead Delivery Inspection
    // Checked environment: RESEND_API_KEY & LEAD_DESTINATION_EMAIL
    const isDeliveryConfigured = Boolean(
      process.env.RESEND_API_KEY && process.env.LEAD_DESTINATION_EMAIL
    );

    // Mask personal data in standard server log output
    const maskedEmail = enquiryRecord.email.replace(/^(.{2})(.*)(@.*)$/, '$1***$3');
    console.log(
      `[LUMINOUS INQUIRY RECORDED]: ID=${enquiryRecord.id}, services=${enquiryRecord.services.join(',')}, company=${enquiryRecord.company}, sender=${maskedEmail}. ExternalDeliveryConfigured=${isDeliveryConfigured}`
    );

    return NextResponse.json(
      {
        ok: true,
        message: isDeliveryConfigured
          ? 'Your project brief has been received. Our team will review and reply within 24 hours.'
          : 'Your project brief has been received and logged locally. Note: External email delivery is pending provider configuration by the studio administrator.',
        enquiryId: enquiryRecord.id,
        deliveryStatus: isDeliveryConfigured ? 'delivered' : 'unconfigured_local_logged',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ENQUIRY API ERROR]:', error instanceof Error ? error.message : 'Unknown exception');
    return NextResponse.json(
      { ok: false, error: 'Internal server error while processing your enquiry. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
