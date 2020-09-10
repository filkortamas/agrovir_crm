const entitiesRouter = require('express').Router();
const { db } = require('../models/partner');

entitiesRouter.get('/', (request, response) => {
  db.all(`SELECT * from business_entities`,
    (err, rows) => {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }

      response.json(rows);
  });
});

entitiesRouter.post('/', (request, response) => {
  const body = request.body;

  db.run(`INSERT INTO business_entities(entity) VALUES('${body.entity}')`, function(err) {
    if (err) {
      response.status(400).json({ "error": err.message })
      return;
    }
    
    db.get(`SELECT * FROM business_entities WHERE entity_id = ?`, [this.lastID], (err, row) => {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }
      response.json(row);
    })
  });
});

module.exports = entitiesRouter;