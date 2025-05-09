import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

function pathResolve(dir) {
    return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: /@\//,
                replacement: pathResolve('src/renderer') + '/',
            }
        ],
    },
    define: {
        'process.env': {
            login_title: 'login'
        }
    },
});
