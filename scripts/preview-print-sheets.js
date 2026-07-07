import puppeteer from 'puppeteer';
import { createServer as createHttpServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4174;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function startStaticServer() {
  return new Promise((resolvePromise) => {
    const server = createHttpServer((req, res) => {
      let path = decodeURIComponent((req.url || '/').split('?')[0]);
      if (path === '/') path = '/index.html';
      const filePath = normalize(join(DIST, path));
      if (!filePath.startsWith(DIST) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, () => resolvePromise(server));
  });
}

const browser = await puppeteer.launch({ headless: true });
const server = await startStaticServer();

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
  await page.emulateMediaType('print');
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.print-sheet');

  const metrics = await page.evaluate(() => {
    const sheets = Array.from(document.querySelectorAll('.print-sheet'));
    return sheets.map((sheet, index) => {
      const rect = sheet.getBoundingClientRect();
      const style = getComputedStyle(sheet);
      return {
        index: index + 1,
        className: sheet.className,
        height: Math.round(rect.height),
        minHeight: style.minHeight,
        childSections: sheet.querySelectorAll('.section').length,
      };
    });
  });

  console.log(JSON.stringify(metrics, null, 2));

  const handles = await page.$$('.print-sheet');
  for (let i = 0; i < handles.length; i += 1) {
    await handles[i].screenshot({ path: join(ROOT, 'scripts', `pdf-preview-${i + 1}.png`) });
  }
} finally {
  await browser.close();
  server.close();
}
