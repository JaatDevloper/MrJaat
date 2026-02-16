import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { NeonButton } from "@/components/NeonButton";
import { GlitchText } from "@/components/GlitchText";
import { ArrowRight, Terminal, Quote, Cpu, BadgeCheck } from "lucide-react";
import { Link } from "wouter";

// Background grid effect component
const GridBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 overflow-hidden">
        <GridBackground />
        
        {/* Cover Photo Area */}
        <div className="absolute top-0 left-0 w-full h-64 -z-20 overflow-hidden">
          <img 
            src="/cover-jaat.png" 
            className="w-full h-full object-cover opacity-40"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/30 p-1 bg-background relative">
            <img 
              src="/profile-jaat.png" 
              className="w-full h-full rounded-full object-cover"
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 bg-background rounded-full p-1">
              <BadgeCheck className="w-6 h-6 text-blue-500 fill-blue-500/20" />
            </div>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Verified Profile: INSANE
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-none">
            <span className="block text-stroke-white text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">The Realm of</span>
            <GlitchText text="INSANE" className="text-primary text-glow" />
          </h1>
          
          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Welcome to the digital frontier. A synthesis of raw power, 
            heritage, and futuristic vision. Explore the wisdom and the journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/logs">
              <NeonButton className="w-full sm:w-auto">
                Enter Logs <ArrowRight className="w-4 h-4 ml-2" />
              </NeonButton>
            </Link>
            <Link href="/quotes">
              <NeonButton variant="outline" className="w-full sm:w-auto">
                View Wisdom
              </NeonButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="container mx-auto px-4 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group glass-card p-8 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-24 h-24" />
            </div>
            <Quote className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-2xl mb-2 text-white group-hover:text-primary transition-colors">Jaat Quotes</h3>
            <p className="text-muted-foreground mb-6">
              Words that carry the weight of tradition and the sharpness of truth. 
              Explore the archive of wisdom.
            </p>
            <Link href="/quotes" className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-primary flex items-center gap-2 transition-colors">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group glass-card p-8 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal className="w-24 h-24" />
            </div>
            <Terminal className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-2xl mb-2 text-white group-hover:text-accent transition-colors">Dev Logs</h3>
            <p className="text-muted-foreground mb-6">
              A chronological record of progress, system updates, and thoughts 
              from the command center.
            </p>
            <Link href="/logs" className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-accent flex items-center gap-2 transition-colors">
              Access Terminal <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group glass-card p-8 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-24 h-24" />
            </div>
            <Cpu className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl mb-2 text-white group-hover:text-blue-500 transition-colors">Connect</h3>
            <p className="text-muted-foreground mb-6">
              Establish a secure link. Reach out for collaborations, 
              inquiries, or simply to pay respects.
            </p>
            <a href="mailto:MrJaat16x7@gmail.com" className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-blue-500 flex items-center gap-2 transition-colors">
              Initialize Handshake <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="font-display font-bold text-2xl uppercase tracking-widest mb-4">
            INSANE<span className="text-primary">✨</span>
          </div>
          <p className="text-muted-foreground text-sm font-mono">
            &copy; {new Date().getFullYear()} System All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
