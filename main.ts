// main.ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional: Preload script if needed
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // In development mode, point to the localhost server running Next.js
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:3000');
    } else {
        // In production mode, load the index.html from the Next.js build
        win.loadFile(path.join(__dirname, 'out/index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
