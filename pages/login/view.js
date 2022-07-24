import React from 'react'
import ReactDOMServer from 'react-dom/server'
import './Style.css'


class LoginPage extends React.Component{
    render() {
        return (
            <div className='App'>
                <p className='App'>
                    HELLO!
                </p>
            </div>
        )
    }
}

module.exports = LoginPage;