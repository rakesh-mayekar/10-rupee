function stepCurve(e, t, n) {
  let r = [[0, 0]]
  e.forEach((e, n) => r.push([e - 0.004, n / t], [e, (n + 1) / t]))
  let i = e.length / t
  return (n && r.push([n[0], i], [n[1], 1]), r.push([1, n ? 1 : i]), r)
}
var DEFAULT_POSE = {
  x: 500,
  y: 500,
  scale: 1,
  rotate: 0,
  rotateY: 0,
  rotateX: 0,
  opacity: 1,
  clip: 0,
}
function fillKeys(e) {
  let t = DEFAULT_POSE
  return e.map((e) => {
    let n = {
      ...t,
      ease: void 0,
      ...e,
    }
    return ((t = n), n)
  })
}
var defineChapters = (e) =>
    e.map((e) => ({
      ...e,
      keys: fillKeys(e.keys),
    })),
  STOPS = [
    {
      id: `press`,
      x: 160,
      y: 250,
    },
    {
      id: `rbi`,
      x: 300,
      y: 190,
    },
    {
      id: `chest`,
      x: 450,
      y: 230,
    },
    {
      id: `bank`,
      x: 570,
      y: 310,
    },
    {
      id: `chai`,
      x: 710,
      y: 250,
    },
    {
      id: `milk`,
      x: 840,
      y: 330,
    },
    {
      id: `auto`,
      x: 790,
      y: 460,
    },
    {
      id: `sabzi`,
      x: 650,
      y: 420,
    },
    {
      id: `canteen`,
      x: 520,
      y: 480,
    },
    {
      id: `kirana`,
      x: 380,
      y: 430,
    },
    {
      id: `rush-1`,
      x: 240,
      y: 540,
      rush: !0,
    },
    {
      id: `rush-2`,
      x: 380,
      y: 610,
      rush: !0,
    },
    {
      id: `rush-3`,
      x: 260,
      y: 680,
      rush: !0,
    },
    {
      id: `rush-4`,
      x: 450,
      y: 650,
      rush: !0,
    },
    {
      id: `rush-5`,
      x: 380,
      y: 760,
      rush: !0,
    },
    {
      id: `rush-6`,
      x: 560,
      y: 700,
      rush: !0,
    },
    {
      id: `gullak`,
      x: 700,
      y: 640,
    },
    {
      id: `festival`,
      x: 850,
      y: 720,
    },
    {
      id: `temple`,
      x: 740,
      y: 820,
    },
    {
      id: `sorter`,
      x: 560,
      y: 840,
    },
  ],
  ROUTE_START = 0.04,
  ROUTE_END = 0.54,
  ROUTE = (() => {
    let e = STOPS.map((e, t) => (t ? Math.hypot(e.x - STOPS[t - 1].x, e.y - STOPS[t - 1].y) : 0)),
      t = e.reduce((e, t) => e + t, 0),
      n = 0
    return STOPS.map(
      (r, i) => (
        (n += e[i]),
        {
          ...r,
          at: i === 0 ? ROUTE_START : ROUTE_START + (n / t) * 0.5,
        }
      ),
    )
  })(),
  CHAIN_AT = [0.1, 0.22, 0.34, 0.46, 0.58],
  CHAPTERS = defineChapters([
    {
      id: `cold-open`,
      length: 2.2,
      tint: `#1E1A16`,
      floor: `#1E1A16`,
      day: 0,
      hands: 0,
      trades: 0,
      wear: 0,
      keys: [
        {
          at: 0,
          x: 500,
          y: 490,
          scale: 1.45,
          rotate: -12,
          rotateY: -38,
        },
        {
          at: 1,
          scale: 1.2,
          rotate: -4,
          rotateY: 0,
        },
      ],
    },
    {
      id: `birth`,
      length: 3.2,
      tint: `#E9DCC1`,
      floor: `#CFC0A3`,
      day: 0,
      hands: 0,
      trades: 0,
      wear: 0,
      keys: [
        {
          at: 0,
          x: 500,
          y: 560,
          scale: 0.5,
          opacity: 0,
        },
        {
          at: 0.56,
        },
        {
          at: 0.6,
          opacity: 1,
        },
        {
          at: 0.74,
        },
        {
          at: 0.8,
          x: 690,
          y: 575,
          rotate: 5,
        },
        {
          at: 0.86,
          x: 770,
          y: 612,
          scale: 0.45,
          rotate: 0,
        },
        {
          at: 1,
        },
      ],
    },
    {
      id: `vault`,
      length: 2.8,
      tint: `#D9CBB0`,
      floor: `#D9CBB0`,
      day: 3,
      hands: 0,
      trades: 0,
      wear: 0,
      keys: [
        {
          at: 0,
          x: 250,
          y: 330,
          scale: 0.16,
          rotate: 0,
        },
        {
          at: 0.08,
        },
        {
          at: 0.38,
          x: 750,
        },
        {
          at: 0.46,
        },
        {
          at: 0.5,
          rotate: 90,
        },
        {
          at: 0.62,
          y: 640,
          ease: `in`,
        },
        {
          at: 0.68,
          x: 700,
          y: 690,
          rotate: 180,
          ease: `linear`,
        },
        {
          at: 0.8,
          x: 400,
          ease: `out`,
        },
        {
          at: 0.9,
          y: 812,
          scale: 0.12,
          rotate: 90,
        },
        {
          at: 1,
          rotate: 0,
        },
      ],
    },
    {
      id: `first-hands`,
      length: 2.6,
      tint: `#EADFC8`,
      floor: `#6F675C`,
      day: 4,
      hands: 1,
      trades: 0,
      wear: 0.3,
      countDuring: [0.66, 0.7],
      keys: [
        {
          at: 0,
          x: 560,
          y: 336,
          scale: 0.32,
          rotate: 0,
          rotateX: 45,
        },
        {
          at: 0.36,
        },
        {
          at: 0.375,
          y: 365,
          opacity: 0,
        },
        {
          at: 0.405,
          y: 546,
          rotateX: 58,
        },
        {
          at: 0.42,
          opacity: 1,
        },
        {
          at: 0.5,
        },
        {
          at: 0.62,
          x: 520,
          y: 668,
          rotate: -6,
          rotateX: 40,
        },
        {
          at: 0.7,
        },
        {
          at: 0.86,
          x: 330,
          y: 610,
          scale: 0.42,
          rotate: -12,
          rotateX: 0,
        },
        {
          at: 1,
          x: 290,
          y: 615,
          rotate: -14,
        },
      ],
    },
    {
      id: `chai`,
      length: 3.2,
      tint: `#E4B26A`,
      floor: `#8F5A33`,
      day: 4,
      hands: 2,
      trades: 1,
      wear: 1,
      countDuring: [0.69, 0.73],
      keys: [
        {
          at: 0,
          x: 210,
          y: 640,
          scale: 0.4,
          rotate: -18,
        },
        {
          at: 0.12,
          x: 300,
          y: 612,
          rotate: -12,
        },
        {
          at: 0.55,
        },
        {
          at: 0.62,
          x: 330,
          y: 585,
          rotate: -6,
        },
        {
          at: 0.67,
          x: 480,
          y: 500,
          rotate: 8,
          scale: 0.42,
        },
        {
          at: 0.72,
          x: 655,
          y: 598,
          rotate: 14,
          scale: 0.4,
        },
        {
          at: 0.8,
          x: 660,
          y: 650,
          rotate: 4,
          rotateX: 30,
        },
        {
          at: 0.87,
          x: 655,
          y: 700,
          rotate: 2,
          rotateX: 62,
          scale: 0.34,
        },
        {
          at: 1,
        },
      ],
    },
    {
      id: `chain`,
      length: 4.2,
      tint: `#E6D3B3`,
      floor: `#8A7F70`,
      day: 300,
      hands: 50,
      trades: 48,
      wear: 4,
      curves: {
        count: stepCurve(CHAIN_AT, 47, [0.64, 0.95]),
        wear: [
          [0, 0],
          [0.95, 1],
          [1, 1],
        ],
      },
      keys: [
        {
          at: 0,
          x: 545,
          y: 500,
          scale: 0.5,
          rotate: 6,
        },
        ...CHAIN_AT.flatMap((e, t) => [
          {
            at: e - 0.02,
          },
          {
            at: e,
            x: t % 2 ? 545 : 455,
            rotate: t % 2 ? 6 : -6,
          },
        ]),
        {
          at: 0.64,
          x: 500,
          scale: 0.55,
          rotate: 0,
        },
        {
          at: 0.7,
          rotate: 5,
        },
        {
          at: 0.76,
          rotate: -5,
        },
        {
          at: 0.82,
          rotate: 5,
        },
        {
          at: 0.88,
          rotate: -5,
          scale: 0.7,
        },
        {
          at: 0.95,
          rotate: 0,
          scale: 0.8,
        },
        {
          at: 1,
        },
      ],
    },
    {
      id: `pause`,
      length: 3.2,
      tint: `#DCCFB8`,
      floor: `#7A5A3C`,
      day: 700,
      hands: 53,
      trades: 48,
      wear: 4.5,
      curves: {
        count: stepCurve([0.03, 0.56, 0.72], 3),
        day: [
          [0, 0],
          [0.15, 0],
          [0.36, 0.55],
          [0.7, 0.6],
          [0.94, 1],
          [1, 1],
        ],
      },
      keys: [
        {
          at: 0,
          x: 420,
          y: 520,
          scale: 0.45,
          rotate: -8,
        },
        {
          at: 0.06,
        },
        {
          at: 0.12,
          x: 500,
          y: 455,
          rotate: 90,
          scale: 0.3,
        },
        {
          at: 0.15,
          y: 505,
          scale: 0.22,
          opacity: 0,
        },
        {
          at: 0.38,
          rotate: -10,
        },
        {
          at: 0.42,
          y: 430,
          scale: 0.45,
          opacity: 1,
        },
        {
          at: 0.48,
        },
        {
          at: 0.52,
          x: 430,
          y: 520,
          rotate: -6,
        },
        {
          at: 0.56,
          x: 560,
          rotate: 4,
        },
        {
          at: 0.62,
        },
        {
          at: 0.7,
          x: 500,
          y: 480,
          rotate: 90,
          scale: 0.3,
        },
        {
          at: 0.73,
          y: 565,
          scale: 0.22,
          opacity: 0,
        },
        {
          at: 0.94,
          rotate: -4,
        },
        {
          at: 1,
          y: 470,
          scale: 0.4,
          opacity: 1,
        },
      ],
    },
    {
      id: `return`,
      length: 3,
      tint: `#D4C6AE`,
      floor: `#5E5850`,
      day: 730,
      hands: 55,
      trades: 48,
      wear: 6,
      curves: {
        count: stepCurve([0.02, 0.3], 2),
        wear: [
          [0, 0],
          [0.076, 0],
          [0.084, 1 / 3],
          [0.17, 1 / 3],
          [0.2, 1],
          [1, 1],
        ],
      },
      keys: [
        {
          at: 0,
          x: 500,
          y: 470,
          scale: 0.5,
          rotate: -4,
        },
        {
          at: 0.06,
        },
        {
          at: 0.08,
          rotate: 6,
        },
        {
          at: 0.12,
          y: 520,
          rotate: 0,
        },
        {
          at: 0.24,
        },
        {
          at: 0.34,
          x: 230,
          y: 560,
          scale: 0.32,
          rotateX: 50,
        },
        {
          at: 0.4,
          x: 290,
          ease: `in`,
        },
        {
          at: 0.6,
          x: 500,
          ease: `linear`,
        },
        {
          at: 0.66,
          x: 540,
          y: 450,
          rotateX: 0,
          rotate: -10,
          scale: 0.36,
        },
        {
          at: 0.74,
          x: 770,
          y: 318,
          rotate: 8,
        },
        {
          at: 0.8,
          y: 336,
          scale: 0.32,
          rotate: 0,
          rotateX: 45,
        },
        {
          at: 1,
        },
      ],
    },
    {
      id: `reveal`,
      length: 3.4,
      tint: `#1B1712`,
      floor: `#1B1712`,
      day: 730,
      hands: 55,
      trades: 48,
      wear: 6,
      hud: 0.58,
      keys: [
        {
          at: 0,
          x: ROUTE[0].x,
          y: ROUTE[0].y,
          scale: 0.14,
          rotate: 0,
          rotateX: 0,
        },
        ...ROUTE.map((e) => ({
          at: e.at,
          x: e.x,
          y: e.y,
          ease: `linear`,
        })),
        {
          at: 0.62,
          x: 500,
          y: 560,
          scale: 0.5,
          rotate: -4,
        },
        {
          at: 1,
        },
      ],
    },
    {
      id: `end`,
      length: 3.4,
      tint: `#D9CBB0`,
      floor: `#5E5850`,
      day: 730,
      hands: 55,
      trades: 48,
      wear: 6,
      hud: !1,
      keys: [
        {
          at: 0,
          x: 500,
          y: 330,
          scale: 0.45,
          rotate: 0,
        },
        {
          at: 0.1,
          y: 378,
        },
        {
          at: 0.24,
          y: 462,
          clip: 1,
          ease: `linear`,
        },
        {
          at: 0.25,
          opacity: 0,
        },
        {
          at: 1,
        },
      ],
    },
    {
      id: `outro`,
      length: 1.5,
      tint: `#1E1A16`,
      day: 730,
      hands: 55,
      trades: 48,
      wear: 6,
      hud: !1,
      flow: !0,
      keys: [
        {
          at: 0,
          x: 500,
          y: 120,
          scale: 0.35,
          opacity: 0,
          clip: 1,
        },
      ],
    },
  ]),
  getChapter = (e) => CHAPTERS.find((t) => t.id === e)

export { DEFAULT_POSE, ROUTE, ROUTE_START, ROUTE_END, CHAIN_AT, CHAPTERS, getChapter }
