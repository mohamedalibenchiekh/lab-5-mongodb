// TEST DATABASE CONNECTION

import Database from './src/config/database.js';

async function testConnection() {
  console.log('\n=================================');
  console.log('  MONGODB CONNECTION TEST');
  console.log('=================================\n');

  try {
    // Connect to database
    await Database.connect();

    console.log('\n✅ Connection test PASSED!');
    console.log('✅ MongoDB is ready to use\n');

    // Disconnect
    await Database.disconnect();
  } catch (error) {
    console.error('\n❌ Connection test FAILED!');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testConnection();