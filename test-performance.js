// PERFORMANCE TEST SCRIPT
import Database from './src/config/database.js';
import { Event, User } from './src/models/index.js';
import EventService from './src/services/eventService.js';

async function testPerformance() {
  console.log('\n⚡ PERFORMANCE TESTS\n');
  
  await Database.connect();

  // Test 1: Insert performance
  console.log('📝 Test 1: Insert Performance');
  const startInsert = Date.now();
  
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push(await User.create({
      name: `User ${i}`,
      email: `user${i}@test.com`,
      role: 'user'
    }));
  }
  
  const insertTime = Date.now() - startInsert;
  console.log(`   Inserted 100 users in ${insertTime}ms`);
  console.log(`   Average: ${insertTime / 100}ms per user\n`);

  // Test 2: Query with index
  console.log('🔍 Test 2: Query with Index');
  const startQuery = Date.now();
  
  await User.findByRole('user').limit(50);
  
  const queryTime = Date.now() - startQuery;
  console.log(`   Query with index: ${queryTime}ms\n`);

  // Test 3: Aggregation performance
  console.log('📊 Test 3: Aggregation Performance');
  const startAgg = Date.now();
  
  await Event.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  const aggTime = Date.now() - startAgg;
  console.log(`   Aggregation: ${aggTime}ms\n`);

  // Test 4: Concurrent operations
  console.log('🔄 Test 4: Concurrent Operations');
  const startConcurrent = Date.now();
  
  await Promise.all([
    Event.find().limit(10),
    User.find().limit(10),
    Event.countDocuments(),
    User.countDocuments()
  ]);
  
  const concurrentTime = Date.now() - startConcurrent;
  console.log(`   4 concurrent operations: ${concurrentTime}ms\n`);

  console.log('✅ Performance tests completed!\n');
  
  await Database.disconnect();
}

testPerformance().catch(console.error);