import asyncio
from playwright.async_api import async_playwright
from mongodb import mongo_db


async def scrape_universities():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # 🔥 REPLACE THIS WITH REAL WEBSITE URL
        await page.goto("https://www.kcoverseas.com/", timeout=60000)

        await page.wait_for_load_state("networkidle")

        # Example selector (you MUST inspect website and update this)
        university_cards = await page.query_selector_all("div.card")

        scraped_data = []

        for card in university_cards:
            name = await card.query_selector("h3")
            country = await card.query_selector(".country")
            program = await card.query_selector(".program")

            university = {
                "name": await name.inner_text() if name else None,
                "country": await country.inner_text() if country else None,
                "program": await program.inner_text() if program else None,
            }

            scraped_data.append(university)

        if scraped_data:
            await mongo_db.universities.insert_many(scraped_data)

        await browser.close()

    return {"scraped_count": len(scraped_data)}
