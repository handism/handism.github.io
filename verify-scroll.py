from playwright.sync_api import sync_playwright
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos/",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()

        # Open learning page
        page.goto('http://localhost:3000/learning/api-design/01-rest-principles')
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Scroll down gradually to trigger TOC updates
        for i in range(5):
            page.mouse.wheel(0, 400)
            time.sleep(0.5)

        page.screenshot(path='/home/jules/verification/screenshots/learning_toc_scrolled.png')

        context.close()
        browser.close()

verify()
