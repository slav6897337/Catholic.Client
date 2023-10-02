import {FunctionComponent} from "react";
import styles from "./MainInfo.module.css";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment";
import BlurContainer from "../PageElements/BlurContainer";
import GoldLine from "../PageElements/GoldLine";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Constants from "../../Domain/Constants";

interface IProps {
  holyMasses: IHolyMass[];
}

const handleYouTubeClick = () => {
  const url = 'https://www.youtube.com/@benjaminkosnac5108';

  window.open(url, '_blank');
};

const MainInfo: FunctionComponent<IProps> = ({holyMasses}) => {
  return (
    <BlurContainer
      title="Upcoming Holy Masses"
    >
      <GoldLine/>

      <p>
        DEAR SISTERS AND BROTHERS,DEAR FRIENDS,
      </p>
      <h1>Upcoming Holy Masses and/or devotions at St. Ladislav church:</h1>

      <p>
        {holyMasses.map((holyMass, index) =>
          <span key={index}>
              {moment(holyMass.date).format('dddd, MMMM DD h:mm')}
            at {moment(holyMass.date).format('h:mm a')}.
            {holyMass.description ? ` - ${holyMass.description}` : null}
            <br/>
            </span>
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
        Past Holy Masses and other reflections can be found on:
      </p>

      <Button icon='/img/youtube.png' text='YouTube' onClick={() => Actions.redirect(Constants.fatherBenYouTubeChannel)}/>

      <p>
        To support Fr. Ben's ministry, you may send your donation to:<br/>
        <strong>SK79 1100 0000 0080 1011 9693</strong><br/>
        For any questions, feel free to email me at bkosnac@hotmail.com<br/>
      </p>

      <p>Fr. Ben Kosnac, your chaplain</p>

    </BlurContainer>

  );
};

export default MainInfo;
