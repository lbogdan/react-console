import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import Console from '../index'

class DefaultView extends React.Component {
  componentDidMount() {
    this.oldInfo = console.info;
    console.info = (...args) => {
      this.console.addMessage('info', args);
      this.oldInfo.apply(console, args);
    }
  }

  render() {
    return (
      <Console ref={(c) => this.console = c} />
    )
  }
}

storiesOf('React Console', module)
  .add('default view', () => (
    <DefaultView/>
  ))
  .add('not load fontawesome', () => (
    <Console noFontawesome={true} />
  ))
  .add('custom styles', () => {
    const style = {
      backgroundColor: 'yellow',
      width: 500,
      height: 300,
    }
    return (
      <Console style={style} />
    )
  })
