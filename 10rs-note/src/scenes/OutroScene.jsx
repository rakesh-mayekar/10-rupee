import './OutroScene.css'
import { prefersReducedMotion, smoothScrollTo } from '../lib/smoothScroll'
import { useI18n } from '../app/core'
import { ShareButton } from '../app/Share'
import { useMemo } from 'react'

var s = `https://www.rbi.org.in/Scripts/AnnualReportPublications.aspx?Id=1468`,
  c = {
    noteDesign: {
      value: `Chocolate brown, 63 mm × 123 mm, Sun Temple at Konark on the reverse`,
      note: `Mahatma Gandhi (New) Series, introduced 5 Jan 2018. Our illustration is deliberately stylised: no portrait, altered proportions.`,
      source: `RBI press release 2017-2018/1848`,
      url: `https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=42782`,
      status: `verified`,
    },
    tenRupeeNotesInCirculation: {
      value: 275652e5,
      unit: `pieces`,
      note: `2,75,652 lakh pieces; 16.1% of all banknotes by volume, but only 0.7% by value (₹27,565 crore).`,
      source: `RBI Annual Report 2025-26, Table VIII.1`,
      url: s,
      status: `verified`,
    },
    tenRupeeShareByVolume: {
      value: 16.1,
      unit: `%`,
      source: `RBI Annual Report 2025-26, Table VIII.1`,
      url: s,
      status: `verified`,
    },
    tenRupeeShareByValue: {
      value: 0.7,
      unit: `%`,
      source: `RBI Annual Report 2025-26, Table VIII.1`,
      url: s,
      status: `verified`,
    },
    allBanknotesInCirculation: {
      value: 1713215e5,
      unit: `pieces`,
      note: `17,13,215 lakh pieces.`,
      source: `RBI Annual Report 2025-26, Table VIII.1`,
      url: s,
      status: `verified`,
    },
    tenRupeeNotesSupplied2025_26: {
      value: 46e8,
      unit: `pieces`,
      note: `46,000 lakh pieces indented and supplied in 2025-26, up from 18,000 lakh the year before.`,
      source: `RBI Annual Report 2025-26, Table VIII.4`,
      url: s,
      status: `verified`,
    },
    printingPress: {
      value: `Not shown`,
      note: `Banknotes are printed at four presses (BRBNMPL Mysuru and Salboni; SPMCIL Nashik and Dewas). No primary source found for which press prints ₹10, so the story does not name one.`,
      source: `SPMCIL / BRBNMPL`,
      url: `https://en.wikipedia.org/wiki/Bharatiya_Reserve_Bank_Note_Mudran`,
      status: `unverified`,
    },
    distribution: {
      value: `RBI issue offices → currency chests → bank branches`,
      note: `Currency chests are run by banks and also pool and sort notes returned from branches, using note-sorting machines that also catch counterfeits. Soiled notes go back to RBI.`,
      source: `The Week explainer, 19 Aug 2026`,
      url: `https://www.theweek.in/news/biz-tech/2026/08/19/explainer-rbi-banknote-circulation-india.html`,
      status: `secondary`,
    },
    soiledNotesDisposed2025_26: {
      value: 170237e5,
      unit: `pieces`,
      note: `1,70,237 lakh pieces disposed in 2025-26 (2,38,563 lakh the year before; lower due to replacement of shredding and briquetting systems).`,
      source: `RBI Annual Report 2025-26, Table VIII.6`,
      url: s,
      status: `verified`,
    },
    disposalMethod: {
      value: `Shredded, then pressed into briquettes`,
      note: `RBI issue offices use Shredding and Briquetting Systems. RBI has described the briquettes as usable for fuel or other products, avoiding burning.`,
      source: `RBI Annual Report 2025-26; RBI press release 2001-2002/1220`,
      url: s,
      status: `verified`,
    },
    noteLifespan: {
      value: `about 1 to 5 years`,
      note: `Published estimates disagree: ~1 year for paper notes (cited in RBI polymer proposal coverage), ~3 years (Indian Statistical Institute study cited in Parliament), 4–5 years median (survival analysis of RBI data). Treat any single number as illustrative.`,
      source: `Multiple; see note`,
      url: `https://www.centralbanking.com/central-banking/news/1407865/rbi-recall-notes`,
      status: `secondary`,
    },
    storyLifespanDays: {
      value: 730,
      unit: `days`,
      note: `Our note lives two years, within the published range above.`,
      source: `Storytelling choice`,
      url: ``,
      status: `illustrative`,
    },
    storyHandoffs: {
      value: `about 55 hands, 48 purchases`,
      note: `No official data tracks how often an individual note changes hands. This is an illustrative estimate, disclosed in the credits.`,
      source: `Storytelling choice`,
      url: ``,
      status: `illustrative`,
    },
    upiMonthlyVolume: {
      value: 2547e7,
      unit: `transactions`,
      note: `October 2026, a record: 25.47 billion UPI transactions worth ₹31.53 lakh crore, about 822 million a day (September: 24.07 billion). Update monthly if you like; NPCI publishes on the 1st.`,
      source: `NPCI data via Inc42, 1 Nov 2026`,
      url: `https://inc42.com/buzz/upi-transactions-rise-5-8-mom-to-record-25-47-bn-in-october/`,
      status: `secondary`,
    },
    polymerNotes: {
      value: `Approved for field trials`,
      note: `On 28 Jul 2026 the government approved RBI’s proposal for polymer ₹10 and ₹20 notes; RBI requested 1 billion pieces of each for field trials. Polymer notes will circulate alongside paper, not replace it.`,
      source: `News On AIR, reporting a Lok Sabha written reply`,
      url: `https://newsonair.gov.in/government-approves-rbi-proposal-for-%e2%82%b910-and-%e2%82%b920-polymer-banknotes/`,
      status: `secondary`,
    },
  },
  l = (e, t) => {
    let n = (e / 1e9).toLocaleString(t === `hi` ? `hi-IN` : `en-IN`, {
      maximumFractionDigits: 2,
    })
    return t === `hi` ? `${n} अरब` : `${n} billion`
  }
