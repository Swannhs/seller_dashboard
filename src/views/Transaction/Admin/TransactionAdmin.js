import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionAdminReceived from "./TransactionAdminReceived";
import TransactionAdminSend from "./TransactionAdminSend";

class TransactionAdmin extends Component {
    state = {
        send: ''
    }

    componentDidMount() {
        this.setState({
            send: false
        })
    }

    onTrueHandel = () => {
        this.setState({
            sent: false
        })
    }

    onFalseHandel = () => {
        this.setState({
            sent: true
        })
    }


    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col-1'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/root/voucher/transaction'>
                                    <button className='ui button'>
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <div className="ui buttons">
                        <button className="ui button red"
                                onClick={() => {
                                    this.onTrueHandel()
                                }}
                        >Sent
                        </button>
                        <div className="or"/>
                        <button className="ui button positive"
                                onClick={() => {
                                    this.onFalseHandel()
                                }}>
                            Received
                        </button>
                    </div>
                </div>
                {this.state.sent ? <TransactionAdminReceived id={this.props.match.params.id}/> :
                    <TransactionAdminSend id={this.props.match.params.id}/>}
            </>
        );
    }
}

export default TransactionAdmin;
