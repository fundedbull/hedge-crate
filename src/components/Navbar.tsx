"use client";
import { MenuIcon, PackageOpenIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

interface NavbarProps {
  creditBalance: number;
}

export default function Navbar({ creditBalance }: NavbarProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="sticky z-50 top-0 flex flex-col p-4  border-b border-white/20 w-full max-w-screen backdrop-blur-3xl">
      <div className="flex items-center justify-between relative">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/images/logo.png"
            width={496}
            height={549}
            alt="logo"
            className="h-10 w-40 md:w-full"
          />
        </Link>
        <ul className="hidden md:flex flex-row gap-4 items-center absolute left-1/2 -translate-x-1/2">
          <li>
            <Link href={"#crates"}>Crates</Link>
          </li>
          <li>
            <Link href={"#features"}>Features</Link>
          </li>
          <li>
            <Link href={"#faqs"}>FAQs</Link>
          </li>
        </ul>
        <div className="flex gap-1">
          <p className="flex items-center gap-2 rounded-full border border-white/30 px-2 py-1 font-bold">
            <PackageOpenIcon /> <span className="hidden md:block">Credits</span>{" "}
            {creditBalance}
          </p>
          <Button asChild className="hidden md:block ml-2">
            <Link href="/client">Client Section</Link>
          </Button>
          <SignedIn>
            <Button
              asChild
              variant="secondary"
              className="hidden md:block ml-2"
            >
              <SignOutButton />
            </Button>
          </SignedIn>
          <button className="md:hidden" onClick={() => setOpen(!isOpen)}>
            {isOpen ? (
              <X className="size-8" />
            ) : (
              <MenuIcon className="size-8" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <ul className="space-y-6 pt-4">
          <li>
            <Link href={"#crates"}>Crates</Link>
          </li>
          <li>
            <Link href={"#features"}>Features</Link>
          </li>
          <li>
            <Link href={"#faqs"}>FAQs</Link>
          </li>
          <li className="">
            <Button asChild className="">
              <Link href="/client">Client Section</Link>
            </Button>
          </li>
          <li>
            <SignedIn>
              <Button asChild variant="secondary" className="">
                <SignOutButton />
              </Button>
            </SignedIn>
          </li>
        </ul>
      )}
    </nav>
  );
}
