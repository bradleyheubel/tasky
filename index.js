const electron = require('electron')
const path = require('path')
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')

const { app, ipcMain } = electron

let mainWindow
let tray

app.on('ready', () => {
    mainWindowConfig = {
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false,
        webPreferences: { backgroundThrottling: false }
    }
    mainWindow = new MainWindow(mainWindowConfig, `file://${__dirname}/src/index.html`)

    process.platform === 'darwin' ? app.dock.hide() : mainWindow.setSkipTaskbar(true)
    
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
    tray = new TimerTray(iconPath, mainWindow)
})

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft)
})