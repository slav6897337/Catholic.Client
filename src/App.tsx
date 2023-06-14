import React, { Component } from 'react';

import './custom.css';
import './fonts.css';
import Navigation from './Navigation/Navigation';
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";
import Header from "./components/Header";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Header />
      <NavMenu />
        <Navigation />
        <Footer />
      </div>
    );
  }
}
