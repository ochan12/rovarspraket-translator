const VOWELS = ["a", "e", "i", "o", "u", "ä", "ö", "å"];

export function translateToRovarspraket(text: string) {
  if (!text) return "";
  return text
    .split("")
    .map((character) => {
      if (VOWELS.includes(character) || character === " ") return character;
      return `${character}o${character}`;
    })
    .join("");
}

export function translateToNormalText(rovarspraketText: string) {
  if (!rovarspraketText) return "";
  let finalText = "";
  for (let i = 0; i < rovarspraketText.length; ) {
    const character = rovarspraketText[i];
    finalText += character;
    if (VOWELS.includes(character) || character === " ") {
      i++;
    } else {
      i += 3;
    }
  }
}
