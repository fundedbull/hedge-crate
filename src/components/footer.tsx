import Link from "next/link";
import Image from "next/image";
import brix_logo from "/public/images/logo.png";
import youtube_logo from "/public/images/youtube.png";
import reddit_logo from "/public/images/reddit.png";
import instagram_logo from "/public/images/instagram.png";
import linkedin_logo from "/public/images/linkedin.png";

export default function Footerbar() {
  return (
    <footer className="container mx-auto mt-10">
      <div className="ml-4 flex flex-col border-b-2 border-t-2 border-gray-800 pt-8 text-left text-2xl font-medium text-white md:ml-0 md:flex-row md:justify-between md:pt-4 md:text-xl">
        <div className="uppercase">
          <h1 className="py-8 text-4xl font-bold text-primary-400 md:pt-0">
            Utility Pages
          </h1>
          <ul className="pt-8 md:pt-4">
            <li className="pb-2">
              <Link href="/terms-of-service" className="hover:text-orange">
                TERMS OF SERVICE
              </Link>
            </li>
            <li className="pb-2">
              <Link href="/privacy-policy" className="hover:text-orange">
                PRIVACY POLICY
              </Link>
            </li>
            {/* <li className="pb-2">
              <Link to="/" className="hover:text-pink-500">
                404 NOT FOUND
              </Link>
            </li> */}
            <li className="pb-2">
              <Link href="/disclaimer" className="hover:text-orange">
                DISCLAIMER
              </Link>
            </li>
            <li className="pb-2">
              <Link href="/refund-policy" className="hover:text-orange">
                refund policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="ml-4 flex flex-col md:items-center justify-between py-8 md:ml-0 md:flex-row">
        <Link href="/">
          <Image
            className=""
            width="128"
            height="64"
            src={brix_logo}
            alt="Hedge Logo"
          />
        </Link>

        <p className="mt-4 text-left font-medium text-neutral-400 md:my-0">
          Copyright © 2025 HEDGE CRATES | HEDGE CRATES LLC
        </p>
      </div>
    </footer>
  );
}
