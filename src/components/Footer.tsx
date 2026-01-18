import { Separator } from "@/components/ui/separator";
import { GithubIcon, Linkedin, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "../../public/Esmeralda-logo.webp";
import Image from "next/image";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  EMAIL,
} from "@/app/constants";

const footerLinks = [
  {
    title: "Sobre",
    href: "/sobre",
  },
  {
    title: "Contato",
    href: "/contato",
  },
  {
    title: "Recursos",
    href: "/recursos",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Termos e Condições",
    href: "/termos",
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-(--breakpoint-xl) mx-auto">
        <div className="py-8 flex flex-col justify-start items-center">
          {/* Logo */}
          <Image src={Logo} alt="logo" width={50} height={50} />

          <ul className="mt-4 flex items-center gap-4 flex-wrap">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-4 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground">
              Esmeralda Company
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-4 text-muted-foreground">
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              className="hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              className="hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              className="hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
            <Link
              href={EMAIL}
              target="_blank"
              className="hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
