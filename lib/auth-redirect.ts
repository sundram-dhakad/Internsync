import { supabase } from "@/lib/supabase";

export async function getDashboardPath() {
  if (!supabase) return null;

  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role === "industry") return "/industry/dashboard";
  if (profile?.role === "student") return "/student/dashboard";

  const metadataRole = user.user_metadata?.role;
  return metadataRole === "industry"
    ? "/industry/dashboard"
    : "/student/dashboard";
}
