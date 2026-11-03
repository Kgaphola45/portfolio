import { useEffect, useState } from "react";
import { useMouseScrub, useTypewriter } from "./hooks";
import { EMAIL, INTRO, LOGO, TYPED, VIDEO_SRC } from "./content";

const headingFont = { fontFamily: "var(--font-heading)" };
const bodyFont = { fontFamily: "var(--font-body)" };
const bodySize = { fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 400 } as const;

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bar = "block h-[2px] w-6 bg-white transition-all duration-300";

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-4 text-white sm:px-10 lg:px-16 xl:px-20 sm:py-5 backdrop-blur-md bg-white/[0.03] border-b border-white/10"
        style={bodyFont}
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="text-[21px] tracking-tight sm:text-[26px]" style={headingFont}>
            {LOGO}
          </span>
          <span
            aria-hidden="true"
            className="select-none text-[25px] sm:text-[30px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            ✳︎
          </span>
        </a>

        <ul className="hidden text-[17px] md:flex items-center gap-6">
          <li>
            <a href="#impact" className="transition-opacity hover:opacity-60">Impact</a>
          </li>
          <li>
            <a href="#evidence" className="transition-opacity hover:opacity-60">Evidence</a>
          </li>
          <li>
            <a href="#shift" className="transition-opacity hover:opacity-60">Daily Shift</a>
          </li>
          <li>
            <a href="#toolbox" className="transition-opacity hover:opacity-60">Toolbox</a>
          </li>
          <li>
            <a href="#contact" className="transition-opacity hover:opacity-60">Contact</a>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/CV/Emmanuel_Kgaphola_CV.docx"
            download
            className="text-[14px] px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white transition-colors"
          >
            CV (.docx)
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[14px] px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span className={`${bar} ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`${bar} ${open ? "opacity-0" : ""}`} />
          <span className={`${bar} ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className="fixed inset-0 z-20 flex flex-col justify-center gap-6 bg-black/95 px-8 text-white backdrop-blur-md transition-opacity duration-300 md:hidden"
        style={{ ...bodyFont, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        aria-hidden={!open}
      >
        <a href="#impact" onClick={() => setOpen(false)} className="text-[28px] font-medium">Impact</a>
        <a href="#evidence" onClick={() => setOpen(false)} className="text-[28px] font-medium">Evidence &amp; RCA</a>
        <a href="#shift" onClick={() => setOpen(false)} className="text-[28px] font-medium">Daily Rhythm</a>
        <a href="#toolbox" onClick={() => setOpen(false)} className="text-[28px] font-medium">Toolbox</a>
        <a href="#contact" onClick={() => setOpen(false)} className="text-[28px] font-medium">Get in touch</a>
        <a href="/CV/Emmanuel_Kgaphola_CV.docx" download className="text-[20px] text-neutral-400 mt-4">Download CV (.docx)</a>
      </div>
    </>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
      <rect x="1" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Hero() {
  const { displayed, done } = useTypewriter(TYPED);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const pill =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full mx-[0.2em] mb-[0.4em] px-4 py-[0.35em] text-[13px] sm:px-5 sm:text-[15px]";

  return (
    <header
      id="top"
      className="relative z-10 flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 sm:px-10 md:justify-center md:px-16 lg:px-20 xl:px-24 md:pb-0"
      style={bodyFont}
    >
      <div className="relative z-10 max-w-3xl lg:max-w-4xl py-2">
        <p
          aria-hidden="true"
          className="pointer-events-none mb-4 select-none sm:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          style={{ ...bodySize, lineHeight: 1.3, color: "#fff", filter: "blur(3px)" }}
        >
          {INTRO[0]}
          <br />
          {INTRO[1]}
        </p>
        <p className="sr-only">{INTRO.join(" ")}</p>

        <p
          className="mb-6 text-white sm:mb-7 font-normal drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
          style={{ ...bodySize, lineHeight: 1.35, minHeight: 54 }}
          aria-label={TYPED}
        >
          <span aria-hidden="true">
            {displayed}
            {!done && (
              <span className="cursor-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle [animation:blink_1s_step-end_infinite]" />
            )}
          </span>
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <a
            href="#impact"
            className={`${pill} border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lg transition-all duration-200 hover:bg-white hover:text-black`}
          >
            Review 99.9% Uptime &amp; Impact
          </a>
          <a
            href="#evidence"
            className={`${pill} border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lg transition-all duration-200 hover:bg-white hover:text-black`}
          >
            Inspect Odoo RCA &amp; Scripts
          </a>
          <a
            href="/CV/Emmanuel_Kgaphola_CV.docx"
            download
            className={`${pill} border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lg transition-all duration-200 hover:bg-white hover:text-black`}
          >
            Download CV (.docx)
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy ${EMAIL} to clipboard`}
            className={`${pill} gap-2 border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-black sm:gap-3`}
          >
            <span>
              {copied ? (
                "Copied to clipboard!"
              ) : (
                <>
                  Reach me: <span className="underline underline-offset-2">{EMAIL}</span>
                </>
              )}
            </span>
            <CopyIcon />
          </button>
          <span role="status" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
        </div>
      </div>
    </header>
  );
}

// Full comprehensive portfolio sections below hero
function EvidenceSection() {
  const [activeTab, setActiveTab] = useState<"odoo" | "ps" | "zabbix" | "report">("odoo");

  return (
    <section id="evidence" className="py-24 border-t border-white/10 text-neutral-100 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-3xl">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-400">01 &middot; Production Evidence</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 text-white">Tier 2 lives on evidence, not claims</h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed drop-shadow">
            Inspect verified operational artifacts: production RCA deadlock resolution, PowerShell Entra ID automation, Zabbix alert tuning, and daily shift sign-offs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-8">
          {[
            { id: "odoo", label: "Odoo RCA Ticket" },
            { id: "ps", label: "PowerShell Automation" },
            { id: "zabbix", label: "Zabbix Noise Reduction (-88%)" },
            { id: "report", label: "Daily Ops Attestation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/[0.05] backdrop-blur-md border border-white/15 text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-2xl">
          {activeTab === "odoo" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-indigo-300">odoo-itsm.tontrac.local / INC-8492-RCA</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                  CLOSED &middot; VERIFIED RCA
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-white/10 text-xs">
                <div>
                  <span className="text-neutral-400 block">Ticket ID</span>
                  <strong className="text-white">INC-8492</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block">Severity</span>
                  <strong className="text-amber-300">SEV 2 &middot; ESCALATED</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block">Affected Node</span>
                  <strong className="text-white">Branch #04 Core SQL Server</strong>
                </div>
                <div>
                  <span className="text-neutral-400 block">Resolution Time</span>
                  <strong className="text-emerald-300">11 mins (Zero recurrence)</strong>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-200">
                <p>
                  <strong className="text-white block mb-1">1. Escalated Incident:</strong>
                  Branch application froze on SQL transaction queue submission during peak operations. First Line reboot failed.
                </p>
                <div className="p-3 bg-white/[0.04] backdrop-blur-md font-mono text-xs rounded-lg text-red-300 overflow-x-auto border border-white/10">
                  [08:41:58.204] [ERROR] SqlException: Lock request timeout period exceeded (30002ms). Process SPID 89 blocked by SPID 62 (ReportGeneratorService.exe).
                </div>
                <p>
                  <strong className="text-white block mb-1">2. Root Cause &amp; Prevention:</strong>
                  Unindexed reporting service held exclusive write-lock. Safely terminated blocking SPID 62, validated 14 branch writes, and rescheduled heavy reporting to off-peak replica.
                </p>
              </div>
            </div>
          )}

          {activeTab === "ps" && (
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs font-mono text-neutral-400">
                <span>New-UserOnboarding.ps1 &middot; Production Ready</span>
                <span className="text-emerald-300">Saves ~5 hrs/week</span>
              </div>
              <pre className="mt-4 p-4 bg-white/[0.04] backdrop-blur-md font-mono text-xs text-neutral-200 rounded-xl overflow-x-auto border border-white/10 leading-relaxed">
{`param (
    [Parameter(Mandatory = $true)][string]$UserEmail,
    [Parameter(Mandatory = $true)][string]$SiteCode,
    [ValidateSet('Staff', 'Operations', 'Management')][string]$Role = 'Staff'
)

$ErrorActionPreference = 'Stop'
Write-Host "[INIT] Provisioning $Role account for $UserEmail at site $SiteCode..."

$roleGroups = @{
    'Staff'      = "ACL-Site-$SiteCode-StaffPortal"
    'Operations' = "ACL-Site-$SiteCode-Operations"
    'Management' = "ACL-Site-$SiteCode-Management"
}

try {
    $adUser = Get-AzureADUser -ObjectId $UserEmail
    $targetGroup = Get-AzureADGroup -SearchString $roleGroups[$Role]
    Add-AzureADGroupMember -ObjectId $targetGroup.ObjectId -RefObjectId $adUser.ObjectId
    Write-Host "[SUCCESS] Added $UserEmail to $($targetGroup.DisplayName)"
} catch {
    Write-Error "[FAIL] Provisioning aborted: $_"
}`}
              </pre>
            </div>
          )}

          {activeTab === "zabbix" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-red-500/[0.08] backdrop-blur-md border border-red-500/20">
                <span className="text-xs font-mono text-red-300 uppercase tracking-wider">Before Tuning (Alert Fatigue)</span>
                <div className="text-2xl font-semibold text-white mt-2">42 false alerts / night</div>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                  Triggered by momentary 3-second WAN wireless latency spikes. True disk and database warnings were missed.
                </p>
                <div className="mt-4 p-2.5 bg-white/[0.04] font-mono text-xs rounded text-neutral-200 border border-white/10">
                  icmppingloss &gt; 0%
                </div>
              </div>
              <div className="p-5 rounded-xl bg-emerald-500/[0.08] backdrop-blur-md border border-emerald-500/20">
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">After Tuning (High Fidelity)</span>
                <div className="text-2xl font-semibold text-emerald-300 mt-2">4 actionable alerts / night (-88%)</div>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                  Required sustained 5-min loss window and agent ping verification. Zero missed outages across 50+ sites in 6 months.
                </p>
                <div className="mt-4 p-2.5 bg-white/[0.04] font-mono text-xs rounded text-neutral-200 border border-white/10">
                  min(/host/icmppingloss, 5m) &gt; 25% and nodata(/host/agent.ping, 3m) = 1
                </div>
              </div>
            </div>
          )}

          {activeTab === "report" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/[0.05] backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-xs font-mono text-neutral-400 block">SQL Database Backups</span>
                <strong className="text-emerald-300 text-lg block mt-1">52 / 52 PASS</strong>
                <p className="text-xs text-neutral-400 mt-1">Daily verification baseline confirmed</p>
              </div>
              <div className="p-4 bg-white/[0.05] backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-xs font-mono text-neutral-400 block">Action1 Patching</span>
                <strong className="text-emerald-300 text-lg block mt-1">98.6% Compliant</strong>
                <p className="text-xs text-neutral-400 mt-1">Zero daytime disruption reboots</p>
              </div>
              <div className="p-4 bg-white/[0.05] backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-xs font-mono text-neutral-400 block">Cisco Meraki WAN</span>
                <strong className="text-white text-lg block mt-1">&lt; 85% Normal</strong>
                <p className="text-xs text-neutral-400 mt-1">2-hour periodic spot checks clean</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section id="impact" className="py-24 border-t border-white/10 text-neutral-100 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-300">02 &middot; Outcomes &amp; Metrics</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 text-white">Built for operations where downtime is not an option</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300">
              Supporting 50+ remote enterprise branches with 75+ daily tickets. I moved from Tier 1 Help Desk to Tier 2 IT Support Technician in 13 months at TonTrac Systems Analytics by solving root causes.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-2xl">
              <span className="text-4xl font-bold text-white tracking-tight">99.9%</span>
              <span className="block text-sm font-semibold text-neutral-200 mt-1">System Uptime Maintained</span>
              <p className="text-xs text-neutral-400 mt-1">Across 50+ distributed depots, branch servers, and SQL instances.</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <h3 className="font-semibold text-white text-base">Audit-ready shifts &amp; ticket hygiene</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                SQL backups checked daily, ITSM/Odoo tickets 100% clean, and full documentation for zero compliance surprises.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <h3 className="font-semibold text-white text-base">Root causes over quick reboots</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                Rebooting without inspecting logs just schedules tomorrow's outage. I isolate blocking locks, deadlocks, and sync loops.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <h3 className="font-semibold text-white text-base">Proactive monitoring</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                Zabbix &amp; Cisco Meraki tuned to catch memory leaks, storage capacity spikes, and packet loss before calls start.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <h3 className="font-semibold text-white text-base">Multilingual de-escalation</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                Calm communication in English, Sepedi, Zulu, and Sotho to keep branch managers and staff reassured while resolving issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShiftSection() {
  const shifts = [
    {
      time: "07:00",
      title: "Critical Controls & SQL Backups",
      desc: "Audit checks first before touching a switch. Verify database backup completion across all 50+ sites with immediate log escalations on failure.",
    },
    {
      time: "09:00",
      title: "Escalations & Tier 2 Diagnostics",
      desc: "Where 'turn it off and on again' stops working: SQL deadlocks, silent Entra ID sync faults, branch client freezes, and VoIP jitter analysis.",
    },
    {
      time: "13:00",
      title: "Action1 Patching & Automation",
      desc: "Deploy endpoint and server patches via Action1 with zero surprise reboots during live operations. Execute PowerShell user provisioning scripts.",
    },
    {
      time: "16:30",
      title: "Daily Closure & Attestation",
      desc: "Compile and sign off the Daily Operational Report in Odoo: SQL backup statuses, outages, security alerts, and open tracked risks.",
    },
  ];

  return (
    <section id="shift" className="py-24 border-t border-white/10 text-neutral-100 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
        <span className="text-xs uppercase font-mono tracking-widest text-indigo-300">03 &middot; The Rhythm</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 text-white">What a normal day looks like from my chair</h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {shifts.map((s) => (
            <div key={s.time} className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 flex flex-col justify-between shadow-xl hover:border-white/30 transition-colors">
              <div>
                <span className="text-xs font-mono font-semibold text-indigo-300">{s.time} &middot; SHIFT STEP</span>
                <h3 className="text-lg font-semibold text-white mt-2 leading-snug">{s.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolboxSection() {
  return (
    <section id="toolbox" className="py-24 border-t border-white/10 text-neutral-100 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
        <span className="text-xs uppercase font-mono tracking-widest text-indigo-300">04 &middot; Operational Stack</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 text-white">Tools used to keep 50+ sites running</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
            <span className="text-xs font-mono text-indigo-300 uppercase">Tier A &middot; Daily Critical</span>
            <h3 className="text-lg font-semibold text-white mt-1">If this fails, operations halt</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li><strong>Odoo ITSM:</strong> Queue triage, escalations, 100% hygiene.</li>
              <li><strong>SQL Server Backups:</strong> Daily verification across 50+ sites.</li>
              <li><strong>Zabbix &amp; Meraki:</strong> Real-time bandwidth, storage &amp; power telemetry.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
            <span className="text-xs font-mono text-indigo-300 uppercase">Tier B &middot; Weekly Controls</span>
            <h3 className="text-lg font-semibold text-white mt-1">Security &amp; compliance</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li><strong>Microsoft Entra ID:</strong> RBAC, onboarding, asset registers.</li>
              <li><strong>Action1 RMM:</strong> Automated endpoint and server patching.</li>
              <li><strong>PowerShell + Excel:</strong> User provisioning &amp; daily shift reporting.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl hover:border-white/30 transition-colors">
            <span className="text-xs font-mono text-indigo-300 uppercase">Tier C &middot; Software Edge</span>
            <h3 className="text-lg font-semibold text-white mt-1">Developer roots</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li><strong>IIE Diploma in IT:</strong> C#, Java, PHP, and SQL query analysis.</li>
              <li><strong>Remote Hands:</strong> TeamViewer, AnyDesk, NVR/CCTV &amp; PABX telephony.</li>
              <li><strong>Homelab &amp; Certs:</strong> Preparing for MS-900 &amp; AZ-900.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/10 text-neutral-100 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-300">05 &middot; Direct Line</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 text-white">Let&rsquo;s talk directly</h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              I reply within one business day, usually faster. If you need a Tier 2 technician who uncovers root causes and treats ticket hygiene like gospel, send a message.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="tel:+27620345804"
                className="block p-4 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                <span className="text-xs font-mono text-neutral-400 block">CALL / WHATSAPP</span>
                <strong className="text-white">+27 62 034 5804</strong>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="w-full text-left p-4 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                <span className="text-xs font-mono text-neutral-400 block">DIRECT EMAIL</span>
                <strong className="text-white">{EMAIL}</strong>
                <span className="text-xs text-indigo-300 ml-2">({copied ? "Copied!" : "Click to copy"})</span>
              </button>
              <a
                href="https://linkedin.com/in/emmanuel-kgaphola"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                <span className="text-xs font-mono text-neutral-400 block">LINKEDIN</span>
                <strong className="text-white">linkedin.com/in/emmanuel-kgaphola &#8599;</strong>
              </a>
              <a
                href="https://github.com/Kgaphola45"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                <span className="text-xs font-mono text-neutral-400 block">GITHUB</span>
                <strong className="text-white">@Kgaphola45 &#8599;</strong>
              </a>
            </div>
          </div>

          <form
            action="https://formspree.io/f/xgoebodo"
            method="POST"
            className="p-6 sm:p-8 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-white">Send a direct message</h3>
            <div>
              <label htmlFor="name" className="text-xs font-mono text-neutral-300 uppercase block mb-1">Your Name</label>
              <input
                id="name"
                name="name"
                required
                placeholder="e.g. Naledi from Operations"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/20 text-white placeholder-neutral-400 text-sm focus:border-white focus:bg-white/10 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-mono text-neutral-300 uppercase block mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="you@company.co.za"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/20 text-white placeholder-neutral-400 text-sm focus:border-white focus:bg-white/10 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-mono text-neutral-300 uppercase block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="What systems are giving you trouble, or what role are you looking to fill?"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/20 text-white placeholder-neutral-400 text-sm focus:border-white focus:bg-white/10 focus:outline-none transition-colors"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-lg"
            >
              Send Message &rarr;
            </button>
            <p className="text-xs font-mono text-neutral-400 text-center">Johannesburg &middot; Hybrid or Remote</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const videoRef = useMouseScrub();

  return (
    <div className="relative min-h-screen w-full text-white bg-transparent">
      {/* Background 3D Video Character - edge-to-edge coverage */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="fixed inset-0 z-0 h-screen w-screen min-h-screen min-w-full object-cover pointer-events-none"
        style={{ objectPosition: "70% center" }}
      />

      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <EvidenceSection />
        <ImpactSection />
        <ShiftSection />
        <ToolboxSection />
        <ContactSection />

        <footer className="py-8 border-t border-white/10 text-center text-xs font-mono text-neutral-400 backdrop-blur-sm bg-white/[0.02] w-full px-6 sm:px-10">
          Emmanuel Kgaphola &middot; Tier 2 IT Support Technician &middot; Johannesburg
        </footer>
      </div>
    </div>
  );
}
