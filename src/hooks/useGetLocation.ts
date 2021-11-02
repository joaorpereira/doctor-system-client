import { useEffect, useState } from "react";

const useGetLocation = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [status, setStatus] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { lat, lon, status };
};

export default useGetLocation;
