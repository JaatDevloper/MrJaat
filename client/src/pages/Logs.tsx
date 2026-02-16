import { Navigation } from "@/components/Navigation";
import { useLogs } from "@/hooks/use-jaat-data";
import { CreateLogDialog } from "@/components/CreateLogDialog";
import { motion } from "framer-motion";
import { Terminal, Loader2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

export default function Logs() {
  const { data: logs, isLoading, isError } = useLogs();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2 text-accent">
              <Terminal className="w-6 h-6" />
              <span className="font-mono text-sm uppercase tracking-widest">System Logs // Authorized Access Only</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-white">
              Command <span className="text-accent">Center</span>
            </h1>
          </div>
          <CreateLogDialog />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500 font-mono">
            ERROR: CONNECTION_REFUSED. Retry handshake.
          </div>
        ) : logs && logs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-secondary/10">
            <p className="text-muted-foreground font-mono">No entries found in database.</p>
          </div>
        ) : (
          <div className="relative border-l border-white/10 ml-4 md:ml-10 space-y-12">
            {logs?.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline node */}
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                
                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex items-center gap-3 text-xs font-mono text-accent/70 uppercase tracking-widest">
                    {log.createdAt && (
                      <>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(log.createdAt), 'yyyy-MM-dd')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(log.createdAt), 'HH:mm:ss')}
                        </span>
                      </>
                    )}
                    <span className="bg-accent/10 px-2 py-0.5 rounded text-accent border border-accent/20">
                      ID: {log.id.toString().padStart(4, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {log.title}
                  </h3>
                </div>

                <div className="bg-secondary/20 border-l-2 border-accent/30 p-6 rounded-r-lg max-w-4xl hover:bg-secondary/30 transition-colors">
                  <p className="font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {log.content || ''}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
