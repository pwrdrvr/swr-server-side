import { useSWRConfig } from 'swr';
import { SWRConfigOnlyComponent } from './swr-config-only';

export function SWRConfigNestedComponent({ someString }: { someString: string }) {
  const someConfigWeDoNotNeedOnServerSide = useSWRConfig();

  return <p>{`${someString}, ${someConfigWeDoNotNeedOnServerSide !== undefined}`}<SWRConfigOnlyComponent someString={someString} /></p>;
}
