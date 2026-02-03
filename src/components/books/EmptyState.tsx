
import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  clearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ clearFilters }) => {
  return (
    <div className="text-center py-16">
      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">No books found</h3>
      <p className="text-muted-foreground">
        We couldn't find any books matching your search criteria.
      </p>
      <Button onClick={clearFilters} className="mt-4" variant="outline">
        Clear filters
      </Button>
    </div>
  );
};

export default EmptyState;
