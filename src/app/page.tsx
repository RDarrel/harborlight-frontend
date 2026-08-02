import { LeadForm } from "@/components/lead-form";

const services = [
  {
    number: "01",
    title: "Companion care",
    description: "Conversation, meal preparation, errands, and a reassuring presence throughout the day.",
  },
  {
    number: "02",
    title: "Personal support",
    description: "Respectful help with routines, mobility, and the everyday tasks that support independence.",
  },
  {
    number: "03",
    title: "Recovery at home",
    description: "Practical non-medical support while settling in after a hospital stay or procedure.",
  },
];

const shell = "mx-auto w-[min(1180px,calc(100%_-_48px))] max-[700px]:w-[min(580px,calc(100%_-_32px))]";
const serif = "[font-family:Georgia,'Times_New_Roman',serif]";
const heading = `${serif} font-medium leading-[1.02] tracking-[-0.035em]`;
const eyebrow = "mb-4 text-[0.76rem] font-extrabold tracking-[0.13em] text-[#b94f35] uppercase";
const brand = `inline-flex items-center gap-3 text-[1.2rem] font-bold text-[#173b34] no-underline ${serif}`;
const brandMark = `grid size-[38px] place-items-center rounded-[50%_50%_42%_58%] bg-[#173b34] text-base text-[#fffdf8] ${serif}`;
const primaryButton = "inline-flex min-h-[52px] items-center justify-center rounded-full border-0 bg-[#da6b4d] px-[22px] py-3 font-extrabold leading-[1.2] text-[#29160f] no-underline shadow-[0_9px_25px_rgba(134,59,39,0.19)] transition-[background-color,color,scale] duration-140 hover:bg-[#e47a5d] active:scale-96 motion-reduce:transition-none";

