import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingBackdrop = ({ isLoading }) => (
  <Backdrop
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color='secondary' size={100}/>
  </Backdrop>
)

export { LoadingBackdrop }
