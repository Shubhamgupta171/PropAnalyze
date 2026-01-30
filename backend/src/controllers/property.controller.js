const propertyService = require('../services/property.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllProperties = catchAsync(async (req, res, next) => {
  const { properties, total, page, limit, totalPages } = await propertyService.getAllProperties(req.query);

  res.status(200).json({
    status: 'success',
    results: properties.length,
    pagination: {
      total,
      page,
      limit,
      totalPages
    },
    data: {
      properties,
    },
  });
});

exports.getProperty = catchAsync(async (req, res, next) => {
  const property = await propertyService.getPropertyById(req.params.id);

  if (!property) {
    return next(new AppError('No property found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      property,
    },
  });
});

exports.createProperty = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.images = req.files.map(file => file.path);
  }

  const newProperty = await propertyService.createProperty(req.body, req.user.id);


  res.status(201).json({
    status: 'success',
    data: {
      property: newProperty,
    },
  });
});

exports.updateProperty = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.images = req.files.map(file => file.path);
  }

  const updatedProperty = await propertyService.updateProperty(
    req.params.id,
    req.body,
    req.user.id,
    req.user.role
  );


  res.status(200).json({
    status: 'success',
    data: {
      property: updatedProperty,
    },
  });
});

exports.deleteProperty = catchAsync(async (req, res, next) => {
  await propertyService.deleteProperty(req.params.id, req.user.id, req.user.role);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getPropertiesWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400
      )
    );
  }

  const properties = await propertyService.getPropertiesWithinRadius(lat, lng, distance, unit);

  res.status(200).json({
    status: 'success',
    results: properties.length,
    data: {
      properties,
    },
  });
});
