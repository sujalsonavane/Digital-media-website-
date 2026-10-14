import { NextResponse } from 'next/server';

interface EnquiryPayload {
  name?: string;
  email?: string;
  company?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: EnquiryPayload = await request.json();

    const { name, email, company, services, budget, timeline, message } = body;

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    // Validate services
    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Please select at least one service category.' },
        { status: 400 }
      );
    }

    // Structured lead record
    const enquiryRecord = {
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || 'Not specified',
      services,
      budget: budget || 'Undisclosed',
      timeline: timeline || 'Standard',
      message: message?.trim() || 'No additional notes provided.',
      status: 'pending_review',
    };

    // In production, this can forward to Resend, SendGrid, Slack Webhook, or database
    console.log('[LUMINOUS INQUIRY RECEIVED]:', JSON.stringify(enquiryRecord, null, 2));

    return NextResponse.json(
      {
        ok: true,
        message: 'Your project brief has been received. Our team will review and reply within 24 hours.',
        enquiryId: enquiryRecord.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ENQUIRY API ERROR]:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error while processing your enquiry. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
