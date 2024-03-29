const message = require("./model");

// get all Messages
const getmessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "try again later" });
  }
};

// Add one message
const addmessage = async (req, res) => {
  try {
    const { title, description, targetDate, achieved } = req.body;
    const newmessage = new message({ title, description, targetDate, achieved });
    await newmessage.save();
    res.status(201).json(newmessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get message by ID
const getmessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete message by ID
const deletemessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await message.findByIdAndDelete({ _id: id });
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    }
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all messages
const deleteAllmessages = async (req, res) => {
  try {
    const result = await message.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update message by ID
const updatemessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedmessage = req.body;
    const message = await message.findOneAndUpdate({ _id: id }, updatedmessage);
    if (!message) {
      return res.status(404).json({ message: "message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getmessages,
  addmessage,
  getmessage,
  deletemessage,
  deleteAllmessages,
  updatemessage,
};