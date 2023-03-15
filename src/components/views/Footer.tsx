import Button from '../uis/Button';
import React from 'react';
import type {ReactElement} from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './Footer.module.css';
import {useColorMode} from '@docusaurus/theme-common';

function Footer(): ReactElement {
  const {colorMode} = useColorMode();

  const iconSrc =
    colorMode === 'light'
      ? 'icon/dooboolab_logo.png'
      : 'icon/dooboolab_logo_dark.png';

  return (
    <div className={clsx(styles.footerContainer)}>
      <div className={styles.footerContent}>
        <img alt="logo" className={styles.footerLogo} src={iconSrc} />
        <p>
          <Translate
            id="homepage.address"
            description="homepage.address description"
          >
            501, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea
          </Translate>
        </p>
        <p>©2021-{new Date().getFullYear()} dooboolab.</p>
      </div>
      <Button className="" endpoint={'/docs/about-us/contact-us'}>
        <Translate
          id="homepage.contact"
          description="homepage.contact description"
        >
          Contact Us
        </Translate>
      </Button>
    </div>
  );
}

export default Footer;
