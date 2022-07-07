import server from "../src/server";
describe("Translation Routes", () => {
  test("translate/rovarsprak", async () => {
    const response = await server.inject({
      url: "/translate/rovarsprak",
      method: "POST",
      payload: {
        text: "Mateo",
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("MOMatoteo");
  });

  test("translate/rovarsprak", async () => {
    const response = await server.inject({
      url: "/translate/rovarsprak",
      method: "POST",
      payload: {
        text: "Mateo",
        withHyphen: true,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("MOM-a-tot-e-o");
  });

  test("translate/spanish", async () => {
    const response = await server.inject({
      url: "/translate/spanish",
      method: "POST",
      payload: {
        text: "MOMatoteo",
      },
    });
    expect(response.statusCode).toBe(400);
  });
});
