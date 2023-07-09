import {FunctionComponent} from "react";
import styles from "./MainInfo.module.css";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment";

interface IProps {
  holyMasses: IHolyMass[];
}

const MainInfo: FunctionComponent<IProps> = ({holyMasses}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Upcoming Holy Masses</h3>
      <div className={styles.titleLine}/>

      <p>
        DEAR SISTERS AND BROTHERS,DEAR FRIENDS,
      </p>
      <h1>Upcoming Holy Masses and/or devotions at St. Ladislav church:</h1>

      <p>
        {holyMasses.map((holyMass, index) =>
          <div key={index}>
            <span key={index}>
              {moment(holyMass.date).format('dddd, MMMM DD h:mm')}
              at {moment(holyMass.date).format('h:mm a')}.
              {holyMass.description ? ` - ${holyMass.description}` : null}
            </span>
          </div>
        )}
      </p>
      <p>
        <strong>CONFESSIONS</strong> are heard usually on Sundays 1/2 hour before or after the Holy Mass<br/>
        (at St. Ladislav's) and anytime by appointment (my phone +421 908 921 329).<br/>
        In the Blumental church I am available for confessions on following dates/times:Saturday, June 10: 5.50 -
        6.15pm.<br/>
        Friday, June 16: 11.45am - 12.20pm.<br/>
        My confessional is on the left, in the back of the church (as you enter through the main entrance door).<br/>
        <br/>
        Past Holy Masses and other reflections can be found on www.YouTube.com. Search for "Benjamin Kosnac".<br/>
        To support Fr. Ben's ministry, you may send your donation to:<br/>
        SK79 1100 0000 0080 1011 9693For any questions, feel free to email me at bkosnac@hotmail.comFr.<br/>
      </p>

      <p>Ben Kosnac, your chaplain</p>

    </div>
  );
};

export default MainInfo;
