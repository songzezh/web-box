/** 应用启动入口：先初始化国际化，再以 StrictMode 与 HashRouter 挂载 App；hash 路由不依赖服务端路径回退。 */
import './i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><App /></HashRouter></StrictMode>)
