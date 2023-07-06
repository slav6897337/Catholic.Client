import React from 'react';
import styles from "./HolyMassPage.module.css";
import AllNews from '../Components/News/AllNews';
import Notes from "../Components/News/Notes";

interface IState {
  selectedDate: Date;
}

export default class HolyMassPage extends React.Component<{}, IState> {
  static displayName = HolyMassPage.name;
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  handleDateSelect = (date: Date ) => {
    this.setState({ selectedDate: date });
  };
  render() {
    return (
      <div className={styles.hollyMassBody}>
        <div className={styles.titleContainer}>
          <p className={styles.left}><strong>Holly Masses</strong> at Church of St. Ladislaus</p>
          <p className={styles.right}>each <strong>Sunday at 11:00am</strong> (in English)</p>
        </div>

          <Notes />
          <AllNews />

      </div>
    );
  }
}