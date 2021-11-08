const MAX_SUPPORTED_UNIT = 320;
const STEP = 0.5;
const REM_PER_UNIT = 0.25;

const generatedExtendedSize = new Array(MAX_SUPPORTED_UNIT / STEP).fill(null).reduce((acc, _, idx) => {
  return {
    ...acc,
    [(idx + 1) * STEP]: `${(idx + 1) * STEP * REM_PER_UNIT}rem`,
  };
}, {});

const extendedSize = {
  ...generatedExtendedSize,
  fit: 'fit-content',
  full: '100%',
  '2/3': '66.67%',
  '3/4': '75%',
  '9/10': '90%',
  '9/16': '56.25%',
  '15/16': `${(15 * 100) / 16}%`,
  '1/2-screen': '50vh',
};

const palette = {
  yellow: '#ffd032',
  green: 'rgb(32, 148, 98)',
  'green-dark-1': '#096a5a',
  'red-dark-1': 'rgb(174, 1, 1)',
  red: '#d71a20',
  'red-light-1': '#d71a20',
  black: '#212529',
  white: '#fff',
  gray: '#ccc',
  'gray-light-1': '##999',
  'gray-dark-1': '##666',
  'gray-light-2': '##f2f2f2',
  'black-light-1': '##212529',
  lime: '#28c43c',
  blue: '##007bff',
  cyan: '#1e94b6',
};

const fontSize = { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '22.4px' };

const fontWeight = {
  bold: 700,
  'semi-bold': 500,
  normal: 400,
};

const screens = {
  md: { max: '992px' },
  sm: { max: '768px' },
};

module.exports = {
  mode: 'jit',
  important: true,
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../vs-components/src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './public/locales/**/*.json',
  ],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      width: extendedSize,
      height: { ...extendedSize, viewport: 'var(--view-port-height)' },
      maxWidth: extendedSize,
      maxHeight: { ...extendedSize, viewport: 'var(--view-port-height)' },
      minWidth: extendedSize,
      minHeight: { ...extendedSize, viewport: 'var(--view-port-height)' },
      padding: extendedSize,
      paddingTop: extendedSize,
      paddingBottom: extendedSize,
      paddingLeft: extendedSize,
      paddingRight: extendedSize,
      margin: extendedSize,
      marginTop: extendedSize,
      marginBottom: extendedSize,
      marginLeft: extendedSize,
      marginRight: extendedSize,
      fontWeight,
    },
    colors: {
      ...palette,
    },
    fontSize,
    screens,
  },
  plugins: [],
};
