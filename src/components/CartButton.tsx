"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function CartButton() {
  const items = useCartStore(s => s.items);
  const [mounted, setMounted] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && itemCount > prevCount) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBouncing(true);
      const t = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(t);
    }
    setPrevCount(itemCount);
  }, [itemCount, mounted, prevCount]);

  return (
    <Link 
      href="/cart" 
      className={`relative p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all ${isBouncing ? 'scale-125 text-indigo-400 drop-shadow-[0_0_15px_rgba(79,70,229,0.8)]' : 'scale-100'}`}
      style={{ transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
    >
      <ShoppingCart className="w-5 h-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-zinc-950">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
