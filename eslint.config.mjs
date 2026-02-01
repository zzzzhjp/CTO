import { defineConfig } from 'eslint/config'

// 关闭所有 ESLint 检查
export default defineConfig({
  ignores: ['**/*'],
  linterOptions: {
    reportUnusedDisableDirectives: false
  },
  rules: {}
})
