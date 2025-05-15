
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isDev = process.env.IS_DEV === "true";

function createWindow() {
  // Criar a janela do navegador
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, '../public/favicon.ico')
  });

  // Definir o URL que será carregado no BrowserWindow
  const startUrl = isDev 
    ? 'http://localhost:8080' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Abrir o DevTools no modo de desenvolvimento
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Configurar o menu da aplicação
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        { label: 'Sair', click: () => app.quit() }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Quando o Electron terminar de inicializar, crie a janela
app.whenReady().then(createWindow);

// Saia quando todas as janelas estiverem fechadas, exceto no macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // No macOS, é comum recriar uma janela quando o ícone do dock é clicado
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
