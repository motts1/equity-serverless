'use strict';
const Order = require('./models/Order');
const connectToDatabase = require('./db');

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return connectToDatabase()
        .then(() => Order.create(JSON.parse(event.body)))
        .then(order =>
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(order),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
        }
    })
 )
    .catch(err => 
    callback(null, {
        statusCode: err.statusCode || 500,
        body: JSON.stringify(err),
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      );
  };

  module.exports.getOrder = (event, context, callback) => {
      context.callbackWaitsForEmptyEventLoop = false;
      console.log('Order Event: ', event);
  console.log('Order Context: ', context);
  console.log('Order Callback: ', callback);
      return connectToDatabase()
      .then(() => Order.find({id: event.pathParameters.id}))
      .then(order => {
          console.log('Order Object', order)
          callback(null, {
              statusCode: 200,
              body: JSON.stringify(order),
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true   
              }
          })
      })
      .catch(err => {
          console.log('Order Error', err)
          callback(null, {
              statusCode: err.statusCode || 500,
              body: JSON.stringify(err),
              headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
              }
          })
      });
  };

  module.exports.getAllOrders = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return connectToDatabase()
      .then(() => Order.find())
      .then(orders =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(orders),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify(err),
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      );
  };


  module.exports.updateOrder = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return connectToDatabase()
      .then(() =>
        Order.findOneAndUpdate(
          { id: event.pathParameters.id },
          JSON.parse(event.body),
          { new: true }
        )
      )
      .then(order =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(order),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify(err),
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      );
  };
  
  module.exports.deleteOrder = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return connectToDatabase()
      .then(() => Order.findOneAndRemove({ id: event.pathParameters.id }))
      .then(order =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed user with id: ' + order._id,
           order:order
          }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify(err),
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          }
        })
      );
  };
