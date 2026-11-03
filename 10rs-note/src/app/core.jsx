import { gsap } from '../lib/gsap'
import { CHAPTERS } from '../story/timeline'
import { smoothScrollTo } from '../lib/smoothScroll'
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

var clamp01 = (e) => Math.min(1, Math.max(0, e)),
  lerp = (e, t, n) => e + (t - e) * n,
  smoothstep = (e) => e * e * (3 - 2 * e),
  EASES = {
    smooth: smoothstep,
    linear: (e) => e,
    in: (e) => e * e,
    out: (e) => 1 - (1 - e) * (1 - e),
  },
  easeOf = (e) => EASES[e.ease ?? `smooth`],
  lerpPose = (e, t, n) => ({
    x: lerp(e.x, t.x, n),
    y: lerp(e.y, t.y, n),
    scale: lerp(e.scale, t.scale, n),
    rotate: lerp(e.rotate, t.rotate, n),
    rotateY: lerp(e.rotateY, t.rotateY, n),
    rotateX: lerp(e.rotateX, t.rotateX, n),
    opacity: lerp(e.opacity, t.opacity, n),
    clip: lerp(e.clip, t.clip, n),
  })
function curveAt(e, t) {
  if (t <= e[0][0]) return e[0][1]
  for (let n = 1; n < e.length; n++) {
    let [r, i] = e[n - 1],
      [a, o] = e[n]
    if (t <= a) return a === r ? o : lerp(i, o, (t - r) / (a - r))
  }
  return e[e.length - 1][1]
}
function poseAt(e, t) {
  if (t <= e[0].at) return e[0]
  for (let n = 1; n < e.length; n++) {
    let r = e[n - 1],
      i = e[n]
    if (t <= i.at) return lerpPose(r, i, easeOf(i)((t - r.at) / (i.at - r.at || 1)))
  }
  return e[e.length - 1]
}
function computeProgress(e, t, r, i = CHAPTERS) {
  let a = Math.min(r.length, i.length)
  if (a === 0)
    return {
      index: 0,
      local: 0,
      handoff: 0,
      day: 0,
      hands: 0,
      trades: 0,
      value: 0,
      wear: 0,
      pose: i[0].keys[0],
    }
  let o = 0
  for (let t = 0; t < a; t++) e >= r[t].top && (o = t)
  let { top: s, height: c } = r[o],
    l = Math.max(1, c - t),
    u = clamp01((e - s) / l),
    d = o < a - 1 ? clamp01((e - (s + l)) / t) : 0,
    f = i[o],
    p =
      o > 0
        ? i[o - 1]
        : {
            day: 0,
            hands: 0,
            trades: 0,
            wear: 0,
          },
    [m, h] = f.countDuring ?? [0, 1],
    g = clamp01((u - m) / (h - m || 1)),
    _ = f.curves?.count ? curveAt(f.curves.count, u) : g,
    ee = f.curves?.wear ? curveAt(f.curves.wear, u) : _,
    te = f.curves?.day ? curveAt(f.curves.day, u) : g,
    ae = Math.round(lerp(p.trades, f.trades, _)),
    x = i[o + 1],
    oe = poseAt(f.keys, u)
  return {
    index: o,
    local: u,
    handoff: d,
    day: Math.round(lerp(p.day, f.day, te)),
    hands: Math.round(lerp(p.hands, f.hands, _)),
    trades: ae,
    value: ae * 10,
    wear: lerp(p.wear, f.wear, ee),
    pose: x && d > 0 ? lerpPose(oe, x.keys[0], smoothstep(d)) : oe,
  }
}
var chapterTops = [],
  progress = computeProgress(0, 1, chapterTops),
  listeners = new Set()
