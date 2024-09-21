-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPER');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('PUBLIC', 'PERFORMER', 'VENUE', 'ORGANIZER', 'ASSOCIATE');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('VENUE', 'RESTAURANT', 'CAFE', 'BAR', 'BREWERY', 'WINERY', 'DISTILLERY', 'CLUB', 'THEATER', 'GALLERY', 'AREA', 'CASINO', 'LOCATION', 'COMPLEX', 'STADIUM');

-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('STAGE', 'ROOM', 'AREA');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CANCELLED', 'POSTPONED', 'RESCHEDULED', 'SCHEDULED');

-- CreateTable
CREATE TABLE "Account" (
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
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
    "accountType" "AccountType" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerified" TIMESTAMP(3),
    "userVerified" BOOLEAN DEFAULT false,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "firstName" TEXT,
    "preferredName" TEXT,
    "lastName" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zipcode" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "county" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "Zipcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Street" (
    "id" TEXT NOT NULL,
    "uniqueName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Street_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uniqueName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boundaries" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uniqueName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "regionId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "center" TEXT NOT NULL,
    "northeast" TEXT NOT NULL,
    "southwest" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "north" DOUBLE PRECISION NOT NULL,
    "east" DOUBLE PRECISION NOT NULL,
    "south" DOUBLE PRECISION NOT NULL,
    "west" DOUBLE PRECISION NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "center" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Username" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rewriteUrl" TEXT NOT NULL,

    CONSTRAINT "Username_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "storageUrl" TEXT NOT NULL,
    "storageId" TEXT NOT NULL,
    "storageFileName" TEXT NOT NULL,
    "musicianId" TEXT,
    "groupId" TEXT,
    "venueId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "usernameId" TEXT,
    "type" "VenueType" DEFAULT 'VENUE',
    "about" TEXT,
    "servesAlcohol" BOOLEAN,
    "servesFood" BOOLEAN,
    "ageRestriction" BOOLEAN,
    "minimumAge" INTEGER,
    "requiresReservation" BOOLEAN DEFAULT false,
    "reservationLink" TEXT,
    "active" BOOLEAN DEFAULT false,
    "accountManagerId" TEXT,
    "canText" BOOLEAN NOT NULL DEFAULT true,
    "canCall" BOOLEAN NOT NULL DEFAULT true,
    "canEmail" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "email" TEXT,
    "phoneBooking" TEXT,
    "emailBooking" TEXT,
    "website" TEXT,
    "socialYouTube" TEXT,
    "socialFacebook" TEXT,
    "socialInstagram" TEXT,
    "socialTwitter" TEXT,
    "businessYelp" TEXT,
    "businessTripadvisor" TEXT,
    "businessGoogle" TEXT,
    "businessOpentable" TEXT,
    "addressLong" TEXT NOT NULL,
    "addressShort" TEXT NOT NULL,
    "streetNumber" TEXT,
    "unit" TEXT,
    "streetId" TEXT NOT NULL,
    "zipcodeId" TEXT NOT NULL,
    "neighborhoodId" TEXT,
    "cityId" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StageType" NOT NULL DEFAULT 'STAGE',
    "active" BOOLEAN DEFAULT true,
    "venueId" TEXT NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueKeyword" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VenueKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musician" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "performerType" TEXT NOT NULL DEFAULT 'musician',
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "usernameId" TEXT,
    "about" TEXT,
    "basedInId" TEXT,
    "active" BOOLEAN DEFAULT false,
    "accountManagerId" TEXT,
    "canText" BOOLEAN NOT NULL DEFAULT true,
    "canCall" BOOLEAN NOT NULL DEFAULT true,
    "canEmail" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "socialYouTube" TEXT,
    "socialSpotify" TEXT,
    "socialBandcamp" TEXT,
    "socialFacebook" TEXT,
    "socialInstagram" TEXT,
    "socialTwitter" TEXT,

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicGroup" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "performerType" TEXT NOT NULL DEFAULT 'group',
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "usernameId" TEXT,
    "about" TEXT,
    "basedInId" TEXT,
    "active" BOOLEAN DEFAULT false,
    "accountManagerId" TEXT,
    "canText" BOOLEAN NOT NULL DEFAULT true,
    "canCall" BOOLEAN NOT NULL DEFAULT true,
    "canEmail" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "socialYouTube" TEXT,
    "socialSpotify" TEXT,
    "socialBandcamp" TEXT,
    "socialFacebook" TEXT,
    "socialInstagram" TEXT,
    "socialTwitter" TEXT,

    CONSTRAINT "MusicGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "usernameId" TEXT,
    "about" TEXT,
    "basedInId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "accountManagerId" TEXT,
    "canText" BOOLEAN NOT NULL DEFAULT true,
    "canCall" BOOLEAN NOT NULL DEFAULT true,
    "canEmail" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT,
    "email" TEXT,
    "phoneInquiries" TEXT,
    "emailInquiries" TEXT,
    "website" TEXT,
    "socialYouTube" TEXT,
    "socialFacebook" TEXT,
    "socialInstagram" TEXT,
    "socialTwitter" TEXT,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "eventId" TEXT,
    "eventDraftId" TEXT,

    CONSTRAINT "TicketLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTemplate" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "templateName" TEXT NOT NULL,
    "templateDescription" TEXT,
    "eventName" TEXT NOT NULL,
    "eventDescription" TEXT,
    "duration" INTEGER,
    "ageRestriction" BOOLEAN,
    "minimumAge" INTEGER,
    "isPrivate" BOOLEAN,
    "isFree" BOOLEAN,
    "isChildFriendly" BOOLEAN,
    "isHoliday" BOOLEAN,
    "servesAlcohol" BOOLEAN,
    "servesFood" BOOLEAN,
    "requiresRsvp" BOOLEAN,
    "rsvpLink" TEXT,
    "requiresTicket" BOOLEAN,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "EventTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDraft" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "timeDoor" TIMESTAMP(3),
    "timeStart" TIMESTAMPTZ(6),
    "timeEnd" TIMESTAMPTZ(6),
    "isPrivate" BOOLEAN,
    "isFree" BOOLEAN,
    "isChildFriendly" BOOLEAN,
    "isHoliday" BOOLEAN,
    "ageRestriction" BOOLEAN,
    "minimumAge" INTEGER,
    "servesAlcohol" BOOLEAN,
    "servesFood" BOOLEAN,
    "requiresRsvp" BOOLEAN,
    "rsvpLink" TEXT,
    "requiresTicket" BOOLEAN,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "EventDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "publishedById" TEXT NOT NULL,
    "lastEditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditedById" TEXT,
    "ownerId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "status" "EventStatus" DEFAULT 'SCHEDULED',
    "timeDoor" TIMESTAMP(3),
    "timeStart" TIMESTAMPTZ(6) NOT NULL,
    "timeStartPrevious" TIMESTAMP(3),
    "timeEnd" TIMESTAMPTZ(6),
    "isPrivate" BOOLEAN DEFAULT false,
    "isFree" BOOLEAN DEFAULT true,
    "isChildFriendly" BOOLEAN DEFAULT false,
    "isHoliday" BOOLEAN DEFAULT false,
    "ageRestriction" BOOLEAN DEFAULT false,
    "minimumAge" INTEGER DEFAULT 0,
    "servesAlcohol" BOOLEAN DEFAULT false,
    "servesFood" BOOLEAN DEFAULT false,
    "requiresRsvp" BOOLEAN DEFAULT false,
    "rsvpLink" TEXT,
    "requiresTicket" BOOLEAN NOT NULL DEFAULT false,
    "venueId" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "neighborhoodId" TEXT,
    "cityId" TEXT,
    "regionId" TEXT,
    "stateId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventKeyword" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "EventKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VenueFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NeighborhoodToOrganizer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusiciansPerformInCities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicGroupsPerformInCities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizersCitiesServed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToMusicGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToOrganizer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToMedia" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VenueToVenueKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianToOrganizer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicGroupToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicGroupToOrganizer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicGroupFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizerToState" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizerToRegion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizerToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizerFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToMusicGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventDraftToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventDraftToMusicGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventDraftToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventDraftToEventKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventEditableByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToUser" (
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
CREATE TABLE "_EventToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToMusicGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventBookmarkedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventKeywordToEventTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Zipcode_code_key" ON "Zipcode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Street_uniqueName_key" ON "Street"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "Neighborhood_uniqueName_key" ON "Neighborhood"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "City_uniqueName_key" ON "City"("uniqueName");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_shortCode_key" ON "State"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Username_username_key" ON "Username"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_displayName_key" ON "Genre"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "Media_storageUrl_key" ON "Media"("storageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Media_storageId_key" ON "Media"("storageId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_slug_key" ON "Venue"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_slug_key" ON "Stage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_slug_key" ON "Musician"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MusicGroup_slug_key" ON "MusicGroup"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_id_key" ON "Organizer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_slug_key" ON "Organizer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventDraft_slug_key" ON "EventDraft"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_VenueFavoritedByUser_AB_unique" ON "_VenueFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_VenueFavoritedByUser_B_index" ON "_VenueFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NeighborhoodToOrganizer_AB_unique" ON "_NeighborhoodToOrganizer"("A", "B");

-- CreateIndex
CREATE INDEX "_NeighborhoodToOrganizer_B_index" ON "_NeighborhoodToOrganizer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusiciansPerformInCities_AB_unique" ON "_MusiciansPerformInCities"("A", "B");

-- CreateIndex
CREATE INDEX "_MusiciansPerformInCities_B_index" ON "_MusiciansPerformInCities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicGroupsPerformInCities_AB_unique" ON "_MusicGroupsPerformInCities"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicGroupsPerformInCities_B_index" ON "_MusicGroupsPerformInCities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizersCitiesServed_AB_unique" ON "_OrganizersCitiesServed"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizersCitiesServed_B_index" ON "_OrganizersCitiesServed"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMusician_AB_unique" ON "_GenreToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMusician_B_index" ON "_GenreToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMusicGroup_AB_unique" ON "_GenreToMusicGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMusicGroup_B_index" ON "_GenreToMusicGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToVenue_AB_unique" ON "_GenreToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToVenue_B_index" ON "_GenreToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToOrganizer_AB_unique" ON "_GenreToOrganizer"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToOrganizer_B_index" ON "_GenreToOrganizer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMedia_AB_unique" ON "_GenreToMedia"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMedia_B_index" ON "_GenreToMedia"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VenueToVenueKeyword_AB_unique" ON "_VenueToVenueKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_VenueToVenueKeyword_B_index" ON "_VenueToVenueKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToVenue_AB_unique" ON "_MusicianToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToVenue_B_index" ON "_MusicianToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToOrganizer_AB_unique" ON "_MusicianToOrganizer"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToOrganizer_B_index" ON "_MusicianToOrganizer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianFavoritedByUser_AB_unique" ON "_MusicianFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianFavoritedByUser_B_index" ON "_MusicianFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupMembers_AB_unique" ON "_GroupMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupMembers_B_index" ON "_GroupMembers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicGroupToVenue_AB_unique" ON "_MusicGroupToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicGroupToVenue_B_index" ON "_MusicGroupToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicGroupToOrganizer_AB_unique" ON "_MusicGroupToOrganizer"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicGroupToOrganizer_B_index" ON "_MusicGroupToOrganizer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicGroupFavoritedByUser_AB_unique" ON "_MusicGroupFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicGroupFavoritedByUser_B_index" ON "_MusicGroupFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizerToState_AB_unique" ON "_OrganizerToState"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizerToState_B_index" ON "_OrganizerToState"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizerToRegion_AB_unique" ON "_OrganizerToRegion"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizerToRegion_B_index" ON "_OrganizerToRegion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizerToVenue_AB_unique" ON "_OrganizerToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizerToVenue_B_index" ON "_OrganizerToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizerFavoritedByUser_AB_unique" ON "_OrganizerFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizerFavoritedByUser_B_index" ON "_OrganizerFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToMusician_AB_unique" ON "_EventTemplateToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToMusician_B_index" ON "_EventTemplateToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToMusicGroup_AB_unique" ON "_EventTemplateToMusicGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToMusicGroup_B_index" ON "_EventTemplateToMusicGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToGenre_AB_unique" ON "_EventTemplateToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToGenre_B_index" ON "_EventTemplateToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventDraftToMusician_AB_unique" ON "_EventDraftToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventDraftToMusician_B_index" ON "_EventDraftToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventDraftToMusicGroup_AB_unique" ON "_EventDraftToMusicGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_EventDraftToMusicGroup_B_index" ON "_EventDraftToMusicGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventDraftToGenre_AB_unique" ON "_EventDraftToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventDraftToGenre_B_index" ON "_EventDraftToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventDraftToEventKeyword_AB_unique" ON "_EventDraftToEventKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_EventDraftToEventKeyword_B_index" ON "_EventDraftToEventKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventEditableByUser_AB_unique" ON "_EventEditableByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventEditableByUser_B_index" ON "_EventEditableByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToGenre_AB_unique" ON "_EventToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToGenre_B_index" ON "_EventToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventKeyword_AB_unique" ON "_EventToEventKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventKeyword_B_index" ON "_EventToEventKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMusician_AB_unique" ON "_EventToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMusician_B_index" ON "_EventToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMusicGroup_AB_unique" ON "_EventToMusicGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMusicGroup_B_index" ON "_EventToMusicGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventBookmarkedByUser_AB_unique" ON "_EventBookmarkedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventBookmarkedByUser_B_index" ON "_EventBookmarkedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventKeywordToEventTemplate_AB_unique" ON "_EventKeywordToEventTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_EventKeywordToEventTemplate_B_index" ON "_EventKeywordToEventTemplate"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zipcode" ADD CONSTRAINT "Zipcode_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Street" ADD CONSTRAINT "Street_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Neighborhood" ADD CONSTRAINT "Neighborhood_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "Musician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MusicGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Username"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_accountManagerId_fkey" FOREIGN KEY ("accountManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_streetId_fkey" FOREIGN KEY ("streetId") REFERENCES "Street"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_zipcodeId_fkey" FOREIGN KEY ("zipcodeId") REFERENCES "Zipcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Username"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_basedInId_fkey" FOREIGN KEY ("basedInId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_accountManagerId_fkey" FOREIGN KEY ("accountManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicGroup" ADD CONSTRAINT "MusicGroup_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Username"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicGroup" ADD CONSTRAINT "MusicGroup_basedInId_fkey" FOREIGN KEY ("basedInId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicGroup" ADD CONSTRAINT "MusicGroup_accountManagerId_fkey" FOREIGN KEY ("accountManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "Username"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_basedInId_fkey" FOREIGN KEY ("basedInId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_accountManagerId_fkey" FOREIGN KEY ("accountManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketLink" ADD CONSTRAINT "TicketLink_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketLink" ADD CONSTRAINT "TicketLink_eventDraftId_fkey" FOREIGN KEY ("eventDraftId") REFERENCES "EventDraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDraft" ADD CONSTRAINT "EventDraft_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDraft" ADD CONSTRAINT "EventDraft_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDraft" ADD CONSTRAINT "EventDraft_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDraft" ADD CONSTRAINT "EventDraft_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_lastEditedById_fkey" FOREIGN KEY ("lastEditedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueFavoritedByUser" ADD CONSTRAINT "_VenueFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueFavoritedByUser" ADD CONSTRAINT "_VenueFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NeighborhoodToOrganizer" ADD CONSTRAINT "_NeighborhoodToOrganizer_A_fkey" FOREIGN KEY ("A") REFERENCES "Neighborhood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NeighborhoodToOrganizer" ADD CONSTRAINT "_NeighborhoodToOrganizer_B_fkey" FOREIGN KEY ("B") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusiciansPerformInCities" ADD CONSTRAINT "_MusiciansPerformInCities_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusiciansPerformInCities" ADD CONSTRAINT "_MusiciansPerformInCities_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupsPerformInCities" ADD CONSTRAINT "_MusicGroupsPerformInCities_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupsPerformInCities" ADD CONSTRAINT "_MusicGroupsPerformInCities_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizersCitiesServed" ADD CONSTRAINT "_OrganizersCitiesServed_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizersCitiesServed" ADD CONSTRAINT "_OrganizersCitiesServed_B_fkey" FOREIGN KEY ("B") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMusician" ADD CONSTRAINT "_GenreToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMusician" ADD CONSTRAINT "_GenreToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMusicGroup" ADD CONSTRAINT "_GenreToMusicGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMusicGroup" ADD CONSTRAINT "_GenreToMusicGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToVenue" ADD CONSTRAINT "_GenreToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToVenue" ADD CONSTRAINT "_GenreToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToOrganizer" ADD CONSTRAINT "_GenreToOrganizer_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToOrganizer" ADD CONSTRAINT "_GenreToOrganizer_B_fkey" FOREIGN KEY ("B") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMedia" ADD CONSTRAINT "_GenreToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMedia" ADD CONSTRAINT "_GenreToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueToVenueKeyword" ADD CONSTRAINT "_VenueToVenueKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueToVenueKeyword" ADD CONSTRAINT "_VenueToVenueKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "VenueKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToVenue" ADD CONSTRAINT "_MusicianToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToVenue" ADD CONSTRAINT "_MusicianToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToOrganizer" ADD CONSTRAINT "_MusicianToOrganizer_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToOrganizer" ADD CONSTRAINT "_MusicianToOrganizer_B_fkey" FOREIGN KEY ("B") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianFavoritedByUser" ADD CONSTRAINT "_MusicianFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianFavoritedByUser" ADD CONSTRAINT "_MusicianFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMembers" ADD CONSTRAINT "_GroupMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupMembers" ADD CONSTRAINT "_GroupMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupToVenue" ADD CONSTRAINT "_MusicGroupToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupToVenue" ADD CONSTRAINT "_MusicGroupToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupToOrganizer" ADD CONSTRAINT "_MusicGroupToOrganizer_A_fkey" FOREIGN KEY ("A") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupToOrganizer" ADD CONSTRAINT "_MusicGroupToOrganizer_B_fkey" FOREIGN KEY ("B") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupFavoritedByUser" ADD CONSTRAINT "_MusicGroupFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicGroupFavoritedByUser" ADD CONSTRAINT "_MusicGroupFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToState" ADD CONSTRAINT "_OrganizerToState_A_fkey" FOREIGN KEY ("A") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToState" ADD CONSTRAINT "_OrganizerToState_B_fkey" FOREIGN KEY ("B") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToRegion" ADD CONSTRAINT "_OrganizerToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToRegion" ADD CONSTRAINT "_OrganizerToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToVenue" ADD CONSTRAINT "_OrganizerToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerToVenue" ADD CONSTRAINT "_OrganizerToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerFavoritedByUser" ADD CONSTRAINT "_OrganizerFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizerFavoritedByUser" ADD CONSTRAINT "_OrganizerFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusician" ADD CONSTRAINT "_EventTemplateToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusician" ADD CONSTRAINT "_EventTemplateToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusicGroup" ADD CONSTRAINT "_EventTemplateToMusicGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusicGroup" ADD CONSTRAINT "_EventTemplateToMusicGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToGenre" ADD CONSTRAINT "_EventTemplateToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToGenre" ADD CONSTRAINT "_EventTemplateToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToMusician" ADD CONSTRAINT "_EventDraftToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToMusician" ADD CONSTRAINT "_EventDraftToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToMusicGroup" ADD CONSTRAINT "_EventDraftToMusicGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToMusicGroup" ADD CONSTRAINT "_EventDraftToMusicGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToGenre" ADD CONSTRAINT "_EventDraftToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToGenre" ADD CONSTRAINT "_EventDraftToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToEventKeyword" ADD CONSTRAINT "_EventDraftToEventKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDraftToEventKeyword" ADD CONSTRAINT "_EventDraftToEventKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEditableByUser" ADD CONSTRAINT "_EventEditableByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEditableByUser" ADD CONSTRAINT "_EventEditableByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGenre" ADD CONSTRAINT "_EventToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGenre" ADD CONSTRAINT "_EventToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventKeyword" ADD CONSTRAINT "_EventToEventKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventKeyword" ADD CONSTRAINT "_EventToEventKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusician" ADD CONSTRAINT "_EventToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusician" ADD CONSTRAINT "_EventToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusicGroup" ADD CONSTRAINT "_EventToMusicGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusicGroup" ADD CONSTRAINT "_EventToMusicGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventBookmarkedByUser" ADD CONSTRAINT "_EventBookmarkedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventBookmarkedByUser" ADD CONSTRAINT "_EventBookmarkedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToEventTemplate" ADD CONSTRAINT "_EventKeywordToEventTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToEventTemplate" ADD CONSTRAINT "_EventKeywordToEventTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
