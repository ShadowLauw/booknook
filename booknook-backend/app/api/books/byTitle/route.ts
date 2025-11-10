import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json(
      { error: "Missing query parameter 'q'" },
      { status: 400 }
    );
  }

  try {
    const params = [
      `q=${encodeURIComponent(q)}`,
      `fields=items(id,volumeInfo(title,authors,imageLinks,averageRating,description,categories,language,industryIdentifiers,pageCount,publisher,publishedDate))`,
      `maxResults=1`,
    ].join("&");
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${params}`
    );

    if (!res.ok) {
      throw new Error(`Google Books API error: ${res.status}`);
    }

    let data = await res.json();
    data = data.items[0];

    if (!data) return NextResponse.json([], { status: 200 });

    const info = data.volumeInfo;
    const book = {
      id: data.id,
      cover:
        info.imageLinks?.thumbnail?.replace(/^http:\/\//i, "https://") ||
        info.imageLinks?.[0]?.replace(/^http:\/\//i, "https://") ||
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
      title: info.title || "Untitled",
      authors: info.authors?.join(", ") || "Unknown",
      rating: info.averageRating || 0,
      summary: cleanSummary(info.description) || "",
      genre: info.categories?.[0] || "Unknown",
      language: info.language || "Unknown",
      isbn:
        info.industryIdentifiers?.find((id: any) => id.type === "ISBN_13")
          ?.identifier ||
        info.industryIdentifiers?.find((id: any) => id.type === "ISBN_10")
          ?.identifier ||
        "",
      n_pages: info.pageCount || 0,
      publisher: info.publisher || "Unknown",
      publishing_date: info.publishedDate || "Unknown",
    };

    return NextResponse.json(book, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

function cleanSummary(html: string | undefined) {
  if (!html) return "";
  let decoded = html
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/\\u0026/g, "&")
    .replace(/\\u0022/g, '"')
    .replace(/\\u0027/g, "'");

  decoded = decoded
    .replace(/<(br|p|div|li|h[1-6])[^>]*>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n");

  decoded = decoded.replace(/<[^>]+>/g, "");

  return decoded;
}
