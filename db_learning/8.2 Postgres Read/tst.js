import fs from 'fs';
import csv from 'csv-parser';
import pg from "pg";

const client = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  password: 'dbjk12',
  database: 'world',
  port: 5432
});

client.connect();

const csvData = [];

fs.createReadStream('./capitals.csv')
  .pipe(csv())
  .on('data', (row) => {
    csvData.push(row);
  })
  .on('end', () => {
    insertDataIntoSql(csvData);
  });

async function insertDataIntoSql(data) {
  for (const row of data) {
    try {
      await client.query('INSERT INTO capitals (pais, capital) VALUES ($1, $2)', [row.pais, row.capital]);
    } catch (err) {
      console.error('Error inserting data:', err);
    }
  }

  console.log("Importação finalizada");
}