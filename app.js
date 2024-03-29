const express = require("express");
const app = express();

const connectDB = require("./db");
const {
  getmessages,
  addmessage,
  getmessage,
  updatemessage,
  deletemessage,
  deleteAllmessages,
} = require("./controller");

//Important: will be discussed next week
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
// GET all messages
app.get("/messages", getmessages);

// POST a new message
app.post("/messages", addmessage);

// GET a single message
app.get("/messages/:id", getmessage);

// Update message using PUT
app.put("/messages/:id", updatemessage);

// DELETE a message
app.delete("/messages/:id", deletemessage);

// DELETE all message
app.delete("/messages", deleteAllmessages);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});