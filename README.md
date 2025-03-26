# stock-manager

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## 遇到的问题

### express 跨域

问题：通过axios请求时，出现http请求状态是已屏蔽：csp；
解决方案：Electron 中 CSP (内容安全策略) 导致请求被屏蔽的完整方案，默认端口为3001，
