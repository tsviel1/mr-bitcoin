import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './assets/scss/global.scss'
import { Component } from 'react'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { SignupPage } from './pages/SignupPage'
import { ContactDetailsPage } from './pages/Details'
import { ContactEdit } from './pages/ContactEdit'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { userService } from './services/userService'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'

const PrivateRoute = (props) => {
  const loggedInUser = userService.getLoggedInUser()
  return loggedInUser ? <Route path={props.path} component={props.component} /> : <Redirect to='/signup' />
}


class _App extends Component {
  render() {
    const {loggedInUser} = this.props
    return (
      <Router>
        <section className='main-app flex column'>
          <Header loggedInUser={loggedInUser}/>
          <main className='container'>
            <Switch>
              <Route path='/contact/edit/:id?' component={ContactEdit} />
              <Route path='/contact/:id' component={ContactDetailsPage} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/statistics' component={StatisticPage} />
              <Route path='/signup' component={SignupPage} />
              <PrivateRoute path='/' component={HomePage} />
            </Switch>
          </main>
          <Footer />
        </section>
      </Router>
    )
  }
}
const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

export const App = connect(mapStateToProps)(_App);
