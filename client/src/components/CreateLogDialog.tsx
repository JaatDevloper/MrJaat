import { useState } from "react";
import { useCreateLog } from "@/hooks/use-jaat-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NeonButton } from "./NeonButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateLogDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const { mutate: createLog, isPending } = useCreateLog();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createLog(
      { title, content },
      {
        onSuccess: () => {
          setOpen(false);
          setTitle("");
          setContent("");
          toast({
            title: "Log Entry Created",
            description: "The timeline has been updated.",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create log. System error.",
          });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NeonButton variant="outline" className="gap-2 border-accent text-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          <Plus className="w-4 h-4" />
          New Log Entry
        </NeonButton>
      </DialogTrigger>
      <DialogContent className="bg-secondary/95 backdrop-blur-xl border-white/10 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-accent flex items-center gap-2">
            <FileText className="w-5 h-5" />
            New System Log
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-muted-foreground">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. System Upgrade v2.0"
              className="bg-black/40 border-white/10 focus:border-accent font-display uppercase tracking-wide"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-muted-foreground">Log Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Record your progress..."
              className="bg-black/40 border-white/10 focus:border-accent min-h-[150px] font-mono text-sm"
            />
          </div>

          <div className="flex justify-end pt-4">
            <NeonButton 
              type="submit" 
              isLoading={isPending}
              className="bg-accent text-black hover:bg-accent/90 border-accent hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              Commit Log
            </NeonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
