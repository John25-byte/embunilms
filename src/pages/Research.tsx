
import { useState, useEffect } from "react";
import { FileText, Search, BookOpen, Calendar, Download, ExternalLink, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Import our new components
import JournalList from "@/components/research/JournalList";
import JournalViewer from "@/components/research/JournalViewer";
import { fetchJournals, downloadJournal, Journal } from "@/services/journalService";

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Sample research guides data
  const researchGuides = [
    {
      id: 1,
      title: "Literature Review Guide",
      description: "Learn how to conduct comprehensive literature reviews for academic research.",
      category: "Research Methods",
      link: "#"
    },
    {
      id: 2,
      title: "Citation Styles Guide",
      description: "Comprehensive guide to APA, MLA, Chicago, and other citation styles.",
      category: "Academic Writing",
      link: "#"
    },
    {
      id: 3,
      title: "Data Analysis Techniques",
      description: "Overview of quantitative and qualitative data analysis methods.",
      category: "Research Methods",
      link: "#"
    },
  ];
  
  // Sample workshops data
  const workshops = [
    {
      id: 1,
      title: "Academic Writing Workshop",
      date: "April 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Library Room 201",
      seats: "10 seats available"
    },
    {
      id: 2,
      title: "Research Methods Seminar",
      date: "April 20, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Library Room 305",
      seats: "5 seats available"
    },
    {
      id: 3,
      title: "Advanced Database Research",
      date: "April 25, 2025",
      time: "9:00 AM - 11:00 AM",
      location: "VC Square",
      seats: "8 seats available"
    },
  ];
  
  useEffect(() => {
    const loadJournals = async () => {
      setLoading(true);
      try {
        const journalData = await fetchJournals();
        setJournals(journalData);
      } catch (error) {
        console.error("Error loading journals:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadJournals();
  }, []);
  
  const handleJournalSelect = (journal: Journal) => {
    setSelectedJournal(journal);
  };
  
  const handleBackToJournals = () => {
    setSelectedJournal(null);
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">Research Resources</h1>
        <p className="text-muted-foreground mb-8">Find support for all stages of your research journey</p>
        
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for research guides, tools, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={selectedJournal ? "publications" : "guides"} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guides" onClick={() => setSelectedJournal(null)}>Research Guides</TabsTrigger>
            <TabsTrigger value="workshops" onClick={() => setSelectedJournal(null)}>Workshops & Events</TabsTrigger>
            <TabsTrigger value="publications">University Publications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchGuides.map((guide) => (
                <Card key={guide.id} className="p-6">
                  <div className="flex items-start space-x-2">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge variant="outline">{guide.category}</Badge>
                        <Button variant="link" asChild className="p-0 h-auto">
                          <Link to={guide.link}>
                            View Guide <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">View All Research Guides</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="workshops" className="space-y-4">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{workshop.title}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {workshop.date}
                      </div>
                      <div>
                        <span className="text-muted-foreground">{workshop.time}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{workshop.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {workshop.seats}
                    </Badge>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="text-center mt-8">
              <Button variant="outline">View All Workshops</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="publications" className="space-y-4">
            {selectedJournal ? (
              <JournalViewer 
                journal={selectedJournal} 
                onBack={handleBackToJournals}
              />
            ) : (
              <JournalList 
                journals={journals}
                onJournalSelect={handleJournalSelect}
                onDownload={downloadJournal}
              />
            )}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Research Support</h3>
            <p className="text-muted-foreground mb-4">
              Get assistance with research methodology, literature reviews, and data analysis.
            </p>
            <Button variant="outline">Book Consultation</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Thesis & Dissertation</h3>
            <p className="text-muted-foreground mb-4">
              Resources and guidance for preparing your thesis or dissertation.
            </p>
            <Button variant="outline">View Resources</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Research Ethics</h3>
            <p className="text-muted-foreground mb-4">
              Learn about ethical considerations in research and get IRB approval.
            </p>
            <Button variant="outline">Ethics Guidelines</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Research;
