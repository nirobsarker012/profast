// src/pages/CoveragePage.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useAuth from "../../hooks/useAuth";

// Static imports for marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon paths (Leaflet quirk when used with Webpack/Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Coverage() {
  const [serviceData, setServiceData] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const { loading, setLoading } = useAuth();

  const mapCenter = [23.685, 90.3563]; // Center of Bangladesh

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../../data/warehouses.json"); // Assumes file is in public/data
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setServiceData(data);
      } catch (err) {
        console.error("Error fetching warehouse data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = serviceData.filter((d) =>
    d.district.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 container mx-auto">
      <h1 className="font-extrabold text-[38px] md:text-[44px] lg:text-[56px] text-[#03373D] mb-6">
        We are available in 64 districts
      </h1>

      <input
        type="text"
        placeholder="Search district…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="input input-bordered w-full max-w-md mb-6"
      />

      <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredData.map((d, index) => (
            <Marker
              key={`${d.district}-${index}`}
              position={[d.latitude, d.longitude]}
            >
              <Popup>
                <strong>{d.district}</strong> <br />
                Region: {d.region} <br />
                Covered: {d.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {error && (
        <p className="text-red-500 mt-4">⚠️ Failed to load map data: {error}</p>
      )}
    </div>
  );
}
