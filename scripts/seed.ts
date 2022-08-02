import { prisma } from '../prisma'


;(async () => {
  try {
    await prisma.user.create({
      data: {
        account: '0xb15A3D29eFe51baaC8d3cd2f4F747B843FeAdA7d'
      },
    })
  } catch (err) {
    console.error(err.message)
  }
})()
