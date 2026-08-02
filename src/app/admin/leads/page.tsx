"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  preferredContact?: string;
  message?: string;
  consent: true;
  status: "new";
  createdAt: string;
  updatedAt: string;
};

type LeadResponse = {
  leads: Lead[];
  total: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const serviceLabels: Record<string, string> = {
  "companion-care": "Companion care",
  "personal-support": "Personal support",
  "recovery-at-home": "Recovery at home",
  "not-sure": "Needs guidance",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function initials(lead: Lead) {
  return `${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`.toUpperCase();
}

async function fetchLeads(signal?: AbortSignal) {
  const response = await fetch(`${API_URL}/api/leads/list`, {
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error(`Lead API returned ${response.status}`);
  return response.json() as Promise<LeadResponse>;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  useEffect(() => {
    const controller = new AbortController();
    void fetchLeads(controller.signal)
      .then((result) => {
        setLeads(result.leads);
        setSelectedId(result.leads[0]?.id ?? "");
      })
      .catch((cause) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(cause instanceof Error ? cause.message : "Unable to load leads");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    if (!deferredQuery) return true;
    return [
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.phoneNumber,
      serviceLabels[lead.serviceType] ?? lead.serviceType,
    ].some((value) => value.toLowerCase().includes(deferredQuery));
  });
  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedId) ?? filteredLeads[0];
  const today = new Date().toDateString();
  const receivedToday = leads.filter(
    (lead) => new Date(lead.createdAt).toDateString() === today,
  ).length;

  async function refresh() {
    setRefreshing(true);
    setError("");
    try {
      const result = await fetchLeads();
      setLeads(result.leads);
      if (!result.leads.some((lead) => lead.id === selectedId)) {
        setSelectedId(result.leads[0]?.id ?? "");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to refresh leads");
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#edf1ef] text-[#162b27] [font-family:Arial,Helvetica,sans-serif]">
      <div className="grid min-h-screen grid-cols-[236px_minmax(0,1fr)] max-[820px]:grid-cols-1">
        <aside className="flex flex-col bg-[#112720] px-5 py-6 text-[#eff7f3] max-[820px]:flex-row max-[820px]:items-center max-[820px]:justify-between max-[820px]:py-4">
          <div>
            <Link className="flex items-center gap-3 no-underline" href="/">
              <span className="grid size-9 place-items-center rounded-[45%_55%_48%_52%] bg-[#d4f467] font-bold text-[#173b34]">H</span>
              <span className="font-[Georgia,'Times_New_Roman',serif] text-[1.05rem] font-bold">Harborlight</span>
            </Link>
            <p className="mt-2 text-[0.68rem] font-bold tracking-[0.12em] text-[#8ba69d] uppercase max-[820px]:hidden">Care operations</p>
          </div>
          <nav className="mt-12 grid gap-2 max-[820px]:mt-0" aria-label="Lead workspace">
            <span className="rounded-lg bg-white/10 px-3 py-2.5 text-[0.82rem] font-bold text-white">Lead queue</span>
          </nav>
          <div className="mt-auto rounded-xl border border-white/10 bg-black/10 p-3 max-[820px]:hidden">
            <strong className="text-[0.72rem] tracking-[0.08em] text-[#d4f467] uppercase">Demo workspace</strong>
            <p className="mt-1 text-[0.72rem] leading-5 text-[#a9bbb5]">Fictional records for technical assessment use only.</p>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="flex min-h-[76px] items-center justify-between gap-4 border-b border-[#d5ddda] bg-white px-8 max-[640px]:items-start max-[640px]:flex-col max-[640px]:px-4 max-[640px]:py-4">
            <div>
              <p className="text-[0.68rem] font-bold tracking-[0.1em] text-[#71827c] uppercase">Consultation pipeline</p>
              <h1 className="font-[Georgia,'Times_New_Roman',serif] text-2xl font-semibold tracking-[-0.02em]">Lead workspace</h1>
            </div>
            <Link className="min-h-10 rounded-lg border border-[#b8c5c0] px-3.5 py-2 text-[0.78rem] font-bold no-underline hover:bg-[#f3f6f4]" href="/">View public website</Link>
          </header>

          <div className="mx-auto max-w-[1480px] p-8 max-[640px]:p-4">
            <section className="mb-6 grid grid-cols-3 gap-4 max-[640px]:grid-cols-1" aria-label="Lead summary">
              <div className="rounded-xl border border-[#d5ddda] bg-white p-5">
                <span className="text-[0.7rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Total leads</span>
                <strong className="mt-2 block font-[Georgia,'Times_New_Roman',serif] text-3xl">{leads.length}</strong>
              </div>
              <div className="rounded-xl border border-[#d5ddda] bg-white p-5">
                <span className="text-[0.7rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Received today</span>
                <strong className="mt-2 block font-[Georgia,'Times_New_Roman',serif] text-3xl">{receivedToday}</strong>
              </div>
              <div className="rounded-xl border border-[#d5ddda] bg-white p-5">
                <span className="text-[0.7rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Current stage</span>
                <strong className="mt-2 block text-lg">New inquiries</strong>
              </div>
            </section>

            {error ? (
              <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-[#d8a59c] bg-[#fff0ed] p-4 text-sm text-[#782a1d]" role="alert">
                <span>Unable to load the lead queue: {error}</span>
                <button className="min-h-10 font-bold underline underline-offset-4" type="button" onClick={() => void refresh()}>Try again</button>
              </div>
            ) : null}

            <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] items-start gap-5 max-[1100px]:grid-cols-1">
              <section className="min-w-0 overflow-hidden rounded-xl border border-[#d5ddda] bg-white" aria-labelledby="lead-queue-heading">
                <div className="flex items-center justify-between gap-4 border-b border-[#e0e6e3] p-4 max-[560px]:items-stretch max-[560px]:flex-col">
                  <div>
                    <h2 className="font-[Georgia,'Times_New_Roman',serif] text-xl" id="lead-queue-heading">Incoming leads</h2>
                    <p className="text-xs text-[#71827c]">Newest inquiries appear first</p>
                  </div>
                  <div className="flex gap-2">
                    <label className="sr-only" htmlFor="lead-search">Search leads</label>
                    <input
                      className="min-h-10 min-w-0 rounded-lg border border-[#b8c5c0] px-3 text-sm focus:border-[#173b34]"
                      id="lead-search"
                      type="search"
                      placeholder="Search leads"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <button className="min-h-10 rounded-lg border border-[#b8c5c0] px-3 text-xs font-bold hover:bg-[#f3f6f4] disabled:opacity-50" type="button" disabled={refreshing} onClick={() => void refresh()}>
                      {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-[minmax(180px,1.2fr)_minmax(130px,0.8fr)_120px_100px] gap-3 border-b border-[#e0e6e3] bg-[#f7f9f8] px-4 py-2 text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase max-[700px]:hidden" aria-hidden="true">
                  <span>Lead</span><span>Service</span><span>Received</span><span>Status</span>
                </div>

                {loading ? <p className="p-8 text-center text-sm text-[#71827c]" role="status">Loading lead queue...</p> : null}
                {!loading && filteredLeads.length === 0 ? (
                  <div className="p-10 text-center">
                    <h3 className="font-[Georgia,'Times_New_Roman',serif] text-xl">No leads found</h3>
                    <p className="mt-1 text-sm text-[#71827c]">{query ? "Try a different search." : "New consultation requests will appear here."}</p>
                  </div>
                ) : null}
                <div className="divide-y divide-[#e0e6e3]">
                  {filteredLeads.map((lead) => (
                    <button
                      className="grid w-full grid-cols-[minmax(180px,1.2fr)_minmax(130px,0.8fr)_120px_100px] items-center gap-3 px-4 py-3 text-left hover:bg-[#f6f8f7] focus-visible:relative disabled:cursor-default max-[700px]:grid-cols-[auto_1fr_auto]"
                      type="button"
                      key={lead.id}
                      aria-pressed={selectedLead?.id === lead.id}
                      onClick={() => setSelectedId(lead.id)}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#dce8e2] text-xs font-extrabold text-[#315b4f]">{initials(lead)}</span>
                        <span className="min-w-0">
                          <strong className="block truncate text-sm">{lead.firstName} {lead.lastName}</strong>
                          <span className="block truncate text-xs text-[#71827c]">{lead.email}</span>
                        </span>
                      </span>
                      <span className="truncate text-xs max-[700px]:col-start-2">{serviceLabels[lead.serviceType] ?? lead.serviceType}</span>
                      <time className="text-xs text-[#71827c] max-[700px]:hidden" dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time>
                      <span className="w-fit rounded-full bg-[#e8f5ce] px-2 py-1 text-[0.66rem] font-extrabold text-[#3e5a14] uppercase">{lead.status}</span>
                    </button>
                  ))}
                </div>
              </section>

              <aside className="sticky top-5 rounded-xl border border-[#d5ddda] bg-white max-[1100px]:static" aria-label="Selected lead details">
                {selectedLead ? (
                  <>
                    <div className="border-b border-[#e0e6e3] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Lead details</p>
                          <h2 className="mt-1 font-[Georgia,'Times_New_Roman',serif] text-2xl">{selectedLead.firstName} {selectedLead.lastName}</h2>
                        </div>
                        <span className="rounded-full bg-[#e8f5ce] px-2.5 py-1 text-[0.66rem] font-extrabold text-[#3e5a14] uppercase">{selectedLead.status}</span>
                      </div>
                      <p className="mt-2 text-xs text-[#71827c]">Received {formatDate(selectedLead.createdAt)}</p>
                    </div>
                    <dl className="grid gap-4 p-5 text-sm">
                      <div><dt className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Service interest</dt><dd className="mt-1 font-bold">{serviceLabels[selectedLead.serviceType] ?? selectedLead.serviceType}</dd></div>
                      <div><dt className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Preferred contact</dt><dd className="mt-1 font-bold capitalize">{selectedLead.preferredContact ?? "Not captured"}</dd></div>
                      <div><dt className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Email</dt><dd className="mt-1 break-all"><a className="font-bold underline underline-offset-4" href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a></dd></div>
                      <div><dt className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Phone</dt><dd className="mt-1"><a className="font-bold underline underline-offset-4" href={`tel:${selectedLead.phoneNumber}`}>{selectedLead.phoneNumber}</a></dd></div>
                      <div><dt className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Inquiry notes</dt><dd className="mt-1 whitespace-pre-wrap leading-6 text-[#465b55]">{selectedLead.message || "No notes provided."}</dd></div>
                      <div className="border-t border-[#e0e6e3] pt-4"><dt className="text-[0.66rem] font-bold tracking-[0.08em] text-[#71827c] uppercase">Record ID</dt><dd className="mt-1 break-all font-mono text-[0.7rem] text-[#71827c]">{selectedLead.id}</dd></div>
                    </dl>
                  </>
                ) : (
                  <p className="p-8 text-center text-sm text-[#71827c]">Select a lead to review its details.</p>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
