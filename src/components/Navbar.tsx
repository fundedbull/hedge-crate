"use client";
import { MenuIcon, PackageOpenIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 flex flex-col p-4  border-b border-white/20 w-full max-w-screen backdrop-blur-3xl">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/images/logo.png"
            width={496}
            height={549}
            alt="logo"
            className="h-10 w-full"
          />
        </Link>
        <ul className="hidden md:flex flex-row gap-4 items-center">
          <li>
            <Link href={"/"}>About Us</Link>
          </li>
          <li>
            <Link href={"/"}>FAQ</Link>
          </li>
          <li>
            <Link href={"/"}>Features</Link>
          </li>
          <li className="">
            <Link href="/client">Client Section</Link>
          </li>
        </ul>
        <div className="flex gap-1">
          <p className="flex items-center gap-2 rounded-full border border-white/30 px-2 py-1 font-bold">
            <PackageOpenIcon /> <span className="hidden md:block">Credits</span>{" "}
            0
          </p>

          <button onClick={() => setOpen(!isOpen)}>
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
            <Link href={"/"}>About Us</Link>
          </li>
          <li>
            <Link href={"/"}>FAQ</Link>
          </li>
          <li>
            <Link href={"/"}>Features</Link>
          </li>
          <li className="">
            <Button>Client Section</Button>
          </li>
        </ul>
      )}
    </nav>
  );
}
