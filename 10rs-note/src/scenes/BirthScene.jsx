import { gsap } from '../lib/gsap'
import { PAPER, useI18n, INK, seededRandom, useScrollTimeline } from '../app/core'
import { NoteStack, NoteFace } from './NoteFace'
import { useMemo, useRef } from 'react'

/* empty css                     */ var f = 0.5,
  p = [286, 500, 714],
  m = [453, 560, 667],
  h = 4,
  g = {
    x: 166,
    y: 392,
    w: 668,
    h: 336,
  },
  _ = {
    x: 770,
    y: 612,
  },
  v = [
    {
      layer: `base`,
      ink: `#6B4A2E`,
      at: 0.2,
    },
    {
      layer: `pattern`,
      ink: `#C9B48F`,
      at: 0.3,
    },
    {
      layer: `print`,
      ink: `#F3EAD7`,
      at: 0.4,
    },
  ],
  y = 0.1,
  b = 120,
  x = 880,
  S = `ABCDEFGHJKLMNPRSTUVWXYZ`
function BirthScene({ section: t }) {
  let { t: n } = useI18n(),
    C = useRef(null),
    T = n.chapters.birth.caption,
    { cells: E, fibres: D } = useMemo(() => {
      let e = seededRandom(1)
      return {
        cells: m.flatMap((t) =>
          p.map((n) => ({
            cx: n,
            cy: t,
            serial: `${1 + Math.floor(e() * 9)}${S[Math.floor(e() * 23)]}${S[Math.floor(e() * 23)]} ${String(Math.floor(e() * 1e6)).padStart(6, `0`)}`,
          })),
        ),
        fibres: Array.from(
          {
            length: 46,
          },
          () => ({
            x: g.x + 20 + e() * (g.w - 40),
            y: g.y + 20 + e() * (g.h - 40),
            r: e() * 180,
            fromX: 60 + e() * 120,
            fromY: 470 + e() * 140,
          }),
        ),
      }
    }, [])
  useScrollTimeline(t, C, (t) => {
    ;(gsap.set(`.birth__sheet`, {
      opacity: 0,
    }),
      gsap.set(`.birth__roller`, {
        x: b,
        opacity: 0,
      }),
      gsap.set(
        [`.birth__clip-base`, `.birth__clip-pattern`, `.birth__clip-print`, `.birth__clip-serial`],
        {
          attr: {
            width: 0,
          },
        },
      ),
      gsap.set([`.birth__glow`, `.birth__cuts`, `.birth__bundle`, `.birth__band`], {
        opacity: 0,
      }),
      gsap.set(`.birth__band`, {
        scaleY: 0,
        transformOrigin: `50% 0%`,
      }),
      t
        .fromTo(
          `.birth__gear-a`,
          {
            rotation: 0,
          },
          {
            rotation: 360,
            svgOrigin: `90 160`,
            duration: 1,
          },
          0,
        )
        .fromTo(
          `.birth__gear-b`,
          {
            rotation: 0,
          },
          {
            rotation: -540,
            svgOrigin: `905 150`,
            duration: 1,
          },
          0,
        ),
      t
        .fromTo(
          `.birth__fibre`,
          {
            x: (e) => D[e].fromX - D[e].x,
            y: (e) => D[e].fromY - D[e].y,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.12,
            stagger: 0.0015,
            ease: `power2.out`,
          },
          0.01,
        )
        .to(
          `.birth__sheet`,
          {
            opacity: 1,
            duration: 0.06,
          },
          0.13,
        )
        .to(
          `.birth__fibre`,
          {
            opacity: 0,
            duration: 0.05,
          },
          0.16,
        )
        .to(
          `.birth__cotton`,
          {
            opacity: 0.25,
            duration: 0.1,
          },
          0.1,
        ),
      v.forEach((e, n) => {
        let r = `.birth__roller-${n}`
        t.to(
          r,
          {
            opacity: 1,
            duration: 0.015,
          },
          e.at - 0.015,
        )
          .to(
            r,
            {
              x,
              duration: y,
              ease: `power1.inOut`,
            },
            e.at,
          )
          .to(
            `${r} .birth__stripes`,
            {
              y: -120,
              duration: y,
              ease: `power1.inOut`,
            },
            e.at,
          )
          .to(
            `.birth__clip-${e.layer}`,
            {
              attr: {
                width: 760,
              },
              duration: y,
              ease: `power1.inOut`,
            },
            e.at,
          )
          .to(
            r,
            {
              opacity: 0,
              duration: 0.015,
            },
            e.at + y,
          )
      }),
      t
        .to(
          `.birth__clip-serial`,
          {
            attr: {
              width: 760,
            },
            duration: 0.07,
            ease: `steps(9)`,
          },
          0.5,
        )
        .to(
          `.birth__glow`,
          {
            opacity: 1,
            duration: 0.03,
          },
          0.55,
        )
        .set(
          `.birth__cell-${h}`,
          {
            opacity: 0,
          },
          0.6,
        )
        .to(
          `.birth__glow`,
          {
            opacity: 0,
            duration: 0.04,
          },
          0.64,
        ),
      t
        .fromTo(
          `.birth__caption`,
          {
            y: 30,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.06,
            ease: `power3.out`,
          },
          0.58,
        )
        .to(
          `.birth__caption`,
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.06,
            ease: `power2.in`,
          },
          0.92,
        ),
      t
        .fromTo(
          `.birth__blade`,
          {
            y: 0,
            opacity: 0,
          },
          {
            y: g.h + 30,
            opacity: 1,
            duration: 0.05,
            ease: `power2.in`,
          },
          0.62,
        )
        .to(
          `.birth__cuts`,
          {
            opacity: 1,
            duration: 0.01,
          },
          0.64,
        )
        .to(
          `.birth__blade`,
          {
            opacity: 0,
            duration: 0.01,
          },
          0.67,
        )
        .to(
          `.birth__sheet`,
          {
            opacity: 0,
            duration: 0.03,
          },
          0.68,
        )
        .to(
          `.birth__cuts`,
          {
            opacity: 0,
            duration: 0.03,
          },
          0.68,
        ),
      E.forEach((e, n) => {
        n !== h &&
          t.to(
            `.birth__cell-${n}`,
            {
              x: (e.cx - 500) * 0.08,
              y: (e.cy - 560) * 0.08,
              duration: 0.04,
              ease: `power2.out`,
            },
            0.68,
          )
      }),
      t.to(
        `.birth__bundle`,
        {
          opacity: 1,
          duration: 0.03,
        },
        0.76,
      ),
      E.map((e, t) => ({
        c: e,
        i: t,
      }))
        .filter(({ i: e }) => e !== h)
        .forEach(({ c: e, i: n }, r) => {
          let i = 0.74 + r * 0.012
          t.to(
            `.birth__cell-${n}`,
            {
              x: _.x - e.cx,
              y: _.y - e.cy,
              duration: 0.05,
              ease: `power2.inOut`,
            },
            i,
          ).to(
            `.birth__cell-${n}`,
            {
              opacity: 0,
              duration: 0.01,
            },
            i + 0.05,
          )
        }),
      t.to(
        `.birth__band`,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.05,
          ease: `power2.out`,
        },
        0.88,
      ))
  })
  let O = (e, t) => (
    <g clipPath={`url(#birth-clip-${e})`} key={e}>
      <NoteFace cx={t.cx} cy={t.cy} scale={f} layers={[e]} serial={t.serial} />
    </g>
  )
  return (
    <div
      ref={C}
      className={`scene-fill`}
      style={{
        background: `#E9DCC1`,
      }}
    >
      <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
        <defs>
          {[`base`, `pattern`, `print`, `serial`].map((e) => (
            <clipPath id={`birth-clip-${e}`} key={e}>
              <rect className={`birth__clip-${e}`} x={b} y={g.y - 10} width={0} height={g.h + 20} />
            </clipPath>
          ))}
        </defs>
        <rect x={-900} y={-800} width={2800} height={1080} fill={`#E9DCC1`} />
        <rect x={-900} y={280} width={2800} height={1200} fill={`#CFC0A3`} />
        <line x1={-900} y1={280} x2={1900} y2={280} stroke={INK} strokeWidth={4} />
        <CmpW className={`birth__gear-a`} cx={90} cy={160} r={110} teeth={14} />
        <CmpW className={`birth__gear-b`} cx={905} cy={150} r={74} teeth={10} />
        <path d={`M-900 70 H 1900`} stroke={`#B7A684`} strokeWidth={18} />
        <path d={`M-900 70 H 1900`} stroke={INK} strokeWidth={2} strokeDasharray={`2 60`} />
        <rect
          x={130}
          y={360}
          width={740}
          height={406}
          rx={14}
          fill={`#3B3530`}
          stroke={INK}
          strokeWidth={4}
        />
        <rect x={142} y={372} width={716} height={382} rx={8} fill={`#4A433C`} />
        <g className={`birth__cotton`}>
          {[
            [70, 520],
            [128, 560],
            [86, 610],
            [150, 500],
            [176, 616],
          ].map(([e, t], n) => (
            <g key={n}>
              <path
                d={`M${e - 12} ${t + 22} l12 -12 l12 12 z`}
                fill={`#6E7E3A`}
                stroke={INK}
                strokeWidth={2}
              />
              <circle cx={e - 9} cy={t} r={14} fill={`#FBF7EE`} stroke={INK} strokeWidth={2.5} />
              <circle cx={e + 9} cy={t} r={14} fill={`#FBF7EE`} stroke={INK} strokeWidth={2.5} />
              <circle cx={e} cy={t - 12} r={15} fill={`#FBF7EE`} stroke={INK} strokeWidth={2.5} />
            </g>
          ))}
        </g>
        <rect
          className={`birth__sheet`}
          x={g.x}
          y={g.y}
          width={g.w}
          height={g.h}
          rx={4}
          fill={`#F7F1E3`}
          stroke={INK}
          strokeWidth={3}
        />
        {D.map((e, t) => (
          <path
            className={`birth__fibre`}
            d={`M${e.x - 10} ${e.y} q 10 -8 20 0`}
            transform={`rotate(${e.r} ${e.x} ${e.y})`}
            fill={`none`}
            stroke={`#FBF7EE`}
            strokeWidth={3}
            strokeLinecap={`round`}
            key={t}
          />
        ))}
        <g>
          {E.map((e, t) => (
            <g className={`birth__cell-${t}`} key={t}>
              {[`base`, `pattern`, `print`, `serial`].map((t) => O(t, e))}
            </g>
          ))}
        </g>
        <g className={`birth__cuts`} stroke={INK} strokeWidth={2} strokeDasharray={`8 6`}>
          {[393, 607].map((e) => (
            <line x1={e} y1={g.y} x2={e} y2={g.y + g.h} key={e} />
          ))}
          {[506.5, 613.5].map((e) => (
            <line x1={g.x} y1={e} x2={g.x + g.w} y2={e} key={e} />
          ))}
        </g>
        <rect
          className={`birth__glow`}
          x={394}
          y={508}
          width={212}
          height={104}
          rx={8}
          fill={`none`}
          stroke={`#F2B544`}
          strokeWidth={6}
        />
        <g className={`birth__bundle`}>
          <NoteStack cx={_.x} cy={_.y} scale={0.45} count={12} spread={3.4} />
          <rect
            className={`birth__band`}
            x={_.x - 22}
            y={_.y + 30}
            width={44}
            height={60}
            fill={PAPER}
            stroke={INK}
            strokeWidth={2.5}
          />
        </g>
        <g className={`birth__blade`}>
          <rect
            x={g.x - 30}
            y={g.y - 24}
            width={g.w + 60}
            height={14}
            fill={`#A9A49A`}
            stroke={INK}
            strokeWidth={3}
          />
        </g>
        {v.map((e, t) => (
          <g className={`birth__roller birth__roller-${t}`} key={t}>
            <rect
              x={-26}
              y={346}
              width={52}
              height={434}
              rx={14}
              fill={e.ink}
              stroke={INK}
              strokeWidth={4}
            />
            <clipPath id={`birth-roller-clip-${t}`}>
              <rect x={-26} y={346} width={52} height={434} rx={14} />
            </clipPath>
            <g clipPath={`url(#birth-roller-clip-${t})`}>
              <g className={`birth__stripes`} stroke={INK} strokeOpacity={0.22} strokeWidth={4}>
                {Array.from(
                  {
                    length: 22,
                  },
                  (e, t) => (
                    <line x1={-26} x2={26} y1={346 + t * 30} y2={346 + t * 30} key={t} />
                  ),
                )}
              </g>
            </g>
            <rect
              x={-8}
              y={330}
              width={16}
              height={18}
              fill={`#6E6A63`}
              stroke={INK}
              strokeWidth={3}
            />
            <rect
              x={-8}
              y={778}
              width={16}
              height={18}
              fill={`#6E6A63`}
              stroke={INK}
              strokeWidth={3}
            />
          </g>
        ))}
      </svg>
      {T && (
        <div className={`stage-text scene-caption-pos`}>
          <p className={`birth__caption scene-caption`}>{T}</p>
        </div>
      )}
    </div>
  )
}
function CmpW({ className: e, cx: t, cy: n, r, teeth: i }) {
  return (
    <g className={e}>
      {Array.from(
        {
          length: i,
        },
        (e, o) => (
          <rect
            x={t - 10}
            y={n - r - 16}
            width={20}
            height={28}
            rx={3}
            fill={`#B7A684`}
            stroke={INK}
            strokeWidth={3}
            transform={`rotate(${(360 / i) * o} ${t} ${n})`}
            key={o}
          />
        ),
      )}
      <circle cx={t} cy={n} r={r} fill={`#B7A684`} stroke={INK} strokeWidth={4} />
      <circle cx={t} cy={n} r={r * 0.35} fill={`#CFC0A3`} stroke={INK} strokeWidth={4} />
      <circle cx={t} cy={n} r={r * 0.1} fill={INK} />
    </g>
  )
}

export { BirthScene }
