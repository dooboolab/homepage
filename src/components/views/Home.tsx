import {IcCareers, IcLogoIntroCut, IcOurStory, IcWorks} from '../icons';
import type {ReactElement, ReactNode} from 'react';

import Button from '../uis/Button';
import Footer from './Footer';
import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './Home.module.css';

type SectionType = {
  title: ReactNode;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  endpoint: string;
  buttonName: ReactNode;
  className?: string;
  idx?: number;
};

const sections: SectionType[] = [
  {
    title: (
      <Translate
        id="homepage.sections.our-story"
        description="homepage.sections.our-story description"
      >
        Our story
      </Translate>
    ),
    Svg: IcOurStory,
    description: (
      <Translate
        id="homepage.sections.our-story-desc"
        description="homepage.sections.our-story-desc description"
      >
        dooboolab pursues results and at the same time we also value the process
        of achieving results.
      </Translate>
    ),
    endpoint: '/docs/about-us/introduction',
    buttonName: (
      <Translate id="homepage.more" description="homepage.more description">
        See more
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.sections.work"
        description="homepage.sections.work description"
      >
        Work
      </Translate>
    ),
    Svg: IcWorks,
    description: (
      <Translate
        id="homepage.sections.work-desc"
        description="homepage.sections.work-desc description"
      >
        The path that dooboolab has taken on. and the way forward.
      </Translate>
    ),
    endpoint: '/docs/works/projects/dooboo',
    buttonName: (
      <Translate id="homepage.more" description="homepage.more description">
        See more
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.sections.career"
        description="homepage.sections.career description"
      >
        Career
      </Translate>
    ),
    Svg: IcCareers,
    description: (
      <Translate
        id="homepage.sections.career-desc"
        description="homepage.sections.career-desc description"
      >
        A company is a community, and 'people' lead the community.
      </Translate>
    ),
    endpoint: '/docs/careers/job-description',
    buttonName: (
      <Translate id="homepage.more" description="homepage.more description">
        See more
      </Translate>
    ),
  },
];

function Section({
  title,
  Svg,
  description,
  endpoint,
  buttonName,
  idx,
}: SectionType): ReactElement {
  const isIndexEvenNumber = (idx + 2) % 2;

  if (isIndexEvenNumber) {
    return (
      <div className={styles.featuresEven}>
        <div className={styles.featureDescEven}>
          <h2>{title}</h2>
          <p>{description}</p>
          <Button className="btn-main" endpoint={endpoint}>
            {buttonName}
          </Button>
        </div>
        <Svg className={styles.featureSvgEven} role="img" />
      </div>
    );
  }

  return (
    <div className={styles.features}>
      <Svg className={styles.featureSvg} role="img" />
      <div className={styles.featureDesc}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Button className="btn-main" endpoint={endpoint}>
          {buttonName}
        </Button>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <IcLogoIntroCut className={styles.brandIcon} />
      <section className={styles.sections}>
        {sections.map((props, idx) => (
          <Section key={idx} idx={idx} {...props} />
        ))}
      </section>
      <Footer />
    </div>
  );
}
