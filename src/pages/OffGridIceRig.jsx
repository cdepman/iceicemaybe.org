import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/*
 * Off-Grid Ice Rig — Field Build Manual.
 *
 * Ported from a standalone "Design Component" HTML export into a first-class
 * React page. The original relied on a bundled `dc-runtime` that fetched React
 * from a CDN and rendered an `<x-dc>` template; this is a plain, data-driven
 * component instead. Fonts (Archivo / IBM Plex) load via the <link> tags in
 * index.html rather than being inlined as ~1.5MB of base64.
 */

// --- palette -----------------------------------------------------------------
const FIELD = '#1C46C9';
const FROST = '#8FE6F7';
const FROST_PALE = '#C9F3FB';
const WARM = '#FFC24B';
const INK = '#EAF1FF';
const MUTED = '#A9BEF0';
const HAIR = 'rgba(255,255,255,.16)';
const HAIR2 = 'rgba(255,255,255,.08)';
const MONO = "'IBM Plex Mono',monospace";
const ARCHIVO = "'Archivo',sans-serif";

const BOOKING_URL = 'https://calendar.app.google/J8LeRMqDA4Yqrioy7';

// --- content -----------------------------------------------------------------
const SECTIONS = [
  ['overview', 'Overview'],
  ['parts', 'Parts'],
  ['path', 'Plumbing'],
  ['assembly', 'Assembly'],
  ['notes', 'Notes'],
];

const MOVES = [
  { n: '01', t: 'Parts', d: 'Buy the devices and the fittings that join them.', href: '#parts' },
  { n: '02', t: 'Plan', d: 'Trace the plumbing, fitting by fitting.', href: '#path' },
  { n: '03', t: 'Build', d: 'Plumb and wire the rig in order.', href: '#assembly' },
  { n: '04', t: 'Tune', d: 'Dodge the six classic field mistakes.', href: '#notes' },
];

const DEVICES = [
  {
    role: 'Source',
    name: 'Water reservoir',
    does: 'Holds source water and gravity-feeds the pump inlet.',
    tags: ['food-safe tank', 'spigot outlet'],
    core: false,
    buy: 'https://www.amazon.com/dp/B086VPXZ95?th=1',
  },
  {
    role: 'The heart',
    name: 'SEAFLO diaphragm pump',
    does: 'Pressurizes water on demand for a steady feed. A SEAFLO 55 Series pump pulls between 96 W and 204 W depending on the load, operating conditions, and model.',
    tags: ['12V DC / 120V AC', '96-204W (load-dependent)', '1/2" MNPT ports', 'self-priming'],
    core: true,
    buy: 'https://www.amazon.com/dp/B0FQWQHP94?th=1',
  },
  {
    role: 'Output',
    name: 'EUHOMY ice maker',
    does: 'Freezes the pressurized water into ice. Draws roughly 200-240 W while running, though this varies by model.',
    tags: ['120V AC', '200-240W (model-dependent)', '1/4" OD inlet', 'portable'],
    core: false,
    buy: 'https://www.amazon.com/dp/B0GTYG71G4',
  },
  {
    role: 'Power',
    name: 'Solar power system',
    does: 'Runs the pump and the ice maker off the sun. With both running, plan for a combined peak draw of roughly 300-440 W and size the inverter, battery bank, and panels with headroom above that.',
    tags: ['panel + controller', 'battery bank', 'inverter for AC', '~300-440W combined peak'],
    core: false,
  },
];

const ABBREVIATIONS = [
  ['AC', 'Alternating current'],
  ['DC', 'Direct current'],
  ['OD', 'Outer diameter'],
  ['ID', 'Inner diameter'],
  ['NPT', 'National Pipe Thread (tapered)'],
  ['MNPT', 'Male NPT (external threads)'],
  ['FNPT', 'Female NPT (internal threads)'],
  ['FHT', 'Female Hose Thread'],
  ['PTC', 'Push-to-connect fitting'],
  ['PTFE', 'PTFE (Teflon) thread-seal tape'],
];

