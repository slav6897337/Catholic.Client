import React, {Component} from 'react';
import './custom.css';

import Navigation from './Navigation/Navigation';

import Footer from "./Components/PageElements/Footer";
import Error from "./Components/PageElements/Error";
import Popup from "./Components/PopUp/Popup";
import Logo from "./Components/PageElements/Logo";
import NavMenu from "./Components/PageElements/NavMenu";
import StickyHeader from "./Components/PageElements/StickyHeader";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <StickyHeader/>
        <Logo/>
        <NavMenu/>
        <Navigation/>
        <Footer/>
        <Popup />
        <Error/>
      </div>
    );
  }
}
