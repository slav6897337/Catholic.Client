import React, {FunctionComponent, useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import styles from './CalendarWithEvents.module.css';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';
import IHolyMass from "../../Domain/IHolyMass";

interface IProps {
  holyMasses: IHolyMass[];
  className?: string;
}

interface ICustomTile {
  date: Date;
  view: string;
}

const CalendarWithEvents: FunctionComponent<IProps> = ({holyMasses, className}) => {
  const [value, onChange] = useState<Date>(new Date());

  const holyMass = () =>
    holyMasses.length
      ? holyMasses.find(holyMass =>
        value.getFullYear() === holyMass.schedule.getFullYear() &&
        value.getMonth() === holyMass.schedule.getMonth() &&
        value.getDate() === holyMass.schedule.getDate())
      : null;

  const getTileClassName = (tile: ICustomTile) => {
    if (tile.view === 'month') {
      const dates = holyMasses.map(m => m.schedule);
      if (dates.find(d =>
        d.getFullYear() === tile.date.getFullYear() &&
        d.getMonth() === tile.date.getMonth() &&
        d.getDate() === tile.date.getDate())) {
        return 'custom-date';
      }
    }
    return null;
  }

  return (
    <div className={`${styles.CalendarContainer} ${className}`}>
      <Calendar
        onChange={e => onChange(e as Date)}
        value={value}
        tileClassName={getTileClassName}
        tileDisabled={({activeStartDate, date, view}) => {

          return false;
        }}
      />

      <div className={styles.eventsContainer}>
        {holyMass() &&
            <div>
                <h1>{moment(value).format('DD MMMM, yyyy')}</h1>
                <p>Holy Mass at {moment(holyMass()?.schedule).format('h:mm a')}</p>
                <p>{holyMass()?.description}</p>
            </div>
        }
      </div>

    </div>

  );
}

export default CalendarWithEvents;