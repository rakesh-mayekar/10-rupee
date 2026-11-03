import { gsap } from '../lib/gsap'
import { getChapter } from '../story/timeline'
import { PAPER, useI18n, INK, WORLD, useScrollTimeline } from '../app/core'
import { Hand } from './Hand'
import { NoteFace } from './NoteFace'
import { useRef } from 'react'

/* empty css                     */ var p = {
    office: `#E6D3B3`,
    table: `#8F5A33`,
    cloth: `#F4F1E8`,
    room: `#CFCFC6`,
    machine: `#E3E1DA`,
    machineDark: `#A9A49A`,
    belt: `#2B2621`,
    ok: `#7CF0A0`,
    bad: `#E24A3B`,
    red: `#B23A2E`,
    skin: `#A0663E`,
    sleeve: `#F4F1E8`,
    cuff: `#DDD6C4`,
  },
  m = 1e3,
  h = 0.64,
  g = [-320, -150, 20, 190, 360, 700, 870, 1040]
function UnfitScene({ section: n }) {
  let { t: r } = useI18n(),
    _ = useRef(null),
    v = getChapter(`return`).keys,
    y = r.chapters.return.caption
  return (
    useScrollTimeline(n, _, (t) => {
      ;(gsap.set(`.unfit__trustee`, {
        x: v[0].x + 70,
        y: v[0].y + 22,
      }),
        gsap.set(`.unfit__taper`, {
          x: WORLD.right,
          y: 610,
        }),
        gsap.set(`.unfit__tape`, {
          x: 820,
          y: 596,
          rotation: 38,
          opacity: 0,
          transformOrigin: `50% 50%`,
        }),
        gsap.set(`.unfit__scrap`, {
          opacity: 0,
          x: 0,
          y: 0,
          rotation: 0,
        }),
        gsap.set(`.unfit__beam-bad`, {
          opacity: 0,
        }),
        gsap.set(`.unfit__cross`, {
          opacity: 0,
        }),
        gsap.set(`.unfit__flap`, {
          rotation: 0,
          transformOrigin: `0% 100%`,
        }),
        t
          .to(
            `.unfit__trustee`,
            {
              x: `+=12`,
              y: `-=10`,
              duration: 0.02,
              ease: `power2.out`,
            },
            0.06,
          )
          .set(
            `.unfit__scrap`,
            {
              opacity: 1,
            },
            0.078,
          )
          .to(
            `.unfit__scrap`,
            {
              x: 110,
              y: 220,
              rotation: 220,
              duration: 0.07,
              ease: `power1.in`,
            },
            0.078,
          )
          .to(
            `.unfit__scrap`,
            {
              opacity: 0,
              duration: 0.02,
            },
            0.15,
          )
          .to(
            `.unfit__trustee`,
            {
              x: WORLD.right,
              duration: 0.05,
              ease: `power2.in`,
            },
            0.1,
          ),
        t
          .to(
            `.unfit__taper`,
            {
              x: 860,
              y: 600,
              duration: 0.03,
              ease: `power2.out`,
            },
            0.13,
          )
          .to(
            `.unfit__tape`,
            {
              opacity: 1,
              duration: 0.01,
            },
            0.15,
          )
          .to(
            [`.unfit__taper`, `.unfit__tape`],
            {
              x: (e) => (e === 0 ? 640 : 583),
              y: (e) => (e === 0 ? 500 : 487),
              duration: 0.04,
              ease: `power2.inOut`,
            },
            0.15,
          )
          .to(
            `.unfit__tape`,
            {
              opacity: 0,
              duration: 0.02,
            },
            0.185,
          )
          .to(
            `.unfit__taper`,
            {
              x: WORLD.right,
              y: 640,
              duration: 0.05,
              ease: `power2.in`,
            },
            0.2,
          ),
        t.to(
          `.unfit__strip`,
          {
            x: -1e3,
            duration: 0.1,
            ease: `power2.inOut`,
          },
          0.24,
        ),
        t
          .fromTo(
            `.unfit__riders`,
            {
              x: -300,
            },
            {
              x: 385,
              duration: 0.66,
              ease: `none`,
            },
            0.34,
          )
          .fromTo(
            `.unfit__belt-marks`,
            {
              x: 0,
            },
            {
              x: 385,
              duration: 0.66,
              ease: `none`,
            },
            0.34,
          )
          .fromTo(
            `.unfit__fit-stack`,
            {
              scaleY: 0.3,
              transformOrigin: `50% 100%`,
            },
            {
              scaleY: 1,
              duration: 0.66,
              ease: `none`,
            },
            0.34,
          ),
        t.to(
          `.unfit__beam-ok`,
          {
            opacity: 0.25,
            duration: 0.01,
            repeat: 9,
            yoyo: !0,
          },
          0.36,
        ),
        t
          .to(
            `.unfit__beam-ok`,
            {
              opacity: 0,
              duration: 0.01,
            },
            0.585,
          )
          .to(
            `.unfit__beam-bad`,
            {
              opacity: 1,
              duration: 0.01,
            },
            0.585,
          )
          .to(
            `.unfit__tick`,
            {
              opacity: 0,
              duration: 0.01,
            },
            0.585,
          )
          .to(
            `.unfit__cross`,
            {
              opacity: 1,
              duration: 0.01,
            },
            0.585,
          )
          .to(
            `.unfit__lamp`,
            {
              fill: p.bad,
              duration: 0.01,
            },
            0.585,
          )
          .to(
            `.unfit__lamp`,
            {
              opacity: 0.4,
              duration: 0.015,
              repeat: 7,
              yoyo: !0,
            },
            0.6,
          )
          .to(
            `.unfit__flap`,
            {
              rotation: -50,
              duration: 0.02,
              ease: `power3.out`,
            },
            0.6,
          )
          .to(
            `.unfit__flap`,
            {
              rotation: 0,
              duration: 0.04,
              ease: `power2.inOut`,
            },
            0.64,
          )
          .to(
            `.unfit__tray`,
            {
              y: 6,
              duration: 0.01,
              yoyo: !0,
              repeat: 1,
            },
            0.8,
          ),
        t
          .fromTo(
            `.unfit__caption`,
            {
              y: 30,
              autoAlpha: 0,
              scale: 1.2,
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.04,
              ease: `back.out(2)`,
            },
            0.61,
          )
          .to(
            `.unfit__caption`,
            {
              y: -20,
              autoAlpha: 0,
              duration: 0.05,
              ease: `power2.in`,
            },
            0.93,
          ))
    }),
    (
      <div
        ref={_}
        className={`scene-fill`}
        style={{
          background: p.office,
        }}
      >
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <g className={`unfit__strip`}>
            <rect x={-900} y={-800} width={1900} height={1600} fill={p.office} />
            <rect
              x={120}
              y={140}
              width={210}
              height={150}
              rx={6}
              fill={`#E9C27E`}
              stroke={INK}
              strokeWidth={4}
            />
            <text
              x={225}
              y={235}
              textAnchor={`middle`}
              fill={p.red}
              fontFamily={`Mukta, sans-serif`}
              fontWeight={700}
              fontSize={46}
            >
              हिसाब
            </text>
            <rect x={-900} y={600} width={1900} height={1e3} fill={p.table} />
            <line x1={-900} y1={600} x2={1e3} y2={600} stroke={INK} strokeWidth={5} />
            <path
              d={`M120 640 L860 630 L900 780 L80 790 Z`}
              fill={p.cloth}
              stroke={INK}
              strokeWidth={4}
            />
            {[
              {
                x: 230,
                y: 700,
                r: -12,
                c: `#8E6BB0`,
              },
              {
                x: 350,
                y: 735,
                r: 8,
                c: `#C9C24B`,
              },
              {
                x: 720,
                y: 712,
                r: 14,
                c: `#6FB7C9`,
              },
              {
                x: 620,
                y: 750,
                r: -6,
                c: `#6B4A2E`,
              },
            ].map((e, t) => (
              <g transform={`rotate(${e.r} ${e.x} ${e.y})`} key={t}>
                <rect
                  x={e.x - 64}
                  y={e.y - 30}
                  width={128}
                  height={60}
                  rx={4}
                  fill={e.c}
                  stroke={INK}
                  strokeWidth={2.5}
                />
                <rect
                  x={e.x - 56}
                  y={e.y - 22}
                  width={112}
                  height={44}
                  rx={2}
                  fill={`none`}
                  stroke={PAPER}
                  strokeOpacity={0.5}
                  strokeWidth={2}
                />
              </g>
            ))}
            {[
              [470, 690],
              [500, 704],
              [540, 688],
              [820, 760],
            ].map(([e, t], n) => (
              <circle cx={e} cy={t} r={14} fill={`#C9A227`} stroke={INK} strokeWidth={3} key={n} />
            ))}
            <g>
              <path
                d={`M780 610 Q 790 540 870 540 L 930 540 L 930 620 L 780 620 Z`}
                fill={`#3A78C2`}
                stroke={INK}
                strokeWidth={4}
              />
              <circle
                cx={870}
                cy={580}
                r={30}
                fill={`#F7F1E3`}
                fillOpacity={0.7}
                stroke={INK}
                strokeWidth={3}
              />
              <circle cx={870} cy={580} r={12} fill={`#3A78C2`} stroke={INK} strokeWidth={3} />
            </g>
            <path
              className={`unfit__scrap`}
              d={`M600 423 L 572 423 L 576 430 L 569 435 L 578 440 L 573 447 L 582 451 L 600 456 Z`}
              fill={`#6B4A2E`}
              stroke={INK}
              strokeWidth={2}
            />
            <g transform={`translate(${m} 0)`}>
              <rect x={0} y={-800} width={2 * m} height={1600} fill={p.room} />
              <line x1={0} y1={-800} x2={0} y2={1600} stroke={INK} strokeWidth={6} />
              <g stroke={INK} strokeOpacity={0.08} strokeWidth={3}>
                {Array.from(
                  {
                    length: 20,
                  },
                  (e, t) => (
                    <line x1={t * 100} y1={-800} x2={t * 100} y2={760} key={t} />
                  ),
                )}
              </g>
              <g className={`unfit__tray`}>
                <path
                  d={`M690 318 L700 360 L840 360 L850 318 Z`}
                  fill={p.red}
                  stroke={INK}
                  strokeWidth={4}
                />
                <path
                  d={`M752 336 l16 16 m0 -16 l-16 16`}
                  stroke={PAPER}
                  strokeWidth={5}
                  strokeLinecap={`round`}
                />
                <line x1={770} y1={360} x2={770} y2={420} stroke={INK} strokeWidth={6} />
              </g>
              <rect
                x={100}
                y={420}
                width={800}
                height={300}
                rx={18}
                fill={p.machine}
                stroke={INK}
                strokeWidth={5}
              />
              <rect
                x={100}
                y={680}
                width={800}
                height={40}
                rx={10}
                fill={p.machineDark}
                stroke={INK}
                strokeWidth={4}
              />
              <rect
                x={150}
                y={444}
                width={120}
                height={70}
                rx={8}
                fill={`#1B2A22`}
                stroke={INK}
                strokeWidth={3}
              />
              <path
                className={`unfit__tick`}
                d={`M182 480 l16 16 l34 -34`}
                fill={`none`}
                stroke={p.ok}
                strokeWidth={8}
                strokeLinecap={`round`}
                strokeLinejoin={`round`}
              />
              <path
                className={`unfit__cross`}
                d={`M190 462 l40 40 m0 -40 l-40 40`}
                fill={`none`}
                stroke={p.bad}
                strokeWidth={8}
                strokeLinecap={`round`}
              />
              <rect x={120} y={574} width={760} height={26} rx={13} fill={p.belt} />
              <clipPath id={`unfit-belt`}>
                <rect x={120} y={574} width={760} height={26} rx={13} />
              </clipPath>
              <g clipPath={`url(#unfit-belt)`}>
                <g
                  className={`unfit__belt-marks`}
                  stroke={PAPER}
                  strokeOpacity={0.25}
                  strokeWidth={4}
                >
                  {Array.from(
                    {
                      length: 26,
                    },
                    (e, t) => (
                      <line x1={-300 + t * 50} y1={574} x2={-280 + t * 50} y2={600} key={t} />
                    ),
                  )}
                </g>
              </g>
              {[132, 868].map((e) => (
                <circle
                  cx={e}
                  cy={587}
                  r={16}
                  fill={p.machineDark}
                  stroke={INK}
                  strokeWidth={4}
                  key={e}
                />
              ))}
              <clipPath id={`unfit-riders`}>
                <rect x={120} y={0} width={760} height={1e3} />
              </clipPath>
              <g clipPath={`url(#unfit-riders)`}>
                <g className={`unfit__riders`}>
                  {g.map((e, t) => (
                    <g transform={`translate(${e} 560) scale(1 ${h})`} key={t}>
                      <NoteFace cx={0} cy={0} scale={0.32} />
                    </g>
                  ))}
                </g>
              </g>
              <rect
                className={`unfit__flap`}
                x={530}
                y={552}
                width={80}
                height={10}
                rx={4}
                fill={p.red}
                stroke={INK}
                strokeWidth={3}
              />
              <rect
                className={`unfit__beam-ok`}
                x={480}
                y={470}
                width={40}
                height={110}
                fill={p.ok}
                opacity={0.5}
              />
              <rect
                className={`unfit__beam-bad`}
                x={470}
                y={470}
                width={60}
                height={110}
                fill={p.bad}
                opacity={0}
              />
              <path
                d={`M420 380 H580 V470 Q 580 486 564 486 H436 Q 420 486 420 470 Z`}
                fill={p.machineDark}
                stroke={INK}
                strokeWidth={5}
              />
              <circle
                className={`unfit__lamp`}
                cx={500}
                cy={360}
                r={18}
                fill={p.ok}
                stroke={INK}
                strokeWidth={4}
              />
              <rect x={494} y={370} width={12} height={14} fill={INK} />
              <g className={`unfit__fit-stack`}>
                {Array.from(
                  {
                    length: 10,
                  },
                  (e, t) => (
                    <rect
                      x={808}
                      y={542 - t * 7}
                      width={120}
                      height={14}
                      rx={3}
                      fill={`#6B4A2E`}
                      stroke={INK}
                      strokeWidth={2}
                      key={t}
                    />
                  ),
                )}
              </g>
              <rect x={0} y={720} width={2 * m} height={900} fill={`#5E5850`} />
            </g>
          </g>
          <g className={`unfit__trustee`}>
            <Hand skin={p.skin} sleeve={p.sleeve} cuff={p.cuff} flip={!0} />
          </g>
          <g className={`unfit__tape`}>
            <rect
              x={-20.5}
              y={-6.5}
              width={41}
              height={13}
              fill={`#FFF7D6`}
              fillOpacity={0.75}
              stroke={INK}
              strokeOpacity={0.4}
              strokeWidth={1.5}
            />
          </g>
          <g className={`unfit__taper`}>
            <Hand skin={p.skin} sleeve={p.sleeve} cuff={p.cuff} flip={!0} grip={!0} />
          </g>
        </svg>
        {y && (
          <div className={`stage-text scene-caption-pos`}>
            <p
              className={`unfit__caption scene-caption`}
              style={{
                color: p.red,
              }}
            >
              {y}
            </p>
          </div>
        )}
      </div>
    )
  )
}

export { UnfitScene }
