import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import Console from '../index'

class AutoConsole extends React.Component {
  componentDidMount() {
    this.orig = {};
    ['log', 'info', 'warn', 'error', 'debug'].forEach((method) => {
      this.orig[method] = console[method];
      console[method] = (...args) => {
        this.console.addMessage(method, args);
        this.orig[method].apply(console, args);
      }
    });
  }

  componentWillUnmount() {
    Object.keys(this.orig).forEach((method) => {
      console[method] = this.orig[method];
    })
  }

  render() {
    return (
      <Console ref={(c) => this.console = c} {...this.props}/>
    )
  }
}

storiesOf('React Console', module)
  .add('default view', () => (
    <AutoConsole/>
  ))
  .add('not load fontawesome', () => (
    <AutoConsole noFontawesome={true} />
  ))
  .add('custom styles', () => {
    const style = {
      backgroundColor: 'yellow',
      width: 500,
      height: 300,
    }
    return (
      <AutoConsole style={style} />
    )
  })
