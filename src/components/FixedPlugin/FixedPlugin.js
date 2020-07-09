/*!
=========================================================
* Black Dashboard React v1.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from 'react'

// reactstrap components
import { Button } from 'reactstrap'

class FixedPlugin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: 'dropdown show-dropdown show',
      icon: 'fa-sun',
    }
  }
  handleClick = () => {
    if (this.state.classes === 'dropdown show-dropdown') {
      this.setState({ ...this.state, classes: 'dropdown show-dropdown show' })
    } else {
      this.setState({ ...this.state, classes: 'dropdown show-dropdown' })
    }
  }
  activateMode = (mode) => {
    switch (mode) {
      case 'light':
        document.body.classList.add('white-content')
        this.setState({ ...this.state, icon: 'fa-moon' })
        break
      default:
        document.body.classList.remove('white-content')
        this.setState({ ...this.state, icon: 'fa-sun' })
        break
    }
  }
  render() {
    return (
      <div className="fixed-plugin">
        <div className={this.state.classes}>
          <div onClick={() => (document.body.classList.contains('white-content') ? this.activateMode('dark') : this.activateMode('light'))}>
            <i className={`p-1 fa ${this.state.icon} fa-2x`} />
          </div>
        </div>
      </div>
    )
  }
}

export default FixedPlugin
