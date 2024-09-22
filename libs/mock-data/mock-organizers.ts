interface BaseShape {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  about: string;
  location: string;
  genres: string[];
}

export interface Organizer extends BaseShape {
  overview: string;
  areasServed: string[];
}

export const organizers: Organizer[] = [
  {
    id: "org-505",
    slug: "desert-beats",
    name: "Desert Beats Collective",
    avatar: "https://picsum.photos/200",
    about: "Showcasing the vibrant music scene of the Southwest.",
    location: "Albuquerque, New Mexico",
    genres: ["Folk", "Country", "Americana"],
    overview:
      "We're passionate about promoting local and regional artists, hosting intimate shows, open mics, and community gatherings.",
    areasServed: ["New Mexico", "Arizona", "Colorado"],
  },
  {
    id: "org-texmex",
    slug: "tex-mex-sound",
    name: "Tex-Mex Sound",
    avatar: "https://picsum.photos/200",
    about: "Bringing the energy of Tejano and Norteño music to the Southwest.",
    location: "El Paso, Texas",
    genres: ["Tejano", "Norteño", "Conjunto"],
    overview:
      "We organize lively dances, festivals, and concerts, celebrating the rich musical heritage of the borderlands.",
    areasServed: ["Texas", "New Mexico", "Chihuahua (Mexico)"],
  },
];
