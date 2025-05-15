import nProgress from "nprogress"

let electronContext = window.electronContext

export async function electronContextRequest(opt: ElectronContextCallOptions): pr {
    nProgress.start()
    await electronContext.call('electronContextRequest')
    nProgress.done()
}