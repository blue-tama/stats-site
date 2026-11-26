// charts.js — draws bar and line charts on <canvas> with plain code.
// No chart library is used: every pixel is computed here, so the site has
// no dependency and no network request.

const INK = "#1c2b39";
const MUTED = "#5b6b7a";
const GRID = "#dfe6ec";
const BAR = "#0e7a5f";
const BAR_ALT = "#c98a1b";
const LINE = "#0e5a8a";
const POINT = "#c0392b";

/** Format a number the Indonesian way: comma decimals, dot thousands. */
export function fmtId(n, decimals = 2) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function setupCanvas(canvas, heightCss) {
  const dpr = window.devicePixelRatio || 1;
  const widthCss = canvas.clientWidth || canvas.parentElement.clientWidth || 640;
  canvas.width = Math.round(widthCss * dpr);
  canvas.height = Math.round(heightCss * dpr);
  canvas.style.height = heightCss + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = "12px system-ui, -apple-system, 'Segoe UI', sans-serif";
  return { ctx, width: widthCss, height: heightCss };
}

function niceMax(maxValue) {
  const pow = Math.pow(10, Math.floor(Math.log10(maxValue)));
  const norm = maxValue / pow;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * pow;
}

function drawAxes(ctx, box, yMax, yLabel, unit) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.lineWidth = 1;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const v = (yMax / ticks) * i;
    const y = box.bottom - (box.height * v) / yMax;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.right, y);
    ctx.stroke();
    ctx.fillText(fmtId(v, unit === "%" ? 1 : 0) + unit, box.left - 8, y);
  }
  ctx.textAlign = "left";
  ctx.fillStyle = MUTED;
  ctx.fillText(yLabel, box.left, box.top - 12);
  // Baseline at zero, drawn darker so a negative bar (2020) reads clearly.
  ctx.strokeStyle = "#9aa8b5";
  ctx.beginPath();
  ctx.moveTo(box.left, box.bottom);
  ctx.lineTo(box.right, box.bottom);
  ctx.stroke();
}

function drawXLabels(ctx, box, labels) {
  ctx.fillStyle = MUTED;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const slot = box.width / labels.length;
  labels.forEach((label, i) => {
    ctx.fillText(String(label), box.left + slot * (i + 0.5), box.bottom + 8);
  });
}

/**
 * Draw a chart into a canvas.
 * series: [{year, value}]. kind: "bar" or "line".
 * opts: {unit, yLabel, decimals, color}.
 */
export function drawChart(canvas, series, kind, opts = {}) {
  const unit = opts.unit || "";
  const yLabel = opts.yLabel || "";
  const { ctx, width, height } = setupCanvas(canvas, 260);
  const box = { left: 56, right: width - 12, top: 28, bottom: height - 30 };
  box.width = box.right - box.left;
  box.height = box.bottom - box.top;

  const values = series.map((p) => p.value);
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const yMax = niceMax(max - min) + (min < 0 ? -min : 0);
  const span = yMax - min;

  drawAxes(ctx, box, yMax, yLabel, unit);
  drawXLabels(ctx, box, series.map((p) => p.year));

  const slot = box.width / series.length;
  const yOf = (v) => box.bottom - ((v - min) / span) * box.height;

  if (kind === "bar") {
    series.forEach((p, i) => {
      const barW = Math.min(44, slot * 0.55);
      const x = box.left + slot * i + (slot - barW) / 2;
      const y = yOf(p.value);
      const zeroY = yOf(0);
      ctx.fillStyle = p.value < 0 ? BAR_ALT : BAR;
      ctx.fillRect(x, Math.min(y, zeroY), barW, Math.abs(zeroY - y));
      ctx.fillStyle = INK;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(fmtId(p.value, opts.decimals ?? 2) + unit, x + barW / 2, Math.min(y, zeroY) - 4);
    });
  } else {
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    series.forEach((p, i) => {
      const x = box.left + slot * (i + 0.5);
      const y = yOf(p.value);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    series.forEach((p, i) => {
      const x = box.left + slot * (i + 0.5);
      const y = yOf(p.value);
      ctx.fillStyle = POINT;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(fmtId(p.value, opts.decimals ?? 2) + unit, x, y - 8);
    });
  }
}
