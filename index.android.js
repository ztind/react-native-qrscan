/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Root from './app/Main.js';
export default class qrscan extends Component {
  render() {
    return <Root/>;
  }
}


AppRegistry.registerComponent('qrscan', () => qrscan);
