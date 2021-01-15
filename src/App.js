import React from 'react';
import Axios from 'axios';
import {Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import url from './Url.js';
import Covid from './images/covid.png';
import Loader from './components/Loader/Loader.js';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            data:{},
            country:""
        }
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    componentDidMount(){
        let Timeout=0;
        if(!(this.state.data.confirmed)){
            Timeout=3000;
        }
        setTimeout(
            () => {
               Axios.get(url).then(({data}) =>{
                   const newData = {
                       confirmed:data.confirmed,
                       recovered:data.recovered,
                       deaths:data.deaths,
                       lastUpdate:data.lastUpdate
                   }; 
                   this.setState({data:newData}); 
               })
           }
        ,Timeout);
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
                {!data.confirmed ? <Loader /> :
                    <> 
                        <img src={Covid} className={styles.image} alt="Covid-19" />
                        <Cards data={data}/>
                        <CountryPicker handleCountryChange={this.handleCountryChange}/>
                        <Chart data={data} country={country}/>
                        <footer className={styles.footer}>Made with ❤ By <a href="https://github.com/DrashtiKoladiya">Drashti Koladiya</a></footer>
                    </>
                }
            </div>
        );
    };
};

export default App;