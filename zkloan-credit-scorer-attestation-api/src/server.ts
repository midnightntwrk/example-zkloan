import restify from 'restify';
import { signCreditData, getPublicKey } from './signing.js';
import type { AttestationRequest, AttestationResponse, ProviderInfoResponse, HealthResponse } from './types.js';
import type { NativePoint } from '@midnight-ntwrk/compact-runtime';

export function createServer(providerSk: bigint, providerId: number): restify.Server {
  const server = restify.createServer({ name: 'zkloan-attestation-api' });
  server.use(restify.plugins.bodyParser());

  // CORS support for browser-based UI
  server.pre((req: restify.Request, res: restify.Response, next: restify.Next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.send(204);
      return next(false);
    }
    return next();
  });

  const providerPk: NativePoint = getPublicKey(providerSk);

  server.post('/attest', (req: restify.Request, res: restify.Response, next: restify.Next) => {
    try {
      const body = req.body as AttestationRequest;

      if (body.creditScore == null || body.monthlyIncome == null ||
          body.monthsAsCustomer == null || body.userPubKeyHash == null) {
        res.send(400, { error: 'Missing required fields: creditScore, monthlyIncome, monthsAsCustomer, userPubKeyHash' });
        return next();
      }

      const userPubKeyHash = BigInt(body.userPubKeyHash);

      const signature = signCreditData(
        providerSk,
        body.creditScore,
        body.monthlyIncome,
        body.monthsAsCustomer,
        userPubKeyHash,
      );

      const response: AttestationResponse = {
        signature: {
          announcement: {
            x: signature.announcement.x.toString(),
            y: signature.announcement.y.toString(),
          },
          response: signature.response.toString(),
        },
        message: {
          creditScore: body.creditScore.toString(),
          monthlyIncome: body.monthlyIncome.toString(),
          monthsAsCustomer: body.monthsAsCustomer.toString(),
          userPubKeyHash: userPubKeyHash.toString(),
        },
      };

      res.send(200, response);
    } catch (err: any) {
      res.send(500, { error: err.message });
    }
    return next();
  });

  server.get('/provider-info', (_req: restify.Request, res: restify.Response, next: restify.Next) => {
    const response: ProviderInfoResponse = {
      providerId,
      publicKey: {
        x: providerPk.x.toString(),
        y: providerPk.y.toString(),
      },
    };
    res.send(200, response);
    return next();
  });

  server.get('/health', (_req: restify.Request, res: restify.Response, next: restify.Next) => {
    const response: HealthResponse = {
      status: 'ok',
      providerId,
    };
    res.send(200, response);
    return next();
  });

  return server;
}
