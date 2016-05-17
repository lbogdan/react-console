import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import Styles from './Styles'
import MessageList from './MessageList'

import { PromptIcon } from './Icons'

const containerStyle = {
  fontFamily: 'monospace',
  fontSize: 'small',
  overflow: 'auto',
  padding: 2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const iconStyle = {
  float: 'left',
  height: 9,
  marginTop: 5,
  marginLeft: 7,
  marginRight: 1,
}

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: [],
      history: [],
      index: 0
    }
    this._oldConsole = {}
    this._handleChange = this._handleChange.bind(this)
  }

  componentDidMount() {
    this._editor = this.refs.editor.getCodeMirror()
    this._editor.on('keydown', (editor, e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // up or down is pressed, go to prev or next message
        const index = e.keyCode === 38 ? this._getPrevIndex() : this._getNextIndex()
        this.setState({
          index,
          value: this.state.history[index] || ''
        })
      }

      if (e.keyCode === 13) {
        // enter is pressed, evaluate expression
        e.preventDefault()
        this._eval()
      }
    })
    // override console methods
    this._setUp()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data.length === prevState.data.length) {
      return
    }

    // scroll to bottom
    this.refs.input.scrollIntoView()
  }

  _addHistory(message) {
    this.setState({
      index: this.state.history.length + 1,
      history: [
        ...this.state.history,
        message
      ]
    })
  }

  _addMessage(type, message) {
    this.setState({
      data: [
        ...this.state.data,
        { type, message }
      ]
    })
  }

  _clearMessages() {
    this.setState({ data: [] })
  }

  _eval() {
    const { value } = this.state
    const text = value.trim()
    if (!text) return

    this._addHistory(text)
    this.setState({ value: '' })

    if (text === 'clear') {
      return this._clearMessages()
    }

    try {
      this._addMessage('self', text)
      this._addMessage('eval', eval.call(window, text))
    } catch(err) {
      this._addMessage('error', err)
    }
  }

  _generateNewMethod(method) {
    return (...args) => {
      // Call the old method
      this._oldConsole[method].apply(console, args)

      // Supported methods
      if (['log', 'info', 'error', 'warn', 'debug'].indexOf(method) === -1) {
        return
      }

      this._addMessage(method, args)
    }
  }

  _getNextIndex() {
    const { index, history } = this.state
    return index < history.length ? index + 1 : index
  }

  _getPrevIndex() {
    const { index } = this.state
    return index === 0 ? 0 : index - 1
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _overrideMethod(method) {
    this._oldConsole[method] = console[method]
    console[method] = this._generateNewMethod(method)
  }

  _setUp() {
    for (let method in console) {
      this._overrideMethod(method)
    }
  }

  render() {
    return (
      <div style={containerStyle}>
        <Styles/>
        <div>
          <MessageList data={this.state.data} />
          <div ref="input">
            <PromptIcon style={iconStyle} />
            <CodeMirror
              ref="editor"
              value={this.state.value}
              onChange={this._handleChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default Console
