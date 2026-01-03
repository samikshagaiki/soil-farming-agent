export async function POST(request) {
  try {
    const { text, targetLang } = await request.json();

    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      })
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Translation failed" }),
        { status: 500 }
      );
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ translatedText: data.translatedText }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
