import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CreateUserUi extends Component {

    state = {
        parent_id: '0',
        username: '',
        password: '',
        name: '',
        surname: '',
        phone: '',
        email: '',
        address: '',
        language: "4_4",
        role: 'agent',

        errors: []
    }

    onFormSubmit = event => {
        event.preventDefault();
        let data = this.state;
        delete data.errors;
        this.props.onFormSubmit(data)
    }



    render() {
        return (
            <>
                <div className="container" style={{fontSize: '20px'}}>
                    <div className='ml-3'>
                        <Link to='/admin/users/view'>
                            <button className='ui button'>Back</button>
                        </Link>
                    </div>

                    <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>


                        <h3 className="card-title mt-3 text-center p-3">Create Reseller</h3>

                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"/> </span>
                                </div>
                                <input name className="form-control" placeholder="Username" type="text"
                                       value={this.state.username}
                                       onChange={event => this.setState({username: event.target.value})}
                                       required={true}
                                       pattern="[a-z0-9]{3,15}"
                                       onInvalid={event => event.target.setCustomValidity('Username should only contain lowercase letters, min length 3 and max length 15. e.g. noman')}
                                       onInput={event => event.target.setCustomValidity('')}
                                />
                            </div>

                            <p className='mr-0 p-0 text-danger'>{this.state.errors ? this.state.errors.username : null}</p>

                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                </div>
                                <input className="form-control" placeholder="Password" type="text"
                                       value={this.state.password}
                                       onChange={event => this.setState({password: event.target.value})}
                                       required={true}
                                />
                            </div>
                            {/*{*/}
                            {/*    this.state.root ?*/}
                            {/*        <div className="form-group input-group">*/}
                            {/*            <div className="input-group-prepend">*/}
                            {/*                <span className="input-group-text"> <i className="fa fa-building"/> </span>*/}
                            {/*            </div>*/}
                            {/*            <select className="form-control text-capitalize" value={this.state.role}*/}
                            {/*                    onChange={event => this.setState({role: event.target.value})}>*/}
                            {/*                <option selected={true} className='text-capitalize'>seller</option>*/}
                            {/*                <option className='text-capitalize'>agent</option>*/}
                            {/*            </select>*/}
                            {/*        </div> : null*/}
                            {/*}*/}


                            {/* -------------------------Personal Info-------------------// */}


                            {/*<h4 className="card-title mt-3 text-center">Personal Information</h4>*/}

                            {/*<div className="form-group input-group">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <span className="input-group-text"> <i className="fa fa-envelope"/> </span>*/}
                            {/*    </div>*/}
                            {/*    <input name className="form-control" placeholder="Email address" type="email"*/}
                            {/*           value={this.state.email}*/}
                            {/*           onChange={event => {*/}
                            {/*               this.setState({email: event.target.value})*/}
                            {/*           }}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-phone"/> </span>
                                </div>
                                <input name className="form-control" placeholder="Phone number" type="number"
                                       value={this.state.phone}
                                       onChange={event => {
                                           this.setState({phone: event.target.value})
                                       }}
                                />
                            </div>


                            {/*<div className="form-group input-group">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <span className="input-group-text"> <i className="fa fa-user"/> </span>*/}
                            {/*    </div>*/}
                            {/*    <input name className="form-control" placeholder="Name" type="text"*/}
                            {/*           value={this.state.name}*/}
                            {/*           onChange={event => this.setState({name: event.target.value})}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group input-group">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <span className="input-group-text"> <i className="fa fa-user-edit"/> </span>*/}
                            {/*    </div>*/}
                            {/*    <input name className="form-control" placeholder="Surname" type="text"*/}
                            {/*           value={this.state.surname}*/}
                            {/*           onChange={event => this.setState({surname: event.target.value})}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="form-group input-group">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <span className="input-group-text"> <i className="fa fa-address-card"/> </span>*/}
                            {/*    </div>*/}
                            {/*    <input name className="form-control" placeholder="Address" type="text"*/}
                            {/*           value={this.state.address}*/}
                            {/*           onChange={event => this.setState({address: event.target.value})}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="form-group">
                                {/*<Link to='/admin/users/view'>*/}
                                <button type="submit" className="ui button primary">
                                    Create
                                </button>
                                {/*</Link>*/}
                            </div>
                        </form>
                    </article>
                </div>
                {/* card.// */}
            </>
        );
    }
}

export default CreateUserUi;
