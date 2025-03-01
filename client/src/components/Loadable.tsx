import { Suspense } from 'react';
import Loader from './Loader';

const Loadable = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `Loadable(${Component.displayName || "Component"})`;
  return WrappedComponent;
};


export default Loadable;