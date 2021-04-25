import React, {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Link} from "react-router-dom";
import UserApi from "./UserApi";
import UserApiMobile from "./UserApiMobile";


class VoucherApi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            page: 1,
            start: 0,
            limit: 10,
            total: 0,
            refresh: true,
            mobile: false
        }
    }

    componentDidMount() {
        this.setState({mobile: window.innerWidth <= 660})
    }


    render() {
        return (
            <>

                {/* ---------------- New Button Start ----------------*/}
                <div className="ui grid">

                    <div className="ui text-right floated column">
                        <Link to='/admin/users/create'>
                            <button className='ui button primary'>
                                New
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ---------------- New Button End ----------------*/}

                <table className="table table-striped">
                    <thead>
                    <tr className='ct-grid-background border-primary'>
                        {
                            this.state.mobile ?
                                <th>
                                    #
                                </th> : null
                        }
                        <th>
                            <h4 className='text-center'>
                                Name
                            </h4>
                        </th>
                        {
                            this.state.mobile ? <></> :
                                <>
                                    <th>
                                        <h4 className='text-center'>
                                            Role
                                        </h4>
                                    </th>

                                    <th className='w-25'>
                                        <h4 className='text-center'>
                                            <h4 className='text-center'>
                                                Status
                                            </h4>
                                            {/*<Dropdown text='Status' multiple icon='filter'>*/}
                                            {/*    <Dropdown.Menu>*/}
                                            {/*        <Dropdown.Menu scrolling>*/}
                                            {/*            <Dropdown.Item>Active</Dropdown.Item>*/}
                                            {/*            <Dropdown.Item>Inactive</Dropdown.Item>*/}
                                            {/*        </Dropdown.Menu>*/}
                                            {/*    </Dropdown.Menu>*/}
                                            {/*</Dropdown>*/}
                                        </h4>
                                    </th>
                                </>
                        }
                        <th>
                            <h4 className='text-center'>
                                Actions
                            </h4>
                        </th>

                    </tr>
                    </thead>


                    {/*-----------------Calling User List Api---------------------*/}
                    {
                        this.state.mobile ? <UserApiMobile/> : <UserApi/>
                    }
                    {/*-----------------Calling User List Api---------------------*/}
                </table>
            </>
        );
    }
}

export default VoucherApi;
