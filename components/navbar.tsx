"use client"

import { Link } from "@heroui/link";
import { Navbar as HeroUINavbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/navbar";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { BookText } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { WalletComponents } from "./wallet";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar maxWidth="full" position="sticky" className="bg-transparent backdrop-saturate-100" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="basis-1/5 lg:basis-full hidden lg:block" justify="start">
        <div className="relative flex items-center border border-gray-600 rounded-full w-fit">
          <div className="realtive flex p-1">
            {siteConfig.navItems.map((item) => (
              <NavbarItem
                key={item.href}
                className="relative navbar-item"
              >
                <Link
                  className={clsx(
                    "text-sm font-normal px-4 py-2 rounded-full",
                    pathname === item.href ? "text-background" : "text-foreground"
                  )}
                  href={item.href}
                >
                  {pathname === item.href && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 bg-foreground mix-blend-difference"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="z-10">{item.label}</span>
                </Link>
              </NavbarItem>
            ))}
          </div>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex basis-1/5 lg:basis-full mb-4" justify="end">
        <NavbarItem className="hidden lg:flex gap-4">
          <Link isExternal href={siteConfig.links.docs} title="Docs">
            <BookText className="text-default-500 h-5 w-5" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <WalletComponents />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4">
        <div className="flex justify-between items-center w-full">
          <NavbarMenuToggle className="p-5 -ml-5" />
          <div className="flex flex-row gap-3">
            <Link isExternal href={siteConfig.links.docs} title="Docs">
              <BookText className="text-default-500 h-5 w-5" />
            </Link>
            <Link isExternal href={siteConfig.links.github} title="GitHub">
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </div>
        </div>
      </NavbarContent>

      <NavbarMenu className="z-20 absolute inset-0 full-height bg-background/50">
        <div className="mx-4 flex-col gap-5 flex-grow inline-flex justify-between py-10">
          <div className="inline-flex flex-col gap-5">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className={clsx(
                    "border-l-2 pl-5 h-10",
                    pathname === item.href ? "border-primary text-primary" : "border-transparent"
                  )}
                  color="foreground"
                  href={item.href}
                  size="lg"
                  onPress={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <WalletComponents />
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
