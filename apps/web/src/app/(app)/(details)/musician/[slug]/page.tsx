import { musicians } from "~/data/mock/musicians";
import { notFound } from "next/navigation";
import {
  BasicInfo,
  ProfilePage,
  ProfilePageContent,
  ProfilePageSidebar,
} from "../../_components/profile";

export default function MusicianDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // Return profile details
  //  const profile = await retrieveProfile(params.slug);
  const profile = musicians.find((musician) => musician.slug === params.slug);

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
