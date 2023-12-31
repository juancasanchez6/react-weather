import React, { useEffect, useState } from "react";
import axios from "axios";

//Funciones de Conversión
const convertToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const convertToKilometersPerHour = (milesPerHour) => {
  return milesPerHour * 1.60934;
};

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7540c8bf73074c6a8f04b2e802fa1ce0`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  // Funciones de conversión aplicadas a los datos
  const temperatureC = data.main ? convertToCelsius(data.main.temp) : null;
  const feelsLikeC = data.main ? convertToCelsius(data.main.feels_like) : null;
  const windKph = data.wind
    ? convertToKilometersPerHour(data.wind.speed)
    : null;


  const convertirAModoHora = (fechaA) => {
    const fecha = new Date(fechaA * 1000);
    const horas = fecha.getUTCHours();
    const minutos = fecha.getUTCMinutes();

   
    // Formatear el tiempo
    const tiempoFormateado = `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;

    
    return tiempoFormateado;
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Escribe tu localización"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{temperatureC.toFixed(0)}ºC</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="bottom1">
            <div className="feels">
              {data.main ? (
                <p className="bold">{feelsLikeC.toFixed(0)}ºC</p>
              ) : null}{" "}
              <p>Sensación</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{windKph.toFixed(0)} KM/H</p>
              ) : null}
              <p>Viento</p>
            </div>
          </div>
          <div className="bottom2">
            <div className="feels">
              {data.visibility ? (
                <p className="bold">{data.visibility / 10000}Km</p>
              ) : null}{" "}
              <p>Visibilidad</p>
            </div>
            <div className="humidity">
              {data.sys ? (
                <p className="bold">{convertirAModoHora(data.sys.sunrise)} </p>
              ) : null}
              <p>Amanecer</p>
            </div>
            <div className="wind">
              {data.sys ? (
                <p className="bold">{convertirAModoHora(data.sys.sunset)} </p>
              ) : null}
              <p>Atarceder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
