export interface Destination {
  id: string;
  name: string;
  description: string;
  category: "hill_station" | "heritage" | "coastal" | "waterfall";
  difficulty: "easy" | "moderate" | "challenging";
  bestSeason: string;
  distanceFromBengaluru: string;
  lat: number;
  lng: number;
  image: string;
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Coorg (Madikeri)",
    description: "Scotland of India with coffee plantations, misty hills and winding roads perfect for biking.",
    category: "hill_station",
    difficulty: "moderate",
    bestSeason: "Oct – Mar",
    distanceFromBengaluru: "265 km",
    lat: 12.4208,
    lng: 75.7397,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  },
  {
    id: "2",
    name: "Hampi",
    description: "UNESCO World Heritage Site with ancient ruins, boulder-strewn landscapes and open highways.",
    category: "heritage",
    difficulty: "easy",
    bestSeason: "Nov – Feb",
    distanceFromBengaluru: "340 km",
    lat: 15.335,
    lng: 76.46,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
  },
  {
    id: "3",
    name: "Mysore",
    description: "City of palaces with heritage roads and the thrilling Chamundi Hills ghat section.",
    category: "heritage",
    difficulty: "easy",
    bestSeason: "Year-round",
    distanceFromBengaluru: "150 km",
    lat: 12.2958,
    lng: 76.6394,
    image: "https://images.unsplash.com/photo-1600850056064-a8b380df8395?w=600",
  },
  {
    id: "4",
    name: "Jog Falls",
    description: "India's second highest plunge waterfall surrounded by lush Western Ghats scenery.",
    category: "waterfall",
    difficulty: "challenging",
    bestSeason: "Aug – Dec",
    distanceFromBengaluru: "380 km",
    lat: 14.2295,
    lng: 74.8127,
    image: "https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?w=600",
  },
  {
    id: "5",
    name: "Gokarna",
    description: "Pristine beaches, coastal roads and stunning sunset views along the Arabian Sea.",
    category: "coastal",
    difficulty: "moderate",
    bestSeason: "Oct – Mar",
    distanceFromBengaluru: "490 km",
    lat: 14.5479,
    lng: 74.3188,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
  {
    id: "6",
    name: "Chikmagalur",
    description: "Coffee country with Mullayangiri peak, hairpin bends and breathtaking valley views.",
    category: "hill_station",
    difficulty: "challenging",
    bestSeason: "Sep – Mar",
    distanceFromBengaluru: "245 km",
    lat: 13.3153,
    lng: 75.7754,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
  },
  {
    id: "7",
    name: "Dandeli",
    description: "Adventure capital with dense forests, river rafting and wildlife safari routes.",
    category: "hill_station",
    difficulty: "moderate",
    bestSeason: "Oct – May",
    distanceFromBengaluru: "460 km",
    lat: 15.2667,
    lng: 74.6167,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
  },
  {
    id: "8",
    name: "Murdeshwar",
    description: "Coastal temple town with the world's second tallest Shiva statue and scenic beach roads.",
    category: "coastal",
    difficulty: "moderate",
    bestSeason: "Oct – Mar",
    distanceFromBengaluru: "490 km",
    lat: 14.0944,
    lng: 74.4844,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
  },
];

export const categoryLabels: Record<Destination["category"], string> = {
  hill_station: "Hill Stations",
  heritage: "Heritage",
  coastal: "Coastal",
  waterfall: "Waterfalls",
};

export const difficultyColors: Record<Destination["difficulty"], string> = {
  easy: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  challenging: "bg-red-100 text-red-800",
};
