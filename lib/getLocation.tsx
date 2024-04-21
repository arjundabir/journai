"use client";

interface Location {
  latitude: number;
  longitude: number;
}
export const fetchLocation = () => {
  return new Promise<Location>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude }); // Resolve the promise with the coordinates
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject(error); // Reject the promise if there's an error
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};
