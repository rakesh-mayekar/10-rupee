import { INK } from '../app/core'

var r = 0.62,
  i = 4 / r
function Hand({ skin: t, sleeve: a, cuff: o, flip: s, grip: c }) {
  let l = (e) => (c ? 24 : 52 - Math.abs(e - 1.5) * 7)
  return (
    <g transform={`scale(${s ? -0.62 : r} ${r})`}>
      <rect x={-1600} y={-42} width={1520} height={84} fill={a} stroke={INK} strokeWidth={i} />
      <rect
        x={-108}
        y={-46}
        width={36}
        height={92}
        rx={6}
        fill={o ?? a}
        stroke={INK}
        strokeWidth={i}
      />
      <rect x={-76} y={-25} width={44} height={50} fill={t} stroke={INK} strokeWidth={i} />
      {[0, 1, 2, 3].map((r) => (
        <rect
          x={18}
          y={-28 + r * 14}
          width={l(r)}
          height={13}
          rx={6.5}
          fill={t}
          stroke={INK}
          strokeWidth={i * 0.85}
          key={r}
        />
      ))}
      <rect x={-46} y={-32} width={80} height={64} rx={24} fill={t} stroke={INK} strokeWidth={i} />
      <rect
        x={-4}
        y={-50}
        width={44}
        height={17}
        rx={8.5}
        transform={`rotate(-24 -4 -42)`}
        fill={t}
        stroke={INK}
        strokeWidth={i * 0.85}
      />
    </g>
  )
}

export { Hand }
