// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('preload script loaded');
const { ipcRenderer } = require('electron');

const { contextBridge } = require('electron');


contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ipcRenderer: () => ipcRenderer,
    // we can also expose variables, not just functions
})

let cache = {

}

contextBridge.exposeInMainWorld('electronContext', {
    call: async (opt: any) => {
        console.log('electronContext start', opt)
        let res = await ipcRenderer.invoke('electronContext', JSON.parse(JSON.stringify(opt)))
        console.log('electronContext end', opt,res)
        return res
    }
})