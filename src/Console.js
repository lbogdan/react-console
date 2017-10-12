import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import debounce from 'debounce'
import Styles from './Styles'

import MessageList from './MessageList'
import Input from './Input'

const containerStyle = {
  fontFamily: 'monospace',
  fontSize: 'small',
  overflow: 'auto',
  padding: 2,
}

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    this.addMessage = this.addMessage.bind(this)
    this.clearMessages = this.clearMessages.bind(this)

    this._buffer = []
    this._updateData = debounce(this._updateData, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data.length === prevState.data.length) {
      return
    }

    // scroll to bottom
    findDOMNode(this.refs.input).scrollIntoView()
  }

  addMessage(type, message) {
    this._buffer.push({ type, message })
    this._updateData()
  }

  clearMessages() {
    this.setState({ data: [] })
  }

  _updateData() {
    if (this._buffer.length > 0) {
      const data = [
        ...this.state.data,
        ...this._buffer
      ]
      this.setState({ data })
      this._buffer = []
    }
  }

  render() {
    return (
      <div
        className="react-console"
        style={Object.assign({}, containerStyle, this.props.style)}>
        <Styles noFontawesome={this.props.noFontawesome} />
        <div>
          <MessageList data={this.state.data} />
          <Input
            ref="input"
            addMessage={this.addMessage}
            clearMessages={this.clearMessages} />
        </div>
      </div>
    )
  }
}

export default Console
