import { createMuiTheme } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#555555',
      dark: '#3b3b3b',
      light: '#777777',
      contrastText: common.white
    }
  }
});