function getTops() {
  return chapterTops
}
function setTops(e) {
  ;((chapterTops = e), recompute())
}
function recompute() {
  ;((progress = computeProgress(window.scrollY, window.innerHeight, chapterTops)),
    listeners.forEach((e) => e(progress)))
}
function subscribe(e) {
  return (
    listeners.add(e),
    e(progress),
    () => {
      listeners.delete(e)
    }
  )
}
var DICT = {
    en: {
      langName: `English`,
      switchTo: `हिंदी`,
      storyLabel: `The life of a ten-rupee note`,
      hud: {
        day: `Day`,
        hands: `Hands`,
        moved: `Moved`,
        condition: `Condition`,
      },
      reveal: {
        moved: `of trade moved`,
        stats: (e, t) => `${e} hands · ${t} days`,
        times: (e) => `${e} × its own value`,
        serial: (e) => `Note ${e}`,
      },
      credits: {
        title: `The life of a ₹10 note`,
        sources: `The real numbers`,
        honesty: `What we made up`,
        illustrative: `Our note’s 730 days and 55 hands are a storytelling choice. Published lifespans for paper notes range from about 1 to 5 years, and nobody tracks individual notes.`,
        stylised: `The note shown is a stylised illustration, not a reproduction of legal tender.`,
        builtBy: `Built by Rishabh Singh`,
        rewind: `Rewind its life`,
        top: `Back to the start`,
      },
      chapterNav: `Chapters`,
      scrollHint: `Scroll`,
      sound: {
        on: `Turn sound on`,
        off: `Turn sound off`,
      },
      share: {
        button: `Share your note`,
        busy: `Making your card…`,
        file: `my-10-rupee-note.png`,
        text: (e) => `My ₹10 note moved ₹${e} of trade, and it’s still worth ₹10.`,
      },
      chapters: {
        'cold-open': {
          label: `Start`,
          caption: `₹10`,
          kicker: `One note. Many hands.`,
          description: `A single crisp ten-rupee note floats in the dark.`,
        },
        birth: {
          label: `Printed`,
          caption: `Printed.`,
          description: `Cotton fibres become paper. Colours, a watermark, a security thread and a serial number are printed. The sheets are cut and bundled.`,
        },
        vault: {
          label: `The vault`,
          caption: `RBI → Bank`,
          description: `An armoured van carries the bundles from the central bank vault to a currency chest, then on to a local bank branch.`,
        },
        'first-hands': {
          label: `Day 1`,
          caption: `Day 1`,
          description: `A bank teller counts out wages for a daily-wage worker. Our note is on top of the stack.`,
        },
        chai: {
          label: `Chai`,
          caption: `₹10 → chai`,
          description: `The worker buys a cutting chai. The note crosses the counter into the chaiwala’s steel tin. One person’s spending is another’s income.`,
        },
        chain: {
          label: `The chain`,
          description: `In quick succession the note passes from the chaiwala to a milk supplier, an auto-rickshaw driver, a vegetable vendor and a school canteen, picking up creases and stains. Every hand-off is another sale.`,
        },
        pause: {
          label: `Waiting`,
          caption: `Waiting…`,
          description: `The note rests in a child’s piggy bank, is given as a festival gift, then dropped into a temple donation box. Time passes, but nothing is bought.`,
        },
        return: {
          label: `Unfit`,
          caption: `Unfit.`,
          description: `The donations are deposited at a bank. A sorting machine checks every note. Ours, worn and taped, is flagged red.`,
        },
        reveal: {
          label: `The journey`,
          caption: `Still worth ₹10`,
          description: `Zooming out, the note’s whole path glows on a map. It has paid for many times its own value in trade, and it is still worth just ten rupees.`,
        },
        end: {
          label: `Goodbye`,
          caption: `Goodbye.`,
          kicker: `Same chai. New ways to pay.`,
          description: `The tired note is shredded and pressed into a briquette. A fresh note is printed. At the chai stall, a UPI QR code pings: a payment with no note at all.`,
        },
        outro: {
          label: `Credits`,
          description: `Sources and credits.`,
        },
      },
    },
    hi: {
      langName: `हिंदी`,
      switchTo: `English`,
      storyLabel: `दस रुपये के एक नोट की ज़िंदगी`,
      hud: {
        day: `दिन`,
        hands: `हाथ`,
        moved: `कारोबार`,
        condition: `हालत`,
      },
      reveal: {
        moved: `का कारोबार कराया`,
        stats: (e, t) => `${e} हाथ · ${t} दिन`,
        times: (e) => `अपनी कीमत का ${e} गुना`,
        serial: (e) => `नोट ${e}`,
      },
      credits: {
        title: `दस रुपये के एक नोट की ज़िंदगी`,
        sources: `असली आँकड़े`,
        honesty: `कहानी के लिए क्या गढ़ा गया`,
        illustrative: `हमारे नोट के 730 दिन और 55 हाथ कहानी के लिए चुने गए हैं। काग़ज़ के नोटों की उम्र के प्रकाशित अनुमान लगभग 1 से 5 साल तक हैं, और किसी एक नोट का हिसाब कोई नहीं रखता।`,
        stylised: `यहाँ दिखाया गया नोट एक चित्रण है, असली मुद्रा की नकल नहीं।`,
        builtBy: `ऋषभ सिंह ने बनाया`,
        rewind: `ज़िंदगी फिर से देखें`,
        top: `शुरुआत पर लौटें`,
      },
      chapterNav: `अध्याय`,
      scrollHint: `स्क्रॉल करें`,
      sound: {
        on: `आवाज़ चालू करें`,
        off: `आवाज़ बंद करें`,
      },
      share: {
        button: `अपना नोट शेयर करें`,
        busy: `कार्ड बन रहा है…`,
        file: `mera-10-rupaye-ka-note.png`,
        text: (e) => `मेरे ₹10 के नोट ने ₹${e} का कारोबार कराया, और उसकी कीमत अब भी ₹10 है।`,
      },
      chapters: {
        'cold-open': {
          label: `शुरुआत`,
          caption: `₹10`,
          kicker: `एक नोट। कई हाथ।`,
          description: `अँधेरे में दस रुपये का एक नया, कड़क नोट तैरता है।`,
        },
        birth: {
          label: `छपाई`,
          caption: `छप गया।`,
          description: `कपास के रेशे कागज़ बनते हैं। रंग, वॉटरमार्क, सुरक्षा धागा और क्रमांक छपते हैं। शीटें कटकर गड्डियों में बँधती हैं।`,
        },
        vault: {
          label: `तिजोरी`,
          caption: `RBI → बैंक`,
          description: `बख़्तरबंद गाड़ी गड्डियों को रिज़र्व बैंक की तिजोरी से करेंसी चेस्ट और फिर एक स्थानीय बैंक शाखा तक ले जाती है।`,
        },
        'first-hands': {
          label: `पहला दिन`,
          caption: `पहला दिन`,
          description: `बैंक का कैशियर एक दिहाड़ी मज़दूर की मज़दूरी गिनकर देता है। हमारा नोट गड्डी में सबसे ऊपर है।`,
        },
        chai: {
          label: `चाय`,
          caption: `₹10 → चाय`,
          description: `मज़दूर एक कटिंग चाय ख़रीदता है। नोट काउंटर पार करके चायवाले के स्टील के डिब्बे में पहुँचता है। एक का ख़र्च, दूसरे की कमाई।`,
        },
        chain: {
          label: `सिलसिला`,
          description: `नोट तेज़ी से चायवाले से दूधवाले, ऑटो-रिक्शा वाले, सब्ज़ीवाले और स्कूल कैंटीन तक जाता है, और रास्ते में सिलवटें और दाग़ बटोरता है। हर लेन-देन एक नई बिक्री है।`,
        },
        pause: {
          label: `इंतज़ार`,
          caption: `इंतज़ार…`,
          description: `नोट एक बच्चे की गुल्लक में रहता है, त्योहार पर शगुन में दिया जाता है, फिर मंदिर की दान-पेटी में डाला जाता है। समय बीतता है, पर कुछ ख़रीदा नहीं जाता।`,
        },
        return: {
          label: `अयोग्य`,
          caption: `अयोग्य।`,
          description: `दान की रकम बैंक में जमा होती है। छँटाई मशीन हर नोट को जाँचती है। हमारा घिसा हुआ, टेप लगा नोट लाल निशान पाता है।`,
        },
        reveal: {
          label: `पूरा सफ़र`,
          caption: `अब भी ₹10`,
          description: `कैमरा पीछे हटता है और नक्शे पर नोट का पूरा सफ़र चमक उठता है। इसने अपनी कीमत से कई गुना कारोबार कराया, फिर भी इसकी कीमत सिर्फ़ दस रुपये है।`,
        },
        end: {
          label: `अलविदा`,
          caption: `अलविदा।`,
          kicker: `वही चाय। पैसे देने के नए तरीके।`,
          description: `थका हुआ नोट कतरनों में बदलकर ईंट में दबा दिया जाता है। एक नया नोट छपता है। चाय की दुकान पर UPI का QR कोड बजता है: बिना नोट के भुगतान।`,
        },
        outro: {
          label: `आभार`,
          description: `स्रोत और आभार।`,
        },
      },
    },
  },
  LANG_KEY = `tenrupee.lang`
