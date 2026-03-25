import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        file_path = "file://" + os.path.abspath("mock-crm.html")
        await page.goto(file_path)

        # Inject script
        with open('dist/bundle.js', 'r') as f:
            await page.add_script_tag(content=f.read())

        # Bypass onboarding
        await page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
        await page.reload()
        with open('dist/bundle.js', 'r') as f:
            await page.add_script_tag(content=f.read())

        print("Waiting for UI initialization...")
        await asyncio.sleep(5)

        # Find and click the trigger
        # The trigger might be #cw-floating-trigger or .cw-pill
        trigger = page.locator("#cw-floating-trigger")
        if not await trigger.is_visible():
             trigger = page.locator(".cw-pill")

        await trigger.click()
        await asyncio.sleep(1)

        # Click BAU button
        await page.click("#cw-btn-bau")
        await asyncio.sleep(2)

        # Dashboard is now visible
        await page.screenshot(path="verification/dashboard_check.png")
        print("Dashboard screenshot saved.")

        # Go to Step 1
        await page.click("#bau-new-case-btn")
        await asyncio.sleep(2)

        # Step 1 with highlights
        await page.screenshot(path="verification/step1_check.png")
        print("Step 1 screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
