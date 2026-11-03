import { gsap } from '../lib/gsap'
import { getChapter, CHAIN_AT } from '../story/timeline'
import { PAPER, INK, WORLD, useScrollTimeline } from '../app/core'
import { Hand } from './Hand'
import { useRef } from 'react'

/* empty css                     */ var f = `#8A7F70`,
  p = [
    {
      bg: `#E4B26A`,
      art: <CmpX />,
      skin: `#8E5A35`,
      sleeve: `#EDE6D6`,
      cuff: `#D9D0BC`,
    },
    {
      bg: `#BFD3D6`,
      art: <S />,
      skin: `#A0663E`,
      sleeve: `#D4A23A`,
      cuff: `#B8892B`,
    },
    {
      bg: `#D9D3C4`,
      art: <C />,
      skin: `#B7774B`,
      sleeve: `#B49A6A`,
      cuff: `#9A8257`,
    },
    {
      bg: `#E8C9A0`,
      art: <CmpW />,
      skin: `#8E5A35`,
      sleeve: `#3E7D4E`,
      cuff: `#2F6440`,
    },
    {
      bg: `#D7E0C8`,
      art: <T />,
      skin: `#C68B59`,
      sleeve: `#8C2F39`,
      cuff: `#70242D`,
    },
    {
      bg: `#F0D9B5`,
      art: <E />,
      skin: `#A0663E`,
      sleeve: `#D8432F`,
      cuff: `#B23A2E`,
    },
  ],
  m = [`#C9D7E0`, `#E6B9A6`, `#D8E2B0`, `#E2C3E0`, `#BFD3D6`, `#F2D49B`, `#C7D9C4`, `#E6C7A6`],
  h = 1e3,
  g = (e) => (e % 2 == 0 ? 1 : -1),
  _ = (e) => (g(e) > 0 ? WORLD.right : WORLD.left),
  v = 70,
  y = 22
