
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Journal {
  id: number;
  title: string;
  authors: string;
  abstract: string;
  journal: string;
  year: string;
  type: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

// Sample journals data
const sampleJournals: Journal[] = [
  {
    id: 1,
    title: "Sustainable Agriculture Practices in East Africa",
    authors: "Johnson, M., Kimani, P., & Ochieng, L.",
    abstract: "This study examines the implementation of sustainable agricultural practices in East Africa, with a focus on Kenya, Tanzania, and Uganda. The research highlights innovations in water conservation, soil management, and crop diversity that have shown promising results in improving food security while reducing environmental impact.",
    journal: "Journal of Agricultural Research",
    year: "2024",
    type: "Journal Article",
    pdfUrl: "/journals/sustainable-agriculture-east-africa.pdf",
    thumbnailUrl: "/journals/agriculture-thumbnail.jpg"
  },
  {
    id: 2,
    title: "Impact of Climate Change on Water Resources in Kenya",
    authors: "Wanyama, S., & Njoroge, K.",
    abstract: "This paper analyzes the effects of climate change on water resources in Kenya over the past decade. Using data from multiple meteorological stations and water resource monitoring points, the research documents changes in rainfall patterns, river flows, and groundwater levels, providing projections for future water availability and recommendations for adaptive management strategies.",
    journal: "Environmental Science & Policy",
    year: "2023",
    type: "Research Paper",
    pdfUrl: "/journals/climate-change-water-resources.pdf",
    thumbnailUrl: "/journals/water-resources-thumbnail.jpg"
  },
  {
    id: 3,
    title: "Digital Learning Adoption in Higher Education",
    authors: "Mwangi, R., & Smith, J.",
    abstract: "This research explores the adoption and impact of digital learning technologies in higher education institutions across Kenya. Through surveys and interviews with students and faculty at five universities, the study identifies key factors influencing successful technology integration, highlighting both challenges and opportunities for educational transformation.",
    journal: "International Journal of Education Technology",
    year: "2024",
    type: "Conference Paper",
    pdfUrl: "/journals/digital-learning-adoption.pdf",
    thumbnailUrl: "/journals/digital-learning-thumbnail.jpg"
  },
  {
    id: 4,
    title: "Biodiversity Conservation Strategies in Protected Areas",
    authors: "Odhiambo, L., Mutua, F., & Williams, T.",
    abstract: "This comprehensive review examines biodiversity conservation strategies implemented in protected areas across Eastern Africa. The paper assesses the effectiveness of various approaches, including community-based conservation, ecological monitoring programs, and innovative funding mechanisms, providing evidence-based recommendations for conservation practitioners and policy makers.",
    journal: "Conservation Biology",
    year: "2023",
    type: "Review Article",
    pdfUrl: "/journals/biodiversity-conservation-strategies.pdf",
    thumbnailUrl: "/journals/biodiversity-thumbnail.jpg"
  },
  {
    id: 5,
    title: "Mobile Health Technologies for Rural Communities",
    authors: "Kimathi, G., & Johnson, P.",
    abstract: "This study investigates the implementation of mobile health (mHealth) technologies in rural communities in Kenya. Through case studies of three telehealth initiatives, the research identifies critical success factors, barriers to adoption, and health outcomes, offering insights for scaling effective mHealth solutions in resource-limited settings.",
    journal: "BMC Public Health",
    year: "2024",
    type: "Original Research",
    pdfUrl: "/journals/mobile-health-rural.pdf",
    thumbnailUrl: "/journals/mobile-health-thumbnail.jpg"
  },
  {
    id: 6,
    title: "Urban Planning and Sustainable Development in Nairobi",
    authors: "Kariuki, J., Omondi, P., & Chen, L.",
    abstract: "This paper examines urban planning approaches in Nairobi, Kenya, with a focus on sustainable development goals. Using GIS analysis and stakeholder interviews, the research evaluates spatial development patterns, infrastructure investments, and policy frameworks, proposing an integrated model for balancing economic growth, social equity, and environmental protection in rapidly urbanizing African cities.",
    journal: "Urban Studies",
    year: "2023",
    type: "Research Paper",
    pdfUrl: "/journals/urban-planning-nairobi.pdf",
    thumbnailUrl: "/journals/urban-planning-thumbnail.jpg"
  }
];

export const fetchJournals = async (): Promise<Journal[]> => {
  // In a real application, we would fetch this data from Supabase
  // const { data, error } = await supabase.from('journals').select('*');
  // 
  // if (error) {
  //   toast({
  //     title: "Error fetching journals",
  //     description: error.message,
  //     variant: "destructive",
  //   });
  //   return [];
  // }
  // 
  // return data;
  
  // For now, return the sample data
  return sampleJournals;
};

export const downloadJournal = (journal: Journal) => {
  // In a real app, this would download the actual PDF
  // For now, we'll just simulate a download with a toast message
  toast({
    title: "Download started",
    description: `Downloading: ${journal.title}`,
  });
  
  // Simulate download tracking in a real app
  // This would typically record the download in the database
  console.log(`User downloaded: ${journal.title}`);
};

export const trackJournalRead = (journal: Journal) => {
  // In a real app, this would record that a user viewed this journal
  console.log(`User viewed: ${journal.title}`);
};
