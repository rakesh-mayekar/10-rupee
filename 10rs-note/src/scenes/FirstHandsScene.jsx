import { gsap } from '../lib/gsap'
import { getChapter } from '../story/timeline'
import { followRoute, PAPER, useI18n, INK, WORLD, useScrollTimeline } from '../app/core'
import { Hand } from './Hand'
import { NoteFace } from './NoteFace'
import { useRef } from 'react'

/* empty css                     */ var m = {
    wall: `#EADFC8`,
    behind: `#CDBFA4`,
    frame: `#8F5A33`,
    sign: `#2F5D50`,
    glass: `rgba(190, 220, 232, 0.38)`,
    machine: `#E6E2DA`,
    machineDark: `#B9B3A8`,
    led: `#1B2A22`,
    ledOn: `#7CF0A0`,
    tellerCounter: `#A9957A`,
    counterTop: `#8B8478`,
    counterFront: `#6F675C`,
    tellerSkin: `#C68B59`,
    tellerSleeve: `#DCE6F2`,
    tellerCuff: `#C3D0E0`,
    workerSkin: `#B7774B`,
    workerSleeve: `#3E6A9E`,
    workerCuff: `#2F527D`,
  },
  h = {
    x: 560,
    y: 336,
  },
  g = {
    x: 560,
    y: 546,
  },
  _ = 5,
  v = 0.7,
  y = 0.53,
  b = {
    dx: 0,
    dy: -46,
  },
  x = {
    dx: -50,
    dy: 36,
  }
