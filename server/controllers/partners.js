const partnersRouter = require('express').Router();
const { db } = require('../models/partner');

partnersRouter.get('/', (request, response) => {
  db.all(`SELECT * FROM partners
    LEFT JOIN settlements ON settlements.settlement_id = partners.settlement_id
    LEFT JOIN business_entities on business_entities.entity_id = partners.entity_id`,
    (err, rows) => {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }

      response.json(rows);
  });
});

partnersRouter.post('/', (request, response) => {
  const body = request.body;
  const bodyKeys = Object.keys(body);

  db.run(
    `INSERT INTO partners(${bodyKeys.join(',')}) VALUES(${bodyKeys.map(() => '?').join(',')})`,
    Object.values(body),
    function(err) {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }
      
      db.get(`SELECT * FROM partners
      LEFT JOIN settlements ON settlements.settlement_id = partners.settlement_id
      LEFT JOIN business_entities on business_entities.entity_id = partners.entity_id WHERE partner_id = ?`, [this.lastID], (err, row) => {
        if (err) {
          response.status(400).json({ "error": err.message })
          return;
        }
        response.json(row);
      })
  });
});

partnersRouter.delete('/:id', (request, response) => {
  db.run(`DELETE FROM partners WHERE partner_id = ?`, request.params.id, function(err) {
    if (err) {
      return console.error(err.message);
    }
    response.status(204).end();
  });
});

partnersRouter.put('/:id', (request, response) => {
  const body = request.body

  db.run(
    `UPDATE partners SET ${Object.keys(body).map(k => `${k} = ?`)} WHERE partner_id = ${request.params.id}`,
    Object.values(body),
    function(err) {
      if (err) {
        response.status(400).json({ "error": err.message })
        return;
      }
      
      db.get(`SELECT * FROM partners
      LEFT JOIN settlements ON settlements.settlement_id = partners.settlement_id
      LEFT JOIN business_entities on business_entities.entity_id = partners.entity_id WHERE partner_id = ?`, [request.params.id], (err, row) => {
        if (err) {
          response.status(400).json({ "error": err.message })
          return;
        }
        response.json(row);
      })
    }
  );
});

module.exports = partnersRouter;