import Cocoa
import WebKit

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKScriptMessageHandler {
    var window: NSWindow!
    var webView: WKWebView!
    func applicationDidFinishLaunching(_ notification: Notification) {
        let menu = NSMenu()
        let appItem = NSMenuItem()
        menu.addItem(appItem)
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "About Cyber Shift", action: #selector(showAbout), keyEquivalent: "")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Hide Cyber Shift", action: #selector(NSApplication.hide(_:)), keyEquivalent: "h")
        appMenu.addItem(withTitle: "Quit Cyber Shift", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        let editItem = NSMenuItem(title: "Edit", action: nil, keyEquivalent: "")
        let editMenu = NSMenu(title: "Edit")
        editMenu.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        editMenu.addItem(withTitle: "Select All", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        editItem.submenu = editMenu
        menu.addItem(editItem)
        NSApplication.shared.mainMenu = menu
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()
        config.userContentController.add(self, name: "exportReport")
        webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = self
        webView.allowsBackForwardNavigationGestures = false
        window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1320, height: 890), styleMask: [.titled, .closable, .miniaturizable, .resizable], backing: .buffered, defer: false)
        window.title = "Cyber Shift — สำนักงานพิทักษ์ฝัน"
        window.minSize = NSSize(width: 430, height: 640)
        window.contentView = webView
        window.center()
        window.makeKeyAndOrderFront(nil)
        if let root = Bundle.main.resourceURL?.appendingPathComponent("Game"), FileManager.default.fileExists(atPath: root.appendingPathComponent("index.html").path) {
            webView.loadFileURL(root.appendingPathComponent("index.html"), allowingReadAccessTo: root)
        } else {
            let alert = NSAlert()
            alert.messageText = "ไม่พบไฟล์เกม"
            alert.informativeText = "กรุณาแตกไฟล์แอปใหม่จาก Cyber-Shift-Mac.zip"
            alert.runModal()
        }
        NSApp.activate(ignoringOtherApps: true)
    }
    @objc func showAbout() {
        NSApp.orderFrontStandardAboutPanel(options: [.applicationName: "Cyber Shift", .applicationVersion: "0.6", .credits: NSAttributedString(string: "เกมสำนักงานสามมิติ ฝึกหยุดเหตุไซเบอร์\nสถานการณ์จำลอง · บันทึกเฉพาะในเครื่อง")])
    }
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
        if url.isFileURL { decisionHandler(.allow); return }
        if navigationAction.navigationType == .linkActivated, ["https", "http"].contains(url.scheme ?? "") { NSWorkspace.shared.open(url) }
        decisionHandler(.cancel)
    }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "exportReport", let text = message.body as? String else { return }
        let panel = NSSavePanel()
        panel.nameFieldStringValue = "cyber-shift-report.txt"
        panel.beginSheetModal(for: window) { result in
            if result == .OK, let url = panel.url {
                do { try text.write(to: url, atomically: true, encoding: .utf8) }
                catch { let alert = NSAlert(error: error); alert.runModal() }
            }
        }
    }
}
let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
