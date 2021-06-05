import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {Pagination} from "semantic-ui-react";

class TransactionAdminReceived extends Component {

    state = {
        root: true,
        transactions: [],
        page: 1,
        start: 0,
        limit: 1,
        total: 0,
    }


    componentDidMount() {
        const cookie = new Cookies();

        RadiusApi.get('/Dashboard/check_token.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    root: response.data.data.isRootUser
                })
                if (response.data.data.isRootUser) {
                    this.onApiCall();
                }
            })
    }


    onApiCall = () => {
        const cookie = new Cookies();

        RadiusApi.get('/voucher-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id,
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.received,
                    total: response.data.received_total
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.page !== this.state.page ? this.onApiCall() : null
    }

    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.ceil(totalPage)
    }

    async onPageChaneHandler(event, data) {
        await this.setState({
            page: data.activePage,
            start: (data.activePage - 1) * this.state.limit
        })
    }

    onChangeHandle = () => {
        this.setState({
            search: event.target.value
        })
    }

    onResetPagination() {
        this.setState({
            page: 1,
            start: 0,
            limit: 10,
            total: 0
        })
    }


    render() {
        return (
            <>
                {
                    this.state.root ?
                        <>
                            {
                                this.state.transactions.length ?
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Trx ID</th>
                                            <th scope="col">Partner</th>
                                            <th scope="col">Profile</th>
                                            <th scope="col">Vendor</th>
                                            <th scope="col">credit</th>
                                            <th scope="col">Cost</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.transactions.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.transaction}</td>
                                                        <td>{item.user.username}</td>
                                                        <td>{item.profile.name}</td>
                                                        <td>{item.realm.name}</td>
                                                        <td>{item.credit}</td>
                                                        <td>{item.balance}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    : <h3 className='text-center text-danger'>No received history yet</h3>
                            }
                        </> : <h3 className='text-center text-danger'>You are not allowed here</h3>
                }
                <tfoot>
                <tr>
                    <th colSpan={5}>
                        <div className="ui right floated pagination menu align-content-lg-end">
                            <Pagination
                                defaultActivePage={this.state.page}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                totalPages={this.onPagination()}
                                onPageChange={async (event, data) =>
                                    this.onPageChaneHandler(event, data)
                                }
                            />
                        </div>
                    </th>
                </tr>
                </tfoot>
            </>

        );
    }

}

export default TransactionAdminReceived;
