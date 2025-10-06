import React, { useState } from "react";
import { motion } from "framer-motion";

// Neutrl-style single-file React landing page
// Tailwind + Host Grotesk

const gradientBg =
  "bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(99,102,241,0.25),rgba(99,102,241,0)_60%),radial-gradient(70%_50%_at_90%_10%,rgba(16,185,129,0.2),rgba(16,185,129,0)_60%),radial-gradient(60%_50%_at_10%_10%,rgba(236,72,153,0.18),rgba(236,72,153,0)_50%)]";

const glass = "backdrop-blur-md bg-white/5 border border-white/10";

// --- Diagram helpers ---
function diagramLabels(){return{lp:"LP Deposit",pt:"Principal Token (PT)",ft:"Fee Token (FT)"};}
function diagramPositions(){return{ptY:160,ftY:90};}
function diagramLayout(){const boxH=44;const lpY=130;const splitY=lpY+boxH/2;const lpX=40;const splitX=420;const targetX=680;return{boxH,lpY,splitY,lpX,splitX,targetX};}
function diagramFloatDurations(){return{pt:3.1,ft:2.7};}
function diagramCoinTiming(){return{base:1.6,step:0.2};}
function diagramCoinEndYOffset(){return 2;}
function diagramStreamDotCount(){return 24;}
function tokenFillColor(){return "#0b1220";}
function diagramCoinCount(){return 14;}

/** -------------------------
 * Chain Selection Bar (JSX)
 * -------------------------- */
