
const path = require('path')
const { StaticRouter } = require("react-router-dom");
const ReactDOMServer = require('react-dom/server');




// https://www.freecodecamp.org/news/demystifying-reacts-server-side-render-de335d408fe4/
// https://alligator.io/react/server-side-rendering/
module.exports.redirect = (res)=>{
  const app = ReactDOMServer.renderToString('<App />');

  const indexFile = path.resolve(__dirname + '/ui/build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root" /*style='color: rgba(0,0,0,0)*/'>${app}</div>`))
  });
}