function initialLang() {
  try {
    let e = localStorage.getItem(LANG_KEY)
    if (e === `en` || e === `hi`) return e
  } catch {}
  return navigator.language?.toLowerCase().startsWith(`hi`) ? `hi` : `en`
}
var I18nContext = createContext(null)
function I18nProvider({ children: e }) {
  let [t, n] = useState(initialLang)
  useEffect(() => {
    document.documentElement.lang = t
    try {
      localStorage.setItem(LANG_KEY, t)
    } catch {}
  }, [t])
  let r = useCallback(() => n((e) => (e === `en` ? `hi` : `en`)), [])
  return (
    <I18nContext.Provider
      value={{
        lang: t,
        t: DICT[t],
        toggle: r,
      }}
    >
      {e}
    </I18nContext.Provider>
  )
}
function useI18n() {
  let e = useContext(I18nContext)
  if (!e) throw Error(`useI18n must be used inside <I18nProvider>`)
  return e
}
var Chapter = forwardRef(function ({ chapter: e, index: t, children: n }, r) {
    let { t: i } = useI18n(),
      a = i.chapters[e.id]
    return (
      <section
        ref={r}
        id={`ch-${e.id}`}
        className={e.flow ? `scene scene--flow` : `scene`}
        data-chapter={t}
        style={{
          '--len': e.length,
          '--tint': e.floor ?? e.tint,
        }}
        aria-labelledby={`ch-${e.id}-title`}
      >
        <div className={`scene__stage`}>
          <h2 id={`ch-${e.id}-title`} className={`sr-only`}>
            {a.label}
          </h2>
          <p className={`sr-only`}>{a.description}</p>
          <div className={`scene__art`} aria-hidden={!e.flow || void 0}>
            {n}
          </div>
        </div>
      </section>
    )
  }),
  SERIAL_KEY = `tenrupee.serial`,
  SERIAL_LETTERS = `ABCDEFGHJKLMNPRSTUVWXYZ`,
  pick = (e) => e[Math.floor(Math.random() * e.length)]
