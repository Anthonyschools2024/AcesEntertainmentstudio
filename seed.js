const bcrypt = require('bcrypt');
const sequelize = require('./db');
const Event = require('./Event.model.js');
const Signup = require('./Signup.model.js');
const Config = require('./Config.model.js');
const User = require('./User.model.js');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced! All tables for A.E.S. recreated.');

    await User.create({ username: 'admin', passwordHash: await bcrypt.hash('adminpass', 10), role: 'admin' });
    console.log('Admin user created!');

    await Event.create({
      name: 'Galactic Music Festival',
      date: '2025-10-26',
      description: 'A system-wide broadcast featuring the best musical talents from across the galaxy.'
    });
    await Config.create({
      key: 'ceoPhotoUrl',
      value: 'https://placehold.co/400x400/0a0a14/38bdf8?text=A.E.S.'
    });
    console.log('Initial A.E.S. event and config created!');
    
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
