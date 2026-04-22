import React, { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { tokens } from '../../config/theme';

export type SectionTone = 'default' | 'success' | 'warning' | 'error' | 'info';

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: ReactNode;
  status?: { label: string; tone: SectionTone };
  children?: ReactNode;
}

const toneColor: Record<SectionTone, string> = {
  default: tokens.inkDim,
  success: tokens.sage,
  warning: tokens.amber,
  error: tokens.crimson,
  info: tokens.cobalt,
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  kicker,
  title,
  status,
  children,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 1.25,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.accent,
            fontWeight: 500,
          }}
        >
          {index}
        </Typography>
        <Box
          component="span"
          sx={{ width: 16, height: 1, backgroundColor: tokens.hairlineStrong }}
        />
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.inkMuted,
          }}
        >
          {kicker}
        </Typography>
        {status && (
          <Typography
            component="span"
            sx={{
              ml: 'auto',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.66rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: toneColor[status.tone],
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.85,
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: toneColor[status.tone],
              },
            }}
          >
            {status.label}
          </Typography>
        )}
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: tokens.ink,
          mb: children ? 1.5 : 0,
        }}
      >
        {title}
      </Typography>

      {children && (
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.92rem',
            lineHeight: 1.58,
            color: tokens.inkDim,
            maxWidth: 680,
          }}
        >
          {children}
        </Typography>
      )}
    </Box>
  );
};
