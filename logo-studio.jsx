import React, { useState, useRef } from "react";
import {
  Briefcase, Leaf, Zap, Mountain, Anchor, Sun, Compass, Shield,
  Coffee, Feather, Star, Hexagon, Circle, Triangle, Download,
  Check, RefreshCw
} from "lucide-react";

// ---- Design tokens ----
// Paper: #EDEAE2 | Ink: #16302B | Brass: #B8860B | Oxblood: #8C2F39 | Card white: #FFFDF9

const ICONS = [
  { id: "briefcase", Icon: Briefcase, label: "Briefcase" },
  { id: "leaf", Icon: Leaf, label: "Leaf" },
  { id: "bolt", Icon: Zap, label: "Bolt" },
  { id: "mountain", Icon: Mountain, label: "Mountain" },
  { id: "anchor", Icon: Anchor, label: "Anchor" },
  { id: "sun", Icon: Sun, label: "Sun" },
  { id: "compass", Icon: Compass, label: "Compass" },
  { id: "shield", Icon: Shield, label: "Shield" },
  { id: "coffee", Icon: Coffee, label: "Coffee" },
  { id: "feather", Icon: Feather, label: "Feather" },
  { id: "star", Icon: Star, label: "Star" },
  { id: "hexagon", Icon: Hexagon, label: "Hexagon" },
];

const PALETTES = [
  { id: "teal-brass", name: "Ledger", ink: "#16302B", accent: "#B8860B", paper: "#FFFDF9" },
  { id: "oxblood", name: "Oxblood", ink: "#2A1A1D", accent: "#8C2F39", paper: "#FFFDF9" },
  { id: "navy-copper", name: "Harbor", ink: "#10243D", accent: "#C2703D", paper: "#FFFDF9" },
  { id: "forest", name: "Grove", ink: "#1C2B1F", accent: "#5C7A4F", paper: "#FFFDF9" },
  { id: "charcoal", name: "Slate", ink: "#222222", accent: "#4A6FA5", paper: "#FFFDF9" },
  { id: "plum", name: "Plum", ink: "#2E1A2E", accent: "#A24E8B", paper: "#FFFDF9" },
];

const FONT_PAIRS = [
  { id: "spectral", name: "Spectral / Grotesk", display: "'Spectral', serif", body: "'Space Grotesk', sans-serif" },
  { id: "newsreader", name: "Newsreader / Mono", display: "'Newsreader', serif", body: "'JetBrains Mono', monospace" },
  { id: "grotesk-only", name: "All Grotesk", display: "'Space Grotesk', sans-serif", body: "'Space Grotesk', sans-serif" },
];

const LAYOUTS = [
  { id: "icon-left", name: "Icon + Name" },
  { id: "stacked", name: "Stacked" },
  { id: "wordmark", name: "Wordmark only" },
  { id: "badge", name: "Badge" },
];

