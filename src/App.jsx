import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import "./index.css"; // Ensure your CSS with .weather-app, .sunny, .cloudy, .rainy classes and animations is present

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("light");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city === "") return;

    const apiKey = "a6a8424406583addbbcdb7e174913a99"; // replace with your key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setWeather(null);
      });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

 const getWeatherClass = () => {
  if (!weather) return "sunny";
  const condition = weather.weather[0].main.toLowerCase();
  if (condition.includes("snow")) return "snowy";
  if (condition.includes("cloud")) return "cloudy";
  if (condition.includes("rain") || condition.includes("drizzle")) return "rainy";
  if (condition.includes("clear")) return "sunny";
  return "sunny";
};

  return (
    <div className={`weather-app ${getWeatherClass()}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* ☁️ Clouds overlay */}
      {getWeatherClass() === "cloudy" && (
  <>
    <img
      src="https://pngimg.com/uploads/cloud/cloud_PNG16.png"
      alt="Cloud"
      className="cloud"
    />
    <img
      src="https://pngimg.com/uploads/cloud/cloud_PNG19.png"
      alt="Cloud"
      className="cloud2"
    />
  </>
)}


      {/* 🌧️ Rain overlay */}
      {getWeatherClass() === "rainy" &&
        Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="rain"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 0.5 + 0.5}s`,
            }}
          ></div>
        ))}
{getWeatherClass() === "snowy" &&
  Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className="snowflake"
      style={{
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      }}
    ></div>
  ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          color: theme === "light" ? "#fff" : "#e0e0e0",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Weather App 🌦️</h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              width: "200px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ffffff",
              color: "#333",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {weather && (
          <div
            className="glass-card"
            style={{
              padding: "20px 30px",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(5px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{weather.name}</h2>
            <p style={{ fontSize: "2rem", margin: "10px 0" }}>{weather.main.temp} °C</p>
            <p
              style={{
                textTransform: "capitalize",
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              {weather.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="Weather Icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
