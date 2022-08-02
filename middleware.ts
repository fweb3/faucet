/* eslint-disable */

import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import fetch from 'node-fetch'


export async function middleware(req: NextRequest, event: NextFetchEvent) {
  console.log('DEBUG ON VERCEL:', req.ip)
  return NextResponse.next()
}

// import { NextRequest, NextResponse, userAgent } from 'next/server'

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl
//   const { device } = userAgent(request)
//   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
//   url.searchParams.set('viewport', viewport)
//   return NextResponse.rewrite(url)
// }
