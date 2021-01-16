import React, {ReactElement, ReactNode, useCallback} from 'react';

import {isHoverEnabled} from './HoverableState';

export interface Props {
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  children: ((isHovered: boolean) => ReactNode) | ReactNode;
}

const Hoverable = ({onHoverIn, onHoverOut, children}: Props): ReactElement => {
  const [isHovered, setHovered] = React.useState(false);
  const [showHover, setShowHover] = React.useState(true);

  const handleMouseEnter = useCallback(() => {
    if (isHoverEnabled() && !isHovered) {
      if (onHoverIn) onHoverIn();

      setHovered(true);
    }
  }, [isHovered, onHoverIn]);

  const handleMouseLeave = useCallback(() => {
    if (isHovered) {
      if (onHoverOut) onHoverOut();

      setHovered(false);
    }
  }, [isHovered, onHoverOut]);

  const handleGrant = useCallback(() => {
    setShowHover(false);
  }, []);

  const handleRelease = useCallback(() => {
    setShowHover(true);
  }, []);

  const child =
    typeof children === 'function'
      ? children(showHover && isHovered)
      : children;

  return React.cloneElement(React.Children.only(child), {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    // prevent hover showing while responder
    onResponderGrant: handleGrant,
    onResponderRelease: handleRelease,
    // if child is Touchable
    onPressIn: handleGrant,
    onPressOut: handleRelease,
  });
};

export default Hoverable;
