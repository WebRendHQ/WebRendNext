import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold">
        DD
      </Link>
      <div className="space-x-6">
        <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
          Pricing
        </Link>
        <Link href="/work" className="text-gray-600 hover:text-gray-900">
          Work
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-gray-900">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;