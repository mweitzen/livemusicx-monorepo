-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('FAN', 'PERFORMER', 'VENUE', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('MUSICIAN', 'BAND', 'VENUE', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('VENUE', 'RESTAURANT', 'CAFE', 'BAR', 'BREWERY', 'WINERY', 'DISTILLERY', 'CLUB', 'THEATER', 'GALLERY', 'AREA', 'CASINO', 'COMPLEX', 'STADIUM', 'HOTEL', 'MUSEUM', 'COMMUNITY_CENTER', 'PARK', 'FAIRGROUNDS');

-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('STAGE', 'ROOM', 'AREA', 'PATIO');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CANCELLED', 'POSTPONED', 'SCHEDULED', 'RESCHEDULED', 'UNSCHEDULED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PERFORMANCE', 'EXPERIENCE', 'MEETUP');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('REGION', 'STATE', 'CITY', 'NEIGHBORHOOD');

-- CreateEnum
CREATE TYPE "NetworkType" AS ENUM ('REGION', 'CITY', 'NEIGHBORHOOD', 'GROUP');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('VIDEO', 'AUDIO', 'IMAGE');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('STATEMENT', 'OPINION', 'REVIEW', 'NEWSLETTER', 'ANNOUNCEMENT', 'BROADCAST', 'BULLETIN');

-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('PRESS_RELEASE', 'MEDIA_RELEASE', 'EVENT_UPDATE', 'GENERAL');

-- CreateEnum
CREATE TYPE "BroadcastAudience" AS ENUM ('VENUE', 'ORGANIZER', 'PERFORMER');

-- CreateEnum
CREATE TYPE "BulletinType" AS ENUM ('VENUE_SEEKING', 'ORGANIZER_SEEKING', 'PERFORMER_SEEKING');

-- CreateTable
CREATE TABLE "AuthAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "refresh_token_expires_in" INTEGER,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "AuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "type" "AccountType" NOT NULL DEFAULT 'FAN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,
    "image" TEXT,
    "phone" TEXT,
    "homeLocationId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uniqueName" TEXT NOT NULL,
    "description" TEXT,
    "type" "LocationType" NOT NULL,
    "parentId" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "type" "AccountType" NOT NULL,
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "deactivatedAt" TIMESTAMP(3),
    "accountVerified" BOOLEAN NOT NULL DEFAULT false,
    "managedById" TEXT,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "avatarUrl" TEXT,
    "imageUrl" TEXT,
    "phoneNumber" TEXT,
    "textNumber" TEXT,
    "email" TEXT,
    "availableByPhone" BOOLEAN NOT NULL DEFAULT false,
    "availableByText" BOOLEAN NOT NULL DEFAULT false,
    "availableByEmail" BOOLEAN NOT NULL DEFAULT false,
    "websiteUrl" TEXT,
    "youtubeUrl" TEXT,
    "facebookUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musician" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "bandcampUrl" TEXT,
    "spotifyUrl" TEXT,
    "instruments" TEXT[],
    "basedInId" TEXT NOT NULL,

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Band" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "bandcampUrl" TEXT,
    "spotifyUrl" TEXT,
    "basedInId" TEXT NOT NULL,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "VenueType" NOT NULL DEFAULT 'VENUE',
    "capacity" INTEGER NOT NULL DEFAULT 50,
    "servesAlcohol" BOOLEAN NOT NULL DEFAULT false,
    "servesFood" BOOLEAN NOT NULL DEFAULT false,
    "ageRestriction" BOOLEAN NOT NULL DEFAULT false,
    "minimumAge" INTEGER NOT NULL DEFAULT 0,
    "requiresReservation" BOOLEAN NOT NULL DEFAULT false,
    "reservationLink" TEXT,
    "privateAccess" BOOLEAN NOT NULL DEFAULT false,
    "networkId" TEXT NOT NULL,
    "addressLong" TEXT NOT NULL,
    "addressShort" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "googleBusinessUrl" TEXT,
    "tripadvisorUrl" TEXT,
    "opentableUrl" TEXT,
    "yelpUrl" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "type" "StageType" NOT NULL DEFAULT 'AREA',
    "capacity" INTEGER NOT NULL DEFAULT 50,
    "imageUrl" TEXT,
    "about" TEXT,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "basedInId" TEXT NOT NULL,
    "experienceSummary" TEXT,
    "services" TEXT[],
    "googleBusinessUrl" TEXT,
    "yelpUrl" TEXT,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "TicketLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "lastUpdatedById" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedById" TEXT,
    "managedById" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "websiteUrl" TEXT,
    "timeDoor" TIMESTAMP(3),
    "timeStart" TIMESTAMP(3),
    "timeStartPrevious" TIMESTAMP(3),
    "timeEnd" TIMESTAMP(3),
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "isChildFriendly" BOOLEAN NOT NULL DEFAULT false,
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "isAgeRestricted" BOOLEAN NOT NULL DEFAULT false,
    "minimumAge" INTEGER NOT NULL DEFAULT 0,
    "servesAlcohol" BOOLEAN NOT NULL DEFAULT false,
    "servesFood" BOOLEAN NOT NULL DEFAULT false,
    "requiresRegistration" BOOLEAN NOT NULL DEFAULT false,
    "registrationLink" TEXT,
    "requiresTicket" BOOLEAN NOT NULL DEFAULT false,
    "networkId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastEvent" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "websiteUrl" TEXT,
    "networkId" TEXT NOT NULL,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "PastEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTemplate" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "lastUpdatedById" TEXT NOT NULL,
    "templateName" TEXT NOT NULL,
    "templateDescription" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slugBase" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "websiteUrl" TEXT,
    "duration" INTEGER,
    "timeDoor" TIMESTAMP(3),
    "timeStart" TIMESTAMP(3),
    "timeEnd" TIMESTAMP(3),
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "isChildFriendly" BOOLEAN NOT NULL DEFAULT false,
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "isAgeRestricted" BOOLEAN NOT NULL DEFAULT false,
    "minimumAge" INTEGER NOT NULL DEFAULT 0,
    "servesAlcohol" BOOLEAN NOT NULL DEFAULT false,
    "servesFood" BOOLEAN NOT NULL DEFAULT false,
    "requiresRegistration" BOOLEAN NOT NULL DEFAULT false,
    "registrationLink" TEXT,
    "requiresTicket" BOOLEAN NOT NULL DEFAULT false,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "EventTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventKeyword" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EventKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueKeyword" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "VenueKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "NetworkType" NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isDiscoverable" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "networkId" TEXT NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "agrees" INTEGER NOT NULL DEFAULT 0,
    "disagrees" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT,
    "replyToId" TEXT,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "type" "AnnouncementType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Broadcast" (
    "id" TEXT NOT NULL,
    "audience" "BroadcastAudience" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Broadcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bulletin" (
    "id" TEXT NOT NULL,
    "type" "BulletinType" NOT NULL,
    "audience" "BroadcastAudience" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Bulletin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountAssociateUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountsFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AffiliatedAccounts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToEventTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VenueToVenueKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizerToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventAdministrators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventEditors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserBookmarkedEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventRegisteredUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PastEventToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventKeywordToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventKeywordToEventTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NetworkToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToThread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostsLikedByUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostsSharedByUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToStage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostsReferencedInPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MediaToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "AuthAccount_userId_idx" ON "AuthAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_provider_providerAccountId_key" ON "AuthAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_sessionToken_key" ON "AuthSession"("sessionToken");

-- CreateIndex
CREATE INDEX "AuthSession_userId_idx" ON "AuthSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Location_uniqueName_key" ON "Location"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_slug_key" ON "Account"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_accountId_key" ON "Musician"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Band_accountId_key" ON "Band"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_accountId_key" ON "Venue"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_accountId_key" ON "Organizer"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PastEvent_slug_key" ON "PastEvent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_displayName_key" ON "Genre"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "EventKeyword_displayName_key" ON "EventKeyword"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "VenueKeyword_displayName_key" ON "VenueKeyword"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "Network_code_key" ON "Network"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Network_slug_key" ON "Network"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Thread_slug_key" ON "Thread"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountAssociateUsers_AB_unique" ON "_AccountAssociateUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountAssociateUsers_B_index" ON "_AccountAssociateUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountsFavoritedByUser_AB_unique" ON "_AccountsFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountsFavoritedByUser_B_index" ON "_AccountsFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToGenre_AB_unique" ON "_AccountToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToGenre_B_index" ON "_AccountToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AffiliatedAccounts_AB_unique" ON "_AffiliatedAccounts"("A", "B");

-- CreateIndex
CREATE INDEX "_AffiliatedAccounts_B_index" ON "_AffiliatedAccounts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToPastEvent_AB_unique" ON "_MusicianToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToPastEvent_B_index" ON "_MusicianToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToPost_AB_unique" ON "_MusicianToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToPost_B_index" ON "_MusicianToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToMusician_AB_unique" ON "_BandToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToMusician_B_index" ON "_BandToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToEvent_AB_unique" ON "_BandToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToEvent_B_index" ON "_BandToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToPastEvent_AB_unique" ON "_BandToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToPastEvent_B_index" ON "_BandToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToEventTemplate_AB_unique" ON "_BandToEventTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToEventTemplate_B_index" ON "_BandToEventTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToPost_AB_unique" ON "_BandToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToPost_B_index" ON "_BandToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VenueToVenueKeyword_AB_unique" ON "_VenueToVenueKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_VenueToVenueKeyword_B_index" ON "_VenueToVenueKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizerToPost_AB_unique" ON "_OrganizerToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizerToPost_B_index" ON "_OrganizerToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventAdministrators_AB_unique" ON "_EventAdministrators"("A", "B");

-- CreateIndex
CREATE INDEX "_EventAdministrators_B_index" ON "_EventAdministrators"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventEditors_AB_unique" ON "_EventEditors"("A", "B");

-- CreateIndex
CREATE INDEX "_EventEditors_B_index" ON "_EventEditors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToGenre_AB_unique" ON "_EventToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToGenre_B_index" ON "_EventToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventKeyword_AB_unique" ON "_EventToEventKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventKeyword_B_index" ON "_EventToEventKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBookmarkedEvents_AB_unique" ON "_UserBookmarkedEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBookmarkedEvents_B_index" ON "_UserBookmarkedEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventRegisteredUsers_AB_unique" ON "_EventRegisteredUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventRegisteredUsers_B_index" ON "_EventRegisteredUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMusician_AB_unique" ON "_EventToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMusician_B_index" ON "_EventToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToPost_AB_unique" ON "_EventToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToPost_B_index" ON "_EventToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PastEventToPost_AB_unique" ON "_PastEventToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_PastEventToPost_B_index" ON "_PastEventToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToGenre_AB_unique" ON "_EventTemplateToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToGenre_B_index" ON "_EventTemplateToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToMusician_AB_unique" ON "_EventTemplateToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToMusician_B_index" ON "_EventTemplateToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToPastEvent_AB_unique" ON "_GenreToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToPastEvent_B_index" ON "_GenreToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventKeywordToPastEvent_AB_unique" ON "_EventKeywordToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_EventKeywordToPastEvent_B_index" ON "_EventKeywordToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventKeywordToEventTemplate_AB_unique" ON "_EventKeywordToEventTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_EventKeywordToEventTemplate_B_index" ON "_EventKeywordToEventTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NetworkToUser_AB_unique" ON "_NetworkToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NetworkToUser_B_index" ON "_NetworkToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToThread_AB_unique" ON "_PostToThread"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToThread_B_index" ON "_PostToThread"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostsLikedByUsers_AB_unique" ON "_PostsLikedByUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsLikedByUsers_B_index" ON "_PostsLikedByUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostsSharedByUsers_AB_unique" ON "_PostsSharedByUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsSharedByUsers_B_index" ON "_PostsSharedByUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToVenue_AB_unique" ON "_PostToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToVenue_B_index" ON "_PostToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToStage_AB_unique" ON "_PostToStage"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToStage_B_index" ON "_PostToStage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostsReferencedInPosts_AB_unique" ON "_PostsReferencedInPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsReferencedInPosts_B_index" ON "_PostsReferencedInPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MediaToPost_AB_unique" ON "_MediaToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaToPost_B_index" ON "_MediaToPost"("B");

-- AddForeignKey
ALTER TABLE "AuthAccount" ADD CONSTRAINT "AuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homeLocationId_fkey" FOREIGN KEY ("homeLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_basedInId_fkey" FOREIGN KEY ("basedInId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_basedInId_fkey" FOREIGN KEY ("basedInId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_basedInId_fkey" FOREIGN KEY ("basedInId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketLink" ADD CONSTRAINT "TicketLink_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Network" ADD CONSTRAINT "Network_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Network"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Broadcast" ADD CONSTRAINT "Broadcast_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAssociateUsers" ADD CONSTRAINT "_AccountAssociateUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAssociateUsers" ADD CONSTRAINT "_AccountAssociateUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountsFavoritedByUser" ADD CONSTRAINT "_AccountsFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountsFavoritedByUser" ADD CONSTRAINT "_AccountsFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGenre" ADD CONSTRAINT "_AccountToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGenre" ADD CONSTRAINT "_AccountToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedAccounts" ADD CONSTRAINT "_AffiliatedAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedAccounts" ADD CONSTRAINT "_AffiliatedAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToPastEvent" ADD CONSTRAINT "_MusicianToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToPastEvent" ADD CONSTRAINT "_MusicianToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToPost" ADD CONSTRAINT "_MusicianToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToPost" ADD CONSTRAINT "_MusicianToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToMusician" ADD CONSTRAINT "_BandToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToMusician" ADD CONSTRAINT "_BandToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEvent" ADD CONSTRAINT "_BandToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEvent" ADD CONSTRAINT "_BandToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToPastEvent" ADD CONSTRAINT "_BandToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToPastEvent" ADD CONSTRAINT "_BandToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEventTemplate" ADD CONSTRAINT "_BandToEventTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEventTemplate" ADD CONSTRAINT "_BandToEventTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToPost" ADD CONSTRAINT "_BandToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToPost" ADD CONSTRAINT "_BandToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueToVenueKeyword" ADD CONSTRAINT "_VenueToVenueKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueToVenueKeyword" ADD CONSTRAINT "_VenueToVenueKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "VenueKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToPost" ADD CONSTRAINT "_OrganizerToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToPost" ADD CONSTRAINT "_OrganizerToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAdministrators" ADD CONSTRAINT "_EventAdministrators_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAdministrators" ADD CONSTRAINT "_EventAdministrators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEditors" ADD CONSTRAINT "_EventEditors_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEditors" ADD CONSTRAINT "_EventEditors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGenre" ADD CONSTRAINT "_EventToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGenre" ADD CONSTRAINT "_EventToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventKeyword" ADD CONSTRAINT "_EventToEventKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventKeyword" ADD CONSTRAINT "_EventToEventKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmarkedEvents" ADD CONSTRAINT "_UserBookmarkedEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmarkedEvents" ADD CONSTRAINT "_UserBookmarkedEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventRegisteredUsers" ADD CONSTRAINT "_EventRegisteredUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventRegisteredUsers" ADD CONSTRAINT "_EventRegisteredUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusician" ADD CONSTRAINT "_EventToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusician" ADD CONSTRAINT "_EventToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPost" ADD CONSTRAINT "_EventToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPost" ADD CONSTRAINT "_EventToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastEventToPost" ADD CONSTRAINT "_PastEventToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastEventToPost" ADD CONSTRAINT "_PastEventToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToGenre" ADD CONSTRAINT "_EventTemplateToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToGenre" ADD CONSTRAINT "_EventTemplateToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusician" ADD CONSTRAINT "_EventTemplateToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusician" ADD CONSTRAINT "_EventTemplateToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToPastEvent" ADD CONSTRAINT "_GenreToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToPastEvent" ADD CONSTRAINT "_GenreToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToPastEvent" ADD CONSTRAINT "_EventKeywordToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToPastEvent" ADD CONSTRAINT "_EventKeywordToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToEventTemplate" ADD CONSTRAINT "_EventKeywordToEventTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToEventTemplate" ADD CONSTRAINT "_EventKeywordToEventTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NetworkToUser" ADD CONSTRAINT "_NetworkToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Network"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NetworkToUser" ADD CONSTRAINT "_NetworkToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToThread" ADD CONSTRAINT "_PostToThread_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToThread" ADD CONSTRAINT "_PostToThread_B_fkey" FOREIGN KEY ("B") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsLikedByUsers" ADD CONSTRAINT "_PostsLikedByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsLikedByUsers" ADD CONSTRAINT "_PostsLikedByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsSharedByUsers" ADD CONSTRAINT "_PostsSharedByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsSharedByUsers" ADD CONSTRAINT "_PostsSharedByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToVenue" ADD CONSTRAINT "_PostToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToVenue" ADD CONSTRAINT "_PostToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToStage" ADD CONSTRAINT "_PostToStage_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToStage" ADD CONSTRAINT "_PostToStage_B_fkey" FOREIGN KEY ("B") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsReferencedInPosts" ADD CONSTRAINT "_PostsReferencedInPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsReferencedInPosts" ADD CONSTRAINT "_PostsReferencedInPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToPost" ADD CONSTRAINT "_MediaToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToPost" ADD CONSTRAINT "_MediaToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
