import { fetcher } from '../hooks/fetcher'
import { IUserVerifyClientRequest, IUserVerifyResponse } from './services.d'

export async function fetchTwitter(incomingBody) {
  _hasEnvVarsOrThrow()
  const fweb3TwitterApiUrl = `${process.env.FWEB3_API}/twitter`
  const body = JSON.stringify(incomingBody)
  const config = _createApiPostRequest(body)
  const payload = await fetcher(fweb3TwitterApiUrl, config)
  return {
    status: 'ok',
    ...payload
  }
}

export async function fetchOrCreateUser(
  incomingBody: IUserVerifyClientRequest
): Promise<IUserVerifyResponse> {
  _hasEnvVarsOrThrow()
  const fweb3UserApiUrl = `${process.env.FWEB3_API}/user`
  const body = JSON.stringify(incomingBody)
  const config = _createApiPostRequest(body)
  const payload = await fetcher(fweb3UserApiUrl, config)
  return {
    status: 'ok',
    ...payload,
  }
}

function _createApiPostRequest(body: string) {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FWEB3_API_TOKEN}`,
    },
    body,
  }
}

function _hasEnvVarsOrThrow() {
  if (!process.env.FWEB3_API || !process.env.FWEB3_API_TOKEN) {
    throw new Error('Missing env vars')
  }
  return null
}
