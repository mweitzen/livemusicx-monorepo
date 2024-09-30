import { APIProvider } from "./provider";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "~/google-maps/state";

import { Map, useMap } from "@vis.gl/react-google-maps";
import { Button, type ButtonProps } from "~/components/ui/button";
import { GoogleMapsMarker } from "~/google-maps/components/google-maps";
import { regions } from "~/_data/locations/nm-regions";
import { coordinates } from "~/_data/locations/geo-coordinates/nm-outline";

const VenueButton = ({
  position,
  children,
  onClick,
  ...props
}: { position: { lat: number; lng: number } } & ButtonProps) => {
  const map = useMap();
  if (!map) return null;

  return (
    <Button
      onClick={(e) => {
        console.log(position);
        // const currentZoom = map.getZoom() || 0;
        // if (currentZoom < 8) {
        //   map.setZoom(8);
        // }
        // if (currentZoom < 10) {
        //   map.setZoom(10);
        // }
        // map.setZoom(12);
        // map.panTo(position);
        // map.setZoom(8);
        // sleep(300).then(() => {
        //   map.setZoom(10);
        //   sleep(300).then(() => {
        //     map.setZoom(12);
        //     sleep(300).then(() => {
        //       map.panTo(position);
        //     });
        //   });
        // });

        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const RegionRectangle = ({
  bounds,
}: {
  bounds: google.maps.LatLngBoundsLiteral;
}) => {
  useRegionRectangle(bounds);
  return null;
};

const RegionPolygon = ({
  coordinates,
}: {
  coordinates: { lat: number; lng: number }[];
}) => {
  useRegionPolygon(coordinates);
  return null;
};

const useRegionPolygon = (coordinates: { lat: number; lng: number }[]) => {
  const map = useMap();
  const polygonRef = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!polygonRef.current) {
      polygonRef.current = new google.maps.Polygon({
        paths: coordinates,
      });
      polygonRef.current.setMap(map);
      polygonRef.current.addListener("bounds_changed", () => {
        console.log({ bounds: polygonRef.current?.getPaths() });
      });
    }
  }, [map, polygonRef, coordinates]);

  return null;
};

const useRegionRectangle = (bounds: google.maps.LatLngBoundsLiteral) => {
  const map = useMap();
  const rectangleRef = useRef<google.maps.Rectangle | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!rectangleRef.current) {
      rectangleRef.current = new google.maps.Rectangle({
        bounds,
      });
      rectangleRef.current.setMap(map);
      rectangleRef.current.addListener("bounds_changed", () => {
        console.log({ bounds: rectangleRef.current?.getBounds()?.toJSON() });
      });
    }
  }, [map, rectangleRef, bounds]);

  return null;
};

export const GoogleMapsPage = () => {
  const venues = useAppStore((state) => state.venues);
  const [selectedVenue, setSelectedVenue] = useState<(typeof venues)[0] | null>(
    null
  );
  return (
    <APIProvider>
      <h1>Google Maps Demo Page</h1>
      <div className='mb-4'>
        <p>Map Controls</p>
        <div>
          {venues.map((venue) => (
            <VenueButton
              key={venue.name}
              position={{ lat: venue.latitude, lng: venue.longitude }}
              variant={selectedVenue === venue ? "default" : "outline"}
              onClick={() => setSelectedVenue(venue)}
            >
              {venue.name}
            </VenueButton>
          ))}
        </div>
      </div>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        zoom={6.5}
        minZoom={6.5}
        center={{ lat: 35.106766, lng: -106.629181 }}
        gestureHandling={"greedy"}
        controlSize={32}
        mapTypeControl={false}
        clickableIcons={false}
        fullscreenControl={false}
        className='w-full h-96'
      >
        <RegionPolygon coordinates={coordinates} />
        {regions.map((region) => (
          <RegionRectangle
            key={region.name}
            bounds={region.bounds}
          />
        ))}
        {venues.map((venue) => (
          <GoogleMapsMarker
            key={venue.name}
            name={venue.name}
            position={{ lat: venue.latitude, lng: venue.longitude }}
          />
        ))}
      </Map>
    </APIProvider>
  );
};
