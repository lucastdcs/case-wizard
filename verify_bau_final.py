import asyncio
from playwright.async_api import async_playwright
import os
import time

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Load the mock CRM
        file_path = "file://" + os.path.abspath("mock-crm.html")
        await page.goto(file_path)

        # Inject the bundled script
        with open('dist/bundle.js', 'r') as f:
            script_content = f.read()
        await page.add_script_tag(content=script_content)

        # Set localStorage to skip onboarding
        await page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
        await page.evaluate("localStorage.removeItem('cw_notes_emergency_save')")

        # Reload to apply
        await page.reload()
        await page.add_script_tag(content=script_content)

        # Wait for initialization
        print("Waiting for initialization...")
        await asyncio.sleep(5)

        # Click the floating trigger (it might be a pill now)
        # Try to find the trigger. In the previous screenshot it was on the right.
        trigger = page.locator("#cw-floating-trigger")
        if await trigger.is_visible():
            await trigger.click()
        else:
            # Maybe it's the pill
            pill = page.locator(".cw-pill")
            if await pill.is_visible():
                await pill.click()
                await asyncio.sleep(1)

            # Now click the BAU button
            bau_btn = page.locator("#cw-btn-bau")
            await bau_btn.click()

        print("Waiting for BAU Dashboard...")
        await page.wait_for_selector(".bau-case-card")
        await page.screenshot(path="verification/final_dashboard.png")

        # Go to Step 1
        print("Opening Step 1...")
        await page.click(".bau-btn-add")
        await page.wait_for_selector("#bau-vital-highlights")
        await asyncio.sleep(1) # Wait for animations
        await page.screenshot(path="verification/final_step1.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
