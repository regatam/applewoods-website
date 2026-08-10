import assert from "node:assert/strict";
import test from "node:test";
import handler, { __testables } from "../api/lead.js";

const validBody = {
  fullName: "Test Lead",
  phone: "9565550100",
  email: "lead@example.com",
  lotInterest: "standard",
  budget: "85-95",
  timeline: "soon",
  interestType: "availability",
  notes: "Preview test",
  lang: "en",
};

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    },
    end() {
      return this;
    },
  };
}

test("parses two comma-separated client recipients", () => {
  assert.deepEqual(
    __testables.parseRecipientEmails("first@example.com, second@example.com"),
    ["first@example.com", "second@example.com"]
  );
});

test("validates field lengths and enum values", () => {
  assert.equal(__testables.validateLead(validBody).lead.email, "lead@example.com");
  assert.equal(__testables.validateLead({ ...validBody, notes: "x".repeat(2_001) }).error, "notes is too long.");
  assert.equal(__testables.validateLead({ ...validBody, budget: "anything" }).error, "budget is invalid.");
});

test("rejects non-string fields and invalid phone values", () => {
  assert.equal(__testables.validateLead({ ...validBody, phone: ["9565550100"] }).error, "phone must be a string.");
  assert.equal(__testables.validateLead({ ...validBody, phone: "call-me" }).error, "Phone is invalid.");
  assert.equal(__testables.validateLead({ ...validBody, phone: "+52 (956) 555-0100" }).lead.phone, "+52 (956) 555-0100");
});

test("treats Resend error results as delivery failures", () => {
  assert.doesNotThrow(() => __testables.assertResendResults([{ data: { id: "email-id" }, error: null }]));
  assert.throws(
    () => __testables.assertResendResults([{ data: null, error: { message: "invalid recipient" } }]),
    /Resend rejected an email request/
  );
});

test("honeypot submissions return success without calling external services", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("External service should not be called");
  };

  try {
    const response = mockResponse();
    await handler(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { ...validBody, companyWebsite: "https://spam.example" },
      },
      response
    );
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { ok: true, suppressed: true });
    assert.equal(fetchCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("production fails closed when the Turnstile secret is missing", async () => {
  const previousEnvironment = process.env.VERCEL_ENV;
  const previousSecret = process.env.TURNSTILE_SECRET_KEY;
  process.env.VERCEL_ENV = "production";
  delete process.env.TURNSTILE_SECRET_KEY;

  try {
    const response = mockResponse();
    await handler(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: validBody,
      },
      response
    );
    assert.equal(response.statusCode, 503);
    assert.equal(response.body.ok, false);
  } finally {
    if (previousEnvironment === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previousEnvironment;
    if (previousSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = previousSecret;
  }
});

test("Turnstile verification sends the token and visitor IP to Siteverify", async () => {
  const previousSecret = process.env.TURNSTILE_SECRET_KEY;
  const originalFetch = globalThis.fetch;
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  let requestBody;

  globalThis.fetch = async (_url, options) => {
    requestBody = options.body;
    return { ok: true, json: async () => ({ success: true }) };
  };

  try {
    const result = await __testables.verifyTurnstile("test-token", {
      headers: { "x-forwarded-for": "203.0.113.2, 10.0.0.1" },
    });
    assert.equal(result.ok, true);
    assert.equal(requestBody.get("response"), "test-token");
    assert.equal(requestBody.get("remoteip"), "203.0.113.2");
  } finally {
    globalThis.fetch = originalFetch;
    if (previousSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = previousSecret;
  }
});
