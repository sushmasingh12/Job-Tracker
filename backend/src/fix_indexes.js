import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function fixIndexes() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobtracker');
    
    const collection = mongoose.connection.collection('interviewpreps');
    
    console.log('Checking for old clashing index: user_1_job_1...');
    const indexes = await collection.indexes();
    const hasOldIndex = indexes.find(idx => idx.name === 'user_1_job_1');

    if (hasOldIndex) {
      console.log('Dropping old index "user_1_job_1"...');
      await collection.dropIndex('user_1_job_1');
      console.log('✅ Successfully removed the clashing index!');
    } else {
      console.log('ℹ️ Old index "user_1_job_1" not found. It might have been already removed.');
    }

    console.log('\nChecking for other clashing indexes...');
    const hasOldManualIndex = indexes.find(idx => idx.name === 'user_1_isManual_1');
    if (hasOldManualIndex) {
      console.log('Dropping old index "user_1_isManual_1"...');
      await collection.dropIndex('user_1_isManual_1');
      console.log('✅ Successfully removed the clashing manual index!');
    }

    console.log('\nYour database is now ready for multiple manual profiles!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing indexes:', error);
    process.exit(1);
  }
}

fixIndexes();
