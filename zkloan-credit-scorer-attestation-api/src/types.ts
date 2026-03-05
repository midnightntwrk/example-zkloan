export interface AttestationRequest {
  creditScore: number;
  monthlyIncome: number;
  monthsAsCustomer: number;
  userPubKeyHash: string; // bigint as decimal string
}

export interface AttestationResponse {
  signature: {
    announcement: { x: string; y: string }; // bigint as decimal strings
    response: string;
  };
  message: {
    creditScore: string;
    monthlyIncome: string;
    monthsAsCustomer: string;
    userPubKeyHash: string;
  };
}

export interface ProviderInfoResponse {
  providerId: number;
  publicKey: { x: string; y: string };
}

export interface HealthResponse {
  status: string;
  providerId: number;
}
