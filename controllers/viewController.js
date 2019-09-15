const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour Data from Collection
  const tours = await Tour.find();

  // 2) Bild Template

  // 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    tours
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour'
  });
};

exports.getBase = (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'vivek'
  });
};
