import asyncio
from playwright.async_api import async_playwright
import os

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

        # Reload to apply
        await page.reload()
        await page.add_script_tag(content=script_content)

        # Wait for initialization
        await asyncio.sleep(3)

        # Click the floating trigger (it might be a pill now)
        trigger = page.locator("#cw-floating-trigger")
        if await trigger.is_visible():
            await trigger.click()
        else:
            pill = page.locator(".cw-pill")
            if await pill.is_visible():
                await pill.click()

        await asyncio.sleep(1)

        # Click the Configs button
        configs_btn = page.locator("#cw-btn-configs")
        await configs_btn.click()

        # Wait for Configs popup and Profile section
        await page.wait_for_selector("#cw-user-profile-section")

        # Take a screenshot of the profile section (loading state might be gone, but we want to see the result)
        await asyncio.sleep(2)
        await page.screenshot(path="verification/configs_profile.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
