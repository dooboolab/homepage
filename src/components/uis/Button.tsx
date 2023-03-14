import React, { ReactNode } from "react";

import Link from "@docusaurus/Link";

type ButtonProps = {
  endpoint: string;
  className: string;
  children: ReactNode;
};

function Button({ endpoint, className, children }: ButtonProps): JSX.Element {
  return (
    <Link to={endpoint}>
      <button className={className}>{children}</button>
    </Link>
  );
}

export default Button;
