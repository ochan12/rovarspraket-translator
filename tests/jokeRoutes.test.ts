import server from "../src/server";
describe("Joke Routes", () => {
  test("jokes/rovarsprak", async () => {
    const response = await server.inject({
      url: "/jokes/rovarsprak",
      method: "GET",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("jokes/spanish", async () => {
    const response = await server.inject({
      url: "/jokes/spanish",
      method: "GET",
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().message).toBe(
      "params/translation must be equal to one of the allowed values"
    );
  });
});
