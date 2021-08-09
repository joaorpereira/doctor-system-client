import { Dispatch, SetStateAction } from "react";
import api from "../../services/api";
const CORD_URL = "https://nominatim.openstreetmap.org/";

type GeoLocation = {
  type: string;
  coordinates: number[];
};

type GeolocationProps = {
  city: string;
  state: string;
  street: string;
  country?: string;
  setCoordinates: Dispatch<SetStateAction<GeoLocation>>;
};

const getCoordinates = async ({
  street,
  city,
  state,
  country = "Brasil",
  setCoordinates,
}: GeolocationProps) => {
  try {
    const result = await api.get(
      `${CORD_URL}search?street=${street.split(" ").join("+")}&city=${city
        .split(" ")
        .join("+")}&state=${state
        .split(" ")
        .join("+")}&country=${country}&format=geocodejson`
    );
    const coordinates = result.data.features[0].geometry;
    setCoordinates(coordinates);
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};

export default getCoordinates;
