// middleware/logger.js
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method; // GET, POST
  const url = req.originalUrl; // /api/members?name=Rana
  const ip = req.ip; // ip for one of us

  console.log(`[${timestamp}] ${method} ${url} - from IP: ${ip}`);
  next();
};

export default logger;