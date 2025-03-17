import { ConfigProvider, App as AntApp, TableProps } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeRoutes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./index.css";

import "./i18n"

const queryClient = new QueryClient();


function App() {
  const router = createBrowserRouter(ThemeRoutes);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          borderRadius: 4,
          controlHeight: 37,
        },

      }}
    >
      <QueryClientProvider client={queryClient}>
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
