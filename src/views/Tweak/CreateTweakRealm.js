import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import VoucherGroup from "../../components/Dropdown/VoucherGroup";
import GetTweak from "../../components/Dropdown/GetTweak";

class CreateTweakRealm extends Component {
    state = {
        tweak: '',
        realm: ''
    }

    onGenerateTweak = event => {
        event.preventDefault();
        let data = this.state
        RadiusApi.post('/Tweak-realms/add.json', data,{
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert('Generated successful');
                    this.props.history.push('/admin/root/tweak-realms')
                } else {
                    alert(response.data.message)
                }
            })
    }

    onSelectTweak = async data => {
        this.setState({
            tweak: data
        })
    }

    onSelectGroup = async data => {
        this.setState({
            realm: data
        })
    }

    render() {
        return (
            <>
                <div className='ml-3'>
                    <Link to='/admin/root/tweak-realms'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <form onSubmit={this.onGenerateTweak}>
                        <VoucherGroup onChange={this.onSelectGroup}/>
                        <GetTweak onChange={this.onSelectTweak}/>

                        <button type='submit' className='ui button positive mt-4'>
                            Generate
                        </button>
                    </form>
                </article>
            </>
        );
    }
}

export default CreateTweakRealm;
