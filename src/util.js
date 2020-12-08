import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
const casesTypeColors = {
  cases: {
    multiplier: 100,
    option: { color: "#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    multiplier: 200,
    option: { color: "#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 300,
    option: { color: "#ff6c47", fillColor: "#ff6c47" },
  },
};
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//drow circle on map
export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={casesTypeColors[casesType].option}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name"> {country.country}</div>
          <div className="info-confirmed">
            cases : {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            recoverd : {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            recoverd : {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStat = (state) =>
  state ? `+ ${numeral(state).format("0,0a")}` : "+0";
