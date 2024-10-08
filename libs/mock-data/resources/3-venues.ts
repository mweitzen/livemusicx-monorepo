export const venues = [
  {
    name: "Skidmore's Holiday Bowl",
    type: "BAR",
    complete: "7515 Lomas Blvd NE, Albuquerque, NM 87110, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 7515,
    street_id: "Lomas Blvd NE",
    neighborhood_id: "Jerry Cline Park",
    zip_code_id: 87110,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 268-3308",
    website: "http://holidaybowlabq.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "skidmores-holiday-bowl",
    requires_reservation: false,
  },
  {
    name: "Sister",
    type: "BAR",
    complete: "407 Central Ave NW, Albuquerque, NM 87102, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 407,
    street_id: "Central Ave NW",
    neighborhood_id: "Albuquerque Original Townsite",
    zip_code_id: 87102,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 242-4900",
    website: "http://www.sisterthebar.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "sister",
    requires_reservation: false,
  },
  {
    name: "Isleta Resort & Casino",
    stages: [
      { type: "STAGE", name: "The Showroom" },
      { type: "STAGE", name: "Triple Sevens Saloon" },
    ],
    type: "CASINO",
    complete: "11000 Broadway Blvd SE, Albuquerque, NM 87105, USA",
    street_number: 11000,
    street_id: "Broadway Blvd SE",
    zip_code_id: 87105,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 724-3800",
    website: "http://www.isleta.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "isleta-resort-and-casino",
    requires_reservation: false,
  },
  {
    name: "Launchpad",
    type: "VENUE",
    complete: "618 Central Ave SW, Albuquerque, NM 87102, USA",
    minimum_age: 18,
    age_restriction: true,
    street_number: 618,
    street_id: "Central Ave SW",
    neighborhood_id: "Raynolds Addition",
    zip_code_id: 87102,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: false,
    contact_phone: "(505) 764-8887",
    website: "http://www.launchpadrocks.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "launchpad",
    requires_reservation: false,
  },
  {
    name: "Kaktus Brewing Company Inc.",
    type: "BREWERY",
    complete: "471 South Hill, Bernalillo, NM 87004, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 471,
    street_id: "South Hill",
    zip_code_id: 87004,
    city_id: "Bernalillo",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 295-3186",
    website: "http://www.kaktusbrewery.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "kaktus-brewing-company-inc",
    requires_reservation: false,
  },
  {
    name: "ABQ BioPark - Botanic Garden",
    stages: [{ type: "AREA", name: "River of Lights" }],
    type: "COMPLEX",
    complete: "2601 Central Ave NW, Albuquerque, NM 87104, USA",
    street_number: 2601,
    street_id: "Central Ave NW",
    neighborhood_id: "West Old Town",
    zip_code_id: 87104,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: false,
    serves_food: false,
    contact_phone: "(505) 764-6200",
    website: "http://www.cabq.gov/biopark",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "abq-biopark-botanic-garden",
    requires_reservation: false,
  },
  {
    name: "Moonlight Lounge",
    type: "VENUE",
    complete: "120 Central Ave SW, Albuquerque, NM 87102, USA",
    minimum_age: 18,
    age_restriction: true,
    street_number: 120,
    street_id: "Central Ave SW",
    neighborhood_id: "Raynolds Addition",
    zip_code_id: 87102,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: false,
    contact_phone: "(505) 764-0249",
    website: "https://moonlightloungelive.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "moonlight-lounge",
    requires_reservation: false,
  },
  {
    name: "Tractor Brewing Company Westside",
    type: "BREWERY",
    complete: "5720 McMahon Blvd NW bldg 5 ste a, Albuquerque, NM 87114, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 5720,
    street_id: "McMahon Blvd NW",
    neighborhood_id: "Skies West",
    zip_code_id: 87114,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 361-1834",
    website: "http://www.getplowed.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "tractor-brewing-company-westside",
    requires_reservation: false,
  },
  {
    name: "Tractor Brewing Company Nob Hill",
    type: "BREWERY",
    complete: "118 Tulane Dr SE, Albuquerque, NM 87106, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 118,
    street_id: "Tulane Dr SE",
    neighborhood_id: "Nob Hill",
    zip_code_id: 87106,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 433-5654",
    website: "http://www.getplowed.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "tractor-brewing-company-nob-hill",
    requires_reservation: false,
  },
  {
    name: "The Dirty Bourbon",
    type: "BAR",
    complete: "9800 Montgomery Blvd NE, Albuquerque, NM 87111, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 9800,
    street_id: "Montgomery Blvd NE",
    neighborhood_id: "San Gabriel",
    zip_code_id: 87111,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 296-2726",
    website: "http://thedirtybourbon.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "the-dirty-bourbon",
    requires_reservation: false,
  },
  {
    name: "Marble Brewery NE Heights",
    type: "BREWERY",
    complete: "9904 Montgomery Blvd NE, Albuquerque, NM 87111, USA",
    minimum_age: 21,
    street_number: 9904,
    street_id: "Montgomery Blvd NE",
    neighborhood_id: "San Gabriel",
    zip_code_id: 87111,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    age_restriction: true,
    serves_alcohol: true,
    serves_food: false,
    about: "We brew things",
    contact_phone: "(505) 323-4030",
    website: "http://www.marblebrewery.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "marble-brewery-ne-heights",
    requires_reservation: false,
  },
  {
    name: "Sandia Resort & Casino",
    stages: [{ type: "STAGE", name: "Tlur Pa Lounge" }],
    type: "CASINO",
    complete: "30 Rainbow Rd, Albuquerque, NM 87113, USA",
    street_number: 30,
    street_id: "Rainbow Rd",
    zip_code_id: 87113,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 796-7500",
    website: "http://www.sandiacasino.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "sandia-resort-and-casino",
    requires_reservation: false,
  },
  {
    name: "The First Turn Lounge",
    type: "BAR",
    complete: "145 Louisiana Blvd NE, Albuquerque, NM 87108, USA",
    street_number: 145,
    street_id: "Louisiana Blvd NE",
    neighborhood_id: "Fairgrounds Addition",
    zip_code_id: 87108,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: false,
    contact_phone: "(505) 767-7171",
    website: "",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "the-first-turn-lounge",
    requires_reservation: false,
  },
  {
    name: "Outpost Performance Space",
    type: "VENUE",
    complete: "210 Yale Blvd SE, Albuquerque, NM 87106, USA",
    street_number: 210,
    street_id: "Yale Blvd SE",
    neighborhood_id: "University Heights",
    zip_code_id: 87106,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: false,
    contact_phone: "(505) 268-0044",
    website: "http://www.outpostspace.org/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "outpost-performance-space",
    requires_reservation: false,
  },
  {
    name: "Lensic Performing Arts Center",
    type: "THEATER",
    complete: "211 W San Francisco St, Santa Fe, NM 87501, USA",
    street_number: 211,
    street_id: "W San Francisco St",
    zip_code_id: 87501,
    city_id: "Santa Fe",
    state_id: "New Mexico",
    serves_alcohol: false,
    serves_food: false,
    contact_phone: "(505) 988-1234",
    website: "https://lensic.org/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "lensic-performing-arts-center",
    requires_reservation: false,
  },
  {
    name: "M'tucci's Italian",
    type: "RESTAURANT",
    complete: "6001 Winter Haven Rd NW M, Albuquerque, NM 87120, USA",
    minimum_age: 0,
    street_number: 6001,
    unit: "M",
    street_id: "Winter Haven Rd NW",
    zip_code_id: 87120,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    age_restriction: false,
    serves_alcohol: true,
    serves_food: true,
    about: "More italian things",
    contact_phone: "(505) 554-2660",
    website: "https://www.mtuccis.com/italian",
    avatar:
      "https://powoppetcaklcixcjhlg.supabase.co/storage/v1/object/public/images/venues/mtuccis-avatar.png",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "mtuccis-italian",
    requires_reservation: false,
  },
  {
    name: "M'tucci's Bar Roma",
    type: "RESTAURANT",
    complete: "3222 Central Ave SE, Albuquerque, NM 87106, USA",
    street_number: 3222,
    street_id: "Central Ave SE",
    neighborhood_id: "Nob Hill",
    zip_code_id: 87106,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    about: "yet another italian",
    contact_phone: "(505) 508-3948",
    website: "https://www.mtuccis.com/barroma",
    avatar:
      "https://powoppetcaklcixcjhlg.supabase.co/storage/v1/object/public/images/venues/mtuccis-avatar.png",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "mtuccis-bar-roma",
    requires_reservation: false,
  },
  {
    name: "M'tucci's Twenty-Five",
    type: "RESTAURANT",
    complete: "4939 Pan American Fwy, Albuquerque, NM 87109, USA",
    street_number: 4939,
    street_id: "Pan American Fwy",
    neighborhood_id: "Jefferson Commons",
    zip_code_id: 87109,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    about: "Italian things",
    contact_phone: "(505) 554-2660",
    website: "https://www.mtuccis.com/twentyfive",
    avatar:
      "https://powoppetcaklcixcjhlg.supabase.co/storage/v1/object/public/images/venues/mtuccis-avatar.png",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "mtuccis-twenty-five",
    requires_reservation: false,
  },
  {
    name: "Vernon's Speakeasy",
    stages: [
      { type: "STAGE", name: "Black Diamond Lounge" },
      { type: "ROOM", name: "Chamber" },
      { type: "AREA", name: "VIP Patio" },
    ],
    type: "RESTAURANT",
    complete: "6855 4th St NW, Albuquerque, NM 87107, USA",
    minimum_age: 13,
    age_restriction: true,
    street_number: 6855,
    street_id: "4th St NW",
    zip_code_id: 87107,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    about: "Steakhouse, live music",
    contact_phone: "(505) 341-0831",
    website: "https://www.yougottapassword.com",
    avatar:
      "https://powoppetcaklcixcjhlg.supabase.co/storage/v1/object/public/images/venues/vernons-avatar.png",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "vernons-speakeasy",
    requires_reservation: true,
    reservation_link: "https://www.yougottapassword.com",
  },
  {
    name: "Cafe 6855",
    stages: [
      { type: "AREA", name: "Patio" },
      { type: "ROOM", name: "Main Dining" },
    ],
    type: "RESTAURANT",
    complete: "6855 4th St NW, Los Ranchos de Albuquerque, NM 87107, USA",
    street_number: 6855,
    street_id: "4th St NW",
    zip_code_id: 87107,
    city_id: "Los Ranchos de Albuquerque",
    state_id: "New Mexico",
    age_restriction: false,
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 890-9150",
    website: "https://www.cafe6855.com",
    contact_can_call: true,
    contact_can_email: false,
    contact_can_text: false,
    slug: "cafe-68555",
    requires_reservation: false,
  },
  {
    name: "The Mine Shaft Tavern & Cantina",
    type: "BAR",
    complete: "2846 NM-14, Madrid, NM 87010, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 2846,
    street_id: "NM-14",
    zip_code_id: 87010,
    city_id: "Madrid",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: true,
    contact_phone: "(505) 473-0743",
    website: "http://www.themineshafttavern.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "the-mine-shaft-tavern-and-cantina",
    requires_reservation: false,
  },
  {
    name: "Canteen Brewhouse",
    type: "BAR",
    complete: "2381 Aztec Rd NE, Albuquerque, NM 87107, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 2381,
    street_id: "Aztec Rd NE",
    neighborhood_id: "Cutter Industrial Park",
    zip_code_id: 87107,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: true,
    serves_food: false,
    contact_phone: "(505) 881-2737",
    website: "http://www.canteenbrewhouse.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "canteen-brewhouse",
    requires_reservation: false,
  },
  {
    name: "Revel",
    type: "COMPLEX",
    complete: "4720 Alexander Blvd NE, Albuquerque, NM 87107, USA",
    street_number: 4720,
    street_id: "Alexander Blvd NE",
    neighborhood_id: "Renaissance",
    zip_code_id: 87107,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: false,
    serves_food: true,
    contact_phone: "(505) 321-0406",
    website: "http://www.revelabq.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "revel",
    requires_reservation: false,
  },
  {
    name: "Marble Brewery Westside Taproom",
    type: "BREWERY",
    complete: "5740 Night Whisper Rd NW, Albuquerque, NM 87114, USA",
    minimum_age: 21,
    age_restriction: true,
    street_number: 5740,
    street_id: "Night Whisper Rd NW",
    neighborhood_id: "Skies West",
    zip_code_id: 87114,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: false,
    serves_food: false,
    contact_phone: "(505) 508-4368",
    website: "https://marblebrewery.com/taprooms/westside",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "marble-brewery-westside-taproom",
    requires_reservation: false,
  },
  {
    name: "Popejoy Hall",
    type: "THEATER",
    complete: "203 Cornell Dr, Albuquerque, NM 87131, USA",
    street_number: 203,
    street_id: "Night Whisper Rd NW",
    neighborhood_id: "Central Campus",
    zip_code_id: 87131,
    city_id: "Albuquerque",
    state_id: "New Mexico",
    serves_alcohol: false,
    serves_food: false,
    contact_phone: "(505) 277-8010",
    website: "http://popejoypresents.com/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "popejoy-hall",
    requires_reservation: false,
  },
  {
    name: "Scottish Rite Masonic Center",
    type: "LOCATION",
    complete: "463 Paseo De Peralta, Santa Fe, NM 87501, USA",
    street_number: 463,
    street_id: "Paseo De Peralta",
    zip_code_id: 87501,
    city_id: "Santa Fe",
    state_id: "New Mexico",
    serves_alcohol: false,
    serves_food: false,
    contact_phone: "(505) 982-4414",
    website: "http://nmscottishrite.org/",
    contact_can_call: true,
    contact_can_email: true,
    contact_can_text: true,
    slug: "scottish-rite-masonic-center",
    requires_reservation: false,
  },
];

