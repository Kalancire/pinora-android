import { LocalNotifications } from "@capacitor/local-notifications";
import { Capacitor } from "@capacitor/core";

const ID = 4101;

const MESSAGES = {
  en: ["A few minutes of Sambal today keeps your streak alive.", "Ready for a quick Sambal lesson?", "Your words are waiting for a review."],
  fil: ["Ilang minuto ng Sambal ngayon para hindi maputol ang streak mo.", "Handa ka na ba sa mabilis na aralin sa Sambal?", "Naghihintay ang mga salita mo para sa balik-aral."],
};

export async function setReminder(on: boolean, hour: number, minute: number, lang: "en" | "fil"): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return on;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: ID }] });
    if (!on) return true;
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") return false;
    const msgs = MESSAGES[lang];
    await LocalNotifications.schedule({
      notifications: [
        {
          id: ID,
          title: "PINORA",
          body: msgs[Math.floor(Math.random() * msgs.length)],
          schedule: { on: { hour, minute }, allowWhileIdle: true },
          smallIcon: "ic_stat_pinora",
        },
      ],
    });
    return true;
  } catch (e) {
    console.error("Reminder failed", e);
    return false;
  }
}
