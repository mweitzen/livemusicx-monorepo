import { organizers } from "@/data/mock/organizers";
import { notFound } from "next/navigation";
import {
  BasicInfo,
  ProfilePage,
  ProfilePageContent,
  ProfilePageSidebar,
} from "../../_components/profile";

export default function OrganizerDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // Return profile details
  //  const profile = await retrieveProfile(params.slug);
  const profile = organizers.find(
    (organizer) => organizer.slug === params.slug
  );

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
