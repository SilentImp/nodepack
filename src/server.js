import 'babel-polyfill';
import restify from 'restify';

const server = restify.createServer();
server.get({
  path: '/',
  name: 'Test answer',
},  async (req, res, next) => {
  res.status(200);
  res.send('OK');
  res.end();
  return next();
});

const PORT = process.env.PORT || 3050;
(async () => {
  console.log(`Server work on http://localhost:${PORT}`); // eslint-disable-line
  try {
    server.listen(PORT);
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
})();
