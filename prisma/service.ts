// const isAdminWallet =
//   process.env?.NEXT_PUBLIC_ADMIN_WALLETS.split(',').includes(account) || false
// setIsAdmin(isAdminWallet)
// console.log({ isAdminWallet })

import { prisma } from './index'


export function handleSuccess(data: any) {
  return {
    status: 'ok',
    ...data
  }
}

export function handleError(message: string) {
  return {
    status: 'error',
    message
  }
}

export async function fetchOrCreateUserData(account: string) {
    const user = await _findUserByAccount(account)
    if (user) {
      const isAdmin = _checkAdmin(user)
      return handleSuccess({ ...user, isAdmin })
    } else {
      const newUser = await _createUser(account)
      return handleSuccess(newUser)
    }
}

function _checkAdmin({ account }) {
  return process.env.ADMIN_ACCOUNTS.split(',').includes(account)
}

async function _createUser(account: string) {
  return prisma.user.create({ data: { account }})
}

async function _findUserByAccount(account: string) {
  return prisma.user.findUnique({ where: { account } })
}
