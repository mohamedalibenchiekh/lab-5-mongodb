// TEST DATABASE QUERIES
// Examples of MongoDB queries with Mongoose

import Database from './src/config/database.js';
import { Event, User } from './src/models/index.js';
import EventService from './src/services/eventService.js';
import UserService from './src/services/userService.js';

async function testQueries() {
  console.log('\n=================================');
  console.log('  DATABASE QUERIES TEST');
  console.log('=================================\n');

  try {
    // Connect to database
    await Database.connect();

    // First, create test data if none exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('📝 Creating test users...');
      await UserService.createUser({
        name: 'John Organizer',
        email: 'john@example.com',
        role: 'organizer',
      });
      await UserService.createUser({
        name: 'Jane Attendee',
        email: 'jane@example.com',
        role: 'user',
      });
      console.log('✅ Test users created\n');
    }

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      console.log('📝 Creating test events...');
      const users = await User.find();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      await EventService.createEvent(
        {
          title: 'Tech Conference 2026',
          description: 'Annual technology conference',
          date: futureDate,
          location: 'Sfax',
          capacity: 500,
        },
        users[0]._id
      );
      console.log('✅ Test events created\n');
    }

    // Test 1: Find upcoming events
    console.log('📊 1. Finding upcoming events...');
    const upcoming = await Event.findUpcoming().limit(3);
    console.log(`   Found ${upcoming.length} upcoming events\n`);

    // Test 2: Find by location
    console.log('📊 2. Finding events by location (Sfax)...');
    const sfaxEvents = await Event.findByLocation('Sfax');
    console.log(`   Found ${sfaxEvents.length} events in Sfax\n`);

    // Test 3: Filtering with pagination
    console.log('📊 3. Filtering events with pagination...');
    const result = await EventService.getAllEvents({ status: 'upcoming' }, 1, 5);
    console.log(`   Page 1: ${result.events.length} events`);
    console.log(`   Total: ${result.total} events\n`);

    // Test 4: Count events
    console.log('📊 4. Counting total events...');
    const totalEvents = await Event.countDocuments();
    console.log(`   Total events in database: ${totalEvents}\n`);

    // Test 5: Count by status
    console.log('📊 5. Counting by status...');
    const upcomingCount = await Event.countDocuments({ status: 'upcoming' });
    const completedCount = await Event.countDocuments({ status: 'completed' });
    console.log(`   Upcoming: ${upcomingCount}`);
    console.log(`   Completed: ${completedCount}\n`);

    // Test 6: Get statistics using aggregation
    console.log('📊 6. Event statistics (aggregation)...');
    const stats = await Event.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalCapacity: { $sum: '$capacity' },
          totalAttendees: { $sum: '$attendees' },
        },
      },
    ]);
    console.log('   Statistics:');
    stats.forEach((stat) => {
      console.log(`   - ${stat._id}: ${stat.count} events`);
    });
    console.log('');

    // Test 7: Find users by role
    console.log('📊 7. Finding users by role...');
    const organizers = await User.findByRole('organizer');
    console.log(`   Found ${organizers.length} organizers\n`);

    console.log('✅ ALL QUERIES SUCCESSFUL!\n');

    await Database.disconnect();
  } catch (error) {
    console.error('❌ Query test failed:', error.message);
    process.exit(1);
  }
}

testQueries();