import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphQl/Queries";
import '../App.css';

function Home() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error,loading }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });



  if (data) {
    console.log(data);
  }
  if(loading) return <h1> Loading...</h1>;
if(error) return <h1> error :( </h1>;


  return (
    <div className="home">
      <h1>Search For Weather</h1>
      <input class='I'
        type="text"
        value={citySearched}
        placeholder="City name..."
        onChange={(event) => {
          setCitySearched(event.target.value);
        }}
      />
      <button disabled={!citySearched} onClick={() => getWeather()}> Get Weather </button>
      <div className="weather">
        {data ? (
          <>
            <h2> {data.getCityByName.name} </h2>
            <h2>
              Temperature: {Math.round(data.getCityByName.weather.temperature.actual- 273)} °C
            </h2>
            <h3>
              Description: {data.getCityByName.weather.summary.description}
            </h3>
          </>
        ): null}
     
        
      </div>
    </div>
  );
}

export default Home;

