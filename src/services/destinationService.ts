
import { MapPin, Building, Ticket } from 'lucide-react';

export type DestinationType = 'all' | 'attraction' | 'accommodation' | 'venue';

export type Destination = {
  id: number;
  title: string;
  image: string;
  category: string;
  location: string;
  description: string;
  type: DestinationType;
  icon: any;
  featured?: boolean;
  longDescription?: string;
  features?: string[];
  website?: string;
  rating?: number;
  reviewsCount?: number;
  nearbyAttractions?: {
    id: number;
    name: string;
    distance: string;
  }[];
};

export const destinations: Destination[] = [
  {
    id: 1,
    title: "Jamaa el-Fna Square",
    image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3474&q=80",
    category: "Tourist Attraction",
    location: "Marrakech",
    description: "The famous square at the heart of Marrakech, filled with storytellers, musicians, and food stalls.",
    type: "attraction",
    icon: MapPin,
    featured: true,
    longDescription: "Jamaa el-Fna is a square and market place in Marrakesh's medina quarter (old city). It remains the main square of Marrakesh, used by locals and tourists. The square's name has several possible meanings, including 'assembly of the dead' referring to public executions that once took place here. During the day it is predominantly occupied by orange juice stalls, water sellers, snake charmers, and people with monkeys. As the day progresses, the entertainment shifts to storytellers, magicians, and medicinal sellers. As darkness falls, the square fills with dozens of food stalls, becoming a huge open-air restaurant.",
    features: [
      "Traditional food stalls",
      "Street performers",
      "Henna artists",
      "Historical significance",
      "Cultural hub"
    ],
    website: "https://visitmarrakech.com/jamaa-el-fna",
    rating: 4.7,
    reviewsCount: 2342,
    nearbyAttractions: [
      {
        id: 4,
        name: "Bahia Palace",
        distance: "1.2 km"
      },
      {
        id: 7,
        name: "Majorelle Garden",
        distance: "3.5 km"
      }
    ]
  },
  {
    id: 2,
    title: "Royal Mansour Marrakech",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3425&q=80",
    category: "Accommodation",
    location: "Marrakech",
    description: "A palatial luxury hotel with stunning Moroccan architecture and world-class amenities.",
    type: "accommodation",
    icon: Building,
    featured: true,
    longDescription: "The Royal Mansour Marrakech is a luxury hotel located in the heart of Marrakech. It was commissioned by King Mohammed VI and opened in 2010. The hotel is designed to resemble a traditional Moroccan medina, with 53 individual riads (traditional Moroccan houses) spread across 3.5 hectares. The Royal Mansour is known for its exceptional service, beautiful gardens, and traditional Moroccan craftsmanship. The hotel features multiple restaurants, a spa, and private pools in many of the riads. It's considered one of the most luxurious hotels in Morocco and has received numerous awards for its design and service.",
    features: [
      "53 private riads",
      "Michelin-starred restaurants",
      "Luxury spa",
      "Handcrafted Moroccan decor",
      "Private butler service",
      "Swimming pools"
    ],
    website: "https://www.royalmansour.com",
    rating: 4.9,
    reviewsCount: 867,
    nearbyAttractions: [
      {
        id: 1,
        name: "Jamaa el-Fna Square",
        distance: "1.5 km"
      },
      {
        id: 7,
        name: "Majorelle Garden",
        distance: "2.8 km"
      }
    ]
  },
  {
    id: 3,
    title: "Mohammed V Stadium",
    image: "https://images.unsplash.com/photo-1521731978332-9e9e714bdd20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3473&q=80",
    category: "Event Venue",
    location: "Casablanca",
    description: "The main football stadium in Casablanca, hosting many international events and sports competitions.",
    type: "venue",
    icon: Ticket,
    featured: true,
    longDescription: "Mohammed V Stadium, also known as Stade Mohammed V, is a multi-purpose stadium in Casablanca, Morocco. It is currently used mostly for football matches and is the home of Moroccan football clubs Raja Casablanca and Wydad Casablanca. The stadium holds 45,000 people and was built in 1955. It was renovated in 2007 for the 2007 Morocco Athletics Meeting. The stadium is named after Sultan Mohammed V of Morocco, who was Sultan of Morocco from 1927 to 1953, and then King of Morocco from 1957 to 1961. It hosts international football matches, athletics competitions, and major concerts.",
    features: [
      "45,000 seat capacity",
      "Natural grass pitch",
      "Host to international matches",
      "Modern facilities",
      "Located in central Casablanca"
    ],
    website: "https://www.frmf.ma",
    rating: 4.3,
    reviewsCount: 1204,
    nearbyAttractions: [
      {
        id: 9,
        name: "Hassan II Mosque",
        distance: "4.2 km"
      },
      {
        id: 10,
        name: "Casablanca Medina",
        distance: "2.7 km"
      }
    ]
  },
  {
    id: 4,
    title: "Bahia Palace",
    image: "https://images.unsplash.com/photo-1548019464-c57a4a52e783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Tourist Attraction",
    location: "Marrakech",
    description: "A stunning 19th-century palace with beautiful gardens and intricate Islamic architecture.",
    type: "attraction",
    icon: MapPin,
    longDescription: "The Bahia Palace is a palace and gardens located in Marrakech, Morocco. It was built in the late 19th century, intended to be the greatest palace of its time. The name means 'brilliance'. Set up at the end of the 19th century by Si Moussa, grand vizier of the sultan, for his personal use, this palace was later embellished by his son Bou Ahmed who lived there with his four wives, 24 concubines and many children. The palace is a masterpiece of domestic architecture, showcasing the Islamic and Moroccan style. The complex consists of apartments arranged around courtyards, richly decorated with stucco, cedarwood, and colorful tiles.",
    features: [
      "160 rooms",
      "Courtyards and gardens",
      "Zellige tilework",
      "Painted cedar ceilings",
      "Historical tours available"
    ],
    website: "https://www.moroccotravel.com/bahia-palace",
    rating: 4.5,
    reviewsCount: 1876,
    nearbyAttractions: [
      {
        id: 1,
        name: "Jamaa el-Fna Square",
        distance: "1.2 km"
      },
      {
        id: 11,
        name: "Saadian Tombs",
        distance: "1.8 km"
      }
    ]
  },
  {
    id: 5,
    title: "Four Seasons Resort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Accommodation",
    location: "Agadir",
    description: "A luxury beachfront resort with swimming pools, spa, and excellent dining options.",
    type: "accommodation",
    icon: Building,
    longDescription: "The Four Seasons Resort in Agadir offers a luxurious retreat on Morocco's Atlantic coast. This five-star resort features elegant rooms and suites with private balconies overlooking the ocean or lush gardens. The property includes multiple swimming pools, including an adults-only infinity pool and a family-friendly pool with water features. The resort's spa offers traditional Moroccan hammam treatments alongside international wellness therapies. Dining options range from Moroccan cuisine to international fare, with beachfront and poolside restaurants. The resort also offers a kids' club, fitness center, and direct access to Agadir's golden sand beach.",
    features: [
      "Beachfront location",
      "Multiple swimming pools",
      "Luxury spa with hammam",
      "Gourmet restaurants",
      "Tennis courts",
      "Kids' club",
      "Fitness center"
    ],
    website: "https://www.fourseasons.com/agadir",
    rating: 4.8,
    reviewsCount: 743,
    nearbyAttractions: [
      {
        id: 6,
        name: "Agadir Festival Hall",
        distance: "3.1 km"
      },
      {
        id: 12,
        name: "Agadir Beach",
        distance: "0.1 km"
      }
    ]
  },
  {
    id: 6,
    title: "Agadir Festival Hall",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Event Venue",
    location: "Agadir",
    description: "A modern venue hosting cultural events, concerts, and performances throughout the year.",
    type: "venue",
    icon: Ticket,
    longDescription: "Agadir Festival Hall is a contemporary performance venue located in the heart of Agadir, Morocco. Built after the 1960 earthquake that devastated the city, this modern facility hosts a variety of cultural events including music concerts, theater performances, dance shows, and film festivals. The main hall can accommodate up to 1,200 spectators with excellent acoustics and sightlines. The venue also includes smaller performance spaces, exhibition areas, and conference rooms. The Festival Hall plays a central role in Agadir's cultural life, hosting both Moroccan and international artists. It's particularly active during the annual Timitar Festival, which celebrates Amazigh (Berber) music and culture.",
    features: [
      "1,200-seat main auditorium",
      "State-of-the-art sound system",
      "Multiple event spaces",
      "Exhibition areas",
      "Central location in Agadir"
    ],
    website: "https://www.agadir-festivalhall.ma",
    rating: 4.2,
    reviewsCount: 512,
    nearbyAttractions: [
      {
        id: 5,
        name: "Four Seasons Resort",
        distance: "3.1 km"
      },
      {
        id: 12,
        name: "Agadir Beach",
        distance: "2.5 km"
      }
    ]
  },
  {
    id: 7,
    title: "Majorelle Garden",
    image: "https://images.unsplash.com/photo-1585424265936-95a76631fc86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Tourist Attraction",
    location: "Marrakech",
    description: "A botanical garden designed by French painter Jacques Majorelle, now owned by the YSL foundation.",
    type: "attraction",
    icon: MapPin,
    longDescription: "The Majorelle Garden is a two and half acre botanical garden and artist's landscape garden in Marrakech, Morocco. It was created by French Orientalist artist Jacques Majorelle over almost forty years, starting in 1923, and features a Cubist villa designed by French architect Paul Sinoir in the 1930s. The garden and villa were bought by Yves Saint-Laurent and Pierre Bergé in 1980. After Yves Saint Laurent died in 2008, his ashes were scattered in the garden. The garden hosts collections of cacti, exotic plants and trees, and features striking cobalt blue accents throughout, a color now known as Majorelle Blue. The garden also houses the Islamic Art Museum of Marrakech, the Berber Museum and the Yves Saint Laurent Museum.",
    features: [
      "Exotic plant collection",
      "Iconic Majorelle Blue villa",
      "Berber Museum",
      "Yves Saint Laurent Museum",
      "Water features and fountains"
    ],
    website: "https://www.jardinmajorelle.com",
    rating: 4.8,
    reviewsCount: 3215,
    nearbyAttractions: [
      {
        id: 1,
        name: "Jamaa el-Fna Square",
        distance: "3.5 km"
      },
      {
        id: 2,
        name: "Royal Mansour Marrakech",
        distance: "2.8 km"
      }
    ]
  },
  {
    id: 8,
    title: "La Mamounia",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Accommodation",
    location: "Marrakech",
    description: "One of the most iconic hotels in Morocco, featuring classic Moroccan design and luxury amenities.",
    type: "accommodation",
    icon: Building,
    longDescription: "La Mamounia is a luxury five-star hotel in Marrakech, Morocco. It was built in 1923 and has been described as the 'most lovely hotel in the world' by Winston Churchill, who often visited the hotel. The hotel is named after its 200-year-old gardens, which were given as a wedding gift to Prince Mamoun in the 18th century. The hotel combines traditional Moroccan architecture with Art Deco style and features 209 rooms, including 71 suites. It underwent a major renovation in 2009, led by designer Jacques Garcia. La Mamounia is known for its lush gardens spanning 17 acres, its world-class spa, and multiple restaurants, including those helmed by celebrity chefs. The hotel has hosted numerous celebrities and dignitaries throughout its history.",
    features: [
      "Historic property dating to 1923",
      "17-acre gardens",
      "Luxury spa with hammam",
      "Four restaurants and five bars",
      "Outdoor pool",
      "Tennis courts",
      "Fitness pavilion"
    ],
    website: "https://www.mamounia.com",
    rating: 4.9,
    reviewsCount: 1543,
    nearbyAttractions: [
      {
        id: 1,
        name: "Jamaa el-Fna Square",
        distance: "1.7 km"
      },
      {
        id: 4,
        name: "Bahia Palace",
        distance: "2.3 km"
      }
    ]
  }
];

// Get a destination by its ID
export const getDestinationById = (id: number): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};

// Get nearby attractions for a destination
export const getNearbyAttractions = (destinationId: number): Destination[] => {
  const destination = getDestinationById(destinationId);
  if (!destination || !destination.nearbyAttractions) return [];
  
  return destination.nearbyAttractions.map(nearby => {
    const nearbyDest = getDestinationById(nearby.id);
    return nearbyDest ? nearbyDest : {} as Destination;
  }).filter(d => Object.keys(d).length > 0);
};
