const { createServer } = require('https');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.resolve(`./cert/${process.env.CERT_KEY_FILENAME}`)),
  cert: fs.readFileSync(path.resolve(`./cert/${process.env.CERT_FILENAME}`)),
};

app.prepare().then(() =>
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);

    return handle(req, res, parsedUrl);
  }).listen(process.env.APP_PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://${process.env.APP_HOST}:${process.env.APP_PORT}`);
  }),
);
