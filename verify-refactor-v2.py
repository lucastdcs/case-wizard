import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async_playwright_context = await async_playwright().start()
    browser = await async_playwright_context.chromium.launch(headless=True)
    page = await browser.new_page()

    current_dir = os.getcwd()
    file_path = f"file://{current_dir}/mock-crm.html"
    await page.goto(file_path)

    await page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
    await page.evaluate("localStorage.removeItem('cw_notes_emergency_save')")

    with open("dist/bundle.js", "r") as f:
        bundle_content = f.read()
    await page.evaluate(bundle_content)

    await page.wait_for_selector('#cw-floating-trigger', timeout=10000)
    await page.wait_for_timeout(1000)
    await page.click('#cw-floating-trigger', force=True)
    await page.wait_for_selector('#cw-btn-bauform', timeout=5000)
    await page.click('#cw-btn-bauform', force=True)
    await page.wait_for_selector('#bau-form-popup', timeout=5000)

    # Click "Novo Caso BAU"
    await page.click('#bau-new-case-btn')
    await page.wait_for_timeout(1000)

    print("Checking Smart Rendering...")

    # Check if wrappers are hidden/visible
    # Mock CRM has: advName="Acme Corp", cid="123-456-7890", amName="John Doe (AM)", seId is missing

    adv_visible = await page.is_visible('#wrapper-advName')
    cid_visible = await page.is_visible('#wrapper-cid')
    am_visible = await page.is_visible('#wrapper-amName')
    se_visible = await page.is_visible('#wrapper-seId')

    print(f"advName wrapper visible: {adv_visible} (Expected: False)")
    print(f"cid wrapper visible: {cid_visible} (Expected: False)")
    print(f"amName wrapper visible: {am_visible} (Expected: False)")
    print(f"seId wrapper visible: {se_visible} (Expected: True)")

    # Check badges
    badges = await page.query_selector_all('.bau-context-badge')
    print(f"Number of badges found: {len(badges)}")
    for b in badges:
        text = await b.inner_text()
        print(f"Badge: {text.replace('\n', ' ')}")

    # Navigate to Step 4 to check Submit button
    # We need to fill required hidden fields if we want to proceed?
    # Actually, they ARE filled, just hidden.

    # But wait, Step 2 needs 'reason' and 'taskType'
    await page.click('button.bau-btn-primary:has-text("Próximo")')
    await page.wait_for_selector('textarea[name="reason"]')
    await page.fill('textarea[name="reason"]', "Test Reason")
    await page.click('label.bau-task-item:has-text("Consent Mode")')

    await page.click('button.bau-btn-primary:has-text("Próximo")')

    # Step 3
    await page.wait_for_selector('select[name="nonImplementationReason"]')
    await page.select_option('select[name="nonImplementationReason"]', index=1)
    await page.fill('textarea[name="description"]', "Test Description")
    await page.fill('input[name="availability_1"]', "2024-12-30T10:00")

    await page.click('button.bau-btn-primary:has-text("Próximo")')

    # Step 4
    await page.wait_for_selector('.bau-btn-submit')
    print("Checking Submit Button Styles...")

    styles = await page.evaluate('''() => {
        const btn = document.querySelector('.bau-btn-submit');
        const style = window.getComputedStyle(btn);
        return {
            width: style.width,
            backgroundColor: style.backgroundColor,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            borderRadius: style.borderRadius,
            display: style.display,
            marginTop: style.marginTop
        };
    }''')

    print(f"Submit Button Styles: {styles}")

    await page.screenshot(path="docs/verification/bau-refactor-test.png")

    await browser.close()
    await async_playwright_context.stop()

if __name__ == "__main__":
    asyncio.run(run())
