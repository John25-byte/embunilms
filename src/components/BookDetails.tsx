
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  CalendarIcon, 
  BookIcon, 
  UserIcon, 
  TagIcon, 
  BuildingIcon, 
  CheckIcon,
  XIcon,
  ArrowLeftIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Book {
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

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        
        if (error) throw error;
        
        setBook(data);
        if (!data) {
          toast({
            variant: "destructive",
            title: "Book not found",
            description: "The book you're looking for doesn't exist or has been removed."
          });
          navigate("/books");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast({
          variant: "destructive",
          title: "Failed to load book details",
          description: "There was a problem loading the book information."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, navigate]);

  const handleBorrow = async () => {
    if (!book || !user) return;
    
    setBorrowing(true);
    try {
      // In a real application, this would create a borrow record
      // For now, we'll just update the available copies
      if (book.available_copies <= 0) {
        throw new Error("No copies available");
      }
      
      const { error } = await supabase
        .from("books")
        .update({ available_copies: book.available_copies - 1 })
        .eq("id", book.id);
      
      if (error) throw error;
      
      // Update the local state with the new available copies
      setBook({
        ...book,
        available_copies: book.available_copies - 1
      });
      
      toast({
        title: "Book borrowed",
        description: `You have successfully borrowed "${book.title}".`,
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast({
        variant: "destructive",
        title: "Failed to borrow book",
        description: "There was a problem processing your request."
      });
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate("/books")}
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to catalog
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book cover */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="aspect-[2/3] relative bg-muted">
              {book.cover_image ? (
                <img 
                  src={book.cover_image} 
                  alt={`${book.title} cover`} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-accent/10">
                  <BookIcon className="h-20 w-20 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center mt-1">
                    {book.available_copies > 0 ? (
                      <>
                        <CheckIcon className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-green-600 text-sm">Available</span>
                      </>
                    ) : (
                      <>
                        <XIcon className="h-4 w-4 text-red-600 mr-1" />
                        <span className="text-red-600 text-sm">Not Available</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Copies</p>
                  <p className="text-sm text-muted-foreground">
                    {book.available_copies}/{book.total_copies}
                  </p>
                </div>
              </div>
              
              {book.available_copies > 0 && (
                <Button 
                  className="w-full mt-4" 
                  onClick={handleBorrow}
                  disabled={borrowing}
                >
                  {borrowing ? 'Processing...' : 'Borrow Book'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Book details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>
          
          {book.description && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-muted-foreground">{book.description}</p>
            </div>
          )}
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {book.isbn && (
              <div className="flex items-start">
                <BookIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">ISBN</p>
                  <p className="text-muted-foreground">{book.isbn}</p>
                </div>
              </div>
            )}
            
            {book.published_year && (
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Published</p>
                  <p className="text-muted-foreground">{book.published_year}</p>
                </div>
              </div>
            )}
            
            {book.publisher && (
              <div className="flex items-start">
                <BuildingIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Publisher</p>
                  <p className="text-muted-foreground">{book.publisher}</p>
                </div>
              </div>
            )}
            
            {book.category && (
              <div className="flex items-start">
                <TagIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-muted-foreground">{book.category}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
