import os
import time
from playwright.sync_api import sync_playwright

def generate_portfolio():
    # Setup directories
    os.makedirs('docs/media/videos', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Record video
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800},
            record_video_dir='docs/media/videos/'
        )
        page = context.new_page()

        # Load the mock CRM
        mock_path = 'file://' + os.path.abspath('mock-crm.html')
        page.goto(mock_path)

        # Inject the bundled script
        with open('dist/bundle-portfolio.js', 'r') as f:
            script_content = f.read()
        page.add_script_tag(content=script_content)

        # Set localStorage to skip onboarding
        page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")

        # Reload to apply localStorage
        page.reload()
        page.add_script_tag(content=script_content)

        # Wait for the startup animation
        print("Waiting for startup...")
        time.sleep(12)

        # Handle emergency recovery dialog if it exists
        cancel_btn = page.locator('#cw-conf-cancel')
        if cancel_btn.is_visible():
            print("Dismissing restore dialog...")
            cancel_btn.click(force=True)
            time.sleep(2)

        # The pill is initially collapsed. Click it to expand.
        pill = page.locator('.cw-pill')
        pill.click(force=True)
        time.sleep(2)

        # 1. Capture Command Center (Initial state)
        page.screenshot(path='docs/media/command-center.png')

        # 2. Open Case Notes
        print("Opening Case Notes...")
        notes_btn = page.locator('#cw-btn-notes')
        notes_btn.click(force=True)
        time.sleep(2)

        # Select Status
        page.select_option('#main-status-select', value='SO')
        time.sleep(2)

        # Select Substatus
        page.select_option('#sub-status-select', value='SO_Implementation_Only')
        time.sleep(2)

        page.screenshot(path='docs/media/case-notes-filled.png')

        # 3. Open Email Assistant
        print("Opening Email Assistant...")
        notes_btn.click(force=True) # Close notes
        time.sleep(1)
        email_btn = page.locator('#cw-btn-email')
        email_btn.click(force=True)
        time.sleep(2)
        page.screenshot(path='docs/media/email-assistant.png')

        # 4. Show Call Script
        print("Opening Call Script...")
        email_btn.click(force=True) # Close email
        time.sleep(1)
        script_btn = page.locator('#cw-btn-script')
        script_btn.click(force=True)
        time.sleep(2)
        page.screenshot(path='docs/media/call-script.png')

        # 5. Show Timezones
        print("Opening Timezones...")
        script_btn.click(force=True)
        time.sleep(1)
        timezone_btn = page.locator('#cw-btn-timezone')
        timezone_btn.click(force=True)
        time.sleep(2)
        page.screenshot(path='docs/media/timezone-assistant.png')

        context.close()

        # Rename the recorded video to techsol-demo.webm
        video_path = page.video.path()
        if os.path.exists(video_path):
            os.rename(video_path, 'docs/media/techsol-demo.webm')
            print(f"Video renamed to docs/media/techsol-demo.webm")

        browser.close()

if __name__ == "__main__":
    generate_portfolio()
    print("Portfolio media generated.")
