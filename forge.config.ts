import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import * as fs from 'fs/promises';
import * as path from 'path';
// 递归复制目录
async function copyDir(src: string, dest: string) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath); // 递归复制子目录
      } else {
        await fs.copyFile(srcPath, destPath); // 复制文件
        console.log(`Copied file: ${srcPath} -> ${destPath}`);
      }
    }
  } catch (error) {
    console.error(`Error copying files: ${error.message}`);
    throw error;
  }
}
async function copyModuleDir(src: string, options: any) {
      // 源目录（需要复制的目录）
      const sourceDir = path.resolve(__dirname, 'node_modules', src);
      // 目标目录（复制到打包后的目录）
      const targetDir = path.join(options.outputPaths[0], 'resources', 'node_modules', src);
      copyDir(sourceDir, targetDir);
      console.log(`Successfully copied ${sourceDir} to ${targetDir}`);

}

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    postPackage: async (forgeConfig, options) => {
      console.log(`postPackage app on platform: ${process.platform}`);

      // // 源目录（需要复制的目录）
      // const sourceDir = path.resolve(__dirname, 'node_modules/sqlite3');
      // // 目标目录（复制到打包后的目录）
      // const targetDir = path.join(options.outputPaths[0], 'resources', 'node_modules', 'sqlite3');

      // 检查源目录是否存在
      // try {
      //   await fs.access(sourceDir, fs.constants.F_OK);
      // } catch (error) {
      //   console.error(`Source directory ${sourceDir} does not exist.`);
      //   return;
      // }
      
      try {
        await copyModuleDir('sqlite3', options);
        await copyModuleDir('moment', options);
        console.log(`Successfully copied`);
      } catch (error) {
        console.error(`Error copying files: ${error.message}`);
      }
    },
  },
};

export default config;
