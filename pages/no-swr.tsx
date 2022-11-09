import Head from 'next/head';
import { NoSWRComponent } from '../components/no-swr';
import getConfig from 'next/config';
import { GetServerSideProps } from 'next';

const { publicRuntimeConfig } = getConfig();

export default function NoSWR(): JSX.Element {
  const items: number[] = new Array(publicRuntimeConfig.numberOfElements).fill(1).map( (_, i) => i + 1 );

  return (
    <>
      <Head>
        <title>Page without useSWR</title>
      </Head>
      { items.map((item) => <NoSWRComponent someString={`${item}`} />) }
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