# Overview

This repo demonstrates that `mergeConfigs` and `useSWRConfig` are called on the server-side even though (swr)[https://www.npmjs.com/package/swr] does not do much on the server-side.

These calls have a cost that is probably not readily apparent to users of `swr`:
- In one example of a server-side rendered page with a deep menu using a heavy object (which was refactored after noticing this), skipping 3000 calls to `mergeConfigs` and `useSWRConfig` saved 200-250 ms of CPU time and reduced the server-side CPU consumption of the entire deployment by ~40%
- In that same example, the client-side mobile First Input Delay dropped 100-200 ms by that same reduction in the number of useSWR calls made by menu items

Hooks can't be conditionally called in React, so it's not usually easily possible to skip a `useSWR` or `useSWRConfig` call on the server-side.  Perhaps `swr` should skip most of the code / specifically the config merges, on the server-side to save CPU time, such as when `typeof window === 'undefined'`.

One or more of the following could be considered:
- Put a caveat in the docs that `useSWR` and `useSWRConfig` are not inexpensive to call and provide some suggestions on how to limit down the number of calls when leaf node components need the data provided or a handle to the `mutate` function
- Warn in dev-mode when more than 100k calls are made to `mergeConfigs` or `useSWRConfig` (or some other threshold) during the process lifetime
  - This should be both a client-side and server-side warning as the cost is incurred on both sides
- Eliminate most of all of the work on the server-side if possible
- Reduce the cost of getting the `mutate` function from `useSWRConfig`
- Reduce the cost of calling `useSWR` by reducing the number of object merges via `OBJECT.assign` and/or other approaches

# Steps to Measure

- `npm i`
- `npm run dev`
- `http://localhost:3000/`
  - Click the links
  - Check the console logs for the server for `useSWRConfigCallCount` and `mergeConfigsCallCount`
  - (no-swr)[http://localhost:3000/no-swr] will not call `mergeConfigs` or `useSWRConfig` on the server-side
  - (swr)[http://localhost:3000/swr] will call `mergeConfigs` 1000 times and `useSWRConfig` 1000 times on the server-side
  - (swr-config-only)[http://localhost:3000/swr-config-only] will call `useSWRConfig` 1000 times but will not call `mergeConfigs` at all

# Timing swr vs no-swr

- `npm i`
- `npm run build`
- `npm run start > /dev/null`
  - Note: with the patch applied that logs calls, the time will get much slower if the output is not redirected to `/dev/null`, which is not a fair comparison
- Test `no-swr` page
  - `ab -c 5 -n 100 http://127.0.0.1:3000/no-swr`
  - 50th percentile: `17 ms`
- Test `swr` page
  - `ab -c 5 -n 100 http://127.0.0.1:3000/swr`
  - 50th percentile: `87 ms`