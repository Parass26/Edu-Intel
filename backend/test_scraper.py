import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://www.harvard.edu/")
        title = await page.title()
        print("Page Title:", title)
        await browser.close()

asyncio.run(main())
