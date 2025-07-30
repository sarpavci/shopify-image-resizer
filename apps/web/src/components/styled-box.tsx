import React from 'react';

export function StyledBox({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return <div {...props}>{children}</div>;
}
