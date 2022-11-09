import Head from 'next/head';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>SWR Server Side CPU U</title>
      </Head>
      <ul>
        <li>
          <Link href={'/no-swr'}>Page without SWR</Link>
        </li>
        <li>
          <Link href={'/swr'}>Page with useSWR</Link>
        </li>
        <li>
          <Link href={'/swr-config-only'}>Page with useSWRConfig</Link>
        </li>
        <li>
          <Link href={'/swr-config-nested'}>Page with useSWRConfig Nested</Link>
        </li>
      </ul>
    </>
  );
}
