import { useState } from "react";
import { useCreateQuote } from "@/hooks/use-jaat-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NeonButton } from "./NeonButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateQuoteDialog() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("MrJaat");
  const [authKey, setAuthKey] = useState("");
  
  const { mutate: createQuote, isPending } = useCreateQuote();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authKey.trim()) {
      toast({
        variant: "destructive",
        title: "Required Fields",
        description: "Please enter both quote content and admin auth key.",
      });
      return;
    }

    createQuote(
      { content, author, authKey },
      {
        onSuccess: () => {
          setOpen(false);
          setContent("");
          setAuthKey("");
          toast({
            title: "Quote Added",
            description: "Your wisdom has been immortalized.",
          });
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: error.message || "Invalid admin auth key. Access denied.",
          });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NeonButton variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Quote
        </NeonButton>
      </DialogTrigger>
      <DialogContent className="bg-secondary/95 backdrop-blur-xl border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary flex items-center gap-2">
            <Quote className="w-5 h-5" />
            Add New Wisdom
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="authKey" className="text-primary font-bold">Admin Auth Key</Label>
            <Input
              id="authKey"
              type="password"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="Enter admin key to unlock..."
              className="bg-black/60 border-primary/50 focus:border-primary text-primary placeholder:text-primary/30 font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-muted-foreground">Quote Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter something legendary..."
              className="bg-black/40 border-white/10 focus:border-primary min-h-[120px] text-lg font-medium"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author" className="text-muted-foreground">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-black/40 border-white/10 focus:border-primary font-mono"
            />
          </div>

          <div className="flex justify-end pt-4">
            <NeonButton type="submit" isLoading={isPending}>
              Immortalize
            </NeonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
