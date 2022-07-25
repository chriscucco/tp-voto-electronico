const ReactDOM = require('react-dom/client');
const React = require('react');
const LoginPage = require('./login')

exports.renderLogin = (req, res) => {
    const html = ReactDOM.hydrateRoot(<LoginPage />,document.getElementById('root'));
    res.send(html);
};