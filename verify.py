from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open learning page which uses LearningLayout
        page.goto('http://localhost:3000/learning/api-design/01-rest-principles')
        page.wait_for_load_state("networkidle")

        # Verify MobileTOC exists and the TOC renders properly
        page.screenshot(path='/home/jules/verification/screenshots/learning_toc.png', full_page=True)

        browser.close()

verify()
