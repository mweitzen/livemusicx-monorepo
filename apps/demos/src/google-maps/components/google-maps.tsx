import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Pin,
  AdvancedMarker,
  InfoWindow as InfoWindowPrimitive,
  InfoWindowProps as InfoWindowPrimitiveProps,
  // useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Input } from "~/components/ui/input";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import {
  getAutocompleteWidget,
  getPlaceDetails,
  formatGooglePlaceResult,
  GooglePlaceResult,
} from "~/google-maps/lib/google-maps";

export const GooglePlacesAutocomplete = ({
  setSelectedPlace,
}: {
  setSelectedPlace?: Dispatch<SetStateAction<GooglePlaceResult | null>>;
}) => {
  const [loading, setLoading] = useState(false);

  const places = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (places && inputRef.current) {
      if (!autocompleteRef.current) {
        // create autocomplete widget
        autocompleteRef.current = getAutocompleteWidget(
          places,
          inputRef.current
        );

        // add listener for place changed
        autocompleteRef.current.addListener("place_changed", () => {
          // set loading state
          setLoading(true);

          // get initial place details
          const place = autocompleteRef.current!.getPlace();

          // clear input if no place is selected
          if (!place || !place.geometry || !place.geometry.location) {
            if (setSelectedPlace) {
              setSelectedPlace(null);
            }
            inputRef.current!.value = "";

            setLoading(false);
          } else {
            // get additional place details
            getPlaceDetails(place.place_id!).then(
              ({ data: additionalDetails }) => {
                // map place details to venue
                const mappedVenue = formatGooglePlaceResult({
                  ...place,
                  ...additionalDetails,
                });
                // set selected place
                if (setSelectedPlace) {
                  setSelectedPlace(mappedVenue);
                }

                setLoading(false);
              }
            );
          }
        });
      }
    }
  }, [places, inputRef, autocompleteRef, setSelectedPlace]);

  return (
    <Input
      ref={inputRef}
      placeholder='Enter a venue'
      disabled={loading}
    />
  );
};

interface InfoWindowProps extends InfoWindowPrimitiveProps {
  open: boolean;
  title: string;
  description?: string;
}
const InfoWindow = ({ title, open, ...props }: InfoWindowProps) => {
  if (!open) return null;
  return (
    <InfoWindowPrimitive {...props}>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center'>
          <InformationCircleIcon className='h-6 w-6' />
          <h1 className='ml-2 text-xl font-bold'>{title}</h1>
        </div>
      </div>
    </InfoWindowPrimitive>
  );
};

// interface Marker extends google.maps.marker.AdvancedMarkerElement {}
interface GoogleMapsMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
  name: string;
}

export const GoogleMapsMarker = ({ position, name }: GoogleMapsMarkerProps) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        title={name}
        ref={markerRef}
        position={position}
        onClick={() => setInfoWindowOpen(true)}
      >
        <Pin
          background='#020817'
          borderColor='#212121'
          glyphColor='white'
          scale={1.25}
        >
          <img
            src='https://www.livemusicx.com/brand.png'
            className='h-4 w-4'
            alt='brand'
          />
        </Pin>
      </AdvancedMarker>
      <InfoWindow
        title={name}
        open={infoWindowOpen}
        anchor={marker}
        onCloseClick={() => setInfoWindowOpen(false)}
      />
    </>
  );
};

// export const X = React.forwardRef<Marker, GoogleMapsMarkerProps>((props, ref) => {
//   const [infoWindowOpen, setInfoWindowOpen] = useState(false);

//   return(
//   <>
//   <AdvancedMarker
//         ref={ref}
//         title={props.name}
//         position={props.position}
//         onClick={() => setInfoWindowOpen(true)}
//       >
//         <Pin background="#020817" borderColor="#212121" glyphColor="white" scale={1.25}>
//           <img src="https://www.livemusicx.com/brand.png" className="h-4 w-4" alt="brand" />
//         </Pin>
//       </AdvancedMarker>
//       <InfoWindow
//         title={props.name}
//         open={infoWindowOpen}
//         anchor={marker}
//         onCloseClick={() => setInfoWindowOpen(false)}
//       />
//   </>
// )});

// X.displayName = "X";

// export const MarkerCluster = () => {
//   const [markers, setMarkers] = useState<{
//     [key: string]: Marker;
//   }>({});

//   const map = useMap();
//   const clusterer = useRef<MarkerClusterer | null>(null);

//   useEffect(() => {
//     if (map) {
//       if (!clusterer.current) {
//         clusterer.current = new MarkerClusterer({
//           map,
//           markers: Object.values(markers),
//         });
//       }
//     }
//   }, [map, markers]);

//   return venues.map((venue) => (
//     <GoogleMapsMarker
//       key={venue.name}
//       name={venue.name}
//       position={{ lat: venue.latitude, lng: venue.longitude }}
//     />
//   ));

//   function useMarkerRef(marker: Marker | null, key: string) {
//     if (marker && markers[key]) return;
//     if (!marker && !markers[key]) return;
//     setMarkers((prev) => {
//       if (marker) {
//         return { ...prev, [key]: marker };
//       } else {
//         const newMarkers = { ...prev };
//         delete newMarkers[key];
//         return newMarkers;
//       }
//     });
//   }
// };
