import { NavBar } from './Navigation/Toolbar'
import { Container } from '@mui/material'
import Head from 'next/head'

export const Layout = ({ children }: IDefaultProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Fweb3 Faucet</title>
        <meta name='description' content='A faucet for fweb3' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />
      <Container disableGutters>{children}</Container>
    </>
  )
}
