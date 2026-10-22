// Automated verification suite for Luminous Digital Studio Enquiry API & Security Controls
import http from 'http';

function makeRequest({ method = 'POST', path = '/api/enquiry', headers = {}, body = '', ip = '127.0.0.1' }) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
      ...headers,
    };

    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method,
        headers: defaultHeaders,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(data);
          } catch {
            json = { raw: data };
          }
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        });
      }
    );

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING ENQUIRY API & SECURITY CONTROLS TEST SUITE ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // Test 1: Valid Enquiry Payload
    const res1 = await makeRequest({
      ip: '10.0.0.1',
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'alex.test@example.com',
        company: 'Concept Venture',
        services: ['Web Development', 'Digital Analytics'],
        budget: '$15,000 – $30,000',
        timeline: '1 – 3 Months',
        message: 'Evaluating platform redesign architecture.',
      }),
    });
    assert(res1.status === 200, `Valid payload returns 200 (Got: ${res1.status})`);
    assert(res1.body.ok === true, `Valid payload response has ok=true`);
    assert(
      res1.body.deliveryStatus === 'unconfigured_local_logged',
      `Honest deliveryStatus returned: ${res1.body.deliveryStatus}`
    );

    // Test 2: Missing Name
    const res2 = await makeRequest({
      ip: '10.0.0.2',
      body: JSON.stringify({
        name: '',
        email: 'alex.test@example.com',
        services: ['Web Development'],
      }),
    });
    assert(res2.status === 400, `Empty name returns 400 Bad Request (Got: ${res2.status})`);
    assert(res2.body.ok === false, `Empty name returns ok=false`);

    // Test 3: Invalid Email
    const res3 = await makeRequest({
      ip: '10.0.0.3',
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'invalid-email-address',
        services: ['Web Development'],
      }),
    });
    assert(res3.status === 400, `Invalid email returns 400 Bad Request (Got: ${res3.status})`);

    // Test 4: Missing Services Array
    const res4 = await makeRequest({
      ip: '10.0.0.4',
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'alex.test@example.com',
        services: [],
      }),
    });
    assert(res4.status === 400, `Empty services array returns 400 Bad Request (Got: ${res4.status})`);

    // Test 5: Malformed JSON Syntax (Task 1 Critical Requirement)
    const res5 = await makeRequest({
      ip: '10.0.0.5',
      body: '{"name": "Broken JSON, missing brace',
    });
    assert(
      res5.status === 400,
      `Malformed JSON returns 400 Bad Request instead of 500 (Got: ${res5.status})`
    );
    assert(
      res5.body.error === 'Malformed JSON payload in request body.',
      `Clean error message without stack trace: "${res5.body.error}"`
    );

    // Test 6: Anti-Spam Honeypot Field Populated (Task 3)
    const res6 = await makeRequest({
      ip: '10.0.0.6',
      body: JSON.stringify({
        name: 'Bot Spammer',
        email: 'spam@botnet.example',
        services: ['Web Development'],
        website: 'https://spam-link.ru', // Honeypot filled
      }),
    });
    assert(
      res6.status === 200,
      `Honeypot submission returns 200 silent acknowledge (Got: ${res6.status})`
    );
    assert(res6.body.ok === true, `Honeypot response looks normal to bot (ok=true)`);

    // Test 7: Oversized Payload Guard (> 64KB)
    const hugeMessage = 'A'.repeat(70 * 1024);
    const res7 = await makeRequest({
      ip: '10.0.0.7',
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'alex.test@example.com',
        services: ['Web Development'],
        message: hugeMessage,
      }),
    });
    assert(
      res7.status === 413,
      `Oversized payload (>64KB) rejected with 413 Payload Too Large (Got: ${res7.status})`
    );

    // Test 8: Rate Limiting Enforcement (> 5 requests on same IP)
    const burstIp = '192.168.10.99';
    let rateLimited = false;
    for (let i = 0; i < 6; i++) {
      const resRate = await makeRequest({
        ip: burstIp,
        body: JSON.stringify({
          name: 'Alex Johnson',
          email: 'alex.test@example.com',
          services: ['Web Development'],
        }),
      });
      if (resRate.status === 429) {
        rateLimited = true;
        break;
      }
    }
    assert(rateLimited === true, `Rate limit triggers 429 on excessive rapid submissions`);

    console.log(`\n=== ALL TESTS PASSED: ${passed} PASSED, ${failed} FAILED ===`);
    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error('Fatal test runner exception:', err);
    process.exit(1);
  }
}

runTests();
