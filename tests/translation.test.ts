import {
  translateToNormalText,
  translateToRovarspraket,
} from "../src/services/translation";

describe("translation", () => {
  test("To Normal", () => {
    expect(translateToNormalText("sostotubobboborornon")).toBe("stubborn");
    expect(translateToNormalText("pop pop pop")).toBe("p p p");
    expect(translateToNormalText("pop sos'sos pop")).toBe("p s's p");
  });
  test("Til Rövarspråket", () => {
    expect(translateToRovarspraket("stubborn")).toBe("sostotubobboborornon");
    expect(translateToRovarspraket("stubborn", true)).toBe(
      "sos-tot-u-bob-bob-o-ror-non"
    );
    expect(translateToRovarspraket("KALASDAGS", true)).toBe(
      "KOK-A-LOL-A-SOS-DOD-A-GOG-SOS"
    );
    expect(translateToRovarspraket("KALASDAGS")).toBe("KOKALOLASOSDODAGOGSOS");
  });
});
