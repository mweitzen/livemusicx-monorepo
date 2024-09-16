export interface BaseShape {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  about: string;
  location: string;
  genres: string[];
}

export interface Venue extends BaseShape {
  type: "Venue" | "Restaurant" | "Winery" | "Theater";
  keywords: string[];
  stages: string[];
  servesAlcohol: boolean;
  servesFood: boolean;
  ageRestriction: boolean;
  minimumAge: number;
  requiresReservation: boolean;
  reservationLink: string;
}

export const venues: Venue[] = [
  {
    id: "ven-1",
    slug: "the-cactus-club",
    name: "The Cactus Club",
    avatar: "https://picsum.photos/200",
    about: "A lively music venue in the heart of downtown Albuquerque.",
    location: "Albuquerque, New Mexico",
    genres: ["Rock", "Blues", "Indie"],
    type: "Venue",
    keywords: ["live music", "local bands", "craft beer"],
    stages: ["Main Stage"],
    servesAlcohol: true,
    servesFood: true,
    ageRestriction: false,
    minimumAge: 0,
    requiresReservation: false,
    reservationLink: "",
  },
  {
    id: "ven-2",
    slug: "rio-grande-theater",
    name: "Rio Grande Theater",
    avatar: "https://picsum.photos/200",
    about: "A historic theater hosting diverse performances in Las Cruces.",
    location: "Las Cruces, New Mexico",
    genres: ["Theater", "Classical", "Folk"],
    type: "Theater",
    keywords: ["performing arts", "historic venue", "family-friendly"],
    stages: ["Main Stage"],
    servesAlcohol: false,
    servesFood: false,
    ageRestriction: false,
    minimumAge: 0,
    requiresReservation: true,
    reservationLink: "https://www.riograndetheatre.com/reservations",
  },
  {
    id: "ven-3",
    slug: "the-starlight-cantina",
    name: "The Starlight Cantina",
    avatar: "https://picsum.photos/200",
    about: "An open-air cantina with live music under the desert sky.",
    location: "Tucson, Arizona",
    genres: ["Country", "Tejano", "Latin"],
    type: "Restaurant",
    keywords: ["outdoor dining", "margaritas", "dancing"],
    stages: ["Outdoor Stage"],
    servesAlcohol: true,
    servesFood: true,
    ageRestriction: false,
    minimumAge: 0,
    requiresReservation: false,
    reservationLink: "",
  },
  {
    id: "ven-4",
    slug: "mesa-verde-winery",
    name: "Mesa Verde Winery",
    avatar: "https://picsum.photos/200",
    about: "Enjoy wine tasting and acoustic music amidst the vineyards.",
    location: "Cortez, Colorado",
    genres: ["Folk", "Jazz", "Acoustic"],
    type: "Winery",
    keywords: ["wine tasting", "scenic views", "relaxing atmosphere"],
    stages: ["Vineyard Stage"],
    servesAlcohol: true,
    servesFood: true, // Assuming they offer light snacks or pairings
    ageRestriction: true,
    minimumAge: 21,
    requiresReservation: false,
    reservationLink: "",
  },
  {
    id: "ven-5",
    slug: "the-longhorn-saloon",
    name: "The Longhorn Saloon",
    avatar: "https://picsum.photos/200",
    about: "A classic Texas honky-tonk with live country music and dancing.",
    location: "Amarillo, Texas",
    genres: ["Country", "Western Swing", "Honky Tonk"],
    type: "Venue",
    keywords: ["dancing", "cowboy boots", "two-stepping"],
    stages: ["Main Stage", "Dance Floor"],
    servesAlcohol: true,
    servesFood: true,
    ageRestriction: true,
    minimumAge: 21,
    requiresReservation: false,
    reservationLink: "",
  },
];
