const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:13458';

const context =  [
    "/weatherforecast",
    "/products",
    "/api/medicine/getAllMedicine",
    "/api/medicine/addMedicine",
    "/api/medicine/updateMedicine",
    "/api/medicine/deleteMedicineById",
    "/api/medicine/searchByUse",
    "/api/medicine/generateReport",
    "/api/cartItem/getAllCartItems",
    "/api/cartItem/removeCartItem",
    "/api/cartItem/addCartItem",
    "/api/cart/checkout"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
