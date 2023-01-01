import React, { useEffect } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

// @ts-ignore
export const ScrollerBase = ({ children, className, style, ...props }, ref) => {
  const [initialize] = useOverlayScrollbars({ defer: true });

  useEffect(() => {
    initialize(ref.current);
  }, [initialize, ref]);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export const Scroller = React.forwardRef(ScrollerBase);
