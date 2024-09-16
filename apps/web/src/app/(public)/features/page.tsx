import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Bookmark,
  Calendar,
  Heart,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";

export default function Component() {
  return (
    <div className='w-full max-w-7xl mx-auto py-16 md:py-24 lg:py-32 px-4 md:px-6'>
      <div className='grid grid-cols-1 gap-12 md:gap-16'>
        <div className='space-y-8'>
          <div className='space-y-6'>
            <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
              For Fans
            </h2>
            <p className='text-muted-foreground md:text-xl'>
              Discover and connect with your favorite live music events.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Sign Up
              </Link>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>Favorites</CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Follow your favorite performers, venues, and organizers.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <Heart className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  Get updates on your favorite artists, venues, and event
                  organizers.
                </p>
              </CardContent>
            </Card>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>Bookmarks</CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {"Save upcoming events you don't want to miss."}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <Bookmark className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  {
                    "Keep track of the events you're interested in and get reminders."
                  }
                </p>
              </CardContent>
            </Card>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Personalized Feed
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Discover new events based on your interests and location.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <Calendar className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  Get a curated feed of upcoming events tailored to your
                  preferences.
                </p>
              </CardContent>
            </Card>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Local Resources
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Find maps, directions, and parking info for events.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <MapPin className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  Get all the information you need to plan your visit to live
                  music events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='space-y-8'>
          <div className='space-y-6'>
            <h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
              For Event Managers
            </h2>
            <p className='text-muted-foreground md:text-xl'>
              Manage your live music events and connect with your audience. An
              event manager account is designed for performers, venues, and
              event organizers.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Sign Up
              </Link>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Event Management
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Create, update, and cancel your live music events.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <Calendar className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  Easily manage your event details, including date, time, and
                  location.
                </p>
              </CardContent>
            </Card>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Profile Management
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Update your account details and connect with fans.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <User className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  Manage your profile information and connect with your
                  audience.
                </p>
              </CardContent>
            </Card>
            <Card className='h-full bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Fan Engagement
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Communicate with your fans through messaging and social
                  features.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-4'>
                <div className='bg-muted rounded-full p-3'>
                  <MessageCircle className='w-6 h-6 text-primary' />
                </div>
                <p className='text-muted-foreground'>
                  Interact with your fans and build stronger connections through
                  messaging and social features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
