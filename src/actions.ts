import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const GOOGLE_SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbxv4qQSDLdcOuS6Zuq49nsIigs1E8MZxsR2aiFiEa71UoOBktPPZ-QEa5qul-0hTIG2/exec";

export const submitWaitlist = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string }) => data)
  .handler(async ({ data }) => {
    try {
      // Save to Google Sheets
      await fetch(GOOGLE_SHEETS_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          source: "Waitlist",
          firstName: data.name,
          email: data.email,
        }),
      }).catch(err => console.error("Google Sheets Error:", err));

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to submit waitlist");
    }
  });

export const submitPartner = createServerFn({ method: "POST" })
  .validator((data: { firstName: string; lastName: string; email: string; inquiryType: string; message: string }) => data)
  .handler(async ({ data }) => {
    try {
      // 1. Send Email Notification
      const { data: resendData, error } = await resend.emails.send({
        from: "Internet Girls <onboarding@resend.dev>", // Replace with a verified domain if available
        to: ["kylafrancesmontero@gmail.com"],
        subject: `New Partner Inquiry from ${data.firstName} ${data.lastName}`,
        html: `
          <h2>New Partnership Inquiry</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
          <br/>
          <h3>Message:</h3>
          <p>${data.message.replace(/\n/g, "<br/>")}</p>
        `,
      });

      if (error) {
        console.error("Resend Partner Error:", error);
      }

      // 2. Save to Google Sheets
      await fetch(GOOGLE_SHEETS_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          source: `Partnership: ${data.inquiryType}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          message: data.message,
        }),
      }).catch(err => console.error("Google Sheets Error:", err));

      return { success: true, data: resendData };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to submit partner inquiry");
    }
  });
