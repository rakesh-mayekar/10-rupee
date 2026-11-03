import { gsap } from '../lib/gsap'
import { PAPER, useI18n, INK, seededRandom, WORLD, useScrollTimeline } from '../app/core'
import { Hand } from './Hand'
import { NoteFace } from './NoteFace'
import { useMemo, useRef } from 'react'

/* empty css                     */ var p = {
    office: `#D9CBB0`,
    machine: `#3B4A45`,
    machineLight: `#56675F`,
    steel: `#A9A49A`,
    brick: `#6B4A2E`,
    hall: `#E9DCC1`,
    roller: `#6B4A2E`,
    wall: `#E4B26A`,
    counter: `#8F5A33`,
    red: `#B23A2E`,
    gold: `#F6D27A`,
    ok: `#2F8F5B`,
  },
  m = 1e3,
  h = {
    x: 400,
    y: 650,
    w: 200,
    h: 150,
  }
function EndScene({ section: t }) {
  let { t: n } = useI18n(),
    g = useRef(null),
    _ = n.chapters.end,
    { shreds: v, qr: y } = useMemo(() => {
      let e = seededRandom(9),
        t = Array.from(
          {
            length: 28,
          },
          (t, n) => ({
            x: h.x + 14 + e() * (h.w - 28),
            y: h.y + 30 + e() * (h.h - 50),
            r: -40 + e() * 80,
            c: [`#6B4A2E`, `#80593A`, `#5A3E26`, `#F3EAD7`, `#9A7350`][n % 5],
          }),
        ),
        n = (e, t) => (e < 7 && t < 7) || (e < 7 && t >= 14) || (e >= 14 && t < 7),
        r = []
      for (let t = 0; t < 21; t++)
        for (let i = 0; i < 21; i++)
          if (n(t, i)) {
            let e = t % 14 === t ? t : t - 14,
              n = i < 7 ? i : i - 14
            ;(e === 0 || e === 6 || n === 0 || n === 6 || (e >= 2 && e <= 4 && n >= 2 && n <= 4)) &&
              r.push({
                r: t,
                c: i,
              })
          } else
            e() > 0.52 &&
              r.push({
                r: t,
                c: i,
              })
      return {
        shreds: t,
        qr: r,
      }
    }, [])
  return (
    useScrollTimeline(t, g, (t) => {
      ;(gsap.set(`.end__shred`, {
        y: -220,
        opacity: 0,
      }),
        gsap.set(`.end__brick`, {
          x: -220,
          opacity: 0,
        }),
        gsap.set(`.end__ram`, {
          y: -120,
        }),
        gsap.set(`.end__fresh`, {
          y: -250,
        }),
        gsap.set(`.end__spark`, {
          scale: 0,
          transformOrigin: `50% 50%`,
        }),
        gsap.set(`.end__customer`, {
          x: WORLD.left,
          y: 650,
        }),
        gsap.set(`.end__wallah`, {
          x: WORLD.right,
          y: 700,
        }),
        gsap.set(`.end__chai`, {
          x: 0,
        }),
        gsap.set([`.end__screen-ok`, `.end__ding`], {
          opacity: 0,
        }),
        t.fromTo(
          `.end__blade`,
          {
            rotation: 0,
          },
          {
            rotation: 720,
            transformOrigin: `50% 50%`,
            duration: 0.26,
            ease: `none`,
          },
          0,
        ),
        t.to(
          `.end__shred`,
          {
            y: 0,
            opacity: 1,
            duration: 0.05,
            stagger: 0.005,
            ease: `power1.in`,
          },
          0.12,
        ),
        t
          .to(
            `.end__ram`,
            {
              y: 0,
              duration: 0.05,
              ease: `power3.in`,
            },
            0.28,
          )
          .to(
            `.end__shreds`,
            {
              scaleY: 0.25,
              transformOrigin: `50% 100%`,
              duration: 0.05,
              ease: `power3.in`,
            },
            0.28,
          )
          .to(
            `.end__ram`,
            {
              y: -120,
              duration: 0.04,
              ease: `power2.out`,
            },
            0.34,
          )
          .to(
            `.end__shreds`,
            {
              opacity: 0,
              duration: 0.01,
            },
            0.35,
          )
          .to(
            `.end__brick`,
            {
              x: 0,
              opacity: 1,
              duration: 0.06,
              ease: `power2.out`,
            },
            0.35,
          ),
        t
          .fromTo(
            `.end__caption`,
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
            0.25,
          )
          .to(
            `.end__caption`,
            {
              y: -20,
              autoAlpha: 0,
              duration: 0.04,
              ease: `power2.in`,
            },
            0.43,
          ),
        t
          .to(
            `.end__strip`,
            {
              x: -1e3,
              duration: 0.08,
              ease: `power2.inOut`,
            },
            0.44,
          )
          .fromTo(
            `.end__rollers circle.end__turn`,
            {
              rotation: 0,
            },
            {
              rotation: 360,
              transformOrigin: `50% 50%`,
              duration: 0.12,
              ease: `none`,
            },
            0.5,
          )
          .to(
            `.end__fresh`,
            {
              y: 0,
              duration: 0.1,
              ease: `power1.out`,
            },
            0.52,
          )
          .to(
            `.end__spark`,
            {
              scale: 1,
              duration: 0.02,
              stagger: 0.01,
              ease: `back.out(3)`,
            },
            0.6,
          )
          .to(
            `.end__spark`,
            {
              scale: 0,
              duration: 0.02,
              stagger: 0.01,
            },
            0.64,
          ),
        t
          .to(
            `.end__strip`,
            {
              x: -2 * m,
              duration: 0.08,
              ease: `power2.inOut`,
            },
            0.66,
          )
          .to(
            `.end__customer`,
            {
              x: 620,
              y: 600,
              duration: 0.07,
              ease: `power2.out`,
            },
            0.75,
          )
          .to(
            `.end__screen-ok`,
            {
              opacity: 1,
              duration: 0.01,
            },
            0.83,
          )
          .fromTo(
            `.end__ding`,
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
            0.83,
          )
          .to(
            `.end__ding`,
            {
              opacity: 0,
              duration: 0.03,
            },
            0.87,
          )
          .to(
            `.end__wallah`,
            {
              x: 520,
              y: 708,
              duration: 0.05,
              ease: `power2.out`,
            },
            0.85,
          )
          .to(
            `.end__chai`,
            {
              x: -150,
              duration: 0.05,
              ease: `power2.inOut`,
            },
            0.9,
          )
          .to(
            `.end__wallah`,
            {
              x: 370,
              duration: 0.05,
              ease: `power2.inOut`,
            },
            0.9,
          )
          .to(
            `.end__customer`,
            {
              x: WORLD.left,
              duration: 0.08,
              ease: `power2.in`,
            },
            0.9,
          ),
        t.fromTo(
          `.end__kicker`,
          {
            y: 30,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.05,
            ease: `power3.out`,
          },
          0.88,
        ))
    }),
    (
      <div
        ref={g}
        className={`scene-fill`}
        style={{
          background: p.office,
        }}
      >
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <g className={`end__strip`}>
            <rect x={-900} y={-800} width={1900} height={1600} fill={p.office} />
            <g>
              <rect
                x={110}
                y={150}
                width={180}
                height={90}
                rx={6}
                fill={`#E8DFCB`}
                stroke={INK}
                strokeWidth={4}
              />
              <path d={`M120 166 L200 136 L280 166`} fill={`none`} stroke={INK} strokeWidth={4} />
              <text
                x={200}
                y={222}
                textAnchor={`middle`}
                fill={INK}
                fontFamily={`Fraunces, serif`}
                fontWeight={800}
                fontSize={40}
              >
                RBI
              </text>
            </g>
            <rect
              x={380}
              y={425}
              width={240}
              height={215}
              rx={10}
              fill={p.machine}
              stroke={INK}
              strokeWidth={5}
            />
            <rect
              x={366}
              y={408}
              width={268}
              height={24}
              rx={6}
              fill={p.machineLight}
              stroke={INK}
              strokeWidth={4}
            />
            <rect x={412} y={416} width={176} height={8} rx={3} fill={INK} />
            <rect
              x={420}
              y={460}
              width={160}
              height={100}
              rx={8}
              fill={`#1E2623`}
              stroke={INK}
              strokeWidth={4}
            />
            {[460, 540].map((e) => (
              <g className={`end__blade`} key={e}>
                <circle cx={e} cy={510} r={30} fill={p.steel} stroke={INK} strokeWidth={3} />
                {Array.from(
                  {
                    length: 8,
                  },
                  (t, n) => (
                    <rect
                      x={e - 4}
                      y={472}
                      width={8}
                      height={14}
                      fill={p.steel}
                      stroke={INK}
                      strokeWidth={2}
                      transform={`rotate(${n * 45} ${e} 510)`}
                      key={n}
                    />
                  ),
                )}
                <circle cx={e} cy={510} r={8} fill={INK} />
              </g>
            ))}
            <rect x={430} y={620} width={140} height={12} rx={4} fill={INK} />
            <rect
              className={`end__ram`}
              x={h.x + 6}
              y={h.y - 40}
              width={h.w - 12}
              height={30}
              rx={4}
              fill={p.steel}
              stroke={INK}
              strokeWidth={4}
            />
            <g className={`end__shreds`}>
              {v.map((e, t) => (
                <rect
                  className={`end__shred`}
                  x={e.x - 3}
                  y={e.y - 20}
                  width={7}
                  height={40}
                  fill={e.c}
                  stroke={INK}
                  strokeWidth={1.5}
                  transform={`rotate(${e.r} ${e.x} ${e.y})`}
                  key={t}
                />
              ))}
            </g>
            <rect
              x={h.x}
              y={h.y}
              width={h.w}
              height={h.h}
              rx={6}
              fill={`rgba(255,255,255,0.18)`}
              stroke={INK}
              strokeWidth={4}
            />
            <g>
              {[0, 1, 2].map((e) => (
                <rect
                  x={700 + (e % 2) * 20}
                  y={770 - e * 44}
                  width={150}
                  height={40}
                  rx={4}
                  fill={p.brick}
                  stroke={INK}
                  strokeWidth={3}
                  key={e}
                />
              ))}
              <g className={`end__brick`}>
                <rect
                  x={710}
                  y={638}
                  width={150}
                  height={40}
                  rx={4}
                  fill={p.brick}
                  stroke={INK}
                  strokeWidth={3}
                />
                {[730, 760, 800, 830].map((e, t) => (
                  <circle cx={e} cy={650 + (t % 2) * 14} r={3} fill={PAPER} opacity={0.5} key={e} />
                ))}
              </g>
            </g>
            <rect x={-900} y={810} width={1900} height={900} fill={`#5E5850`} />
            <g transform={`translate(${m} 0)`}>
              <rect x={0} y={-800} width={m} height={1600} fill={p.hall} />
              <line x1={0} y1={-800} x2={0} y2={1600} stroke={INK} strokeWidth={6} />
              <rect x={0} y={810} width={m} height={900} fill={`#CFC0A3`} />
              <clipPath id={`end-fresh-clip`}>
                <rect x={0} y={330} width={m} height={700} />
              </clipPath>
              <g clipPath={`url(#end-fresh-clip)`}>
                <g className={`end__fresh`}>
                  <NoteFace cx={500} cy={540} scale={0.5} serial={`1AA 000001`} />
                  <ellipse
                    cx={485}
                    cy={541}
                    rx={11}
                    ry={17}
                    fill={`#CFE6F2`}
                    fillOpacity={0.85}
                    stroke={PAPER}
                    strokeWidth={2}
                  />
                  <path d={`M480 530 q3 -4 6 0`} fill={`none`} stroke={`#FFFFFF`} strokeWidth={2} />
                </g>
              </g>
              <g className={`end__rollers`}>
                <rect
                  x={300}
                  y={260}
                  width={400}
                  height={56}
                  rx={28}
                  fill={p.roller}
                  stroke={INK}
                  strokeWidth={5}
                />
                <rect
                  x={300}
                  y={310}
                  width={400}
                  height={56}
                  rx={28}
                  fill={`#80593A`}
                  stroke={INK}
                  strokeWidth={5}
                />
                {[310, 690].map((e) => (
                  <circle
                    className={`end__turn`}
                    cx={e}
                    cy={313}
                    r={34}
                    fill={p.steel}
                    stroke={INK}
                    strokeWidth={4}
                    strokeDasharray={`10 8`}
                    key={e}
                  />
                ))}
              </g>
              {[
                [370, 470],
                [640, 500],
                [610, 610],
                [390, 620],
              ].map(([e, t], n) => (
                <path
                  className={`end__spark`}
                  d={`M${e} ${t - 16} L${e + 4} ${t - 4} L${e + 16} ${t} L${e + 4} ${t + 4} L${e} ${t + 16} L${e - 4} ${t + 4} L${e - 16} ${t} L${e - 4} ${t - 4} Z`}
                  fill={p.gold}
                  stroke={INK}
                  strokeWidth={2}
                  key={n}
                />
              ))}
            </g>
            <g transform={`translate(${2 * m} 0)`}>
              <rect x={0} y={-800} width={2 * m} height={1600} fill={p.wall} />
              <line x1={0} y1={-800} x2={0} y2={1600} stroke={INK} strokeWidth={6} />
              <rect x={0} y={560} width={2 * m} height={200} fill={`#C98A47`} />
              <line x1={0} y1={560} x2={2 * m} y2={560} stroke={INK} strokeWidth={4} />
              <g transform={`translate(130 250) rotate(-3)`}>
                <rect width={250} height={100} rx={8} fill={p.red} stroke={INK} strokeWidth={4} />
                <text
                  x={24}
                  y={72}
                  fill={PAPER}
                  fontFamily={`Mukta, sans-serif`}
                  fontWeight={700}
                  fontSize={60}
                >
                  चाय
                </text>
                <text
                  x={232}
                  y={70}
                  fill={p.gold}
                  fontFamily={`Fraunces, serif`}
                  fontWeight={800}
                  fontSize={44}
                  textAnchor={`end`}
                >
                  ₹10
                </text>
              </g>
              <g>
                <rect
                  x={230}
                  y={712}
                  width={150}
                  height={48}
                  fill={`#C9C6BF`}
                  stroke={INK}
                  strokeWidth={4}
                />
                <path
                  d={`M230 712 L244 694 L394 694 L380 712 Z`}
                  fill={`#9F9A90`}
                  stroke={INK}
                  strokeWidth={3}
                />
                <g transform={`translate(312 700) scale(1 0.45) translate(-312 -700)`}>
                  <NoteFace cx={312} cy={700} scale={0.3} />
                </g>
              </g>
              <g>
                <path
                  d={`M600 760 L620 520 L780 520 L800 760`}
                  fill={`#F3EAD7`}
                  stroke={INK}
                  strokeWidth={4}
                />
                <rect x={630} y={540} width={140} height={34} rx={4} fill={`#2F5D50`} />
                <text
                  x={700}
                  y={566}
                  textAnchor={`middle`}
                  fill={PAPER}
                  fontFamily={`Mukta, sans-serif`}
                  fontWeight={700}
                  fontSize={24}
                >
                  UPI
                </text>
                <g transform={`translate(642 586) scale(5.6)`}>
                  {y.map((e) => (
                    <rect
                      x={e.c}
                      y={e.r}
                      width={1.02}
                      height={1.02}
                      fill={INK}
                      key={`${e.r}-${e.c}`}
                    />
                  ))}
                </g>
              </g>
              <g className={`end__chai`}>
                <path
                  d={`M455 676 L515 676 L508 760 L462 760 Z`}
                  fill={`#B5651D`}
                  stroke={INK}
                  strokeWidth={3.5}
                />
                <path d={`M455 676 L515 676 L512 690 L458 690 Z`} fill={`#E9C27E`} />
                <path
                  d={`M472 660 q-8 -14 0 -28 M492 656 q-8 -14 0 -28`}
                  fill={`none`}
                  stroke={PAPER}
                  strokeWidth={4}
                  strokeLinecap={`round`}
                />
              </g>
              <rect
                x={0}
                y={760}
                width={2 * m}
                height={34}
                fill={`#7A4A2A`}
                stroke={INK}
                strokeWidth={4}
              />
              <rect x={0} y={794} width={2 * m} height={900} fill={p.counter} />
              <rect x={0} y={834} width={2 * m} height={22} fill={`#2F8F5B`} />
            </g>
          </g>
          <g className={`end__customer`}>
            <g transform={`rotate(-8)`}>
              <Hand skin={`#B7774B`} sleeve={`#6B8F71`} cuff={`#557459`} />
            </g>
            <g transform={`translate(40 -60) rotate(-8)`}>
              <rect x={-34} y={-62} width={68} height={124} rx={12} fill={INK} />
              <rect x={-28} y={-52} width={56} height={100} rx={6} fill={`#BFD8E2`} />
              <g className={`end__screen-ok`}>
                <rect x={-28} y={-52} width={56} height={100} rx={6} fill={p.ok} />
                <path
                  d={`M-14 -2 l10 10 l20 -22`}
                  fill={`none`}
                  stroke={PAPER}
                  strokeWidth={6}
                  strokeLinecap={`round`}
                  strokeLinejoin={`round`}
                />
                <text
                  x={0}
                  y={36}
                  textAnchor={`middle`}
                  fill={PAPER}
                  fontFamily={`Fraunces, serif`}
                  fontWeight={800}
                  fontSize={16}
                >
                  ₹10
                </text>
              </g>
            </g>
            <g className={`end__ding`} stroke={INK} strokeWidth={4} strokeLinecap={`round`}>
              <line x1={90} y1={-130} x2={104} y2={-148} />
              <line x1={100} y1={-100} x2={124} y2={-104} />
              <line x1={-10} y1={-140} x2={-18} y2={-160} />
            </g>
          </g>
          <g className={`end__wallah`}>
            <Hand skin={`#8E5A35`} sleeve={`#EDE6D6`} cuff={`#D9D0BC`} flip={!0} />
          </g>
        </svg>
        {_.caption && (
          <div className={`stage-text scene-caption-pos`}>
            <p className={`end__caption scene-caption`}>{_.caption}</p>
          </div>
        )}
        {_.kicker && (
          <div className={`stage-text scene-caption-pos`}>
            <p
              className={`end__kicker scene-caption`}
              style={{
                fontSize: `clamp(1.5rem, calc(62 * var(--u)), 4rem)`,
              }}
            >
              {_.kicker}
            </p>
          </div>
        )}
      </div>
    )
  )
}

export { EndScene }
