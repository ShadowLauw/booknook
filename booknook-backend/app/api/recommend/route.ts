import { NextResponse } from "next/server";

const OPENAI_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userBooks } = body;

    if (!userBooks || !Array.isArray(userBooks) || userBooks.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'userBooks' array" },
        { status: 400 }
      );
    }

    const prompt = `
L'utilisateur possède les livres suivants :
${userBooks
  .map((b: any) => `- ${b.title} -- ${b.authors} -- ${b.genre}`)
  .join("\n")}

Recommande 5 autres livres qu'il pourrait aimer.
Réponds UNIQUEMENT en JSON, sous le format :
[
  { "title": "Titre", "authors": "Auteurs", "reason": "Pourquoi ce livre lui plairait" }
]
`;

    if (!OPENAI_KEY) {
      throw new Error("OpenAI API key not set");
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    console.log({ data });

    const content = data.choices?.[0]?.message?.content ?? "";
    console.log({ content });
    let recommendations;

    try {
      const jsonStart = content.indexOf("[");
      const json = content.slice(jsonStart);
      recommendations = JSON.parse(json);
    } catch (e) {
      recommendations = [];
    }

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
