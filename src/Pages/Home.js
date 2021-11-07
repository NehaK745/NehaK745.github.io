import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphQl/Queries";

function Home() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1> Error found :( </h1>;

  if (data) {
    console.log(data);
  }

  return (
    <div className="home">
      <h1>Search For Weather</h1>
      <input
        type="text"
        placeholder="City name..."
        onChange={(event) => {
          setCitySearched(event.target.value);
        }}
      />
      <button onClick={() => getWeather()}> Get Weather </button>
      <div className="weather">
        {data && (
          <>
            <h2> {data.getCityByName.name} </h2>
            <h2>
              Temperature: {data.getCityByName.weather.temperature.actual}
            </h2>
            <h3>
              Description: {data.getCityByName.weather.summary.description}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

