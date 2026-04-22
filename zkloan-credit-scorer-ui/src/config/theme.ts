import { createTheme, alpha } from '@mui/material';

const paper0 = '#13100d';
const paper1 = '#1a1612';
const paper2 = '#22201c';
const ink = '#ede4d2';
const inkDim = '#a69c8a';
const inkMuted = '#6e6758';
const hairline = 'rgba(237, 228, 210, 0.08)';
const hairlineStrong = 'rgba(237, 228, 210, 0.16)';
const accent = '#e77d4d';
const accentHover = '#f08c5d';
const sage = '#7da77d';
const amber = '#e0a547';
const crimson = '#d45a5a';
const cobalt = '#4a7fa8';

const serif = '"Fraunces", "Iowan Old Style", Georgia, serif';
const sans = '"IBM Plex Sans", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
const mono = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

export const fonts = { serif, sans, mono };

export const tokens = {
  paper0,
  paper1,
  paper2,
  ink,
  inkDim,
  inkMuted,
  hairline,
  hairlineStrong,
  accent,
  accentHover,
  sage,
  amber,
  crimson,
  cobalt,
};

export const theme = createTheme({
  typography: {
    fontFamily: sans,
    h1: {
      fontFamily: serif,
      fontWeight: 300,
      fontSize: 'clamp(3rem, 6vw, 4.75rem)',
      lineHeight: 1.02,
      letterSpacing: '-0.035em',
      fontVariationSettings: '"opsz" 144, "SOFT" 50',
    },
    h2: {
      fontFamily: serif,
      fontWeight: 350,
      fontSize: '2.5rem',
      lineHeight: 1.08,
      letterSpacing: '-0.03em',
      fontVariationSettings: '"opsz" 96, "SOFT" 50',
    },
    h3: {
      fontFamily: serif,
      fontWeight: 400,
      fontSize: '1.875rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      fontVariationSettings: '"opsz" 48, "SOFT" 50',
    },
    h4: {
      fontFamily: serif,
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.018em',
      fontVariationSettings: '"opsz" 32, "SOFT" 50',
    },
    h5: {
      fontFamily: serif,
      fontWeight: 450,
      fontSize: '1.15rem',
      lineHeight: 1.3,
      letterSpacing: '-0.012em',
      fontVariationSettings: '"opsz" 24',
    },
    h6: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '-0.008em',
    },
    subtitle1: {
      fontFamily: sans,
      fontSize: '1rem',
      lineHeight: 1.55,
      color: inkDim,
    },
    subtitle2: {
      fontFamily: mono,
      fontSize: '0.72rem',
      fontWeight: 500,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: inkDim,
    },
    body1: {
      fontFamily: sans,
      fontSize: '0.95rem',
      lineHeight: 1.6,
      letterSpacing: '-0.003em',
    },
    body2: {
      fontFamily: sans,
      fontSize: '0.85rem',
      lineHeight: 1.55,
      color: inkDim,
    },
    button: {
      fontFamily: sans,
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '-0.005em',
      fontSize: '0.88rem',
    },
    caption: {
      fontFamily: mono,
      fontSize: '0.7rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: inkMuted,
    },
    overline: {
      fontFamily: mono,
      fontSize: '0.7rem',
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      lineHeight: 1,
      color: inkDim,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: accent,
      light: accentHover,
      dark: '#c8653a',
      contrastText: paper0,
    },
    secondary: {
      main: cobalt,
    },
    success: { main: sage, contrastText: paper0 },
    warning: { main: amber, contrastText: paper0 },
    error: { main: crimson, contrastText: paper0 },
    info: { main: cobalt, contrastText: paper0 },
    background: {
      default: paper0,
      paper: paper1,
    },
    text: {
      primary: ink,
      secondary: inkDim,
      disabled: inkMuted,
    },
    divider: hairline,
    grey: {
      50: '#f6f0e5',
      100: '#ede4d2',
      200: '#d9ccb5',
      300: '#b8a68a',
      400: inkDim,
      500: '#85796a',
      600: inkMuted,
      700: '#4e4839',
      800: '#312c24',
      900: '#1d1a15',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: paper0,
          color: ink,
          fontFamily: sans,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: paper1,
          border: `1px solid ${hairline}`,
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: paper1,
          backgroundImage: 'none',
          border: `1px solid ${hairline}`,
          borderRadius: 6,
          boxShadow: 'none',
          position: 'relative',
          overflow: 'visible',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '28px 32px 12px',
        },
        title: {
          fontFamily: serif,
          fontWeight: 400,
          fontSize: '1.35rem',
          letterSpacing: '-0.012em',
          color: ink,
          fontVariationSettings: '"opsz" 32',
        },
        subheader: {
          fontFamily: sans,
          fontSize: '0.85rem',
          color: inkDim,
          marginTop: 4,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px 32px 28px',
          '&:last-child': { paddingBottom: 28 },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '0 32px 28px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 3,
          fontWeight: 500,
          padding: '10px 18px',
          boxShadow: 'none',
          transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease',
          '&:hover': { boxShadow: 'none' },
          '&.Mui-disabled': {
            color: inkMuted,
            backgroundColor: alpha(ink, 0.04),
            borderColor: hairline,
          },
        },
        sizeSmall: { padding: '6px 12px', fontSize: '0.8rem' },
        containedPrimary: {
          backgroundColor: accent,
          color: paper0,
          '&:hover': { backgroundColor: accentHover },
          '&.Mui-disabled': {
            backgroundColor: alpha(accent, 0.2),
            color: alpha(paper0, 0.5),
          },
        },
        outlined: {
          borderColor: hairlineStrong,
          color: ink,
          '&:hover': {
            borderColor: ink,
            backgroundColor: alpha(ink, 0.04),
          },
        },
        text: {
          color: ink,
          '&:hover': { backgroundColor: alpha(ink, 0.04) },
        },
      },
    },
    MuiIconButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          color: inkDim,
          borderRadius: 3,
          transition: 'color 180ms ease, background-color 180ms ease',
          '&:hover': {
            color: ink,
            backgroundColor: alpha(ink, 0.04),
          },
        },
        colorSuccess: {
          color: sage,
          '&:hover': { color: sage, backgroundColor: alpha(sage, 0.08) },
        },
        colorError: {
          color: crimson,
          '&:hover': { color: crimson, backgroundColor: alpha(crimson, 0.08) },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 3,
          fontFamily: mono,
          fontSize: '0.9rem',
          color: ink,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: hairlineStrong,
            transition: 'border-color 180ms ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(ink, 0.32),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: accent,
            borderWidth: 1,
          },
        },
        input: {
          padding: '14px 16px',
          '&::placeholder': { color: inkMuted, opacity: 1 },
        },
        inputSizeSmall: { padding: '10px 14px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: mono,
          fontSize: '0.7rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: inkDim,
          '&.Mui-focused': { color: accent },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: inkDim },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: paper2,
          border: `1px solid ${hairline}`,
          marginTop: 4,
          borderRadius: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: mono,
          fontSize: '0.82rem',
          color: ink,
          padding: '10px 16px',
          '&:hover': { backgroundColor: alpha(ink, 0.04) },
          '&.Mui-selected': {
            backgroundColor: alpha(accent, 0.1),
            '&:hover': { backgroundColor: alpha(accent, 0.14) },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: mono,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          height: 24,
          borderRadius: 3,
          border: `1px solid ${hairline}`,
          backgroundColor: 'transparent',
        },
        label: { padding: '0 8px' },
        colorSuccess: {
          backgroundColor: alpha(sage, 0.12),
          color: sage,
          border: `1px solid ${alpha(sage, 0.3)}`,
        },
        colorError: {
          backgroundColor: alpha(crimson, 0.12),
          color: crimson,
          border: `1px solid ${alpha(crimson, 0.3)}`,
        },
        colorWarning: {
          backgroundColor: alpha(amber, 0.12),
          color: amber,
          border: `1px solid ${alpha(amber, 0.3)}`,
        },
        colorInfo: {
          backgroundColor: alpha(cobalt, 0.14),
          color: '#8db5d9',
          border: `1px solid ${alpha(cobalt, 0.35)}`,
        },
        colorPrimary: {
          backgroundColor: alpha(accent, 0.14),
          color: accent,
          border: `1px solid ${alpha(accent, 0.35)}`,
        },
      },
    },
    MuiAlert: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: sans,
          fontSize: '0.85rem',
          padding: '12px 16px',
          alignItems: 'flex-start',
          backgroundColor: paper2,
          color: ink,
          border: `1px solid ${hairline}`,
        },
        icon: { padding: '2px 0', marginRight: 12 },
        message: { padding: '1px 0', color: ink },
        standardWarning: {
          borderLeft: `2px solid ${amber}`,
          backgroundColor: alpha(amber, 0.06),
        },
        standardError: {
          borderLeft: `2px solid ${crimson}`,
          backgroundColor: alpha(crimson, 0.06),
        },
        standardSuccess: {
          borderLeft: `2px solid ${sage}`,
          backgroundColor: alpha(sage, 0.06),
        },
        standardInfo: {
          borderLeft: `2px solid ${cobalt}`,
          backgroundColor: alpha(cobalt, 0.06),
        },
        outlinedWarning: {
          borderLeft: `2px solid ${amber}`,
          borderTopColor: hairline,
          borderRightColor: hairline,
          borderBottomColor: hairline,
          backgroundColor: alpha(amber, 0.04),
          color: ink,
          '& .MuiAlert-icon': { color: amber },
        },
        outlinedError: {
          borderLeft: `2px solid ${crimson}`,
          borderTopColor: hairline,
          borderRightColor: hairline,
          borderBottomColor: hairline,
          backgroundColor: alpha(crimson, 0.04),
          color: ink,
          '& .MuiAlert-icon': { color: crimson },
        },
        outlinedSuccess: {
          borderLeft: `2px solid ${sage}`,
          borderTopColor: hairline,
          borderRightColor: hairline,
          borderBottomColor: hairline,
          backgroundColor: alpha(sage, 0.04),
          color: ink,
          '& .MuiAlert-icon': { color: sage },
        },
        outlinedInfo: {
          borderLeft: `2px solid ${cobalt}`,
          borderTopColor: hairline,
          borderRightColor: hairline,
          borderBottomColor: hairline,
          backgroundColor: alpha(cobalt, 0.04),
          color: ink,
          '& .MuiAlert-icon': { color: cobalt },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: hairline },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: hairline,
          color: ink,
          fontFamily: sans,
        },
        head: {
          fontFamily: mono,
          fontSize: '0.66rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: inkMuted,
          fontWeight: 500,
          borderBottom: `1px solid ${hairlineStrong}`,
          paddingTop: 12,
          paddingBottom: 12,
        },
        body: {
          fontSize: '0.88rem',
          paddingTop: 16,
          paddingBottom: 16,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': { borderBottom: 'none' },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: paper2,
          color: ink,
          border: `1px solid ${hairline}`,
          fontFamily: sans,
          fontSize: '0.78rem',
          padding: '8px 12px',
          borderRadius: 3,
        },
        arrow: { color: paper2 },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(paper0, 0.72),
          backdropFilter: 'blur(2px)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: { color: accent },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: accent,
          textDecorationColor: alpha(accent, 0.35),
          textUnderlineOffset: '3px',
          '&:hover': { textDecorationColor: accent },
        },
      },
    },
  },
});
