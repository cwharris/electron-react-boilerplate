"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require("es6-shim");
var electron_1 = require("electron");
var menu;
var template;
var mainWindow = null;
if (process.env.NODE_ENV === 'production') {
    var sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}
if (process.env.NODE_ENV === 'development') {
    require('electron-debug')();
    var path = require('path');
    var p = path.join(__dirname, '..', 'app', 'node_modules');
    require('module').globalPaths.push(p);
}
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
var installExtensions = function () { return __awaiter(_this, void 0, void 0, function () {
    var installer_1, extensions, forceDownload_1;
    return __generator(this, function (_a) {
        if (process.env.NODE_ENV === 'development') {
            installer_1 = require('electron-devtools-installer');
            extensions = [
                'REACT_DEVELOPER_TOOLS',
                'REDUX_DEVTOOLS'
            ];
            forceDownload_1 = !!process.env.UPGRADE_EXTENSIONS;
            // TODO: Use async interation statement.
            //       Waiting on https://github.com/tc39/proposal-async-iteration
            //       Promises will fail silently, which isn't what we want in development
            return [2 /*return*/, Promise
                    .all(extensions.map(function (name) { return installer_1["default"](installer_1[name], forceDownload_1); }))["catch"](console.log)];
        }
        return [2 /*return*/];
    });
}); };
electron_1.app.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
    var x;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, installExtensions()];
            case 1:
                _a.sent();
                mainWindow = new electron_1.BrowserWindow({
                    show: false,
                    width: 1024,
                    height: 728
                });
                mainWindow.loadURL("file://" + __dirname + "/app.html");
                mainWindow.webContents.on('did-finish-load', function () {
                    mainWindow.show();
                    mainWindow.focus();
                });
                mainWindow.on('closed', function () {
                    mainWindow = null;
                });
                if (process.env.NODE_ENV === 'development') {
                    mainWindow.webContents.openDevTools();
                    mainWindow.webContents.on('context-menu', function (e, props) {
                        var x = props.x, y = props.y;
                        electron_1.Menu.buildFromTemplate([{
                                label: 'Inspect element',
                                click: function () {
                                    mainWindow.webContents.inspectElement(x, y);
                                }
                            }]).popup(mainWindow);
                    });
                }
                x = {
                    label: 'Electron',
                    submenu: [{
                            label: 'About ElectronReact',
                            role: 'about'
                        }]
                };
                if (process.platform === 'darwin') {
                    template = [{
                            label: 'Electron',
                            submenu: [{
                                    label: 'About ElectronReact',
                                    role: 'about'
                                }, {
                                    type: 'separator'
                                }, {
                                    label: 'Services',
                                    submenu: []
                                }, {
                                    type: 'separator'
                                }, {
                                    label: 'Hide ElectronReact',
                                    accelerator: 'Command+H',
                                    role: 'hide'
                                }, {
                                    label: 'Hide Others',
                                    accelerator: 'Command+Shift+H',
                                    role: 'hideothers'
                                }, {
                                    label: 'Show All',
                                    role: 'unhide'
                                }, {
                                    type: 'separator'
                                }, {
                                    label: 'Quit',
                                    accelerator: 'Command+Q',
                                    click: function () {
                                        electron_1.app.quit();
                                    }
                                }]
                        },
                        {
                            label: 'Edit',
                            submenu: [{
                                    label: 'Undo',
                                    accelerator: 'Command+Z',
                                    role: 'undo'
                                }, {
                                    label: 'Redo',
                                    accelerator: 'Shift+Command+Z',
                                    role: 'redo'
                                }, {
                                    type: 'separator'
                                }, {
                                    label: 'Cut',
                                    accelerator: 'Command+X',
                                    role: 'cut'
                                }, {
                                    label: 'Copy',
                                    accelerator: 'Command+C',
                                    role: 'copy'
                                }, {
                                    label: 'Paste',
                                    accelerator: 'Command+V',
                                    role: 'paste'
                                }, {
                                    label: 'Select All',
                                    accelerator: 'Command+A',
                                    role: 'selectall'
                                }]
                        }, {
                            label: 'View',
                            submenu: (process.env.NODE_ENV === 'development') ? [{
                                    label: 'Reload',
                                    accelerator: 'Command+R',
                                    click: function () {
                                        mainWindow.webContents.reload();
                                    }
                                }, {
                                    label: 'Toggle Full Screen',
                                    accelerator: 'Ctrl+Command+F',
                                    click: function () {
                                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                    }
                                }, {
                                    label: 'Toggle Developer Tools',
                                    accelerator: 'Alt+Command+I',
                                    click: function () {
                                        mainWindow.webContents.toggleDevTools();
                                    }
                                }] : [{
                                    label: 'Toggle Full Screen',
                                    accelerator: 'Ctrl+Command+F',
                                    click: function () {
                                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                    }
                                }]
                        }, {
                            label: 'Window',
                            submenu: [{
                                    label: 'Minimize',
                                    accelerator: 'Command+M',
                                    role: 'minimize'
                                }, {
                                    label: 'Close',
                                    accelerator: 'Command+W',
                                    role: 'close'
                                }, {
                                    type: 'separator'
                                }, {
                                    label: 'Bring All to Front',
                                    role: 'front'
                                }]
                        }, {
                            label: 'Help',
                            submenu: [{
                                    label: 'Learn More',
                                    click: function () {
                                        electron_1.shell.openExternal('http://electron.atom.io');
                                    }
                                }, {
                                    label: 'Documentation',
                                    click: function () {
                                        electron_1.shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                                    }
                                }, {
                                    label: 'Community Discussions',
                                    click: function () {
                                        electron_1.shell.openExternal('https://discuss.atom.io/c/electron');
                                    }
                                }, {
                                    label: 'Search Issues',
                                    click: function () {
                                        electron_1.shell.openExternal('https://github.com/atom/electron/issues');
                                    }
                                }]
                        }];
                    menu = electron_1.Menu.buildFromTemplate(template);
                    electron_1.Menu.setApplicationMenu(menu);
                }
                else {
                    template = [{
                            label: '&File',
                            submenu: [{
                                    label: '&Open',
                                    accelerator: 'Ctrl+O'
                                }, {
                                    label: '&Close',
                                    accelerator: 'Ctrl+W',
                                    click: function () {
                                        mainWindow.close();
                                    }
                                }]
                        }, {
                            label: '&View',
                            submenu: (process.env.NODE_ENV === 'development') ? [{
                                    label: '&Reload',
                                    accelerator: 'Ctrl+R',
                                    click: function () {
                                        mainWindow.webContents.reload();
                                    }
                                }, {
                                    label: 'Toggle &Full Screen',
                                    accelerator: 'F11',
                                    click: function () {
                                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                    }
                                }, {
                                    label: 'Toggle &Developer Tools',
                                    accelerator: 'Alt+Ctrl+I',
                                    click: function () {
                                        mainWindow.webContents.toggleDevTools();
                                    }
                                }] : [{
                                    label: 'Toggle &Full Screen',
                                    accelerator: 'F11',
                                    click: function () {
                                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                    }
                                }]
                        }, {
                            label: 'Help',
                            submenu: [{
                                    label: 'Learn More',
                                    click: function () {
                                        electron_1.shell.openExternal('http://electron.atom.io');
                                    }
                                }, {
                                    label: 'Documentation',
                                    click: function () {
                                        electron_1.shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                                    }
                                }, {
                                    label: 'Community Discussions',
                                    click: function () {
                                        electron_1.shell.openExternal('https://discuss.atom.io/c/electron');
                                    }
                                }, {
                                    label: 'Search Issues',
                                    click: function () {
                                        electron_1.shell.openExternal('https://github.com/atom/electron/issues');
                                    }
                                }]
                        }];
                    menu = electron_1.Menu.buildFromTemplate(template);
                    mainWindow.setMenu(menu);
                }
                return [2 /*return*/];
        }
    });
}); });
