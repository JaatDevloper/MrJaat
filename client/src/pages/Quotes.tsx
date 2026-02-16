import { Navigation } from "@/components/Navigation";
import { useQuotes } from "@/hooks/use-jaat-data";
import { CreateQuoteDialog } from "@/components/CreateQuoteDialog";
import { motion } from "framer-motion";
import { Quote as QuoteIcon, Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const HARDCODED_QUOTES = [
  {
    id: 1,
    content: "Strength is not just physical, it's a state of mind.",
    author: "MrJaat",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    content: "Roots deep, head high. That's the way.",
    author: "Jaat Wisdom",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    content: "Built different. Built to last.",
    author: "MrJaat",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    content: "The legacy is not what we leave behind, but what we build today.",
    author: "MrJaat",
    createdAt: new Date().toISOString()
  }
];

export default function Quotes() {
  const { data: serverQuotes, isLoading } = useQuotes();
  const quotes = serverQuotes && serverQuotes.length > 0 ? serverQuotes : HARDCODED_QUOTES;
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    const authKey = prompt("Enter admin auth key to delete this quote:");
    if (!authKey) return;

    try {
      await apiRequest("DELETE", `/api/quotes/${id}`, { authKey });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      toast({
        title: "Quote Deleted",
        description: "The wisdom has been removed from the archive.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: error.message || "Invalid admin auth key. Access denied.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-4">
              Legacy <span className="text-primary">Archive</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              A collection of thoughts, maxims, and rugged wisdom.
            </p>
          </div>
          <CreateQuoteDialog />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : quotes && quotes.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            <p className="text-muted-foreground">No wisdom recorded yet. Be the first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes?.map((quote: any, idx: number) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-secondary/20 border border-white/5 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300 p-8 rounded-lg overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleDelete(quote.id)}
                    className="p-2 text-red-500 hover:text-red-400 bg-red-500/10 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <QuoteIcon className="w-8 h-8 text-primary/40 mb-6" />
                
                <blockquote className="font-display text-2xl md:text-3xl font-bold leading-tight mb-6 text-white group-hover:text-glow transition-all">
                  "{quote.content}"
                </blockquote>
                
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                  <span className="font-mono text-primary text-sm uppercase tracking-wider">
                    — {quote.author}
                  </span>
                  {quote.createdAt && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {format(new Date(quote.createdAt), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
