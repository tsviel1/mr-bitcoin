import React, { Component } from 'react'
import { bitcoinService } from '../services/bitcoinService'
import { connect } from 'react-redux'
import { loadUser } from '../store/actions/userActions'
import { MovesList } from '../components/MovesList'

class _HomePage extends Component {

  state = {
    userBtc: null
  }

  async loadUser() {
    await this.props.loadUser()
  }

  async componentDidMount() {
    await this.loadUser()
  }

  async componentDidUpdate() {
    const user = this.props.loggedInUser
    const userBtc = await bitcoinService.getRate(user.coins)
    this.setState({ userBtc })
  }
  render() {
    const { userBtc } = this.state
    const { loggedInUser } = this.props
    if (!loggedInUser || !userBtc) return <div>Loading...</div>
    return (
      <section className="Home-page">
        <div className="hello">
          <h1 className='m10'> Hello, {loggedInUser.name}! </h1>
          <h4 className='m10'> Coins: ${loggedInUser.coins} </h4>
          <h4 className='m10'> BTC: {userBtc} </h4>
        </div>
        <MovesList loggedInUser={loggedInUser}/>
      </section>

    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadUser
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)

