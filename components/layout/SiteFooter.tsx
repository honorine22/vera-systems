import Image from "next/image";
import type { SiteCopy } from "../home/translations";

export default function SiteFooter({ copy }: { copy: SiteCopy }) {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-white py-12 dark:border-white/10 dark:bg-[hsl(var(--muted))]/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-xs">
            <Image
              src="/logos/vera-logo-blue-transparent.png"
              alt="Vera Systems"
              width={150}
              height={90}
              className="h-auto w-32 dark:hidden"
            />
            <Image
              src="/logos/vera-logo-light-transparent.png"
              alt="Vera Systems"
              width={150}
              height={90}
              className="hidden h-auto w-32 dark:block"
            />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {copy.footer.columns.map((column) => (
              <div key={column.heading}>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.22em]"
                  style={{ color: "#18A89D" }}
                >
                  {column.heading}
                </p>

                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="story-link text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--navy-950))] dark:hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-6 dark:border-white/10 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {copy.footer.copyright}
          </p>

          <div className="flex gap-4 text-[11px] font-black uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
            <a href="/admin" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
              Admin inbox
            </a>
            <a
              href="https://www.linkedin.com/company/vera-systems/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white"
            >
              LinkedIn
            </a>
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
