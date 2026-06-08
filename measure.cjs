const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://id-preview--1556721c-a4cf-46fc-b315-97d221661888.lovable.app', { waitUntil: 'networkidle2' });
  const result = await page.evaluate(() => {
    const p = document.querySelector('p.body-text');
    if (!p) return null;
    const style = window.getComputedStyle(p);
    const width = p.getBoundingClientRect().width;
    const range = document.createRange();
    const words = p.textContent.split(/\s+/);
    const lines = [];
    let currentLine = [];
    let prevTop = null;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const idx = p.textContent.indexOf(word, i === 0 ? 0 : p.textContent.indexOf(words[i-1]) + words[i-1].length);
      range.setStart(p.firstChild, idx);
      range.setEnd(p.firstChild, idx + word.length);
      const rect = range.getBoundingClientRect();
      if (prevTop !== null && Math.abs(rect.top - prevTop) > 2) {
        lines.push(currentLine.join(' '));
        currentLine = [];
      }
      currentLine.push(word);
      prevTop = rect.top;
    }
    if (currentLine.length) lines.push(currentLine.join(' '));
    return { width, lines, fontSize: style.fontSize, fontFamily: style.fontFamily };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
