import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Manufacturer from '@/pages/Manufacturer';
import Documentation from '@/pages/Documentation';
import InstructionsForUse from '@/pages/InstructionsForUse';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/** Route table for the six public AGNAVELIS pages. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/silver-nitrate-applicator-sticks" element={<Product />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/quality-documentation" element={<Documentation />} />
        <Route path="/instructions-for-use" element={<InstructionsForUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
