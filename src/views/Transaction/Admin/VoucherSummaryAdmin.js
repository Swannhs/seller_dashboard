import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class VoucherSummaryAdmin extends Component {
    state = {
        summary: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    summary: response.data.item
                })
            })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col-1'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/voucher/generate'>
                                    <button className='ui button positive'>
                                        Generate
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/voucher/transfer'>
                                    <button className='ui button primary'>
                                        Transfer
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Realm</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Debit</th>
                        <th scope='col'>Balance</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.summary ? this.state.summary.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.user.username}</td>
                                    <td>{item.realm.name}</td>
                                    <td>{item.profile.name}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.debit}</td>
                                    <td>{item.balance}</td>
                                    <td>
                                        <Link to={'/admin/root/voucher/transactions/' + item.id}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }) : <h3 className='text-danger'>No record available</h3>
                    }
                    </tbody>
                </table>
            </>

        );
    }
}

export default VoucherSummaryAdmin;