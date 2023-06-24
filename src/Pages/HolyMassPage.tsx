import React, {Component} from 'react';
import styles from "./HolyMassPage.module.css";
import AllNews from '../components/AllNews';
import Note from "../components/Note";

export default class HolyMassPage extends Component {
  static displayName = HolyMassPage.name;

  render() {
    return (
      <div >
        <div className={styles.titleContainer}>
          <p className={styles.left}><strong>Holly Masses</strong> at Church of St. Ladislaus</p>
          <p className={styles.right}>each <strong>Sunday at 11:00am</strong> (in English)</p>
        </div>
          <Note />
          <AllNews />


      </div>
    );
  }
}