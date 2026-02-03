
import React, { useState } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SearchAndFilterProps {
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined
  ) => void;
  categories: string[];
  searchQuery: string;
  categoryFilter: string;
  clearFilters: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchParams,
  setSearchParams,
  categories,
  searchQuery,
  categoryFilter,
  clearFilters
}) => {
  // Search state
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set("query", searchInput);
    } else {
      newParams.delete("query");
    }
    setSearchParams(newParams);
  };

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("category", value);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  return (
    <section className="mb-10">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_categories">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button type="submit">Search</Button>
        
        {(searchQuery || categoryFilter) && (
          <Button variant="outline" onClick={clearFilters} type="button">
            Clear Filters
          </Button>
        )}
      </form>
      
      {/* Search results summary */}
      {searchQuery || categoryFilter ? (
        <div className="text-sm text-muted-foreground">
          Showing results
          {searchQuery && <span> for "{searchQuery}"</span>}
          {categoryFilter && <span> in {categoryFilter}</span>}
        </div>
      ) : null}
    </section>
  );
};

export default SearchAndFilter;
