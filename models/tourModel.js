const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: true,
      trim: true
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Document middleware
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
