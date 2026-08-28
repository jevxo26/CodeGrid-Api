const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_xMje3BV9qETQ@ep-fragrant-water-ayvhd1i9-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

async function run() {
  await client.connect();
  try {
    await client.query('DROP TABLE IF EXISTS casestudies CASCADE;');
    await client.query('DROP TABLE IF EXISTS orders CASCADE;');
    console.log('Tables casestudies and orders dropped successfully');
  } catch (e) {
    console.error('Error dropping tables:', e);
  } finally {
    await client.end();
  }
}

run();