const CHAINS = [
  { id:"eth",label:"Ethereum",ring:"ring-white/30",
    icon:"data:image/svg+xml,%3csvg%20width='37'%20height='37'%20viewBox='0%200%2037%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='18.5'%20cy='18.5'%20r='18.5'%20fill='%231D1B1D'/%3e%3ccircle%20cx='18.5'%20cy='18.5'%20r='18'%20fill='%23DEDEDE'%20fill-opacity='0.1'%20stroke='%23DEDEDE'/%3e%3cpath%20d='M18.4947%205.5L18.3203%206.09251V23.2842L18.4947%2023.4583L26.4748%2018.7412L18.4947%205.5Z'%20fill='white'/%3e%3cpath%20d='M18.4959%205.5L10.5156%2018.7412L18.4959%2023.4583V15.1139V5.5Z'%20fill='white'/%3e%3cpath%20d='M18.4967%2024.9693L18.3984%2025.0892V31.2131L18.4967%2031.5001L26.4817%2020.2546L18.4967%2024.9693Z'%20fill='white'/%3e%3cpath%20d='M18.4959%2031.5001V24.9693L10.5156%2020.2546L18.4959%2031.5001Z'%20fill='white'/%3e%3cpath%20d='M18.4961%2023.4582L26.4762%2018.7411L18.4961%2015.1138V23.4582Z'%20fill='white'/%3e%3cpath%20d='M10.5156%2018.7411L18.4959%2023.4582V15.1138L10.5156%2018.7411Z'%20fill='white'/%3e%3c/svg%3e"},
  { id:"plasma",label:"Plasma",ring:"ring-emerald-300/60",icon:"https://app.pendle.finance/assets/plasma-chain-icon-hcDdcZ5i.svg" },
  { id:"hyperliquid",label:"Hyperliquid",ring:"ring-emerald-300/60",
    icon:"data:image/svg+xml,%3csvg%20width='37'%20height='37'%20viewBox='0%200%2037%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='18.5'%20cy='18.5'%20r='18.5'%20fill='%231D1B1D'/%3e%3cpath%20d='M18.5%200.5C28.3772%200.5%2036.5%208.46486%2036.5%2018.5C36.5%2028.3772%2028.5351%2036.5%2018.5%2036.5C8.6257%2036.5%200.5%2028.3743%200.5%2018.5C0.500001%208.62281%208.46486%200.5%2018.5%200.5Z'%20fill='%2397FCE4'%20fill-opacity='0.1'%20stroke='%2397FCE4'/%3e%3cpath%20d='M29.6655%2018.4201C29.6859%2020.2525%2029.3023%2022.0034%2028.5488%2023.6762C27.4728%2026.0583%2024.893%2028.0059%2022.5375%2025.9328C20.6162%2024.2429%2020.2599%2020.8123%2017.3815%2020.3101C13.5731%2019.8487%2013.4814%2024.2632%2010.9934%2024.762C8.22026%2025.3254%207.3004%2020.663%207.34113%2018.5457C7.38186%2016.4283%207.94532%2013.4524%2010.3553%2013.4524C13.1284%2013.4524%2013.3151%2017.6498%2016.835%2017.4225C20.321%2017.185%2020.382%2012.8179%2022.6596%2010.9482C24.625%209.33303%2026.9364%2010.5173%2028.0939%2012.4616C29.1665%2014.26%2029.6383%2016.3706%2029.6621%2018.4201H29.6655Z'%20fill='%2397FCE4'/%3e%3c/svg%3e"},
  { id:"arb",label:"Arbitrum",ring:"ring-sky-400/60",icon:"https://app.pendle.finance/assets/arbitrum-chain-icon-D9-SXel0.svg"},
  { id:"bnb",label:"BNB Chain",ring:"ring-yellow-400/70",
    icon:"data:image/svg+xml,%3csvg%20width='37'%20height='37'%20viewBox='0%200%2037%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='18.5'%20cy='18.5'%20r='18.5'%20fill'%231D1B1D'/%3e%3cpath%20d='M18.5%200.5C28.4418%200.5%2036.5%208.55815%2036.5%2018.5C36.5%2028.4418%2028.4418%2036.5%2018.5%2036.5C8.55815%2036.5%200.5%2028.4418%200.5%2018.5C0.5%208.55815%208.55815%200.5%2018.5%200.5Z'%20fill='%23F0B90B'%20fill-opacity='0.1'%20stroke='%23F0B90B'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M25.0958%2017.4862L25.0824%2014.6222H25.0928L22.6602%2013.1903L18.4918%2015.648L14.3486%2013.1903L11.9175%2014.6222V17.4862L16.0859%2019.9321V24.8358L18.5066%2026.2544L20.9274%2024.8358V19.9321L25.0958%2017.4862ZM18.4933%205.854L11.916%209.73189L14.3367%2011.1639L18.4933%208.70609L22.6617%2011.1639L25.0824%209.73189L18.4933%205.854ZM10.1801%2023.3917L10.1668%2018.4999L7.74758%2017.0694V24.837L14.3367%2028.7016V25.8377L10.1801%2023.3917ZM10.1668%2016.4587V13.6081L12.5994%2012.1761L10.1668%2010.7441L7.74609%2012.1761V15.0267L10.1668%2016.4587ZM18.4933%2010.7441L16.0726%2012.1761L18.4933%2013.6081L20.9259%2012.1761L18.4933%2010.7441ZM14.3367%2020.9458L11.916%2019.5139V22.3778L14.3367%2023.7964V20.9458ZM18.4933%2028.2954L16.0726%2026.8635V29.7141L18.4933%2031.146L20.9259%2029.7141V26.8635L18.4933%2028.2954ZM26.8183%2010.7441L24.3976%2012.1761L26.8183%2013.6081V16.4587L29.2509%2015.0267V12.1761L26.8183%2010.7441ZM29.2524%2017.0679L26.8316%2018.4999L26.8183%2023.3917L22.6632%2025.8362V28.7001L29.2524%2024.8356V17.0679ZM25.0828%2022.3781L22.6621%2023.7967V20.9461L25.0828%2019.5142V22.3781Z'%20fill='%23F0B90B'/%3e%3c/svg%3e"},
  { id:"base",label:"Base",ring:"ring-blue-500/70",
    icon:"data:image/svg+xml,%3csvg%20width='37'%20height='37'%20viewBox='0%200%2037%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='18.5'%20cy='18.5'%20r='18.5'%20fill='%231D1B1D'/%3e%3cpath%20d='M36.5%2018.5C36.5%2028.3772%2028.5351%2036.5%2018.5%2036.5C8.6257%2036.5%200.5%2028.3743%200.5%2018.5C0.5%208.62281%208.46486%200.5%2018.5%200.5C28.3772%200.5%2036.5%208.46486%2036.5%2018.5Z'%20fill='%230052FF'%20fill-opacity='0.1'%20stroke='%230052FF'/%3e%3cpath%20d='M18.3905%2028.8172C24.149%2028.8172%2028.8172%2024.1571%2028.8172%2018.4086C28.8172%2012.6601%2024.149%208%2018.3905%208C12.9271%208%208.44513%2012.1946%208%2017.5337H21.7818V19.2835H8C8.44513%2024.6226%2012.9271%2028.8172%2018.3905%2028.8172Z'%20fill='%230052FF'/%3e%3c/svg%3e"},
  { id:"sonic",label:"Sonic",ring:"ring-white/30",
    icon:"data:image/svg+xml,%3csvg%20width='37'%20height='37'%20viewBox='0%200%2037%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='18.5'%20cy='18.5'%20r='18.5'%20fill='%231D1B1D'/%3e%3cpath%20d='M36.5%2018.5C36.5%2028.3772%2028.5351%2036.5%2018.5%2036.5C8.6257%2036.5%200.5%2028.3743%200.5%2018.5C0.5%208.62281%208.46486%200.5%2018.5%200.5C28.3772%200.5%2036.5%208.46486%2036.5%2018.5Z'%20fill='%23F5F5F5'%20fill-opacity='0.1'%20stroke='%23F5F5F5'/%3e%3cpath%20d='M20.6885%2021.0253C16.633%2022.2058%2013.2781%2023.9276%2011.1781%2025.9451L11.0854%2026.0346C11.6438%2026.5468%2012.2562%2027.0048%2012.9181%2027.3942L13.0604%2027.2255C13.6339%2026.5468%2014.2484%2025.891%2014.8887%2025.2726C16.6071%2023.6133%2018.5734%2022.1767%2020.6907%2021.0232L20.6885%2021.0253Z'%20fill='%23F5F5F5'/%3e%3cpath%20d='M7.76953%2019.2764C7.93124%2021.3813%208.7376%2023.3113%2010.0032%2024.8812L10.0614%2024.825C11.3615%2023.582%2013.054%2022.4515%2015.0958%2021.4667C16.8854%2020.6027%2018.9401%2019.8615%2021.1544%2019.2764H7.76953Z'%20fill='%23F5F5F5'/%3e%3cpath%20d='M16.0226%2010.6257C19.6513%2014.1297%2024.2178%2016.447%2029.2264%2017.3256C28.6226%2012.131%2024.0604%208.08984%2018.5172%208.08984C17.0532%208.08984%2015.6582%208.373%2014.384%208.88308C14.9015%209.48686%2015.4534%2010.074%2016.0226%2010.6257Z'%20fill='%23F5F5F5'/%3e%3cpath%20d='M11.1781%2011.0546C13.2781%2013.0741%2016.633%2014.7939%2020.6885%2015.9764C18.5713%2014.8209%2016.605%2013.3864%2014.8866%2011.7271C14.2484%2011.1108%2013.6339%2010.4549%2013.0582%209.77413L12.9159%209.60548C12.254%209.99482%2011.6417%2010.4529%2011.0854%2010.965L11.1781%2011.0546Z'%20fill='%23F5F5F5'/%3e%3cpath%20d='M16.0226%2026.3739C15.4513%2026.9257%2014.8993%2027.5128%2014.384%2028.1166C15.6561%2028.6267%2017.0532%2028.9098%2018.5172%2028.9098C24.0604%2028.9098%2028.6226%2024.8686%2029.2285%2019.672C24.22%2020.5506%2019.6534%2022.8678%2016.0248%2026.3718L16.0226%2026.3739Z'%20fill='%23F5F5F5'/%3e%3cpath%20d='M15.0958%2015.533C13.054%2014.5482%2011.3615%2013.4177%2010.0614%2012.1747L10.0032%2012.1185C8.7376%2013.6883%207.93124%2015.6184%207.76953%2017.7233H21.1522C18.9379%2017.1382%2016.8854%2016.397%2015.0937%2015.5309L15.0958%2015.533Z'%20fill='%23F5F5F5'/%3e%3c/svg%3e"},
  { id:"mantle",label:"Mantle",ring:"ring-emerald-300/60",icon:"https://app.pendle.finance/assets/mantle-chain-icon-TRGj-B5l.svg" },
  { id:"op",label:"Optimism",ring:"ring-red-500/80",
    icon:"data:image/svg+xml,%3csvg%20width='38'%20height='38'%20viewBox='0%200%2038%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20opacity='0.5'%3e%3ccircle%20cx='18.5'%20cy='19'%20r='18.5'%20fill='%231D1B1D'/%3e%3cg%20opacity='0.4'%3e%3cpath%20d='M19%2037C29.2173%2037%2037.5%2028.7173%2037.5%2018.5C37.5%208.28273%2029.2173%200%2019%200C8.78273%200%200.5%208.28273%200.5%2018.5C0.5%2028.7173%208.78273%2037%2019%2037Z'%20fill='%23DEDEDE'%20fill-opacity='0.1'/%3e%3cpath%20d='M37%2018.5C37%2028.4411%2028.9411%2036.5%2019%2036.5C9.05887%2036.5%201%2028.4411%201%2018.5C1%208.55887%209.05887%200.5%2019%200.5C28.9411%200.5%2037%208.55887%2037%2018.5Z'%20stroke='%23DEDEDE'%20stroke-opacity='0.870588'/%3e%3c/g%3e%3cg%20opacity='0.4'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.8989%2022.6367C11.6019%2023.1547%2012.5047%2023.4137%2013.6073%2023.4137C14.9393%2023.4137%2016.0049%2023.1103%2016.7967%2022.4887C17.5959%2021.8597%2018.1509%2020.9051%2018.4765%2019.6397C18.6763%2018.8627%2018.8391%2018.0561%2018.9797%2017.2347C19.0241%2016.9387%2019.0463%2016.6945%2019.0463%2016.5021C19.0463%2015.8583%2018.8835%2015.3033%2018.5579%2014.8371C18.2323%2014.3635%2017.7883%2014.0083%2017.2259%2013.7789C16.6635%2013.5347%2016.0197%2013.4163%2015.3093%2013.4163C12.6897%2013.4163%2011.0617%2014.6891%2010.4327%2017.2347C10.2107%2018.1745%2010.0405%2018.9737%209.92207%2019.6397C9.87767%2019.9357%209.85547%2020.1799%209.85547%2020.3871C9.85547%2021.3565%2010.2033%2022.1113%2010.8989%2022.6367ZM15.1243%2020.9569C14.7617%2021.2603%2014.3251%2021.4157%2013.8071%2021.4157C12.9191%2021.4157%2012.4677%2020.9939%2012.4751%2020.1355C12.4751%2019.9283%2012.4973%2019.7359%2012.5343%2019.5509C12.7045%2018.6481%2012.8673%2017.8933%2013.0375%2017.2717C13.1929%2016.6353%2013.4519%2016.1691%2013.8145%2015.8657C14.1845%2015.5623%2014.6285%2015.4069%2015.1465%2015.4069C16.0271%2015.4069%2016.4637%2015.8287%2016.4637%2016.6723C16.4637%2016.8795%2016.4415%2017.0793%2016.4045%2017.2717C16.2935%2017.9229%2016.1307%2018.6777%2015.9161%2019.5509C15.7607%2020.1873%2015.4943%2020.6535%2015.1243%2020.9569ZM19.4542%2023.1843C19.5134%2023.2509%2019.5874%2023.2805%2019.691%2023.2805H21.578C21.6742%2023.2805%2021.763%2023.2509%2021.8444%2023.1843C21.9332%2023.1177%2021.9776%2023.0363%2021.9998%2022.9327L22.6362%2019.8913H24.5084C25.722%2019.8913%2026.6766%2019.6397%2027.3722%2019.1291C28.0826%2018.6185%2028.5488%2017.8341%2028.7782%2016.7685C28.83%2016.5169%2028.8596%2016.2727%2028.8596%2016.0433C28.8596%2015.2367%2028.5414%2014.6225%2027.9124%2014.1933C27.2908%2013.7715%2026.4694%2013.5569%2025.4408%2013.5569H21.7482C21.652%2013.5569%2021.5632%2013.5865%2021.4818%2013.6531C21.393%2013.7197%2021.3412%2013.8011%2021.3264%2013.9047L19.4098%2022.9327C19.395%2023.0289%2019.4098%2023.1103%2019.4542%2023.1843ZM25.6184%2017.6565C25.3298%2017.8711%2024.9968%2017.9747%2024.6046%2017.9747H23.0136L23.539%2015.4883H25.204C25.5814%2015.4883%2025.8552%2015.5623%2026.0106%2015.7103C26.166%2015.8509%2026.2474%2016.0581%2026.2474%2016.3245C26.2474%2016.4429%2026.2326%2016.5835%2026.203%2016.7389C26.1068%2017.1385%2025.9144%2017.4419%2025.6184%2017.6565Z'%20fill='white'/%3e%3c/g%3e%3c/svg%3e"}
];

