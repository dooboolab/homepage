import React, { ReactNode } from "react";

import Link from "@docusaurus/Link";

type ButtonProps = {
  endpoint: string;
  className: string;
  children: ReactNode;
};

function Button({ endpoint, className, children }: ButtonProps): JSX.Element {
  return (
    <Link to={endpoint} style={{
      position: 'relative',
      height: 'min-content',
    }}>
      <button className={className} style={{
        cursor: 'pointer'
      }}>{children}</button>
    </Link>
  );
}

export default Button;
