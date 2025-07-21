// Usage: node addUser.js <username> <password> <role>
// Example: node addUser.js user1 mypass InputUser

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/steam_management';

async function addUser(username, password, role) {
  if (!username || !password || !role) {
    console.error('Usage: node addUser.js <username> <password> <role>');
    process.exit(1);
  }
  if (!['InputUser', 'DashboardUser'].includes(role)) {
    console.error('Role must be InputFormUser or DashboardUser');
    process.exit(1);
  }
  await mongoose.connect(MONGO_URI);
  const existing = await User.findOne({ username });
  if (existing) {
    console.error('User already exists');
    process.exit(1);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  console.log('User added successfully');
  mongoose.disconnect();
}

const [,, username, password, role] = process.argv;
addUser(username, password, role);
