import Head from 'next/head';
import { SWRConfigOnlyComponent } from '../components/swr-config-only';
import getConfig from 'next/config';
import { GetServerSideProps } from 'next';

const { publicRuntimeConfig } = getConfig();

export default function SWR(): JSX.Element {
  const items: number[] = new Array(publicRuntimeConfig.numberOfElements).fill(1).map( (_, i) => i + 1 );

  return (
    <>
      <Head>
        <title>Page with useSWRConfig</title>
      </Head>
      { items.map((item) => <SWRConfigOnlyComponent someString={`${item}`} />) }
    </>
  );
}

/**
 * Prevent static rendering of the pages at build time
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};