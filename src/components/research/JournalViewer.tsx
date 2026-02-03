
import React, { useState } from "react";
import { Journal, downloadJournal, trackJournalRead } from "@/services/journalService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen, ArrowLeft, LinkIcon, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface JournalViewerProps {
  journal: Journal;
  onBack: () => void;
}

const JournalViewer: React.FC<JournalViewerProps> = ({ journal, onBack }) => {
  const [readingMode, setReadingMode] = useState(false);

  const handleDownload = () => {
    downloadJournal(journal);
  };

  const handleReadClick = () => {
    setReadingMode(true);
    trackJournalRead(journal);
  };

  const handleShare = () => {
    // In a real app, this would share the article URL
    navigator.clipboard.writeText(`https://example.com/journals/${journal.id}`);
    toast({
      title: "Link copied",
      description: "Journal link copied to clipboard",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {readingMode ? (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={() => setReadingMode(false)} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="flex-grow"></div>
            <Button variant="outline" onClick={handleShare} className="mr-2">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
          
          <h1 className="text-2xl font-bold mb-3">{journal.title}</h1>
          <p className="text-sm text-muted-foreground mb-4">{journal.authors} • {journal.journal} • {journal.year}</p>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-medium mb-2">Abstract</h2>
            <p className="mb-4">{journal.abstract}</p>
            
            <h2 className="text-xl font-medium mb-2">Introduction</h2>
            <p className="mb-3">
              This is a placeholder for the full journal content. In a real application, this would display the actual content of the journal article, properly formatted with sections, figures, tables, and citations.
            </p>
            <p className="mb-3">
              The content would typically be stored as HTML or rendered from a PDF document using a viewer component. For the purpose of this demonstration, we're showing a simplified version of what the reading experience would look like.
            </p>
            
            <h2 className="text-xl font-medium mb-2">Methodology</h2>
            <p className="mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h2 className="text-xl font-medium mb-2">Results & Discussion</h2>
            <p className="mb-3">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <h2 className="text-xl font-medium mb-2">Conclusion</h2>
            <p className="mb-3">
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            </p>
            
            <h2 className="text-xl font-medium mb-2">References</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Smith, J. (2022). Research Methodology in Agricultural Sciences. Academic Press.</li>
              <li>Johnson, K., & Williams, T. (2021). Climate Change and Agriculture. Journal of Environmental Sciences, 45(2), 112-128.</li>
              <li>Odhiambo, L., et al. (2023). Water Conservation Techniques in East Africa. Environmental Management, 67, 88-103.</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to journals
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="bg-gray-100 rounded-lg w-full aspect-[3/4] flex items-center justify-center mb-4 overflow-hidden">
                {journal.thumbnailUrl ? (
                  <img 
                    src={journal.thumbnailUrl} 
                    alt={journal.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 text-primary">
                    <FileText className="h-16 w-16 opacity-40" />
                  </div>
                )}
              </div>
              
              <div className="space-y-3 w-full">
                <Button 
                  onClick={handleReadClick} 
                  className="w-full"
                >
                  <BookOpen className="h-4 w-4 mr-2" /> Read Online
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleDownload}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <Badge className="mb-2">{journal.type}</Badge>
              <h1 className="text-2xl font-bold mb-2">{journal.title}</h1>
              <p className="text-muted-foreground mb-4">{journal.authors}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">Journal:</span> {journal.journal}
                </div>
                <div>
                  <span className="font-medium">Year:</span> {journal.year}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-semibold mb-2">Abstract</h3>
              <p className="text-muted-foreground">{journal.abstract}</p>
              
              <Separator className="my-4" />
              
              <div className="flex items-center text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4 mr-1" />
                <span className="mr-2">DOI:</span>
                <a href="#" className="text-primary hover:underline">10.1234/journal.123456</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalViewer;
