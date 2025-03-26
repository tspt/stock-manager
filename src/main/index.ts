import { app, shell, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ExpressServer } from './express/server'

let expressServer: ExpressServer

// 在创建窗口前添加
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
app.commandLine.appendSwitch('disable-site-isolation-trials')

async function createExpressServer() {
  expressServer = new ExpressServer()

  try {
    const port = await expressServer.start()

    // 将端口号暴露给渲染进程
    ipcMain.handle('get-server-port', () => port)

    return true
  } catch (error) {
    console.error('Failed to start Express server:', error)
    app.quit()
    return false
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // 关键安全配置
      webSecurity: false, // 禁用同源策略（仅限开发环境）
      allowRunningInsecureContent: true // 允许加载混合内容
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 创建右键菜单模板
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '刷新',
      role: 'reload' // 直接复用系统刷新行为
    },
    {
      label: '打开控制台',
      click: () => {
        mainWindow.webContents.openDevTools() // 打开开发者工具
      }
    }
  ])

  // 监听右键事件
  mainWindow.webContents.on('context-menu', (e, params) => {
    contextMenu.popup({ window: mainWindow, x: params.x, y: params.y })
  })

  // 初始化托盘（图标路径需正确）
  let tray = new Tray(icon)

  // 右键菜单
  const trayMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow.show() },
    { label: '退出', click: () => app.quit() }
  ])

  // 设置提示和菜单
  tray.setToolTip('stockManager')
  tray.setContextMenu(trayMenu)

  // 左键点击切换窗口
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  const serverStarted = await createExpressServer() // 启动 Express 服务
  if (!serverStarted) return

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await expressServer.close()
    app.quit()
  }
})

app.on('before-quit', async () => {
  await expressServer.close()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
