import React, {FunctionComponent, useState} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import styles from './CalendarWithEvents.module.css';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';
import IHolyMass from "../../Domain/IHolyMass";

interface IProps {
    holyMasses: IHolyMass[];
}

const CalendarWithEvents: FunctionComponent<IProps> = ({holyMasses}) => {
  const [value, onChange] = useState<Date>(new Date());

  const holyMass =()=>
     holyMasses.find(holyMass => holyMass.date.getDate() === value.getDate());



  return (
    <div className={styles.CalendarContainer}>
          <Calendar
            onChange={e => onChange(e as Date)}
            value={value} />

      <div className={styles.eventsContainer}>
        {holyMass() &&
            <div>
                <h1>{moment(value).format('DD MMMM, yyyy')}</h1>
                <p>Holy Mass at {moment(holyMass()?.date).format('h:mm a')}</p>
                <p>{holyMass()?.description}</p>
            </div>
        }
      </div>

    </div>

  );
}

export default CalendarWithEvents;