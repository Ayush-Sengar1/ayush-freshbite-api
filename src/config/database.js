const mongoose=require('mongoose');const env=require('./env');const state={connected:false};
async function connectDatabase(){if(!env.mongoUri){console.warn('MongoDB URI not configured; using local in-memory adapter.');return false}try{await mongoose.connect(env.mongoUri);state.connected=true;console.log('MongoDB connected');return true}catch(error){console.warn('MongoDB unavailable; using local in-memory adapter:',error.message);return false}}
module.exports={state,connectDatabase};
