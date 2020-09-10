const settlementsRouter = require('express').Router();
const { db } = require('../models/partner');

settlementsRouter.get('/', (request, response) => {
  db.all(`SELECT * from settlements`,
    (err, rows) => {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }

      response.json(rows);
  });
});

settlementsRouter.post('/', (request, response) => {
  const body = request.body;

  db.run(`INSERT INTO settlements(settlement) VALUES('${body.settlement}')`, function(err) {
    if (err) {
      response.status(400).json({ "error": err.message })
      return;
    }
    
    db.get(`SELECT * FROM settlements WHERE settlement_id = ?`, [this.lastID], (err, row) => {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }
      response.json(row);
    })
  });
});

module.exports = settlementsRouter;