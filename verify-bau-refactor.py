import os
import time
from playwright.sync_api import sync_playwright

def verify_bau_refactor():
    os.makedirs('docs/verification', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        mock_path = 'file://' + os.path.abspath('mock-crm.html')
        page.goto(mock_path)

        # Build bundle-portfolio.js first if needed, but we already have bundle.js
        with open('dist/bundle.js', 'r') as f:
            script_content = f.read()
        page.add_script_tag(content=script_content)

        page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
        page.evaluate("localStorage.removeItem('cw_notes_emergency_save')")
        page.reload()
        page.add_script_tag(content=script_content)

        print("Waiting for startup...")
        time.sleep(12)

        pill = page.locator('.cw-pill')
        pill.click(force=True)
        time.sleep(2)

        print("Opening BAU Form...")
        bau_btn = page.locator('#cw-btn-bauform')
        bau_btn.click(force=True)
        time.sleep(3)

        # Step 1: Inline Editing
        page.screenshot(path='docs/verification/bau-refactor-step1.png')
        print("Captured Step 1: Context Card with Inline Editing")

        # Step 2: Multi-select Tasks
        next_btn = page.locator('.bau-btn-primary:has-text("Próximo")')
        next_btn.click(force=True)
        time.sleep(1)
        # Select multiple tasks
        page.locator('.bau-task-item:has-text("Setup GTM")').click(force=True)
        page.locator('.bau-task-item:has-text("Google Ads Conversion")').click(force=True)
        page.screenshot(path='docs/verification/bau-refactor-step2.png')
        print("Captured Step 2: Multi-select Tasks")

        # Step 3: Description & Availability
        next_btn = page.locator('.bau-btn-primary:has-text("Próximo")')
        next_btn.click(force=True)
        time.sleep(2)
        # Fill description
        page.evaluate("document.querySelector('textarea[name=\"description\"]').value = 'Test description for BAU escalation.'")
        page.evaluate("document.querySelector('textarea[name=\"description\"]').dispatchEvent(new Event('input', { bubbles: true }))")
        page.screenshot(path='docs/verification/bau-refactor-step3.png')
        print("Captured Step 3: Description & Availability")

        # Step 4: Confirmation
        next_btn.click(force=True)
        time.sleep(2)
        page.screenshot(path='docs/verification/bau-refactor-step4.png')
        print("Captured Step 4: Confirmation Screen")

        browser.close()

if __name__ == "__main__":
    verify_bau_refactor()
    print("BAU Form refactor verification complete.")
