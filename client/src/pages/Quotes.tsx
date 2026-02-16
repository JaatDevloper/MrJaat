import { Navigation } from "@/components/Navigation";
import { useQuotes } from "@/hooks/use-jaat-data";
import { CreateQuoteDialog } from "@/components/CreateQuoteDialog";
import { motion } from "framer-motion";
import { Quote as QuoteIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function Quotes() {
  const { data: quotes, isLoading, isError } = useQuotes();

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
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            Failed to load data from the mainframe.
          </div>
        ) : quotes && quotes.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            <p className="text-muted-foreground">No wisdom recorded yet. Be the first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes?.map((quote, idx) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-secondary/20 border border-white/5 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300 p-8 rounded-lg overflow-hidden"
              >
                {/* Decorative glowing corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                
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
