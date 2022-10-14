import React, { FunctionComponent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useReadAllCitiesInfo } from "../useRequest";
import TimelineFrame from "../components/TimeLine.tsx";

interface componentInterface {}

const ShortestPath: FunctionComponent<componentInterface> = () => {
  const { data: readAllCities } = useReadAllCitiesInfo();
  const [inputValue, setInputValue] = useState("");
  let Options = [];
  const getDataForSearch = (value) => {
    for (var i = 0; i < readAllCities?.length; i++) {
      Options.push(readAllCities?.[i]?.id);
    }
    setInputValue(value?.inputProps?.value);
  };

  //useEffect(() => {}, [inputValue]);

  return (
    <>
      <div
        style={{ marginLeft: "40%", marginTop: "60px", marginBottom: "20px" }}
      >
        <Autocomplete
          style={{ width: 500 }}
          autoComplete
          autoHighlight
          options={Options}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                onChange={() => {
                  getDataForSearch(params);
                }}
                variant="outlined"
                label="Search Origin"
              />
            </>
          )}
        />
      </div>
      <div>
        <TimelineFrame value={inputValue ? inputValue : "BOM"} />
      </div>
    </>
  );
};

export default ShortestPath;
