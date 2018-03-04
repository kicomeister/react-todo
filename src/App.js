import React, { Component } from 'react';
import List from './Components/List';
import './Styles/style.css';



class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="site-header">To Do List</h1>
                <div className="container">
                    <List />
                </div>
            </div>
        );
    }
}

export default App;
