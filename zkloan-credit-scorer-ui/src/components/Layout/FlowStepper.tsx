import React from 'react';
import { Box, Typography } from '@mui/material';
import { tokens } from '../../config/theme';

export type StepState = 'done' | 'current' | 'pending';

export interface FlowStep {
  index: string;
  label: string;
  state: StepState;
}

interface FlowStepperProps {
  steps: FlowStep[];
}

const colorFor: Record<StepState, string> = {
  done: tokens.sage,
  current: tokens.accent,
  pending: tokens.inkMuted,
};

export const FlowStepper: React.FC<FlowStepperProps> = ({ steps }) => {
  return (
    <Box
      role="list"
      aria-label="Progress"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        flexWrap: 'wrap',
        py: 2.5,
        px: 2.5,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 1,
        backgroundColor: 'rgba(237, 228, 210, 0.012)',
      }}
    >
      {steps.map((step, i) => {
        const color = colorFor[step.state];
        const dimmed = step.state === 'pending';
        return (
          <React.Fragment key={step.index}>
            <Box
              role="listitem"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: `1px solid ${step.state === 'done' ? color : tokens.hairlineStrong}`,
                  backgroundColor: step.state === 'done' ? color : 'transparent',
                  color: step.state === 'done' ? tokens.paper0 : color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  flexShrink: 0,
                  transition: 'background-color 220ms ease, border-color 220ms ease, color 220ms ease',
                }}
              >
                {step.state === 'done' ? '✓' : step.index}
              </Box>
              <Typography
                component="span"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: dimmed ? tokens.inkMuted : color,
                  whiteSpace: 'nowrap',
                  transition: 'color 220ms ease',
                }}
              >
                {step.label}
              </Typography>
            </Box>
            {i < steps.length - 1 && (
              <Box
                sx={{
                  flex: 1,
                  minWidth: { xs: 16, sm: 24 },
                  maxWidth: { xs: 32, sm: 56 },
                  height: 1,
                  backgroundColor: tokens.hairline,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