function newSerial() {
  return `${String(1 + Math.floor(Math.random() * 9)) + pick(SERIAL_LETTERS) + pick(SERIAL_LETTERS)} ${String(Math.floor(Math.random() * 1e6)).padStart(6, `0`)}`
}
var serialCache = null
function getSerial() {
  return serialCache || ((serialCache = loadSerial()), serialCache)
}
function loadSerial() {
  try {
    let e = localStorage.getItem(SERIAL_KEY)
    if (e && /^\d[A-Z]{2} \d{6}$/.test(e)) return e
  } catch {}
  let e = newSerial()
  try {
    localStorage.setItem(SERIAL_KEY, e)
  } catch {}
  return e
}
function hashSerial(e) {
  let t = 2166136261
  for (let n = 0; n < e.length; n++) ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)))
  return (t >>> 0) / 4294967295
}
function Note() {
  let e = useRef(null),
    t = useRef([]),
    n = useRef(null),
    r = useRef(null),
    i = useMemo(getSerial, []),
    a = useMemo(() => hashSerial(i), [i]),
    o = {
      x: 175 + a * 70,
      y: 40 + ((a * 7) % 1) * 50,
    },
    s = -8 + ((a * 13) % 1) * 16
  useEffect(
    () =>
      subscribe((i) => {
        let a = i.pose,
          o = e.current
        ;(o &&
          (o.style.setProperty(`--x`, a.x.toFixed(2)),
          o.style.setProperty(`--y`, a.y.toFixed(2)),
          o.style.setProperty(`--s`, a.scale.toFixed(4)),
          o.style.setProperty(`--r`, `${a.rotate.toFixed(2)}deg`),
          o.style.setProperty(`--ry`, `${a.rotateY.toFixed(2)}deg`),
          o.style.setProperty(`--rx`, `${a.rotateX.toFixed(2)}deg`),
          (o.style.opacity = String(a.opacity)),
          o.style.setProperty(`--clip`, `${(a.clip * 100).toFixed(2)}%`)),
          t.current.forEach((e, t) => e?.setAttribute(`opacity`, String(clamp01(i.wear - t)))),
          r.current?.setAttribute(`opacity`, String(clamp01(i.wear - 4))),
          n.current?.setAttribute(`opacity`, String((i.wear / 6) * 0.3)))
      }),
    [],
  )
  let c = (e) => (n) => {
    t.current[e] = n
  }
  return (
    <div className={`note-layer`} aria-hidden={`true`}>
      <div ref={e} className={`note`}>
        <svg viewBox={`0 0 300 140`} className={`note__svg`}>
          <defs>
            <mask id={`note-tear`}>
              <rect width={`300`} height={`140`} fill={`#fff`} />
              <path
                ref={r}
                d={`M300 0 L262 0 L268 9 L259 16 L271 22 L264 31 L276 36 L300 44 Z`}
                fill={`#000`}
                opacity={`0`}
              />
            </mask>
            <pattern
              id={`note-lines`}
              width={`6`}
              height={`6`}
              patternUnits={`userSpaceOnUse`}
              patternTransform={`rotate(30)`}
            >
              <line
                x1={`0`}
                y1={`0`}
                x2={`0`}
                y2={`6`}
                stroke={`#F3EAD7`}
                strokeWidth={`0.6`}
                opacity={`0.18`}
              />
            </pattern>
          </defs>
          <g mask={`url(#note-tear)`}>
            <rect width={`300`} height={`140`} rx={`5`} fill={`#6B4A2E`} />
            <rect x={`8`} y={`8`} width={`284`} height={`124`} rx={`3`} fill={`#80593A`} />
            <rect x={`8`} y={`8`} width={`284`} height={`124`} rx={`3`} fill={`url(#note-lines)`} />
            <rect
              x={`8`}
              y={`8`}
              width={`284`}
              height={`124`}
              rx={`3`}
              fill={`none`}
              stroke={`#F3EAD7`}
              strokeOpacity={`0.35`}
              strokeWidth={`1`}
            />
            <g
              transform={`translate(74 70)`}
              stroke={`#F3EAD7`}
              fill={`none`}
              strokeOpacity={`0.85`}
            >
              <circle r={`36`} strokeWidth={`3`} />
              <circle r={`30`} strokeWidth={`1`} />
              <circle r={`7`} strokeWidth={`2.5`} />
              {Array.from(
                {
                  length: 16,
                },
                (e, t) => (
                  <line
                    x1={`0`}
                    y1={`-8`}
                    x2={`0`}
                    y2={`-30`}
                    strokeWidth={t % 2 ? 1 : 3}
                    transform={`rotate(${t * 22.5})`}
                    key={t}
                  />
                ),
              )}
            </g>
            <line
              x1={`150`}
              y1={`8`}
              x2={`150`}
              y2={`132`}
              stroke={`#C9C2B4`}
              strokeWidth={`2`}
              strokeDasharray={`7 5`}
              opacity={`0.7`}
            />
            <ellipse cx={`128`} cy={`72`} rx={`12`} ry={`22`} fill={`#F3EAD7`} opacity={`0.12`} />
            <text x={`176`} y={`100`} className={`note__value`} fill={`#F3EAD7`}>
              ₹10
            </text>
            <text
              x={`278`}
              y={`34`}
              className={`note__hindi`}
              fill={`#F3EAD7`}
              opacity={`0.85`}
              textAnchor={`end`}
            >
              दस रुपये
            </text>
            <text x={`22`} y={`26`} className={`note__serial`} fill={`#F3EAD7`}>
              {i}
            </text>
            <text
              x={`278`}
              y={`128`}
              className={`note__serial`}
              fill={`#F3EAD7`}
              textAnchor={`end`}
            >
              {i}
            </text>
            <g ref={c(0)} opacity={`0`}>
              <line
                x1={`152`}
                y1={`0`}
                x2={`148`}
                y2={`140`}
                stroke={`#2A1D12`}
                strokeWidth={`1.2`}
                opacity={`0.45`}
              />
              <line
                x1={`153.5`}
                y1={`0`}
                x2={`149.5`}
                y2={`140`}
                stroke={`#F3EAD7`}
                strokeWidth={`0.8`}
                opacity={`0.3`}
              />
            </g>
            <g ref={c(1)} opacity={`0`}>
              <line
                x1={`0`}
                y1={`69`}
                x2={`300`}
                y2={`73`}
                stroke={`#2A1D12`}
                strokeWidth={`1.2`}
                opacity={`0.4`}
              />
              <line
                x1={`0`}
                y1={`70.5`}
                x2={`300`}
                y2={`74.5`}
                stroke={`#F3EAD7`}
                strokeWidth={`0.8`}
                opacity={`0.25`}
              />
            </g>
            <g ref={c(2)} opacity={`0`}>
              <ellipse
                cx={o.x}
                cy={o.y}
                rx={`27`}
                ry={`25`}
                fill={`none`}
                stroke={`#3B2410`}
                strokeWidth={`5`}
                opacity={`0.35`}
              />
              <ellipse
                cx={o.x + 2}
                cy={o.y + 1}
                rx={`22`}
                ry={`21`}
                fill={`#3B2410`}
                opacity={`0.1`}
              />
            </g>
            <g ref={c(3)} opacity={`0`} transform={`rotate(${s} 110 112)`}>
              <path
                d={`M62 116 c6 -10 10 6 16 -2 s6 -9 12 0 s8 6 13 -3 m6 4 c4 -6 9 -6 10 0 s6 3 9 -4 m4 2 l14 -1 m-6 -6 l0 12`}
                fill={`none`}
                stroke={`#2B4C9B`}
                strokeWidth={`1.6`}
                strokeLinecap={`round`}
                opacity={`0.8`}
              />
            </g>
            <g ref={c(5)} opacity={`0`}>
              <rect
                x={`244`}
                y={`10`}
                width={`62`}
                height={`20`}
                fill={`#FFF7D6`}
                opacity={`0.5`}
                transform={`rotate(38 275 20)`}
              />
            </g>
            <rect
              ref={n}
              width={`300`}
              height={`140`}
              rx={`5`}
              fill={`#2A1D12`}
              opacity={`0`}
              style={{
                mixBlendMode: `multiply`,
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
var rupeeFmt = new Intl.NumberFormat(`en-IN`)
function Hud() {
  let { t: e } = useI18n(),
    t = useRef(null),
    r = useRef(null),
    i = useRef(null),
    a = useRef(null),
    o = useRef([])
  useEffect(() => {
    let e = -1,
      s = -1
    return subscribe((c) => {
      if (t.current) {
        let e = CHAPTERS[c.index],
          r = CHAPTERS[c.index + 1],
          i = c.index === 0 ? c.handoff : 1
        ;(e.hud === !1
          ? (i = 0)
          : typeof e.hud == `number` && (i = 1 - clamp01((c.local - e.hud) / 0.04)),
          r?.hud === !1 && (i = Math.min(i, 1 - c.handoff)),
          (t.current.style.opacity = String(i)))
      }
      ;(r.current && (r.current.textContent = String(c.day).padStart(3, `0`)),
        i.current &&
          ((i.current.textContent = rupeeFmt.format(c.hands)),
          e >= 0 && c.hands > e && restartPulse(i.current)),
        a.current &&
          ((a.current.textContent = `₹${rupeeFmt.format(c.value)}`),
          s >= 0 && c.trades > s && restartPulse(a.current)),
        (e = c.hands),
        (s = c.trades),
        o.current.forEach((e, t) => e?.setAttribute(`opacity`, String(clamp01(c.wear - t)))))
    })
  }, [])
  let s = (e) => (t) => {
    o.current[e] = t
  }
  return (
    <div ref={t} className={`hud`} aria-hidden={`true`}>
      <div className={`hud__item`}>
        <span className={`hud__label`}>{e.hud.day}</span>
        <span ref={r} className={`hud__value`}>
          000
        </span>
      </div>
      <div className={`hud__item`}>
        <span className={`hud__label`}>{e.hud.hands}</span>
        <span ref={i} className={`hud__value`}>
          0
        </span>
      </div>
      <div className={`hud__item`}>
        <span className={`hud__label`}>{e.hud.moved}</span>
        <span ref={a} className={`hud__value`}>
          ₹0
        </span>
      </div>
      <div className={`hud__item`}>
        <span className={`hud__label`}>{e.hud.condition}</span>
        <svg className={`hud__glyph`} viewBox={`0 0 40 20`}>
          <rect
            x={`1`}
            y={`1`}
            width={`38`}
            height={`18`}
            rx={`2`}
            fill={`currentColor`}
            opacity={`0.9`}
          />
          <line
            ref={s(0)}
            x1={`20`}
            y1={`1`}
            x2={`20`}
            y2={`19`}
            stroke={`var(--paper)`}
            strokeWidth={`1`}
            opacity={`0`}
          />
          <line
            ref={s(1)}
            x1={`1`}
            y1={`10`}
            x2={`39`}
            y2={`10`}
            stroke={`var(--paper)`}
            strokeWidth={`1`}
            opacity={`0`}
          />
          <circle
            ref={s(2)}
            cx={`29`}
            cy={`7`}
            r={`3.5`}
            fill={`none`}
            stroke={`var(--amber)`}
            strokeWidth={`1.4`}
            opacity={`0`}
          />
          <path
            ref={s(3)}
            d={`M6 15 q3 -3 5 0 t5 0`}
            fill={`none`}
            stroke={`var(--paper)`}
            strokeWidth={`1`}
            opacity={`0`}
          />
          <path
            ref={s(4)}
            d={`M39 1 L33 1 L35 4 L32 6 L39 8 Z`}
            fill={`var(--hud-bg)`}
            opacity={`0`}
          />
          <rect
            ref={s(5)}
            x={`31`}
            y={`2`}
            width={`10`}
            height={`4`}
            fill={`var(--red)`}
            opacity={`0`}
            transform={`rotate(35 36 4)`}
          />
        </svg>
      </div>
    </div>
  )
}
function restartPulse(e) {
  ;(e.classList.remove(`is-pulsing`), e.offsetWidth, e.classList.add(`is-pulsing`))
}
function ChapterNav() {
  let { t: e } = useI18n(),
    [t, r] = useState(0)
  useEffect(() => subscribe((e) => r((t) => (t === e.index ? t : e.index))), [])
  let i = (e) => {
    let t = getTops()[e]
    t && smoothScrollTo(t.top + 1)
  }
  return (
    <nav className={`chapter-nav`} aria-label={e.chapterNav}>
      <ol>
        {CHAPTERS.map((n, r) => (
          <li key={n.id}>
            <button
              type={`button`}
              className={r === t ? `is-active` : void 0}
              aria-current={r === t ? `step` : void 0}
              onClick={() => i(r)}
            >
              <span className={`chapter-nav__dot`} aria-hidden={`true`} />
              <span className={`chapter-nav__label`}>{e.chapters[n.id].label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
var Ae = null,
  je = null,
  T = null,
  E = !1
function Me(e) {
  ;((E = e),
    e
      ? (Ae ||
          ((Ae = new (window.AudioContext ?? window.webkitAudioContext)()),
          (je = Ae.createGain()),
          (je.gain.value = 0.55),
          je.connect(Ae.destination)),
        Ae.resume())
      : Ae?.suspend())
}
function Ne(e) {
  if (T) return T
  T = e.createBuffer(1, e.sampleRate * 2, e.sampleRate)
  let t = T.getChannelData(0)
  for (let e = 0; e < t.length; e++) t[e] = Math.random() * 2 - 1
  return T
}
function D(e) {
  E && Ae && je && Ae.state === `running` && e(Ae, je, Ae.currentTime + 0.005)
}
function Pe(e, t, n, r, i, a) {
  let o = e.createGain()
  return (
    o.gain.setValueAtTime(1e-4, n),
    o.gain.exponentialRampToValueAtTime(r, n + i),
    o.gain.exponentialRampToValueAtTime(1e-4, n + i + a),
    o.connect(t),
    o
  )
}
function Fe(e, t, n, r, i, a, o = 1, s = 1) {
  let c = e.createBufferSource()
  ;((c.buffer = Ne(e)), (c.playbackRate.value = s))
  let l = e.createBiquadFilter()
  return (
    (l.type = i),
    (l.frequency.value = a),
    (l.Q.value = o),
    c.connect(l).connect(t),
    c.start(n, Math.random()),
    c.stop(n + r),
    l
  )
}
function Ie(e, t, n, r, i, a = `sine`) {
  let o = e.createOscillator()
  return (
    (o.type = a),
    o.frequency.setValueAtTime(r, n),
    o.connect(t),
    o.start(n),
    o.stop(n + i),
    o
  )
}
var sounds = {
  rustle: () =>
    D((e, t, n) => {
      Fe(
        e,
        Pe(e, t, n, 0.5, 0.02, 0.2),
        n,
        0.3,
        `bandpass`,
        2600 + Math.random() * 1400,
        0.9,
        0.8 + Math.random() * 0.4,
      )
    }),
  flick: () =>
    D((e, t, n) => {
      Fe(e, Pe(e, t, n, 0.18, 0.004, 0.05), n, 0.08, `highpass`, 5e3, 0.7)
    }),
  clink: (e = 1) =>
    D((t, n, r) => {
      ;[2350, 3520, 5150].forEach((i, a) => {
        Ie(t, Pe(t, n, r, 0.22 / (a + 1), 0.002, 0.45 - a * 0.1), r, i * e, 0.6)
      })
    }),
  coins: () => {
    for (let e = 0; e < 7; e++)
      setTimeout(() => sounds.clink(0.7 + Math.random() * 0.5), e * 45 + Math.random() * 40)
  },
  pour: () =>
    D((e, t, n) => {
      let r = e.createGain()
      ;(r.gain.setValueAtTime(1e-4, n),
        r.gain.exponentialRampToValueAtTime(0.35, n + 0.25),
        r.gain.setValueAtTime(0.35, n + 1.1),
        r.gain.exponentialRampToValueAtTime(1e-4, n + 1.5),
        r.connect(t),
        Fe(e, r, n, 1.6, `bandpass`, 700, 1.6).frequency.linearRampToValueAtTime(1300, n + 1.4))
    }),
  whirr: (e = 1.2) =>
    D((t, n, r) => {
      let i = t.createGain()
      ;(i.gain.setValueAtTime(1e-4, r),
        i.gain.exponentialRampToValueAtTime(0.16, r + 0.08),
        i.gain.setValueAtTime(0.16, r + e - 0.15),
        i.gain.exponentialRampToValueAtTime(1e-4, r + e))
      let a = t.createBiquadFilter()
      ;((a.type = `lowpass`),
        (a.frequency.value = 900),
        i.connect(n),
        a.connect(i),
        Ie(t, a, r, 110, e, `sawtooth`),
        Ie(t, a, r, 165, e, `square`),
        Fe(t, i, r, e, `bandpass`, 3e3, 2))
    }),
  thunk: () =>
    D((e, t, n) => {
      ;(Ie(e, Pe(e, t, n, 0.7, 0.003, 0.35), n, 140, 0.4).frequency.exponentialRampToValueAtTime(
        45,
        n + 0.3,
      ),
        Fe(e, Pe(e, t, n, 0.25, 0.002, 0.08), n, 0.1, `lowpass`, 1800))
    }),
  rip: () =>
    D((e, t, n) => {
      Fe(
        e,
        Pe(e, t, n, 0.45, 0.01, 0.3),
        n,
        0.35,
        `bandpass`,
        1200,
        2,
      ).frequency.exponentialRampToValueAtTime(4200, n + 0.3)
    }),
  crack: () =>
    D((e, t, n) => {
      Fe(e, Pe(e, t, n, 0.7, 0.002, 0.18), n, 0.2, `lowpass`, 2400, 1)
    }),
  bell: () =>
    D((e, t, n) => {
      ;[1, 2.76, 5.4, 8.93].forEach((r, i) => {
        Ie(e, Pe(e, t, n, 0.2 / (i + 1), 0.004, 2.6 - i * 0.5), n, 523 * r, 3)
      })
    }),
  reject: () =>
    D((e, t, n) => {
      ;[0, 0.16].forEach((r) => {
        Ie(e, Pe(e, t, n + r, 0.12, 0.005, 0.12), n + r, 330, 0.14, `square`)
      })
    }),
  shred: () =>
    D((e, t, n) => {
      let r = 1.6,
        i = e.createGain()
      ;(i.gain.setValueAtTime(1e-4, n),
        i.gain.exponentialRampToValueAtTime(0.3, n + 0.1),
        i.gain.setValueAtTime(0.3, n + r - 0.2),
        i.gain.exponentialRampToValueAtTime(1e-4, n + r),
        i.connect(t),
        Fe(e, i, n, r, `bandpass`, 1600, 1.2),
        Ie(e, i, n, 58, r, `sawtooth`))
    }),
  ding: () =>
    D((e, t, n) => {
      ;[1318.5, 1760].forEach((r, i) => {
        Ie(e, Pe(e, t, n + i * 0.12, 0.28, 0.004, 0.7), n + i * 0.12, r, 0.8)
      })
    }),
  whoosh: () =>
    D((e, t, n) => {
      Fe(
        e,
        Pe(e, t, n, 0.25, 0.4, 0.6),
        n,
        1.1,
        `bandpass`,
        300,
        1.2,
      ).frequency.exponentialRampToValueAtTime(2400, n + 0.9)
    }),
  shimmer: () =>
    D((e, t, n) => {
      ;[2093, 2637, 3136, 4186].forEach((r, i) => {
        Ie(e, Pe(e, t, n + i * 0.06, 0.08, 0.004, 0.5), n + i * 0.06, r, 0.6)
      })
    }),
  chord: () =>
    D((e, t, n) => {
      ;[261.6, 329.6, 392, 523.3].forEach((r) => {
        Ie(e, Pe(e, t, n, 0.08, 0.3, 2.2), n, r, 2.6, `triangle`)
      })
    }),
}
function SoundToggle() {
  let { t: e } = useI18n(),
    [t, n] = useState(!1)
  return (
    <button
      type={`button`}
      className={`sound-toggle`}
      onClick={() => {
        let e = !t
        ;(Me(e), n(e))
      }}
      aria-pressed={t}
      aria-label={t ? e.sound.off : e.sound.on}
      title={t ? e.sound.off : e.sound.on}
    >
      <svg
        viewBox={`0 0 24 24`}
        width={`20`}
        height={`20`}
        aria-hidden={`true`}
        fill={`none`}
        stroke={`currentColor`}
        strokeWidth={`2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      >
        <path d={`M4 9h4l5-4v14l-5-4H4z`} fill={`currentColor`} stroke={`none`} />
        {t ? (
          <>
            <path d={`M16 9a4 4 0 0 1 0 6`} />
            <path d={`M18.5 6.5a7.5 7.5 0 0 1 0 11`} />
          </>
        ) : (
          <path d={`M16 9l5 6M21 9l-5 6`} />
        )}
      </svg>
    </button>
  )
}
function Chrome() {
  let { t: e, lang: t, toggle: n } = useI18n(),
    r = useRef(null)
  return (
    useEffect(
      () =>
        subscribe((e) => {
          r.current &&
            (r.current.style.opacity = String(e.index === 0 ? Math.max(0, 1 - e.local * 4) : 0))
        }),
      [],
    ),
    (
      <>
        <header className={`topbar`}>
          <SoundToggle />
          <button
            type={`button`}
            className={`lang-toggle`}
            onClick={n}
            lang={t === `en` ? `hi` : `en`}
          >
            {e.switchTo}
          </button>
        </header>
        <div ref={r} className={`scroll-hint`} aria-hidden={`true`}>
          <span>{e.scrollHint}</span>
          <span className={`scroll-hint__line`} />
        </div>
      </>
    )
  )
}
var INK = `#1E1A16`,
  PAPER = `#F3EAD7`,
  WORLD = {
    left: -1400,
    right: 2400,
    top: -1100,
    bottom: 2100,
  }
function useScrollTimeline(t, n, r) {
  useLayoutEffect(() => {
    let i = t.current ?? n.current?.closest(`section`)
    if (!i || !n.current) return
    let a = gsap.context(() => {
      let t = gsap.timeline({
        defaults: {
          ease: `none`,
        },
        scrollTrigger: {
          trigger: i,
          start: `top top`,
          end: `bottom bottom`,
          scrub: !0,
        },
      })
      ;(r(t), t.set({}, {}, 1))
    }, n.current)
    return () => a.revert()
  }, [t, n])
}
function followRoute(e, t, n, r, i, a = 0, o = 0, s = !1) {
  let c = n.filter((e) => e.at >= r - 1e-9 && e.at <= i + 1e-9)
  for (let n = 1; n < c.length; n++) {
    let r = c[n - 1],
      i = c[n],
      l = {
        x: i.x + a,
        y: i.y + o,
        duration: i.at - r.at,
        ease: easeOf(i),
      }
    ;(s && (l.rotation = i.rotate), e.to(t, l, r.at))
  }
}
function seededRandom(e) {
  let t = e >>> 0
  return () => ((t = (t * 1664525 + 1013904223) >>> 0), t / 4294967296)
}
function ColdOpen({ section: e }) {
  let { t } = useI18n(),
    n = useRef(null),
    r = t.chapters[`cold-open`],
    i = useMemo(() => {
      let e = seededRandom(10)
      return Array.from(
        {
          length: 56,
        },
        () => ({
          x: -350 + e() * 1700,
          y: e() * 1300 - 150,
          r: 1.2 + e() * 3.2,
          o: 0.12 + e() * 0.45,
          near: e() > 0.6,
        }),
      )
    }, [])
  return (
    useScrollTimeline(e, n, (e) => {
      e.fromTo(
        `.co__spot`,
        {
          scale: 0.55,
          opacity: 0.35,
        },
        {
          scale: 1.25,
          opacity: 1,
          duration: 0.7,
          ease: `power2.out`,
        },
        0,
      )
        .fromTo(
          `.co__big`,
          {
            yPercent: 6,
            opacity: 0.08,
          },
          {
            yPercent: -10,
            opacity: 0.16,
            duration: 1,
          },
          0,
        )
        .fromTo(
          `.co__dust-far`,
          {
            y: 0,
          },
          {
            y: -120,
            duration: 1,
          },
          0,
        )
        .fromTo(
          `.co__dust-near`,
          {
            y: 0,
          },
          {
            y: -320,
            duration: 1,
          },
          0,
        )
        .fromTo(
          `.co__kicker`,
          {
            y: 24,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.18,
            ease: `power3.out`,
          },
          0.32,
        )
        .to(
          `.co__kicker`,
          {
            y: -16,
            autoAlpha: 0,
            duration: 0.12,
            ease: `power2.in`,
          },
          0.86,
        )
    }),
    (
      <div ref={n} className={`co`}>
        <div className={`co__spot`} />
        <p className={`co__big`}>{r.caption}</p>
        <svg className={`stage-svg`} viewBox={`0 0 1000 1000`}>
          <g className={`co__dust-far`}>
            {i
              .filter((e) => !e.near)
              .map((e, t) => (
                <circle cx={e.x} cy={e.y} r={e.r * 0.7} fill={PAPER} opacity={e.o * 0.7} key={t} />
              ))}
          </g>
          <g className={`co__dust-near`}>
            {i
              .filter((e) => e.near)
              .map((e, t) => (
                <circle cx={e.x} cy={e.y} r={e.r} fill={PAPER} opacity={e.o} key={t} />
              ))}
          </g>
        </svg>
        {r.kicker && (
          <div className={`stage-text co__kicker-pos`}>
            <p className={`co__kicker`}>{r.kicker}</p>
          </div>
        )}
      </div>
    )
  )
}

export {
  clamp01,
  lerp,
  smoothstep,
  EASES,
  easeOf,
  lerpPose,
  curveAt,
  poseAt,
  computeProgress,
  chapterTops,
  progress,
  listeners,
  getTops,
  setTops,
  recompute,
  subscribe,
  DICT,
  LANG_KEY,
  initialLang,
  I18nContext,
  I18nProvider,
  useI18n,
  Chapter,
  SERIAL_KEY,
  SERIAL_LETTERS,
  pick,
  newSerial,
  serialCache,
  getSerial,
  loadSerial,
  hashSerial,
  Note,
  rupeeFmt,
  Hud,
  restartPulse,
  ChapterNav,
  Ae,
  je,
  T,
  E,
  Me,
  Ne,
  D,
  Pe,
  Fe,
  Ie,
  sounds,
  SoundToggle,
  Chrome,
  INK,
  PAPER,
  WORLD,
  useScrollTimeline,
  followRoute,
  seededRandom,
  ColdOpen,
}
