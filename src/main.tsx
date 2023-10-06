import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { ConfigProvider } from 'antd'
import { api } from './api/api.ts'
import App from './App.tsx'
import "./theme/index.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif',
            colorLink: '#05629A',
            colorPrimary: '#303030',
            colorSuccess: '#00d690',
            colorWarning: '#ffaa00',
            colorError: '#f84c4c',
            colorTextBase: '#323b40',
            colorBgBase: '#fbfbfb'
          }
        }}
      >
        <App />
      </ConfigProvider>
    </ApiProvider>
  </React.StrictMode>,
)
