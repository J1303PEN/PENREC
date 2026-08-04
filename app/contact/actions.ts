"use server";

import { redirect } from "next/navigation";

const enquiryLabels: Record<string, string> = {
  general: "General enquiry",
  "artist-music": "Artists & music",
  "press-media": "Press & media",
  partnership: "Partnership",
  licensing: "Licensing & catalogue",
  website: "Website support",
};

const resultUrl = (key: "sent" | "error", value: string) =>
  `/contact?${key}=${encodeURIComponent(value)}#contact-form-title`;

async function saveEnquiry(payload: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) throw new Error("Contact storage is not configured.");

  const response = await fetch(`${url}/rest/v1/contact_enquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to save contact enquiry.");
}

async function forwardEnquiry(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.CONTACT_FORWARD_TO?.trim();
  const sender = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !recipient || !sender) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: payload.email,
      subject: `[PENREC ${enquiryLabels[payload.enquiry_type]}] ${payload.subject}`,
      text: [
        `New ${enquiryLabels[payload.enquiry_type]} received through penrec.co.uk`,
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        "",
        payload.message,
      ].join("\n"),
    }),
    cache: "no-store",
  });
  return response.ok;
}

export async function submitContactEnquiry(formData: FormData) {
  if (String(formData.get("company_website") || "")) redirect(resultUrl("sent", "1"));

  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim().toLowerCase(),
    enquiry_type: String(formData.get("enquiry_type") || "general"),
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (!payload.name || !validEmail || !enquiryLabels[payload.enquiry_type] || !payload.subject || payload.message.length < 10) {
    redirect(resultUrl("error", "Please complete every field and enter a valid email address."));
  }
  if (payload.name.length > 120 || payload.email.length > 254 || payload.subject.length > 160 || payload.message.length > 5000) {
    redirect(resultUrl("error", "One or more fields are longer than allowed."));
  }

  try {
    await saveEnquiry(payload);
    await forwardEnquiry(payload);
  } catch {
    redirect(resultUrl("error", "Please try again in a moment."));
  }
  redirect(resultUrl("sent", "1"));
}
