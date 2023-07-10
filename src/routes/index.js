// src/routes/index.js

const express = require('express');

// Version and author from package.json
const { version, author } = require('../../package.json');

// Use response template for sending response bodies
const { createSuccessResponse } = require('../response');

// Create a router that we can use to mount our API
const router = express.Router();

// Get the server hostname
const { hostname } = require('os');

// Authentication middleware
const { authenticate, roleAuthenticate } = require('../authorization/jwt');

/**
 * Expose all of our API routes on /v1/* to include an API version.
 */

// Login route
router.use('/login', require('./api/login'));

// Register route
router.use('/register', require('./api/register'));

// Customer route
router.use('/customer', authenticate(), require('./api/customer'));

// Employee route
router.use('/employee', authenticate(), roleAuthenticate(), require('./api/employee'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Clients shouldn't cache this response (always request it fresh)
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#controlling_caching
  res.setHeader('Cache-Control', 'no-cache');

  // Send a 200 'OK' response with info about our repo
  res.status(200).json(
    createSuccessResponse({
      author,
      githubUrl: 'https://github.com/mightycorn/fragments',
      version,
      hostname: hostname(),
    })
  );
});

module.exports = router;
