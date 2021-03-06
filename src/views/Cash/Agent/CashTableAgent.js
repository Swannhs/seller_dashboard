import React, {Component} from 'react';
import {Link} from "react-router-dom";
import CashSent from "./CashSent";
import CashReceived from "./CashReceived";

class CashTableAgent extends Component {
    state = {
        sent: true
    }


    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col-1'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/cash/transaction'>
                                    <button className='ui button'>
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div className='text-center mt-2'>
                        <div className="ui buttons small">
                            <button className="ui button red"
                                    onClick={() => {
                                        this.setState({
                                            sent: true
                                        })
                                    }}
                            >Sent
                            </button>
                            <div className="or"/>
                            <button className="ui button positive"
                                    onClick={() => {
                                        this.setState({
                                            sent: false
                                        })
                                    }}
                            >Received
                            </button>
                        </div>
                    </div>
                </div>

                {this.state.sent ? <CashSent id={this.props.match.params.id}/> :
                    <CashReceived id={this.props.match.params.id}/>}
            </>
        );
    }
}

export default CashTableAgent;
