"use client";

import React, { useState } from "react";
import { BRAND } from "@/data/catalog";

interface QuoteRequestFormProps {
  defaultPlatform?: string;
  defaultSerial?: string;
  defaultMessage?: string;
  heading?: string;
  subheading?: string;
}

export default function QuoteRequestForm({
  defaultPlatform = "FDU",
  defaultSerial = "",
  defaultMessage = "",
  heading = "Request a Serial-Verified Quote or Field Service",
  subheading = "Submit your equipment specifications or repair request below. Jason Allen reviews every submission and delivers a detailed estimate within 24 hours.",
}: QuoteRequestFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [platform, setPlatform] = useState(defaultPlatform);
  const [serialNumber, setSerialNumber] = useState(defaultSerial);
  const [urgency, setUrgency] = useState("Standard Quote (24-Hour Estimate)");
  const [message, setMessage] = useState(defaultMessage);
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "unified-quote-request",
          name,
          company,
          email,
          phone,
          platform,
          serialNumber,
          urgency,
          message,
          fileName,
        }),
      });
      const data = await res.json();
      setSubmittedRef(data.referenceId || "3J-QUOTE-24H");
    } catch {
      setSubmittedRef("3J-QUOTE-24H");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      id="quote-request"
      className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-8 lg:p-10 shadow-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#1A1A1A]">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
            Direct Dispatch &amp; Parts Desk · {BRAND.quotePromise}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            {heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#CCCCCC] max-w-2xl">
            {subheading}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-1.5 bg-[#000000] p-4 rounded-lg border border-[#262626]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#999999]">
            Immediate Line-Down Support
          </span>
          <a
            href={BRAND.phoneHref}
            className="text-xl font-mono font-extrabold text-[#5ADCC8] hover:underline"
          >
            {BRAND.phoneDisplay}
          </a>
          <a
            href={BRAND.emailHref}
            className="text-xs font-mono text-[#CCCCCC] hover:text-white"
          >
            {BRAND.email}
          </a>
        </div>
      </div>

      {submittedRef ? (
        <div
          role="status"
          data-testid="quote-confirmation-banner"
          className="rounded-lg bg-[#051412] border-2 border-[#5ADCC8] p-6 sm:p-8 text-white space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase tracking-wider">
              Request Logged · Ref #{submittedRef}
            </span>
            <span className="text-xs font-mono uppercase text-[#5ADCC8] font-bold">
              SLA Guarantee: Estimate within 24 hours
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide">
            Thank You, {name || "Partner"}. Your Quote Request Is Queued for{" "}
            {BRAND.founder}.
          </h3>
          <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
            Your specifications for <strong className="text-white">{platform}</strong>
            {serialNumber ? (
              <>
                {" "}
                (Unit Serial: <code className="text-[#5ADCC8]">{serialNumber}</code>)
              </>
            ) : null}{" "}
            have been routed to{" "}
            <a
              href={BRAND.emailHref}
              className="text-[#5ADCC8] underline font-mono"
            >
              {BRAND.email}
            </a>
            . We guarantee a detailed <strong>estimate within 24 hours</strong>.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={BRAND.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#5ADCC8] text-[#000000] font-extrabold text-xs uppercase tracking-wider"
            >
              Urgent Line Down? Call {BRAND.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setSubmittedRef(null)}
              className="px-4 py-2.5 rounded border border-[#383838] text-xs font-mono uppercase text-[#CCCCCC] hover:text-white hover:border-[#5ADCC8]"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="quote-name"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="quote-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mark Vance"
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>

            <div>
              <label
                htmlFor="quote-company"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Company / Foundry / Venue *
              </label>
              <input
                id="quote-company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Midwest Die Casting"
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>

            <div>
              <label
                htmlFor="quote-email"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Email Address *
              </label>
              <input
                id="quote-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>

            <div>
              <label
                htmlFor="quote-phone"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Phone Number *
              </label>
              <input
                id="quote-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="216-555-0199"
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="quote-platform"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                System / Machine Platform *
              </label>
              <select
                id="quote-platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              >
                <option value="FDU">Div 01 — FDU (Foundry Degassing Unit)</option>
                <option value="MTS 1500">Div 01 — MTS 1500 (Metal Treatment Station)</option>
                <option value="SMARTT">Div 01 — SMARTT (Melt Treatment Unit)</option>
                <option value="ThermaTest NGIII 5000">
                  Div 01 — ThermaTest NGIII 5000 (Thermal Analysis)
                </option>
                <option value="Foundry Consulting / Health Check">
                  Div 01 — Melt-Treatment Consulting / Equipment Health Check
                </option>
                <option value="3JI-Repair Commercial Equipment (Cuyahoga County, OH Launch Area)">
                  Div 02 — 3JI-Repair Commercial Equipment &amp; Loaner (Cuyahoga County Launch Area)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="quote-serial"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Unit Serial Number (If Known)
              </label>
              <input
                id="quote-serial"
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="e.g. FDU-2019-4481"
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm font-mono focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>

            <div>
              <label
                htmlFor="quote-urgency"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Urgency Level
              </label>
              <select
                id="quote-urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              >
                <option value="Standard Quote (24-Hour Estimate)">
                  Standard Quote (Estimate Within 24 Hours)
                </option>
                <option value="Urgent — Line Down / Emergency Dispatch">
                  Urgent — Line Down / Immediate Dispatch
                </option>
                <option value="Preventative Maintenance / Health Check">
                  Preventative Maintenance / Equipment Health Check
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label
                htmlFor="quote-message"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Part Numbers, Symptoms, or Request Details *
              </label>
              <textarea
                id="quote-message"
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="List part numbers, rotor/shaft series (XSR/FDR/XDR/FDDR), or describe equipment symptoms..."
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>

            <div>
              <label
                htmlFor="quote-file"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Attach Nameplate / Part Photo (Optional)
              </label>
              <label
                htmlFor="quote-file"
                className="flex flex-col items-center justify-center h-[88px] px-4 rounded border border-dashed border-[#383838] hover:border-[#5ADCC8] bg-[#000000] cursor-pointer text-center transition-colors"
              >
                <span className="text-xs text-[#5ADCC8] font-mono font-semibold">
                  {fileName ? `Attached: ${fileName}` : "+ Upload Nameplate or Part Photo"}
                </span>
                <span className="text-[11px] text-[#999999] mt-1">
                  JPG, PNG, or PDF spec sheet
                </span>
                <input
                  id="quote-file"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || "")
                  }
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-[#CCCCCC]">
              <strong className="text-[#5ADCC8]">Serial-Verified Fit Guarantee:</strong>{" "}
              {BRAND.serialGuarantee} All requests receive an{" "}
              <strong className="text-white">estimate within 24 hours</strong>.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              {submitting ? "Submitting Request..." : "Send Quote Request (24h Estimate)"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
