"use client";

import MapDisplay from "@/components/game/MapDisplay";
import { useCompletion } from "ai/react";
import { useEffect, useState } from "react";

export default function Completion() {
  const [dissapear, setDissappear] = useState<Boolean>(false);
  const { completion, complete, isLoading, handleSubmit } = useCompletion();

  const landmarks: {
    [key: string]: { center: { lat: number; lng: number } };
  } = {
    bruinStatue: {
      center: { lat: 34.0709621, lng: -118.4449902 },
    },
    royceHall: {
      center: { lat: 34.0728552, lng: -118.4421766 },
    },
    powellLibrary: {
      center: { lat: 34.0716399, lng: -118.4421766 },
    },
    invertedFountain: {
      center: { lat: 34.07007650000001, lng: -118.4407628 },
    },
    pauleyPavilion: {
      center: { lat: 34.0703423, lng: -118.4469294 },
    },
    sculptureGarden: {
      center: { lat: 34.0751, lng: -118.4400333 },
    },
    janssSteps: {
      center: { lat: 34.0721929, lng: -118.443168 },
    },
    murphyHall: {
      center: { lat: 34.0716251, lng: -118.4387327 },
    },
  };
  const landmarkKeys = Object.keys(landmarks);
  const randomLandmarkKey =
    landmarkKeys[Math.floor(Math.random() * landmarkKeys.length)];

  const randomLandmark = landmarks[randomLandmarkKey];

  const landmarkKey = Object.keys(randomLandmark).find(
    (key) => landmarks[key] === randomLandmark
  );
  useEffect(() => {
    complete(
      "begin by welcoming me to journai, a way to explore the campus that you will like"
    );

    const timer = setTimeout(() => {
      setDissappear(!dissapear);
    }, 8000);

    const timerChats = setTimeout(() => {
      setDissappear(!dissapear);
      complete("give me a hint about my location");
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="w-full flex justify-center">
        <p
          className={
            `transition-all duration-500 absolute bottom-8 w-full max-w-lg text-black z-10 text-center text-2xl leading-tight ` +
            (dissapear ? "opacity-0" : "opacity-100")
          }
        >
          {completion}
        </p>
      </div>
      <MapDisplay randomLandmark={randomLandmark} />
    </div>
  );
}
