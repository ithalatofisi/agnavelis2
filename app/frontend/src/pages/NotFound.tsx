import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import SiteLayout from '@/components/SiteLayout';
import { NAV } from '@/lib/site';

/** 404 page with links back into the six main routes. */
export default function NotFound() {
  return (
    <SiteLayout>
      <Seo
        title="Page Not Found | AGNAVELIS"
        description="The requested page could not be found. Browse the AGNAVELIS silver nitrate applicator stick product, documentation and contact pages instead."
        path="/404"
      />
      <section className="site-container py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Error 404
        </p>
        <h1 className="mt-4">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          The address you opened does not exist on this website. Use the links below to
          continue.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="inline-flex rounded-md border border-border bg-card px-4 py-2.5
                  text-sm font-medium text-primary transition-colors duration-200
                  hover:md:border-accent hover:md:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