const FITTINGS = [
  { pin: '', name: '3/4" FHT × hose barb', spec: '3/4" FHT × barb', connects: 'reservoir spigot → clear hose', note: 'Screws onto the tank spigot. Match the barb to your hose ID.' },
  { pin: '', name: 'Clear reinforced hose + clamp', spec: 'vinyl, ID to match', connects: 'tank adapter → pump inlet', note: 'Slide over each barb; lock down with a worm-gear clamp.' },
  { pin: 'INLET', name: '1/2" FNPT × hose barb', spec: '1/2" FNPT × barb', connects: 'clear hose → pump inlet', note: 'Female threads onto the male inlet. Tape the threads.' },
  { pin: 'OUTLET', name: '1/2" FNPT × 1/4" push-to-connect', spec: '1/2" FNPT × 1/4" OD PTC', connects: 'pump outlet → ice tube', note: 'Female threads onto the male outlet; the 1/4" tube pushes in.' },
  { pin: '', name: '1/4" OD water tube', spec: '1/4" OD poly tube', connects: 'PTC → ice inlet', note: 'Cut square, push until seated, then tug to confirm.' },
];

const STEPS = [
  { t: 'Stage the reservoir', b: 'Set the tank above or level with the pump so water gravity-feeds the inlet. Confirm the spigot is 3/4" hose thread before buying the adapter.' },
  { t: 'Build the inlet line', b: 'Thread the 3/4" FHT × barb onto the spigot. Run clear hose to the 1/2" FNPT × barb and lock both ends with worm-gear clamps.' },
  { t: 'Connect the pump inlet', b: 'Thread the 1/2" FNPT × barb onto the male inlet port with PTFE tape. The clear hose now feeds the pump.' },
  { t: 'Build the outlet line', b: 'Thread the 1/2" FNPT × 1/4" push-to-connect onto the male outlet port with PTFE tape.' },
  { t: 'Connect the ice maker', b: 'Cut the 1/4" tube square, push it into the connect fitting, then into the ice maker water inlet. Tug both ends to confirm.' },
  { t: 'Wire the power', b: 'A DC pump fuses straight to the battery bank; an AC pump runs off the inverter or shore power alongside the ice maker.' },
  { t: 'Test dry, then wet', b: 'Power the pump first and check every joint for leaks. Then start the ice maker and watch the first full cycle before walking away.' },
];

const NOTES = [
  { k: 'A', t: 'Thread gender, every time', b: 'Pump ports are male, so every fitting that screws on is female. This one rule prevents most leaks.' },
  { k: 'B', t: 'Tape pipe threads only', b: 'PTFE tape on tapered NPT joints. Hose thread (FHT) seals on a gasket and needs none.' },
  { k: 'C', t: 'Match barb to hose ID', b: 'Size the barb to the inner diameter of the hose, not the outer, or the clamp will never seal.' },
  { k: 'D', t: 'Square-cut the 1/4" tube', b: 'Push-to-connect fittings need a clean, deburred, square end to seat and hold pressure.' },
  { k: 'E', t: 'Give the condenser air', b: 'Portable ice makers dump heat out the back. Leave clearance and brush dust off the coils or output drops.' },
  { k: 'F', t: 'Shade the reservoir', b: 'Sun-warmed feed water freezes slower and makes softer cubes. Keep the tank shaded or insulated.' },
];

// SVG icons for the water-path nodes.
const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7">
    {children}
  </svg>
);

