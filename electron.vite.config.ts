import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import path from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@pages': resolve('src/renderer/src/pages'),
        '@components': resolve('src/renderer/src/components')
      }
    },
    plugins: [
      react()
      // createSvgIconsPlugin({
      //   iconDirs: [path.resolve(__dirname, 'src/renderer/src/assets/icons')],
      //   symbolId: 'icon-[name]' // 必须与组件中的id规则一致
      // })
    ]
  }
})
