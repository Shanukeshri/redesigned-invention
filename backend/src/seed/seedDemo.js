import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import RenewablePotential from '../models/RenewablePotential.js';
import IoTDevice from '../models/IoTDevice.js';
import PolicyTarget from '../models/PolicyTarget.js';
import TrainingModule from '../models/TrainingModule.js';
import CarbonReport from '../models/CarbonReport.js';

const run = async () => {
  await connectDB();
  console.log('Seeding demo data...');

  await User.deleteMany({});
  const users = await User.create([
    { name: 'Demo Admin', email: 'admin@demo.local', password: await hash('password123'), role: 'admin', demo: true },
    { name: 'Demo Govt', email: 'govt@demo.local', password: await hash('password123'), role: 'govt', demo: true },
    { name: 'Demo SME', email: 'sme@demo.local', password: await hash('password123'), role: 'sme', demo: true },
    { name: 'Demo Investor', email: 'inv@demo.local', password: await hash('password123'), role: 'investor', demo: true },
    { name: 'Demo Citizen', email: 'citizen@demo.local', password: await hash('password123'), role: 'citizen', demo: true }
  ]);

  await Project.deleteMany({});
  await Project.create({
    _id: 'demo_proj_1',
    name: 'Demo Rooftop Solar — Block A',
    type: 'solar',
    ownerId: users[2]._id,
    capacityMW: 0.015,
    status: 'active',
    location: { lat: 23.0225, lng:72.5714, state: 'Gujarat', district: 'Ahmedabad' },
    funding: { required: 75000, raised: 50000 },
    startDate: new Date('2024-01-05'),
    documents: [],
    iotDeviceIds: ['demo_device_1'],
    verifiedBy: users[1]._id
  });

  await RenewablePotential.deleteMany({});
  await RenewablePotential.create({ state: 'Gujarat', district: 'Ahmedabad', estimatedMW: 1500, source: 'demo' });

  await IoTDevice.deleteMany({});
  await IoTDevice.create({
    deviceId: 'demo_device_1',
    type: 'meter',
    location: { lat: 23.0225, lng:72.5714, state: 'Gujarat', district: 'Ahmedabad' },
    timeSeries: Array.from({length: 30}, (_,i) => ({ ts: new Date(Date.now() - i*3600*1000), metrics: { powerKW: 1 + Math.random()*0.2 } }))
  });

  await PolicyTarget.deleteMany({});
  await PolicyTarget.create({ region: 'Gujarat', targetYear: 2030, targetMW: 10000, details: {} });

  await TrainingModule.deleteMany({});
  await TrainingModule.create({ title: 'Rooftop Solar Basics', description: 'Intro module', url: '#', tags: ['solar','rooftop'] });

  await CarbonReport.deleteMany({});
  await CarbonReport.create({ entityId: users[2]._id, projectId: 'demo_proj_1', periodStart: new Date('2024-01-01'), periodEnd: new Date('2024-01-31'), emissionsCO2eKg: 120, breakdown: { electricity: 120 }, createdBy: users[2]._id });

  console.log('Seeding complete. Exiting.');
  process.exit(0);
};

async function hash(pwd) {
  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pwd, salt);
}

run().catch(err => { console.error(err); process.exit(1); });
