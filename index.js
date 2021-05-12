const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600
    });

    window.loadFile('src/window/index.html');
}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {
        // Only run before the window opens
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on("window-all-closed", () => {
        app.quit();
    });

});