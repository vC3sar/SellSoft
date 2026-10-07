"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 -mr-2 text-zinc-400 hover:text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-zinc-950/95 border-b border-white/10 backdrop-blur-xl z-50">
          <nav className="flex flex-col px-4 py-6 gap-6 text-lg font-medium text-zinc-400">
            <Link onClick={() => setIsOpen(false)} href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/products" className="hover:text-white transition-colors">
              Productos
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/track" className="hover:text-white transition-colors">
              Rastrear Compra
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/cart" className="hover:text-white transition-colors">
              Carrito de compras
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}