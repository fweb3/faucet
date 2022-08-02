interface IFetchOpts {
  [key: string]: unknown
}

export async function fetcher(url: string, opts?: IFetchOpts) {
  try {
    const config = {
      ...opts,
      headers: {
        ...opts.headers as {},
        'Content-Type': 'application/json',
      },
    }
    const res = await fetch(url, config)
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
    return {
      status: 'error',
      message: err.message,
    }
  }
}
