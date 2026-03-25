import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Use a large viewport to see everything
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Load the mock CRM
        file_path = "file://" + os.path.abspath("mock-crm.html")
        await page.goto(file_path)

        # Click the floating trigger to open BAU Form
        await page.click("#cw-floating-trigger")

        # We should be at the dashboard by default
        # Wait for the dashboard to render
        await page.wait_for_selector(".bau-case-card")

        # Take a screenshot of the dashboard
        await page.screenshot(path="verification/bau_dashboard_caseid.png")

        # Also check Step 1 again just to be sure about the aura/gradients
        await page.click(".bau-btn-add")
        await page.wait_for_selector("#bau-vital-highlights")
        await page.screenshot(path="verification/bau_step1_gemini_final.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
