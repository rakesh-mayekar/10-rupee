import { lazy } from 'react'
import {
  setTops,
  recompute,
  subscribe,
  I18nProvider,
  useI18n,
  Chapter,
  Note,
  Hud,
  ColdOpen,
  sounds,
  ChapterNav,
  Chrome,
} from './core'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { ROUTE, CHAPTERS, CHAIN_AT } from '../story/timeline'
import { initSmoothScroll } from '../lib/smoothScroll'
import { ShareButton } from './Share'
import { Suspense, createRef, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

const loaders = {
  birth: () =>
    import('../scenes/BirthScene').then((m) => ({
      default: m.BirthScene,
    })),
  vault: () =>
    import('../scenes/VaultScene').then((m) => ({
      default: m.VaultScene,
    })),
  'first-hands': () =>
    import('../scenes/FirstHandsScene').then((m) => ({
      default: m.FirstHandsScene,
    })),
  chai: () =>
    import('../scenes/ChaiScene').then((m) => ({
      default: m.ChaiScene,
    })),
  chain: () =>
    import('../scenes/ChainScene').then((m) => ({
      default: m.ChainScene,
    })),
  pause: () =>
    import('../scenes/PauseScene').then((m) => ({
      default: m.PauseScene,
    })),
  return: () =>
    import('../scenes/UnfitScene').then((m) => ({
      default: m.UnfitScene,
    })),
  reveal: () =>
    import('../scenes/RevealScene').then((m) => ({
      default: m.RevealScene,
    })),
  end: () =>
    import('../scenes/EndScene').then((m) => ({
      default: m.EndScene,
    })),
  outro: () =>
    import('../scenes/OutroScene').then((m) => ({
      default: m.OutroScene,
    })),
}
const SCENES = {
  'cold-open': ColdOpen,
  ...Object.fromEntries(Object.entries(loaders).map(([k, v]) => [k, lazy(v)])),
}
function preloadScenes() {
  Object.values(loaders).forEach((e) => void e?.())
}
var nt = [
    {
      chapter: `birth`,
      at: 0.2,
      sound: `whirr`,
      arg: 0.9,
    },
    {
      chapter: `birth`,
      at: 0.3,
      sound: `whirr`,
      arg: 0.9,
    },
    {
      chapter: `birth`,
      at: 0.4,
      sound: `whirr`,
      arg: 0.9,
    },
    {
      chapter: `birth`,
      at: 0.55,
      sound: `shimmer`,
    },
    {
      chapter: `birth`,
      at: 0.64,
      sound: `thunk`,
    },
    {
      chapter: `birth`,
      at: 0.86,
      sound: `rustle`,
    },
    {
      chapter: `vault`,
      at: 0.4,
      sound: `thunk`,
    },
    {
      chapter: `first-hands`,
      at: 0.14,
      sound: `whirr`,
      arg: 1.4,
    },
    {
      chapter: `first-hands`,
      at: 0.5,
      sound: `rustle`,
    },
    {
      chapter: `first-hands`,
      at: 0.68,
      sound: `rustle`,
    },
    {
      chapter: `chai`,
      at: 0.22,
      sound: `pour`,
    },
    {
      chapter: `chai`,
      at: 0.56,
      sound: `clink`,
    },
    {
      chapter: `chai`,
      at: 0.7,
      sound: `rustle`,
    },
    {
      chapter: `chai`,
      at: 0.87,
      sound: `clink`,
      arg: 0.6,
    },
    ...CHAIN_AT.map((e) => ({
      chapter: `chain`,
      at: e,
      sound: `rustle`,
    })),
    {
      chapter: `pause`,
      at: 0.14,
      sound: `clink`,
      arg: 0.5,
    },
    ...[0.16, 0.195, 0.23, 0.265, 0.3, 0.335].map((e) => ({
      chapter: `pause`,
      at: e,
      sound: `flick`,
    })),
    {
      chapter: `pause`,
      at: 0.37,
      sound: `crack`,
    },
    {
      chapter: `pause`,
      at: 0.38,
      sound: `coins`,
    },
    {
      chapter: `pause`,
      at: 0.56,
      sound: `rustle`,
    },
    {
      chapter: `pause`,
      at: 0.72,
      sound: `clink`,
      arg: 0.5,
    },
    {
      chapter: `pause`,
      at: 0.74,
      sound: `bell`,
    },
    {
      chapter: `return`,
      at: 0.078,
      sound: `rip`,
    },
    {
      chapter: `return`,
      at: 0.16,
      sound: `rip`,
    },
    {
      chapter: `return`,
      at: 0.36,
      sound: `whirr`,
      arg: 2.2,
    },
    {
      chapter: `return`,
      at: 0.585,
      sound: `reject`,
    },
    {
      chapter: `return`,
      at: 0.6,
      sound: `thunk`,
    },
    {
      chapter: `reveal`,
      at: 0.04,
      sound: `whoosh`,
    },
    ...ROUTE.filter((e) => !e.rush).map((e) => ({
      chapter: `reveal`,
      at: e.at,
      sound: `flick`,
    })),
    {
      chapter: `reveal`,
      at: 0.8,
      sound: `chord`,
    },
    {
      chapter: `end`,
      at: 0.1,
      sound: `shred`,
    },
    {
      chapter: `end`,
      at: 0.3,
      sound: `thunk`,
    },
    {
      chapter: `end`,
      at: 0.52,
      sound: `whirr`,
      arg: 0.9,
    },
    {
      chapter: `end`,
      at: 0.6,
      sound: `shimmer`,
    },
    {
      chapter: `end`,
      at: 0.83,
      sound: `ding`,
    },
    {
      chapter: `end`,
      at: 0.9,
      sound: `clink`,
    },
  ]
    .map((e) => ({
      ...e,
      pos: CHAPTERS.findIndex((t) => t.id === e.chapter) + e.at,
    }))
    .sort((e, t) => e.pos - t.pos),
  rt = 3,
  it = 70
function useSoundCues() {
  let e = -1,
    t = -1,
    n = 0
  return subscribe((r) => {
    let i = r.index + r.local
    if (e >= 0 && i > e) {
      let t = nt.filter((t) => t.pos > e && t.pos <= i)
      t.length <= rt &&
        t.forEach((e) => (e.arg === void 0 ? sounds[e.sound]() : sounds[e.sound](e.arg)))
    }
    if (t >= 0 && r.hands > t && r.hands - t < 4) {
      let e = performance.now()
      e - n > it && (sounds.flick(), (n = e))
    }
    ;((e = i), (t = r.hands))
  })
}
var _t = CHAPTERS.findIndex((e) => e.id === `reveal`),
  vt = 0.82
function RevealShare() {
  let e = useRef(null)
  return (
    useEffect(
      () =>
        subscribe((t) => {
          let n = e.current
          if (!n) return
          let r = t.index === _t && t.local >= vt && t.handoff < 0.3
          n.dataset.show = String(r)
        }),
      [],
    ),
    createPortal(
      <div ref={e} className={`reveal-share`} data-show={`false`}>
        <ShareButton />
      </div>,
      document.body,
    )
  )
}
function ChapterBlock({ chapter: t, index: n, section: r }) {
  let { t: i } = useI18n(),
    a = useRef(null),
    o = i.chapters[t.id].caption,
    s = xt(t.tint)
  return (
    useLayoutEffect(() => {
      let t = r.current ?? a.current?.closest(`section`)
      if (!t || !a.current) return
      let n = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: t,
              start: `top top`,
              end: `bottom bottom`,
              scrub: 0.6,
            },
          })
          .fromTo(
            `.ph__caption`,
            {
              y: 60,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.2,
              ease: `power3.out`,
            },
          )
          .fromTo(
            `.ph__num`,
            {
              yPercent: 10,
            },
            {
              yPercent: -10,
              duration: 1,
              ease: `none`,
            },
            0,
          )
          .fromTo(
            `.ph__rule`,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              duration: 1,
              ease: `none`,
            },
            0,
          )
          .to(
            `.ph__caption`,
            {
              y: -40,
              autoAlpha: 0,
              duration: 0.15,
              ease: `power2.in`,
            },
            0.85,
          )
      }, a)
      return () => n.revert()
    }, [r]),
    (
      <div ref={a} className={`ph ${s ? `ph--dark` : ``}`}>
        <span className={`ph__num`}>{String(n).padStart(2, `0`)}</span>
        {o && <p className={`ph__caption`}>{o}</p>}
        <span className={`ph__rule`} />
      </div>
    )
  )
}
function xt(e) {
  let t = parseInt(e.slice(1), 16),
    [n, r, i] = [(t >> 16) & 255, (t >> 8) & 255, t & 255]
  return 0.2126 * n + 0.7152 * r + 0.0722 * i < 110
}
function App() {
  let { t: e } = useI18n(),
    t = useMemo(() => CHAPTERS.map(() => createRef()), [])
  return (
    useEffect(() => useSoundCues(), []),
    useEffect(() => {
      let e = window.setTimeout(preloadScenes, 0)
      return () => window.clearTimeout(e)
    }, []),
    useLayoutEffect(() => {
      let e = initSmoothScroll(),
        n = () =>
          setTops(
            t.map((e) => {
              let t = e.current.getBoundingClientRect()
              return {
                top: t.top + window.scrollY,
                height: t.height,
              }
            }),
          )
      return (
        n(),
        ScrollTrigger.addEventListener(`refresh`, n),
        window.addEventListener(`scroll`, recompute, {
          passive: !0,
        }),
        document.fonts?.ready.then(() => ScrollTrigger.refresh()),
        () => {
          ;(ScrollTrigger.removeEventListener(`refresh`, n),
            window.removeEventListener(`scroll`, recompute),
            e())
        }
      )
    }, [t]),
    (
      <>
        <Chrome />
        <main id={`story`} aria-label={e.storyLabel}>
          {CHAPTERS.map((e, n) => {
            let CmpR = SCENES[e.id] ?? ChapterBlock
            return (
              <Chapter ref={t[n]} chapter={e} index={n} key={e.id}>
                <Suspense fallback={null}>
                  <CmpR chapter={e} index={n} section={t[n]} />
                </Suspense>
              </Chapter>
            )
          })}
        </main>
        <Note />
        <Hud />
        <ChapterNav />
        <RevealShare />
        <div className={`grain`} aria-hidden={`true`} />
      </>
    )
  )
}

export { App }
