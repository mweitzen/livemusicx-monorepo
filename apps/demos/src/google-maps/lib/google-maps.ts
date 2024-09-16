import axios from "axios";

export interface GooglePlaceResult {
  name: string;
  about?: string;
  phone?: string;
  website?: string;
  businessGoogle?: string;
  latitude: number;
  longitude: number;
  addressLong: string;
  addressShort: string;
  streetNumber?: number;
  unit?: string;
  street: string;
  neighborhood?: string;
  zipcode: number;
  city: string;
  state: string;
  servesFood: boolean;
  servesAlcohol: boolean;
}

const addressMap = {
  street_number: "streetNumber",
  route: "street",
  neighborhood: "neighborhood",
  postal_code: "zipcode",
  locality: "city",
  administrative_area_level_1: "state",
  subpremise: "unit",
} as const;

export function formatGooglePlaceResult(
  details: google.maps.places.PlaceResult & PlaceDetailsResult
): GooglePlaceResult {
  if (!details.address_components) {
    throw new Error("Missing address_components");
  }
  if (!details.geometry || !details.geometry.location) {
    throw new Error("Missing geometry");
  }

  const address: Pick<
    GooglePlaceResult,
    "streetNumber" | "unit" | "street" | "neighborhood" | "zipcode" | "city" | "state"
  > = {
    streetNumber: 0,
    unit: undefined,
    street: "",
    neighborhood: undefined,
    zipcode: 0,
    city: "",
    state: "",
  };

  details.address_components.forEach((c) => {
    const type = c.types[0] as keyof typeof addressMap;
    const formattedType = addressMap[type];
    if (formattedType === "streetNumber" || formattedType === "zipcode") {
      address[formattedType] = Number(c.short_name);
    } else {
      if (formattedType in address) {
        address[formattedType] = c.short_name;
      }
    }
  });

  return {
    name: details.name ?? "--ERROR--",
    about: details.editorialSummary?.text,
    phone: details.formatted_phone_number,
    website: details.website,
    businessGoogle: details.url,
    latitude: details.geometry.location.lat(),
    longitude: details.geometry.location.lng(),
    addressLong: details.formatted_address!,
    addressShort: `${address.streetNumber} ${address.street}, ${address.city}, ${address.state}`,
    servesFood:
      details.dineIn ||
      details.servesLunch ||
      details.servesDinner ||
      details.servesBrunch ||
      details.servesBreakfast ||
      false,
    servesAlcohol: details.servesWine || details.servesBeer || details.servesCocktails || false,
    ...address,
  };
}

export function getAutocompleteWidget(
  places: google.maps.PlacesLibrary,
  input: HTMLInputElement
) {
  return new places.Autocomplete(input, {
    componentRestrictions: { country: "us" },
    bounds: {
      north: 36.99898,
      west: -109.045199,
      south: 31.33222,
      east: -103.064557,
    },
    strictBounds: true,
    fields: [
      "name",
      "geometry",
      "address_components",
      "formatted_address",
      "formatted_phone_number",
      "place_id",
      "website",
      "editorial_summary",
      "serves_beer",
      "serves_wine",
      "url",
    ],
    types: ["establishment"],
  });
}

interface PlaceDetailsResult {
  types: string[];
  dineIn?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesBrunch?: boolean;
  servesBreakfast?: boolean;
  servesWine?: boolean;
  servesBeer?: boolean;
  servesCocktails?: boolean;
  primaryTypeDisplayName: { text: string; languageCode: string };
  editorialSummary?: { text: string; languageCode: string };
}

export async function getPlaceDetails(placeId: string) {
  const fields = [
    "dineIn",
    "servesLunch",
    "servesDinner",
    "servesBrunch",
    "servesBreakfast",
    "servesWine",
    "servesBeer",
    "servesCocktails",
    "primaryTypeDisplayName",
    "types",
    "editorialSummary",
  ];

  const pathname = `https://places.googleapis.com/v1/places/${placeId}`;
  const searchParams = new URLSearchParams({
    fields: fields.join(","),
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  }).toString();
  const url = `${pathname}?${searchParams}`;

  return await axios.get<PlaceDetailsResult>(url);
}
