const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/* -------------------------------------------------------------------------- */
/*                               Tour Controller                              */
/* -------------------------------------------------------------------------- */

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.reqestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.reqestTime,
    results: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find(ele => ele.id == req.params.id);
  res.status(200).json({
    status: 'Success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  res.status(201).json({
    status: 'successfully patched'
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
};
