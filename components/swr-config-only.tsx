import { useSWRConfig } from 'swr';

export function SWRConfigOnlyComponent({ someString }: { someString: string }) {
  const someConfigWeDoNotNeedOnServerSide = useSWRConfig();

  return <p>{`${someString}, ${someConfigWeDoNotNeedOnServerSide !== undefined}`}</p>;
}
