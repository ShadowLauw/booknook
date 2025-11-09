import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_BOOKS_API_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const start = parseInt(searchParams.get("startIndex") || "0");
  const limit = parseInt(searchParams.get("maxResults") || "3");

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
      `maxResults=${limit}`,
      `startIndex=${start}`,
      `key=${GOOGLE_API_KEY}`,
    ].join("&");
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${params}`
    );

    if (!res.ok) {
      throw new Error(`Google Books API error: ${res.status}`);
    }

    const data = await res.json();

    const books = (data.items || []).map((item: any) => {
      const info = item.volumeInfo;
      return {
        id: item.id,
        cover:
          info.imageLinks?.thumbnail?.replace(/^http:\/\//i, "https://") ||
          info.imageLinks?.[0]?.replace(/^http:\/\//i, "https://") ||
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
        title: info.title || "Untitled",
        authors: info.authors?.join(", ") || "Unknown",
        rating: info.averageRating || 0,
        summary: info.description || "",
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
    });

    return NextResponse.json(books, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
