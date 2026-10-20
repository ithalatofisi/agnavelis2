import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function QuoteCta({ children, location, onDark = false }: { children: ReactNode; location: string; onDark?: boolean }) {
  return <Link to="/contact#b2b-quote" data-quote-location={location} className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-200 ${onDark ? 'bg-white text-primary hover:md:bg-white/90' : 'bg-accent text-accent-foreground hover:md:bg-accent/90'}`}>{children}</Link>;
}