export default function Home() {
  return (
    <main>
      <header className={`${shell} flex min-h-[88px] items-center justify-between gap-8 max-[700px]:min-h-[76px]`}>
        <a className={brand} href="#top" aria-label="Harborlight Care home">
          <span className={brandMark} aria-hidden="true">H</span>
          <span className="max-[430px]:max-w-[100px] max-[430px]:leading-[1.05]">Harborlight Care</span>
        </a>
        <nav className="flex items-center gap-[30px]" aria-label="Primary navigation">
          <a className="text-[0.92rem] font-bold no-underline hover:underline hover:underline-offset-[5px] max-[700px]:hidden" href="#services">Services</a>
          <a className="text-[0.92rem] font-bold no-underline hover:underline hover:underline-offset-[5px] max-[700px]:hidden" href="#approach">Our approach</a>
          <a className="min-h-11 rounded-full border border-[#173b34] px-[18px] py-[9px] text-[0.92rem] font-bold no-underline max-[700px]:px-[14px] max-[700px]:text-[0.82rem]" href="#consultation">Request a call</a>
        </nav>
      </header>

      <section className={`${shell} grid min-h-[680px] grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] items-center gap-[clamp(48px,7vw,100px)] pt-[72px] pb-24 max-[900px]:grid-cols-1 max-[900px]:pt-[54px] max-[700px]:min-h-0 max-[700px]:pt-[52px] max-[700px]:pb-[74px]`} id="top">
        <div className="max-[900px]:max-w-[760px]">
          <p className={eyebrow}>In-home support across the Bay Area</p>
          <h1 className={`${heading} mb-7 max-w-[720px] text-[clamp(3.4rem,6vw,6.3rem)] max-[700px]:text-[clamp(3rem,15vw,4.5rem)]`}>Care that keeps home feeling like home.</h1>
          <p className="mb-[34px] max-w-[640px] text-[clamp(1.05rem,1.8vw,1.3rem)] text-[#45655f]">
            Consistent, thoughtful support for older adults and the people who love them, shaped around real routines and changing needs.
          </p>
          <div className="flex flex-wrap items-center gap-[22px] max-[430px]:items-stretch max-[430px]:flex-col">
            <a className={`${primaryButton} max-[430px]:w-full max-[430px]:text-center`} href="#consultation">Request a care consultation</a>
            <a className="min-h-11 py-[9px] font-extrabold underline decoration-1 underline-offset-[5px] max-[430px]:w-full max-[430px]:text-center" href="tel:+15550100184">Call (555) 010-0184</a>
          </div>
        </div>

        <div
          className="relative isolate min-h-[520px] overflow-hidden rounded-[46%_46%_18px_18px] bg-[#c8d5bd] shadow-[0_24px_70px_rgba(31,57,48,0.13)] before:absolute before:z-[-1] before:rounded-[50%_50%_0_0] before:bg-[#87a17d] before:content-[''] before:[inset:20%_-20%_-27%_27%] before:rotate-[-8deg] after:absolute after:bottom-[-72px] after:left-[-42px] after:z-[-1] after:h-[360px] after:w-[280px] after:rounded-[50%_50%_8px_8px] after:bg-[#e7b49e] after:content-[''] after:rotate-[19deg] max-[900px]:w-[min(620px,100%)] max-[700px]:min-h-[430px] max-[700px]:rounded-[44%_44%_16px_16px] max-[430px]:min-h-[390px]"
          aria-label="A calm home-care planning moment"
        >
          <div className="absolute top-[62px] right-[58px] size-[104px] rounded-full bg-[#f2ca7d] max-[700px]:top-[42px] max-[700px]:right-8" aria-hidden="true" />
          <div className="absolute top-[142px] right-[42px] left-12 max-w-[300px] text-[#102f29] max-[700px]:top-[116px] max-[700px]:right-7 max-[700px]:left-[30px]">
            <p className={`mb-[14px] text-[clamp(2rem,3.2vw,3rem)] leading-[1.04] ${serif}`}>Care starts with listening.</p>
            <span className="block max-w-[260px] font-bold">A local coordinator will learn what matters to your family.</span>
          </div>
          {/* TODO: FIX ME - temporary campaign height clips the availability copy. */}
          <div className="absolute right-[22px] bottom-6 flex max-h-[72px] w-[min(245px,calc(100%_-_44px))] flex-col overflow-hidden rounded-[18px] bg-[#fffdf8] px-6 py-[22px] shadow-[0_14px_45px_rgba(25,60,52,0.2)] max-[430px]:right-[18px] max-[430px]:left-[18px] max-[430px]:w-auto">
            <span className="text-[0.8rem] font-bold text-[#45655f] uppercase">Coordinator availability</span>
            <strong className={`text-2xl ${serif}`}>7 days a week</strong>
          </div>
        </div>
      </section>

      <section className="bg-[#173b34] text-[#fffdf8]" aria-label="Agency highlights">
        <div className={`${shell} grid grid-cols-3 gap-10 py-[30px] max-[700px]:grid-cols-1 max-[700px]:gap-5 max-[700px]:py-[26px]`}>
          <p className="flex flex-col max-[700px]:border-b max-[700px]:border-white/17 max-[700px]:pb-[18px]"><strong className={`text-[1.05rem] ${serif}`}>Local care teams</strong><span className="text-[0.85rem] text-[#c8d7d3]">People who know your community</span></p>
          <p className="flex flex-col max-[700px]:border-b max-[700px]:border-white/17 max-[700px]:pb-[18px]"><strong className={`text-[1.05rem] ${serif}`}>Thoughtful matching</strong><span className="text-[0.85rem] text-[#c8d7d3]">Support shaped around the person</span></p>
          <p className="flex flex-col"><strong className={`text-[1.05rem] ${serif}`}>Flexible plans</strong><span className="text-[0.85rem] text-[#c8d7d3]">From a few hours to daily care</span></p>
        </div>
      </section>

      <section className={`${shell} py-[130px] max-[700px]:py-[88px]`} id="services">
        <div className="mb-16 grid grid-cols-[1.35fr_0.65fr] items-end gap-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-6">
          <p className={`${eyebrow} col-span-full mb-[-38px] max-[900px]:mb-[-4px]`}>How we can help</p>
          <h2 className={`${heading} text-[clamp(2.5rem,4.4vw,4.6rem)]`}>Practical support, centered on the person.</h2>
          <p className="text-[1.05rem] text-[#45655f] max-[900px]:max-w-[600px]">We begin with what a good day looks like, then build the right level of help around it.</p>
        </div>
        <div className="grid grid-cols-3 gap-5 max-[700px]:grid-cols-1">
          {services.map((service) => (
            <article className="min-h-[310px] rounded-[20px] bg-[#fffdf8] p-[34px] shadow-[0_1px_0_rgba(23,59,52,0.18)] max-[700px]:min-h-0" key={service.number}>
              <span className="mb-[74px] inline-block text-[0.78rem] font-extrabold text-[#b94f35] max-[700px]:mb-10">{service.number}</span>
              <h3 className={`mb-3 text-[1.6rem] leading-[1.25] ${serif}`}>{service.title}</h3>
              <p className="text-[#45655f]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#ece5d7] py-[130px] max-[700px]:py-[88px]" id="approach">
        <div className={`${shell} grid grid-cols-[0.85fr_1.15fr] gap-[clamp(60px,10vw,140px)] max-[900px]:grid-cols-1`}>
          <div>
            <p className={eyebrow}>A steadier way forward</p>
            <h2 className={`${heading} text-[clamp(2.6rem,4.5vw,4.8rem)]`}>One conversation. A plan that can grow with you.</h2>
          </div>
          <ol className="m-0 grid list-none p-0">
            <li className="grid grid-cols-[44px_1fr] gap-6 border-b border-[rgba(23,59,52,0.18)] pt-0 pb-[26px]"><span className="grid size-10 place-items-center rounded-full bg-[#173b34] font-extrabold text-[#fffdf8]">1</span><div><h3 className={`mb-[7px] text-[1.45rem] leading-[1.25] ${serif}`}>Tell us what is changing</h3><p className="text-[#45655f]">Share your priorities, schedule, and the kind of support that would help most.</p></div></li>
            <li className="grid grid-cols-[44px_1fr] gap-6 border-b border-[rgba(23,59,52,0.18)] py-[26px]"><span className="grid size-10 place-items-center rounded-full bg-[#173b34] font-extrabold text-[#fffdf8]">2</span><div><h3 className={`mb-[7px] text-[1.45rem] leading-[1.25] ${serif}`}>Meet your care coordinator</h3><p className="text-[#45655f]">We shape a practical plan and introduce a caregiver selected for the fit.</p></div></li>
            <li className="grid grid-cols-[44px_1fr] gap-6 border-b border-[rgba(23,59,52,0.18)] py-[26px]"><span className="grid size-10 place-items-center rounded-full bg-[#173b34] font-extrabold text-[#fffdf8]">3</span><div><h3 className={`mb-[7px] text-[1.45rem] leading-[1.25] ${serif}`}>Adjust as needs change</h3><p className="text-[#45655f]">Your coordinator stays close and helps the plan evolve over time.</p></div></li>
          </ol>
        </div>
      </section>

      <section className={`${shell} grid grid-cols-[0.78fr_1.22fr] items-start gap-[clamp(60px,9vw,130px)] py-[140px] max-[900px]:grid-cols-1 max-[700px]:py-[88px]`} id="consultation">
        <div className="sticky top-10 max-w-[700px] max-[900px]:static">
          <p className={eyebrow}>Start a conversation</p>
          <h2 className={`${heading} mb-6 text-[clamp(2.5rem,4.4vw,4.6rem)]`}>Let&apos;s talk about what support could look like.</h2>
          <p className="text-[1.08rem] text-[#45655f]">Share a few details and a local care coordinator will follow up within one business day.</p>
          <div className="mt-9 flex flex-col gap-1 border-l-[3px] border-[#da6b4d] pl-[18px]">
            <strong>Please do not include medical records.</strong>
            <span className="text-[0.88rem] text-[#45655f]">This form is for an initial care conversation, not emergencies or clinical advice.</span>
          </div>
        </div>
        <LeadForm />
      </section>

      <footer className="bg-[#173b34] py-[38px] text-[#fffdf8]">
        <div className={`${shell} grid grid-cols-[1fr_auto_auto] items-center gap-9 max-[900px]:grid-cols-2 max-[700px]:grid-cols-1`}>
          <div className={`inline-flex items-center gap-3 text-[1.2rem] font-bold text-[#fffdf8] ${serif}`}>
            <span className={`grid size-[38px] place-items-center rounded-[50%_50%_42%_58%] bg-[#fffdf8] text-base font-bold text-[#173b34] ${serif}`} aria-hidden="true">H</span>
            <span>Harborlight Care</span>
          </div>
          <p className="text-[0.8rem] text-[#c8d7d3]">Fictional agency created for a technical assessment.</p>
          <p className="text-[0.8rem] text-[#c8d7d3] max-[900px]:col-start-2 max-[700px]:col-auto">Demo content only. Not a real care provider.</p>
        </div>
      </footer>
    </main>
  );
}
