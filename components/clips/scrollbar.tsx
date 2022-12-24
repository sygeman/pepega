import React, { useCallback } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

// @ts-ignore
export const ScrollerBase = ({ children, className, style, ...props }, ref) => {
  const refSetter = useCallback(
    // @ts-ignore
    (scrollbarsRef) => {
      if (scrollbarsRef) {
        ref.current = scrollbarsRef.osInstance().getElements().viewport;
      }
    },
    [ref]
  );

  return (
    <OverlayScrollbarsComponent
      ref={refSetter}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export const Scroller = React.forwardRef(ScrollerBase);
