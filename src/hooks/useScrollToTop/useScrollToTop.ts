import { useLocation } from 'react-router';
import React from 'react';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
