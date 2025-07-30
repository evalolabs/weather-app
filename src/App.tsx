import React, { useState, useEffect } from 'react';
import './App.css';

interface WeatherForecast {
  date: string;
  temperatureC: number;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast';

  useEffect(() => {
    fetchWeatherData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const getTemperatureF = (celsius: number) => {
    return Math.round((celsius * 9/5) + 32);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Wetter App</h1>
        <p>Verbunden mit Azure API: TeleBing</p>
      </header>
      
      <main className="App-main">
        <div className="weather-container">
          <button 
            onClick={fetchWeatherData} 
            disabled={loading}
            className="refresh-button"
          >
            {loading ? 'Lädt...' : '🔄 Aktualisieren'}
          </button>

          {error && (
            <div className="error-message">
              <p>❌ Fehler beim Laden der Wetterdaten:</p>
              <p>{error}</p>
            </div>
          )}

          {loading && !error && (
            <div className="loading">
              <p>⏳ Lade Wetterdaten von Azure API...</p>
            </div>
          )}

          {!loading && !error && weatherData.length > 0 && (
            <div className="weather-grid">
              <h2>Wettervorhersage</h2>
              {weatherData.map((forecast, index) => (
                <div key={index} className="weather-card">
                  <div className="date">{formatDate(forecast.date)}</div>
                  <div className="temperature">
                    <span className="celsius">{forecast.temperatureC}°C</span>
                    <span className="fahrenheit">({getTemperatureF(forecast.temperatureC)}°F)</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && weatherData.length === 0 && (
            <div className="no-data">
              <p>Keine Wetterdaten verfügbar</p>
            </div>
          )}
        </div>

        <div className="api-info">
          <h3>API Informationen</h3>
          <p><strong>Endpoint:</strong> {API_BASE_URL}</p>
          <p><strong>Methode:</strong> GET</p>
          <p><strong>Status:</strong> {loading ? 'Lädt...' : error ? 'Fehler' : 'Verbunden'}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
