import restify from 'restify';
import { signCreditData, getPublicKey } from './signing.js';
export function createServer(providerSk, providerId) {
    const server = restify.createServer({ name: 'zkloan-attestation-api' });
    server.use(restify.plugins.bodyParser());
    // CORS support for browser-based UI
    server.pre((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            res.send(204);
            return;
        }
        return next();
    });
    const providerPk = getPublicKey(providerSk);
    server.post('/attest', (req, res, next) => {
        try {
            const body = req.body;
            if (body.creditScore == null || body.monthlyIncome == null ||
                body.monthsAsCustomer == null || body.userPubKeyHash == null) {
                res.send(400, { error: 'Missing required fields: creditScore, monthlyIncome, monthsAsCustomer, userPubKeyHash' });
                return next();
            }
            const userPubKeyHash = BigInt(body.userPubKeyHash);
            const signature = signCreditData(providerSk, body.creditScore, body.monthlyIncome, body.monthsAsCustomer, userPubKeyHash);
            const response = {
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
        }
        catch (err) {
            res.send(500, { error: err.message });
        }
        return next();
    });
    server.get('/provider-info', (_req, res, next) => {
        const response = {
            providerId,
            publicKey: {
                x: providerPk.x.toString(),
                y: providerPk.y.toString(),
            },
        };
        res.send(200, response);
        return next();
    });
    server.get('/health', (_req, res, next) => {
        const response = {
            status: 'ok',
            providerId,
        };
        res.send(200, response);
        return next();
    });
    return server;
}
//# sourceMappingURL=server.js.map