// src/pages/CoveragePage.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// static imports for marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const districts = [
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Chittagong", lat: 22.3569, lng: 91.7832 },
  { name: "Khulna", lat: 22.8456, lng: 89.5403 },
  // …add the rest of your 64 districts here
];

export default function Coverage() {
  const [filter, setFilter] = useState("");

  const filteredDistricts = districts.filter((d) =>
    d.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 container">
      <h1 className="font-extrabold text-[38px] md:text-[44px] lg:text-[56px] text-[#03373D]">
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
          center={[23.685, 90.3563]} // center of Bangladesh
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredDistricts.map((d) => (
            <Marker key={d.name} position={[d.lat, d.lng]}>
              <Popup>{d.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
