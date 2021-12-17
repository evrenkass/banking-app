const puppeteer = require("puppeteer");
const handler = require("serve-handler");
const http = require("http");
const server = http.createServer((request, response) => {
  return handler(request, response, { public: "build" });
});
let browser;
afterAll(async () => {
  await browser.close();
  server.close();
});
beforeAll(async () => {
  server.listen(3001);
  browser = await puppeteer.launch();
});
it("checks title", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:3001");
  const title = await page.$(".card-title");
  const text = await (await title.getProperty("textContent")).jsonValue();
  expect(text).toEqual("Dreambank Landing Module");
});
