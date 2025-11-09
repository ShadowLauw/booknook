import { supabase } from "@/lib/supabase";
import { Book } from "@/types/book";
import { getBook } from "./googleBooks";

export async function addToLibrary(book: Book) {
  await supabase.from("books").upsert(
    {
      id: book.id,
      title: book.title,
      authors: book.authors,
      cover: book.cover,
      summary: book.summary,
      genre: book.genre,
      language: book.language,
      isbn: book.isbn,
      n_pages: book.n_pages,
      publisher: book.publisher,
      publishing_date: book.publishing_date,
    },
    { onConflict: "id" }
  );

  const { error } = await supabase.from("user_books").insert({
    book_id: book.id,
  });
  if (error) throw error;
}

export async function removeFromLibrary(bookId: string) {
  const { error } = await supabase
    .from("user_books")
    .delete()
    .eq("book_id", bookId);
  if (error) throw error;
}

export async function isBookInLibrary(bookId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_books")
    .select("book_id")
    .eq("book_id", bookId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function addToWishlist(bookId: string) {
  const book = await getBook(bookId);

  const { error: bookError } = await supabase.from("books").upsert(
    {
      id: book.id,
      title: book.title,
      authors: book.authors,
      cover: book.cover,
      summary: book.summary,
      genre: book.genre,
      language: book.language,
      isbn: book.isbn,
      n_pages: book.n_pages,
      publisher: book.publisher,
      publishing_date: book.publishing_date,
    },
    { onConflict: "id" }
  );

  if (bookError) throw bookError;

  const { error } = await supabase.from("wishlist").insert({
    book_id: book.id,
  });
  if (error) throw error;
}

export async function removeFromWishlist(bookId: string) {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("book_id", bookId);
  if (error) throw error;
}

export async function isBookInWishlist(bookId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("book_id")
    .eq("book_id", bookId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function getUserLibrary(start: number = 0, end: number = 10) {
  const { data, error } = await supabase
    .from("user_books")
    .select("book_id, books(*)")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) throw error;
  return data.flatMap((entry) => entry.books);
}

export async function getUserWishlist(start: number = 0, end: number = 10) {
  const { data, error } = await supabase
    .from("wishlist")
    .select("book_id, books(*)")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) throw error;
  return data.flatMap((entry) => entry.books as Book[]);
}
