import { bands } from "@repo/mock-data";
import { notFound } from "next/navigation";
import {
  BasicInfo,
  ProfilePage,
  ProfilePageContent,
  ProfilePageSidebar,
} from "../../_components/profile";

export default function BandDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // Return profile details
  //  const profile = await retrieveProfile(params.slug);
  const profile = bands.find((band) => band.slug === params.slug);

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
