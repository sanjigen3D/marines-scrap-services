// npm install playwright-core @sparticuz/chromium
const { chromium } = require('playwright-core');
const chromiumBinary = require('@sparticuz/chromium');
module.exports = async (req, res) => {
    try {
        // get correct Chromium path from @sparticuz/chromium
        const executablePath = await chromiumBinary.executablePath;

        // launch browser with external Chromium
        const browser = await chromium.launch({
            args: chromiumBinary.args,
            executablePath: executablePath,
            headless: true,
        });

        // create a new page instance
        const context = await browser.newContext();
        const page = await context.newPage();

        // navigate to the target site
        await page.goto('https://www.scrapingcourse.com/ecommerce/');

        // get the target site HTML content
        const htmlContent = await page.content();

        // close the browser instance
        await browser.close();

        //get the HTML as JSON response
        res.status(200).json({ htmlContent });
    } catch (error) {
        console.error('Browser Launch Error:', error);
        res.status(500).json({ error: 'Failed to scrape page' });
    }
};

