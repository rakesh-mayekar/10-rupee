import './ChaiScene.css'
import { gsap } from '../lib/gsap'
import { getChapter } from '../story/timeline'
import { followRoute, PAPER, useI18n, INK, WORLD, useScrollTimeline } from '../app/core'
import { Hand } from './Hand'
import { useRef } from 'react'

var p = {
    wall: `#E4B26A`,
    wallShade: `#D69C52`,
    wainscot: `#C98A47`,
    counterTop: `#7A4A2A`,
    counterLip: `#9A6440`,
    counterFront: `#8F5A33`,
    stripe: `#2F8F5B`,
    red: `#B23A2E`,
    gold: `#F6D27A`,
    steel: `#C9C6BF`,
    steelDark: `#9F9A90`,
    kettle: `#BDB6AA`,
    chai: `#B5651D`,
    glass: `rgba(255,255,255,0.32)`,
    workerSkin: `#B7774B`,
    workerSleeve: `#3E6A9E`,
    workerCuff: `#2F527D`,
    wallahSkin: `#8E5A35`,
    wallahSleeve: `#EDE6D6`,
    wallahCuff: `#D9D0BC`,
  },
  m = {
    dx: -70,
    dy: 22,
  },
  h = {
    dx: 70,
    dy: 22,
  },
  g = 560,
  _ = 385,
  v = 760
