import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import {google} from 'googleapis';
import path from 'path';

export const runIapApp = (): express.Application => {
  const iapApp = express();

  iapApp.use(bodyParser.json());
  iapApp.use(cors({origin: true}));

  iapApp.post('/validateGoogleIAP', async (req: express.Request, res) => {
    const packageName = req.body.packageName;
    const type = req.body.type ? 'subscriptions' : 'products';
    const productId = req.body.productId;
    const productToken = req.body.productToken;

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, './service-account.json'),
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    const accessToken = await auth.getAccessToken();

    const url = `https://www.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/${type}/${productId}/tokens/${productToken}?access_token=${accessToken}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    res.status(response.status).json(await response.json());
  });

  iapApp.get('/artifacts', async (req: express.Request, res) => {
    res.status(200).send(false);
  });

  return iapApp;
};
