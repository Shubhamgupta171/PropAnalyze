const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super-secret-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    countryCode: req.body.countryCode,
    role: req.body.role, // Allow role for testing
    plan: req.body.plan
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findByEmail(email);

  if (!user || !(await User.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = {};
  const fieldMapping = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    countryCode: 'country_code',
    title: 'title'
  };

  Object.keys(req.body).forEach(el => {
    if (fieldMapping[el]) filteredBody[fieldMapping[el]] = req.body[el];
  });

  if (req.file) filteredBody.photo = req.file.path;

  // 3) Update user document
  const updatedUser = await User.update(req.user.id, filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const { propertyId } = req.body;
  
  if (!propertyId) {
    return next(new AppError('Property ID is required', 400));
  }

  // Reload user to get fresh favorites
  const user = await User.findById(req.user.id);
  let favorites = user.favorites || [];
  
  // Ensure favorites is an array
  if (!Array.isArray(favorites)) favorites = [];
  
  // Convert propertyId to string for consistent comparison if needed, 
  // but usually IDs are strings or integers. Let's handle both string/int mix.
  const strFavorites = favorites.map(String);
  const strId = String(propertyId);
  
  const index = strFavorites.indexOf(strId);
  
  if (index === -1) {
    favorites.push(propertyId); // Add
  } else {
    // Remove by index from original array (assuming 1-to-1 conversion preservation or just filter)
    favorites = favorites.filter(fav => String(fav) !== strId);
  }

  const updatedFavorites = await User.updateFavorites(req.user.id, favorites);

  res.status(200).json({
    status: 'success',
    data: {
      favorites: updatedFavorites
    }
  });
});
// Protect middleware moved to ../middlewares/auth.middleware.js
