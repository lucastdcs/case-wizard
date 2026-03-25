import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        file_path = "file://" + os.path.abspath("mock-crm.html")
        await page.goto(file_path)

        with open('dist/bundle.js', 'r') as f:
            content = f.read()
        await page.add_script_tag(content=content)

        # Bypass onboarding
        await page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
        await page.reload()
        await page.add_script_tag(content=content)

        print("Waiting for UI...")
        await asyncio.sleep(10)

        # Click the trigger
        await page.click("#cw-floating-trigger")
        await asyncio.sleep(1)

        # Check if BAU button is visible, if not click pill
        bau_btn = page.locator("#cw-btn-bau")
        if not await bau_btn.is_visible():
            print("Pill might be active, clicking it...")
            await page.click(".cw-pill")
            await asyncio.sleep(1)

        await bau_btn.click()
        await asyncio.sleep(2)

        # Click Add Case
        await page.click(".bau-btn-add")
        await asyncio.sleep(2)

        await page.screenshot(path="verification/gemini_aura_check.png")
        print("Screenshot saved to verification/gemini_aura_check.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
