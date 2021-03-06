import React, {Component} from 'react';
import 'reactjs-popup/dist/index.css';
import VoucherApi from "./VoucherApi";
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import {Pagination} from "semantic-ui-react";
import VoucherApiMobile from "./VoucherApiMobile";
import {isMobile} from 'react-device-detect';
import {toast, ToastContainer} from "react-toastify";

class VoucherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            start: 0,
            limit: 10,
            total: 0,
            refresh: true,
            loading: true,
            search: '',
            filter: 'new',

        }

        if(this.props.location.state && this.props.location.state){
            this.state.search = this.props.location.state.search
        }
        this.onChangeHandle = this.onChangeHandle.bind(this)
        this.onSearchApiCall = this.onSearchApiCall.bind(this)
    }


    componentDidMount() {
        this.onApiCall();

    }

    onApiCall = () => {
        this.setState({loading: true})
        if (!(this.state.filter === 'all')) {
            RadiusApi.get('/vouchers/index.json', {
                params: {
                    page: this.state.page,
                    start: this.state.start,
                    limit: this.state.limit,
                    query: this.state.search,
                    filter: `[{"operator": "in","value": ["${this.state.filter}"],"property": "status"}]`,
                    token: localStorage.getItem('Token')
                }
            })
                .then(response => {
                    this.setState({
                        data: response.data.items,
                        total: response.data.totalCount,
                        loading: false
                    })
                })
        } else {
            RadiusApi.get('/vouchers/index.json', {
                params: {
                    page: this.state.page,
                    start: this.state.start,
                    limit: this.state.limit,
                    query: this.state.search,
                    token: localStorage.getItem('Token')
                }
            })
                .then(response => {
                    this.setState({
                        data: response.data.items,
                        total: response.data.totalCount,
                        loading: false
                    })
                })
        }

    }


    onVoucherReset = (props) => {
        let reset = {
            voucher_id: props
        }

        RadiusApi.post('/vouchers/reset.json', reset, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        // alert('Voucher reset successfully')
                        toast.success('Voucher reseted successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        if(response.data.data.length === 1){
                            this.state.search = response.data.data[0].name
                            this.onApiCall();
                        }
                    } else {
                        toast.error(response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            )
    }

    onSearchApiCall = () => {
        event.preventDefault();
        this.onResetPagination();
        this.onApiCall();
    }

    onFilterApiCall = event => {
        event.preventDefault();
        this.onResetPagination();
        this.onApiCall();
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     prevState.page !== this.state.page ? this.onApiCall() : null
    // }

    /*
        //todo Live Screen Change detect
        componentDidMount() {
            window.addEventListener("resize", this.resize.bind(this));
            this.resize();
        }
        resize() {
            this.setState({hideNav: window.innerWidth <= 760});
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.resize.bind(this));
        }
     */

    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.ceil(totalPage)
    }

    async onPageChaneHandler(event, data) {
        this.setState({loading: true})
        await this.setState({
            page: data.activePage,
            start: (data.activePage - 1) * this.state.limit
        })
        this.onApiCall();
    }

    onChangeHandle = () => {
        this.setState({
            search: event.target.value
        })
    }

    onChangeFilter = event => {
        this.setState({
            filter: event.target.value
        }, function () {
            this.onFilterApiCall(event);
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
                <ToastContainer/>
                <div className="group-item">
                    <div className="ui grid">
                        {
                            isMobile ?
                                <>
                                    <div className="six wide column">
                                        <form onSubmit={this.onSearchApiCall}>
                                            <div className="ui icon input" style={{width: '120px'}}>
                                                <input type="text" placeholder="Search Name" defaultValue={this.state.search}
                                                       onChange={this.onChangeHandle}
                                                />
                                                <i className="circular search link icon"
                                                   onClick={this.onSearchApiCall}
                                                />
                                            </div>
                                        </form>
                                    </div>

                                    <div className='five wide column'>
                                        {/*<VoucherFilter/>*/}

                                        <div className="form-group input-group">
                                            <select className="form-control text-capitalize"
                                                    onChange={event => {
                                                        this.onChangeFilter(event)
                                                    }}>
                                                <option key={1} value='new'>New</option>
                                                <option key={2} value='used'>Used</option>
                                                <option key={3} value='depleted'>Depleted</option>
                                                <option key={4} value='expired'>Expired</option>
                                                <option key={5} value='all'>All</option>
                                            </select>
                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <div className="five wide column">
                                        <form onSubmit={this.onSearchApiCall}>
                                            <div className="ui icon input">
                                                <input type="text" placeholder="Search Name" defaultValue={this.state.search}
                                                       onChange={this.onChangeHandle}
                                                />
                                                <i className="circular search link icon"
                                                   onClick={this.onSearchApiCall}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='three wide column'>
                                        {/*<VoucherFilter/>*/}

                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"> <i
                                                    className="fas fa-filter"/> </span>
                                            </div>
                                            <select className="form-control text-capitalize"
                                                    onChange={event => {
                                                        this.onChangeFilter(event)
                                                    }}>
                                                <option key={1} value='new'>New</option>
                                                <option key={2} value='used'>Used</option>
                                                <option key={3} value='depleted'>Depleted</option>
                                                <option key={4} value='expired'>Expired</option>
                                                <option key={5} value='all'>All</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                        }

                        {
                            isMobile ?
                                <div className="ml-3 two wide column right aligned">
                                    <Link to='/admin/voucher/create'>
                                        <button className='ui button primary small'>
                                            New
                                        </button>
                                    </Link>
                                </div> :
                                <div className="eight wide column right aligned">
                                    <Link to='/admin/voucher/create'>
                                        <button className='ui button primary'>
                                            New
                                        </button>
                                    </Link>
                                </div>
                        }

                    </div>
                </div>


                {
                    this.state.loading ? <div className="mt-5 ui active centered inline loader"/> :
                        <>
                            <table className="table table-striped">
                                {
                                    isMobile ? <VoucherApiMobile data={this.state.data} onVoucherReset={this.onVoucherReset}/>
                                        : <VoucherApi data={this.state.data} onVoucherReset={this.onVoucherReset}/>
                                }
                            </table>
                            {/*--------------------Pagination------------------------*/}
                            {
                                this.state.total > 10 ?
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
                                    </tfoot> : <></>
                            }

                            {/*    --------------------------------Pagination End --------------------------*/}
                        </>
                }

            </>
        );
    }

}

export default VoucherList;