function ChainIcon({ chain, active }) {
  return (
    <div
      className={[
        "relative h-9 w-9 rounded-full overflow-hidden grid place-items-center",
        active ? `ring-2 ${chain.ring}` : "ring-1 ring-white/10",
        "transition-all duration-200",
      ].join(" ")}
    >
      <img
        src={chain.icon}
        alt={chain.label}
        className="h-9 w-9 rounded-full select-none pointer-events-none object-cover"
        draggable={false}
      />
    </div>
  );
}

function ChainButton({ chain, selected, onSelect, showDivider }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "relative h-16 w-16 shrink-0",
        "grid place-items-center",
        "bg-white/[0.03] hover:bg-white/[0.05]",
        "transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
      ].join(" ")}
      aria-pressed={selected}
      aria-label={chain.label}
      title={chain.label}
    >
      {showDivider && <div className="absolute right-0 top-0 h-full w-px bg-white/10" />}
      <ChainIcon chain={chain} active={selected} />
    </button>
  );
}

function ChainSelectionBar() {
  const [selected, setSelected] = useState("eth");
  return (
    <div className="mt-2 mb-4">
      <div className="rounded-2xl bg-white/[0.04] border border-white/10">
        <div
          className={[
            "flex gap-0",
            "overflow-x-auto no-scrollbar",
            "py-1 pl-3 pr-6 md:px-2",
            "justify-start",
          ].join(" ")}
        >
          {CHAINS.map((c, i) => (
            <ChainButton
              key={c.id}
              chain={c}
              selected={selected === c.id}
              onSelect={() => setSelected(c.id)}
              showDivider={i !== CHAINS.length - 1}
            />
          ))}
          <div className="shrink-0 w-6 md:w-2" />
        </div>
      </div>
    </div>
  );
}

