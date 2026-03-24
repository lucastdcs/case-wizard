import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async_playwright_context = await async_playwright().start()
    browser = await async_playwright_context.chromium.launch(headless=True)
    page = await browser.new_page()

    # Load the mock CRM
    current_dir = os.getcwd()
    file_path = f"file://{current_dir}/mock-crm.html"
    await page.goto(file_path)

    # Set localStorage to bypass onboarding BEFORE injecting
    await page.evaluate("localStorage.setItem('cw_onboarding_seen_v1', 'true')")
    # Also clear any emergency saves that might block UI
    await page.evaluate("localStorage.removeItem('cw_notes_emergency_save')")

    # Inject the bundle
    with open("dist/bundle.js", "r") as f:
        bundle_content = f.read()
    await page.evaluate(bundle_content)

    # Wait for splash screen to disappear
    print("Waiting for splash screen to finish...")
    try:
        await page.wait_for_selector('.splash-container', state='detached', timeout=15000)
    except:
        print("Splash screen not found or already gone.")

    # Wait for the floating trigger
    print("Waiting for floating trigger...")
    await page.wait_for_selector('#cw-floating-trigger', timeout=10000)

    # Docking delay
    await page.wait_for_timeout(3500)

    # Open Command Center
    print("Opening Command Center...")
    await page.click('#cw-floating-trigger', force=True)

    # Wait for the BAU Form button
    print("Waiting for BAU Form button...")
    await page.wait_for_selector('#cw-btn-bauform', timeout=5000)
    await page.click('#cw-btn-bauform', force=True)

    # Wait for BAU Form popup
    print("Waiting for BAU Form popup...")
    await page.wait_for_selector('#bau-form-popup', timeout=5000)

    # --- Step 1 Verification ---
    print("Step 1: Verification & Validation")
    await page.wait_for_timeout(1000) # Wait for data pop

    # Test Validation: Clear CID and try to go next
    await page.fill('#bau-cid-input', "")
    await page.click('button.bau-btn-primary:has-text("Próximo")')
    await page.wait_for_selector('.toast-error', timeout=2000)
    print("Confirmed: Validation prevents proceeding without CID.")

    # Restore CID
    await page.fill('#bau-cid-input', "123-456-7890")
    await page.screenshot(path="docs/verification/bau-step1-filled.png")

    # Test Persistence: Close and reopen
    print("Testing Persistence...")
    # Close by clicking the close button on the BAU popup itself
    await page.click('#bau-form-popup .cw-header-close', force=True)
    await page.wait_for_timeout(500)
    # Reopen from Command Center (which should still be open)
    await page.click('#cw-btn-bauform', force=True)

    # Verify we are still on Step 1 with the CID we filled
    val = await page.input_value('#bau-cid-input')
    if val == "123-456-7890":
        print("Confirmed: State persistence working.")
    else:
        print(f"FAILED: State persistence lost. CID is '{val}'")

    await page.click('button.bau-btn-primary:has-text("Próximo")')

    # --- Step 2 Verification ---
    print("Step 2: Tasks")
    await page.wait_for_selector('select[name="reason"]', timeout=5000)
    await page.select_option('select[name="reason"]', value="Nova Implementação")

    # Select tasks - use the labels instead of inputs
    await page.click('label:has(input[value="Setup GTM"])', force=True)
    await page.click('label:has(input[value="GA4 Events"])', force=True)

    await page.screenshot(path="docs/verification/bau-step2-tasks.png")
    await page.click('button.bau-btn-primary:has-text("Próximo")')

    # --- Step 3 Verification ---
    print("Step 3: Justification")
    await page.wait_for_selector('textarea[name="description"]', timeout=5000)
    await page.fill('textarea[name="description"]', "Verification test for Gemini styles and persistence.")

    # Fill availability
    await page.fill('input[name="availability_1"]', "2024-12-25T10:00")

    await page.screenshot(path="docs/verification/bau-step3-details.png")
    await page.click('button.bau-btn-primary:has-text("Próximo")')

    # --- Step 4 Verification ---
    print("Step 4: Confirmation")
    await page.wait_for_selector('#bau-confirmation-details', timeout=5000)
    summary = await page.inner_text('#bau-confirmation-details')
    print("Summary Content Preview:")
    print(summary[:100] + "...")

    await page.screenshot(path="docs/verification/bau-step4-confirm.png")

    await browser.close()
    await async_playwright_context.stop()

if __name__ == "__main__":
    asyncio.run(run())
