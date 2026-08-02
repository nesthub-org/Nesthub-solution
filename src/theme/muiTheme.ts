import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    primary: { main: '#2563EB', dark: '#1D4ED8', contrastText: '#FFFFFF' },
    success: { main: '#16A34A' },
    text: { primary: '#111111', secondary: '#6B7280' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    divider: '#ECECEC',
  },
  typography: {
    fontFamily: 'Inter, -apple-system, "Helvetica Neue", Helvetica, sans-serif',
  },
  shape: { borderRadius: 14 },
  components: {
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            backgroundColor: '#FFFFFF',
            fontSize: 16,
            '& fieldset': { borderColor: '#ECECEC' },
            '&:hover fieldset': { borderColor: '#D8D8D8' },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
              borderWidth: 1,
              boxShadow: '0 0 0 4px rgba(37,99,235,.10)',
            },
          },
          '& .MuiInputLabel-root': { fontWeight: 600, color: '#111111' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 16,
          boxShadow: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            boxShadow: '0 8px 28px rgba(37,99,235,.24)',
            '&:hover': { boxShadow: '0 8px 28px rgba(37,99,235,.34)' },
          },
        },
      ],
    },
  },
})
