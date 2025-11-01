import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandInstagram ,
  IconBookmark,
  IconBrandLinkedin ,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram  className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin  className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Substrack",
      icon: (
        <IconBookmark  className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[8rem] w-full mb-5">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
