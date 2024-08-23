import { createContext, useContext, useState } from 'react';

export const HasLoadedContext = createContext<{
  setHasLoaded: (value: boolean) => void;
  hasLoaded: boolean;
}>({ setHasLoaded: () => null, hasLoaded: false });

export const HasLoadedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <HasLoadedContext.Provider value={{ hasLoaded, setHasLoaded }}>
      {children}
    </HasLoadedContext.Provider>
  );
};

export const useHasLoaded = () => {
  const { hasLoaded, setHasLoaded } = useContext(HasLoadedContext);

  return { hasLoaded, setHasLoaded };
};
