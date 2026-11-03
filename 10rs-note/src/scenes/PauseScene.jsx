import { gsap } from '../lib/gsap'
import { getChapter } from '../story/timeline'
import { followRoute, PAPER, useI18n, INK, WORLD, useScrollTimeline } from '../app/core'
import { Hand } from './Hand'
import { useRef } from 'react'

/* empty css                     */ var p = {
    room: `#C9D7E0`,
    shelf: `#8F5A33`,
    clay: `#B8643A`,
    clayDark: `#94502E`,
    night: `#2E2440`,
    temple: `#E6D3B3`,
    stone: `#CDB892`,
    wood: `#6B4428`,
    brass: `#C9A227`,
    red: `#B23A2E`,
    marigold: `#F29A2E`,
    marigold2: `#F2C230`,
  },
  m = 1e3,
  h = {
    x: 500,
    y: 612,
  },
  g = {
    dx: 0,
    dy: 26,
  }
function PauseScene({ section: n }) {
  let { t: r } = useI18n(),
    _ = useRef(null),
    v = getChapter(`pause`).keys,
    y = r.chapters.pause.caption
  useScrollTimeline(n, _, (t) => {
    let n = (e) => v.find((t) => Math.abs(t.at - e) < 1e-9)
    ;(gsap.set(`.pause__kid`, {
      x: v[0].x - 70,
      y: v[0].y + 22,
    }),
      gsap.set(`.pause__elder`, {
        x: WORLD.left,
        y: n(0.52).y + 22,
      }),
      gsap.set(`.pause__young`, {
        x: WORLD.right,
        y: n(0.56).y + 22,
      }),
      gsap.set(`.pause__envelope`, {
        x: n(0.52).x + g.dx,
        y: n(0.52).y + g.dy,
        rotation: n(0.52).rotate,
        opacity: 0,
        transformOrigin: `50% 50%`,
      }),
      gsap.set(`.pause__crack`, {
        strokeDashoffset: 1e3,
      }),
      gsap.set(`.pause__coin`, {
        opacity: 0,
      }),
      gsap.set(`.pause__dusk`, {
        opacity: 0,
      }),
      gsap.set(`.pause__page`, {
        transformOrigin: `50% 0%`,
      }),
      t
        .to(
          `.pause__strip`,
          {
            x: -1e3,
            duration: 0.08,
            ease: `power2.inOut`,
          },
          0.44,
        )
        .to(
          `.pause__strip`,
          {
            x: -2 * m,
            duration: 0.08,
            ease: `power2.inOut`,
          },
          0.6,
        ),
      t.to(
        `.pause__kid`,
        {
          x: WORLD.left,
          duration: 0.07,
          ease: `power2.in`,
        },
        0.07,
      ),
      t.fromTo(
        `.pause__sky`,
        {
          rotation: 0,
        },
        {
          rotation: 1080,
          svgOrigin: `230 560`,
          duration: 0.21,
          ease: `none`,
        },
        0.15,
      ),
      t.to(
        `.pause__page`,
        {
          rotation: -170,
          y: -40,
          opacity: 0,
          duration: 0.03,
          stagger: {
            each: 0.035,
            from: `end`,
          },
          ease: `power1.in`,
        },
        0.16,
      ),
      t
        .to(
          `.pause__crack`,
          {
            strokeDashoffset: 0,
            duration: 0.03,
          },
          0.34,
        )
        .to(
          `.pause__shard-l`,
          {
            x: -120,
            y: 80,
            rotation: -40,
            opacity: 0,
            svgOrigin: `${h.x} ${h.y}`,
            duration: 0.06,
            ease: `power2.out`,
          },
          0.38,
        )
        .to(
          `.pause__shard-r`,
          {
            x: 130,
            y: 70,
            rotation: 35,
            opacity: 0,
            svgOrigin: `${h.x} ${h.y}`,
            duration: 0.06,
            ease: `power2.out`,
          },
          0.38,
        )
        .to(
          `.pause__shard-t`,
          {
            y: -90,
            rotation: 20,
            opacity: 0,
            svgOrigin: `${h.x} ${h.y}`,
            duration: 0.06,
            ease: `power2.out`,
          },
          0.38,
        )
        .to(
          `.pause__crack`,
          {
            opacity: 0,
            duration: 0.01,
          },
          0.38,
        )
        .fromTo(
          `.pause__coin`,
          {
            x: 0,
            y: 0,
            opacity: 1,
          },
          {
            x: (e) => (e - 2.5) * 70,
            y: (e) => 110 + (e % 2) * 30,
            opacity: 1,
            duration: 0.06,
            ease: `power2.out`,
          },
          0.38,
        ),
      t
        .to(
          `.pause__elder`,
          {
            x: n(0.52).x - 70,
            duration: 0.06,
            ease: `power2.out`,
          },
          0.46,
        )
        .to(
          `.pause__envelope`,
          {
            opacity: 1,
            duration: 0.02,
          },
          0.5,
        )
        .to(
          `.pause__young`,
          {
            x: n(0.56).x + 70,
            duration: 0.05,
            ease: `power2.out`,
          },
          0.5,
        )
        .to(
          `.pause__elder`,
          {
            x: WORLD.left,
            duration: 0.05,
            ease: `power2.in`,
          },
          0.565,
        ),
      followRoute(t, `.pause__envelope`, v, 0.52, 0.56, g.dx, g.dy, !0),
      t.to(
        [`.pause__young`, `.pause__envelope`],
        {
          x: `+=1900`,
          duration: 0.07,
          ease: `power2.in`,
        },
        0.63,
      ),
      t
        .fromTo(
          `.pause__bell`,
          {
            rotation: -12,
            transformOrigin: `50% 0%`,
          },
          {
            rotation: 12,
            duration: 0.035,
            repeat: 5,
            yoyo: !0,
            ease: `sine.inOut`,
          },
          0.73,
        )
        .to(
          `.pause__dusk`,
          {
            opacity: 0.35,
            duration: 0.06,
          },
          0.76,
        )
        .to(
          `.pause__dusk`,
          {
            opacity: 0,
            duration: 0.06,
          },
          0.86,
        )
        .to(
          `.pause__box-glow`,
          {
            opacity: 1,
            duration: 0.03,
          },
          0.94,
        ),
      t
        .fromTo(
          `.pause__caption`,
          {
            y: 30,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.04,
            ease: `power3.out`,
          },
          0.16,
        )
        .to(
          `.pause__caption`,
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.04,
            ease: `power2.in`,
          },
          0.34,
        )
        .to(
          `.pause__caption`,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.04,
            ease: `power3.out`,
          },
          0.75,
        )
        .to(
          `.pause__caption`,
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.04,
            ease: `power2.in`,
          },
          0.92,
        ))
  })
  let b = (
    <g>
      <ellipse cx={h.x} cy={h.y} rx={120} ry={102} fill={p.clay} stroke={INK} strokeWidth={5} />
      <ellipse cx={h.x - 40} cy={h.y - 30} rx={30} ry={46} fill={PAPER} opacity={0.12} />
      <path
        d={`M${h.x - 80} ${h.y + 20} q 80 30 160 0`}
        fill={`none`}
        stroke={p.clayDark}
        strokeWidth={6}
      />
      <ellipse
        cx={h.x}
        cy={h.y - 104}
        rx={46}
        ry={18}
        fill={p.clayDark}
        stroke={INK}
        strokeWidth={5}
      />
      <rect x={h.x - 28} y={h.y - 110} width={56} height={10} rx={4} fill={INK} />
    </g>
  )
  return (
    <div
      ref={_}
      className={`scene-fill`}
      style={{
        background: p.room,
      }}
    >
      <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
        <defs>
          <clipPath id={`pause-window`}>
            <rect x={130} y={200} width={200} height={220} rx={6} />
          </clipPath>
          <clipPath id={`pause-shard-l`}>
            <path
              d={`M0 0 H${h.x - 10} L${h.x + 14} 560 L${h.x - 12} 610 L${h.x + 8} 660 L${h.x - 6} 1000 H0 Z`}
            />
          </clipPath>
          <clipPath id={`pause-shard-r`}>
            <path
              d={`M1000 560 H${h.x + 14} L${h.x - 12} 610 L${h.x + 8} 660 L${h.x - 6} 1000 H1000 Z`}
            />
          </clipPath>
          <clipPath id={`pause-shard-t`}>
            <path d={`M${h.x - 10} 0 H1000 V560 H${h.x + 14} Z`} />
          </clipPath>
          <radialGradient id={`pause-diya`}>
            <stop offset={`0`} stopColor={`#FFD27A`} stopOpacity={`0.9`} />
            <stop offset={`1`} stopColor={`#FFD27A`} stopOpacity={`0`} />
          </radialGradient>
        </defs>
        <g className={`pause__strip`}>
          <rect x={-900} y={-800} width={1900} height={1600} fill={p.room} />
          <g clipPath={`url(#pause-window)`}>
            <g className={`pause__sky`}>
              <path d={`M-70 560 A300 300 0 0 1 530 560 Z`} fill={`#9CC7E0`} />
              <path d={`M-70 560 A300 300 0 0 0 530 560 Z`} fill={`#22304A`} />
              <circle cx={230} cy={330} r={34} fill={`#F6D27A`} stroke={INK} strokeWidth={3} />
              <circle cx={230} cy={790} r={26} fill={PAPER} stroke={INK} strokeWidth={3} />
              {[
                [150, 700],
                [300, 740],
                [200, 820],
                [320, 680],
              ].map(([e, t]) => (
                <circle cx={e} cy={t} r={3} fill={PAPER} key={`${e}${t}`} />
              ))}
            </g>
          </g>
          <rect
            x={130}
            y={200}
            width={200}
            height={220}
            rx={6}
            fill={`none`}
            stroke={INK}
            strokeWidth={6}
          />
          <line x1={230} y1={200} x2={230} y2={420} stroke={INK} strokeWidth={5} />
          <line x1={130} y1={310} x2={330} y2={310} stroke={INK} strokeWidth={5} />
          <g>
            <rect
              x={690}
              y={196}
              width={170}
              height={210}
              rx={6}
              fill={PAPER}
              stroke={INK}
              strokeWidth={4}
            />
            <rect
              x={690}
              y={196}
              width={170}
              height={40}
              rx={6}
              fill={p.red}
              stroke={INK}
              strokeWidth={4}
            />
            <text
              x={775}
              y={340}
              textAnchor={`middle`}
              fill={INK}
              fontFamily={`Fraunces, serif`}
              fontWeight={800}
              fontSize={86}
            >
              ७
            </text>
            {[`६`, `५`, `४`, `३`, `२`, `१`].map((e, t) => (
              <g
                className={`pause__page`}
                style={{
                  transformBox: `fill-box`,
                }}
                key={e}
              >
                <rect
                  x={690}
                  y={236}
                  width={170}
                  height={170}
                  fill={t % 2 ? `#F7F1E3` : PAPER}
                  stroke={INK}
                  strokeWidth={3}
                />
                <text
                  x={775}
                  y={340}
                  textAnchor={`middle`}
                  fill={INK}
                  fontFamily={`Fraunces, serif`}
                  fontWeight={800}
                  fontSize={86}
                >
                  {e}
                </text>
              </g>
            ))}
            <circle cx={720} cy={216} r={6} fill={INK} />
            <circle cx={830} cy={216} r={6} fill={INK} />
          </g>
          <rect
            x={-900}
            y={714}
            width={1900}
            height={30}
            fill={p.shelf}
            stroke={INK}
            strokeWidth={4}
          />
          <rect x={-900} y={744} width={1900} height={900} fill={`#A9BDC8`} />
          <g className={`pause__shard-l`} clipPath={`url(#pause-shard-l)`}>
            {b}
          </g>
          <g className={`pause__shard-r`} clipPath={`url(#pause-shard-r)`}>
            {b}
          </g>
          <g className={`pause__shard-t`} clipPath={`url(#pause-shard-t)`}>
            {b}
          </g>
          <path
            className={`pause__crack`}
            d={`M${h.x - 10} ${h.y - 100} L${h.x + 14} 560 L${h.x - 12} 610 L${h.x + 8} 660 L${h.x - 6} ${h.y + 100}`}
            pathLength={1e3}
            strokeDasharray={`1000 1000`}
            fill={`none`}
            stroke={INK}
            strokeWidth={5}
            strokeLinejoin={`round`}
          />
          {Array.from(
            {
              length: 6,
            },
            (e, t) => (
              <circle
                className={`pause__coin`}
                cx={h.x}
                cy={h.y}
                r={16}
                fill={p.brass}
                stroke={INK}
                strokeWidth={3}
                key={t}
              />
            ),
          )}
          <g transform={`translate(${m} 0)`}>
            <rect x={0} y={-800} width={m} height={1600} fill={p.night} />
            <path
              d={`M0 120 Q 500 260 1000 120`}
              fill={`none`}
              stroke={PAPER}
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            {Array.from(
              {
                length: 14,
              },
              (e, t) => {
                let n = 30 + t * 72,
                  r = 120 + Math.sin((t / 13) * Math.PI) * 120
                return (
                  <circle
                    cx={n}
                    cy={r + 8}
                    r={9}
                    fill={[`#F2C230`, `#D8432F`, `#7CF0A0`, `#F29A2E`][t % 4]}
                    key={t}
                  />
                )
              },
            )}
            <rect x={0} y={740} width={m} height={900} fill={`#5A3A2A`} />
            <g transform={`translate(500 860)`}>
              {[120, 90, 60, 32].map((e, t) => (
                <circle
                  r={e}
                  fill={[`#D8432F`, `#F2C230`, `#2F8F5B`, `#F3EAD7`][t]}
                  stroke={INK}
                  strokeWidth={3}
                  key={e}
                />
              ))}
              {Array.from(
                {
                  length: 8,
                },
                (e, t) => (
                  <ellipse
                    cx={0}
                    cy={-92}
                    rx={14}
                    ry={26}
                    fill={`#9C5BA8`}
                    stroke={INK}
                    strokeWidth={2}
                    transform={`rotate(${t * 45})`}
                    key={t}
                  />
                ),
              )}
            </g>
            {[90, 250, 750, 910].map((e) => (
              <g key={e}>
                <circle cx={e} cy={700} r={60} fill={`url(#pause-diya)`} />
                <path
                  d={`M${e - 34} 724 Q ${e} 758 ${e + 34} 724 Z`}
                  fill={p.clay}
                  stroke={INK}
                  strokeWidth={3}
                />
                <path
                  d={`M${e} 690 q 10 18 0 34 q -10 -16 0 -34`}
                  fill={`#FFB43A`}
                  stroke={INK}
                  strokeWidth={2}
                />
              </g>
            ))}
          </g>
          {[1, 2].map((e) => (
            <line x1={e * m} y1={-800} x2={e * m} y2={1600} stroke={INK} strokeWidth={6} key={e} />
          ))}
          <g transform={`translate(${2 * m} 0)`}>
            <rect x={0} y={-800} width={2 * m} height={1600} fill={p.temple} />
            <path
              d={`M200 760 V 330 Q 200 150 500 120 Q 800 150 800 330 V 760`}
              fill={p.stone}
              stroke={INK}
              strokeWidth={6}
            />
            <path
              d={`M260 760 V 360 Q 260 210 500 190 Q 740 210 740 360 V 760`}
              fill={`#E9C27E`}
              stroke={INK}
              strokeWidth={4}
            />
            {[0, 1].map((e) => (
              <g key={e}>
                {Array.from(
                  {
                    length: 14,
                  },
                  (t, n) => {
                    let r = 230 + n * 41,
                      i = 210 + e * 50 + Math.sin((n / 13) * Math.PI) * 60
                    return (
                      <circle
                        cx={r}
                        cy={i}
                        r={14}
                        fill={n % 2 ? p.marigold : p.marigold2}
                        stroke={INK}
                        strokeWidth={2}
                        key={n}
                      />
                    )
                  },
                )}
              </g>
            ))}
            <g className={`pause__bell`}>
              <line x1={500} y1={130} x2={500} y2={312} stroke={INK} strokeWidth={4} />
              <path
                d={`M455 380 Q 455 312 500 312 Q 545 312 545 380 L 556 400 H 444 Z`}
                fill={p.brass}
                stroke={INK}
                strokeWidth={4}
              />
              <circle cx={500} cy={410} r={9} fill={p.brass} stroke={INK} strokeWidth={3} />
            </g>
            <rect
              className={`pause__box-glow`}
              x={290}
              y={540}
              width={420}
              height={230}
              rx={30}
              fill={`#FFD27A`}
              opacity={0}
            />
            <rect
              x={320}
              y={565}
              width={360}
              height={190}
              rx={8}
              fill={p.wood}
              stroke={INK}
              strokeWidth={5}
            />
            <rect
              x={320}
              y={565}
              width={360}
              height={26}
              rx={6}
              fill={p.brass}
              stroke={INK}
              strokeWidth={4}
            />
            <rect x={466} y={570} width={68} height={12} rx={4} fill={INK} />
            <text
              x={500}
              y={690}
              textAnchor={`middle`}
              fill={p.marigold2}
              fontFamily={`Mukta, sans-serif`}
              fontWeight={700}
              fontSize={46}
            >
              दान पेटी
            </text>
            <rect x={0} y={755} width={2 * m} height={900} fill={`#A99470`} />
            <rect
              className={`pause__dusk`}
              x={0}
              y={-800}
              width={2 * m}
              height={2400}
              fill={`#22304A`}
              opacity={0}
            />
          </g>
        </g>
        <g className={`pause__kid`}>
          <Hand skin={`#C68B59`} sleeve={`#F4F4F4`} cuff={`#2B3F6B`} />
        </g>
        <g className={`pause__envelope`}>
          <rect
            x={-104}
            y={-52}
            width={208}
            height={104}
            rx={6}
            fill={p.red}
            stroke={INK}
            strokeWidth={4}
          />
          <path d={`M-104 -52 L0 6 L104 -52`} fill={`none`} stroke={p.marigold2} strokeWidth={4} />
          <text
            x={0}
            y={42}
            textAnchor={`middle`}
            fill={p.marigold2}
            fontFamily={`Mukta, sans-serif`}
            fontWeight={700}
            fontSize={28}
          >
            शुभ
          </text>
        </g>
        <g className={`pause__elder`}>
          <Hand skin={`#8E5A35`} sleeve={`#E08A2E`} cuff={`#F2C230`} />
        </g>
        <g className={`pause__young`}>
          <Hand skin={`#C68B59`} sleeve={`#D46A8C`} cuff={`#B4506F`} flip={!0} />
        </g>
      </svg>
      {y && (
        <div className={`stage-text scene-caption-pos`}>
          <p
            className={`pause__caption scene-caption`}
            style={{
              color: `var(--ink)`,
            }}
          >
            {y}
          </p>
        </div>
      )}
    </div>
  )
}

export { PauseScene }
