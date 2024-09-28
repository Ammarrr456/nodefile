const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URI and port
const dbURI = 'mongodb+srv://ammar2:Street123@cluster0.rjfyq.mongodb.net/meatoes';
const PORT = 5000; // You can change this to process.env.PORT if you prefer

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Address Schema (updated)
const addressSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  fullName: { type: String, required: true },
  addressType: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);

// Save address endpoint (updated)
app.post('/api/addresses', async (req, res) => {
  const { mobileNumber, emailAddress, fullName, addressType } = req.body;

  // Validate incoming request
  if (!mobileNumber || !emailAddress || !fullName || !addressType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ message: 'Error saving address' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
