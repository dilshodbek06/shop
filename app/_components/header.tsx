"use client";

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import SearchForm from "./search-form";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  const cart = useCartStore((state) => state.cart);

  const [cartLength, setCartLength] = useState(0);

  const [randomSymbol, setRandomSymbol] = useState<string | null>(null);

  useEffect(() => {
    setCartLength(cart.length);
  }, [cart]);

  useEffect(() => {
    function generateRandom2Symbol(): string {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";

      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
      }

      return result;
    }

    setRandomSymbol(generateRandom2Symbol());
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="h-[80px] shadow-lg flex items-center">
      <div className="container max-w-6xl px-3 sm:px-8 flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <div className="hidden md:block">
          <SearchForm />
        </div>
        <div className="flex gap-2 items-center">
          <Link href={"/cart"}>
            <Button>cart ({cartLength})</Button>
          </Link>
          {user ? (
            <UserButton />
          ) : (
            <Button
              className={cn(
                "size-10 animate-bg-shine rounded-full border-[1px] shadow bg-[length:200%_100%] tracking-wide",
                "dark:bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] dark:text-zinc-200 dark:border-zinc-800",
                "bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800 border-zinc-300"
              )}
              variant="outline"
            >
              {randomSymbol}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
