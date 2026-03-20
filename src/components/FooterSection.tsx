import { Brain } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 relative">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" />
        <span className="font-display font-semibold">DecideMate</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Built with ❤️ for Hackathon 2026 — Smart Decision Engine
      </p>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <a href="#" className="hover:text-primary transition-colors">About</a>
        <a href="#" className="hover:text-primary transition-colors">GitHub</a>
        <a href="#" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
