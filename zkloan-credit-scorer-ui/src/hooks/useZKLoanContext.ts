import { useContext } from 'react';
import { ZKLoanContext, type ZKLoanAPIProvider } from '../contexts';

export const useZKLoanContext = (): ZKLoanAPIProvider => {
  const context = useContext(ZKLoanContext);

  if (!context) {
    throw new Error('useZKLoanContext must be used within a ZKLoanProvider');
  }

  return context;
};
