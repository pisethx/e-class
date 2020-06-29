import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Footer from 'components/Footer/Footer.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js'

import ClassShow from '../../views/Class/_id/Show'
import ClassEdit from '../../views/Class/_id/Edit'

import logo from 'assets/img/react-logo.png'

var ps

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'red',
      sidebarOpened:
        document.documentElement.className.indexOf('nav-open') !== -1,
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on'
      document.documentElement.classList.remove('perfect-scrollbar-off')
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true })
      let tables = document.querySelectorAll('.table-responsive')
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i])
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
      document.documentElement.className += ' perfect-scrollbar-off'
      document.documentElement.classList.remove('perfect-scrollbar-on')
    }
  }
  componentDidUpdate(e) {
    if (e.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        let tables = document.querySelectorAll('.table-responsive')
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i])
        }
      }
      document.documentElement.scrollTop = 0
      document.scrollingElement.scrollTop = 0
      this.refs.mainPanel.scrollTop = 0
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open')
    this.setState({ sidebarOpened: !this.state.sidebarOpened })
  }
  // getRoutes = (routes) => {
  //   const allRoutes = routes.map((prop, key) => {
  //     return (
  //       <Route exact path={prop.path} component={prop.component} key={key} />
  //     )
  //   })

  //   allRoutes.push(
  //     <Route path="class/:slug" key={'show' + this.props.match.params.slug}>
  //       <ClassShow id={this.props.match.params.slug} />
  //     </Route>
  //   )

  //   allRoutes.push(
  //     <Route
  //       path="class/edit/:slug"
  //       // key={'edit' + this.props.match.params.slug}
  //       render={(props) => (
  //         <ClassEdit {...props} id={props.match.params.slug} />
  //       )}
  //     />
  //   )

  //   return allRoutes
  // }
  getBrandText = (path) => {
    return 'E-Class'
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            bgColor={this.state.backgroundColor}
            logo={{
              innerLink: '/',
              text: 'E-Class',
              imgSrc: logo,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText="E-Class"
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            {this.props.children}
            {/* <Switch>
              {this.getRoutes(routes)}
              <Route exact path="class/edit/:slug" component={ClassEdit} />
              <Redirect from="*" to="/" />
            </Switch> */}
            <Footer fluid />
          </div>
        </div>
      </>
    )
  }
}

export default Admin
