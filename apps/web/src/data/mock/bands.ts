export interface BaseShape {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  about: string;
  location: string;
  genres: string[];
}

export interface Band extends BaseShape {
  members: string[];
}

export const bands: Band[] = [
  {
    id: "band-1",
    slug: "the-desert-roses",
    name: "The Desert Roses",
    avatar: "https://picsum.photos/200",
    about: "A folk-rock trio harmonizing the spirit of the Southwest.",
    location: "Santa Fe, New Mexico",
    genres: ["Folk", "Rock", "Americana"],
    members: ["mus-8", "mus-14"],
  },
  {
    id: "band-2",
    slug: "los-chicos-del-sol",
    name: "Los Chicos del Sol",
    avatar: "https://picsum.photos/200",
    about: "Bringing the heat of Tejano music to every stage.",
    location: "El Paso, Texas",
    genres: ["Tejano", "Cumbia", "Norteño"],
    members: ["mus-11", "mus-15", "mus-19"],
  },
  {
    id: "band-3",
    slug: "the-mesa-mavericks",
    name: "The Mesa Mavericks",
    avatar: "https://picsum.photos/200",
    about: "Red dirt country with a Southwestern twist.",
    location: "Lubbock, Texas",
    genres: ["Country", "Red Dirt", "Rock"],
    members: ["mus-2", "mus-17", "mus-18"],
  },
  {
    id: "band-4",
    slug: "navajo-nation-drummers",
    name: "Navajo Nation Drummers",
    avatar: "https://picsum.photos/200",
    about: "Sharing the powerful rhythms and traditions of the Navajo people.",
    location: "Window Rock, Arizona",
    genres: ["Traditional", "Native American", "World"],
    members: ["mus-10"],
  },
  {
    id: "band-5",
    slug: "the-coyote-creek- Ramblers",
    name: "The Coyote Creek Ramblers",
    avatar: "https://picsum.photos/200",
    about: "Bluegrass band keeping the spirit of the West alive.",
    location: "Durango, Colorado",
    genres: ["Bluegrass", "Folk", "Americana"],
    members: ["mus-9"],
  },
  {
    id: "band-6",
    slug: "mariachi-sol-de-mexico",
    name: "Mariachi Sol de Mexico",
    avatar: "https://picsum.photos/200",
    about: "A vibrant mariachi ensemble celebrating Mexican culture.",
    location: "Phoenix, Arizona",
    genres: ["Mariachi", "Traditional Mexican"],
    members: ["mus-3", "mus-5", "mus-12"],
  },
  {
    id: "band-7",
    slug: "the-high-desert-gypsies",
    name: "The High Desert Gypsies",
    avatar: "https://picsum.photos/200",
    about: "Psychedelic rock infused with the spirit of the desert.",
    location: "Joshua Tree, California",
    genres: ["Psychedelic Rock", "Desert Rock", "Alternative"],
    members: [],
  },
];
