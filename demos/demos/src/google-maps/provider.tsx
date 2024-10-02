import { APIProvider as GoogleMapsProvider } from "@vis.gl/react-google-maps";

export const APIProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <GoogleMapsProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {children}
    </GoogleMapsProvider>
  );
};
