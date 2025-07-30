import React, { CSSProperties } from 'react';

type BackdropProps = {
  opacity?: number;
  style?: CSSProperties;
};

export function Backdrop({
  style,
  opacity = 50,
  children,
}: React.PropsWithChildren<BackdropProps>) {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, ' + opacity / 100 + ')',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
