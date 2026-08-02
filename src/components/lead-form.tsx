"use client";

import { FormEvent, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const serif = "[font-family:Georgia,'Times_New_Roman',serif]";
const field = "grid gap-[7px]";
const fieldLabel = "text-[0.88rem] font-extrabold";
const control =
  "min-h-[50px] w-full rounded-[10px] border border-[#9aa9a4] bg-white px-[14px] py-3 text-[#173b34] placeholder:text-[#6f817c] focus:border-[#173b34]";
const primaryButton =
  "inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center rounded-full border-0 bg-[#da6b4d] px-[22px] py-3 font-extrabold leading-[1.2] text-[#29160f] shadow-[0_9px_25px_rgba(134,59,39,0.19)] transition-[background-color,color,scale] duration-140 hover:bg-[#e47a5d] active:scale-96 disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none";

export function LeadForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "Unknown",
    };
  };

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get("fullName")?.toString() || "";

    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...splitFullName(fullName),
          email: formData.get("email"),
          phoneNumber: formData.get("phone"),
          serviceType: formData.get("service"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmissionState("error");
        throw new Error(data.error || "Submission failed");
      }

      setSubmissionState("success");
      form.reset();
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form
      className="grid gap-[22px] rounded-[26px] bg-[#fffdf8] p-[clamp(28px,5vw,52px)] shadow-[0_24px_70px_rgba(31,57,48,0.13)] max-[430px]:px-[22px]"
      onSubmit={submitLead}
    >
      <div className="mb-2 flex flex-col">
        <span className="text-[0.76rem] font-extrabold tracking-[0.1em] text-[#b94f35] uppercase">
          Care consultation
        </span>
        <strong className={`text-[1.6rem] font-medium ${serif}`}>
          No obligation. Just a helpful first conversation.
        </strong>
      </div>

      <div className={field}>
        <label className={fieldLabel} htmlFor="fullName">
          Full name
        </label>
        <input
          className={control}
          id="fullName"
          name="fullName"
          autoComplete="name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-[18px] max-[700px]:min-w-[560px]">
        <div className={field}>
          <label className={fieldLabel} htmlFor="email">
            Email
          </label>
          <input
            className={control}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className={field}>
          <label className={fieldLabel} htmlFor="phone">
            Phone
          </label>
          <input
            className={control}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 010-0184"
            required
          />
        </div>
      </div>

      <div className={field}>
        <label className={fieldLabel} htmlFor="service">
          What kind of support are you exploring?
        </label>
        <select
          className={control}
          id="service"
          name="service"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="companion-care">Companion care</option>
          <option value="personal-support">Personal support</option>
          <option value="recovery-at-home">Recovery at home</option>
          <option value="not-sure">I&apos;m not sure yet</option>
        </select>
      </div>

      <div className={field}>
        <label className={fieldLabel} htmlFor="message">
          What would make daily life easier?
        </label>
        <textarea
          className={`${control} min-h-28 resize-y`}
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about schedules, routines, or support you are considering."
        />
      </div>

      <label className="grid cursor-pointer grid-cols-[22px_1fr] items-start gap-[10px] text-[0.88rem] leading-[1.4] font-extrabold">
        <input
          className="mt-px size-5 accent-[#173b34]"
          name="consent"
          type="checkbox"
          required
        />
        <span>
          I agree that Harborlight Care may contact me about this inquiry.
        </span>
      </label>

      <button
        className={primaryButton}
        type="submit"
        disabled={submissionState === "sending"}
      >
        {submissionState === "sending"
          ? "Sending request..."
          : "Request a consultation"}
      </button>

      <div
        className="min-h-[26px] text-center text-[0.9rem] font-bold text-[#45655f]"
        role="status"
        aria-live="polite"
      >
        {submissionState === "success"
          ? "Thank you. A care coordinator will contact you within one business day."
          : null}
        {submissionState === "error"
          ? "Unable to send your request. Check your connection and try again."
          : null}
      </div>
    </form>
  );
}
