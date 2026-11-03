import { gsap } from '../lib/gsap'
import { getChapter } from '../story/timeline'
import { followRoute, PAPER, useI18n, INK, useScrollTimeline } from '../app/core'
import { useRef } from 'react'

/* empty css                     */ var d = {
  map: `#D9CBB0`,
  block: `#CDBD9E`,
  road: `#EFE6D2`,
  river: `#8DB6C9`,
  park: `#9DB46A`,
  van: `#2F5D50`,
  vanLight: `#4C7F6E`,
  trail: `#C7782F`,
  rbi: `#E8DFCB`,
  chest: `#8C8F93`,
  bank: `#E9D3A6`,
}
function VaultScene({ section: n }) {
  let { t: r } = useI18n(),
    f = useRef(null),
    p = getChapter(`vault`).keys,
    m = r.chapters.vault.caption
  return (
    useScrollTimeline(n, f, (t) => {
      ;(gsap.set(`.vault__van`, {
        x: p[0].x,
        y: p[0].y,
        rotation: p[0].rotate,
        transformOrigin: `50% 50%`,
      }),
        gsap.set([`.vault__trail-a`, `.vault__trail-b`], {
          strokeDashoffset: 1e3,
        }),
        followRoute(t, `.vault__van`, p, 0, 0.8, 0, 0, !0),
        t.to(
          `.vault__van`,
          {
            x: 330,
            duration: 0.12,
            ease: `power2.in`,
          },
          0.86,
        ),
        t
          .to(
            `.vault__trail-a`,
            {
              strokeDashoffset: 0,
              duration: 0.3,
              ease: `power1.inOut`,
            },
            0.08,
          )
          .to(
            `.vault__trail-b`,
            {
              strokeDashoffset: 0,
              duration: 0.3,
              ease: `power1.inOut`,
            },
            0.5,
          ),
        t.to(
          `.vault__door`,
          {
            rotation: 300,
            svgOrigin: `760 238`,
            duration: 0.1,
            ease: `power2.inOut`,
          },
          0.38,
        ),
        t
          .fromTo(
            `.vault__car-1`,
            {
              x: 0,
            },
            {
              x: 900,
              duration: 1,
            },
            0,
          )
          .fromTo(
            `.vault__car-2`,
            {
              y: 0,
            },
            {
              y: -700,
              duration: 1,
            },
            0,
          ),
        t
          .fromTo(
            `.vault__caption`,
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
            `.vault__caption`,
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
        ref={f}
        className={`scene-fill`}
        style={{
          background: d.map,
        }}
      >
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <rect x={-900} y={-800} width={2800} height={2600} fill={d.map} />
          <g fill={d.block} stroke={INK} strokeOpacity={0.25} strokeWidth={2}>
            {Array.from(
              {
                length: 12,
              },
              (e, t) =>
                Array.from(
                  {
                    length: 10,
                  },
                  (e, n) => (
                    <rect
                      x={-820 + t * 230}
                      y={-700 + n * 250}
                      width={190}
                      height={200}
                      rx={10}
                      key={`${t}-${n}`}
                    />
                  ),
                ),
            )}
          </g>
          <path
            d={`M-900 560 C -300 470, 300 600, 1000 470 S 1700 420, 1900 460 L 1900 560 C 1300 520, 900 600, 500 600 S -300 590, -900 660 Z`}
            fill={d.river}
            stroke={INK}
            strokeWidth={3}
          />
          <g fill={d.park} stroke={INK} strokeWidth={2.5}>
            <rect x={430} y={380} width={190} height={90} rx={30} />
            {[460, 500, 545, 590].map((e, t) => (
              <circle cx={e} cy={t % 2 ? 412 : 438} r={18} fill={`#7E9A4E`} key={e} />
            ))}
          </g>
          <g fill={d.park} stroke={INK} strokeWidth={2.5}>
            {[-160, -100, 1080, 1150, 60, 930].map((e, t) => (
              <circle
                cx={e}
                cy={[420, 470, 300, 360, 860, 880][t]}
                r={24}
                fill={`#7E9A4E`}
                key={e}
              />
            ))}
          </g>
          <g fill={`none`} strokeLinecap={`round`} strokeLinejoin={`round`}>
            <path
              d={`M-900 330 H 1900 M 750 -800 V 1800 M -900 690 H 1900 M 140 690 V 1800`}
              stroke={INK}
              strokeWidth={50}
            />
            <path
              d={`M-900 330 H 1900 M 750 -800 V 1800 M -900 690 H 1900 M 140 690 V 1800`}
              stroke={d.road}
              strokeWidth={44}
            />
            <path
              d={`M-900 330 H 1900 M 750 -800 V 1800 M -900 690 H 1900 M 140 690 V 1800`}
              stroke={`#C9BC9F`}
              strokeWidth={3}
              strokeDasharray={`16 14`}
            />
          </g>
          <rect
            x={720}
            y={470}
            width={60}
            height={140}
            fill={d.road}
            stroke={INK}
            strokeWidth={3}
          />
          <g
            fill={`none`}
            stroke={d.trail}
            strokeWidth={10}
            strokeLinecap={`round`}
            strokeLinejoin={`round`}
          >
            <path
              className={`vault__trail-a`}
              d={`M250 330 H 750`}
              pathLength={1e3}
              strokeDasharray={`1000 1000`}
            />
            <path
              className={`vault__trail-b`}
              d={`M750 330 V 640 Q 750 690 700 690 H 400`}
              pathLength={1e3}
              strokeDasharray={`1000 1000`}
            />
          </g>
          <g>
            <rect
              x={120}
              y={190}
              width={240}
              height={110}
              fill={d.rbi}
              stroke={INK}
              strokeWidth={4}
            />
            <path d={`M110 192 L240 128 L370 192 Z`} fill={d.rbi} stroke={INK} strokeWidth={4} />
            <rect x={150} y={198} width={180} height={16} fill={INK} opacity={0.1} />
            <text x={240} y={182} textAnchor={`middle`} className={`svg-label`}>
              RBI
            </text>
            {[150, 190, 230, 270, 310].map((e) => (
              <rect
                x={e - 7}
                y={218}
                width={14}
                height={78}
                fill={`#F7F1E3`}
                stroke={INK}
                strokeWidth={3}
                key={e}
              />
            ))}
            <rect
              x={110}
              y={296}
              width={260}
              height={10}
              fill={d.rbi}
              stroke={INK}
              strokeWidth={3}
            />
          </g>
          <g>
            <rect
              x={672}
              y={180}
              width={176}
              height={120}
              rx={10}
              fill={d.chest}
              stroke={INK}
              strokeWidth={4}
            />
            <rect
              x={672}
              y={180}
              width={176}
              height={20}
              rx={6}
              fill={`#6E7175`}
              stroke={INK}
              strokeWidth={4}
            />
            <circle cx={760} cy={238} r={42} fill={`#B7BBC0`} stroke={INK} strokeWidth={4} />
            <g className={`vault__door`} stroke={INK} strokeWidth={4} strokeLinecap={`round`}>
              <circle cx={760} cy={238} r={10} fill={INK} />
              {[0, 60, 120].map((e) => (
                <line
                  x1={760}
                  y1={208}
                  x2={760}
                  y2={268}
                  transform={`rotate(${e} 760 238)`}
                  key={e}
                />
              ))}
            </g>
            {[690, 830].map((e) => (
              <circle cx={e} cy={290} r={4} fill={INK} key={e} />
            ))}
          </g>
          <g>
            <rect
              x={300}
              y={745}
              width={210}
              height={130}
              fill={d.bank}
              stroke={INK}
              strokeWidth={4}
            />
            <rect
              x={300}
              y={745}
              width={210}
              height={44}
              fill={`#2F5D50`}
              stroke={INK}
              strokeWidth={4}
            />
            <text x={405} y={777} textAnchor={`middle`} className={`svg-label--hi`}>
              बैंक
            </text>
            <rect
              x={376}
              y={810}
              width={58}
              height={65}
              fill={`#6B4A2E`}
              stroke={INK}
              strokeWidth={4}
            />
            {[322, 456].map((e) => (
              <rect
                x={e}
                y={808}
                width={34}
                height={34}
                fill={`#BFD8E2`}
                stroke={INK}
                strokeWidth={3}
                key={e}
              />
            ))}
            <path
              d={`M290 745 h230 l-12 -14 h-206 z`}
              fill={`#B23A2E`}
              stroke={INK}
              strokeWidth={3}
            />
          </g>
          <g className={`vault__car-1`}>
            <rect
              x={-560}
              y={676}
              width={52}
              height={28}
              rx={8}
              fill={`#D8432F`}
              stroke={INK}
              strokeWidth={3}
            />
          </g>
          <g className={`vault__car-2`}>
            <rect
              x={126}
              y={1180}
              width={28}
              height={50}
              rx={8}
              fill={`#F2C230`}
              stroke={INK}
              strokeWidth={3}
            />
          </g>
          <g className={`vault__van`}>
            {[-44, 22].map((e) =>
              [-34, 26].map((t) => (
                <rect x={e} y={t} width={22} height={8} rx={3} fill={INK} key={`${e}${t}`} />
              )),
            )}
            <rect
              x={-62}
              y={-30}
              width={124}
              height={60}
              rx={12}
              fill={d.van}
              stroke={INK}
              strokeWidth={4}
            />
            <rect
              x={30}
              y={-26}
              width={28}
              height={52}
              rx={8}
              fill={d.vanLight}
              stroke={INK}
              strokeWidth={3}
            />
            <rect
              x={44}
              y={-22}
              width={10}
              height={44}
              rx={3}
              fill={`#BFD8E2`}
              stroke={INK}
              strokeWidth={2}
            />
            <rect
              x={-52}
              y={-20}
              width={74}
              height={40}
              rx={4}
              fill={`none`}
              stroke={PAPER}
              strokeOpacity={0.35}
              strokeWidth={2}
            />
          </g>
        </svg>
        {m && (
          <div className={`stage-text scene-caption-pos`}>
            <p className={`vault__caption scene-caption`}>{m}</p>
          </div>
        )}
      </div>
    )
  )
}

export { VaultScene }
