"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, LogOut, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { getNameInitials } from "@/lib/utils";
import GlobalSearchModal from "./global-search-modal";

interface NavMenuProps {
  userName?: string;
  userImage?: string;
}

export default function NavMenu({ userName, userImage }: NavMenuProps) {
  const { data: session } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="w-full border-b">
      <div className="container mx-auto flex items-center justify-around p-4">
        {/* Logos*/}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>

          <button onClick={() => setSearchOpen(true)}>
            <Search />
          </button>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userImage || "/login.png"} />
                    <AvatarFallback>
                      {getNameInitials(userName || "User")}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-2 w-[180px]">
                    {session?.user?.email === "aldhusseinali@gmail.com" && (
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/dashboard" className="flex gap-2 items-center">
                            <LayoutDashboard size={10} /> Dashboard
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}

                    {session?.user ? (
                      <li>
                        <button
                          onClick={() => authClient.signOut()}
                          className="flex gap-2 items-center w-full text-left"
                        >
                          <LogOut size={16} /> Sign out
                        </button>
                      </li>
                    ) : (
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/sign-in">Login</Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t p-4 space-y-4 flex flex-col items-center justify-center">
          
          <div className="flex flex-col gap-3 ">
             <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>

          <button
            onClick={() => {
              setSearchOpen(true);
              setMobileOpen(false);
            }}
            className="flex gap-2 items-center"
          >
            <Search size={16} /> Search
          </button>

                  
                    {session?.user?.email === "aldhusseinali@gmail.com" && (
                      <li >
                       <Link href="/dashboard" className="flex gap-2 items-center">
                            <LayoutDashboard size={10} /> Dashboard
                          </Link>
                      </li>
                    )}

                   
      

          {session?.user ? (
            <button
              onClick={() => authClient.signOut()}
              className="flex gap-2 items-center"
            >
              <LogOut size={16} /> Sign out
            </button>
          ) : (
            <Link href="/sign-in">Login</Link>
          )}


        </div>
      )}

      <GlobalSearchModal isOpen={searchOpen} setIsOpen={setSearchOpen} />
    </nav>
  );
}
