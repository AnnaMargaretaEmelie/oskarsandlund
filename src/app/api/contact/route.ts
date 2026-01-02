export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact Form payload:", body);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
}