const FLOW = [
  {
    kind: 'source',
    label: 'Device / source',
    title: 'Water reservoir',
    desc: 'Gravity-fed tank. Keep it above or level with the pump for an easy prime.',
    icon: (
      <Icon>
        <path d="M5 4h14v11a7 7 0 0 1-14 0z" />
        <path d="M5 9h14" opacity=".5" />
        <path d="M16 15h3" />
      </Icon>
    ),
  },
  { connector: 'reservoir spigot' },
  {
    kind: 'fitting',
    label: 'Fitting 01',
    title: '3/4" FHT × hose barb',
    desc: 'Screws onto the tank spigot; the clear hose slides over the barb.',
    spec: '3/4" female hose thread × barb',
    icon: (
      <Icon>
        <circle cx="8" cy="12" r="4" />
        <path d="M12 12h9M16 9l3 3-3 3" opacity=".7" />
      </Icon>
    ),
  },
  { connector: 'clear hose + clamp' },
  {
    kind: 'fitting',
    label: 'Fitting 02 / inlet',
    title: '1/2" FNPT × hose barb',
    desc: 'Barb takes the clear hose; female threads screw onto the pump inlet.',
    spec: '1/2" female pipe thread × barb',
    icon: (
      <Icon>
        <path d="M3 12h7" />
        <circle cx="14" cy="12" r="4" />
        <path d="M18 10v4M20 10v4" opacity=".6" />
      </Icon>
    ),
  },
  { connector: 'screws onto inlet' },
  {
    kind: 'pump',
    label: 'Device / the heart',
    title: 'SEAFLO pump',
    desc: 'Self-priming diaphragm pump. Both ports are male, so both fittings are female. AC and DC versions plumb identically.',
    spec: 'ports: 1/2" MNPT (male)',
    icon: (
      <Icon>
        <rect x="4" y="7" width="12" height="10" rx="2" />
        <path d="M16 10h3v4h-3" />
        <path d="M7 7V5h4v2" opacity=".7" />
      </Icon>
    ),
  },
  { connector: 'screws onto outlet' },
  {
    kind: 'fitting',
    label: 'Fitting 03 / outlet',
    title: '1/2" FNPT × 1/4" push-to-connect',
    desc: 'Female threads onto the pump outlet; the 1/4" tube pushes into the other side.',
    spec: '1/2" FNPT × 1/4" OD PTC',
    icon: (
      <Icon>
        <path d="M3 12h7" />
        <rect x="10" y="9" width="6" height="6" rx="1" />
        <path d="M16 12h5" strokeDasharray="2 2" />
      </Icon>
    ),
  },
  { connector: '1/4" water tube' },
  {
    kind: 'source',
    label: 'Device / output',
    title: 'Ice machine',
    desc: '1/4" water inlet receives the tube. Usually runs on 120V AC.',
    icon: (
      <Icon>
        <path d="M12 3v18M4 7l16 10M20 7L4 17" />
        <path d="M12 3l-2.5 2.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5" opacity=".7" />
      </Icon>
    ),
  },
];

// --- shared styles -----------------------------------------------------------
const CONTAINER = { maxWidth: '1120px', margin: '0 auto', padding: '0 24px' };
const SECTION = {
  scrollMarginTop: '72px',
  padding: '88px 0',
  borderTop: `1px solid ${HAIR2}`,
};
const tagStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: MONO,
  fontSize: '.7rem',
  letterSpacing: '.24em',
  textTransform: 'uppercase',
  color: FIELD,
  background: FROST,
  padding: '7px 16px 7px 13px',
  fontWeight: 600,
  clipPath: 'polygon(0 0,100% 0,100% 100%,12px 100%,0 calc(100% - 12px))',
};
const h2Style = {
  fontFamily: ARCHIVO,
  fontWeight: 800,
  fontSize: 'clamp(1.8rem,4.4vw,2.7rem)',
  letterSpacing: '-.01em',
  margin: '16px 0 0',
};
const leadStyle = { margin: '14px 0 0', color: MUTED, fontSize: '1.05rem' };

const SectionTag = ({ children }) => <span style={tagStyle}>{children}</span>;

const PAGE_CSS = `
html,body{margin:0}
.ogir-root *{box-sizing:border-box}
html{scroll-behavior:smooth}
.ogir-root ::selection{background:#8FE6F7;color:#0A235E}
@keyframes ogir-flowdrop{0%{top:-6px;opacity:0}18%{opacity:1}82%{opacity:1}100%{top:100%;opacity:0}}
@media (prefers-reduced-motion:reduce){.ogir-root [data-drop]{animation:none!important;top:42%!important}}
@media (max-width:760px){
  .ogir-hero-grid{grid-template-columns:1fr!important;gap:28px!important}
  .ogir-nav-bar{position:relative!important;flex-direction:column;align-items:flex-start!important;height:auto!important;padding-top:10px!important;padding-bottom:10px!important;gap:10px!important}
  .ogir-nav-links{flex-wrap:wrap!important;overflow:visible!important;margin-left:0!important;width:100%;gap:12px 18px!important}
  .ogir-home-link{position:absolute!important;top:16px!important;right:24px!important;font-size:.72rem!important;padding:6px 11px!important;border-radius:7px!important}
  .ogir-steps-grid{grid-template-columns:repeat(2,1fr)!important}
}
`;

