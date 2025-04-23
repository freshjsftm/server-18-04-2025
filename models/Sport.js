const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 64,
    },
    isOlimpic: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null, // 'folder/fileName.jpg'
    },
  },
  { timestamps: true }
);

const Sport = mongoose.model('Sport', sportSchema);
module.exports = Sport;
