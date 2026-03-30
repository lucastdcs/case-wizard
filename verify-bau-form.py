import os
import time
from playwright.sync_api import sync_playwright

def generate_bau_form_screenshot():
    os.makedirs('docs/media', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        mock_path = 'file://' + os.path.abspath('mock-crm.html')
        page.goto(mock_path)

        with open('dist/bundle-portfolio.js', 'r') as f:
            script_content = f.read()

        # Inject script and bypass onboarding
        page.add_script_tag(content=script_content)
        page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
        page.reload()
        page.add_script_tag(content=script_content)

        print("Waiting for startup...")
        time.sleep(5)

        # Expand pill
        page.locator('.cw-pill').click(force=True)
        time.sleep(1)

        # Open BAU Dashboard
        print("Opening BAU Dashboard...")
        page.locator('#cw-btn-bauform').click(force=True)
        time.sleep(2)

        # Click "Novo Caso BAU"
        print("Clicking Novo Caso BAU...")
        page.locator('#bau-new-case-btn').click(force=True)
        time.sleep(2)

        # Take screenshot of the form
        page.screenshot(path='docs/media/bau-form-step1.png')
        print("Saved docs/media/bau-form-step1.png")

        # Fill some data and go to step 2
        # Mock data might not be present, so inputs might be visible
        # We need to fill required fields if they are visible
        required_inputs = page.locator('.bau-step.active .bau-input[required], .bau-step.active .bau-select[required]')
        count = required_inputs.count()
        for i in range(count):
            inp = required_inputs.nth(i)
            if inp.is_visible():
                if inp.evaluate("el => el.tagName") == "SELECT":
                    inp.select_option(index=1)
                else:
                    inp.fill("Test Data")

        # Try to click next
        print("Clicking Next...")
        page.locator('#bau-step-next-btn').click(force=True)
        time.sleep(2)

        # Take screenshot of Step 2
        page.screenshot(path='docs/media/bau-form-step2.png')
        print("Saved docs/media/bau-form-step2.png")

        # Go to Step 3
        print("Clicking Next to Step 3...")
        # Reason textarea is in step 2
        reason = page.locator('textarea[name="reason"]')
        # Force visibility check
        page.evaluate("el => { el.style.display = 'block'; el.style.visibility = 'visible'; el.style.opacity = '1'; }", reason.element_handle())
        reason.fill("Technical implementation needed for GA4")
        # Check some tasks
        page.locator('.bau-task-item').first.click()
        page.locator('#bau-step-next-btn').click(force=True)
        time.sleep(2)
        page.screenshot(path='docs/media/bau-form-step3.png')
        print("Saved docs/media/bau-form-step3.png")

        browser.close()

if __name__ == "__main__":
    generate_bau_form_screenshot()
