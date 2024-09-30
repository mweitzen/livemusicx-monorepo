// import { useState, type Dispatch, type SetStateAction } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@repo/ui/components/card";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@repo/ui/components/dialog";
// import { Label } from "@repo/ui/components/label";
// import { Button } from "@repo/ui/components/button";
// import { Separator } from "@repo/ui/components/separator";
// import { GooglePlacesAutocomplete } from "~/google-maps/components/google-maps";
// import type { GooglePlaceResult } from "~/google-maps/lib/google-maps";
// import { useAppStore } from "~/google-maps/state";

// type VenueCreateType = "create" | "claim" | null;

// const VenueAccountStatus = ({
//   venue,
//   setCreateType,
// }: {
//   venue: GooglePlaceResult | null;
//   setCreateType: Dispatch<SetStateAction<VenueCreateType>>;
// }) => {
//   if (!venue) return "No venue selected.";

//   return (
//     <div>
//       <p>Account Status</p>
//       <pre>{JSON.stringify(venue, null, 2)}</pre>
//       <ConfirmVenueAccount venue={venue} createType="create" setCreateType={setCreateType} />
//       <ConfirmVenueAccount venue={venue} createType="claim" setCreateType={setCreateType} />
//     </div>
//   );
// };

// const ConfirmVenueAccount = ({
//   venue,
//   createType,
//   setCreateType,
// }: {
//   venue: GooglePlaceResult;
//   createType: NonNullable<VenueCreateType>;
//   setCreateType: Dispatch<SetStateAction<VenueCreateType>>;
// }) => {
//   function capitalize(string: string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//   }
//   const ct = capitalize(createType);
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>{ct} Venue</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{ct} Venue</DialogTitle>
//           <DialogDescription>Confirm this is your venue before continuing</DialogDescription>
//         </DialogHeader>
//         <div className="space-y-2">
//           <p>{venue.name}</p>
//           <p>{venue.addressShort}</p>
//           <p>{venue.phone}</p>
//           <p>{venue.website}</p>
//           <div className="flex gap-2 justify-end">
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <DialogClose asChild>
//               <Button onClick={() => setCreateType(createType)}>{ct}</Button>
//             </DialogClose>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export function NewVenuePage() {
//   const [venue, setVenue] = useState<GooglePlaceResult | null>(null);
//   const [createType, setCreateType] = useState<VenueCreateType>(null);
//   const addVenue = useAppStore((state) => state.addVenue);

//   if (!createType)
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Create Your Venue</CardTitle>
//           <CardDescription>
//             Begin by searching your venue with Google Places. Select your venue from the list of
//             suggestions to continue.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Label>Search Venue Name</Label>
//           <GooglePlacesAutocomplete setSelectedPlace={setVenue} />
//           <Separator className="my-8" />
//           <VenueAccountStatus venue={venue} setCreateType={setCreateType} />
//           <Button onClick={() => addVenue(venue!)}>Create</Button>
//         </CardContent>
//       </Card>
//     );
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{createType}</CardTitle>
//         <CardDescription>Confirm dtails creat</CardDescription>
//       </CardHeader>
//       <CardContent>form</CardContent>
//     </Card>
//   );
// }