// --- sub-components -----------------------------------------------------------
const Connector = ({ label }) => (
  <div style={{ height: '46px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
    <div
      style={{
        width: '3px',
        borderRadius: '3px',
        background: `linear-gradient(#2a7fb0,${FROST})`,
        position: 'relative',
      }}
    >
      <span
        data-drop=""
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          background: FROST,
          boxShadow: `0 0 10px 2px color-mix(in oklab,${FROST} 70%,transparent)`,
          animation: 'ogir-flowdrop 1.9s linear infinite',
        }}
      />
    </div>
    <span
      style={{
        position: 'absolute',
        left: 'calc(50% + 16px)',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: MONO,
        fontSize: '.72rem',
        color: MUTED,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  </div>
);

const FlowNode = ({ node }) => {
  const warm = node.kind === 'pump';
  const accentBg =
    node.kind === 'source'
      ? 'rgba(143,230,247,.06)'
      : warm
        ? 'linear-gradient(180deg,rgba(255,194,75,.16),rgba(255,255,255,.02))'
        : 'rgba(255,255,255,.03)';
  const accentBorder =
    node.kind === 'source'
      ? `1px solid color-mix(in oklab,${FROST} 50%,transparent)`
      : warm
        ? `1px solid ${WARM}`
        : `1px solid rgba(255,255,255,.18)`;
  const iconColor = node.kind === 'source' ? FROST : warm ? WARM : FROST_PALE;
  const specColor = warm ? WARM : FROST;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr',
        gap: '16px',
        alignItems: 'center',
        borderRadius: '14px',
        padding: '16px 18px',
        background: accentBg,
        border: accentBorder,
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,.22)',
          border: `1px solid rgba(255,255,255,.1)`,
          color: iconColor,
        }}
      >
        {node.icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: '.62rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: warm ? WARM : MUTED,
          }}
        >
          {node.label}
        </div>
        <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: '1.08rem', marginTop: '2px' }}>
          {node.title}
        </div>
        <div style={{ fontSize: '.88rem', color: MUTED, marginTop: '4px' }}>{node.desc}</div>
        {node.spec && (
          <span
            style={{
              fontFamily: MONO,
              fontSize: '.74rem',
              color: specColor,
              marginTop: '8px',
              display: 'inline-block',
              border: `1px dashed color-mix(in oklab,${specColor} 55%,transparent)`,
              borderRadius: '6px',
              padding: '3px 9px',
            }}
          >
            {node.spec}
          </span>
        )}
      </div>
    </div>
  );
};

