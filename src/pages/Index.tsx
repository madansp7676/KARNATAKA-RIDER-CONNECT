import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Mountain, Bike } from "lucide-react";
import heroImage from "@/assets/hero-karnataka.jpg";
import { destinations } from "@/lib/destinations";

const stats = [
  { label: "Active Riders", value: "2,500+", icon: Users },
  { label: "Destinations", value: "50+", icon: MapPin },
  { label: "Group Rides", value: "120+", icon: Bike },
  { label: "Routes", value: "80+", icon: Mountain },
];

const Index = () => {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={heroImage} alt="Karnataka highway" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
            Ride Karnataka
          </h1>
          <p className="text-lg text-white/90 mb-6 max-w-xl">
            Discover the best motorcycle routes, connect with fellow riders, and explore Karnataka's stunning landscapes.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link to="/riders">Find Riders</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/destinations">Explore Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-heading font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="px-6 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-heading font-bold">Featured Destinations</h2>
          <Button variant="link" asChild>
            <Link to="/destinations">View All →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.slice(0, 3).map((dest) => (
            <Card key={dest.id} className="overflow-hidden group cursor-pointer">
              <div className="h-40 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-heading font-semibold text-lg">{dest.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{dest.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{dest.distanceFromBengaluru} from Bengaluru</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
