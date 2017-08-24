export default () => (req, res, next) => {
  res.setHeader('Cache-Control', 'public,max-age=31536000,no-cache');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
};