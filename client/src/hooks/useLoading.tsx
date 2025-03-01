import { Spin } from 'antd';
import { ReactNode } from 'react';

interface UseLoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

const useLoading = ({ isLoading, children }: UseLoadingProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        children
      )}
    </div>
  );
};

export default useLoading;