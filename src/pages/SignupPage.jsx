import React, { Component } from 'react'
import { userService } from '../services/userService'

export class SignupPage extends Component {
    state = {
        user: null
    }

    onSignup = async (ev) => {
        ev.preventDefault()
        userService.signup(this.state.user.name)
        this.props.history.push('/contact')
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
    }

    inputRefFunc = (elInput) => {
        elInput && elInput.focus()
    }



    render() {
        const bitcoinImgUrl = 'bitcoin.png'
        return (
            <section className='SignupPage'>
                <img src={require(`../assets/img/${bitcoinImgUrl}`)} alt="" />
                <div className='title'>Please enter your name:</div>
                <form onSubmit={this.onSignup}>
                    <input className='text-input' ref={this.inputRefFunc} onChange={this.handleChange} type="text" name="name" />
                    <button>Sign up</button>
                </form>
            </section>
        )
    }
}
