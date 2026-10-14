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
                className="text-white font-bold hover:text-[#ff003d] transition-colors block mb-1.5"
              >
                {contact.email}
              </a>
              {contact.whatsapp && (
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#34eb77] font-bold transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp: {contact.whatsapp}</span>
                </a>
              )}
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
