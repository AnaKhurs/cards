import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {store} from './bll/store';
import createTheme from '@mui/material/styles/createTheme';
import {ThemeProvider} from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#4C4261'
        },
        secondary: {
            main: '#D1C4E9'
        },
        success: {
            main: '#007556'
        },
    }
})


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <HashRouter>
                <App/>
            </HashRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
