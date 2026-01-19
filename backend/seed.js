const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('../src/models/property.model');
const User = require('../src/models/user.model');

dotenv.config({ path: './.env' });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('DB Connected for Seeding');

    // 1. Create a default Agent
    await User.deleteMany();
    await Property.deleteMany();

    const agent = await User.create({
      name: 'Alex Morgan',
      email: 'alex@propanalyze.com',
      password: 'password123',
      role: 'agent'
    });

    console.log(`Created Agent: ${agent.name}`);

    // 2. Create Properties matching UI
    const properties = [
      {
        title: 'Modern Family Home',
        price: 450000,
        beds: 3,
        baths: 2,
        sqft: 1850,
        yearBuilt: 2005,
        status: 'active',
        description: 'Beautiful modern home in San Francisco.',
        location: {
          type: 'Point',
          coordinates: [-122.4194, 37.7749], // SF
          address: '123 Main St, San Francisco, CA'
        },
        agentId: agent._id,
        images: ['https://images.unsplash.com/photo-1600596542815-2495db9b639e?w=800']
      },
      {
        title: 'Austin Fixer Upper',
        price: 450000, // Matching the detailed view image
        beds: 3,
        baths: 2,
        sqft: 1500,
        yearBuilt: 2005,
        status: 'active',
        description: 'Great potential investment in Austin.',
        location: {
          type: 'Point',
          coordinates: [-97.7431, 30.2672], // Austin
          address: '123 Main St, Austin, TX'
        },
        agentId: agent._id,
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800']
      },
      {
        title: 'Downtown Condo',
        price: 620000,
        beds: 2,
        baths: 2,
        sqft: 1200,
        yearBuilt: 2018,
        status: 'active',
        description: 'Luxury condo in the heart of the city.',
        location: {
          type: 'Point',
          coordinates: [-74.006, 40.7128], // NYC
          address: '442 Oak Lane, New York, NY'
        },
        agentId: agent._id,
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800']
      }
    ];

    await Property.create(properties);
    console.log('Properties Seeded Successfully matching UI designs');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
