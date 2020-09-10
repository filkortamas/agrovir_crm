const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/partner.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the partner database.');
});


const initialize = () => {
  db.exec('PRAGMA foreign_keys = ON;', function(error)  {
    if (error){
      console.error("Pragma statement didn't work.")
    }
  });

  db.run(`CREATE TABLE business_entities(
    entity_id INTEGER PRIMARY KEY,
    entity TEXT NOT NULL
  )`, function(err) {
    // If table not exist
    if (!err) {
      db.serialize(() => {
        db.run(`CREATE TABLE settlements(
          settlement_id INTEGER PRIMARY KEY,
          settlement TEXT NOT NULL
        )`)
        .run(`CREATE TABLE partners(
          partner_id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          entity_id INTEGER,
          vat TEXT,
          company_registration_number INTEGER,
          settlement_id INTEGER NOT NULL,
          address TEXT,
          phone TEXT,
          account_number TEXT,
          note TEXT,
          FOREIGN KEY (entity_id)
            REFERENCES business_entities (entity_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE,
          FOREIGN KEY (settlement_id)
            REFERENCES settlements (settlement_id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
        )`)
        .run(`INSERT INTO settlements(settlement)
          VALUES('Budapest'),('Budaörs'),('Nyíregyháza')
        `)
        .run(`INSERT INTO business_entities(entity)
          VALUES('Public limited company'),
            ('Limited liability company'),
            ('Privately held company')
        `)
        .run(`INSERT INTO partners(name, entity_id, vat, company_registration_number, settlement_id, address, phone, account_number, note)
          VALUES('First Company', 1, '12345678', 0123456789, 1, 'Petőfi utca 12', '+36201234567', '12345678-23456789-34567890', 'No comment'),
            ('Second Company', 2, '23456789', 1234567890, 2, 'Damjanich út 21', '+36202345678', '23456789-34567890-45678901', 'No comment'),
            ('Third Company', 3, '34567890', 2345678901, 3, 'Kiss körút 1.', '+36203456789', '34567890-45678901-56789012', 'No comment')
        `);
      });
    }
  });
};

const close = () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  }); 
}

module.exports = {
  initialize,
  close,
  db
}