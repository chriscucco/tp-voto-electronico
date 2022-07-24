import React from 'react'
import ReactDOMServer from 'react-dom/server'
const LoginPage = require('./view')

exports.renderLogin = (req, res) => {
    const html = ReactDOMServer.renderToString(<LoginPage />);
    res.send(html);
};