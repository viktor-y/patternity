import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createTheme } from '../src/utils/themeable';

import * as imports from '../lib';

import Icon from '../src/icon';

import Button from '../lib/button2';
import SplitButtonDropdown from '../lib/split-button-dropdown';

// Import webfonts

const theme = {
  themeColorPrimary: 'orange'
};

const Theme = createTheme(theme);

class App extends Component {
  render() {
    return <div>
      <SplitButtonDropdown title="hello there bob">
      </SplitButtonDropdown>
    </div>;
  }
}

React.render(React.createElement(App), document.getElementById('root'))
