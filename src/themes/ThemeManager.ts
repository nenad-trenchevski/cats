import { createTheme, Theme } from '@mui/material/styles';

class ThemeManager {
  private theme: Theme;

  constructor(defaultTheme: Theme) {
    this.theme = createTheme(defaultTheme);
  }

  getTheme(): Theme {
    return this.theme;
  }
}

export default ThemeManager;
