// #FF95EE
//     color: #999;
// #fff
import '@fontsource/source-code-pro'
import { createTheme } from '@mui/material/styles'
import { green, grey, purple } from '@mui/material/colors'

export const theme = createTheme({
  typography: {
    fontFamily: ['Source Code Pro', 'monospace'].join(','),
  },
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#323031',
    //   light: '#5f5b5d',
    //   dark: '#000000',
    // },
    // secondary: {
    //   main: '#ff95ed',
    //   light: '#ffc7ff',
    //   dark: '#ca64ba',
    // },
    // background: {
    //   default: '#000000',
    //   paper: '#323031',
    // },
  },
})
