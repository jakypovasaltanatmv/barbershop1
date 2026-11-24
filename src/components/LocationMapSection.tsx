import React, { useState } from 'react';
import { ExternalLink, MapPin, Phone, Clock } from 'lucide-react';
import { BRANCHES, Language, UI_COPY } from '../data/barbershop';

interface LocationMapSectionProps {
  language: Language;
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  language,
  selectedBranchId,
  onSelectBranch,
}) => {
  const copy = UI_COPY[language].map;
  const activeBranch =
    BRANCHES.find((b) => b.id === selectedBranchId) ?? BRANCHES[0];
  const [mapFailed, setMapFailed] = useState(false);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#111114] p-6 md:p-8">
      <div>
        <p className="text-xs font-medium tracking-wider text-[#D4AF37]">
          {copy.kicker}
        </p>
        <h3 className="font-display mt-2 text-2xl font-semibold text-[#F4F4F5] md:text-3xl">
          {copy.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
          {copy.subtitle}
        </p>

        {/* Branch Selector Tabs */}
        <div
          className="mt-6 grid grid-cols-1 gap-2 rounded-lg border border-white/10 bg-[#0A0A0D] p-1 sm:grid-cols-2"
          role="tablist"
          aria-label={copy.addressLabel}
        >
          {BRANCHES.map((branch) => {
            const isSelected = branch.id === activeBranch.id;
            return (
              <button
                key={branch.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectBranch(branch.id);
                  setMapFailed(false);
                }}
                className={`rounded-md px-3 py-2 text-left text-xs font-medium transition-colors whitespace-nowrap truncate ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#08080A] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                }`}
              >
                {branch.name[language]}
              </button>
            );
          })}
        </div>

        {/* Embedded Google Map with Dark Theme Filter */}
        <div className="relative mt-5 h-[280px] w-full overflow-hidden rounded-lg border border-white/10 bg-[#08080A]">
          {!mapFailed ? (
            <iframe
              key={activeBranch.id}
              title={activeBranch.name[language]}
              src={activeBranch.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onError={() => setMapFailed(true)}
              className="dark-map-iframe h-full w-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#0C0C0F] p-6 text-center">
              <MapPin className="h-7 w-7 text-[#D4AF37]" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-[#F4F4F5]">
                {activeBranch.address[language]}
              </p>
              <p className="font-mono-tabular mt-1 text-xs text-[#71717A]">
                {activeBranch.lat.toFixed(4)}, {activeBranch.lng.toFixed(4)}
              </p>
            </div>
          )}
        </div>

        {/* Branch Metadata */}
        <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-[#71717A]">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{copy.addressLabel}</span>
            </dt>
            <dd className="mt-1 text-sm font-medium text-[#F4F4F5]">
              {activeBranch.address[language]}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-[#71717A]">
              <Clock className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{copy.hoursLabel}</span>
            </dt>
            <dd className="font-mono-tabular mt-1 text-sm font-medium text-[#F4F4F5]">
              {activeBranch.hours[language]}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-[#71717A]">
              <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{copy.phoneLabel}</span>
            </dt>
            <dd className="font-mono-tabular mt-1 text-sm font-medium text-[#F4F4F5]">
              <a
                href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}
                className="hover:text-[#D4AF37] transition-colors"
              >
                {activeBranch.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#71717A]">{copy.coordinates}</dt>
            <dd className="font-mono-tabular mt-1 text-sm text-[#A1A1AA]">
              {activeBranch.lat.toFixed(4)}° N, {activeBranch.lng.toFixed(4)}° E
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <p className="text-xs text-[#71717A]">{copy.directionsNote}</p>
        <a
          href={activeBranch.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 text-xs font-semibold text-[#E5C158] transition-colors hover:bg-[#D4AF37] hover:text-[#08080A] whitespace-nowrap shrink-0"
        >
          <span>{copy.openInMaps}</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