// --- page --------------------------------------------------------------------
export const OffGridIceRig = () => {
  const [active, setActive] = useState('overview');
  const [checked, setChecked] = useState({});
  const [view, setView] = useState('cards');

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('icerig-steps-v1') || '{}');
      if (s && typeof s === 'object') setChecked(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const ids = SECTIONS.map(([id]) => id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toggle = (i) => {
    setChecked((prev) => {
      const next = { ...prev, [i]: !prev[i] };
      try {
        localStorage.setItem('icerig-steps-v1', JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const resetSteps = () => {
    try {
      localStorage.removeItem('icerig-steps-v1');
    } catch {
      /* ignore */
    }
    setChecked({});
  };

  let done = 0;
  for (const k in checked) if (checked[k]) done += 1;
  if (done > STEPS.length) done = STEPS.length;

  const isCards = view === 'cards';

  const vbtn = (on) => ({
    cursor: 'pointer',
    fontFamily: MONO,
    fontSize: '.66rem',
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    padding: '8px 15px',
    border: 'none',
    background: on ? FROST : 'transparent',
    color: on ? FIELD : INK,
    fontWeight: 600,
  });

  const rootStyle = {
    position: 'relative',
    minHeight: '100vh',
    background: `linear-gradient(180deg,${FIELD},color-mix(in oklab,${FIELD} 74%,#06123a))`,
    color: INK,
    fontFamily: '"IBM Plex Sans",system-ui,sans-serif',
    fontSize: '17px',
    lineHeight: 1.6,
    overflowX: 'hidden',
  };

  return (
    <div className="ogir-root" style={rootStyle}>
      <style>{PAGE_CSS}</style>

      {/* grid blueprint overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* utility bar */}
        <div style={{ borderBottom: `1px solid ${HAIR2}` }}>
          <div
            style={{
              ...CONTAINER,
              padding: '9px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '14px',
              fontFamily: MONO,
              fontSize: '.66rem',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: MUTED,
              flexWrap: 'wrap',
            }}
          >
            <span>Off-Grid Ice &nbsp;/&nbsp; Open-Source Build</span>
            <span style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              <span style={{ color: FROST }}>●</span> Manual v1.0 &nbsp;/&nbsp; 2026
            </span>
          </div>
        </div>

        {/* sticky nav */}
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            background: `color-mix(in oklab,${FIELD} 32%,#ffffff)`,
            borderBottom: `1px solid color-mix(in oklab,${FIELD} 30%,transparent)`,
          }}
        >
          <div
            className="ogir-nav-bar"
            style={{ ...CONTAINER, display: 'flex', alignItems: 'center', gap: '18px', height: '64px' }}
          >
            <RouterLink
              to="/"
              title="Back to iceicemaybe.org"
              style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}
            >
              <img src="/ice-ice-maybe-small.png" alt="Ice Ice Maybe" style={{ height: '38px', width: 'auto', display: 'block', transform: 'translateY(4px)' }} />
            </RouterLink>
            <div
              className="ogir-nav-links"
              style={{ display: 'flex', gap: '22px', alignItems: 'center', marginLeft: '6px', flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}
            >
              {SECTIONS.map(([id, label]) => {
                const on = active === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    style={{
                      position: 'relative',
                      textDecoration: 'none',
                      color: FIELD,
                      fontFamily: MONO,
                      fontSize: '.72rem',
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      padding: '6px 1px',
                      whiteSpace: 'nowrap',
                      fontWeight: on ? 600 : 500,
                      opacity: on ? 1 : 0.6,
                    }}
                  >
                    {label}
                    <span
                      style={{
                        position: 'absolute',
                        left: '1px',
                        right: '1px',
                        bottom: '-2px',
                        height: '2px',
                        background: FIELD,
                        transformOrigin: 'left',
                        transform: on ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform .25s ease',
                      }}
                    />
                  </a>
                );
              })}
            </div>
            <RouterLink
              to="/"
              className="ogir-home-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: FIELD,
                color: '#fff',
                fontFamily: ARCHIVO,
                fontWeight: 700,
                textDecoration: 'none',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '.82rem',
                whiteSpace: 'nowrap',
              }}
            >
              ← iceicemaybe.org
            </RouterLink>
          </div>
        </nav>

        {/* hero / overview */}
        <section id="overview" style={{ scrollMarginTop: '72px', padding: '88px 0 70px' }}>
          <div style={{ ...CONTAINER, position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-10px', left: '18px', width: '22px', height: '22px', borderTop: `2px solid ${FROST}`, borderLeft: `2px solid ${FROST}`, opacity: 0.55 }} />
            <span style={{ position: 'absolute', top: '-10px', right: '18px', width: '22px', height: '22px', borderTop: `2px solid ${FROST}`, borderRight: `2px solid ${FROST}`, opacity: 0.55 }} />

            <div className="ogir-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '48px', alignItems: 'center' }}>
              <div>
                <SectionTag>Field Build Manual</SectionTag>
                <h1 style={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: 'clamp(2.7rem,7.5vw,5.2rem)', lineHeight: 0.92, letterSpacing: '-.025em', margin: '20px 0 0', textTransform: 'uppercase' }}>
                  Off-Grid<br />
                  <span style={{ color: FROST }}>Ice</span> Rig
                </h1>
                <p style={{ maxWidth: '46ch', margin: '22px 0 0', color: INK, fontSize: 'clamp(1.02rem,2vw,1.18rem)', lineHeight: 1.55 }}>
                  A reservoir, a pump, and an ice machine built from off-the-shelf parts and run off whatever power you already have (renewable like solar preferred!).{' '}
                  <span style={{ color: FROST, fontWeight: 600 }}>The build hinges on the plumbing fittings</span> — so this guide gets the threads exact.
                </p>
              </div>

              {/* Fig. 01 */}
              <div style={{ position: 'relative', aspectRatio: '4 / 5', border: `1px solid rgba(255,255,255,.2)`, borderRadius: '14px', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 1, fontFamily: MONO, fontSize: '.62rem', letterSpacing: '.16em', textTransform: 'uppercase', color: FROST, background: 'rgba(11,18,38,.55)', padding: '3px 7px', borderRadius: '5px' }}>Fig. 01</span>
                <img src="/off-grid-ice-rig/IMG_7184.jpeg" alt="Assembled off-grid ice rig" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            {/* section dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginTop: '46px' }}>
              {SECTIONS.map(([id, label]) => {
                const on = active === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-label={label}
                    style={{ width: '11px', height: '11px', borderRadius: '50%', boxSizing: 'border-box', border: `1.5px solid ${FROST}`, background: on ? FROST : 'transparent', transition: 'background .2s ease', display: 'block' }}
                  />
                );
              })}
            </div>
          </div>

          {/* build in four moves */}
          <div style={{ ...CONTAINER, margin: '46px auto 0' }}>
            <div className="ogir-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
              {MOVES.map((m) => (
                <a key={m.n} href={m.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block', border: `1px solid ${HAIR}`, borderRadius: '13px', padding: '20px 18px', background: 'rgba(255,255,255,.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: '1.5rem', color: FROST }}>{m.n}</span>
                    <span style={{ color: FROST, fontSize: '1rem' }}>→</span>
                  </div>
                  <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: '1.12rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '.01em' }}>{m.t}</div>
                  <p style={{ margin: '7px 0 0', color: MUTED, fontSize: '.9rem', lineHeight: 1.5 }}>{m.d}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 01 PARTS */}
        <section id="parts" style={SECTION}>
          <div style={CONTAINER}>
            <SectionTag>01 / Parts</SectionTag>
            <h2 style={h2Style}>What to buy</h2>
            <p style={{ ...leadStyle, maxWidth: '60ch' }}>
              Two groups.{' '} We do not get any affiliate benefits from the links and those are just the pieces of hardware we did the proof-of-concept at Burning Man with. Other ice machines etc. should work well too.{' '}
              <strong style={{ color: INK, fontWeight: 600 }}>Fittings</strong> are the small parts that connect them, and where almost every failed build goes wrong.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '42px 0 18px' }}>
              <span style={{ width: '26px', height: '3px', background: FROST }} />
              <h3 style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: '1.18rem', margin: 0 }}>Devices</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(238px,1fr))', gap: '14px' }}>
              {DEVICES.map((d) => (
                <div key={d.name} style={{ border: `1px solid ${HAIR}`, borderRadius: '14px', padding: '20px', background: 'rgba(255,255,255,.02)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: MONO, fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: FROST }}>{d.role}</span>
                    {d.core && (
                      <span style={{ fontFamily: MONO, fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: FIELD, background: WARM, padding: '3px 7px', borderRadius: '5px' }}>Core part</span>
                    )}
                  </div>
                  <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: '1.12rem', margin: '12px 0 0', lineHeight: 1.15 }}>{d.name}</div>
                  <p style={{ margin: '8px 0 12px', color: MUTED, fontSize: '.92rem', lineHeight: 1.5 }}>{d.does}</p>
                  {d.buy && (
                    <a href={d.buy} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', margin: '0 0 16px', fontFamily: MONO, fontSize: '.74rem', letterSpacing: '.04em', color: FROST, textDecoration: 'none', borderBottom: `1px solid ${FROST}`, paddingBottom: '1px' }}>
                      Link to purchase →
                    </a>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                    {d.tags.map((t) => (
                      <span key={t} style={{ fontFamily: MONO, fontSize: '.72rem', color: FROST_PALE, border: `1px solid rgba(255,255,255,.18)`, borderRadius: '6px', padding: '3px 8px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* abbreviations */}
            <div style={{ marginTop: '34px', border: `1px solid ${HAIR}`, borderRadius: '14px', padding: '20px 22px', background: 'rgba(255,255,255,.02)' }}>
              <div style={{ fontFamily: MONO, fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: FROST, marginBottom: '14px' }}>Abbreviations</div>
              <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '10px 28px', margin: 0 }}>
                {ABBREVIATIONS.map(([term, def]) => (
                  <div key={term} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                    <dt style={{ fontFamily: MONO, fontSize: '.8rem', fontWeight: 600, color: FROST_PALE, minWidth: '56px' }}>{term}</dt>
                    <dd style={{ margin: 0, color: MUTED, fontSize: '.86rem', lineHeight: 1.45 }}>{def}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* fittings */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', margin: '48px 0 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '26px', height: '3px', background: FROST }} />
                <h3 style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: '1.18rem', margin: 0 }}>Fittings &amp; tubing</h3>
              </div>
              <div style={{ display: 'flex', border: `1px solid rgba(255,255,255,.2)`, borderRadius: '8px', overflow: 'hidden' }}>
                <button onClick={() => setView('cards')} style={vbtn(isCards)}>Cards</button>
                <button onClick={() => setView('table')} style={vbtn(!isCards)}>Table</button>
              </div>
            </div>

            {isCards ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '14px' }}>
                {FITTINGS.map((f) => (
                  <div key={f.name} style={{ border: `1px solid ${HAIR}`, borderRadius: '14px', padding: '18px 20px', background: 'rgba(255,255,255,.02)' }}>
                    {f.pin && (
                      <span style={{ display: 'inline-block', fontFamily: MONO, fontSize: '.6rem', letterSpacing: '.12em', fontWeight: 600, color: FIELD, background: WARM, borderRadius: '5px', padding: '2px 8px', marginBottom: '10px' }}>{f.pin}</span>
                    )}
                    <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: '1.04rem', lineHeight: 1.2 }}>{f.name}</div>
                    <div style={{ fontFamily: MONO, fontSize: '.76rem', color: FROST, background: 'rgba(0,0,0,.22)', border: `1px solid rgba(255,255,255,.14)`, borderRadius: '6px', padding: '4px 9px', display: 'inline-block', margin: '12px 0' }}>{f.spec}</div>
                    <div style={{ fontFamily: MONO, fontSize: '.74rem', color: FROST_PALE, marginBottom: '10px' }}>{f.connects}</div>
                    <p style={{ margin: 0, color: MUTED, fontSize: '.9rem', lineHeight: 1.5 }}>{f.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ overflowX: 'auto', border: `1px solid ${HAIR}`, borderRadius: '14px' }}>
                <div style={{ minWidth: '620px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.3fr 1.4fr 2fr', borderBottom: `1px solid ${HAIR}` }}>
                    {['Fitting', 'Exact spec', 'Connects', 'Assembly note'].map((c) => (
                      <div key={c} style={{ fontFamily: MONO, fontSize: '.62rem', letterSpacing: '.16em', textTransform: 'uppercase', color: MUTED, fontWeight: 500, padding: '14px 16px' }}>{c}</div>
                    ))}
                  </div>
                  {FITTINGS.map((f) => (
                    <div key={f.name} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.3fr 1.4fr 2fr', alignItems: 'start', borderTop: `1px solid ${HAIR2}` }}>
                      <div style={{ padding: '15px 16px', fontWeight: 600 }}>
                        {f.pin && (
                          <span style={{ display: 'inline-block', fontFamily: MONO, fontSize: '.58rem', letterSpacing: '.1em', fontWeight: 600, color: FIELD, background: WARM, borderRadius: '5px', padding: '2px 6px', marginRight: '7px' }}>{f.pin}</span>
                        )}
                        {f.name}
                      </div>
                      <div style={{ padding: '15px 16px' }}>
                        <span style={{ fontFamily: MONO, fontSize: '.76rem', color: FROST, background: 'rgba(0,0,0,.22)', borderRadius: '6px', padding: '3px 8px' }}>{f.spec}</span>
                      </div>
                      <div style={{ padding: '15px 16px', fontFamily: MONO, fontSize: '.78rem', color: FROST_PALE }}>{f.connects}</div>
                      <div style={{ padding: '15px 16px', color: MUTED }}>{f.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 02 PLUMBING */}
        <section id="path" style={SECTION}>
          <div style={CONTAINER}>
            <SectionTag>02 / Plumbing</SectionTag>
            <h2 style={h2Style}>Reservoir to ice, fitting by fitting</h2>
            <p style={{ ...leadStyle, maxWidth: '62ch' }}>
              Follow the line top to bottom. Each blue node is a device; each pale node is a fitting you buy. The pump in the middle sets the one rule that governs everything around it.
            </p>

            <div style={{ border: `1px solid ${WARM}`, background: 'linear-gradient(180deg,rgba(255,194,75,.14),rgba(255,194,75,.03))', borderRadius: '12px', padding: '20px 22px', margin: '34px 0 40px', maxWidth: '64ch', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: MONO, fontWeight: 600, color: WARM, fontSize: '.66rem', letterSpacing: '.14em', border: `1px solid ${WARM}`, borderRadius: '6px', padding: '4px 8px', whiteSpace: 'nowrap', marginTop: '2px' }}>PUMP RULE</span>
              <p style={{ margin: 0, color: INK, fontSize: '1.02rem', lineHeight: 1.55 }}>
                The SEAFLO pump ports are <b style={{ color: WARM }}>1/2" male pipe thread (MNPT)</b>, so every fitting that screws on must be{' '}
                <b style={{ color: WARM }}>1/2" female pipe thread (FNPT)</b>. This holds for the AC and the DC version alike. Get the gender backward and nothing seals.
              </p>
            </div>

            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              {FLOW.map((node, i) =>
                node.connector ? <Connector key={i} label={node.connector} /> : <FlowNode key={i} node={node} />
              )}
            </div>
          </div>
        </section>

        {/* 03 ASSEMBLY */}
        <section id="assembly" style={SECTION}>
          <div style={CONTAINER}>
            <SectionTag>03 / Assembly</SectionTag>
            <h2 style={h2Style}>Build order</h2>
            <p style={{ ...leadStyle, maxWidth: '62ch' }}>
              Plumb the rig first and prove it on a wall outlet. Move to solar only once it holds pressure without leaks.{' '}
              <span style={{ color: FROST }}>Tap a step to check it off</span> — your progress is saved.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '30px 0 8px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px', height: '8px', borderRadius: '99px', background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
                <div style={{ width: `${(done / STEPS.length) * 100}%`, height: '100%', background: FROST, borderRadius: '99px', transition: 'width .35s ease' }} />
              </div>
              <span style={{ fontFamily: MONO, fontSize: '.78rem', letterSpacing: '.1em', color: FROST, whiteSpace: 'nowrap' }}>{done} / {STEPS.length} complete</span>
              <button onClick={resetSteps} style={{ cursor: 'pointer', fontFamily: MONO, fontSize: '.66rem', letterSpacing: '.12em', textTransform: 'uppercase', color: MUTED, background: 'none', border: `1px solid rgba(255,255,255,.2)`, borderRadius: '7px', padding: '7px 12px' }}>Reset</button>
            </div>

            <div style={{ borderTop: `1px solid ${HAIR2}`, marginTop: '14px' }}>
              {STEPS.map((s, i) => {
                const on = !!checked[i];
                return (
                  <div key={s.t} onClick={() => toggle(i)} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '54px 1fr', gap: '18px', padding: '20px 12px', borderBottom: `1px solid ${HAIR2}`, alignItems: 'start', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', fontFamily: ARCHIVO, fontWeight: 800, fontSize: on ? '1.3rem' : '1.05rem', border: `1.5px solid ${on ? FROST : 'rgba(255,255,255,.22)'}`, background: on ? FROST : 'transparent', color: on ? FIELD : FROST, transition: 'all .2s ease', flexShrink: 0 }}>
                      {on ? '✓' : `0${i + 1}`.slice(-2)}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: '1.15rem', color: INK, textDecoration: on ? 'line-through' : 'none', opacity: on ? 0.5 : 1, transition: 'opacity .2s ease' }}>{s.t}</h3>
                      <p style={{ margin: '6px 0 0', color: MUTED, fontSize: '1rem', lineHeight: 1.55 }}>{s.b}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 04 FIELD NOTES */}
        <section id="notes" style={SECTION}>
          <div style={CONTAINER}>
            <SectionTag>04 / Field notes</SectionTag>
            <h2 style={h2Style}>What trips people up</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '14px', marginTop: '32px' }}>
              {NOTES.map((n) => (
                <div key={n.k} style={{ display: 'flex', gap: '16px', border: `1px solid ${HAIR}`, borderRadius: '13px', padding: '20px', background: 'rgba(255,255,255,.02)' }}>
                  <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontSize: '1.3rem', color: FROST, minWidth: '24px', lineHeight: 1 }}>{n.k}</span>
                  <div>
                    <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: '1.04rem', marginBottom: '6px' }}>{n.t}</div>
                    <p style={{ margin: 0, color: MUTED, fontSize: '.94rem', lineHeight: 1.55 }}>{n.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* footer */}
        <footer style={{ borderTop: `1px solid ${HAIR}`, background: `color-mix(in oklab,${FIELD} 70%,#06123a)`, padding: '60px 0' }}>
          <div style={{ ...CONTAINER, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: MONO, fontSize: '.66rem', letterSpacing: '.14em', textTransform: 'uppercase', color: MUTED, opacity: 0.8 }}>
              <span style={{ fontSize: '.9rem' }}>🧊🧊</span>{' '}
              <RouterLink to="/" style={{ color: FROST, textDecoration: 'none' }}>Ice Ice Maybe</RouterLink>
              &nbsp;/&nbsp; Open-Source Build &nbsp;/&nbsp; Off-Grid Ice
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: '.66rem', letterSpacing: '.14em', textTransform: 'uppercase', color: FROST, textDecoration: 'none', border: `1px solid ${HAIR}`, borderRadius: '8px', padding: '9px 14px' }}>
              Book build time →
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
