import React from 'react';
import Axios from 'axios';
import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import url from './Url.js';
import Covid from './images/covid.png'

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            data:{},
            country:""
        }
        this.handleCountryChange = this.handleCountryChange.bind(this);
        //console.log("connn");
    }

    componentDidMount()
    {
        Axios.get(url).then(({data}) =>{
                const newData = {
                    confirmed:data.confirmed,
                    recovered:data.recovered,
                    deaths:data.deaths,
                    lastUpdate:data.lastUpdate
                };
                this.setState({data:newData});  
            });
            //console.log("Main mount");
    }

    handleCountryChange = (country) => {
        let newUrl=url;
        if(country)
        {
            newUrl = `${url}/countries/${country}`;
        }
        Axios.get(newUrl).then(({data}) =>{
            const newData = {
                confirmed:data.confirmed,
                recovered:data.recovered,
                deaths:data.deaths,
                lastUpdate:data.lastUpdate
            };
            this.setState({data:newData,country:country});  
        });
    }


    render(){
        const {data,country} = this.state;
        return(
            <div className={styles.container}>
                <img src={Covid} className={styles.image} alt="Covid-19" />
                <Cards data={this.state.data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                <footer className={styles.footer}>Made with ❤ By <a href="https://github.com/DrashtiKoladiya">Drashti Koladiya</a></footer>
            </div>
        );
    };
};

export default App;