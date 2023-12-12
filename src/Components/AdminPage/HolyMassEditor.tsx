import React, {FunctionComponent, useState} from "react";
import styles from "./HolyMassEditor.module.css";
import Button from "../StyledComponents/Button";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment/moment";
import Api from "../../Utiles/Api";
import Loading from "../PageElements/Loading";
import {IAdmin} from "../../Domain/IAdmin";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {EventEmitter, POPUP_HIDDEN, POPUP_SHOWN} from "../../Utiles/EventEmitter";
import HolyMassTimePicker from "./HolyMassTimePicker";


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
    EventEmitter.trigger(POPUP_SHOWN,
      <HolyMassTimePicker
        holyMass={currentMass}
        admin={admin}
        onChange={h =>{
          setCurrentMass(h);
          onChange(h);
          EventEmitter.trigger(POPUP_HIDDEN);
        }}
        setLoading={l => setLoading(l)}
      />);
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
    </div>
  );
}

export default HolyMassEditor;
