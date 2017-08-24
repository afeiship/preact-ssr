import express from 'express';
import shrinkRay from 'shrink-ray';
import business from './business';
import routes from './routes';

// likely our proxy will handle compression, cache-control, etc. these are healthy defaults
const app = express();
app.disable('x-powered-by');
app.use(shrinkRay());
app.use(business());
app.use('/*', routes); // everything else

export default app
