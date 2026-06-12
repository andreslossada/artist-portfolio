export type TimeColors = {
  canvas: string;
  canvasSoft: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentSoft: string;
  seagreen600: string;
  sand500: string;
  seagreen500: string;
  sand400: string;
  seagreen400: string;
  glowTopColor: string;
  glowTopOpacity: number;
  glowBottomColor: string;
  glowBottomOpacity: number;
  fishColor: string;
  fishOpacity: number;
  auroraOverlayOpacity: number;
  sandColor: string;
  waveMainStops: [string, string, string, string, string];
  waveSoftStops: [string, string, string, string, string];
  waveWashStops: [string, string, string, string, string];
};

type TimeStop = {
  hour: number;
  colors: TimeColors;
};

const TIME_STOPS: TimeStop[] = [
  {
    hour: 0,
    colors: {
      canvas: "#020d18",
      canvasSoft: "#051525",
      surface: "#081e30",
      ink: "#b8cce0",
      muted: "#507090",
      accent: "#3090c0",
      accentSoft: "#061828",
      seagreen600: "#061828",
      sand500: "#0a2038",
      seagreen500: "#081e30",
      sand400: "#0c1830",
      seagreen400: "#0a2238",
      glowTopColor: "rgba(0,180,220,0.03)",
      glowTopOpacity: 0.03,
      glowBottomColor: "rgba(2,13,24,0.6)",
      glowBottomOpacity: 0.6,
      fishColor: "#0a2040",
      fishOpacity: 0.08,
      auroraOverlayOpacity: 0.2,
      sandColor: "#0a111a",
      waveMainStops: [
        "rgba(10,30,55,0.98)",
        "rgba(8,25,48,0.90)",
        "rgba(6,20,42,0.88)",
        "rgba(4,15,35,0.92)",
        "rgba(2,10,28,0.85)",
      ],
      waveSoftStops: [
        "rgba(15,35,60,0.90)",
        "rgba(12,30,52,0.80)",
        "rgba(10,25,46,0.75)",
        "rgba(6,20,40,0.70)",
        "rgba(4,15,32,0.55)",
      ],
      waveWashStops: [
        "rgba(20,40,65,0.92)",
        "rgba(16,35,58,0.65)",
        "rgba(12,28,50,0.55)",
        "rgba(8,22,42,0.45)",
        "rgba(5,16,34,0.28)",
      ],
    },
  },
  {
    hour: 5.5,
    colors: {
      canvas: "#0a2840",
      canvasSoft: "#0f3858",
      surface: "#154868",
      ink: "#c8dce8",
      muted: "#6098b8",
      accent: "#40a8d0",
      accentSoft: "#0a2838",
      seagreen600: "#0c2a3e",
      sand500: "#123848",
      seagreen500: "#103048",
      sand400: "#143048",
      seagreen400: "#0e3048",
      glowTopColor: "rgba(100,180,220,0.06)",
      glowTopOpacity: 0.06,
      glowBottomColor: "rgba(10,40,64,0.5)",
      glowBottomOpacity: 0.5,
      fishColor: "#1a4068",
      fishOpacity: 0.15,
      auroraOverlayOpacity: 0.28,
      sandColor: "#1a2535",
      waveMainStops: [
        "rgba(30,70,110,0.98)",
        "rgba(25,60,100,0.90)",
        "rgba(18,50,90,0.88)",
        "rgba(12,40,80,0.92)",
        "rgba(8,30,68,0.85)",
      ],
      waveSoftStops: [
        "rgba(40,80,120,0.90)",
        "rgba(32,70,108,0.80)",
        "rgba(24,58,96,0.75)",
        "rgba(16,46,84,0.70)",
        "rgba(12,36,72,0.55)",
      ],
      waveWashStops: [
        "rgba(50,90,130,0.92)",
        "rgba(40,78,116,0.65)",
        "rgba(30,66,104,0.55)",
        "rgba(20,54,92,0.45)",
        "rgba(14,42,78,0.28)",
      ],
    },
  },
  {
    hour: 7.5,
    colors: {
      canvas: "#0077aa",
      canvasSoft: "#1088bb",
      surface: "#2099cc",
      ink: "#e8f4f8",
      muted: "#80c8e0",
      accent: "#f0b840",
      accentSoft: "#005070",
      seagreen600: "#006890",
      sand500: "#e0dcc0",
      seagreen500: "#0090b8",
      sand400: "#f0ecd8",
      seagreen400: "#20b8d8",
      glowTopColor: "rgba(255,240,200,0.15)",
      glowTopOpacity: 0.15,
      glowBottomColor: "rgba(180,200,180,0.12)",
      glowBottomOpacity: 0.12,
      fishColor: "#f08030",
      fishOpacity: 0.45,
      auroraOverlayOpacity: 0.55,
      sandColor: "#d4c9a8",
      waveMainStops: [
        "rgba(100,210,245,0.98)",
        "rgba(50,180,220,0.90)",
        "rgba(0,150,200,0.88)",
        "rgba(0,119,170,0.92)",
        "rgba(0,100,150,0.85)",
      ],
      waveSoftStops: [
        "rgba(120,220,245,0.90)",
        "rgba(80,200,230,0.80)",
        "rgba(30,170,210,0.75)",
        "rgba(0,140,185,0.70)",
        "rgba(0,120,160,0.55)",
      ],
      waveWashStops: [
        "rgba(160,230,248,0.92)",
        "rgba(120,215,240,0.65)",
        "rgba(60,190,225,0.55)",
        "rgba(20,160,200,0.45)",
        "rgba(10,140,180,0.28)",
      ],
    },
  },
  {
    hour: 12,
    colors: {
      canvas: "#00a8cc",
      canvasSoft: "#10b8dd",
      surface: "#20c8ee",
      ink: "#f0f8fa",
      muted: "#90d8e8",
      accent: "#f5c840",
      accentSoft: "#006080",
      seagreen600: "#0088a8",
      sand500: "#f5f0d8",
      seagreen500: "#00a8c0",
      sand400: "#faf5e8",
      seagreen400: "#40d8f0",
      glowTopColor: "rgba(255,250,230,0.2)",
      glowTopOpacity: 0.2,
      glowBottomColor: "rgba(200,230,215,0.15)",
      glowBottomOpacity: 0.15,
      fishColor: "#f89830",
      fishOpacity: 0.6,
      auroraOverlayOpacity: 0.65,
      sandColor: "#f5ecd8",
      waveMainStops: [
        "rgba(120,225,250,0.98)",
        "rgba(80,210,240,0.90)",
        "rgba(30,185,225,0.88)",
        "rgba(0,160,205,0.92)",
        "rgba(0,135,180,0.85)",
      ],
      waveSoftStops: [
        "rgba(140,235,252,0.90)",
        "rgba(100,220,242,0.80)",
        "rgba(50,200,230,0.75)",
        "rgba(10,170,210,0.70)",
        "rgba(0,148,190,0.55)",
      ],
      waveWashStops: [
        "rgba(180,240,254,0.92)",
        "rgba(140,230,246,0.65)",
        "rgba(80,210,235,0.55)",
        "rgba(30,185,215,0.45)",
        "rgba(10,160,195,0.28)",
      ],
    },
  },
  {
    hour: 15,
    colors: {
      canvas: "#0098bb",
      canvasSoft: "#10a8cc",
      surface: "#20b8dd",
      ink: "#ecf4f6",
      muted: "#88cce0",
      accent: "#f0b040",
      accentSoft: "#005878",
      seagreen600: "#007898",
      sand500: "#ede0c0",
      seagreen500: "#0098b0",
      sand400: "#f5edd8",
      seagreen400: "#30c8e0",
      glowTopColor: "rgba(248,210,140,0.17)",
      glowTopOpacity: 0.17,
      glowBottomColor: "rgba(0,80,110,0.2)",
      glowBottomOpacity: 0.2,
      fishColor: "#f08020",
      fishOpacity: 0.55,
      auroraOverlayOpacity: 0.6,
      sandColor: "#eadcc0",
      waveMainStops: [
        "rgba(90,200,235,0.98)",
        "rgba(45,175,215,0.90)",
        "rgba(5,145,195,0.88)",
        "rgba(5,115,165,0.92)",
        "rgba(5,100,145,0.85)",
      ],
      waveSoftStops: [
        "rgba(110,210,238,0.90)",
        "rgba(70,190,222,0.80)",
        "rgba(25,158,200,0.75)",
        "rgba(5,135,178,0.70)",
        "rgba(5,118,155,0.55)",
      ],
      waveWashStops: [
        "rgba(150,222,242,0.92)",
        "rgba(110,205,230,0.65)",
        "rgba(50,175,210,0.55)",
        "rgba(18,150,190,0.45)",
        "rgba(10,132,168,0.28)",
      ],
    },
  },
  {
    hour: 17.5,
    colors: {
      canvas: "#005878",
      canvasSoft: "#0a6a90",
      surface: "#157ca5",
      ink: "#e8f0f0",
      muted: "#78b8d0",
      accent: "#f06830",
      accentSoft: "#004058",
      seagreen600: "#005068",
      sand500: "#f0c890",
      seagreen500: "#006080",
      sand400: "#f5d8a8",
      seagreen400: "#1898b8",
      glowTopColor: "rgba(248,140,60,0.22)",
      glowTopOpacity: 0.22,
      glowBottomColor: "rgba(0,65,95,0.35)",
      glowBottomOpacity: 0.35,
      fishColor: "#f06830",
      fishOpacity: 0.5,
      auroraOverlayOpacity: 0.55,
      sandColor: "#d4b896",
      waveMainStops: [
        "rgba(60,155,195,0.98)",
        "rgba(45,130,175,0.90)",
        "rgba(25,105,155,0.88)",
        "rgba(15,88,130,0.92)",
        "rgba(10,70,110,0.85)",
      ],
      waveSoftStops: [
        "rgba(80,170,205,0.90)",
        "rgba(60,145,185,0.80)",
        "rgba(35,118,162,0.75)",
        "rgba(18,95,140,0.70)",
        "rgba(12,75,118,0.55)",
      ],
      waveWashStops: [
        "rgba(105,185,215,0.92)",
        "rgba(75,160,195,0.65)",
        "rgba(45,130,170,0.55)",
        "rgba(25,105,148,0.45)",
        "rgba(15,82,125,0.28)",
      ],
    },
  },
  {
    hour: 19.5,
    colors: {
      canvas: "#0a2a48",
      canvasSoft: "#123858",
      surface: "#1a4868",
      ink: "#c8dce8",
      muted: "#6090a8",
      accent: "#d08040",
      accentSoft: "#0a2038",
      seagreen600: "#0c2840",
      sand500: "#1a3850",
      seagreen500: "#103048",
      sand400: "#163048",
      seagreen400: "#0e3048",
      glowTopColor: "rgba(180,100,60,0.06)",
      glowTopOpacity: 0.06,
      glowBottomColor: "rgba(10,42,72,0.5)",
      glowBottomOpacity: 0.5,
      fishColor: "#284868",
      fishOpacity: 0.2,
      auroraOverlayOpacity: 0.32,
      sandColor: "#4a3a2a",
      waveMainStops: [
        "rgba(20,55,90,0.98)",
        "rgba(16,46,80,0.90)",
        "rgba(12,38,70,0.88)",
        "rgba(8,30,58,0.92)",
        "rgba(5,22,48,0.85)",
      ],
      waveSoftStops: [
        "rgba(28,65,100,0.90)",
        "rgba(22,55,88,0.80)",
        "rgba(16,45,76,0.75)",
        "rgba(10,36,64,0.70)",
        "rgba(8,28,54,0.55)",
      ],
      waveWashStops: [
        "rgba(35,75,110,0.92)",
        "rgba(28,62,96,0.65)",
        "rgba(20,50,82,0.55)",
        "rgba(14,40,70,0.45)",
        "rgba(10,32,58,0.28)",
      ],
    },
  },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(a: string, b: string, t: number): string {
  const parseHex = (hex: string): [number, number, number] => {
    const clean = hex.replace("#", "");
    return [
      parseInt(clean.substring(0, 2), 16),
      parseInt(clean.substring(2, 4), 16),
      parseInt(clean.substring(4, 6), 16),
    ];
  };

  const parseRgba = (
    rgba: string,
  ): [number, number, number, number] | null => {
    const match = rgba.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
    );
    if (!match) return null;
    return [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      match[4] ? parseFloat(match[4]) : 1,
    ];
  };

  const rgbaA = parseRgba(a);
  const rgbaB = parseRgba(b);

  if (rgbaA && rgbaB) {
    const r = Math.round(lerp(rgbaA[0], rgbaB[0], t));
    const g = Math.round(lerp(rgbaA[1], rgbaB[1], t));
    const b_ = Math.round(lerp(rgbaA[2], rgbaB[2], t));
    const alpha = lerp(rgbaA[3], rgbaB[3], t);
    return `rgba(${r},${g},${b_},${alpha.toFixed(3)})`;
  }

  const [r1, g1, b1] = parseHex(a);
  const [r2, g2, b2] = parseHex(b);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const bl = Math.round(lerp(b1, b2, t));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

function cosineEase(t: number): number {
  return (1 - Math.cos(t * Math.PI)) / 2;
}

export function getTimeColors(hour: number): TimeColors {
  const wrapped = ((hour % 24) + 24) % 24;

  const stops = TIME_STOPS;
  const len = stops.length;

  let prevIdx = 0;
  let nextIdx = 0;

  for (let i = 0; i < len; i++) {
    if (stops[i].hour <= wrapped) {
      prevIdx = i;
    }
  }

  nextIdx = (prevIdx + 1) % len;

  const prevHour = stops[prevIdx].hour;
  let nextHour = stops[nextIdx].hour;

  if (nextIdx === 0) {
    nextHour += 24;
  }

  let adjustedHour = wrapped;
  if (wrapped < prevHour && nextIdx === 0) {
    adjustedHour += 24;
  }

  const range = nextHour - prevHour;
  const rawT = range === 0 ? 0 : (adjustedHour - prevHour) / range;
  const t = cosineEase(rawT);

  const prev = stops[prevIdx].colors;
  const next = stops[nextIdx].colors;

  const interpolate = (key: keyof TimeColors): TimeColors[typeof key] => {
    const a = prev[key];
    const b = next[key];

    if (typeof a === "number" && typeof b === "number") {
      return lerp(a, b, t) as TimeColors[typeof key];
    }

    if (typeof a === "string" && typeof b === "string") {
      return lerpColor(a, b, t) as TimeColors[typeof key];
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      return (a as string[]).map((item, i) =>
        lerpColor(item, (b as string[])[i], t),
      ) as TimeColors[typeof key];
    }

    return a;
  };

  return {
    canvas: interpolate("canvas") as string,
    canvasSoft: interpolate("canvasSoft") as string,
    surface: interpolate("surface") as string,
    ink: interpolate("ink") as string,
    muted: interpolate("muted") as string,
    accent: interpolate("accent") as string,
    accentSoft: interpolate("accentSoft") as string,
    seagreen600: interpolate("seagreen600") as string,
    sand500: interpolate("sand500") as string,
    seagreen500: interpolate("seagreen500") as string,
    sand400: interpolate("sand400") as string,
    seagreen400: interpolate("seagreen400") as string,
    glowTopColor: interpolate("glowTopColor") as string,
    glowTopOpacity: interpolate("glowTopOpacity") as number,
    glowBottomColor: interpolate("glowBottomColor") as string,
    glowBottomOpacity: interpolate("glowBottomOpacity") as number,
    fishColor: interpolate("fishColor") as string,
    fishOpacity: interpolate("fishOpacity") as number,
    auroraOverlayOpacity: interpolate("auroraOverlayOpacity") as number,
    sandColor: interpolate("sandColor") as string,
    waveMainStops: interpolate("waveMainStops") as TimeColors["waveMainStops"],
    waveSoftStops: interpolate("waveSoftStops") as TimeColors["waveSoftStops"],
    waveWashStops: interpolate("waveWashStops") as TimeColors["waveWashStops"],
  };
}

export function getCurrentHour(): number {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}
