import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import tempfile

def login_with_cookies(json_path):
    # Load cookies from JSON
    with open(json_path, "r") as f:
        data = json.load(f)
    cookies = data.get("cookies", {})

    # Use a temporary user data directory
    chrome_options = Options()
    temp_dir = tempfile.mkdtemp()
    chrome_options.add_argument(f"--user-data-dir={temp_dir}")

    # Start Chrome browser
    driver = webdriver.Chrome(options=chrome_options)

    # Go to Instagram to set domain
    driver.get("https://www.instagram.com/")
    time.sleep(3)  # Wait for page to load

    # Add cookies
    for k, v in cookies.items():
        cookie_dict = {
            "name": k,
            "value": v,
            "domain": ".instagram.com",
            "path": "/"
        }
        try:
            driver.add_cookie(cookie_dict)
        except Exception as e:
            print(f"Could not add cookie {k}: {e}")

    # Refresh to apply cookies and be logged in
    driver.refresh()
    time.sleep(5)  # Wait to see the logged-in state

    # Now you are logged in!
    input("Press Enter to close browser...")
    driver.quit()

if __name__ == "__main__":
    login_with_cookies(r"d:\Works\Instaflares-next\instaflares\ig-login-sessions\wetdreamsxo.json")