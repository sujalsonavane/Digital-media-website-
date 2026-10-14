'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { agencyConfig, navLinks, socialLinks } from '@/data/agencyData';

export const FooterSection: React.FC = () => {
  const { contact } = agencyConfig;
  const [istTime, setIstTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateIST = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setIstTime(formatter.format(new Date()).toUpperCase());
      } catch {
        setIstTime('07:18 PM');
      }
    };
    updateIST();
    const interval = setInterval(updateIST, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="site-footer bg-[#111215] text-white rounded-[var(--r-panel)] px-[var(--inset)] pt-10 sm:pt-14 pb-10 overflow-hidden select-none"
    >
      {/* Monumental Luminous Brand Panorama Banner */}
      <div className="mb-10 sm:mb-14 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 relative group bg-[#161d25] shadow-2xl">
        <div className="relative w-full aspect-[3.1/1] overflow-hidden flex items-center justify-center">
          <Image
            src="/images/luminous-brand-banner.png"
            alt="Luminous Digital Studio"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            priority={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
        {/* Brand Column with Official Icon & Wordmark */}
        <div>
          <Link
            href="#"
            className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white inline-flex items-center gap-3 mb-3 hover:text-[#ff003d] transition-colors group"
          >
            <Image
              src="/images/luminous-mark.png"
              alt="Luminous icon"
              width={34}
              height={34}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-md border border-white/10 group-hover:scale-105 transition-transform"
            />
            <span>{agencyConfig.brandmark}</span>
          </Link>
          <p className="text-xs sm:text-sm text-[#8c9196] leading-relaxed max-w-xs">
            {contact.footerTagline}
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <ul className="space-y-3 text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.url}
                  className="text-white/80 hover:text-[#ff003d] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Network Column */}
        <div>
          <ul className="space-y-3 text-sm font-semibold">
            {socialLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 hover:text-[#ff003d] transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Contact & Location Column (Matching Awake Reference frame 009) */}
        <div>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-[#8c9196] block mb-1 font-medium">Contact us</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-white font-bold hover:text-[#ff003d] transition-colors"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <span className="text-[#8c9196] block mb-1 font-medium">Based in</span>
              <span className="text-white font-bold">
                INDIA {istTime || '07:18 PM'} · IST
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row (Matching Awake Reference frame 009) */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] sm:text-xs font-semibold text-[#8c9196]">
        <span>{contact.legal}</span>
        <div className="flex items-center gap-6 uppercase tracking-wider text-[10px] sm:text-xs">
          <Link href="/privacy" className="hover:text-white transition-colors">
            PRIVACY
          </Link>
          <Link href="/cookies" className="hover:text-white transition-colors">
            COOKIES
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            TERMS
          </Link>
        </div>
        <button
          onClick={scrollToTop}
          type="button"
          className="hover:text-white transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-1"
        >
          <span>Back to top</span>
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
};
