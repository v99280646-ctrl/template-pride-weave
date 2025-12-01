import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CmsContent {
  id: string;
  section: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export const useCmsContent = (section?: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: section ? ["cms-content", section] : ["cms-content"],
    queryFn: async () => {
      const { data, error }: any = section
        ? await (supabase as any)
            .from("cms_content")
            .select("*")
            .eq("section", section)
            .single()
        : await (supabase as any)
            .from("cms_content")
            .select("*")
            .order("section", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ section, content }: { section: string; content: any }) => {
      const { data, error }: any = await (supabase as any)
        .from("cms_content")
        .update({ content })
        .eq("section", section)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-content"] });
      toast.success("Content updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to update content: " + error.message);
    },
  });

  return {
    data,
    isLoading,
    updateContent: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
