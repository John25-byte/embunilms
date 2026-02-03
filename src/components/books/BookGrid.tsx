
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Book } from "@/pages/Books";

interface BookGridProps {
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

interface BookCardProps {
  book: Book;
}

// Function to generate a gradient based on book title
const getGradientFromTitle = (title: string): string => {
  // Simple hash function to generate a consistent color from a string
  const hash = title.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Pick from predefined gradients based on hash
  const gradients = [
    "bg-gradient-to-br from-blue-400 to-indigo-500",
    "bg-gradient-to-br from-pink-400 to-purple-500",
    "bg-gradient-to-br from-green-400 to-teal-500",
    "bg-gradient-to-br from-yellow-300 to-amber-500",
    "bg-gradient-to-br from-red-400 to-rose-500",
    "bg-gradient-to-br from-cyan-400 to-blue-500",
    "bg-gradient-to-br from-violet-400 to-indigo-500",
    "bg-gradient-to-br from-emerald-400 to-green-600",
    "bg-gradient-to-br from-amber-300 to-orange-500",
    "bg-gradient-to-br from-fuchsia-400 to-purple-600",
  ];
  
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

// Function to generate the initial letter from a book title
const getTitleInitial = (title: string): string => {
  return title.charAt(0).toUpperCase();
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const gradientClass = getGradientFromTitle(book.title);
  
  return (
    <Card key={book.id} className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-[2/3] relative">
        {book.cover_image ? (
          <img 
            src={book.cover_image} 
            alt={`${book.title} cover`} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`flex flex-col items-center justify-center h-full ${gradientClass} text-white`}>
            <span className="text-6xl font-bold opacity-80">{getTitleInitial(book.title)}</span>
            <BookOpen className="h-12 w-12 opacity-70 mt-2" />
            <div className="mt-4 px-4 text-center">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        {book.category && (
          <span className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-3 py-1 rounded-full shadow-md">
            {book.category}
          </span>
        )}
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">{book.title}</h3>
        <p className="text-muted-foreground text-sm">{book.author}</p>
        {book.published_year && (
          <p className="text-xs text-muted-foreground mt-1">{book.published_year}</p>
        )}
        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className={`text-sm font-medium ${book.available_copies > 0 ? 'text-green-600' : 'text-red-600'} px-2 py-1 rounded-full ${book.available_copies > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            {book.available_copies > 0 
              ? `${book.available_copies} available` 
              : 'Not available'}
          </span>
          <Button size="sm" variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Link to={`/books/${book.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookGrid;
