const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://annasmalley.com', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  
  // Try different max-width percentages
  const percentages = [57, 56, 55, 54, 53, 52, 51, 50, 49, 48];
  for (const pct of percentages) {
    const result = await page.evaluate((p) => {
      const target = document.querySelector('p.body-text');
      if (!target) return { error: 'not found' };
      target.style.maxWidth = p + '%';
      const width = target.getBoundingClientRect().width;
      const range = document.createRange();
      const words = target.textContent.split(/\s+/);
      const lines = [];
      let currentLine = [];
      let prevTop = null;
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const idx = target.textContent.indexOf(word, i === 0 ? 0 : target.textContent.indexOf(words[i-1]) + words[i-1].length);
        range.setStart(target.firstChild, idx);
        range.setEnd(target.firstChild, idx + word.length);
        const rect = range.getBoundingClientRect();
        if (prevTop !== null && Math.abs(rect.top - prevTop) > 2) {
          lines.push(currentLine.join(' '));
          currentLine = [];
        }
        currentLine.push(word);
        prevTop = rect.top;
      }
      if (currentLine.length) lines.push(currentLine.join(' '));
      return { pct: p, width, lines };
    }, pct);
    console.log(JSON.stringify(result));
  }
  await browser.close();
})();
