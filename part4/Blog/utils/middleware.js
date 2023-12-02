const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  
  const authorizationHeader = request.get('Authorization');

  if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer '))
  { 
    const token = authorizationHeader.substring(7);
    request.token = token;
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken.id)
    {
      const user = await User.findById(decodedToken.id);
      console.log(user)
      if (user){
        request.user = user;
      }
    }   
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}