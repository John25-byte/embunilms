
import { useState } from "react";
import { Printer, CreditCard, BookOpen, HelpCircle, MessageSquare, FileText, ChevronDown, ChevronUp, CalendarRange } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

const Services = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample services data
  const libraryServices = [
    {
      id: 1,
      title: "Printing & Copying",
      description: "Print and copy documents at various locations around campus.",
      icon: Printer,
      link: "#printing"
    },
    {
      id: 2,
      title: "Lending & Borrowing",
      description: "Borrow books, journals, and other materials from the library collection.",
      icon: BookOpen,
      link: "#lending"
    },
    {
      id: 3,
      title: "Fine Payment",
      description: "Pay outstanding library fines through our online payment system.",
      icon: CreditCard,
      link: "#fines"
    },
    {
      id: 4,
      title: "Research Consultation",
      description: "Schedule a one-on-one session with a librarian for research assistance.",
      icon: MessageSquare,
      link: "#consultation"
    },
    {
      id: 5,
      title: "Interlibrary Loans",
      description: "Request materials from other libraries when not available in our collection.",
      icon: FileText,
      link: "#loans"
    },
    {
      id: 6,
      title: "Library Orientation",
      description: "Sign up for a guided tour and introduction to library resources.",
      icon: CalendarRange,
      link: "#orientation"
    },
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "How many books can I borrow at once?",
      answer: "Undergraduate students can borrow up to 5 books, postgraduate students up to 8 books, and faculty members up to 10 books at a time."
    },
    {
      question: "What is the loan period for borrowed materials?",
      answer: "Regular books can be borrowed for 14 days, while course reserve materials are typically limited to 2-hour or overnight loans."
    },
    {
      question: "How do I renew borrowed items?",
      answer: "You can renew items online through your library account, in person at the circulation desk, or by phone. Items can be renewed twice unless requested by another user."
    },
    {
      question: "What are the library fines for overdue materials?",
      answer: "Fines for regular books are 50 cents per day. Reserve materials incur fines of 1 dollar per hour. The maximum fine per item is 25 dollars."
    },
    {
      question: "How do I access online resources from off-campus?",
      answer: "You can access online resources from off-campus by logging in with your university credentials through the library's proxy server or VPN service."
    },
  ];
  
  const handleServiceClick = (service: any) => {
    toast({
      title: service.title,
      description: "You're being redirected to this service page.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">Library Services</h1>
        <p className="text-muted-foreground mb-8">Discover the services our library offers to support your academic journey</p>
        
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button variant="ghost" className="absolute right-0 top-0 h-full px-3">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {libraryServices.map((service) => (
            <Card 
              key={service.id} 
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleServiceClick(service)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Learn more
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <Separator className="my-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Service Hours</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>8:00 AM - 10:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>2:00 PM - 8:00 PM</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Holiday Hours</span>
                  <Badge variant="outline">May vary</Badge>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 mt-6">
              <h3 className="font-medium text-lg mb-4">Need Assistance?</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium block">Email:</span>
                  <a href="mailto:library@uoembu.ac.ke" className="text-primary">library@uoembu.ac.ke</a>
                </div>
                <div>
                  <span className="font-medium block">Phone:</span>
                  <a href="tel:+254123456789" className="text-primary">+254 123 456 789</a>
                </div>
                <div>
                  <span className="font-medium block">Live Chat:</span>
                  <span className="text-muted-foreground">Available during service hours</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Button className="mt-6">
              <HelpCircle className="mr-2 h-4 w-4" />
              Ask a Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
