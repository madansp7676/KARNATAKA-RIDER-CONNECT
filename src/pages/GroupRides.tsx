import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Plus } from "lucide-react";
import { toast } from "sonner";

interface Ride {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  route: string;
  meeting_point: string;
  ride_date: string;
  max_riders: number;
  difficulty: string;
  created_at: string;
  rsvp_count?: number;
}

const GroupRides = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", route: "", meeting_point: "", ride_date: "", difficulty: "moderate" });

  const fetchRides = async () => {
    const { data, error } = await supabase.from("group_rides").select("*").order("ride_date", { ascending: true });
    if (!error) setRides(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRides(); }, []);

  const handleCreate = async () => {
    if (!user || !form.title || !form.route || !form.meeting_point || !form.ride_date) {
      toast.error("Please fill in all required fields");
      return;
    }
    const { error } = await supabase.from("group_rides").insert({
      creator_id: user.id,
      title: form.title,
      description: form.description || null,
      route: form.route,
      meeting_point: form.meeting_point,
      ride_date: form.ride_date,
      difficulty: form.difficulty,
    });
    if (error) toast.error("Failed to create ride");
    else {
      toast.success("Ride created!");
      setOpen(false);
      setForm({ title: "", description: "", route: "", meeting_point: "", ride_date: "", difficulty: "moderate" });
      fetchRides();
    }
  };

  const handleRSVP = async (rideId: string) => {
    if (!user) return;
    const { error } = await supabase.from("ride_rsvps").insert({ ride_id: rideId, user_id: user.id });
    if (error) {
      await supabase.from("ride_rsvps").delete().eq("ride_id", rideId).eq("user_id", user.id);
      toast.info("RSVP cancelled");
    } else {
      toast.success("You're in!");
    }
  };

  const diffColors: Record<string, string> = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    challenging: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Group Rides</h1>
          <p className="text-muted-foreground">Plan and join rides with the community</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Create Ride</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Create a Group Ride</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Weekend ride to Coorg" /></div>
              <div><Label>Route *</Label><Input value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} placeholder="Bengaluru → Mysore → Coorg" /></div>
              <div><Label>Meeting Point *</Label><Input value={form.meeting_point} onChange={(e) => setForm({ ...form, meeting_point: e.target.value })} placeholder="Forum Mall Parking" /></div>
              <div><Label>Date & Time *</Label><Input type="datetime-local" value={form.ride_date} onChange={(e) => setForm({ ...form, ride_date: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Details about the ride..." /></div>
              <div>
                <Label>Difficulty</Label>
                <div className="flex gap-2 mt-1">
                  {["easy", "moderate", "challenging"].map((d) => (
                    <Button key={d} variant={form.difficulty === d ? "default" : "outline"} size="sm" onClick={() => setForm({ ...form, difficulty: d })} className="capitalize">{d}</Button>
                  ))}
                </div>
              </div>
              <Button onClick={handleCreate} className="w-full">Create Ride</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading rides...</p>
      ) : rides.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No upcoming rides. Create the first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rides.map((ride) => (
            <Card key={ride.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="font-heading text-xl">{ride.title}</CardTitle>
                  <Badge className={diffColors[ride.difficulty] || ""} variant="secondary">{ride.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {ride.description && <p className="text-sm text-muted-foreground mb-3">{ride.description}</p>}
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="h-3 w-3" />{new Date(ride.ride_date).toLocaleString()}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3" />{ride.meeting_point}</div>
                  <div className="flex items-center gap-2"><Users className="h-3 w-3" />Route: {ride.route}</div>
                </div>
                <Button size="sm" className="mt-4 w-full" variant="outline" onClick={() => handleRSVP(ride.id)}>
                  Join This Ride
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupRides;
