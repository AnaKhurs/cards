import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Header} from "./Header/Header";
import {RoutesApp} from "./Routes/RoutesApp";
import {Provider} from "react-redux";
import {store} from "../store/store";

function App() {

    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Header/>
                    <RoutesApp/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
