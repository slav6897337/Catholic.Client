import React, {FunctionComponent, useState} from "react";
import styles from "./HolyMassEditor.module.css";
import Button from "../StyledComponents/Button";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment/moment";
import Api from "../../Utiles/Api";
import Loading from "../PageElements/Loading";
import {IAdmin} from "../../Domain/IAdmin";
import Popup from "../PopUp/Popup";
import Calendar from "react-calendar";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {EventEmitter, POPUP_SHOWN} from "../../Utiles/EventEmitter";


interface IProps {
  holyMass: IHolyMass;
  admin?: IAdmin,
  className?: string;
  onChange: (holyMass: IHolyMass) => void
}

const HolyMassEditor: FunctionComponent<IProps> = ({holyMass, admin, className, onChange}) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hideElement, setHideElement] = React.useState<boolean>(false);
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

  const deleteHolyMass = async () => {
    if (!currentMass) return;
    setLoading(true);
    await Api.deleteHollyMass(currentMass.id, admin?.token ?? '');
    setLoading(false);
    setHideElement(true);
  };

  const changeDate = () => {
    EventEmitter.trigger(POPUP_SHOWN);
  }

  const handleTimeChange = (timeString: string) => {
    if (!timeString) return;

    const [hours, minutes] = timeString.split(':').map(Number);
    const date = currentMass.schedule;
    date.setHours(hours, minutes, 0, 0);
    setCurrentMass({...currentMass, schedule: date});
  };

  if (hideElement) return null;

  if (loading) return (
    <div className={styles.holyMassContainer}>
      <Loading/>
    </div>);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMass({...currentMass, description: e.target.value});
    setEditMode(true);
  }

  const setEditModeDebounced = (flag: boolean) => {
    setTimeout(() => setEditMode(flag), 500);
  }

  return (
    <div className={styles.holyMassContainer}>
      <button className={styles.dateButton} onClick={changeDate}>
        <span>
          {moment(currentMass.schedule).format('dddd, MMMM DD')} at {moment(currentMass.schedule).format('h:mm a')}.
        </span>
      </button>
      <div className={styles.descriptionContainer}>
        <input className={styles.descriptionInput}
               value={currentMass.description}
               placeholder='Type Holy Mass description'
               onChange={e => handleInputChange(e)}
               onBlur={() => setEditModeDebounced(false)}
               onFocus={() => setEditModeDebounced(true)}
        />
        {editMode
          ? <Button className={styles.saveButton}
                    iconClassName={styles.deleteButtonIcon}
                    icon='/icons/save.png'
                    onClick={() => upsertHolyMass(currentMass)}
          />
          : <Button className={styles.deleteButton}
                    iconClassName={styles.deleteButtonIcon}
                    icon='/icons/delete.png'
                    onClick={() => deleteHolyMass()}
          />
        }
      </div>

      <Popup modalStyle={styles.modalStyles}>
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
      </Popup>
    </div>
  );
}

export default HolyMassEditor;
