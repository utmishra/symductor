import { createStitches } from '@stitches/react';

export const { styled, css } = createStitches({
  theme: {
    fonts: {
      heading: 'Arial, sans-serif',
    },
    fontSizes: {
      h1: '48px',
      h2: '36px',
      h3: '24px',
      h4: '18px',
      h5: '16px',
      h6: '14px',
    },
  },
});
