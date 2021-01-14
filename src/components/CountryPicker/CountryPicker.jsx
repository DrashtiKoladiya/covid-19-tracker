import React from 'react';
import url from '../../Url.js';
import Axios from 'axios';
import {NativeSelect,FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';

class CountryPicker extends React.Component{
    constructor(){
        super();
        this.state = {
            countries : []
        }
    }

    componentDidMount(){
        Axios.get(`${url}/countries`)
            .then(({data}) => {
                const countriess = data.countries.map((countrie) => countrie.name);
                this.setState({countries:countriess});
            });
    }

    render(){
        const {countries} = this.state;
        return(
            <FormControl className={styles.fromControl}>
                <NativeSelect defaultValue="" onChange={(e) => this.props.handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {countries.map((countrie,i) => <option key={i} value={countrie}>{countrie}</option>)}
                </NativeSelect>
            </FormControl>
        );
    };
}

export default CountryPicker;