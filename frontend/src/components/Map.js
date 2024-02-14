import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map
    const leafletMap = L.map('map').setView([0, 0], 2); // Initial view at [0, 0] with zoom level 2

    // Add the tile layer (you can use any tile layer provider)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    setMap(leafletMap);

    return () => {
      // Clean up map instance when component unmounts
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Function to fetch location data from the backend and add markers to the map
    const fetchAndAddMarkers = async () => {
      try {
        const response = await axios({
            method: "get", 
            url: `${process.env.REACT_APP_API_URL}/api/v1/customer/getLocation`,
          });

        const data = await response.data;
        console.log("response.json() from MapComponent: ", data)
        // Clear existing markers
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Add markers for customers
        if (data.customer && data.customer.latitude && data.customer.longitude) {
          L.marker([data.customer.latitude, data.customer.longitude]).addTo(map).bindPopup('Customer');
        }

        // Add markers for deliveries
        if (data.delivery && data.delivery.latitude && data.delivery.longitude) {
          L.marker([data.delivery.latitude, data.delivery.longitude]).addTo(map).bindPopup('Delivery');
        }
      } catch (error) {
        console.error('Error fetching and adding markers:', error.message);
      }
    };

    // Call the function to fetch and add markers initially
    fetchAndAddMarkers();

    // Set interval to refresh markers every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchAndAddMarkers, 5000);

    return () => {
      clearInterval(intervalId); // Clear interval when component unmounts
    };
  }, [map]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default MapComponent;
