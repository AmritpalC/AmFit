const mongoose = require('mongoose')

async function connectDatabase() {
    await mongoose.connect(process.env.DATABASE_URL)
    const db = mongoose.connection
    console.log(`Database connected to ${db.name} on ${db.host}:${db.port} 🎮`)
}

connectDatabase()