export default function LogoStudio() {
  const [name, setName] = useState("Vottriyur & Co.");
  const [tagline, setTagline] = useState("Publishing House");
  const [iconId, setIconId] = useState("feather");
  const [paletteId, setPaletteId] = useState("teal-brass");
  const [fontId, setFontId] = useState("spectral");
  const [layoutId, setLayoutId] = useState("icon-left");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState([]);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  const palette = PALETTES.find(p => p.id === paletteId);
  const font = FONT_PAIRS.find(f => f.id === fontId);
  const IconComp = ICONS.find(i => i.id === iconId).Icon;

  const randomize = () => {
    setIconId(ICONS[Math.floor(Math.random() * ICONS.length)].id);
    setPaletteId(PALETTES[Math.floor(Math.random() * PALETTES.length)].id);
    setFontId(FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)].id);
    setLayoutId(LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)].id);
  };

  const downloadPNG = () => {
    const svgEl = svgRef.current;
    const serializer = new XMLSerializer();
    let svgStr = serializer.serializeToString(svgEl);
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const scale = 3;
      const canvas = canvasRef.current;
      canvas.width = 600 * scale;
      canvas.height = 600 * scale;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = palette.paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const link = document.createElement("a");
      link.download = `${name.replace(/\s+/g, "-").toLowerCase() || "logo"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = url;
  };

  const copyHex = (hex) => {
    setCopied(hex);
    setTimeout(() => setCopied(false), 1200);
  };

  const downloadSVG = () => {
    const svgEl = svgRef.current;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name.replace(/\s+/g, "-").toLowerCase() || "logo"}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const saveToGallery = () => {
    setSaved(prev => [...prev, { id: Date.now(), name, tagline, iconId, paletteId, fontId, layoutId }]);
  };

  const loadFromGallery = (item) => {
    setName(item.name);
    setTagline(item.tagline);
    setIconId(item.iconId);
    setPaletteId(item.paletteId);
    setFontId(item.fontId);
    setLayoutId(item.layoutId);
  };

  const removeFromGallery = (id) => {
    setSaved(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ fontFamily: font.body, background: "#EDEAE2", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400;600;700&family=Newsreader:opsz,wght@72,400;72,600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .lab-input {
          width: 100%; padding: 10px 12px; border: 1px solid #C9C4B8; border-radius: 4px;
          background: #FFFDF9; font-family: 'Space Grotesk', sans-serif; font-size: 14px; color: #16302B;
          outline: none; transition: border-color 0.15s;
        }
        .lab-input:focus { border-color: ${palette.accent}; }
        .swatch-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .swatch-btn {
          width: 40px; height: 40px; border-radius: 4px; cursor: pointer; border: 2px solid transparent;
          display: flex; align-items: center; justify-content: center; transition: transform 0.1s;
        }
        .swatch-btn:hover { transform: scale(1.08); }
        .icon-btn {
          width: 44px; height: 44px; border-radius: 4px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: #FFFDF9; border: 1px solid #C9C4B8; transition: all 0.12s;
        }
        .icon-btn:hover { border-color: #16302B; }
        .layout-pill {
          padding: 8px 14px; border-radius: 999px; cursor: pointer; font-size: 13px;
          border: 1px solid #C9C4B8; background: #FFFDF9; font-family: 'Space Grotesk', sans-serif;
          transition: all 0.12s;
        }
        .section-label {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.08em;
          text-transform: uppercase; color: #6B6457; margin-bottom: 10px; display: block;
        }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #C9C4B8", padding: "18px 28px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Spectral', serif", fontWeight: 700, fontSize: "22px", color: "#16302B" }}>
            Logo Workshop
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6B6457", marginTop: "2px" }}>
            specimen sheet for businesses, no design degree required
          </div>
        </div>
        <button onClick={randomize} className="layout-pill" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <RefreshCw size={14} /> Shuffle
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", minHeight: "calc(100vh - 70px)" }}>
        {/* Controls */}
        <div style={{ padding: "24px", borderRight: "1px solid #C9C4B8", background: "#F2EFE7" }}>

          <span className="section-label">Business name</span>
          <input className="lab-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your business name" />

          <div style={{ height: "16px" }} />
          <span className="section-label">Tagline (optional)</span>
          <input className="lab-input" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="What you do" />

          <div style={{ height: "20px" }} />
          <span className="section-label">Mark</span>
          <div className="swatch-row">
            {ICONS.map(({ id, Icon }) => (
              <button key={id} className="icon-btn" onClick={() => setIconId(id)}
                style={{ borderColor: iconId === id ? palette.accent : "#C9C4B8", borderWidth: iconId === id ? "2px" : "1px" }}>
                <Icon size={18} color={iconId === id ? palette.accent : "#16302B"} />
              </button>
            ))}
          </div>

          <div style={{ height: "20px" }} />
          <span className="section-label">Palette</span>
          <div className="swatch-row">
            {PALETTES.map(p => (
              <button key={p.id} className="swatch-btn" onClick={() => setPaletteId(p.id)}
                style={{ background: p.ink, borderColor: paletteId === p.id ? p.accent : "transparent" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: p.accent }} />
              </button>
            ))}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6B6457", marginTop: "8px" }}>
            {palette.name} — click to copy
            <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
              {[palette.ink, palette.accent].map(hex => (
                <span key={hex} onClick={() => { navigator.clipboard.writeText(hex); copyHex(hex); }}
                  style={{ cursor: "pointer", padding: "2px 6px", background: "#FFFDF9", border: "1px solid #C9C4B8", borderRadius: "3px" }}>
                  {copied === hex ? <Check size={10} style={{ display: "inline" }} /> : hex}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: "20px" }} />
          <span className="section-label">Typeface pairing</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {FONT_PAIRS.map(f => (
              <button key={f.id} onClick={() => setFontId(f.id)} className="layout-pill"
                style={{ textAlign: "left", borderColor: fontId === f.id ? palette.accent : "#C9C4B8" }}>
                {f.name}
              </button>
            ))}
          </div>

          <div style={{ height: "20px" }} />
          <span className="section-label">Layout</span>
          <div className="swatch-row">
            {LAYOUTS.map(l => (
              <button key={l.id} onClick={() => setLayoutId(l.id)} className="layout-pill"
                style={{ borderColor: layoutId === l.id ? palette.accent : "#C9C4B8" }}>
                {l.name}
              </button>
            ))}
          </div>

          <div style={{ height: "12px" }} />
          <button onClick={saveToGallery} className="layout-pill"
            style={{ width: "100%", background: "#FFFDF9", color: palette.ink, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px", fontSize: "13px", borderColor: palette.accent }}>
            + Save to My Logos
          </button>

          <div style={{ height: "10px" }} />
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={downloadPNG} className="layout-pill"
              style={{ flex: 1, background: palette.ink, color: palette.paper, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", fontSize: "13px" }}>
              <Download size={15} /> PNG
            </button>
            <button onClick={downloadSVG} className="layout-pill"
              style={{ flex: 1, background: "#FFFDF9", color: palette.ink, borderColor: palette.ink, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", fontSize: "13px" }}>
              <Download size={15} /> SVG
            </button>
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Preview / specimen sheet */}
        <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
          <div style={{
            background: palette.paper, border: `1px solid ${palette.ink}22`, borderRadius: "6px",
            padding: "60px", width: "440px", display: "flex", justifyContent: "center"
          }}>
            <LogoMark
              ref={svgRef}
              name={name || "Your Business"}
              tagline={tagline}
              IconComp={IconComp}
              palette={palette}
              font={font}
              layout={layoutId}
            />
          </div>

          {/* context mockups */}
          <div style={{ display: "flex", gap: "20px", width: "440px" }}>
            <div style={{ flex: 1, background: palette.ink, borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ transform: "scale(0.55)" }}>
                <LogoMark name={name || "Your Business"} tagline={tagline} IconComp={IconComp} palette={{ ...palette, ink: palette.paper }} font={font} layout={layoutId} inverted />
              </div>
            </div>
            <div style={{ flex: 1, background: "#fff", border: "1px solid #C9C4B8", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ transform: "scale(0.55)" }}>
                <LogoMark name={name || "Your Business"} tagline={tagline} IconComp={IconComp} palette={palette} font={font} layout={layoutId} />
              </div>
            </div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6B6457", textAlign: "center" }}>
            dark card &amp; light card — check it reads well in both
          </div>

          {saved.length > 0 && (
            <div style={{ width: "440px" }}>
              <span className="section-label">My Logos ({saved.length})</span>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {saved.map(item => {
                  const p = PALETTES.find(pp => pp.id === item.paletteId);
                  const ic = ICONS.find(ii => ii.id === item.iconId).Icon;
                  return (
                    <div key={item.id} style={{ position: "relative", border: "1px solid #C9C4B8", borderRadius: "6px", padding: "12px", background: p.paper, cursor: "pointer", width: "120px" }}
                      onClick={() => loadFromGallery(item)}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                        <ic size={16} color={p.accent} />
                        <span style={{ fontFamily: "'Spectral', serif", fontSize: "12px", color: p.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); removeFromGallery(item.id); }}
                        style={{ position: "absolute", top: "2px", right: "4px", background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "#6B6457" }}>×</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const LogoMark = React.forwardRef(({ name, tagline, IconComp, palette, font, layout, inverted }, ref) => {
  const ink = palette.ink;
  const accent = palette.accent;

  const iconBox = (
    <div style={{
      width: layout === "stacked" ? "64px" : "52px",
      height: layout === "stacked" ? "64px" : "52px",
      borderRadius: layout === "badge" ? "50%" : "8px",
      background: layout === "badge" ? ink : `${accent}1A`,
      border: layout === "badge" ? "none" : `1.5px solid ${accent}`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      <IconComp size={layout === "stacked" ? 30 : 24} color={layout === "badge" ? palette.paper || accent : accent} />
    </div>
  );

  const textBlock = (centered) => (
    <div style={{ textAlign: centered ? "center" : "left" }}>
      <div style={{ fontFamily: font.display, fontWeight: 600, fontSize: "26px", color: ink, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
        {name}
      </div>
      {tagline && (
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginTop: "4px" }}>
          {tagline}
        </div>
      )}
    </div>
  );

  let content;
  if (layout === "wordmark") {
    content = textBlock(false);
  } else if (layout === "stacked" || layout === "badge") {
    content = (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
        {iconBox}
        {textBlock(true)}
      </div>
    );
  } else {
    content = (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {iconBox}
        {textBlock(false)}
      </div>
    );
  }

  return (
    <svg ref={ref} width="320" height="180" viewBox="0 0 320 180" style={{ overflow: "visible" }}>
      <foreignObject x="0" y="0" width="320" height="180">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: "320px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {content}
        </div>
      </foreignObject>
    </svg>
  );
});
