import React, { Component } from 'react';

import './App.scss';

import { Provider } from 'react-redux';
import configureStore from './_helpers/store';
// import { store } from './_helpers/store';


import {StockChart} from "./_container/stock-chart.container"

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div className="container">
            <div className="row">
              <StockChart />
            </div>
          </div>
          
        </Provider>
      </div>
    );
  }
}

export default App;
