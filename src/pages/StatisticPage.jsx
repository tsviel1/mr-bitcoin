import React, { Component } from 'react'
import { Chart } from '../components/Chart'
import { bitcoinService } from '../services/bitcoinService'

export class StatisticPage extends Component {
    state = {
        marketPrice: null,
        confirmedTransactions: null
    }

    async componentDidMount() {
        const marketPrice = await bitcoinService.getMarketPrice()
        const confirmedTransactions = await bitcoinService.getConfirmedTransactions()
        this.setState({ marketPrice, confirmedTransactions })
    }
    render() {
        const { marketPrice, confirmedTransactions } = this.state
        if (!marketPrice || !confirmedTransactions) return <div>Loading...</div>
        return (
            <section className="statistics-page">
                <Chart data={marketPrice} />
                <Chart data={confirmedTransactions} />
            </section>
        )
    }
}
