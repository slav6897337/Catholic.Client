import React, {FunctionComponent, useState} from "react";
import styles from "./HolyMassEditor.module.css";
import Button from "../StyledComponents/Button";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment/moment";
import Api from "../../Utiles/Api";
import {IAdmin} from "../../Domain/IAdmin";
import Calendar from "react-calendar";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


interface IProps {
  holyMass: IHolyMass;
  admin?: IAdmin,
  className?: string;
  onChange: (holyMass: IHolyMass) => void
  setLoading: (loading: boolean) => void
}

const HolyMassTimePicker: FunctionComponent<IProps> = (
  {holyMass,
    admin,
    className,
    onChange,
    setLoading}) => {
  const [currentMass, setCurrentMass] = useState<IHolyMass>(holyMass);


  const upsertHolyMass = async (mass: IHolyMass) => {
    if (!mass) return;
    setLoading(true);

    let newMass;

    if (mass.id) {
      newMass = await Api.updateHollyMass(mass.id, mass, admin?.token ?? '');
    } else {
      newMass = await Api.addHollyMass(mass, admin?.token ?? '');
    }

    setCurrentMass(newMass);
    onChange(newMass);
    setLoading(false);
  };


  const handleTimeChange = (timeString: string) => {
    if (!timeString) return;

    const [hours, minutes] = timeString.split(':').map(Number);
    const date = currentMass.schedule;
    date.setHours(hours, minutes, 0, 0);
    setCurrentMass({...currentMass, schedule: date});
  };


  return (
    <div className={styles.modalStyles}>
      <div className={styles.pickerContainer}>
        <Calendar
          onChange={e => setCurrentMass({...currentMass, schedule: e as Date})}
          value={currentMass.schedule}
          tileDisabled={({activeStartDate, date, view}) => {
            return false;
          }}
        />
        <TimePicker onChange={e => handleTimeChange(e as string)}
                    value={currentMass.schedule}/>
      </div>

      <button className={styles.dateButton}>
            <span>
              {moment(currentMass.schedule).format('dddd, MMMM DD')} at {moment(currentMass.schedule).format('h:mm a')}.
            </span>
      </button>

      <Button
        icon='/icons/save.png'
        text='Save'
        onClick={() => upsertHolyMass(currentMass)}/>

    </div>
  );
}

export default HolyMassTimePicker;
