import React from 'react';
import Layout from '@theme/Layout';
import Home from '../components/views/Home';
import Head from '@docusaurus/Head';

export default function Index(): JSX.Element {
  return (
    <Layout title="dooboolab" description="dooboolab">
      <Head>
        {/* <meta property="og:image" content="image.png" /> */}
        <meta
          name="facebook-domain-verification"
          content="yasfzkg2fkisvxtw7lx4vf4io5w155"
        />
      </Head>
      <Home />
    </Layout>
  );
}