/**
 *
 * LOCATIONS
 *
 */
// const venuesData: Prisma.VenueCreateInput[] = venues.map((venue) => ({
//   name: venue.name,
//   slug: venue.slug,
//   address_complete: venue.complete,
//   address_short: venue.complete.split(",").slice(0, 2).join(),
//   city: {
//     connect: {
//       unique_name: `${venue.city_id.trim()}, New Mexico`,
//     },
//   },
//   state: {
//     connect: {
//       name: "New Mexico",
//     },
//   },
//   zipcode: {
//     connect: {
//       code: venue.zip_code_id,
//     },
//   },
//   street: {
//     connectOrCreate: {
//       where: {
//         unique_name: `${venue.street_id}, ${venue.city_id}, New Mexico`,
//       },
//       create: {
//         name: venue.city_id,
//         unique_name: `${venue.street_id}, ${venue.city_id}, New Mexico`,
//         city: {
//           connect: {
//             unique_name: `${venue.city_id}, New Mexico`,
//           },
//         },
//       },
//     },
//   },
//   about: venue.about || undefined,
//   age_restriction: venue.age_restriction,
//   serves_alcohol: venue.serves_alcohol,
//   serves_food: venue.serves_food,
//   avatar: venue.avatar || undefined,
//   contact_can_call: true,
//   contact_can_text: false,
//   contact_can_email: false,
//   contact_phone: venue.contact_phone,
//   website: venue.website,
//   minimum_age: venue.minimum_age || undefined,
//   neighborhood: venue.neighborhood_id
//     ? {
//         connectOrCreate: {
//           where: {
//             unique_name: `${venue.neighborhood_id}, ${venue.city_id}, New Mexico`,
//           },
//           create: {
//             name: venue.neighborhood_id,
//             unique_name: `${venue.neighborhood_id}, ${venue.city_id}, New Mexico`,
//             city: {
//               connect: {
//                 unique_name: `${venue.city_id}, New Mexico`,
//               },
//             },
//           },
//         },
//       }
//     : undefined,
//   requires_reservation: venue.requires_reservation,
//   reservation_link: venue.reservation_link || undefined,
//   street_number: venue.street_number.toString(),
//   type: venue.type as VenueType,
//   unit: venue.unit || undefined,
//   stages: venue.stages
//     ? {
//         createMany: {
//           data: venue.stages as { type: StageType; name: string }[],
//         },
//       }
//     : undefined,
// }));
