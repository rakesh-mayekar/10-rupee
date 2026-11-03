var n = 300,
  r = 140,
  i = r / n,
  a = [`base`, `pattern`, `print`, `serial`]
function NoteFace({ cx: e, cy: i, scale: o, layers: s = a, serial: c }) {
  let l = (400 * o) / n,
    u = `translate(${e - (n * l) / 2} ${i - (r * l) / 2}) scale(${l})`
  return (
    <g transform={u}>
      {s.includes(`base`) && (
        <>
          <rect width={n} height={r} rx={5} fill={`#6B4A2E`} />
          <rect x={8} y={8} width={284} height={124} rx={3} fill={`#80593A`} />
        </>
      )}
      {s.includes(`pattern`) && (
        <g stroke={`#F3EAD7`} fill={`none`}>
          {Array.from(
            {
              length: 22,
            },
            (e, n) => (
              <line
                x1={8 + n * 14}
                y1={132}
                x2={8 + n * 14 + 50}
                y2={8}
                strokeOpacity={0.14}
                strokeWidth={1.5}
                key={n}
              />
            ),
          )}
          <rect x={8} y={8} width={284} height={124} rx={3} strokeOpacity={0.4} strokeWidth={1.5} />
          <line
            x1={150}
            y1={8}
            x2={150}
            y2={132}
            stroke={`#C9C2B4`}
            strokeWidth={3}
            strokeDasharray={`7 5`}
            strokeOpacity={0.7}
          />
        </g>
      )}
      {s.includes(`print`) && (
        <g fill={`#F3EAD7`}>
          <g transform={`translate(74 70)`} stroke={`#F3EAD7`} fill={`none`} strokeOpacity={0.85}>
            <circle r={36} strokeWidth={4} />
            <circle r={8} strokeWidth={3} />
            {Array.from(
              {
                length: 8,
              },
              (e, n) => (
                <line
                  x1={0}
                  y1={-9}
                  x2={0}
                  y2={-34}
                  strokeWidth={3}
                  transform={`rotate(${n * 45})`}
                  key={n}
                />
              ),
            )}
          </g>
          <text
            x={176}
            y={100}
            fontFamily={`Fraunces, Georgia, serif`}
            fontWeight={800}
            fontSize={64}
            letterSpacing={-2}
          >
            ₹10
          </text>
          <text
            x={278}
            y={34}
            fontFamily={`Mukta, sans-serif`}
            fontWeight={600}
            fontSize={15}
            textAnchor={`end`}
            opacity={0.85}
          >
            दस रुपये
          </text>
        </g>
      )}
      {s.includes(`serial`) && c && (
        <g
          fill={`#F3EAD7`}
          fontFamily={`'JetBrains Mono', monospace`}
          fontWeight={600}
          fontSize={11}
          letterSpacing={1}
        >
          <text x={22} y={26}>
            {c}
          </text>
          <text x={278} y={128} textAnchor={`end`}>
            {c}
          </text>
        </g>
      )}
    </g>
  )
}
function NoteStack({ cx: e, cy: n, scale: r, count: a, spread: s = 3 }) {
  let c = 400 * r,
    l = c * i
  return (
    <g>
      {Array.from(
        {
          length: a,
        },
        (r, i) => {
          let o = (a - 1 - i) * s
          return (
            <g key={i}>
              <rect
                x={e - c / 2 + (i % 2 ? 2 : -2)}
                y={n - l / 2 + o}
                width={c}
                height={l}
                rx={3}
                fill={`#5A3E26`}
                stroke={`#1E1A16`}
                strokeWidth={2}
              />
            </g>
          )
        },
      )}
      <NoteFace cx={e} cy={n} scale={r} />
    </g>
  )
}

export { NoteStack, NoteFace }
