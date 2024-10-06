import React, { useState } from "react";
import moment from "moment";
import PreLoading from "../../shared/loading/PreLoading";
import { useAppSelector } from "../../../redux/store";
import ApodCard from "../../shared/cards/ApodCard";
import MarsRoverCard from "../../shared/cards/MarsRoverCard";

const Main = () => {
  const [preLoading, setPreLoading] = useState(false);
  const { isApodActive, apodPhotos, marsRoverPhotos } = useAppSelector(
    (state) => state.nasa
  );

  return (
    <>
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isApodActive
            ? apodPhotos.map((item) => <ApodCard {...item} key={item.title} />)
            : marsRoverPhotos.map((item) => (
                <MarsRoverCard {...item} key={item.id} />
              ))}
        </div>
      )}
    </>
  );
};

export default Main;
