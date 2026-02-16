import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Zap } from "lucide-react";
import { destinations, categoryLabels, difficultyColors, type Destination } from "@/lib/destinations";

const categories: (Destination["category"] | "all")[] = ["all", "hill_station", "heritage", "coastal", "waterfall"];

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState<Destination["category"] | "all">("all");

  const filtered = activeCategory === "all" ? destinations : destinations.filter((d) => d.category === activeCategory);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-heading font-bold mb-2">Tourist Destinations</h1>
      <p className="text-muted-foreground mb-6">Karnataka's best riding destinations</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)}>
            {cat === "all" ? "All" : categoryLabels[cat]}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((dest) => (
          <Card key={dest.id} className="overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading font-semibold text-xl">{dest.name}</h3>
                <Badge className={difficultyColors[dest.difficulty]} variant="secondary">
                  {dest.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{dest.description}</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>{dest.distanceFromBengaluru} from Bengaluru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Best: {dest.bestSeason}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3" />
                  <span className="capitalize">{categoryLabels[dest.category]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
