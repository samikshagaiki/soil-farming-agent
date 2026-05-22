import { translateText }
from "@/services/translationService";

export async function translate(
  text,
  lang
) {

  if (lang === "en") {
    return text;
  }

  return await translateText(
    text,
    lang
  );
}