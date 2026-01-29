const db = require('../config/db');
const { randomUUID } = require('crypto');

const agentId = 'bcdb8c9a-343b-498c-b4e7-aa90f0c7ace1'; 

const properties = [
  {
    title: 'Modern Loft in SoMa',
    price: 1250000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    address: '456 Mission St, San Francisco, CA',
    coords: [-122.3994, 37.7849],
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Victorian Gem near Alamo Square',
    price: 2850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    address: '789 Steiner St, San Francisco, CA',
    coords: [-122.4324, 37.7766],
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Cozy Condo in Nob Hill',
    price: 895000,
    beds: 1,
    baths: 1,
    sqft: 750,
    address: '101 Pine St, San Francisco, CA',
    coords: [-122.4124, 37.7926],
    img: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Luxury High-Rise with Bay Views',
    price: 4200000,
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    address: '200 Folsom St, San Francisco, CA',
    coords: [-122.3904, 37.7886],
    img: 'https://images.unsplash.com/photo-1512918766674-ed62b9a39ca2?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Renovated Multi-Family in Mission',
    price: 1950000,
    beds: 6,
    baths: 4,
    sqft: 4000,
    address: '555 Guerrero St, San Francisco, CA',
    coords: [-122.4244, 37.7616],
    img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Penthouse in Pacific Heights',
    price: 6500000,
    beds: 5,
    baths: 6,
    sqft: 5500,
    address: '2200 Broadway, San Francisco, CA',
    coords: [-122.4344, 37.7946],
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Charming Cottage in Noe Valley',
    price: 1650000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    address: '150 24th St, San Francisco, CA',
    coords: [-122.4284, 37.7516],
    img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Sunset District Single Family',
    price: 1100000,
    beds: 3,
    baths: 2,
    sqft: 1600,
    address: '1420 20th Ave, San Francisco, CA',
    coords: [-122.4774, 37.7616],
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Modern Studio in Dogpatch',
    price: 675000,
    beds: 0,
    baths: 1,
    sqft: 550,
    address: '300 Indiana St, San Francisco, CA',
    coords: [-122.3914, 37.7596],
    img: 'https://images.unsplash.com/photo-1536376074432-bf1dc1d5bc3f?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Gated Estate in Presidio Heights',
    price: 12500000,
    beds: 7,
    baths: 8,
    sqft: 8500,
    address: '3500 Jackson St, San Francisco, CA',
    coords: [-122.4504, 37.7896],
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
      title: 'Fixer Upper in Bernal Heights',
      price: 995000,
      beds: 3,
      baths: 1,
      sqft: 1200,
      address: '120 Cortland Ave, San Francisco, CA',
      coords: [-122.4164, 37.7396],
      img: 'https://images.unsplash.com/photo-1512915922686-57c11ed9d6f3?auto=format&fit=crop&w=800&q=80',
      status: 'active'
  },
  {
    title: 'Contemporary Waterfront Condo',
    price: 1550000,
    beds: 2,
    baths: 2,
    sqft: 1300,
    address: '100 Embarcadero, San Francisco, CA',
    coords: [-122.3934, 37.7956],
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'North Beach Italianate Flat',
    price: 1875000,
    beds: 3,
    baths: 2,
    sqft: 1900,
    address: '500 Columbus Ave, San Francisco, CA',
    coords: [-122.4084, 37.8006],
    img: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Mid-Century Modern in Twin Peaks',
    price: 2200000,
    beds: 4,
    baths: 3,
    sqft: 2500,
    address: '88 Christmas Tree Point Rd, San Francisco, CA',
    coords: [-122.4464, 37.7546],
    img: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Industrial Stylish Live/Work Space',
    price: 1150000,
    beds: 1,
    baths: 1.5,
    sqft: 1600,
    address: '888 Brannan St, San Francisco, CA',
    coords: [-122.4034, 37.7716],
    img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Richmond District Edwardian',
    price: 1750000,
    beds: 4,
    baths: 2,
    sqft: 2100,
    address: '320 10th Ave, San Francisco, CA',
    coords: [-122.4684, 37.7816],
    img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Ocean View Beach House',
    price: 1450000,
    beds: 3,
    baths: 2,
    sqft: 1500,
    address: '22 Ocean Beach Pkwy, San Francisco, CA',
    coords: [-122.5084, 37.7616],
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Financial District Sleek Studio',
    price: 725000,
    beds: 0,
    baths: 1,
    sqft: 600,
    address: '50 California St, San Francisco, CA',
    coords: [-122.3984, 37.7936],
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Castro Hill Panoramic View Home',
    price: 3100000,
    beds: 4,
    baths: 4,
    sqft: 3500,
    address: '150 States St, San Francisco, CA',
    coords: [-122.4384, 37.7616],
    img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Hayes Valley Boutique Condo',
    price: 1100000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    address: '300 Ivy St, San Francisco, CA',
    coords: [-122.4244, 37.7766],
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Cole Valley Family Home',
    price: 2450000,
    beds: 5,
    baths: 3,
    sqft: 2900,
    address: '120 Cole St, San Francisco, CA',
    coords: [-122.4504, 37.7716],
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Glen Park Modern Architectural',
    price: 3750000,
    beds: 4,
    baths: 4.5,
    sqft: 4200,
    address: '50 Glen Ave, San Francisco, CA',
    coords: [-122.4344, 37.7346],
    img: 'https://images.unsplash.com/photo-1600585154526-990dcea4d4d9?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Pending Sale in Haight Ashbury',
    price: 900000,
    beds: 2,
    baths: 1,
    sqft: 950,
    address: '1500 Haight St, San Francisco, CA',
    coords: [-122.4484, 37.7696],
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    status: 'pending'
  },
  {
    title: 'Recently Sold in Marina',
    price: 2500000,
    beds: 3,
    baths: 2.5,
    sqft: 2000,
    address: '2200 Chestnut St, San Francisco, CA',
    coords: [-122.4364, 37.8006],
    img: 'https://images.unsplash.com/photo-1600596542815-3ad179b868bd?auto=format&fit=crop&w=800&q=80',
    status: 'sold'
  },
  {
    title: 'Affordable Condo in Outer Mission',
    price: 500000,
    beds: 1,
    baths: 1,
    sqft: 600,
    address: '5000 Mission St, San Francisco, CA',
    coords: [-122.4394, 37.7216],
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Grand Estate in Sea Cliff',
    price: 8000000,
    beds: 6,
    baths: 7,
    sqft: 6000,
    address: '800 El Camino Del Mar, San Francisco, CA',
    coords: [-122.4934, 37.7876],
    img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  },
  {
    title: 'Compact Studio in Tenderloin',
    price: 400000,
    beds: 0,
    baths: 1,
    sqft: 400,
    address: '400 Eddy St, San Francisco, CA',
    coords: [-122.4134, 37.7836],
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    status: 'active'
  }
];

async function seed() {
  try {
    console.log('Clearing existing properties...');
    await db.query('DELETE FROM properties');
    
    for (const p of properties) {
      const id = randomUUID();
      const query = `
        INSERT INTO properties 
        (id, title, price, beds, baths, sqft, location, agent_id, images, ratings_average, ratings_quantity, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      
      const values = [
        id,
        p.title,
        p.price,
        p.beds,
        p.baths,
        p.sqft,
        JSON.stringify({
          address: p.address,
          coordinates: p.coords
        }),
        agentId,
        [p.img],
        4.5,
        1,
        p.status
      ];
      
      await db.query(query, values);
    }
    
    console.log(`Seeded ${properties.length} properties successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding properties:', error);
    process.exit(1);
  }
}

seed();
