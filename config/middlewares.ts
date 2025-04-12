module.exports = [
  // Handles errors within the app
  'strapi::errors',
  
  // CORS configuration to allow requests from your frontend
  {
    name: 'strapi::cors',
    config: {
      // Replace with your frontend URL(s)
      origin: ['http://localhost:3000', 'http://your-frontend-domain.com'],
      // Allowed HTTP methods
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      // You can allow specific headers or use '*' to allow any
      headers: '*',
    },
  },
  
  // Other built-in Strapi middlewares
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
