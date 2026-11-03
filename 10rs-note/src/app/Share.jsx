import { useI18n, getSerial } from './core'
import { ROUTE, CHAPTERS } from '../story/timeline'
import { useState } from 'react'

var O = 1080,
  st = 1350,
  k = {
    night: `#1B1712`,
    paper: `#F3EAD7`,
    amber: `#F2B544`,
    brown: `#6B4A2E`,
    brownLight: `#80593A`,
    ink: `#1E1A16`,
  },
  ct = `Fraunces, Mukta, Georgia, serif`,
  lt = `Mukta, system-ui, sans-serif`,
  ut = `'JetBrains Mono', ui-monospace, monospace`
async function dt(e) {
  await Promise.all(
    [`800 100px Fraunces`, `600 40px Fraunces`, `700 40px Mukta`, `600 30px "JetBrains Mono"`].map(
      (e) => document.fonts?.load(e).catch(() => null),
    ),
  )
  let n = document.createElement(`canvas`)
  ;((n.width = O), (n.height = st))
  let r = n.getContext(`2d`)
  ;((r.textAlign = `center`),
    (r.textBaseline = `alphabetic`),
    (r.fillStyle = k.night),
    r.fillRect(0, 0, O, st),
    (r.strokeStyle = `rgba(243,234,215,0.06)`),
    (r.lineWidth = 10))
  for (let e = 40; e < O; e += 120) ft(r, e, 0, e, st)
  for (let e = 60; e < st; e += 120) ft(r, 0, e, O, e)
  ;((r.fillStyle = k.paper),
    (r.font = `600 44px ${ct}`),
    r.fillText(e.title, O / 2, 104),
    (r.globalAlpha = 0.7),
    (r.font = `600 26px ${ut}`),
    r.fillText(e.serialLabel, O / 2, 150),
    (r.globalAlpha = 1))
  let i = ROUTE.map((e) => e.x),
    a = ROUTE.map((e) => e.y),
    o = [Math.min(...i), Math.max(...i)],
    s = [Math.min(...a), Math.max(...a)],
    c = {
      x: 110,
      y: 200,
      w: 860,
      h: 400,
    },
    l = Math.min(c.w / (o[1] - o[0]), c.h / (s[1] - s[0])),
    u = c.x + (c.w - (o[1] - o[0]) * l) / 2,
    d = c.y + (c.h - (s[1] - s[0]) * l) / 2,
    f = ROUTE.map((e) => ({
      ...e,
      X: u + (e.x - o[0]) * l,
      Y: d + (e.y - s[0]) * l,
    }))
  ;((r.lineJoin = `round`),
    (r.lineCap = `round`),
    (r.strokeStyle = `rgba(242,181,68,0.22)`),
    (r.lineWidth = 26),
    pt(r, f),
    (r.strokeStyle = k.amber),
    (r.lineWidth = 7),
    pt(r, f))
  for (let e of f)
    (r.beginPath(),
      e.rush
        ? ((r.fillStyle = k.amber), r.arc(e.X, e.Y, 8, 0, Math.PI * 2), r.fill())
        : ((r.fillStyle = `#2A231C`),
          (r.strokeStyle = k.amber),
          (r.lineWidth = 5),
          r.arc(e.X, e.Y, 18, 0, Math.PI * 2),
          r.fill(),
          r.stroke()))
  return (
    ht(r, O / 2, 740, 440, e.serial),
    (r.fillStyle = k.amber),
    (r.font = `800 176px ${ct}`),
    r.fillText(e.amount, O / 2, 1040),
    (r.fillStyle = k.paper),
    (r.font = `600 44px ${ct}`),
    r.fillText(e.moved, O / 2, 1098),
    (r.globalAlpha = 0.75),
    (r.font = `600 30px ${ut}`),
    r.fillText(`${e.times} · ${e.stats}`, O / 2, 1152),
    (r.globalAlpha = 1),
    (r.font = `800 80px ${ct}`),
    r.fillText(e.caption, O / 2, 1252),
    (r.globalAlpha = 0.55),
    (r.font = `600 26px ${lt}`),
    r.fillText(e.site, O / 2, 1318),
    (r.globalAlpha = 1),
    new Promise((e, t) => n.toBlob((n) => (n ? e(n) : t(Error(`toBlob failed`))), `image/png`))
  )
}
function ft(e, t, n, r, i) {
  ;(e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.stroke())
}
function pt(e, t) {
  ;(e.beginPath(), t.forEach((t, n) => (n ? e.lineTo(t.X, t.Y) : e.moveTo(t.X, t.Y))), e.stroke())
}
function mt(e, t, n, r, i, a) {
  ;(e.beginPath(),
    e.moveTo(t + a, n),
    e.arcTo(t + r, n, t + r, n + i, a),
    e.arcTo(t + r, n + i, t, n + i, a),
    e.arcTo(t, n + i, t, n, a),
    e.arcTo(t, n, t + r, n, a),
    e.closePath())
}
function ht(e, t, n, r, i) {
  let a = r / 300
  ;(e.save(),
    e.translate(t, n),
    e.rotate((-4 * Math.PI) / 180),
    e.scale(a, a),
    e.translate(-150, -70),
    e.beginPath(),
    e.moveTo(0, 0),
    e.lineTo(262, 0),
    [
      [268, 9],
      [259, 16],
      [271, 22],
      [264, 31],
      [276, 36],
      [300, 44],
    ].forEach(([t, n]) => e.lineTo(t, n)),
    e.lineTo(300, 140),
    e.lineTo(0, 140),
    e.closePath(),
    e.save(),
    (e.shadowColor = `rgba(0,0,0,0.45)`),
    (e.shadowBlur = 30),
    (e.shadowOffsetY = 14),
    (e.fillStyle = k.brown),
    e.fill(),
    e.restore(),
    e.clip(),
    (e.fillStyle = k.brown),
    e.fillRect(0, 0, 300, 140),
    (e.fillStyle = k.brownLight),
    mt(e, 8, 8, 284, 124, 3),
    e.fill(),
    (e.strokeStyle = `rgba(243,234,215,0.4)`),
    (e.lineWidth = 1),
    e.stroke(),
    (e.strokeStyle = `rgba(243,234,215,0.85)`),
    (e.lineWidth = 3),
    e.beginPath(),
    e.arc(74, 70, 36, 0, Math.PI * 2),
    e.stroke(),
    (e.lineWidth = 2.5),
    e.beginPath(),
    e.arc(74, 70, 7, 0, Math.PI * 2),
    e.stroke())
  for (let t = 0; t < 16; t++) {
    let n = (t * Math.PI) / 8
    ;((e.lineWidth = t % 2 ? 1 : 3),
      ft(
        e,
        74 + Math.sin(n) * 8,
        70 - Math.cos(n) * 8,
        74 + Math.sin(n) * 30,
        70 - Math.cos(n) * 30,
      ))
  }
  ;((e.strokeStyle = `rgba(201,194,180,0.7)`),
    (e.lineWidth = 2),
    e.setLineDash([7, 5]),
    ft(e, 150, 8, 150, 132),
    e.setLineDash([]),
    (e.fillStyle = k.paper),
    (e.textAlign = `left`),
    (e.font = `800 64px ${ct}`),
    e.fillText(`₹10`, 176, 100),
    (e.textAlign = `right`),
    (e.font = `600 15px ${lt}`),
    e.fillText(`दस रुपये`, 278, 34),
    (e.font = `600 11px ${ut}`),
    e.fillText(i, 278, 128),
    (e.textAlign = `left`),
    e.fillText(i, 22, 26),
    (e.strokeStyle = `rgba(42,29,18,0.45)`),
    (e.lineWidth = 1.2),
    ft(e, 152, 0, 148, 140),
    ft(e, 0, 69, 300, 73),
    (e.strokeStyle = `rgba(59,36,16,0.35)`),
    (e.lineWidth = 5),
    e.beginPath(),
    e.ellipse(210, 64, 27, 25, 0, 0, Math.PI * 2),
    e.stroke(),
    (e.strokeStyle = `rgba(43,76,155,0.8)`),
    (e.lineWidth = 1.6),
    e.beginPath(),
    e.moveTo(62, 116),
    e.bezierCurveTo(68, 106, 72, 122, 78, 114),
    e.bezierCurveTo(84, 105, 90, 122, 96, 112),
    e.bezierCurveTo(102, 104, 108, 118, 113, 109),
    e.stroke(),
    (e.fillStyle = `rgba(42,29,18,0.3)`),
    e.fillRect(0, 0, 300, 140),
    e.restore(),
    e.save(),
    e.translate(t, n),
    e.rotate((-4 * Math.PI) / 180),
    e.scale(a, a),
    e.translate(125, -50),
    e.rotate((38 * Math.PI) / 180),
    (e.fillStyle = `rgba(255,247,214,0.55)`),
    e.fillRect(-31, -10, 62, 20),
    e.restore(),
    (e.textAlign = `center`))
}
function ShareButton({ className: e }) {
  let { t, lang: r } = useI18n(),
    [i, a] = useState(!1)
  return (
    <button
      type={`button`}
      className={`share-button ${e ?? ``}`}
      onClick={async () => {
        if (!i) {
          a(!0)
          try {
            let e = CHAPTERS[CHAPTERS.length - 1],
              i = e.trades * 10,
              a = new Intl.NumberFormat(r === `hi` ? `hi-IN` : `en-IN`),
              o = window.location.origin + window.location.pathname,
              s = await dt({
                title: t.credits.title,
                serial: getSerial(),
                serialLabel: t.reveal.serial(getSerial()),
                amount: `₹${a.format(i)}`,
                moved: t.reveal.moved,
                times: t.reveal.times(i / 10),
                stats: t.reveal.stats(e.hands, e.day),
                caption: t.chapters.reveal.caption ?? ``,
                site: window.location.host,
              }),
              c = new File([s], t.share.file, {
                type: `image/png`,
              }),
              l = t.share.text(a.format(i))
            if (
              navigator.canShare?.({
                files: [c],
              })
            )
              try {
                await navigator.share({
                  files: [c],
                  title: t.credits.title,
                  text: `${l} ${o}`,
                })
                return
              } catch (e) {
                if (e.name === `AbortError`) return
              }
            let u = document.createElement(`a`)
            ;((u.href = URL.createObjectURL(s)),
              (u.download = t.share.file),
              document.body.appendChild(u),
              u.click(),
              u.remove(),
              setTimeout(() => URL.revokeObjectURL(u.href), 4e3))
          } finally {
            a(!1)
          }
        }
      }}
      aria-busy={i}
      disabled={i}
    >
      <svg
        viewBox={`0 0 24 24`}
        width={`18`}
        height={`18`}
        aria-hidden={`true`}
        fill={`none`}
        stroke={`currentColor`}
        strokeWidth={`2.2`}
        strokeLinecap={`round`}
        strokeLinejoin={`round`}
      >
        <path d={`M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6`} />
      </svg>
      {i ? t.share.busy : t.share.button}
    </button>
  )
}

export { ShareButton }
