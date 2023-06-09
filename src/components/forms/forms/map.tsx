import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { geocodeAddress } from "@/lib/googleMaps";
import debounce from "lodash.debounce";
import { useGoogleMapsAPIKey } from "@/hooks/useGoogleMapsApi";

const { apiKey } = useGoogleMapsAPIKey();

const Map = ({ searchAddress, center, markerPosition }) => {
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState(center);

    const updatePosition = useCallback(
        debounce((address) => {
            geocodeAddress(address)
                .then((latLng) => {
                    setPosition(latLng);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }, 500),
        []
    );

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.google === "undefined") {
            return;
        }

        if (searchAddress) {
            updatePosition(searchAddress);
        } else {
            setPosition(center);
        }
    }, [searchAddress, updatePosition, center]);

    const onLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const onMarkerLoad = (marker) => {
        console.log("marker: ", marker);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: ["places"],
    });

    return (
        <>
            {isLoaded && <GoogleMap
                mapContainerStyle={{ width: "100%", height: "450px" }}
                center={position}
                zoom={17}
                onLoad={onLoad}
            >
                {markerPosition && <Marker position={markerPosition} onLoad={onMarkerLoad} />}
            </GoogleMap>}
        </>
    );
};
export default Map;