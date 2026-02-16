import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { destinations } from "@/lib/destinations";

const MapExplorer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([14.5, 75.7], 7);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const icon = L.divIcon({
      html: '<div style="background:#f97316;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    destinations.forEach((dest) => {
      L.marker([dest.lat, dest.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:200px">
            <img src="${dest.image}" style="width:100%;height:100px;object-fit:cover;border-radius:4px;margin-bottom:8px;" />
            <h3 style="margin:0;font-weight:bold;font-size:16px;">${dest.name}</h3>
            <p style="margin:4px 0;font-size:12px;color:#666;">${dest.description}</p>
            <p style="margin:2px 0;font-size:11px;">📏 ${dest.distanceFromBengaluru} from Bengaluru</p>
            <p style="margin:2px 0;font-size:11px;">🗓️ Best season: ${dest.bestSeason}</p>
            <p style="margin:2px 0;font-size:11px;">⚡ Difficulty: ${dest.difficulty}</p>
          </div>`
        );
    });

    // Bengaluru marker
    const bengaluruIcon = L.divIcon({
      html: '<div style="background:#1d4ed8;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
      className: "",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    L.marker([12.9716, 77.5946], { icon: bengaluruIcon }).addTo(map).bindPopup("<b>Bengaluru</b><br/>Starting point");

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-heading font-bold mb-2">Map Explorer</h1>
      <p className="text-muted-foreground mb-4">Explore Karnataka's best riding destinations</p>
      <div ref={mapRef} className="w-full h-[calc(100vh-220px)] rounded-lg border border-border overflow-hidden" />
    </div>
  );
};

export default MapExplorer;
