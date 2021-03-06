import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";

class GetTweak extends Component {
    state = {
        select: '',
        tweaks: []
    }

    componentDidMount() {
        RadiusApi.get('/Tweak-realms/tweaks.json',{
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    tweaks: response.data.tweaks
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState !== this.state ? this.props.onChange(this.state.select) : null
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.tweaks)
    }


    render() {
        return (
            <>
                <h3 className='text-black-50'>Tweaks</h3>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fab fa-cloudscale"/> </span>
                    </div>
                    <select className="form-control text-capitalize"
                            value={this.state.select}
                            onChange={event => {
                                this.setState({
                                    select: event.target.value
                                })
                            }}>
                        <option>Choose...</option>
                        {this.state.tweaks.map((items) => {
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

export default GetTweak;
