import { Resend } from "resend";
import { sanityAdminClient } from "@/lib/sanity/sanity.admin";

import {
  validateName,
  validateEmail,
  validateMessage,
} from "@/lib/contact/validation";

export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      console.error("Missing SANITY_API_TOKEN");
      return new Response(
        JSON.stringify({ ok: false, error: "Server misconfiguration" }),
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ ok: false, error: "Server misconfiguration" }),
        { status: 500 }
      );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();

    const name = typeof body?.name === "string" ? body.name : "";
    const email = typeof body?.email === "string" ? body.email : "";
    const message = typeof body?.message === "string" ? body.message : "";

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    const errors: Record<string, string> = {};

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (messageError) errors.message = messageError;

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ ok: false, errors }), {
        status: 400,
      });
    }

    const saved = await sanityAdminClient.create({
      _type: "contactMessage",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });
    console.log("RESEND key exists?", Boolean(process.env.RESEND_API_KEY));

    const { data, error } = await resend.emails.send({
      from: "Contact form <onboarding@resend.dev>",
      to: "annaviklund@gmail.com",
      replyTo: email,
      subject: "New message for you!",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    if (error) {
      return new Response(JSON.stringify({ ok: false, error }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ ok: true, sanityId: saved._id, resendId: data?.id }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
