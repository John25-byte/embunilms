
import React, { useState } from "react";
import { Journal } from "@/services/journalService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface JournalListProps {
  journals: Journal[];
  onJournalSelect: (journal: Journal) => void;
  onDownload: (journal: Journal) => void;
}

const JournalList: React.FC<JournalListProps> = ({ 
  journals, 
  onJournalSelect,
  onDownload
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  
  // Get unique years and types for filters
  const uniqueYears = Array.from(new Set(journals.map(j => j.year))).sort((a, b) => parseInt(b) - parseInt(a));
  const uniqueTypes = Array.from(new Set(journals.map(j => j.type)));
  
  // Filter journals based on search query and filters
  const filteredJournals = journals.filter(journal => {
    const matchesSearch = 
      searchQuery === "" || 
      journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.abstract.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = typeFilter === "all" || journal.type === typeFilter;
    const matchesYear = yearFilter === "all" || journal.year === yearFilter;
    
    return matchesSearch && matchesType && matchesYear;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search journals by title, author, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Publication Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredJournals.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
          <h3 className="font-medium text-lg mb-1">No journals found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJournals.map(journal => (
            <Card key={journal.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/6 flex-shrink-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 rounded flex items-center justify-center">
                    {journal.thumbnailUrl ? (
                      <img 
                        src={journal.thumbnailUrl} 
                        alt={journal.title} 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <FileText className="h-12 w-12 text-primary opacity-40" />
                    )}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{journal.type}</Badge>
                    <Badge variant="outline">{journal.year}</Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{journal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{journal.authors}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{journal.abstract}</p>
                  
                  <div className="text-xs text-muted-foreground mb-4">
                    {journal.journal}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => onJournalSelect(journal)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> Read
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDownload(journal)}
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalList;
