import { cvEn } from "./cv.en";
import { cvEs } from "./cv.es";
import { uiEn } from "./ui-strings.en";
import { uiEs } from "./ui-strings.es";
import type { CvData, Locale, UiStrings } from "./types";

export function getContent(locale: Locale): { cv: CvData; ui: UiStrings } {
  if (locale === "es") return { cv: cvEs, ui: uiEs };
  return { cv: cvEn, ui: uiEn };
}
