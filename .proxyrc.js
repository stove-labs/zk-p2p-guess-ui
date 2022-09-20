module.exports = (app) => {
  app.use((req, res, next) => {
    // throw new Error('kalala');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
};
