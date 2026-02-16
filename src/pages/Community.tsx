import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  created_at: string;
  profile?: { full_name: string; avatar_url: string; city: string };
}

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchPosts = async () => {
    const { data: postsData, error } = await supabase
      .from("community_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !postsData) { setLoading(false); return; }

    // Fetch profiles for post authors
    const userIds = [...new Set(postsData.map((p) => p.user_id))];
    const { data: profilesData } = await supabase.from("profiles").select("user_id, full_name, avatar_url, city").in("user_id", userIds);
    const profileMap = new Map((profilesData || []).map((p) => [p.user_id, p]));

    setPosts(
      postsData.map((p) => ({
        ...p,
        likes_count: p.likes_count ?? 0,
        profile: profileMap.get(p.user_id) || undefined,
      })) as Post[]
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;
    setPosting(true);
    const { error } = await supabase.from("community_posts").insert({ user_id: user.id, content: newPost.trim() });
    if (error) toast.error("Failed to post");
    else {
      setNewPost("");
      fetchPosts();
    }
    setPosting(false);
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    const { error } = await supabase.from("post_likes").insert({ post_id: postId, user_id: user.id });
    if (error) {
      // Probably already liked, try to unlike
      await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", user.id);
    }
    fetchPosts();
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-heading font-bold mb-2">Community Feed</h1>
      <p className="text-muted-foreground mb-6">Share your ride stories with the community</p>

      {/* New post */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Textarea placeholder="Share your ride experience..." value={newPost} onChange={(e) => setNewPost(e.target.value)} rows={3} />
          <div className="flex justify-end mt-3">
            <Button onClick={handlePost} disabled={posting || !newPost.trim()} size="sm">
              <Send className="h-4 w-4 mr-2" /> Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      {loading ? (
        <p className="text-muted-foreground">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No posts yet. Be the first to share!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground font-heading">
                      {post.profile?.full_name?.charAt(0) || "R"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-heading font-semibold">{post.profile?.full_name || "Anonymous Rider"}</p>
                    <p className="text-xs text-muted-foreground">{post.profile?.city} • {new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="flex gap-4">
                  <button onClick={() => handleLike(post.id)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="h-4 w-4" /> {post.likes_count}
                  </button>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" /> 0
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
