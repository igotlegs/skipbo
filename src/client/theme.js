import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import pink from '@material-ui/core/colors/pink'
import deepOrange from '@material-ui/core/colors/deepOrange'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
  },
  status: {
    danger: deepOrange[800],
  },
  typography: {
    fontSize: 18,
  }
})

export default theme
