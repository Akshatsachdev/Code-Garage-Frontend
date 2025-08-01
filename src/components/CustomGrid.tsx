import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface GridProps extends BoxProps {
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  spacing?: number;
}

export const Grid: React.FC<GridProps> = ({
  container,
  item,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing,
  children,
  sx,
  ...otherProps
}) => {
  // Calculate flex basis for responsive grid
  const getFlexBasis = () => {
    if (xs === 12) return '100%';
    if (xs === 6) return '50%';
    if (xs === 4) return '33.333%';
    if (xs === 3) return '25%';
    if (xs === 2) return '16.666%';
    if (xs === 1) return '8.333%';
    return 'auto';
  };

  const responsiveStyles = {
    ...(xs && {
      flexBasis: getFlexBasis(),
      maxWidth: getFlexBasis(),
    }),
    ...(sm && {
      '@media (min-width: 600px)': {
        flexBasis: sm === 12 ? '100%' : sm === 6 ? '50%' : sm === 4 ? '33.333%' : sm === 3 ? '25%' : 'auto',
        maxWidth: sm === 12 ? '100%' : sm === 6 ? '50%' : sm === 4 ? '33.333%' : sm === 3 ? '25%' : 'auto',
      },
    }),
    ...(md && {
      '@media (min-width: 900px)': {
        flexBasis: md === 12 ? '100%' : md === 8 ? '66.666%' : md === 6 ? '50%' : md === 4 ? '33.333%' : md === 3 ? '25%' : 'auto',
        maxWidth: md === 12 ? '100%' : md === 8 ? '66.666%' : md === 6 ? '50%' : md === 4 ? '33.333%' : md === 3 ? '25%' : 'auto',
      },
    }),
  };

  if (container) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing ? `${spacing * 8}px` : 0,
          ...sx,
        }}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }

  if (item) {
    return (
      <Box
        sx={{
          flex: '0 0 auto',
          ...responsiveStyles,
          ...sx,
        }}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }

  return <Box sx={sx} {...otherProps}>{children}</Box>;
};

export default Grid;