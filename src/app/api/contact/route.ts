import {
  validateName,
  validateEmail,
  validateMessage,
} from "@/lib/contact/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact Form payload:", body);

    const name = typeof body?.name === "string" ? body.name : "";
    const email = typeof body?.email === "string" ? body.email : "";
    const message = typeof body?.message === "string" ? body.message : "";

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    const errors: Record<string, string> = {};

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (messageError) message.email = messageError;

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ ok: false, errors }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
}
