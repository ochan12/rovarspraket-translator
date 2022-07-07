// Swedish vowels
const VOWELS = /[aeiouäöåy]+/i;
// Alphabet to verify symbols
const LETTERS = /[a-z]+/i;

const isLowerCase = (s: string) => s === s.toLowerCase();

/**
 * Takes a text and translates it into Rövarspråket
 * @param text Text to be translated
 * @param withHyphen separate text with hyphens instead of spaces
 * @returns Rövarspråket translation
 */
export function translateToRovarspraket(text: string, withHyphen = false) {
  if (!text) return "";
  return text
    .split("")
    .map((character) => {
      if (
        VOWELS.test(character) ||
        (!LETTERS.test(character) && !VOWELS.test(character))
      )
        return character;
      return `${character}${isLowerCase(character) ? "o" : "O"}${character}`;
    })
    .join(withHyphen ? "-" : "");
}

/**
 * Take a Rövarspråket text and translate it into swedish or any other language the original
 * text is.
 * @param rovarspraketText
 * @returns
 */
export function translateToNormalText(rovarspraketText: string) {
  if (!rovarspraketText) return "";
  let finalText = "";
  for (let i = 0; i < rovarspraketText.length; ) {
    const character = rovarspraketText[i];
    finalText += character;
    if (
      VOWELS.test(character) ||
      (!LETTERS.test(character) && !VOWELS.test(character))
    ) {
      i++;
    } else {
      i += 3;
    }
  }
  return finalText;
}
