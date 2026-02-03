import React, { useState } from 'react';
import { Search, Filter, FileDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

interface EResource {
  id: number;
  title: string;
  author: string;
  publisher: string;
  type: 'journal' | 'database' | 'ebook';
  accessType: 'open' | 'subscription' | 'institutional';
  description: string;
  url: string;
  guideUrl: string;
}

const mockEResources: EResource[] = [
  {
    id: 1,
    title: 'JSTOR Academic Journals',
    author: 'JSTOR',
    publisher: 'ITHAKA',
    type: 'journal',
    accessType: 'subscription',
    description: 'Digital library of academic journals, books, and primary sources.',
    url: 'https://www.jstor.org',
    guideUrl: '/guides/jstor-access-guide.pdf'
  },
  {
    id: 2,
    title: 'ScienceDirect',
    author: 'Elsevier',
    publisher: 'Elsevier',
    type: 'database',
    accessType: 'subscription',
    description: 'Database of scientific and medical research.',
    url: 'https://www.sciencedirect.com',
    guideUrl: '/guides/sciencedirect-access-guide.pdf'
  },
  {
    id: 3,
    title: 'Directory of Open Access Journals',
    author: 'DOAJ',
    publisher: 'DOAJ',
    type: 'journal',
    accessType: 'open',
    description: 'Online directory that indexes and provides access to open access journals.',
    url: 'https://doaj.org',
    guideUrl: '/guides/doaj-access-guide.pdf'
  },
  // Add more e-resources as needed
];

const EResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterAccess, setFilterAccess] = useState<string>('all');
  const [searchCategory, setSearchCategory] = useState<string>('title');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDownloadGuide = (resource: EResource) => {
    // In a real application, this would initiate a download
    toast({
      title: "Access Guide Download",
      description: `Downloading access guide for ${resource.title}...`,
    });
  };

  const handleAccess = (resource: EResource) => {
    if (resource.accessType === 'subscription' && !user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to access subscription resources.",
      });
      navigate('/auth', { state: { returnUrl: '/e-resources' } });
      return;
    }
    
    window.open(resource.url, '_blank');
    
    toast({
      title: "Accessing E-Resource",
      description: `Opening ${resource.title} in a new tab.`,
    });
  };

  // Filter and search functions
  const filteredResources = mockEResources.filter(resource => {
    // Filter by type
    if (filterType !== 'all' && resource.type !== filterType) return false;
    
    // Filter by access type
    if (filterAccess !== 'all' && resource.accessType !== filterAccess) return false;
    
    // Search by appropriate field
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      switch(searchCategory) {
        case 'title':
          return resource.title.toLowerCase().includes(query);
        case 'author':
          return resource.author.toLowerCase().includes(query);
        case 'publisher':
          return resource.publisher.toLowerCase().includes(query);
        default:
          return true;
      }
    }
    
    return true;
  });

  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8">Electronic Resources</h1>
      
      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex flex-1 gap-2">
          <Select value={searchCategory} onValueChange={setSearchCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Search by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="publisher">Publisher</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={`Search by ${searchCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Resource type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="ebook">E-Book</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterAccess} onValueChange={setFilterAccess}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Access type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Access</SelectItem>
              <SelectItem value="open">Open Access</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="institutional">Institutional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {!user && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Notice</AlertTitle>
          <AlertDescription>
            Some resources require login. Sign in to access subscription content.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Resources tab section */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="journals">Journals</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="ebooks">E-Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>
                    {resource.author} • {resource.publisher} • 
                    <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
                      resource.accessType === 'open' ? 'bg-green-100 text-green-800' : 
                      resource.accessType === 'subscription' ? 'bg-amber-100 text-amber-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.accessType.charAt(0).toUpperCase() + resource.accessType.slice(1)} Access
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{resource.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleDownloadGuide(resource)}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Access Guide
                  </Button>
                  <Button onClick={() => handleAccess(resource)}>
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No resources found. Try changing your filters.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Other tab contents would be similar but filtered by type */}
        <TabsContent value="journals" className="space-y-4">
          {/* Journal content - similar to "all" tab but filtered */}
          {filteredResources.filter(r => r.type === 'journal').length > 0 ? (
            filteredResources.filter(r => r.type === 'journal').map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>
                    {resource.author} • {resource.publisher} • 
                    <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
                      resource.accessType === 'open' ? 'bg-green-100 text-green-800' : 
                      resource.accessType === 'subscription' ? 'bg-amber-100 text-amber-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.accessType.charAt(0).toUpperCase() + resource.accessType.slice(1)} Access
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{resource.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleDownloadGuide(resource)}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Access Guide
                  </Button>
                  <Button onClick={() => handleAccess(resource)}>
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No journal resources found. Try changing your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="databases" className="space-y-4">
          {/* Database content */}
          {filteredResources.filter(r => r.type === 'database').length > 0 ? (
            filteredResources.filter(r => r.type === 'database').map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>
                    {resource.author} • {resource.publisher} • 
                    <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
                      resource.accessType === 'open' ? 'bg-green-100 text-green-800' : 
                      resource.accessType === 'subscription' ? 'bg-amber-100 text-amber-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.accessType.charAt(0).toUpperCase() + resource.accessType.slice(1)} Access
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{resource.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleDownloadGuide(resource)}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Access Guide
                  </Button>
                  <Button onClick={() => handleAccess(resource)}>
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No database resources found. Try changing your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ebooks" className="space-y-4">
          {/* E-Books content */}
          {filteredResources.filter(r => r.type === 'ebook').length > 0 ? (
            filteredResources.filter(r => r.type === 'ebook').map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>
                    {resource.author} • {resource.publisher} • 
                    <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
                      resource.accessType === 'open' ? 'bg-green-100 text-green-800' : 
                      resource.accessType === 'subscription' ? 'bg-amber-100 text-amber-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.accessType.charAt(0).toUpperCase() + resource.accessType.slice(1)} Access
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{resource.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleDownloadGuide(resource)}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Access Guide
                  </Button>
                  <Button onClick={() => handleAccess(resource)}>
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No e-book resources found. Try changing your filters.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EResources;
