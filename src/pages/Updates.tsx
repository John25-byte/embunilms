
import { useState } from "react";
import { Calendar, Clock, MessageCircle, Bell, BookOpen, FileText, ChevronRight, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Updates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "Extended Library Hours During Exam Period",
      date: "April 2, 2025",
      category: "Hours",
      content: "The library will extend its operating hours from April 15 to May 5 for the exam period. We will be open from 7:00 AM to 12:00 AM on weekdays and 8:00 AM to 10:00 PM on weekends."
    },
    {
      id: 2,
      title: "New Research Database Subscription",
      date: "March 28, 2025",
      category: "Resources",
      content: "We're pleased to announce that we have subscribed to the Science Direct database, providing access to over 2,500 journals and 39,000 e-books across various disciplines."
    },
    {
      id: 3,
      title: "Library Renovation: Second Floor Closure",
      date: "March 25, 2025",
      category: "Facilities",
      content: "The second floor of the main library will be closed for renovations from April 10 to April 20. Alternative study spaces will be available in the Learning Commons."
    },
  ];
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Research Methods Workshop",
      date: "April 12, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Library Room 201",
      registration: "Required"
    },
    {
      id: 2,
      title: "Information Literacy Session",
      date: "April 17, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Digital Learning Hub",
      registration: "Open"
    },
    {
      id: 3,
      title: "Author Talk: Dr. Samuel Wanjiru",
      date: "April 22, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Library Auditorium",
      registration: "Limited seats"
    },
  ];
  
  // Sample new acquisitions data
  const newAcquisitions = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques",
      author: "Jane Smith",
      category: "Computer Science",
      callNumber: "CS 150.5 SMI",
      available: true
    },
    {
      id: 2,
      title: "Contemporary Economic Policies in East Africa",
      author: "Michael Ndungu",
      category: "Economics",
      callNumber: "HB 172.5 NDU",
      available: false
    },
    {
      id: 3,
      title: "Principles of Molecular Biology",
      author: "Robert Johnson",
      category: "Biology",
      callNumber: "QH 506 JOH",
      available: true
    },
  ];
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Hours":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{category}</Badge>;
      case "Resources":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{category}</Badge>;
      case "Facilities":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{category}</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">Library Updates</h1>
        <p className="text-muted-foreground mb-8">Stay informed about the latest library news, events, and new acquisitions</p>
        
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="announcements">
              <Bell className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="acquisitions">
              <BookOpen className="mr-2 h-4 w-4" />
              New Acquisitions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="announcements" className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{announcement.title}</h3>
                  {getCategoryBadge(announcement.category)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  <Calendar className="inline mr-2 h-4 w-4" />
                  {announcement.date}
                </p>
                <p className="text-sm">{announcement.content}</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="link" className="p-0 h-auto">
                    Read more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {event.time}
                      </div>
                      <div>
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {event.registration}
                    </Badge>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="#">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Calendar
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="acquisitions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newAcquisitions.map((book) => (
                <Card key={book.id} className="p-6">
                  <div>
                    <Badge variant="outline" className="mb-2">{book.category}</Badge>
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">By {book.author}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">{book.callNumber}</span>
                      {book.available ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Checked Out
                        </Badge>
                      )}
                    </div>
                    <Button variant="link" className="p-0 h-auto mt-3 text-sm">
                      <FileText className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">
                View All New Acquisitions
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-12" />
        
        <div className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Subscribe to Updates</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest library news, event announcements, and resources delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder="Enter your email address" className="flex-grow" />
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
