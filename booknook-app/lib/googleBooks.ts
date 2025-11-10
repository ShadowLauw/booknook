const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function searchBooks(
  query: string,
  startIndex: number = 0,
  maxResults: number = 10
) {
  const res = await fetch(
    `${apiUrl}/api/books?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`
  );
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function getBook(id: string, isbn: boolean) {
  const res = await fetch(
    `${apiUrl}/api/books/detail?q=${encodeURIComponent(id)}&isbn=${encodeURIComponent(isbn)}`
  );
  if (!res.ok) throw new Error("Failed to fetch the book");
  return res.json();
}
