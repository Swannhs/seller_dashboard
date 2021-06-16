import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";

class VoucherGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            group: []
        }
    }

    componentDidMount() {
        RadiusApi.get('/realms/index-ap-create.json', {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    select: '',
                    group: response.data.items
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.props.onChange(this.state.select)
        }
    }


    onHandleChange = event => {
        this.setState({
            select: event.target.value
        })
    }


    render() {
        return (
            <>
                <h4 className='text-black-50'>Vendor</h4>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fab fa-cloudscale"/> </span>
                    </div>
                    <select className="form-control text-capitalize"
                            value={this.state.select}
                            onChange={event => this.onHandleChange(event)}>
                        <option>Choose...</option>
                        {this.state.group.map((items) => {
                            return (
                                <>
                                    <option key={items.id} value={items.id}>{items.name}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
            </>
        );
    }
}

export default VoucherGroup;