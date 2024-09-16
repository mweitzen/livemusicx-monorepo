import Link from "next/link";
import type { Genre } from "@repo/db";
import type { GroupDetails, MusicianDetails } from "@/lib/types/outputs";

import { SocialIcon } from "react-social-icons";
import { LinkIcon, MapPinIcon } from "@heroicons/react/24/solid";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileImage } from "@/components/shared/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { TypographyLarge } from "../shared/typography";

function AccountLink({
  item,
  type,
}: {
  item: any;
  type: "musician" | "group" | "venue" | "organizer";
}) {
  return (
    <Link
      href={`/${type}s/${item.slug}`}
      className="flex flex-col items-center gap-2 rounded-lg bg-card p-2 text-center"
    >
      {/* <ProfileImage src={item.avatar} className="h-20 w-20" /> */}
      <div className="h-20 w-20 rounded-full bg-slate-300" />
      <p className="text-sm">{item.name}</p>
    </Link>
  );
}

function SectionHeading(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="mb-1 mt-4 text-sm font-semibold uppercase md:mb-2 md:mt-6"
      {...props}
    />
  );
}

interface DetailsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  event?: boolean;
}
function DetailsHeader({ event, ...props }: DetailsHeaderProps) {
  if (event) return <div {...props} />;
  return (
    <div
      className="mb-2 flex w-full gap-2 overflow-hidden md:mb-4 md:gap-4"
      {...props}
    />
  );
}

// interface DetailImageProps extends React.HTMLAttributes<HTMLDivElement> {
// event?: boolean;
// }
function DetailsImage({ src }: { src: string | null }) {
  return (
    <ProfileImage
      className="h-20 w-20 flex-shrink-0 md:h-36 md:w-36"
      src={src}
    />
  );
}

function DetailsTitle({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="mb-1 mt-4 truncate text-2xl font-semibold tracking-tighter md:mb-4 md:mt-8 md:text-4xl lg:mb-4 lg:mt-12 lg:text-5xl"
      {...props}
    />
  );
}

function DetailsAccountType({
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-sm uppercase text-muted-foreground md:mb-1" {...props} />
  );
}

function AboutInformation({ about }: { about: string | null }) {
  if (!about)
    return (
      <p className="mb-1 text-sm text-secondary-foreground md:text-base">
        No description provided.
      </p>
    );

  return (
    <div>
      <p className="line-clamp-3 text-sm text-secondary-foreground md:text-base">
        {about}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm" className="text-xs">
            Read more
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About</DialogTitle>
          </DialogHeader>
          <p>{about}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GenresList({ genres }: { genres: Genre[] }) {
  if (!genres.length)
    return (
      <div>
        <Badge variant="secondary" className="mb-1 mr-2 md:mb-1.5">
          No genres.
        </Badge>
      </div>
    );

  return (
    <ScrollArea className="mb-1 md:mb-1.5">
      <div className="flex gap-2">
        {genres.map((genre) => (
          <Badge key={genre.name}>{genre.displayName}</Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function SocialIcons({ links }: { links: string[] }) {
  if (!links.length)
    return (
      <div>
        <Badge variant="secondary" className="mb-1 mr-2 md:mb-1.5">
          No social accounts.
        </Badge>
      </div>
    );

  return (
    <ScrollArea className="mb-1 md:mb-1.5">
      <div className="flex gap-2">
        {links.map((link) => {
          return (
            <SocialIcon
              key={link}
              url={link}
              bgColor="hsl(var(--primary))"
              style={{ height: 32, width: 32 }}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function WebsiteLink({ link }: { link?: string | null }) {
  if (!link)
    return (
      <div>
        <Badge variant="secondary" className="mb-1 mr-2 md:mb-1.5">
          No website.
        </Badge>
      </div>
    );

  return (
    <div>
      <a href={link} target="_blank" className="mb-1 mr-2 md:mb-1.5">
        <Badge variant="outline">
          <LinkIcon className="mr-1 h-4 w-4" /> {link}
        </Badge>
      </a>
    </div>
  );
}

function LocationInformation({ location }: { location: any }) {
  if (!location)
    return (
      <div>
        <Badge variant="secondary" className="mb-1 mr-2 md:mb-1.5">
          No location.
        </Badge>
      </div>
    );

  return (
    <div>
      <Badge variant="outline" className="mb-1 mr-2 md:mb-1.5">
        <MapPinIcon className="mr-1 h-4 w-4" />
        <p>{location.name}</p>
      </Badge>
    </div>
  );
}

function UpcomingEvents({
  href,
  events,
}: {
  href: string;
  events: MusicianDetails["events"];
}) {
  return (
    <div className="flex flex-col">
      <SectionHeading>Upcoming Events</SectionHeading>
      <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {events && events.length ? (
          events.map((event) => (
            <Link href={`/events/${event.slug}`} key={event.id}>
              <Card className="h-full">
                <CardHeader>
                  <p className="text-lg font-semibold tracking-tight">
                    {event.name}
                  </p>
                </CardHeader>
                <CardContent>
                  <TypographyLarge>
                    {format(event.timeStart, "MMMM d p")}
                  </TypographyLarge>
                  <p>{event.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div>No events.</div>
        )}
      </div>
      <Button asChild>
        <Link href={href}>See All</Link>
      </Button>
    </div>
  );
}

function AdditionalResources() {
  return (
    <div>
      <SectionHeading>Media Resources</SectionHeading>
      <p>Videos, Pictures, Recordings, Reviews</p>
    </div>
  );
}

function AffiliatedAccounts() {
  return (
    <div>
      <SectionHeading>Affiliated Accounts</SectionHeading>
      <ScrollArea>
        <div className="flex gap-4"></div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function RelatedMusicians() {
  return (
    <div>
      <SectionHeading>Related Musicians</SectionHeading>
      <ScrollArea>
        <div className="flex gap-4"></div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function GroupMembers({ members }: { members: GroupDetails["members"] }) {
  if (!members.length) return <div>No members.</div>;

  return (
    <div>
      <SectionHeading>Group Members</SectionHeading>
      <ScrollArea>
        <div className="flex gap-4">
          {members.map((member) => (
            <AccountLink key={member.id} item={member} type="musician" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function MemberOfGroups({ groups }: { groups: MusicianDetails["groups"] }) {
  if (!groups.length) return <div>No groups.</div>;

  return (
    <div>
      <SectionHeading>In the Groups</SectionHeading>
      <ScrollArea>
        <div className="flex gap-4">
          {groups.map((group) => (
            <AccountLink key={group.id} item={group} type="group" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export {
  DetailsHeader,
  DetailsImage,
  DetailsTitle,
  DetailsAccountType,
  AboutInformation,
  GenresList,
  SocialIcons,
  WebsiteLink,
  LocationInformation,
  UpcomingEvents,
  AdditionalResources,
  AffiliatedAccounts,
  RelatedMusicians,
  GroupMembers,
  MemberOfGroups,
};
