/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Scissors, ArrowUpRight, MessageSquare } from 'lucide-react';
import {
  BARBERS,
  BRANCHES,
  HERO_IMAGE,
  Language,
  SERVICE_HAIRCUT_IMAGE,
  SERVICE_SHAVE_IMAGE,
  ServiceCategory,
  SERVICES,
  UI_COPY,
} from './data/barbershop';
import { BookingSection } from './components/BookingSection';
import { LocationMapSection } from './components/LocationMapSection';
import { ChatbotDrawer } from './components/ChatbotDrawer';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#16161A] via-[#0E0E11] to-[#08080A] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Scissors className="h-8 w-8 text-[#D4AF37]/60" aria-hidden="true" />
        <span className="mt-2 text-xs text-[#71717A]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default function App() {
  const [language, setLanguage] = useState<Language>('ky');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    SERVICES[0].id
  );
  const [selectedBarberId, setSelectedBarberId] = useState<string>(
    BARBERS[0].id
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    BRANCHES[0].id
  );
  const [isChatOpen, setIsChatOpen] = useState(false);

  const copy = UI_COPY[language];

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChooseService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection('booking');
  };

  const handleChooseMaster = (barberId: string) => {
    setSelectedBarberId(barberId);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F4F4F5]">
      {/* Top Bar Contract: strictly 3 zones separated by gap-8 */}
      <header className="border-b border-white/10 bg-[#08080A]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-wider text-[#F4F4F5] whitespace-nowrap shrink-0"
          >
            KARA BARBERSHOP
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
            aria-label="Primary Navigation"
          >
            <a
              href="#services"
              className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              {copy.nav.services}
            </a>
            <a
              href="#masters"
              className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              {copy.nav.masters}
            </a>
            <a
              href="#location"
              className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              {copy.nav.location}
            </a>
            <a
              href="#booking"
              className="hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              {copy.nav.booking}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="h-10 rounded-lg bg-[#D4AF37] px-4 text-xs font-semibold text-[#08080A] transition-colors hover:bg-[#E5C158] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {copy.nav.bookCta}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Toolbar: Language Switcher (KY / RU / EN) & Unboxed Location Metadata */}
        <section className="mx-auto max-w-6xl px-6 pt-6 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <p className="text-xs font-medium text-[#A1A1AA]">
              {copy.hero.kicker}
            </p>

            {/* Multilingual Switcher: Kyrgyz · Russian · English */}
            <div
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#111114] p-1"
              role="group"
              aria-label="Language switcher"
            >
              {(
                [
                  { code: 'ky', label: 'Кыргызча' },
                  { code: 'ru', label: 'Русский' },
                  { code: 'en', label: 'English' },
                ] as const
              ).map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`h-8 rounded-md px-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    language === item.code
                      ? 'bg-[#D4AF37] text-[#08080A] font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-4">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#111114]">
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              <div className="relative z-10 flex flex-col justify-between p-8 md:p-12 lg:col-span-6">
                <div>
                  <h1
                    className="font-display font-semibold tracking-tight text-[#F4F4F5]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                      lineHeight: 1.08,
                      textWrap: 'balance',
                    }}
                  >
                    {copy.hero.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA]">
                    {copy.hero.subtitle}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection('booking')}
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#D4AF37] px-6 text-sm font-semibold text-[#08080A] transition-colors hover:bg-[#E5C158] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <span>{copy.hero.primaryCta}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-[#16161A] px-5 text-sm font-medium text-[#F4F4F5] transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <MessageSquare className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                    <span>{copy.hero.secondaryCta}</span>
                  </button>
                </div>
              </div>

              <div className="relative min-h-[280px] lg:col-span-6 lg:min-h-[460px]">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="KARA Barbershop luxury obsidian interior in Bishkek"
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080A]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#111114] lg:via-[#111114]/20 lg:to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* 4-column summary strip directly below hero split */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {copy.hero.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/10 bg-[#111114] px-5 py-4"
              >
                <p className="font-mono-tabular text-lg font-semibold text-[#F4F4F5]">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services & Pricing */}
        <section
          id="services"
          className="mx-auto max-w-6xl border-t border-white/10 px-6 py-16"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#D4AF37]">
                {copy.services.kicker}
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-[#F4F4F5] md:text-4xl">
                {copy.services.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#A1A1AA]">
                {copy.services.subtitle}
              </p>
            </div>

            {/* Functional Filter Controls */}
            <div
              className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#111114] p-1"
              role="tablist"
              aria-label={copy.services.title}
            >
              {(['all', 'haircut', 'beard', 'package'] as ServiceCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`h-9 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      activeCategory === cat
                        ? 'bg-[#D4AF37] text-[#08080A] font-semibold'
                        : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                    }`}
                  >
                    {copy.services.filters[cat]}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Editorial Visual Pair (4:3) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111114]">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={SERVICE_HAIRCUT_IMAGE}
                    alt="Precision haircut and skin fade craft"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111114]">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={SERVICE_SHAVE_IMAGE}
                    alt="Hot towel straight razor beard ritual"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Numbered Service List */}
            <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-[#111114] lg:col-span-7">
              {filteredServices.map((srv) => (
                <div
                  key={srv.id}
                  className="flex flex-col justify-between gap-4 p-6 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-tabular text-xs font-medium text-[#D4AF37]">
                        {srv.index}.
                      </span>
                      <h3 className="text-base font-semibold text-[#F4F4F5]">
                        {srv.name[language]}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">
                      {srv.description[language]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end shrink-0">
                    <div className="text-left sm:text-right">
                      <p className="font-mono-tabular text-base font-semibold text-[#F4F4F5]">
                        {srv.price.toLocaleString('ru-RU')}{' '}
                        {copy.services.currency}
                      </p>
                      <p className="font-mono-tabular text-xs text-[#71717A]">
                        {srv.durationMin} {copy.services.min}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleChooseService(srv.id)}
                      className="h-10 rounded-lg border border-white/15 bg-[#16161A] px-4 text-xs font-medium text-[#F4F4F5] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] whitespace-nowrap shrink-0"
                    >
                      {copy.services.bookItem}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Master Barbers */}
        <section
          id="masters"
          className="mx-auto max-w-6xl border-t border-white/10 px-6 py-16"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#D4AF37]">
              {copy.masters.kicker}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[#F4F4F5] md:text-4xl">
              {copy.masters.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
              {copy.masters.subtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {BARBERS.map((barber) => (
              <article
                key={barber.id}
                className="grid grid-cols-1 items-stretch overflow-hidden rounded-xl border border-white/10 bg-[#111114] sm:grid-cols-12"
              >
                <div className="aspect-[3/4] w-full overflow-hidden sm:col-span-5 sm:aspect-auto">
                  <ResilientImage
                    src={barber.image}
                    alt={barber.name[language]}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-6 sm:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                      <span>{barber.role[language]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular text-[#D4AF37]">
                        {barber.experienceYears} {copy.masters.yearsExp}
                      </span>
                    </div>

                    <h3 className="font-display mt-2 text-2xl font-semibold text-[#F4F4F5]">
                      {barber.name[language]}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#D4D4D8]">
                      {barber.specialty[language]}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                      {barber.bio[language]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleChooseMaster(barber.id)}
                    className="mt-6 h-10 w-full rounded-lg border border-white/15 bg-[#16161A] px-4 text-xs font-medium text-[#F4F4F5] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] whitespace-nowrap"
                  >
                    {copy.masters.selectMaster}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Online Booking & Google Maps Location Split */}
        <section
          id="booking"
          className="mx-auto max-w-6xl border-t border-white/10 px-6 py-16"
        >
          <div id="location" className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <BookingSection
                language={language}
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
                selectedBarberId={selectedBarberId}
                onSelectBarber={setSelectedBarberId}
                selectedBranchId={selectedBranchId}
                onSelectBranch={setSelectedBranchId}
              />
            </div>

            <div className="lg:col-span-6">
              <LocationMapSection
                language={language}
                selectedBranchId={selectedBranchId}
                onSelectBranch={setSelectedBranchId}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-white/10 bg-[#08080A] py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <span className="font-display text-lg font-bold tracking-wider text-[#F4F4F5]">
              KARA BARBERSHOP
            </span>
            <p className="mt-1 text-xs text-[#71717A]">{copy.footer.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#A1A1AA]">
            <a href="#services" className="hover:text-[#F4F4F5] transition-colors">
              {copy.nav.services}
            </a>
            <a href="#masters" className="hover:text-[#F4F4F5] transition-colors">
              {copy.nav.masters}
            </a>
            <a href="#location" className="hover:text-[#F4F4F5] transition-colors">
              {copy.nav.location}
            </a>
            <a href="#booking" className="hover:text-[#F4F4F5] transition-colors">
              {copy.nav.booking}
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#71717A]">
            {(['ky', 'ru', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 uppercase transition-colors ${
                  language === lang
                    ? 'font-semibold text-[#D4AF37]'
                    : 'hover:text-[#F4F4F5]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl border-t border-white/5 px-6 pt-6 text-xs text-[#52525B]">
          {copy.footer.rights}
        </div>
      </footer>

      <ChatbotDrawer
        language={language}
        onLanguageChange={setLanguage}
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
        onJumpToBooking={() => scrollToSection('booking')}
      />
    </div>
  );
}
