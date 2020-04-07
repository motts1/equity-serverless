const Profile = require('./models/Profile');
const mongoose = require('mongoose');

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const profile = await Profile.create(JSON.parse(event.body));
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(profile),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    await mongoose.connection.close();
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.getOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('Profile Event: ', event);
  console.log('Profile Context: ', context);
  console.log('Profile Callback: ', callback);
  try {
    await mongoose.connect(process.env.DB);
    const profile = await Profile.find({ id: event.pathParameters.id });
    await mongoose.connection.close();
    console.log('Profile object: ', profile);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(profile),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    console.log('Profile error: ', err);
    await mongoose.connection.close();
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.getAll = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const users = await Profile.find();
    await mongoose.connection.close();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(users),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  } catch(err) {
    console.log('Error: ', err);
    await mongoose.connection.close();
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const profile = await Profile.findOneAndUpdate({ id: event.pathParameters.id }, JSON.parse(event.body), { new: true });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(profile),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    await mongoose.connection.close();
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const profile = await Profile.findOneAndRemove({ id: event.pathParameters.id });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Removed profile with id: ' + profile._id,
        profile: profile
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
  catch (err) {
    await mongoose.connection.close();
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    });
  }
};