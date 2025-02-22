
import { ConfigProvider, App as AntApp } from 'antd';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeRoutes } from './routes';


function App() {

  const router = createBrowserRouter(ThemeRoutes);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter"
        },
        components: {
        },
        hashed: false,
      }}
    >
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
    </ConfigProvider>
  )
}

export default App
