import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Header} from "./Header/Header";
import {RoutesApp} from "./Routes/RoutesApp";

function App() {

    return (
        <div className="App">
            //hr, provider
            <HashRouter>

                <Header/>
                <RoutesApp/>

            </HashRouter>
        </div>
    );
}

export default App;
