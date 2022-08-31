import {createTheme} from '@material-ui/core'
import {blue, purple, common} from '@material-ui/core/colors'

export const theme = createTheme({
  palette: {
    common,
    primary: {
      main: purple[500],
    },
    secondary: {
      main: blue[500],
    },
  },
})
