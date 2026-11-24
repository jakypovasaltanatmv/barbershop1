import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import {
  BARBERS,
  BRANCHES,
  Language,
  SERVICES,
  TIME_SLOTS,
  UI_COPY,
} from '../data/barbershop';

interface BookingSectionProps {
  language: Language;
  selectedServiceId: string;
  onSelectService: (id: string) => void;
  selectedBarberId: string;
  onSelectBarber: (id: string) => void;
  selectedBranchId: string;
  onSelectBranch: (id: string) => void;
}

interface ConfirmedBooking {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  barberId: string;
  branchId: string;
  date: string;
  time: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  language,
  selectedServiceId,
  onSelectService,
  selectedBarberId,
  onSelectBarber,
  selectedBranchId,
  onSelectBranch,
}) => {
  const copy = UI_COPY[language].booking;
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>(TIME_SLOTS[4]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (name.trim().length < 2 || phone.trim().length < 6) {
      setErrorMsg(copy.errorRequired);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          serviceId: selectedServiceId,
          barberId: selectedBarberId,
          branchId: selectedBranchId,
          date,
          time,
        }),
      });
      const data = (await res.json()) as {
        booking?: ConfirmedBooking;
        error?: string;
      };
      if (!res.ok || !data.booking) {
        throw new Error(data.error || 'Booking failed');
      }
      setConfirmed(data.booking);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : copy.errorRequired);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmed) {
    const bookedService = SERVICES.find((s) => s.id === confirmed.serviceId);
    const bookedBarber = BARBERS.find((b) => b.id === confirmed.barberId);
    const bookedBranch = BRANCHES.find((b) => b.id === confirmed.branchId);

    return (
      <div className="flex h-full flex-col justify-between rounded-xl border border-[#D4AF37]/30 bg-[#111114] p-6 md:p-8">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Check className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="font-display mt-5 text-2xl font-semibold text-[#F4F4F5] md:text-3xl">
            {copy.successTitle}
          </h3>
          <p className="mt-2 text-sm text-[#A1A1AA]">{copy.successDesc}</p>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#71717A]">{copy.bookingCode}</dt>
              <dd className="font-mono-tabular font-semibold text-[#D4AF37]">
                {confirmed.id}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#71717A]">{copy.branchLabel}</dt>
              <dd className="text-right text-[#F4F4F5]">
                {bookedBranch?.address[language]}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#71717A]">{copy.serviceLabel}</dt>
              <dd className="text-right text-[#F4F4F5]">
                {bookedService?.name[language]}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#71717A]">{copy.masterLabel}</dt>
              <dd className="text-right text-[#F4F4F5]">
                {bookedBarber?.name[language]}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#71717A]">
                {copy.dateLabel} · {copy.timeLabel}
              </dt>
              <dd className="font-mono-tabular text-right text-[#F4F4F5]">
                {confirmed.date} · {confirmed.time}
              </dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={() => {
            setConfirmed(null);
            setName('');
            setPhone('');
          }}
          className="mt-8 h-11 w-full rounded-lg border border-white/15 bg-[#16161A] px-5 text-sm font-medium text-[#F4F4F5] transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
        >
          {copy.newBooking}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#111114] p-6 md:p-8"
      noValidate
    >
      <div>
        <p className="text-xs font-medium tracking-wider text-[#D4AF37]">
          {copy.kicker}
        </p>
        <h3 className="font-display mt-2 text-2xl font-semibold text-[#F4F4F5] md:text-3xl">
          {copy.title}
        </h3>
        <p className="mt-2 text-sm text-[#A1A1AA]">{copy.subtitle}</p>

        <div className="mt-6 space-y-4">
          {/* Branch & Service */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-branch"
                className="block text-xs font-medium text-[#A1A1AA]"
              >
                {copy.branchLabel}
              </label>
              <select
                id="booking-branch"
                value={selectedBranchId}
                onChange={(e) => onSelectBranch(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#08080A] px-3 text-sm text-[#F4F4F5] focus:border-[#D4AF37] focus:outline-none"
              >
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="booking-master"
                className="block text-xs font-medium text-[#A1A1AA]"
              >
                {copy.masterLabel}
              </label>
              <select
                id="booking-master"
                value={selectedBarberId}
                onChange={(e) => onSelectBarber(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#08080A] px-3 text-sm text-[#F4F4F5] focus:border-[#D4AF37] focus:outline-none"
              >
                {BARBERS.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="booking-service"
              className="block text-xs font-medium text-[#A1A1AA]"
            >
              {copy.serviceLabel}
            </label>
            <select
              id="booking-service"
              value={selectedServiceId}
              onChange={(e) => onSelectService(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#08080A] px-3 text-sm text-[#F4F4F5] focus:border-[#D4AF37] focus:outline-none"
            >
              {SERVICES.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.index}. {srv.name[language]} — {srv.price}{' '}
                  {UI_COPY[language].services.currency}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Slots */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-date"
                className="block text-xs font-medium text-[#A1A1AA]"
              >
                {copy.dateLabel}
              </label>
              <input
                id="booking-date"
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="font-mono-tabular mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#08080A] px-3 text-sm text-[#F4F4F5] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-xs font-medium text-[#A1A1AA]">
                {copy.timeLabel}
              </span>
              <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`font-mono-tabular h-10 rounded-md border text-xs transition-colors ${
                      time === slot
                        ? 'border-[#D4AF37] bg-[#D4AF37] font-semibold text-[#08080A]'
                        : 'border-white/10 bg-[#08080A] text-[#D4D4D8] hover:border-white/25'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-name"
                className="block text-xs font-medium text-[#A1A1AA]"
              >
                {copy.nameLabel}
              </label>
              <input
                id="booking-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.namePlaceholder}
                className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#08080A] px-3 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="booking-phone"
                className="block text-xs font-medium text-[#A1A1AA]"
              >
                {copy.phoneLabel}
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={copy.phonePlaceholder}
                className="font-mono-tabular mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#08080A] px-3 text-sm text-[#F4F4F5] placeholder-[#52525B] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2.5 text-xs text-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-11 w-full rounded-lg bg-[#D4AF37] px-6 text-sm font-semibold text-[#08080A] transition-colors hover:bg-[#E5C158] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        {isSubmitting ? copy.submitting : copy.submitBtn}
      </button>
    </form>
  );
};
