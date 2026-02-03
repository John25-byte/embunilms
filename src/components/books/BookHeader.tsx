
import React from "react";

const BookHeader = () => {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-semibold text-primary">Book Catalog</h1>
      </div>
    </header>
  );
};

export default BookHeader;
