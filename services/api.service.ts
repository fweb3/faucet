import { fetcher } from '../hooks/fetcher'
import { IUserVerifyClientRequest, IUserVerifyResponse } from './services.d'

export async function fetchOrCreateUser(
  incomingBody: IUserVerifyClientRequest
): Promise<IUserVerifyResponse> {
  _hasEnvVarsOrThrow()
  if (incomingBody.network === 'Not Connected') {
    console.info('[-] network not connected. aborting user api request')
    return null
  }
  const fweb3ApiUrl = `${process.env.FWEB3_API}/user`
  const body = JSON.stringify(incomingBody)
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FWEB3_API_TOKEN}`,
    },
    body,
  }
  const payload = await fetcher(fweb3ApiUrl, config)
  return {
    status: 'ok',
    ...payload,
  }
}

function _hasEnvVarsOrThrow() {
  if (!process.env.FWEB3_API || !process.env.FWEB3_API_TOKEN) {
    throw new Error('Missing env vars')
  }
  return null
}
