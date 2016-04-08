import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import './Console.css'
import MessageList from './MessageList'

import { PromptIcon } from './Icons'

const containerStyle = {
  fontFamily: 'monospace',
  fontSize: 'small'
}

const iconStyle = {
  float: 'left',
  height: 12,
  marginTop: 6,
  marginRight: 5
}

class Console extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      history: []
    }
    this._handleChange = this._handleChange.bind(this)
  }

  componentDidMount() {
    this._editor = this.refs.editor.getCodeMirror()
    this._editor.on('keydown', (editor, e) => {
      if (e.keyCode === 13) {
        // enter is pressed, evaluate expression
        this._eval()
        e.preventDefault()
        this.setState({ value: '' })
      }
    })
    this._setUp()
  }

  _addMessage(type, message) {
    this.setState({
      history: [
        ...this.state.history,
        { type, message }
      ]
    })
  }

  _clearMessages() {
    this.setState({ history: [] })
  }

  _eval() {
    const { value } = this.state
    if (value.trim() === 'clear') {
      return this._clearMessages()
    }

    try {
      this._addMessage('self', value)
      this._addMessage('eval', eval(value))
    } catch(err) {
      this._addMessage('error', err)
    }
  }

  _handleChange(value) {
    this.setState({ value })
  }

  _setUp() {
    const types = ['log', 'info', 'error', 'warn']

    types.forEach(type => {
      const proxyKey = `oooo-${type}`
      console[proxyKey] = console[type]
      console[type] = (...args) => {
        this._addMessage(type, args)
        console[proxyKey](...args)
      }
    })
  }

  render() {
    const options = {
      mode: 'javascript'
    }
    const { history } = this.state

    return (
      <div style={containerStyle}>
        <MessageList data={history} />
        <div>
          <PromptIcon style={iconStyle} />
          <CodeMirror
            ref="editor"
            value={this.state.value}
            onChange={this._handleChange} />
        </div>
      </div>
    )
  }
}

export default Console