/* ================= Diagram ================= */
function MiniSplitDiagram(){
  const L=diagramLabels();
  const {ptY,ftY}=diagramPositions();
  const {boxH,lpY,splitY,lpX,splitX,targetX}=diagramLayout();
  const boxW=140, boxRX=10;
  const ptCenterY=ptY+boxH/2; const ftCenterY=ftY+boxH/2;
  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-3 sm:p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]">
      <svg viewBox="0 0 900 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 8 4, 0 8" fill="#a5b4fc" />
          </marker>
        </defs>

        {/* LP Box */}
        <rect x={lpX} y={lpY} width={boxW} height={boxH} rx={boxRX} fill="rgba(17,24,39,0.9)" stroke="#a5b4fc" strokeWidth="1.5"/>
        <text x={lpX+boxW/2} y={lpY+boxH/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#e5e7eb">{L.lp}</text>

        {/* LP → Split stream */}
        {Array.from({length:diagramStreamDotCount()}).map((_,i)=>(
          <circle key={`flow${i}`} r="2.2" fill="#a5b4fc" opacity="0.6">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" path={`M${lpX+boxW} ${lpY+boxH/2} H ${splitX-20}`} begin={`${i*0.12}s`}/>
            <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="3s" begin={`${i*0.12}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Splitter plus */}
        <circle cx={splitX} cy={splitY} r="13" fill="rgba(17,24,39,0.9)" stroke="#a5b4fc" strokeWidth="1.5"/>
        <path d={`M${splitX-10} ${splitY} H ${splitX+10}`} stroke="#a5b4fc" strokeWidth="2" opacity="0.8"/>
        <path d={`M${splitX} ${splitY-10} V ${splitY+10}`} stroke="#a5b4fc" strokeWidth="2" opacity="0.8"/>

        {/* Flow to tokens */}
        <path d={`M${splitX + 18} ${splitY - 6} C ${splitX + 70} ${splitY - 6}, ${splitX + 150} ${ptCenterY}, ${targetX} ${ptCenterY}`} stroke="#a5b4fc" strokeWidth="1.5" opacity="0.6" fill="none" markerEnd="url(#arrow)"/>
        <path d={`M${splitX + 18} ${splitY + 6} C ${splitX + 70} ${splitY + 6}, ${splitX + 150} ${ftCenterY}, ${targetX} ${ftCenterY}`} stroke="#a5b4fc" strokeWidth="1.5" opacity="0.6" fill="none" markerEnd="url(#arrow)"/>

        {/* PT */}
        <g transform="translate(0,0)">
          <animateTransform attributeName="transform" type="translate" dur={`${diagramFloatDurations().pt}s`} values="0 0; 0 -10; 0 6; 0 -4; 0 0" keyTimes="0;0.25;0.5;0.75;1" repeatCount="indefinite"/>
          <rect x={targetX} y={ptY} width={boxW} height={boxH} rx={12} fill={tokenFillColor()} stroke="#a5b4fc" strokeWidth="1.5"/>
          <text x={targetX+boxW/2} y={ptY+boxH/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#e8ecff">{L.pt}</text>
        </g>
        {/* FT */}
        <g transform="translate(0,0)">
          <animateTransform attributeName="transform" type="translate" dur={`${diagramFloatDurations().ft}s`} values="0 0; 0 -12; 0 8; 0 -6; 0 0" keyTimes="0;0.25;0.5;0.75;1" repeatCount="indefinite"/>
          <rect x={targetX} y={ftY} width={boxW} height={boxH} rx={12} fill={tokenFillColor()} stroke="#a5b4fc" strokeWidth="1.5"/>
          <text x={targetX+boxW/2} y={ftY+boxH/2+5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#e8ecff">{L.ft}</text>
        </g>
      </svg>
    </div>
  );
}

export default function NeutrlStyleLanding() {
  return (
    <div className={`min-h-screen ${gradientBg} text-white selection:bg-white/20 overflow-x-hidden`}>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,10,12,0.9),rgba(10,10,12,1))]"/>

      {/* Navbar */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className={`mt-6 ${glass} rounded-2xl px-4 py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center">
                <span className="text-lg font-bold">R</span>
              </div>
              <span className="text-sm sm:text-base tracking-tight font-semibold truncate">Riven</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm leading-none text-white/80">
              <a href="#features" className="hover:text-white">Products</a>
              <a href="#how" className="hover:text-white">How It Works</a>
              <a href="#docs" className="hover:text-white">Learn</a>
              <a href="#pricing" className="hover:text-white">Launch</a>
            </div>
            <div className="flex items-center gap-3">
              <button className={`hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm ${glass} hover:bg-white/10 transition`}>Sign in</button>
              <button className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-black bg-white hover:bg-white/90 transition">Launch App</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
              Live on Testnet • V0.9
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight break-words hyphens-auto whitespace-normal">
              Trade <span className="text-white/90">Liquidity Fees</span>. Own the Flow.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70 text-base sm:text-lg break-words hyphens-auto whitespace-normal">
              Split liquidity into fee and principal. Earn, hedge, or exit anytime — clarity over complexity.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#app" className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">Get Started</a>
              <a href="#video" className={`rounded-full px-6 py-3 font-medium ${glass} hover:bg-white/10 transition`}>View Demo</a>
            </div>
            <p className="mt-4 text-xs text-white/50">No wallet? Explore in read-only mode.</p>

            <div className="mx-auto mt-6 w-full max-w-4xl">
              <MiniSplitDiagram />
            </div>
          </motion.div>

          {/* Helpers */}
          <style>{`
  /* global wrap so long phrases never clip */
  h1,h2,h3,h4,h5,h6,p { overflow-wrap: anywhere; word-break: normal; }
  @keyframes meshDrift { 0% { background-position: 0px 0px, 0px 0px; } 100% { background-position: 800px 400px, -400px 800px; } }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  @supports (hyphens: auto) { h1,h2,h3,p { hyphens: auto; } }
`}</style>

          {/* mesh */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute -inset-[20%] opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "60px 60px, 60px 60px",
                backgroundPosition: "0px 0px, 0px 0px",
                transform: "perspective(900px) rotateX(58deg)",
                animation: "meshDrift 120s linear infinite",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 95%)",
                maskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 95%)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(99,102,241,0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(16,185,129,0.12),transparent_60%)]" />
          </div>

          {/* Hero Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`mt-12 sm:mt-16 rounded-3xl ${glass} overflow-visible`}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* LEFT COLUMN */}
              <div className="p-6 sm:p-10 pr-5 sm:pr-10 min-w-0">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-indigo-400"/>
                  Liquidity Split
                </div>
                <h3 className="mt-3 text-2xl font-semibold break-words hyphens-auto whitespace-normal">
                  Transform LPs into yield &amp; principal.
                </h3>
                <p className="mt-2 text-white/70 text-sm break-words hyphens-auto whitespace-normal">
                  Deposit once, mint two tokens: the <strong>Fee Token (FT)</strong> captures trading fees, and the <strong>Principal Token (PT)</strong> tracks your base position.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/50"/> Non-custodial and gas-efficient</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/50"/> Portable ERC-20 PT / FT</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/50"/> Combine or exit anytime</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <button className="rounded-xl bg-white/90 text-black px-4 py-2 text-sm font-semibold hover:bg-white transition">Launch App</button>
                  <button className={`rounded-xl px-4 py-2 text-sm ${glass} hover:bg-white/10`}>Read Docs</button>
                </div>
              </div>

              {/* RIGHT COLUMN (min-w-0 ensures wrapping inside grid) */}
              <div className="relative p-6 sm:p-10 bg-gradient-to-br from-white/5 to-transparent min-w-0">
                <div className="absolute inset-0 pointer-events-none opacity-40 rounded-3xl bg-[radial-gradient(50%_40%_at_30%_0%,rgba(99,102,241,0.4),transparent_60%)]"/>
                <ChainSelectionBar />

                <div className="grid gap-3 sm:gap-4 md:gap-5">
                  <div className={`rounded-2xl ${glass} p-4`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Pool</span>
                      <span className="text-white">ETH/USDC</span>
                    </div>
                    <div className="mt-2 flex items-end gap-4">
                      <div className="text-4xl font-semibold">7.8%<span className="text-xl text-white/60"> APY</span></div>
                      <div className="text-xs text-emerald-400">+0.3% daily change</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-2xl ${glass} p-4`}>
                      <div className="text-xs text-white/60">TVL</div>
                      <div className="text-xl font-semibold mt-1">$42.6M</div>
                    </div>
                    <div className={`rounded-2xl ${glass} p-4`}>
                      <div className="text-xs text-white/60">24 h Volume</div>
                      <div className="text-xl font-semibold mt-1">$9.4M</div>
                    </div>
                  </div>
                  <div className={`rounded-2xl ${glass} p-4`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Your PT</span>
                      <span className="text-white">1,000</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-white/70">Your FT</span>
                      <span className="text-white">1,000</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* END RIGHT COLUMN */}
            </div>
          </motion.div>
        </section>

        {/* Logos / social proof */}
        <section className="mt-20 sm:mt-28">
          <div className={`mx-auto max-w-6xl rounded-3xl ${glass} px-6 py-6 sm:px-8 sm:py-8`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center opacity-80">
              {"ABCDE".split("").map((_, i) => (
                <div key={i} className="h-8 w-24 bg-white/10 rounded"/>
              ))}
              <div className="h-8 w-24 bg-white/10 rounded"/>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-20 sm:mt-28">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Split liquidity",
                desc: "Mint PT + FT to separate yield from exposure. Control outcomes, reduce noise.",
              },
              {
                title: "Sell future fees",
                desc: "Lock in returns or speculate on future yield — the market decides.",
              },
              {
                title: "Composable by design",
                desc: "PT and FT plug into vaults, hedges, and on-chain strategies with full interoperability.",
              },
            ].map((f, i) => (
              <div key={i} className={`rounded-3xl ${glass} p-6 sm:p-8 min-w-0`}>
                <div className="text-sm text-white/60">0{i + 1}</div>
                <h3 className="mt-2 text-2xl font-semibold break-words hyphens-auto whitespace-normal">{f.title}</h3>
                <p className="mt-2 text-white/70 break-words hyphens-auto whitespace-normal">{f.desc}</p>
                <div className="mt-6 h-28 rounded-2xl bg-white/5"/>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-20 sm:mt-28">
          <div className={`rounded-3xl ${glass} p-6 sm:p-10`}>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { k: "Deposit", d: "Provide liquidity to any supported pool." },
                { k: "Split", d: "Receive PT + FT — your position, now modular." },
                { k: "Trade", d: "Hold, swap, or stake your PT/FT for new strategies." },
                { k: "Recombine", d: "Burn both tokens to reclaim your original LP." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 min-w-0">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10 grid place-items-center text-sm">{i + 1}</div>
                  <div className="min-w-0">
                    <div className="font-semibold break-words hyphens-auto whitespace-normal">{s.k}</div>
                    <div className="text-white/70 text-sm mt-1 break-words hyphens-auto whitespace-normal">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mt-20 sm:mt-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["$62.3M", "Total Value Split"],
              ["1.2M", "Total Transactions"],
              ["9", "Supported Chains"],
              ["99.98%", "Network Uptime"],
            ].map(([n, l], i) => (
              <div key={i} className={`rounded-3xl ${glass} p-6 text-center min-w-0`}>
                <div className="text-3xl font-semibold">{n}</div>
                <div className="text-white/60 mt-1 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 sm:mt-28 mb-24">
          <div className={`rounded-3xl ${glass} p-8 sm:p-12 text-center`}>
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight break-words hyphens-auto whitespace-normal">
              Build a calmer, smarter portfolio.
            </h3>
            <p className="mt-2 text-white/70 max-w-2xl mx-auto break-words hyphens-auto whitespace-normal">
              Connect a wallet to explore flows — or use read-only to see strategies in action.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition">Launch App</button>
              <button className={`rounded-full px-6 py-3 ${glass} hover:bg-white/10`}>Read Docs</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl ${glass} p-6 sm:p-8`}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-white/10 grid place-items-center">
                  <span className="text-sm font-bold">R</span>
                </div>
                <div className="text-sm text-white/70">© {new Date().getFullYear()} Riven Labs</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/70">
                <a href="#" className="hover:text-white">Docs</a>
                <a href="#" className="hover:text-white">Security</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="X (Twitter)" className={`h-9 w-9 rounded-full grid place-items-center ${glass} hover:bg-white/10`}>X</a>
                <a href="#" aria-label="Discord" className={`h-9 w-9 rounded-full grid place-items-center ${glass} hover:bg-white/10`}>D</a>
                <a href="#" aria-label="GitHub" className={`h-9 w-9 rounded-full grid place-items-center ${glass} hover:bg-white/10`}>G</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
