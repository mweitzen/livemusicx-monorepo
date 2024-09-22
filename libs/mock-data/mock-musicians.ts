interface BaseShape {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  about: string;
  location: string;
  genres: string[];
}

export interface Musician extends BaseShape {
  bands: string[];
}

export const musicians: Musician[] = [
  {
    id: "mus-1",
    slug: "rosa-mendosa",
    name: "Rosa Mendosa",
    avatar: "https://picsum.photos/200",
    about: "Singer-songwriter with a soulful voice and captivating lyrics.",
    location: "Albuquerque, New Mexico",
    genres: ["Folk", "Americana"],
    bands: [],
  },
  {
    id: "mus-2",
    slug: "javier-hernandez",
    name: "Javier Hernandez",
    avatar: "https://picsum.photos/200",
    about: "Accordion virtuoso and Tejano music legend.",
    location: "San Antonio, Texas",
    genres: ["Tejano", "Conjunto"],
    bands: ["band-3"],
  },
  {
    id: "mus-3",
    slug: "billy-joe-reynolds",
    name: "Billy Joe Reynolds",
    avatar: "https://picsum.photos/200",
    about: "A true cowboy crooner, singing tales of the open range.",
    location: "Amarillo, Texas",
    genres: ["Country", "Western Swing"],
    bands: ["band-6"],
  },
  {
    id: "mus-4",
    slug: "leticia-gutierrez",
    name: "Leticia Gutierrez",
    avatar: "https://picsum.photos/200",
    about: "A powerful voice bringing Norteño music to life.",
    location: "Chihuahua, Mexico",
    genres: ["Norteño", "Ranchera"],
    bands: [],
  },
  {
    id: "mus-5",
    slug: "cody-thunderbird",
    name: "Cody Thunderbird",
    avatar: "https://picsum.photos/200",
    about: "A flute player weaving melodies of the Native American spirit.",
    location: "Gallup, New Mexico",
    genres: ["Native American Flute", "World"],
    bands: ["band-6"],
  },
  {
    id: "mus-6",
    slug: "sierra-dawn",
    name: "Sierra Dawn",
    avatar: "https://picsum.photos/200",
    about: "A fiddler with lightning-fast fingers and a passion for bluegrass.",
    location: "Telluride, Colorado",
    genres: ["Bluegrass", "Folk"],
    bands: [],
  },
  {
    id: "mus-7",
    slug: "carlos-imira",
    name: "Carlos Imira",
    avatar: "https://picsum.photos/200",
    about:
      "A dynamic soloist bringing the passion of flamenco to the Southwest.",
    location: "Santa Fe, New Mexico",
    genres: ["Flamenco", "Spanish Guitar"],
    bands: [],
  },
  {
    id: "mus-8",
    slug: "the-reverend-johnson",
    name: "The Reverend Johnson",
    avatar: "https://picsum.photos/200",
    about: "Preaching the blues with a soulful voice and slide guitar.",
    location: "Austin, Texas",
    genres: ["Blues", "Gospel"],
    bands: ["band-1"],
  },
  {
    id: "mus-9",
    slug: "luna-rising",
    name: "Luna Rising",
    avatar: "https://picsum.photos/200",
    about: "An indie-folk singer-songwriter with haunting melodies.",
    location: "Flagstaff, Arizona",
    genres: ["Indie Folk", "Singer-Songwriter"],
    bands: ["band-5"],
  },
  {
    id: "mus-10",
    slug: "dj-cactus-jack",
    name: "DJ Cactus Jack",
    avatar: "https://picsum.photos/200",
    about: "Spinning cumbia beats and keeping the dance floor moving.",
    location: "El Paso, Texas",
    genres: ["Cumbia", "Latin Electronic"],
    bands: ["band-4"],
  },
  {
    id: "mus-11",
    slug: "the-red-rock-rapper",
    name: "The Red Rock Rapper",
    avatar: "https://picsum.photos/200",
    about: "Spitting rhymes about life in the desert Southwest.",
    location: "Moab, Utah",
    genres: ["Hip Hop", "Conscious Rap"],
    bands: ["band-2"],
  },
  {
    id: "mus-12",
    slug: "the-mariachi-diva",
    name: "The Mariachi Diva",
    avatar: "https://picsum.photos/200",
    about: "An all-female mariachi group breaking boundaries.",
    location: "Tucson, Arizona",
    genres: ["Mariachi", "Feminist"],
    bands: ["band-6"],
  },
  {
    id: "mus-13",
    slug: "the-dust-bowl-troubadour",
    name: "The Dust Bowl Troubadour",
    avatar: "https://picsum.photos/200",
    about: "Telling stories of hardship and resilience through folk music.",
    location: "Oklahoma City, Oklahoma",
    genres: ["Folk", "Roots"],
    bands: [],
  },
  {
    id: "mus-14",
    slug: "el-trio-romantico",
    name: "El Trio Romántico",
    avatar: "https://picsum.photos/200",
    about: "Serenading hearts with traditional boleros and rancheras.",
    location: "Albuquerque, New Mexico",
    genres: ["Bolero", "Ranchera"],
    bands: ["band-1"],
  },
  {
    id: "mus-15",
    slug: "the-canyonland-cowboy",
    name: "The Canyonland Cowboy",
    avatar: "https://picsum.photos/200",
    about: "Yodeling and playing Western swing under the Utah stars.",
    location: "Moab, Utah",
    genres: ["Western Swing", "Cowboy"],
    bands: ["band-2"],
  },
  {
    id: "mus-16",
    slug: "spirit-horse",
    name: "Spirit Horse",
    avatar: "https://picsum.photos/200",
    about: "A Native American rock band blending tradition and modernity.",
    location: "Window Rock, Arizona",
    genres: ["Native American Rock", "Alternative"],
    bands: [],
  },
  {
    id: "mus-17",
    slug: "the-desert-bloom-orchestra",
    name: "The Desert Bloom Orchestra",
    avatar: "https://picsum.photos/200",
    about: "A symphony orchestra bringing classical music to the desert.",
    location: "Phoenix, Arizona",
    genres: ["Classical", "Orchestral"],
    bands: ["band-3"],
  },
  {
    id: "mus-18",
    slug: "the-chile-pepper-picker",
    name: "The Chile Pepper Picker",
    avatar: "https://picsum.photos/200",
    about: "A spicy mix of bluegrass and New Mexican flavors.",
    location: "Hatch, New Mexico",
    genres: ["Bluegrass", "New Mexican"],
    bands: ["band-3"],
  },
  {
    id: "mus-19",
    slug: "la-reina-del-acordeon",
    name: "La Reina del Acordeón",
    avatar: "https://picsum.photos/200",
    about: "A female accordionist dominating the conjunto scene.",
    location: "Laredo, Texas",
    genres: ["Conjunto", "Tejano"],
    bands: ["band-2"],
  },
  {
    id: "mus-20",
    slug: "the-cosmic-cowboy",
    name: "The Cosmic Cowboy",
    avatar: "https://picsum.photos/200",
    about: "Blending country, rock, and psychedelia in the desert.",
    location: "Marfa, Texas",
    genres: ["Psychedelic Country", "Space Rock"],
    bands: [],
  },
];
