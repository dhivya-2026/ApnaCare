import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EnquiryForm } from "@/components/site/EnquiryForm";

describe("EnquiryForm (Quick Callback & Time Slot Booking)", () => {
  it("renders both 'Request a Callback' and 'Book a Time Slot' buttons", () => {
    const html = renderToString(<EnquiryForm title="Quick Callback Request" />);

    // 1. Verify "Request a Callback" button exists and is a submit button
    expect(html).toContain("Request a Callback");
    expect(html).toContain('type="submit"');

    // 2. Verify "Book a Time Slot" button exists
    expect(html).toContain("Book a Time Slot");

    // 3. Verify Google Calendar booking link is correct with target="_blank" and rel="noopener noreferrer"
    expect(html).toContain('href="https://calendar.app.google/tZ4exnXrAWnu9PuQ9"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');

    // 4. Verify responsive layout classes are present (stacks on mobile, row on sm screens)
    expect(html).toContain("flex-col sm:flex-row");
  });

  it("supports custom bookingUrl prop if provided", () => {
    const customUrl = "https://calendar.app.google/customTest";
    const html = renderToString(
      <EnquiryForm title="Quick Callback Request" bookingUrl={customUrl} />
    );

    expect(html).toContain(`href="${customUrl}"`);
    expect(html).toContain("Book a Time Slot");
  });

  it("maintains all required input form fields", () => {
    const html = renderToString(<EnquiryForm title="Quick Callback Request" />);

    // Verify Name, Phone, Service, and Message fields are present
    expect(html).toContain('id="enq-name"');
    expect(html).toContain('id="enq-phone"');
    expect(html).toContain('id="enq-service"');
    expect(html).toContain('id="enq-message"');
    expect(html).toContain("+91");
  });
});
