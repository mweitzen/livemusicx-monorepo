"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CreateOrganizerForm } from "@/forms/accounts/create-organizer";
import { CreatePerformerForm } from "@/forms/accounts/create-performer";
import { z } from "zod";
// import { CreateVenueForm } from "@/forms/accounts/create-venue";}

export default function TestPage() {
  // const { data: organizers } = api.accounts.organizers.getAll.useQuery();
  // const { data: groups } = api.accounts.groups.getAll.useQuery();
  // const { data: accounts } = api.accounts.musicians.getAll.useQuery();
  // const { data: venues } = api.accounts.venues.getAll.useQuery();

  // // Create API Calls
  // const { mutate: createOrganizer } = api.accounts.organizers.createAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  // const { mutate: createGroup } = api.accounts.groups.createAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  // const { mutate: createMusician } = api.accounts.musicians.createAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  // const { mutate: createVenue } = api.accounts.venues.createAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });

  // // Claim API Calls
  // const { mutate: claimOrganizer } = api.accounts.organizers.claimAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  // const { mutate: claimGroup } = api.accounts.groups.claimAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  // const { mutate: claimMusician } = api.accounts.musicians.claimAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  // const { mutate: claimVenue } = api.accounts.venues.claimAccount.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });

  // // Create Account Functions
  // function handleCreateOrganizer() {
  //   createOrganizer({
  //     // basic info
  //     name: "",
  //     avatar: "",
  //     about: "",
  //     genres: [{ id: "1" }, { id: "2" }, { id: "3" }],
  //     website: "",

  //     // contact
  //     phone: "",
  //     email: "",
  //     canCall: true,
  //     canText: true,
  //     canEmail: true,

  //     // social
  //     socialFacebook: "",
  //     socialInstagram: "",
  //     socialTwitter: "",
  //     socialYouTube: "",
  //   });
  // }

  // function handleCreateGroup() {
  //   createGroup({
  //     // basic
  //     avatar: "",
  //     name: "Alex Alunday Trio",
  //     about: "A jazz trio",
  //     basedInId: "1",
  //     website: "https://www.alexalunday.com",

  //     // group info
  //     genres: [{ id: "1" }, { id: "2" }, { id: "3" }],
  //     members: [{ id: "1" }, { id: "2" }, { id: "3" }],

  //     // contact
  //     phone: "123-456-7890",
  //     // email: "",
  //     canCall: true,
  //     canText: true,
  //     canEmail: true,

  //     // social
  //     socialFacebook: "",
  //     socialInstagram: "",
  //     socialTwitter: "",
  //     socialYouTube: "",
  //     socialBandcamp: "",
  //     socialSpotify: "",
  //     // socialSoundCloud: "",
  //   });
  // }

  // function handleCreateMusician() {
  //   createMusician({
  //     // basic
  //     name: "",
  //     avatar: "",
  //     about: "",
  //     basedInId: "1",
  //     website: "",

  //     // musician info
  //     genres: [{ id: "1" }, { id: "2" }, { id: "3" }],
  //     groups: [{ id: "1" }, { id: "2" }, { id: "3" }],

  //     // contact
  //     phone: "",
  //     email: "",
  //     canCall: true,
  //     canText: true,
  //     canEmail: true,

  //     // social
  //     socialFacebook: "",
  //     socialInstagram: "",
  //     socialTwitter: "",
  //     socialYouTube: "",
  //     socialBandcamp: "",
  //     socialSpotify: "",
  //     // socialSoundCloud: "",
  //   });
  // }

  // function handleCreateVenue() {
  //   createVenue({
  //     // basic info
  //     name: "",
  //     avatar: "",
  //     about: "",
  //     website: "",
  //     genres: [{ id: "1" }, { id: "2" }, { id: "3" }],

  //     // venue info
  //     type: "BAR",
  //     stages: [
  //       { name: "Main Stage", type: "STAGE" },
  //       { name: "Patio", type: "STAGE" },
  //     ],
  //     servesAlcohol: true,
  //     servesFood: true,
  //     ageRestriction: false,
  //     minimumAge: 0,
  //     // contact
  //     phone: "",
  //     email: "",
  //     phoneBooking: "",
  //     emailBooking: "",
  //     canCall: true,
  //     canText: true,
  //     canEmail: true,

  //     // address
  //     streetNumber: "",
  //     unit: "",
  //     addressLong: "",
  //     zipcode: 0,
  //     street: "",
  //     city: "",
  //     state: "",
  //     neighborhood: "",

  //     //social/business
  //     socialFacebook: "",
  //     socialInstagram: "",
  //     socialTwitter: "",
  //     socialYouTube: "",
  //     businessYelp: "",
  //     businessGoogle: "",
  //     businessTripAdvisor: "",
  //     businessOpenTable: "",
  //   });
  // }

  // // Claim Account Functions
  // function handleClaimOrganizer() {
  //   if (!selectedAccountId) return;
  //   // claimOrganizer({ id: selectedAccountId });
  // }
  // function handleClaimGroup() {
  //   if (!selectedAccountId) return;
  //   claimGroup({ id: selectedAccountId });
  // }
  // function handleClaimMusician() {
  //   if (!selectedAccountId) return;
  //   claimMusician({ id: selectedAccountId });
  // }
  // function handleClaimVenue() {
  //   if (!selectedAccountId) return;
  //   // claimVenue({ id: selectedAccountId });
  // }

  // const test = z.object({
  //   name: z.string().default("big bob"),
  //   about: z.string().optional(),
  // });

  // const result = test.safeParse({});
  // if (result.success) {
  //   console.log(result.data);
  // } else {
  //   console.log(result.error);
  // }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-center font-semibold tracking-tight text-xl mb-2">
        Account Creation Demos
      </h1>
      <Tabs defaultValue="venue">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="venue">Venue</TabsTrigger>
          <TabsTrigger value="organizer">Organizer</TabsTrigger>
          <TabsTrigger value="performer">Performer</TabsTrigger>
        </TabsList>
        <TabsContent value="venue">{/* <CreateVenueForm /> */}</TabsContent>
        <TabsContent value="organizer">
          <CreateOrganizerForm />
        </TabsContent>
        <TabsContent value="performer">
          <CreatePerformerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
