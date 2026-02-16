import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Bike } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  full_name: string;
  bike_name: string;
  bike_cc: string;
  city: string;
  bio: string;
  avatar_url: string;
  riding_experience: string;
}

const NearbyRiders = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) toast.error("Failed to load riders");
      else setProfiles(data || []);
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  const filtered = profiles.filter(
    (p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.bike_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-heading font-bold mb-2">Nearby Riders</h1>
      <p className="text-muted-foreground mb-6">Find and connect with riders across Karnataka</p>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, city, or bike..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading riders...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No riders found. Be the first to complete your profile!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((rider) => (
            <Card key={rider.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={rider.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-heading text-lg">
                      {rider.full_name.charAt(0) || "R"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-lg truncate">{rider.full_name || "Anonymous Rider"}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{rider.city || "Unknown"}</span>
                    </div>
                    {rider.bike_name && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Bike className="h-3 w-3" />
                        <span>{rider.bike_name} {rider.bike_cc && `(${rider.bike_cc}cc)`}</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 capitalize">{rider.riding_experience} rider</p>
                  </div>
                </div>
                {rider.bio && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{rider.bio}</p>}
                <Button size="sm" variant="outline" className="mt-3 w-full">Connect</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyRiders;
