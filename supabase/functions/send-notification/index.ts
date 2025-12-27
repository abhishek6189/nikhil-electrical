import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "appointment" | "contact";
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    preferred_date?: string;
    preferred_time?: string;
    description?: string;
    subject?: string;
    message?: string;
  };
}

async function sendEmail(to: string[], subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Nikhil Electrical <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-notification function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { type, data }: EmailRequest = await req.json();
    console.log("Email request:", { type, name: data.name });

    const adminEmail = "info@nikhilelectrical.com";

    if (type === "appointment") {
      // Send confirmation email to customer
      const customerHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E53935; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Booking Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for booking an appointment with Nikhil Electrical Sales & Services. We have received your request and will confirm your appointment shortly.</p>
              
              <div class="details">
                <h3>Appointment Details:</h3>
                <p><strong>Service:</strong> ${data.service}</p>
                <p><strong>Date:</strong> ${data.preferred_date}</p>
                <p><strong>Time:</strong> ${data.preferred_time}</p>
                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
                ${data.description ? `<p><strong>Description:</strong> ${data.description}</p>` : ""}
              </div>
              
              <p>Our team will contact you at <strong>${data.phone}</strong> to confirm the appointment.</p>
              
              <p>If you have any questions, please call us at <strong>098250 14775</strong>.</p>
              
              <p>Best regards,<br>Nikhil Electrical Sales & Services Team</p>
            </div>
            <div class="footer">
              <p>Government Approved Contractors | Gujarat, India</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const customerEmail = await sendEmail(
        [data.email],
        "Appointment Booking Confirmation - Nikhil Electrical",
        customerHtml
      );
      console.log("Customer email sent:", customerEmail);

      // Send notification email to admin
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E53935; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment Booking</h1>
            </div>
            <div class="content">
              <div class="details">
                <h3>Customer Details:</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
              </div>
              
              <div class="details">
                <h3>Appointment Details:</h3>
                <p><strong>Service:</strong> ${data.service}</p>
                <p><strong>Date:</strong> ${data.preferred_date}</p>
                <p><strong>Time:</strong> ${data.preferred_time}</p>
                ${data.description ? `<p><strong>Description:</strong> ${data.description}</p>` : ""}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const adminNotification = await sendEmail(
        [adminEmail],
        `New Appointment: ${data.name} - ${data.service}`,
        adminHtml
      );
      console.log("Admin notification sent:", adminNotification);

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } else if (type === "contact") {
      // Send confirmation email to customer
      const customerHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E53935; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Message Received!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for contacting Nikhil Electrical Sales & Services. We have received your message and will get back to you as soon as possible.</p>
              
              <p>If you have urgent queries, please call us at <strong>098250 14775</strong>.</p>
              
              <p>Best regards,<br>Nikhil Electrical Sales & Services Team</p>
            </div>
            <div class="footer">
              <p>Government Approved Contractors | Gujarat, India</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const customerEmail = await sendEmail(
        [data.email],
        "Message Received - Nikhil Electrical",
        customerHtml
      );
      console.log("Customer email sent:", customerEmail);

      // Send notification email to admin
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E53935; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
            </div>
            <div class="content">
              <div class="details">
                <p><strong>From:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
                <p><strong>Subject:</strong> ${data.subject}</p>
              </div>
              
              <div class="details">
                <h3>Message:</h3>
                <p>${data.message}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const adminNotification = await sendEmail(
        [adminEmail],
        `New Contact: ${data.subject}`,
        adminHtml
      );
      console.log("Admin notification sent:", adminNotification);

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid email type" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
