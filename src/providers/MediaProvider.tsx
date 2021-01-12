import React from 'react';
import createCtx from '../utils/createCtx';
import {useMediaQuery} from 'react-responsive';

interface Context {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

function MediaProvider({children}: Props): React.ReactElement {
  const isDesktop = useMediaQuery({minWidth: 992});
  const isTablet = useMediaQuery({minWidth: 768});
  const isMobile = useMediaQuery({maxWidth: 767});

  return (
    <Provider
      value={{
        isDesktop,
        isTablet,
        isMobile,
      }}>
      {children}
    </Provider>
  );
}

export {useCtx as useMedia, MediaProvider};
