import React, {FunctionComponent} from "react";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment";
import BlurContainer from "../PageElements/BlurContainer";
import GoldLine from "../PageElements/GoldLine";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Constants from "../../Domain/Constants";
import {IPage} from "../../Domain/IPage";
import IHolyMassSections from "../../Domain/IHolyMass";

interface IProps {
  holyMasses: IHolyMass[];
  page: IPage
}

const MainInfo: FunctionComponent<IProps> = ({holyMasses, page}) => {
  const selections: IHolyMassSections = page?.body ? JSON.parse(page.body) : null;

  return (
    <BlurContainer
      title="Upcoming Holy Masses"
    >
      <GoldLine/>

      {selections
        ? <div dangerouslySetInnerHTML={{__html: selections.title}}/>
        :
        <>
          <p> DEAR SISTERS AND BROTHERS,DEAR FRIENDS, </p>
          <h2>Upcoming Holy Masses and/or devotions at St. Ladislav church:</h2>
        </>
      }

      {page.date && <p>Updated on {moment(page.date).format('DD.MM.yyyy')}</p>}

      <p>
        {holyMasses
          .filter(m => m.schedule >= new Date())
          .map((holyMass, index) =>
            <span key={index}>
              {moment(holyMass.schedule).format('dddd, MMMM DD')} at {moment(holyMass.schedule).format('h:mm a')}.
              {holyMass.description ? ` - ${holyMass.description}` : null}
              <br/>
            </span>
          )}
      </p>

      {selections
        ? <div dangerouslySetInnerHTML={{__html: selections.confessions}}/>
        :
        <>
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
        </>
      }

      <Button icon='/img/youtube.png' text='YouTube'
              onClick={() => Actions.redirect(Constants.fatherBenYouTubeChannel)}/>

      {selections
        ? <div dangerouslySetInnerHTML={{__html: selections.body}}/>
        :
        <>
          <p>
            To support Fr. Ben's ministry, you may send your donation to:<br/>
            <strong>SK79 1100 0000 0080 1011 9693</strong><br/>
            For any questions, feel free to email me at bkosnac@hotmail.com<br/>
          </p>

          <p>Fr. Ben Kosnac, your chaplain</p>
        </>
      }

    </BlurContainer>

  );
};

export default MainInfo;
