"""Localhost Web Server for viewing UI reports, screenshots, and execution dashboard."""

import http.server
import socketserver
import sys
import webbrowser
from pathlib import Path

PORT = 8000
PROJECT_ROOT = Path(__file__).resolve().parent


class CustomHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler routing root / to dashboard/index.html."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def do_GET(self) -> None:
        if self.path in ("/", "/dashboard", "/dashboard/"):
            self.path = "/dashboard/index.html"
        return super().do_GET()


def start_server() -> None:
    """Launch local HTTP server and open browser."""
    handler = CustomHandler
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=======================================================")
            print("  ⚡ Framework Web Dashboard is LIVE on Localhost!")
            print(f"  👉 URL: {url}")
            print(f"  👉 Direct HTML Report: {url}/reports/report.html")
            print("=======================================================")
            print("  Press Ctrl+C in terminal to stop the server.\n")

            webbrowser.open(url)
            httpd.serve_forever()
    except OSError as e:
        if "address already in use" in str(e).lower() or e.errno == 10048:
            alt_port = 8080
            print(f"[NOTE] Port {PORT} is busy, switching to {alt_port}...")
            with socketserver.TCPServer(("", alt_port), handler) as httpd:
                url = f"http://localhost:{alt_port}"
                print(f"  👉 URL: {url}")
                webbrowser.open(url)
                httpd.serve_forever()
        else:
            raise
    except KeyboardInterrupt:
        print("\n[INFO] Dashboard server stopped.")
        sys.exit(0)


if __name__ == "__main__":
    start_server()
