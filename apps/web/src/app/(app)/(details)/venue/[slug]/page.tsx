import { venues } from "@/data/mock/venues";
import { notFound } from "next/navigation";
import {
  BasicInfo,
  ProfilePage,
  ProfilePageContent,
  ProfilePageSidebar,
} from "../../_components/profile";

export default function VenueDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // Return profile details
  //  const profile = await retrieveProfile(params.slug);
  const profile = venues.find((venue) => venue.slug === params.slug);

  // Profile not found
  if (!profile) return notFound();

  // Generate structured data

  // Return Profile
  return (
    <ProfilePage>
      <ProfilePageContent>
        <BasicInfo profile={profile} />
      </ProfilePageContent>
      <ProfilePageSidebar></ProfilePageSidebar>
    </ProfilePage>
  );
}
