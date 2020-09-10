const express = require('express');
const app = express();
const cors = require('cors');
const partner = require('./models/partner');
const partnersRouter = require('./controllers/partners');
const entitiesRouter = require('./controllers/entities');
const settlementsRouter = require('./controllers/settlements');

partner.initialize();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/partners', partnersRouter);
app.use('/api/entities', entitiesRouter);
app.use('/api/settlements', settlementsRouter);

module.exports = app;