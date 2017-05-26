/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Main from './app/Main.js';
export default class qrscan extends Component {
  render() {
    return <Main/>;
  }
}


AppRegistry.registerComponent('qrscan', () => qrscan);
