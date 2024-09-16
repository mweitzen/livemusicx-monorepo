import type {
  AboutPage,
  Answer,
  ArtGallery,
  BarOrPub,
  Brewery,
  CafeOrCoffeeShop,
  Casino,
  Distillery,
  Event,
  EventSeries,
  EventVenue,
  ExhibitionEvent,
  Festival,
  FoodEvent,
  ChildrensEvent,
  LocalBusiness,
  MusicEvent,
  MusicGroup,
  MusicVenue,
  NightClub,
  Offer,
  Organization,
  Park,
  PerformingArtsTheater,
  Person,
  Question,
  RadioStation,
  Recommendation,
  Restaurant,
  SocialEvent,
  StadiumOrArena,
  Winery,
  WithContext,
} from "schema-dts";

export default function StructuredData({
  jsonLd,
}: {
  jsonLd: WithContext<
    | AboutPage
    | Answer
    | ArtGallery
    | BarOrPub
    | Brewery
    | CafeOrCoffeeShop
    | Casino
    | ChildrensEvent
    | Distillery
    | Event
    | EventSeries
    | EventVenue
    | ExhibitionEvent
    | Festival
    | FoodEvent
    | LocalBusiness
    | MusicEvent
    | MusicGroup
    | MusicVenue
    | NightClub
    | Offer
    | Organization
    | Park
    | PerformingArtsTheater
    | Person
    | Question
    | RadioStation
    | Recommendation
    | Restaurant
    | SocialEvent
    | StadiumOrArena
    | Winery
  >;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