function FirstHandsScene({ section: n }) {
  let { t: r } = useI18n(),
    S = useRef(null),
    C = getChapter(`first-hands`).keys,
    w = r.chapters[`first-hands`].caption
  return (
    useScrollTimeline(n, S, (t) => {
      for (let t = 0; t < _; t++)
        gsap.set(`.fh__fly-${t}`, {
          x: h.x,
          y: h.y + (t + 1) * 4,
          scaleY: v,
          transformOrigin: `50% 50%`,
        })
      ;(gsap.set(`.fh__teller`, {
        x: 560,
        y: WORLD.top,
      }),
        gsap.set(`.fh__worker`, {
          x: 60 - (WORLD.bottom - 1150) * 0.53,
          y: WORLD.bottom,
        }),
        gsap.set(`.fh__digit`, {
          opacity: 0,
        }),
        gsap.set(`.fh__digit-0`, {
          opacity: 1,
        }),
        gsap.set(`.fh__whirr`, {
          opacity: 0,
        }),
        t
          .fromTo(
            `.fh__minute`,
            {
              rotation: 0,
            },
            {
              rotation: 540,
              svgOrigin: `330 268`,
              duration: 1,
            },
            0,
          )
          .fromTo(
            `.fh__hour`,
            {
              rotation: 300,
            },
            {
              rotation: 345,
              svgOrigin: `330 268`,
              duration: 1,
            },
            0,
          ),
        t
          .to(
            `.fh__whirr`,
            {
              opacity: 1,
              duration: 0.01,
            },
            0.14,
          )
          .to(
            `.fh__whirr`,
            {
              opacity: 0,
              duration: 0.01,
            },
            0.42,
          ),
        t.fromTo(
          `.fh__whirr`,
          {
            x: -4,
          },
          {
            x: 4,
            duration: 0.02,
            repeat: 13,
            yoyo: !0,
            ease: `none`,
          },
          0.14,
        ))
      for (let e = 0; e < _; e++) {
        let n = 4 - e,
          r = 0.15 + e * 0.042
        t.to(
          `.fh__fly-${n}`,
          {
            y: g.y + 6 - e * 3,
            scaleY: y,
            duration: 0.03,
            ease: `power1.in`,
          },
          r,
        )
          .set(
            `.fh__digit-${e}`,
            {
              opacity: 0,
            },
            r + 0.03,
          )
          .set(
            `.fh__digit-${e + 1}`,
            {
              opacity: 1,
            },
            r + 0.03,
          )
      }
      t.set(
        `.fh__digit-${_}`,
        {
          opacity: 0,
        },
        0.41,
      ).set(
        `.fh__digit-6`,
        {
          opacity: 1,
        },
        0.41,
      )
      let n = C.find((e) => e.at === 0.5)
      ;(t.to(
        `.fh__teller`,
        {
          x: n.x + b.dx,
          y: n.y + b.dy,
          duration: 0.06,
          ease: `power2.out`,
        },
        0.44,
      ),
        followRoute(t, `.fh__teller`, C, 0.5, 0.62, b.dx, b.dy),
        t.to(
          `.fh__teller`,
          {
            x: 600,
            y: WORLD.top,
            duration: 0.1,
            ease: `power2.in`,
          },
          0.63,
        ),
        followRoute(t, `.fh__pile`, C, 0.5, 0.62, -g.x, -g.y))
      let r = C.find((e) => e.at === 0.7)
      ;(t.to(
        `.fh__worker`,
        {
          x: r.x + x.dx,
          y: r.y + x.dy,
          duration: 0.12,
          ease: `power2.out`,
        },
        0.56,
      ),
        followRoute(t, `.fh__worker`, C, 0.7, 1, x.dx, x.dy),
        followRoute(t, `.fh__pile`, C, 0.7, 0.86, -g.x, -g.y),
        t.to(
          `.fh__pile`,
          {
            opacity: 0,
            duration: 0.06,
          },
          0.76,
        ),
        t
          .fromTo(
            `.fh__caption`,
            {
              y: 30,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.08,
              ease: `power3.out`,
            },
            0.02,
          )
          .to(
            `.fh__caption`,
            {
              y: -20,
              autoAlpha: 0,
              duration: 0.08,
              ease: `power2.in`,
            },
            0.9,
          ))
    }),
    (
      <div
        ref={S}
        className={`scene-fill`}
        style={{
          background: m.wall,
        }}
      >
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <rect x={-900} y={-800} width={2800} height={2600} fill={m.wall} />
          {Array.from(
            {
              length: 14,
            },
            (e, t) => (
              <rect
                x={-900 + t * 200}
                y={-800}
                width={100}
                height={1400}
                fill={INK}
                opacity={0.025}
                key={t}
              />
            ),
          )}
          <rect x={250} y={222} width={500} height={383} fill={m.behind} />
          <g>
            <circle cx={330} cy={268} r={36} fill={PAPER} stroke={INK} strokeWidth={4} />
            {Array.from(
              {
                length: 12,
              },
              (e, t) => (
                <line
                  x1={330}
                  y1={238}
                  x2={330}
                  y2={244}
                  stroke={INK}
                  strokeWidth={3}
                  transform={`rotate(${t * 30} 330 268)`}
                  key={t}
                />
              ),
            )}
            <line
              className={`fh__hour`}
              x1={330}
              y1={268}
              x2={330}
              y2={250}
              stroke={INK}
              strokeWidth={5}
              strokeLinecap={`round`}
            />
            <line
              className={`fh__minute`}
              x1={330}
              y1={268}
              x2={330}
              y2={240}
              stroke={INK}
              strokeWidth={3}
              strokeLinecap={`round`}
            />
          </g>
          <g fill={`#B8A98C`} stroke={INK} strokeWidth={3}>
            <rect x={640} y={238} width={70} height={90} />
            <rect x={650} y={250} width={50} height={8} fill={PAPER} />
            <rect x={650} y={266} width={50} height={8} fill={PAPER} />
          </g>
          <rect
            x={250}
            y={515}
            width={500}
            height={90}
            fill={m.tellerCounter}
            stroke={INK}
            strokeWidth={4}
          />
          <path
            d={`M486 362 L500 304 L620 304 L634 362 Z`}
            fill={m.machineDark}
            stroke={INK}
            strokeWidth={4}
          />
          <g className={`fh__pile`}>
            {Array.from(
              {
                length: _,
              },
              (e, t) => (
                <g className={`fh__fly-${t}`} key={t}>
                  <NoteFace cx={0} cy={0} scale={0.32} />
                </g>
              ),
            )}
          </g>
          <g>
            <rect
              x={440}
              y={358}
              width={240}
              height={160}
              rx={16}
              fill={m.machine}
              stroke={INK}
              strokeWidth={4}
            />
            <rect x={440} y={430} width={240} height={14} fill={`#B23A2E`} />
            <rect x={462} y={378} width={104} height={14} rx={7} fill={INK} />
            <rect
              x={584}
              y={378}
              width={80}
              height={44}
              rx={6}
              fill={m.led}
              stroke={INK}
              strokeWidth={3}
            />
            {Array.from(
              {
                length: 7,
              },
              (e, t) => (
                <text
                  x={656}
                  y={412}
                  textAnchor={`end`}
                  className={`fh__digit fh__digit-${t}`}
                  fill={m.ledOn}
                  fontFamily={`'JetBrains Mono', monospace`}
                  fontWeight={600}
                  fontSize={30}
                  key={t}
                >
                  {t}
                </text>
              ),
            )}
            {[474, 506, 538].map((e, t) => (
              <circle
                cx={e}
                cy={472}
                r={10}
                fill={[`#2F8F5B`, `#F2C230`, `#B23A2E`][t]}
                stroke={INK}
                strokeWidth={3}
                key={e}
              />
            ))}
            <rect x={462} y={500} width={196} height={10} rx={5} fill={INK} />
            <g className={`fh__whirr`} stroke={INK} strokeWidth={4} strokeLinecap={`round`}>
              <line x1={420} y1={392} x2={400} y2={384} />
              <line x1={420} y1={420} x2={396} y2={420} />
              <line x1={700} y1={392} x2={720} y2={384} />
              <line x1={700} y1={420} x2={724} y2={420} />
            </g>
          </g>
          <rect
            x={470}
            y={534}
            width={180}
            height={34}
            rx={6}
            fill={m.machineDark}
            stroke={INK}
            strokeWidth={4}
          />
          <clipPath id={`fh-teller-clip`}>
            <rect x={250} y={222} width={500} height={900} />
          </clipPath>
          <g clipPath={`url(#fh-teller-clip)`}>
            <g className={`fh__teller`}>
              <g transform={`rotate(90)`}>
                <Hand skin={m.tellerSkin} sleeve={m.tellerSleeve} cuff={m.tellerCuff} />
              </g>
            </g>
          </g>
          <rect
            x={250}
            y={222}
            width={500}
            height={94}
            fill={m.glass}
            stroke={INK}
            strokeWidth={3}
          />
          <g fill={INK} opacity={0.35}>
            {Array.from(
              {
                length: 7,
              },
              (e, t) => (
                <circle
                  cx={470 + (t % 4) * 26 + (t > 3 ? 13 : 0)}
                  cy={t > 3 ? 284 : 264}
                  r={5}
                  key={t}
                />
              ),
            )}
          </g>
          <line x1={280} y1={306} x2={360} y2={232} stroke={PAPER} strokeWidth={6} opacity={0.5} />
          <rect
            x={250}
            y={160}
            width={500}
            height={62}
            fill={m.sign}
            stroke={INK}
            strokeWidth={4}
          />
          <text
            x={500}
            y={204}
            textAnchor={`middle`}
            className={`svg-label--hi`}
            style={{
              fontSize: 38,
            }}
          >
            नकद
          </text>
          <text
            x={300}
            y={203}
            textAnchor={`middle`}
            fill={`#F2C230`}
            fontFamily={`Fraunces, serif`}
            fontWeight={800}
            fontSize={34}
          >
            ₹
          </text>
          <text
            x={700}
            y={203}
            textAnchor={`middle`}
            fill={`#F2C230`}
            fontFamily={`Fraunces, serif`}
            fontWeight={800}
            fontSize={34}
          >
            ₹
          </text>
          <path
            d={`M230 150 H770 V605 H750 V222 H250 V605 H230 Z`}
            fill={m.frame}
            stroke={INK}
            strokeWidth={4}
          />
          <rect
            x={-900}
            y={600}
            width={2800}
            height={130}
            fill={m.counterTop}
            stroke={INK}
            strokeWidth={4}
          />
          <rect x={-900} y={606} width={2800} height={8} fill={PAPER} opacity={0.18} />
          <rect x={-900} y={730} width={2800} height={1100} fill={m.counterFront} />
          <line x1={-900} y1={730} x2={1900} y2={730} stroke={INK} strokeWidth={4} />
          <g transform={`translate(760 668) rotate(-18)`}>
            <rect
              x={-46}
              y={-6}
              width={92}
              height={12}
              rx={6}
              fill={`#3A78C2`}
              stroke={INK}
              strokeWidth={3}
            />
            <path
              d={`M-46 0 q -40 30 -10 52`}
              fill={`none`}
              stroke={INK}
              strokeWidth={2}
              strokeDasharray={`3 3`}
            />
          </g>
          <g className={`fh__worker`}>
            <g transform={`rotate(-28)`}>
              <Hand skin={m.workerSkin} sleeve={m.workerSleeve} cuff={m.workerCuff} />
            </g>
          </g>
        </svg>
        {w && (
          <div className={`stage-text scene-caption-pos`}>
            <p className={`fh__caption scene-caption`}>{w}</p>
          </div>
        )}
      </div>
    )
  )
}

export { FirstHandsScene }
