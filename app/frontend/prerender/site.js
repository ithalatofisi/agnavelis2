import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Product from '../src/pages/Product';
import Manufacturer from '../src/pages/Manufacturer';
import Documentation from '../src/pages/Documentation';
import InstructionsForUse from '../src/pages/InstructionsForUse';
import Contact from '../src/pages/Contact';
import NotFound from '../src/pages/NotFound';
import { getSeoHead, resetSeoSnapshot } from '../src/components/Seo';
import { SITE_ROUTES } from './site-routes.js';

const PAGES = [
  { path: '/', element: Home },
  { path: '/silver-nitrate-applicator-sticks', element: Product },
  { path: '/manufacturer', element: Manufacturer },
  { path: '/quality-documentation', element: Documentation },
  { path: '/instructions-for-use', element: InstructionsForUse },
  { path: '/contact', element: Contact },
];

export { SITE_ROUTES };

/**
 * Renders one route to static HTML so that every public page ships crawlable
 * content, unique metadata and JSON-LD without requiring a server.
 */
export async function prerender({ url }) {
  resetSeoSnapshot();

  const html = renderToString(
    React.createElement(
      StaticRouter,
      { location: url },
      React.createElement(
        Routes,
        null,
        ...PAGES.map((page) =>
          React.createElement(Route, {
            key: page.path,
            path: page.path,
            element: React.createElement(page.element),
          })
        ),
        React.createElement(Route, {
          key: 'not-found',
          path: '*',
          element: React.createElement(NotFound),
        })
      )
    )
  );

  return { html, head: getSeoHead() };
}
