import React, { useState, useRef, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import { tokens } from '../../config/theme';

interface CopyButtonProps {
  value: string;
  label?: string;
  size?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label = 'Copy',
  size = 26,
}) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback silently
    }
  };

  return (
    <Tooltip
      title={copied ? 'Copied' : label}
      arrow
      placement="top"
      disableInteractive
    >
      <Box
        component="button"
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : label}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          minWidth: size,
          p: 0,
          border: `1px solid ${tokens.hairline}`,
          borderRadius: 3,
          backgroundColor: 'transparent',
          color: copied ? tokens.sage : tokens.inkDim,
          cursor: 'pointer',
          transition: 'border-color 160ms ease, color 160ms ease, background-color 160ms ease',
          '&:hover': {
            borderColor: copied ? tokens.sage : tokens.accent,
            color: copied ? tokens.sage : tokens.accent,
            backgroundColor: copied
              ? 'rgba(125, 167, 125, 0.06)'
              : 'rgba(231, 125, 77, 0.06)',
          },
          '&:focus-visible': {
            outline: 'none',
            borderColor: tokens.accent,
            boxShadow: `0 0 0 3px rgba(231, 125, 77, 0.18)`,
          },
        }}
      >
        {copied ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3,8.5 6.5,12 13,4.5" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5" y="5" width="9" height="9" rx="1.5" />
            <path d="M3 11V3a1 1 0 0 1 1-1h7" />
          </svg>
        )}
      </Box>
    </Tooltip>
  );
};
