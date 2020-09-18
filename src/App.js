import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './components/Home/Home'
export default class App extends React.Component{
    render(){
        return(
            <div className="App">
                <Route path="/home" component={Home}></Route>
            </div>
        )
    }
}
