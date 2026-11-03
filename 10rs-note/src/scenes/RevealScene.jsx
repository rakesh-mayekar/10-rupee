import './RevealScene.css'
import { gsap } from '../lib/gsap'
import { ROUTE, CHAPTERS, ROUTE_START, ROUTE_END } from '../story/timeline'
import { getSerial, PAPER, useI18n, INK, useScrollTimeline } from '../app/core'
import { useMemo, useRef } from 'react'

/* empty css                     */ var m = {
  night: `#1B1712`,
  street: `#F3EAD7`,
  river: `#1F2F3A`,
  route: `#F2B544`,
  badge: `#2A231C`,
}
function RevealScene({ section: i }) {
  let { t: a, lang: c } = useI18n(),
    u = useRef(null),
    h = useRef(null),
    _ = useMemo(getSerial, []),
    v = CHAPTERS[CHAPTERS.length - 1],
    y = v.trades * 10,
    b = y / 10,
    x = useMemo(() => new Intl.NumberFormat(c === `hi` ? `hi-IN` : `en-IN`), [c]),
    S = `M${ROUTE.map((e) => `${e.x} ${e.y}`).join(` L`)}`
  return (
    useScrollTimeline(i, u, (n) => {
      ;(gsap.set(`.reveal__stop`, {
        scale: 0,
        transformOrigin: `50% 50%`,
      }),
        gsap.set([`.reveal__route`, `.reveal__glow`], {
          strokeDashoffset: 1e3,
        }),
        gsap.set(`.reveal__line`, {
          autoAlpha: 0,
          y: 20,
        }),
        n.to(
          [`.reveal__route`, `.reveal__glow`],
          {
            strokeDashoffset: 0,
            duration: ROUTE_END - ROUTE_START,
            ease: `none`,
          },
          ROUTE_START,
        ),
        ROUTE.forEach((e, t) => {
          n.to(
            `.reveal__stop-${t}`,
            {
              scale: 1,
              duration: 0.02,
              ease: `back.out(3)`,
            },
            e.at - 0.004,
          )
        }),
        n
          .to(
            `.reveal__glow`,
            {
              strokeWidth: 40,
              strokeOpacity: 0.45,
              duration: 0.03,
              yoyo: !0,
              repeat: 1,
            },
            0.55,
          )
          .to(
            `.reveal__map`,
            {
              opacity: 0.16,
              duration: 0.05,
            },
            0.6,
          ))
      let i = {
        v: 0,
      }
      n.to(
        `.reveal__line-serial`,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.03,
        },
        0.61,
      )
        .to(
          `.reveal__line-amount`,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.03,
          },
          0.62,
        )
        .to(
          i,
          {
            v: y,
            duration: 0.12,
            ease: `power2.out`,
            onUpdate: () => {
              h.current && (h.current.textContent = `₹${x.format(Math.round(i.v))}`)
            },
          },
          0.62,
        )
        .to(
          `.reveal__line-moved`,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.03,
          },
          0.66,
        )
        .to(
          `.reveal__line-times`,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.03,
          },
          0.74,
        )
        .to(
          `.reveal__line-stats`,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.03,
          },
          0.77,
        )
        .to(
          `.reveal__line-caption`,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.04,
            ease: `back.out(2)`,
          },
          0.8,
        )
    }),
    (
      <div
        ref={u}
        className={`scene-fill`}
        style={{
          background: m.night,
        }}
      >
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <g className={`reveal__map`}>
            <g stroke={m.street} strokeOpacity={0.07} strokeWidth={14}>
              {Array.from(
                {
                  length: 15,
                },
                (e, t) => (
                  <line x1={-700 + t * 170} y1={-800} x2={-700 + t * 170} y2={1800} key={`v${t}`} />
                ),
              )}
              {Array.from(
                {
                  length: 16,
                },
                (e, t) => (
                  <line x1={-900} y1={-700 + t * 160} x2={1900} y2={-700 + t * 160} key={`h${t}`} />
                ),
              )}
            </g>
            <path
              d={`M-900 590 C -300 520, 300 640, 1000 520 S 1700 480, 1900 500 L 1900 560 C 1300 560, 900 650, 500 650 S -300 640, -900 690 Z`}
              fill={m.river}
            />
            <path
              className={`reveal__glow`}
              d={S}
              pathLength={1e3}
              strokeDasharray={`1000 1000`}
              fill={`none`}
              stroke={m.route}
              strokeOpacity={0.22}
              strokeWidth={22}
              strokeLinecap={`round`}
              strokeLinejoin={`round`}
            />
            <path
              className={`reveal__route`}
              d={S}
              pathLength={1e3}
              strokeDasharray={`1000 1000`}
              fill={`none`}
              stroke={m.route}
              strokeWidth={6}
              strokeLinecap={`round`}
              strokeLinejoin={`round`}
            />
            {ROUTE.map((e, t) => (
              <g className={`reveal__stop reveal__stop-${t}`} key={e.id}>
                {e.rush ? (
                  <circle cx={e.x} cy={e.y} r={9} fill={m.route} />
                ) : (
                  <>
                    <circle
                      cx={e.x}
                      cy={e.y}
                      r={30}
                      fill={m.badge}
                      stroke={m.route}
                      strokeWidth={4}
                    />
                    <g transform={`translate(${e.x} ${e.y})`}>
                      <CmpG id={e.id} />
                    </g>
                  </>
                )}
              </g>
            ))}
          </g>
        </svg>
        <div className={`reveal__block`} aria-hidden={`true`}>
          <p className={`reveal__line reveal__line-serial`}>{a.reveal.serial(_)}</p>
          <p className={`reveal__line reveal__line-amount`}>
            <span ref={h}>₹0</span>
          </p>
          <p className={`reveal__line reveal__line-moved`}>{a.reveal.moved}</p>
          <p className={`reveal__line reveal__line-times`}>{a.reveal.times(b)}</p>
          <p className={`reveal__line reveal__line-stats`}>{a.reveal.stats(v.hands, v.day)}</p>
          <p className={`reveal__line reveal__line-caption`}>{a.chapters.reveal.caption}</p>
        </div>
      </div>
    )
  )
}
function CmpG({ id: e }) {
  let t = {
    stroke: PAPER,
    strokeWidth: 3.5,
    fill: `none`,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  }
  switch (e) {
    case `press`:
      return (
        <g {...t}>
          <circle r={11} />
          <circle r={3} fill={PAPER} />
          {[0, 60, 120, 180, 240, 300].map((e) => (
            <line x1={0} y1={-11} x2={0} y2={-16} transform={`rotate(${e})`} key={e} />
          ))}
        </g>
      )
    case `rbi`:
      return (
        <path
          {...t}
          d={`M-14 -4 L0 -13 L14 -4 M-11 -2 V10 M-4 -2 V10 M4 -2 V10 M11 -2 V10 M-15 12 H15`}
        />
      )
    case `chest`:
      return (
        <g {...t}>
          <circle r={12} />
          <path d={`M0 -12 V12 M-12 0 H12`} />
        </g>
      )
    case `bank`:
      return (
        <text
          x={0}
          y={9}
          textAnchor={`middle`}
          fill={PAPER}
          fontFamily={`Fraunces, serif`}
          fontWeight={800}
          fontSize={26}
        >
          ₹
        </text>
      )
    case `chai`:
      return <path {...t} d={`M-9 -11 H9 L6 12 H-6 Z M-4 -17 q-3 -4 0 -7 M3 -17 q-3 -4 0 -7`} />
    case `milk`:
      return <path {...t} d={`M-8 -6 H8 V12 H-8 Z M-5 -12 H5 V-6 H-5 Z`} />
    case `auto`:
      return (
        <path
          {...t}
          d={`M-14 6 V-6 Q-12 -12 -4 -12 H8 Q14 -10 14 -2 V6 Z M-8 12 a3 3 0 1 0 0.1 0 M8 12 a3 3 0 1 0 0.1 0`}
        />
      )
    case `sabzi`:
      return (
        <g {...t}>
          <circle cy={3} r={10} />
          <path d={`M-5 -8 L0 -5 L5 -8`} />
        </g>
      )
    case `canteen`:
      return <path {...t} d={`M-13 10 L0 -12 L13 10 Z`} />
    case `kirana`:
      return <path {...t} d={`M-12 -12 H12 V12 H-12 Z M-12 0 H12 M-4 -12 V0 M4 0 V12`} />
    case `gullak`:
      return <path {...t} d={`M-12 4 a12 10 0 1 0 24 0 a12 10 0 1 0 -24 0 M-5 -8 H5`} />
    case `festival`:
      return <path {...t} d={`M-12 4 Q0 14 12 4 Z M0 -2 q5 -6 0 -12 q-5 6 0 12`} />
    case `temple`:
      return <path {...t} d={`M-10 10 Q-10 -8 0 -8 Q10 -8 10 10 Z M0 -8 V-14 M-12 10 H12`} />
    case `sorter`:
      return (
        <path
          d={`M-9 -9 L9 9 M9 -9 L-9 9`}
          stroke={`#E24A3B`}
          strokeWidth={5}
          strokeLinecap={`round`}
        />
      )
    default:
      return <circle r={5} fill={INK} />
  }
}

export { RevealScene }
