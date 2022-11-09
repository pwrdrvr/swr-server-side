import useSWR from 'swr';

export function SWRComponent({ someString }: { someString: string }) {
  const someValueWeCantUseOnServerSide = useSWR('./api/hello', async (url: string) => {
    return fetch(url).then((r) => r.json());
  }, {
    // fallbackData: { isSomeValue: true },
  });

  return <p>{`${someString}, ${someValueWeCantUseOnServerSide !== undefined}`}</p>;
}
