import { api } from "@repo/trpc/react";
import { instruments } from "@repo/constants";

import {
  FormMultiSelectTags,
  FormTextarea,
  FormTextInput,
} from "./form-inputs";

export const NameInput = ({
  label = "Name",
  placeholder = "Enter account name",
}: {
  label?: string;
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='name'
      label={label}
      placeholder={placeholder}
    />
  );
};

export const AboutTextarea = ({
  placeholder = "Enter a brief, but encompassing description for your account.",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextarea
      name='about'
      label='About'
      description='Enter a brief description. Try to keep the length within the provided space.'
      placeholder={placeholder}
    />
  );
};

export const EmailInput = ({
  placeholder = "your@email.com",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='email'
      label='Email'
      type='email'
      placeholder={placeholder}
    />
  );
};

export const PhoneInput = ({
  placeholder = "555-123-4567",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='phone'
      label='Phone'
      type='tel'
      placeholder={placeholder}
    />
  );
};

export const WebsiteInput = ({
  placeholder = "https://www.yourwebsite.com",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='website'
      label='Website'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const BookingPhoneInput = ({
  placeholder = "555-555-5555",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='bookingPhoneNumber'
      label='Booking Phone Number (optional)'
      type='tel'
      placeholder={placeholder}
    />
  );
};

export const BookingEmailInput = ({
  placeholder = "your-booking@email.com",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='bookingEmail'
      label='Booking Email (optional)'
      type='email'
      placeholder={placeholder}
    />
  );
};

export const YouTubeInput = ({
  placeholder = "https://www.youtube.com/channel/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='youtubeUrl'
      label='YouTube Channel'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const FacebookInput = ({
  placeholder = "https://www.facebook.com/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='facebookUrl'
      label='Facebook Page'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const TwitterInput = ({
  placeholder = "https://twitter.com/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='twitterUrl'
      label='Twitter Profile'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const InstagramInput = ({
  placeholder = "https://www.instagram.com/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='instagramUrl'
      label='Instagram Profile'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const SpotifyInput = ({
  placeholder = "https://open.spotify.com/artist/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='spotifyUrl'
      label='Spotify Artist Page'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const BandcampInput = ({
  placeholder = "https://yourbandname.bandcamp.com",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='bandcampUrl'
      label='Bandcamp Page'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const GoogleBusinessInput = ({
  placeholder = "https://google.com/....",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='googleBusinessUrl'
      label='Google Business URL (optional)'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const TripAdvisorInput = ({
  placeholder = "https://tripadvisor.com/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='tripadvisorUrl'
      label='TripAdvisor URL (optional)'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const OpenTableInput = ({
  placeholder = "https://opentable.com/...",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='opentableUrl'
      label='OpenTable URL (optional)'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const YelpInput = ({
  placeholder = "https://yelp.com/....",
}: {
  placeholder?: string;
}) => {
  return (
    <FormTextInput
      name='yelpUrl'
      label='Yelp URL (optional)'
      type='url'
      placeholder={placeholder}
    />
  );
};

export const GenresSelect = () => {
  const { data: genres } = api.general.getGenres.useQuery();
  return (
    <FormMultiSelectTags
      name='genres'
      label='Genres'
      items={genres || []}
    />
  );
};

export const VenueKeywordsSelect = () => {
  const { data: keywords } = api.general.getVenueKeywords.useQuery();
  return (
    <FormMultiSelectTags
      name='keywords'
      label='Keywords'
      items={keywords || []}
    />
  );
};

export const EventKeywordsSelect = () => {
  const { data: keywords } = api.general.getEventKeywords.useQuery();
  return (
    <FormMultiSelectTags
      name='keywords'
      label='Keywords'
      items={keywords || []}
    />
  );
};

export const InstrumentsSelect = () => {
  return (
    <FormMultiSelectTags
      name='keywords'
      label='Keywords'
      items={instruments}
    />
  );
};
