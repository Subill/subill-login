import React from 'react';
import ReactDOM from 'react-dom';
// import '../css/servicebot--colors.css';
// import '../css/servicebot--form-elements.css';
// import '../css/servicebot--layout.css';
// import '../css/servicebot--text-elements.css';
import ServicebotCheckoutEmbed from './SubillLogin';
import { AppContainer } from 'react-hot-loader'

// ReactDOM.render(<App />, document.getElementById('root'));

const Login = (config) => {
    if(config.useAsComponent){
        return <ServicebotCheckoutEmbed {...config}/>
    }
    ReactDOM.render(<ServicebotCheckoutEmbed {...config} external={true} />, config.selector);
}


if (module.hot) {
    module.hot.accept('./SubillLogin.js', () => {
        const NextApp = require('./SubillLogin.js').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}

export default Login
