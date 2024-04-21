"use client";

import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { fetchLocation } from "@/lib/getLocation";

interface Props {
  randomLandmark: {
    center: {
      lat: number;
      lng: number;
    };
  };
}

interface Position {
  lat: number;
  lng: number;
}

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
  version: "weekly",
});

const mapOptions = {
  center: { lat: 34.0699, lng: -118.4438 },
  zoom: 18,
};

function MapDisplay({ randomLandmark }: Props) {
  const mapContainerRef = useRef(null);

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function getDistanceFromLatLonInM(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000; // Distance in m
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  function isWithinRadius(
    playerPos: Position,
    locationCenter: Position
  ): boolean {
    const distance = getDistanceFromLatLonInM(
      playerPos.lat,
      playerPos.lng,
      locationCenter.lat,
      locationCenter.lng
    );
    return distance <= 100;
  }

  // needs to take a landmark as a parameter
  useEffect(() => {
    // @ts-ignore
    let marker = null;
    // @ts-ignore
    let watchId = null;

    loader.load().then(() => {
      if (mapContainerRef.current) {
        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        new google.maps.Circle({
          strokeColor: "#1450db",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#6080b8",
          fillOpacity: 0.25,
          map: map,
          center: {
            lat:
              randomLandmark.center.lat + getRandomArbitrary(-0.0008, 0.0008),
            lng:
              randomLandmark.center.lng + getRandomArbitrary(-0.0008, 0.0008),
          },
          radius: 100,
        });
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
            const pos = {
              lat: position.coords.latitude || 34.0703423,
              lng: position.coords.longitude || -118.4469294,
            };
            const correctLandmark = randomLandmark.center;
            if (isWithinRadius(pos, correctLandmark)) {
              window.location.reload();
            }

            // If a marker already exists, remove it
            // @ts-ignore
            if (marker) {
              marker.setMap(null);
            }

            // Add a marker for the user's location
            marker = new google.maps.Marker({
              position: pos,
              map: map,
              title: "Your Location",
            });

            // Center the map on the user's location
            map.setCenter(pos);
          });
        }
      }
    });
  }, []);

  return (
    <div className="relative h-screen">
      <div className="w-full h-full border z-0" ref={mapContainerRef}>
        {/* Google Map occupies full container */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex p-2 z-10"></div>
    </div>
  );
}

export default MapDisplay;