function ChainScene({ section: n }) {
  let r = useRef(null),
    s = getChapter(`chain`).keys,
    b = CHAIN_AT
  return (
    useScrollTimeline(n, r, (t) => {
      let n = (e) => s.find((t) => Math.abs(t.at - e) < 1e-9)
      ;(p.forEach((t, r) => {
        let i = g(r),
          a = r === 0 ? s[0] : n(b[r - 1])
        gsap.set(`.chain__hand-${r}`, {
          x: r === 0 ? a.x + i * v : _(r),
          y: a.y + y,
        })
      }),
        gsap.set(`.chain__ring`, {
          opacity: 0,
          scale: 0.6,
          rotation: 0,
          transformOrigin: `50% 50%`,
        }),
        gsap.set(`.chain__lines`, {
          opacity: 0,
        }),
        b.forEach((e, n) => {
          t.to(
            `.chain__strip`,
            {
              x: -(n + 1) * h,
              duration: 0.1,
              ease: `power2.inOut`,
            },
            e - 0.05,
          )
        }),
        t.to(
          `.chain__strip`,
          {
            x: -(p.length + m.length - 1) * h,
            duration: 0.33,
            ease: `power2.in`,
          },
          0.62,
        ),
        b.forEach((e, r) => {
          let i = r + 1,
            a = r,
            o = n(e),
            s = g(i)
          ;(t.to(
            `.chain__hand-${i}`,
            {
              x: o.x + s * v,
              duration: 0.045,
              ease: `power2.out`,
            },
            e - 0.06,
          ),
            t.to(
              `.chain__hand-${a}`,
              {
                x: _(a),
                duration: 0.05,
                ease: `power2.in`,
              },
              e + 0.004,
            ))
        }))
      let r = p.length - 1
      ;(t.to(
        `.chain__hand-${r}`,
        {
          x: _(r),
          duration: 0.05,
          ease: `power2.in`,
        },
        0.62,
      ),
        t
          .to(
            `.chain__ring`,
            {
              opacity: 1,
              scale: 1,
              duration: 0.05,
              ease: `power2.out`,
            },
            0.63,
          )
          .to(
            `.chain__ring`,
            {
              rotation: 300,
              duration: 0.3,
              ease: `power1.in`,
            },
            0.63,
          )
          .to(
            `.chain__ring`,
            {
              opacity: 0,
              scale: 1.4,
              duration: 0.04,
              ease: `power2.in`,
            },
            0.93,
          )
          .to(
            `.chain__lines`,
            {
              opacity: 1,
              duration: 0.04,
            },
            0.64,
          )
          .fromTo(
            `.chain__lines`,
            {
              x: 400,
            },
            {
              x: -1400,
              duration: 0.3,
              ease: `power1.in`,
            },
            0.64,
          )
          .to(
            `.chain__lines`,
            {
              opacity: 0,
              duration: 0.04,
            },
            0.92,
          ))
    }),
    (
      <div
        ref={r}
        className={`scene-fill`}
        style={{
          background: f,
        }}
      >
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`} aria-hidden={`true`}>
          <g className={`chain__strip`}>
            {p.map((e, t) => (
              <g transform={`translate(${t * h} 0)`} key={t}>
                <rect
                  x={t === 0 ? -1e3 : 0}
                  y={-800}
                  width={t === 0 ? 2 * h : h}
                  height={1600}
                  fill={e.bg}
                />
                <clipPath id={`chain-panel-${t}`}>
                  <rect x={t === 0 ? -1e3 : 0} y={-800} width={t === 0 ? 2 * h : h} height={1600} />
                </clipPath>
                <g clipPath={`url(#chain-panel-${t})`}>{e.art}</g>
              </g>
            ))}
            {m.map((e, t) => (
              <g transform={`translate(${(p.length + t) * h} 0)`} key={`r${t}`}>
                <rect
                  x={0}
                  y={-800}
                  width={t === m.length - 1 ? 2 * h : h}
                  height={1600}
                  fill={e}
                />
                <D seed={t} />
              </g>
            ))}
            {Array.from(
              {
                length: p.length + m.length,
              },
              (e, t) => (
                <line
                  x1={(t + 1) * h}
                  y1={-800}
                  x2={(t + 1) * h}
                  y2={760}
                  stroke={INK}
                  strokeWidth={6}
                  key={`d${t}`}
                />
              ),
            )}
            <rect x={-1e3} y={760} width={(p.length + m.length + 2) * h} height={1200} fill={f} />
            <rect
              x={-1e3}
              y={760}
              width={(p.length + m.length + 2) * h}
              height={14}
              fill={INK}
              opacity={0.25}
            />
          </g>
          <g
            className={`chain__lines`}
            stroke={PAPER}
            strokeWidth={6}
            strokeLinecap={`round`}
            opacity={0}
          >
            {Array.from(
              {
                length: 16,
              },
              (e, t) => (
                <line
                  x1={t * 170}
                  y1={120 + ((t * 137) % 640)}
                  x2={t * 170 + 260}
                  y2={120 + ((t * 137) % 640)}
                  strokeOpacity={0.55}
                  key={t}
                />
              ),
            )}
          </g>
          <g className={`chain__ring`}>
            {Array.from(
              {
                length: 12,
              },
              (e, t) => {
                let n = p[t % p.length]
                return (
                  <g transform={`translate(500 500) rotate(${t * 30}) translate(-205 0)`} key={t}>
                    <Hand skin={n.skin} sleeve={m[t % m.length]} cuff={n.cuff} />
                  </g>
                )
              },
            )}
          </g>
          {p.map((e, t) => (
            <g className={`chain__hand-${t}`} key={t}>
              <Hand skin={e.skin} sleeve={e.sleeve} cuff={e.cuff} flip={g(t) > 0} />
            </g>
          ))}
        </svg>
      </div>
    )
  )
}
function CmpX() {
  return (
    <g>
      <rect x={-500} y={560} width={2e3} height={200} fill={`#C98A47`} />
      <g transform={`translate(150 230) rotate(-3)`}>
        <rect width={240} height={96} rx={8} fill={`#B23A2E`} stroke={INK} strokeWidth={4} />
        <text
          x={24}
          y={68}
          fill={PAPER}
          fontFamily={`Mukta, sans-serif`}
          fontWeight={700}
          fontSize={58}
        >
          चाय
        </text>
      </g>
      <path
        d={`M720 690 Q 712 600 752 584 L832 584 Q 874 600 866 690 Z`}
        fill={`#BDB6AA`}
        stroke={INK}
        strokeWidth={4}
      />
      <rect
        x={690}
        y={690}
        width={210}
        height={70}
        rx={6}
        fill={`#2B2621`}
        stroke={INK}
        strokeWidth={4}
      />
      {[300, 360].map((e) => (
        <path
          d={`M${e - 30} 676 L${e + 30} 676 L${e + 23} 760 L${e - 23} 760 Z`}
          fill={`rgba(255,255,255,0.3)`}
          stroke={INK}
          strokeWidth={3.5}
          key={e}
        />
      ))}
    </g>
  )
}
function S() {
  return (
    <g>
      <circle cx={160} cy={160} r={60} fill={`#F6D27A`} />
      <g stroke={INK} strokeWidth={5} fill={`none`}>
        <circle cx={250} cy={690} r={66} />
        <circle cx={600} cy={690} r={66} />
        <path
          d={`M250 690 L380 600 L560 600 L600 690 M380 600 L420 690 L560 600 M560 600 L590 540`}
        />
      </g>
      {[640, 720, 800].map((e, t) => (
        <g key={e}>
          <rect
            x={e - 32}
            y={560 - (t % 2) * 6}
            width={64}
            height={110}
            rx={10}
            fill={`#C9C6BF`}
            stroke={INK}
            strokeWidth={4}
          />
          <rect
            x={e - 22}
            y={540 - (t % 2) * 6}
            width={44}
            height={24}
            rx={4}
            fill={`#A9A49A`}
            stroke={INK}
            strokeWidth={4}
          />
          <line
            x1={e - 24}
            y1={600}
            x2={e + 24}
            y2={600}
            stroke={PAPER}
            strokeWidth={3}
            opacity={0.6}
          />
        </g>
      ))}
      <text
        x={720}
        y={640}
        textAnchor={`middle`}
        fill={INK}
        fontFamily={`Mukta, sans-serif`}
        fontWeight={700}
        fontSize={26}
      >
        दूध
      </text>
    </g>
  )
}
function C() {
  return (
    <g>
      <rect x={-500} y={700} width={2e3} height={60} fill={`#6E6A63`} />
      <g transform={`translate(560 420)`}>
        <path
          d={`M-260 260 L-260 60 Q -250 0 -180 0 L 160 0 Q 230 10 250 80 L 260 260 Z`}
          fill={`#2F8F5B`}
          stroke={INK}
          strokeWidth={5}
        />
        <path
          d={`M-270 70 Q -250 -40 -150 -50 L 170 -50 Q 260 -40 270 70 Z`}
          fill={`#F2C230`}
          stroke={INK}
          strokeWidth={5}
        />
        <rect
          x={-200}
          y={40}
          width={330}
          height={110}
          rx={10}
          fill={`#BFD8E2`}
          stroke={INK}
          strokeWidth={4}
        />
        <rect x={150} y={150} width={70} height={56} rx={6} fill={INK} />
        <text
          x={185}
          y={188}
          textAnchor={`middle`}
          fill={`#F2C230`}
          fontFamily={`'JetBrains Mono', monospace`}
          fontWeight={600}
          fontSize={22}
        >
          ₹
        </text>
        <circle cx={-170} cy={268} r={50} fill={INK} />
        <circle cx={-170} cy={268} r={20} fill={`#A9A49A`} />
        <circle cx={0} cy={210} r={26} fill={`#F6D27A`} stroke={INK} strokeWidth={4} />
      </g>
    </g>
  )
}
function CmpW() {
  let e = [
    {
      c: `#D8432F`,
      r: 24,
    },
    {
      c: `#7E9A4E`,
      r: 22,
    },
    {
      c: `#9C5BA8`,
      r: 26,
    },
    {
      c: `#F2C230`,
      r: 20,
    },
    {
      c: `#3E7D4E`,
      r: 24,
    },
  ]
  return (
    <g>
      <rect x={150} y={560} width={700} height={70} fill={`#8F5A33`} stroke={INK} strokeWidth={5} />
      {[250, 750].map((e) => (
        <circle cx={e} cy={690} r={60} fill={`#6E6A63`} stroke={INK} strokeWidth={5} key={e} />
      ))}
      {Array.from(
        {
          length: 18,
        },
        (t, n) => {
          let r = e[n % e.length]
          return (
            <circle
              cx={190 + (n % 9) * 76}
              cy={540 - Math.floor(n / 9) * 38}
              r={r.r}
              fill={r.c}
              stroke={INK}
              strokeWidth={3}
              key={n}
            />
          )
        },
      )}
      <g transform={`translate(500 270)`} stroke={INK} strokeWidth={4} fill={`none`}>
        <line x1={0} y1={-60} x2={0} y2={0} />
        <line x1={-120} y1={0} x2={120} y2={0} />
        <path d={`M-150 60 L-120 0 L-90 60 Z M90 60 L120 0 L150 60 Z`} fill={`#C9C6BF`} />
      </g>
      <text
        x={500}
        y={170}
        textAnchor={`middle`}
        fill={INK}
        fontFamily={`Mukta, sans-serif`}
        fontWeight={700}
        fontSize={40}
      >
        सब्ज़ी
      </text>
    </g>
  )
}
function T() {
  return (
    <g>
      <rect
        x={100}
        y={160}
        width={800}
        height={90}
        rx={8}
        fill={`#2F5D50`}
        stroke={INK}
        strokeWidth={5}
      />
      <text
        x={500}
        y={222}
        textAnchor={`middle`}
        fill={PAPER}
        fontFamily={`Mukta, sans-serif`}
        fontWeight={700}
        fontSize={50}
      >
        कैंटीन
      </text>
      <rect
        x={-500}
        y={600}
        width={2e3}
        height={160}
        fill={`#B9A27E`}
        stroke={INK}
        strokeWidth={4}
      />
      <rect
        x={220}
        y={566}
        width={300}
        height={34}
        rx={8}
        fill={`#C9C6BF`}
        stroke={INK}
        strokeWidth={4}
      />
      {[260, 330, 400, 470].map((e) => (
        <path
          d={`M${e - 26} 566 L${e} 522 L${e + 26} 566 Z`}
          fill={`#E0A04A`}
          stroke={INK}
          strokeWidth={3}
          key={e}
        />
      ))}
      <g transform={`translate(700 500)`}>
        {[0, 1, 2].map((e) => (
          <rect
            x={-46}
            y={-e * 40}
            width={92}
            height={40}
            rx={8}
            fill={`#C9C6BF`}
            stroke={INK}
            strokeWidth={4}
            key={e}
          />
        ))}
        <path d={`M-30 -110 Q 0 -150 30 -110`} fill={`none`} stroke={INK} strokeWidth={5} />
      </g>
    </g>
  )
}
function E() {
  let e = [`#D8432F`, `#F2C230`, `#3A78C2`, `#2F8F5B`, `#E08A2E`, `#9C5BA8`]
  return (
    <g>
      <rect
        x={100}
        y={140}
        width={800}
        height={420}
        fill={`#C98A47`}
        stroke={INK}
        strokeWidth={5}
      />
      {[0, 1, 2].map((t) => (
        <g key={t}>
          <rect x={100} y={260 + t * 120} width={800} height={10} fill={INK} />
          {Array.from(
            {
              length: 11,
            },
            (n, r) => (
              <rect
                x={130 + r * 70}
                y={190 + t * 120}
                width={48}
                height={70}
                rx={4}
                fill={e[(r + t) % e.length]}
                stroke={INK}
                strokeWidth={3}
                key={r}
              />
            ),
          )}
        </g>
      ))}
      <g stroke={INK} strokeWidth={3} opacity={0.5}>
        {Array.from(
          {
            length: 6,
          },
          (e, t) => (
            <line x1={100} y1={60 + t * 14} x2={900} y2={60 + t * 14} key={t} />
          ),
        )}
      </g>
      <text
        x={500}
        y={130}
        textAnchor={`middle`}
        fill={INK}
        fontFamily={`Mukta, sans-serif`}
        fontWeight={700}
        fontSize={40}
      >
        किराना
      </text>
      <rect x={-500} y={560} width={2e3} height={200} fill={`#8F5A33`} />
    </g>
  )
}
function D({ seed: e }) {
  let t = [340, 260, 420, 300, 380, 240, 360]
  return (
    <g fill={INK} opacity={0.14}>
      {t.map((n, r) => {
        let i = t[(r + e) % t.length]
        return <rect x={-120 + r * 170} y={760 - i} width={130} height={i} key={r} />
      })}
    </g>
  )
}

export { ChainScene }
