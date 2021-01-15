import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css'

export default class App extends React.Component {
   render() {
    return(
     <Loader className={styles.loader}
        type="Oval" 
        color="black" 
        height={70} 
        width={70}
        timeout={4000}
     />
    );
   }
}


