import {IcGithub, IcTwitter} from '../icons';

import Link from '@docusaurus/Link';
import React from 'react';

type LogoProps = {
  address: string;
  source?: string;
  isBlack?: boolean;
  domain?: string;
};

function Logo({address, source, domain, isBlack}: LogoProps): JSX.Element {
  let iconSource = domain;

  switch (domain) {
    case 'github':
      iconSource = IcGithub;
      break;
    case 'twitter':
      iconSource = IcTwitter;
      break;
    default:
      iconSource = source;
  }

  return (
    <Link to={address}>
      <img
        src={iconSource}
        className={isBlack ? 'mdx-black-logo' : 'mdx-logo'}
        alt="logo"
      />
    </Link>
  );
}

export default Logo;