function u(e) {
  let t = c,
    n = (t, n, r) => ({
      text: e === `hi` ? r : n,
      source: t.source,
      url: t.url,
    })
  return [
    n(
      t.tenRupeeNotesInCirculation,
      `${l(t.tenRupeeNotesInCirculation.value, `en`)} ₹10 notes were in circulation in March 2026: ${t.tenRupeeShareByVolume.value}% of all notes by count, but only ${t.tenRupeeShareByValue.value}% by value.`,
      `मार्च 2026 में ₹10 के ${l(t.tenRupeeNotesInCirculation.value, `hi`)} नोट चलन में थे: गिनती में सभी नोटों का ${t.tenRupeeShareByVolume.value}%, पर कीमत में सिर्फ़ ${t.tenRupeeShareByValue.value}%।`,
    ),
    n(
      t.tenRupeeNotesSupplied2025_26,
      `${l(t.tenRupeeNotesSupplied2025_26.value, `en`)} new ₹10 notes were supplied in 2025-26.`,
      `2025-26 में ₹10 के ${l(t.tenRupeeNotesSupplied2025_26.value, `hi`)} नए नोट जारी हुए।`,
    ),
    n(
      t.soiledNotesDisposed2025_26,
      `${l(t.soiledNotesDisposed2025_26.value, `en`)} worn-out notes of all kinds were destroyed in 2025-26: shredded, then pressed into briquettes.`,
      `2025-26 में हर तरह के ${l(t.soiledNotesDisposed2025_26.value, `hi`)} घिसे हुए नोट नष्ट किए गए: पहले कतरन, फिर दबाकर ईंटें।`,
    ),
    n(
      t.noteDesign,
      `The ₹10 note is chocolate brown, 63 × 123 mm, with the Sun Temple at Konark on the back.`,
      `₹10 का नोट चॉकलेटी भूरा है, 63 × 123 मिमी, और पीछे कोणार्क का सूर्य मंदिर है।`,
    ),
    n(
      t.upiMonthlyVolume,
      `UPI handled a record ${l(t.upiMonthlyVolume.value, `en`)} payments in October 2026, about 822 million a day.`,
      `अक्टूबर 2026 में UPI से रिकॉर्ड ${l(t.upiMonthlyVolume.value, `hi`)} भुगतान हुए, रोज़ लगभग 82 करोड़।`,
    ),
    n(
      t.polymerNotes,
      `In July 2026 the government approved polymer ₹10 and ₹20 notes for field trials, to circulate alongside paper.`,
      `जुलाई 2026 में सरकार ने ₹10 और ₹20 के पॉलिमर नोटों के फ़ील्ड ट्रायल को मंज़ूरी दी; ये काग़ज़ी नोटों के साथ चलेंगे।`,
    ),
  ]
}
var f = 9
function OutroScene(t) {
  let { t: n, lang: s } = useI18n(),
    c = useMemo(() => u(s), [s]),
    l = n.credits
  return (
    <div className={`outro`}>
      <div className={`outro__inner`}>
        <p className={`outro__mark`} aria-hidden={`true`}>
          ₹10
        </p>
        <h2 className={`outro__title`}>{l.title}</h2>
        <h3 className={`outro__heading`}>{l.sources}</h3>
        <ul className={`outro__facts`}>
          {c.map((e) => (
            <li key={e.text}>
              <p>{e.text}</p>
              <a href={e.url} target={`_blank`} rel={`noreferrer`}>
                {e.source}
              </a>
            </li>
          ))}
        </ul>
        <h3 className={`outro__heading`}>{l.honesty}</h3>
        <p className={`outro__note`}>{l.illustrative}</p>
        <p className={`outro__note`}>{l.stylised}</p>
        <div className={`outro__actions`}>
          <ShareButton className={`share-button--light`} />
          <button
            type={`button`}
            className={`outro__rewind`}
            onClick={() => smoothScrollTo(0, prefersReducedMotion() ? 0 : f)}
          >
            <span aria-hidden={`true`}>↺</span> {l.rewind}
          </button>
        </div>
        <p className={`outro__made`}>
          {l.builtBy}
          {' ·'}{' '}
          <a href={`https://rishabhsingh.tech`} target={`_blank`} rel={`noreferrer`}>
            rishabhsingh.tech
          </a>
        </p>
      </div>
    </div>
  )
}

export { OutroScene }
