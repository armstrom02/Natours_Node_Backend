const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name'],
    unique: true,
    trim: true
  },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, 'A Tour must have a price'] },
  priceDiscount: Number,
  duration: { type: Number, required: [true, 'A Tour must have a duration'] },
  difficulty: {
    type: String,
    required: [true, 'A Tour must have a difficulty']
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A Tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour must have a group size']
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour must have a image Cover']
  },
  images: [String],
  createAt: { type: Date, default: Date.now(), select: false },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
