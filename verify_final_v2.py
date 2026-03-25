import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        file_path = "file://" + os.path.abspath("mock-crm.html")
        await page.goto(file_path)

        with open('dist/bundle.js', 'r') as f:
            await page.add_script_tag(content=f.read())

        await page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
        await page.reload()
        with open('dist/bundle.js', 'r') as f:
            await page.add_script_tag(content=f.read())

        print("Waiting 15s for animations...")
        await asyncio.sleep(15)

        # Click the floating trigger (it's the blue circle on the right)
        # In the screenshot it has id="cw-floating-trigger"
        await page.click("#cw-floating-trigger")
        await asyncio.sleep(2)

        # Click BAU button
        await page.click("#cw-btn-bau")
        await asyncio.sleep(2)

        # Click Add Case to go to Step 1
        await page.click(".bau-btn-add")
        await asyncio.sleep(3)

        await page.screenshot(path="verification/gemini_final_check.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
