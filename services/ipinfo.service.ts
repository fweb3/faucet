import { IIpinfoResponse } from './services.d';
import { fetcher } from "../hooks/fetcher";

import { MOCK_IPINFO_RESPONSE } from '../hooks/__mocks__/ipinfo.fixture';

export async function fetchIpInfo(): Promise<IIpinfoResponse> {
  // const ipinfo = await fetcher('https://ipinfo.io', {
  //   headers: {
  //     Authorization: `Bearer ${process.env.IPINFO_TOKEN}`,
  //   },
  // })
  // return ipinfo || {}
  return MOCK_IPINFO_RESPONSE
}
