import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const W = 1080;
const H = 1350;

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number, maxLines = 4) {
  const words = text.split(" ");
  let line = "";
  let lines = 0;
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      y += lh;
      line = w;
      if (++lines >= maxLines) return y;
    } else line = test;
  }
  ctx.fillText(line, x, y);
  return y + lh;
}

async function logo(): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = "./icon.svg";
  });
}

export interface CardSpec {
  eyebrow: string;
  title: string;
  subtitle?: string;
  detail?: string;
  footer?: string;
}

export async function makeCard(spec: CardSpec): Promise<Blob> {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#FFA826");
  g.addColorStop(0.5, "#F97316");
  g.addColorStop(1, "#DC2626");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // white card
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  (ctx as any).roundRect(70, 200, W - 140, 900, 56);
  ctx.fill();

  const font = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#737373";
  ctx.font = `600 34px ${font}`;
  ctx.fillText(spec.eyebrow.toUpperCase(), W / 2, 300);

  ctx.fillStyle = "#171717";
  ctx.font = `700 ${spec.title.length > 14 ? 92 : 128}px ${font}`;
  let y = wrap(ctx, spec.title, W / 2, 500, W - 260, 130, 3);

  if (spec.subtitle) {
    ctx.fillStyle = "#525252";
    ctx.font = `500 52px ${font}`;
    y = wrap(ctx, spec.subtitle, W / 2, y + 40, W - 260, 66, 3);
  }
  if (spec.detail) {
    ctx.fillStyle = "#a3a3a3";
    ctx.font = `400 38px ${font}`;
    wrap(ctx, spec.detail, W / 2, y + 30, W - 300, 52, 3);
  }

  const img = await logo();
  if (img) ctx.drawImage(img, W / 2 - 60, 60, 120, 120);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 46px ${font}`;
  ctx.fillText("PINORA", W / 2, 1200);
  ctx.font = `500 34px ${font}`;
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(spec.footer || "Learn Botolan Sambal, offline", W / 2, 1258);

  return new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
}

const blobToB64 = (b: Blob) =>
  new Promise<string>((res) => {
    const r = new FileReader();
    r.onloadend = () => res(String(r.result).split(",")[1]);
    r.readAsDataURL(b);
  });

export async function shareFile(blob: Blob, filename: string, text: string) {
  if (Capacitor.isNativePlatform()) {
    const data = await blobToB64(blob);
    const f = await Filesystem.writeFile({ path: filename, data, directory: Directory.Cache });
    await Share.share({ title: "PINORA", text, files: [f.uri], dialogTitle: "Share" });
    return;
  }
  const file = new File([blob], filename, { type: blob.type });
  const nav: any = navigator;
  if (nav.canShare?.({ files: [file] })) {
    await nav.share({ files: [file], text, title: "PINORA" });
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export async function shareCard(spec: CardSpec, text: string) {
  const blob = await makeCard(spec);
  await shareFile(blob, "pinora-card.png", text);
}

export async function shareText(text: string) {
  if (Capacitor.isNativePlatform()) return Share.share({ title: "PINORA", text, dialogTitle: "Share" });
  const nav: any = navigator;
  if (nav.share) return nav.share({ title: "PINORA", text });
  await navigator.clipboard?.writeText(text);
}

export async function shareJsonFile(json: string, filename: string) {
  if (Capacitor.isNativePlatform()) {
    const f = await Filesystem.writeFile({ path: filename, data: json, directory: Directory.Cache, encoding: Encoding.UTF8 });
    await Share.share({ title: "PINORA backup", text: "PINORA backup file", files: [f.uri], dialogTitle: "Save or send backup" });
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  a.download = filename;
  a.click();
}
