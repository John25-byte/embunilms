
import { useState } from "react";
import { Calendar, Clock, Map, Users, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const StudySpaces = () => {
  const { toast } = useToast();
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [groupSize, setGroupSize] = useState<string>("1");
  
  // Sample study spaces data
  const spaces = [
    { 
      id: "main-library", 
      name: "Main Library Study Area", 
      capacity: 120, 
      features: ["Quiet zone", "Power outlets", "Wi-Fi"], 
      currentOccupancy: 65,
      image: "/placeholder.svg"
    },
    { 
      id: "group-rooms", 
      name: "Group Study Rooms", 
      capacity: 40, 
      features: ["Bookable", "Whiteboards", "Projectors", "Wi-Fi"], 
      currentOccupancy: 15,
      image: "/placeholder.svg"
    },
    { 
      id: "digital-hub", 
      name: "VC Square", 
      capacity: 30, 
      features: ["Computers", "Printing", "Technical support", "Wi-Fi"], 
      currentOccupancy: 22,
      image: "/placeholder.svg"
    },
    { 
      id: "outdoor", 
      name: "Outdoor Study Garden", 
      capacity: 50, 
      features: ["Natural light", "Wi-Fi", "Power outlets"], 
      currentOccupancy: 10,
      image: "/placeholder.svg"
    },
  ];

  const availableTimes = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
  ];

  const handleReserve = () => {
    if (!selectedSpace || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete reservation",
        description: "Please select a space, date, and time.",
        variant: "destructive",
      });
      return;
    }
    
    const space = spaces.find(s => s.id === selectedSpace);
    
    toast({
      title: "Space Reserved!",
      description: `You've reserved ${space?.name} for ${selectedDate} at ${selectedTime}.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => console.log("View reservations")}>
          View Reservations
        </Button>
      ),
    });
    
    // Reset selection
    setSelectedSpace(null);
    setSelectedDate("");
    setSelectedTime("");
    setGroupSize("1");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">Study Spaces</h1>
        <p className="text-muted-foreground mb-8">Find and reserve study spaces across the university</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Available Spaces</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {spaces.map((space) => (
                <Card 
                  key={space.id} 
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedSpace === space.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedSpace(space.id)}
                >
                  <div 
                    className="h-40 bg-muted bg-cover bg-center"
                    style={{ backgroundImage: `url(${space.image})` }}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{space.name}</h3>
                      <Badge variant={space.currentOccupancy < space.capacity * 0.5 ? "outline" : "secondary"}>
                        {space.currentOccupancy}/{space.capacity} seats
                      </Badge>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {space.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-background">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    {selectedSpace === space.id && (
                      <div className="mt-2 text-primary text-sm flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Selected
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <div className="flex mt-1">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Time Slot</Label>
                  <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {availableTimes.map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <RadioGroupItem value={time} id={time} />
                          <Label htmlFor={time} className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="group-size">Group Size</Label>
                  <div className="flex mt-1">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="group-size"
                      type="number"
                      min="1"
                      max="10"
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleReserve}
                  disabled={!selectedSpace || !selectedDate || !selectedTime}
                >
                  Reserve Space
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 mt-6">
              <h3 className="font-medium mb-2 flex items-center">
                <Map className="h-4 w-4 mr-2" />
                Find Study Spaces
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                View our interactive map to locate all study spaces on campus.
              </p>
              <Button variant="outline" className="w-full">Open Campus Map</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySpaces;
