import { html, css, LitElement } from 'lit'
import { prefetch } from '@layer0/prefetch/window'

export class SimpleGreeting extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `

  static properties = {
    name: { type: String },
  }

  constructor() {
    super()
    this.name = 'Somebody'
  }

  render() {
    prefetch('/about')
    if (window.location.pathname === '/about') {
      return html`<p>About ${this.name}!</p>
        <br /><a href="/">Home</a>`
    }
    return html`<p>Hello, ${this.name}!</p>
      <br /><a href="/about">About</a>`
  }
}

customElements.define('simple-greeting', SimpleGreeting)
