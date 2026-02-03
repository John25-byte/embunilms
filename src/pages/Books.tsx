
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import BookHeader from "@/components/books/BookHeader";
import SearchAndFilter from "@/components/books/SearchAndFilter";
import BookGrid from "@/components/books/BookGrid";
import EmptyState from "@/components/books/EmptyState";

// Define the Book type to match our database schema
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  published_year?: number;
  publisher?: string;
  description?: string;
  cover_image?: string;
  category?: string;
  available_copies: number;
  total_copies: number;
}

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  // Get search parameters from URL
  const searchQuery = searchParams.get("query") || "";
  const categoryFilter = searchParams.get("category") || "";

  // Fetch books with optional filters
  const fetchBooks = async () => {
    setLoading(true);
    try {
      let query = supabase.from("books").select("*");
      
      // Apply search filter if provided
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%,isbn.eq.${searchQuery}`);
      }
      
      // Apply category filter if provided and not "all_categories"
      if (categoryFilter && categoryFilter !== "all_categories") {
        query = query.eq("category", categoryFilter);
      }
      
      const { data, error } = await query.order("title");
      
      if (error) throw error;
      
      setBooks(data || []);
      
      // Extract unique categories for the filter dropdown
      if (!categories.length) {
        const uniqueCategories = Array.from(
          new Set((data || []).map(book => book.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        variant: "destructive",
        title: "Failed to load books",
        description: "There was a problem loading the book catalog."
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize page and fetch books
  useEffect(() => {
    fetchBooks();
  }, [searchQuery, categoryFilter]);

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <BookHeader />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <SearchAndFilter 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          categories={categories}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          clearFilters={clearFilters}
        />

        <section>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : books.length > 0 ? (
            <BookGrid books={books} />
          ) : (
            <EmptyState clearFilters={clearFilters} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Books;
