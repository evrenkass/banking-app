const puppeteer = require("puppeteer");
const handler = require("serve-handler");
const http = require("http");
it("checks title", () => {
  const server = http.createServer((request, response) => {
    return handler(request, response, { public: "build" });
  });

  server.listen(3001, () => {
    (async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("http://localhost:3001");
        const title = await page.$(".card-title");
        const text = await (await title.getProperty("textContent")).jsonValue();
        expect(text).toEqual("Dreambank Landing Module");

        await browser.close();
        server.close();
      } catch {
        server.close();
      }
    })();
  });
});
