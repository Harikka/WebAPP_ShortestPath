import React, { FunctionComponent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useReadShortestPath, useReadAllCitiesInfo } from "../useRequest";
import "./TimeLine.css";
import GoogleMapReact from "google-map-react";
import { startCase } from "lodash";

interface componentInterface {
  value?: string;
}

const TimeLine: FunctionComponent<componentInterface> = ({ value }) => {
  const { data } = useReadShortestPath(value);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const pairwiseSum = (arr, n) => {
    let sum = 0;
    const arraySum: any[] = [];

    for (let i = 0; i < n; i++) {
      // Adding the alternate numbers
      sum = arr[i] + arr[i + 1];
      arraySum.push(sum ? sum : 0);
    }
    return arraySum;
  };

  function TotalDistanceCalc(arr) {
    let sum = 0; // initialize sum

    // Iterate through all elements
    // and add them to sum
    for (let i = 0; i < arr?.length; i++) sum += arr[i];

    return sum;
  }

  const distanceBtCities = pairwiseSum(
    data?.map((x) => x?.distance),
    data?.length
  );

  return (
    <>
      <div style={{ width: "30%", float: "left" }}>
        <div id="content">
          <ul className="timeline">
            {data?.map((item, i) => {
              {
                return (
                  <li className="event">
                    <h3>{item.id}</h3>
                    <p>{`City - ${startCase(item.name)}`}</p>
                    <p>{`Country - ${startCase(item.country)}`}</p>
                    <p>{`Distance - ${
                      distanceBtCities?.[i] === 0
                        ? "Finished"
                        : distanceBtCities?.[i]
                    }`}</p>
                  </li>
                );
              }
            })}
            <h3>
              Total Sum {TotalDistanceCalc(data?.map((x) => x?.distance))}
            </h3>
          </ul>
        </div>
      </div>

      <div style={{ width: "70%", float: "right" }}>
        <div id="content">
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            ></GoogleMapReact>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLine;