function ChaiScene({ section: n }) {
  let { t: r } = useI18n(),
    y = useRef(null),
    b = getChapter(`chai`).keys,
    x = r.chapters.chai.caption
  return (
    useScrollTimeline(n, y, (t) => {
      let n = `.chai__worker`,
        r = `.chai__wallah`,
        a = `.chai__glass`
      ;(gsap.set(n, {
        x: b[0].x + m.dx,
        y: b[0].y + m.dy,
      }),
        gsap.set(r, {
          x: WORLD.right,
          y: 720,
        }),
        gsap.set(a, {
          x: g,
          y: v,
        }),
        gsap.set(`.chai__liquid`, {
          scaleY: 0,
          transformOrigin: `50% 100%`,
        }),
        gsap.set(`.chai__stream`, {
          strokeDashoffset: 1e3,
        }),
        gsap.set(`.chai__steam path`, {
          opacity: 0,
          y: 0,
        }),
        gsap.set(`.chai__ting`, {
          opacity: 0,
        }),
        t
          .fromTo(
            `.chai__caption`,
            {
              y: 30,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.1,
              ease: `power3.out`,
            },
            0.02,
          )
          .to(
            `.chai__caption`,
            {
              y: -20,
              autoAlpha: 0,
              duration: 0.08,
              ease: `power2.in`,
            },
            0.9,
          ),
        followRoute(t, n, b, 0, 0.12, m.dx, m.dy),
        t
          .to(
            `.chai__kettle`,
            {
              x: -30,
              y: -110,
              rotation: -22,
              svgOrigin: `860 560`,
              duration: 0.1,
              ease: `power2.inOut`,
            },
            0.13,
          )
          .to(
            `.chai__stream`,
            {
              strokeDashoffset: 0,
              duration: 0.05,
            },
            0.22,
          )
          .to(
            `.chai__liquid`,
            {
              scaleY: 0.82,
              duration: 0.17,
              ease: `power1.out`,
            },
            0.25,
          )
          .to(
            `.chai__stream`,
            {
              strokeDashoffset: -1e3,
              duration: 0.05,
            },
            0.41,
          )
          .to(
            `.chai__kettle`,
            {
              x: 0,
              y: 0,
              rotation: 0,
              svgOrigin: `860 560`,
              duration: 0.08,
              ease: `power2.inOut`,
            },
            0.43,
          )
          .to(
            `.chai__steam path`,
            {
              opacity: 0.7,
              duration: 0.08,
              stagger: 0.02,
            },
            0.3,
          )
          .to(
            `.chai__steam path`,
            {
              y: -46,
              duration: 0.6,
              stagger: 0.03,
            },
            0.3,
          ),
        t
          .to(
            r,
            {
              x: 612,
              y: 724,
              duration: 0.05,
              ease: `power2.out`,
            },
            0.44,
          )
          .to(
            r,
            {
              x: 437,
              duration: 0.07,
              ease: `power2.inOut`,
            },
            0.49,
          )
          .to(
            a,
            {
              x: _,
              duration: 0.07,
              ease: `power2.inOut`,
            },
            0.49,
          )
          .fromTo(
            `.chai__ting`,
            {
              opacity: 0,
              scale: 0.6,
              transformOrigin: `50% 50%`,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.02,
            },
            0.56,
          )
          .to(
            `.chai__ting`,
            {
              opacity: 0,
              duration: 0.04,
            },
            0.59,
          ),
        followRoute(t, n, b, 0.55, 0.62, m.dx, m.dy))
      let o = b.find((e) => e.at === 0.72)
      ;(t.to(
        r,
        {
          x: o.x + h.dx,
          y: o.y + h.dy,
          duration: 0.08,
          ease: `power2.inOut`,
        },
        0.62,
      ),
        followRoute(t, r, b, 0.72, 0.87, h.dx, h.dy),
        t.to(
          r,
          {
            x: WORLD.right,
            y: 690,
            duration: 0.11,
            ease: `power2.in`,
          },
          0.88,
        ),
        t
          .to(
            n,
            {
              x: 335,
              y: 722,
              duration: 0.12,
              ease: `power2.inOut`,
            },
            0.66,
          )
          .to(
            [n],
            {
              x: WORLD.left,
              y: 470,
              duration: 0.13,
              ease: `power2.in`,
            },
            0.86,
          )
          .to(
            a,
            {
              x: WORLD.left + 50,
              y: 508,
              duration: 0.13,
              ease: `power2.in`,
            },
            0.86,
          ))
    }),
    (
      <div ref={y} className={`chai`}>
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <defs>
            <radialGradient id={`chai-glow`}>
              <stop offset={`0`} stopColor={`#FFE9B0`} stopOpacity={`0.9`} />
              <stop offset={`1`} stopColor={`#FFE9B0`} stopOpacity={`0`} />
            </radialGradient>
            <clipPath id={`chai-glass-clip`}>
              <path d={`M-30 -84 L30 -84 L23 0 L-23 0 Z`} />
            </clipPath>
          </defs>
          <rect x={-900} y={-800} width={2800} height={1600} fill={p.wall} />
          {Array.from(
            {
              length: 30,
            },
            (e, t) => (
              <line
                x1={-880 + t * 95}
                y1={-800}
                x2={-880 + t * 95}
                y2={560}
                stroke={INK}
                strokeOpacity={0.07}
                strokeWidth={3}
                key={t}
              />
            ),
          )}
          <rect x={-900} y={560} width={2800} height={220} fill={p.wainscot} />
          <line x1={-900} y1={560} x2={1900} y2={560} stroke={INK} strokeWidth={4} />
          <circle cx={880} cy={226} r={170} fill={`url(#chai-glow)`} />
          <line x1={880} y1={-800} x2={880} y2={198} stroke={INK} strokeWidth={3} />
          <rect x={869} y={192} width={22} height={18} fill={INK} />
          <circle cx={880} cy={226} r={19} fill={`#FFF3CF`} stroke={INK} strokeWidth={3} />
          <g transform={`translate(112 262) rotate(-3)`}>
            <rect x={4} y={6} width={262} height={104} rx={8} fill={INK} opacity={0.25} />
            <rect width={262} height={104} rx={8} fill={p.red} stroke={INK} strokeWidth={4} />
            <rect
              x={10}
              y={10}
              width={242}
              height={84}
              rx={4}
              fill={`none`}
              stroke={p.gold}
              strokeWidth={2}
              strokeDasharray={`10 6`}
            />
            <text x={26} y={74} className={`chai__sign-hi`} fill={PAPER}>
              चाय
            </text>
            <text x={240} y={72} className={`chai__sign-price`} fill={p.gold} textAnchor={`end`}>
              ₹10
            </text>
            <circle cx={18} cy={18} r={4} fill={INK} />
            <circle cx={244} cy={18} r={4} fill={INK} />
          </g>
          <path d={`M560 330 Q 770 372 1000 318`} fill={`none`} stroke={INK} strokeWidth={2.5} />
          {[
            {
              x: 610,
              y: 347,
              c: `#D8432F`,
              r: -6,
            },
            {
              x: 680,
              y: 359,
              c: `#F2C230`,
              r: 3,
            },
            {
              x: 750,
              y: 364,
              c: `#3A78C2`,
              r: -2,
            },
            {
              x: 820,
              y: 360,
              c: `#2F8F5B`,
              r: 5,
            },
            {
              x: 890,
              y: 348,
              c: `#D8432F`,
              r: -4,
            },
            {
              x: 955,
              y: 331,
              c: `#F2C230`,
              r: 2,
            },
          ].map((e, t) => (
            <g transform={`translate(${e.x} ${e.y}) rotate(${e.r})`} key={t}>
              <rect
                x={-24}
                y={0}
                width={48}
                height={70}
                rx={4}
                fill={e.c}
                stroke={INK}
                strokeWidth={3}
              />
              <rect x={-24} y={0} width={48} height={12} fill={INK} opacity={0.2} />
              <circle cx={0} cy={38} r={11} fill={PAPER} opacity={0.85} />
            </g>
          ))}
          <g>
            <rect
              x={52}
              y={612}
              width={92}
              height={148}
              rx={16}
              fill={`#D6EAE6`}
              fillOpacity={0.75}
              stroke={INK}
              strokeWidth={4}
            />
            {[0, 1, 2, 3].map((e) => (
              <rect
                x={64}
                y={638 + e * 28}
                width={68}
                height={20}
                rx={4}
                fill={`#D49A54`}
                stroke={INK}
                strokeWidth={2}
                key={e}
              />
            ))}
            <rect
              x={46}
              y={596}
              width={104}
              height={22}
              rx={6}
              fill={p.red}
              stroke={INK}
              strokeWidth={4}
            />
            <rect
              x={160}
              y={650}
              width={78}
              height={110}
              rx={14}
              fill={`#D6EAE6`}
              fillOpacity={0.75}
              stroke={INK}
              strokeWidth={4}
            />
            {[0, 1, 2].map((e) => (
              <circle
                cx={180 + (e % 2) * 34}
                cy={690 + e * 22}
                r={13}
                fill={`#E6B65C`}
                stroke={INK}
                strokeWidth={2}
                key={e}
              />
            ))}
            <rect
              x={154}
              y={636}
              width={90}
              height={20}
              rx={6}
              fill={p.stripe}
              stroke={INK}
              strokeWidth={4}
            />
          </g>
          <g>
            <path
              d={`M832 676 q8 -16 14 -2 q6 -20 14 0 q8 -14 12 2 z`}
              fill={`#4C8BD6`}
              stroke={INK}
              strokeWidth={2}
            />
            <rect
              x={740}
              y={688}
              width={240}
              height={72}
              rx={6}
              fill={`#2B2621`}
              stroke={INK}
              strokeWidth={4}
            />
            <circle cx={772} cy={724} r={11} fill={p.steelDark} stroke={INK} strokeWidth={3} />
            <circle cx={948} cy={724} r={11} fill={p.steelDark} stroke={INK} strokeWidth={3} />
          </g>
          {[425, 490].map((e) => (
            <g transform={`translate(${e} ${v})`} key={e}>
              <path
                d={`M-30 -84 L30 -84 L23 0 L-23 0 Z`}
                fill={p.glass}
                stroke={INK}
                strokeWidth={3.5}
              />
              <line
                x1={-13}
                y1={-78}
                x2={-10}
                y2={-6}
                stroke={PAPER}
                strokeWidth={3}
                opacity={0.6}
              />
            </g>
          ))}
          <g>
            <path
              d={`M600 712 L612 696 L722 696 L710 712 Z`}
              fill={p.steelDark}
              stroke={INK}
              strokeWidth={3}
            />
            <rect
              x={614}
              y={694}
              width={42}
              height={9}
              fill={`#8E6BB0`}
              stroke={INK}
              strokeWidth={1.5}
              transform={`rotate(-4 635 698)`}
            />
            <rect
              x={652}
              y={693}
              width={44}
              height={9}
              fill={`#6B4A2E`}
              stroke={INK}
              strokeWidth={1.5}
              transform={`rotate(5 674 697)`}
            />
            <rect
              x={630}
              y={699}
              width={46}
              height={9}
              fill={`#C9C24B`}
              stroke={INK}
              strokeWidth={1.5}
              transform={`rotate(2 653 703)`}
            />
            <circle cx={700} cy={703} r={6} fill={p.gold} stroke={INK} strokeWidth={1.5} />
            <rect
              x={600}
              y={712}
              width={110}
              height={48}
              fill={p.steel}
              stroke={INK}
              strokeWidth={4}
            />
            <line
              x1={606}
              y1={724}
              x2={704}
              y2={724}
              stroke={PAPER}
              strokeWidth={3}
              opacity={0.7}
            />
          </g>
          <g className={`chai__kettle`}>
            <path
              d={`M795 640 Q 760 620 735 585`}
              fill={`none`}
              stroke={INK}
              strokeWidth={16}
              strokeLinecap={`round`}
            />
            <path
              d={`M795 640 Q 760 620 735 585`}
              fill={`none`}
              stroke={p.kettle}
              strokeWidth={9}
              strokeLinecap={`round`}
            />
            <path
              d={`M815 582 Q 818 510 860 506 Q 902 510 905 582`}
              fill={`none`}
              stroke={INK}
              strokeWidth={9}
            />
            <path
              d={`M785 690 Q 778 600 820 582 L900 582 Q 942 600 935 690 Z`}
              fill={p.kettle}
              stroke={INK}
              strokeWidth={4}
            />
            <rect
              x={818}
              y={568}
              width={84}
              height={16}
              rx={6}
              fill={p.steelDark}
              stroke={INK}
              strokeWidth={3}
            />
            <circle cx={860} cy={562} r={7} fill={INK} />
            <path
              d={`M800 640 Q 860 652 920 640`}
              fill={`none`}
              stroke={PAPER}
              strokeWidth={4}
              opacity={0.5}
            />
            <g transform={`translate(896 494) rotate(160)`}>
              <Hand skin={p.wallahSkin} sleeve={p.wallahSleeve} cuff={p.wallahCuff} grip={!0} />
            </g>
          </g>
          <path
            className={`chai__stream`}
            d={`M723 520 C 690 515 600 560 562 676`}
            pathLength={1e3}
            strokeDasharray={`1000 1000`}
            fill={`none`}
            stroke={p.chai}
            strokeWidth={7}
            strokeLinecap={`round`}
          />
          <g className={`chai__glass`}>
            <g
              className={`chai__steam`}
              stroke={PAPER}
              strokeWidth={4}
              fill={`none`}
              strokeLinecap={`round`}
            >
              <path d={`M-12 -100 q-10 -18 0 -36 q10 -18 0 -36`} />
              <path d={`M6 -96 q-10 -18 0 -36 q10 -18 0 -36`} />
              <path d={`M22 -104 q-8 -14 0 -28 q8 -14 0 -28`} />
            </g>
            <g clipPath={`url(#chai-glass-clip)`}>
              <rect
                className={`chai__liquid`}
                x={-32}
                y={-84}
                width={64}
                height={84}
                fill={p.chai}
              />
            </g>
            <path
              d={`M-30 -84 L30 -84 L23 0 L-23 0 Z`}
              fill={p.glass}
              stroke={INK}
              strokeWidth={3.5}
            />
            <line x1={-13} y1={-78} x2={-10} y2={-6} stroke={PAPER} strokeWidth={3} opacity={0.6} />
            <g
              className={`chai__ting`}
              stroke={INK}
              strokeWidth={3.5}
              strokeLinecap={`round`}
              opacity={0}
            >
              <line x1={-46} y1={-96} x2={-60} y2={-112} />
              <line x1={-54} y1={-70} x2={-74} y2={-72} />
              <line x1={-46} y1={-44} x2={-62} y2={-34} />
            </g>
          </g>
          <g className={`chai__worker`}>
            <Hand skin={p.workerSkin} sleeve={p.workerSleeve} cuff={p.workerCuff} />
          </g>
          <g className={`chai__wallah`}>
            <Hand skin={p.wallahSkin} sleeve={p.wallahSleeve} cuff={p.wallahCuff} flip={!0} />
          </g>
          <rect
            x={-900}
            y={v}
            width={2800}
            height={34}
            fill={p.counterTop}
            stroke={INK}
            strokeWidth={4}
          />
          <rect x={-900} y={764} width={2800} height={6} fill={p.counterLip} />
          <rect x={-900} y={794} width={2800} height={1e3} fill={p.counterFront} />
          <rect x={-900} y={834} width={2800} height={22} fill={p.stripe} />
          <line x1={-900} y1={834} x2={1900} y2={834} stroke={INK} strokeWidth={3} />
          <line x1={-900} y1={856} x2={1900} y2={856} stroke={INK} strokeWidth={3} />
        </svg>
        {x && (
          <div className={`stage-text chai__caption-pos`}>
            <p className={`chai__caption`}>{x}</p>
          </div>
        )}
      </div>
    )
  )
}

export { ChaiScene }
