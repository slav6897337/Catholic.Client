import React, {FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {defaultPage, IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditHolyMassPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import {Collapse} from "../../Components/StyledComponents/Collapse";
import IHolyMass from "../../Domain/IHolyMass";
import CalendarWithEvents from "../../Components/Calendar/CalendarWithEvents";
import HolyMassEditor from "../../Components/AdminPage/HolyMassEditor";
import BodyEditor from "../../Components/AdminPage/BodyEditor";
import IHolyMassSections from "../../Domain/IHolyMass";
import Actions from "../../Utiles/Actions";
import Constants from "../../Domain/Constants";
import ImagePicker from "../../Components/AdminPage/ImagePicker";
import Body from "../../Components/PageElements/Body";

const EditHolyMassPage: FunctionComponent = () => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [holyMasses, setHolyMasses] = React.useState<IHolyMass[]>();
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [pageSelections, setPageSections] = React.useState<IHolyMassSections>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [collapse, setCollapse] = React.useState<boolean>(false);

  useEffect(() => {

    try {
      window.scrollTo(0, 0);
      const admin = AdminHelper.getAdminCredentials();
      setAdmin(admin);

      Api.getPage('holy-mass').then((page) => {
        if (page) {
          page.images ??= [];
          setPage(page);
          setPageSections(JSON.parse(page.body));
        }
      });
      Api.listHollyMasses().then(masses => {
        if (masses?.length) {
          setHolyMasses(masses);
        }
        setLoading(false);
      })
    } catch (e) {
      log.info(e);
    } finally {
    }
  }, []);

  const save = async () => {
    if (!page || !page.body || !page.id) return;
    setLoading(true);

    page.urlSegment = 'holy-mass';
    page.body = JSON.stringify(pageSelections);
    await Api.updatePage(page.id, page, admin?.token ?? '');
    setLoading(false);

    window.history.back();
  };

  const handleHolyMassUpdate = (mass: IHolyMass) => {

    const newHolyMasses = holyMasses?.map(h =>{
      if(h.id){
        if(h.id === mass.id){
          return mass;
        }
        else {
          return h;
        }
      }
      else {
        return mass;
      }
    });

    setHolyMasses(newHolyMasses);
  }

  if (loading) return (
    <Body center={true}>
      <Loading/>
    </Body>);

  return (
    <Body className={`${styles.body}`}>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Upcoming Holy Masses</p>
      </div>

      <BodyEditor
        className={styles.bodyEditor}
        wrapperClassName={styles.wrapperClassName}
        body={pageSelections?.title ?? ''}
        onBodyUpdate={title => setPageSections({...pageSelections, title} as IHolyMassSections)}
      />

      <div className={styles.holyMassContainer}>
        {holyMasses?.length && <CalendarWithEvents holyMasses={holyMasses} className={styles.calendarContainer}/>}

        <div className={styles.holyMassEditContainer}>
          <Collapse isExpanded={collapse} text='Celebrated Holy Masses' onClick={value => setCollapse(value)}>
            {holyMasses
              ?.filter(m =>
                m.schedule.getFullYear() < new Date().getFullYear() ||
                (m.schedule.getFullYear() === new Date().getFullYear() &&
                  m.schedule.getMonth() < new Date().getMonth()) ||
                (m.schedule.getFullYear() === new Date().getFullYear() &&
                  m.schedule.getMonth() === new Date().getMonth() &&
                  m.schedule.getDate() < new Date().getDate()))
              ?.map((holyMass, index) =>
                <HolyMassEditor
                  key={index}
                  holyMass={holyMass}
                  admin={admin ?? undefined}
                  onChange={holyMass => handleHolyMassUpdate(holyMass)}
                />
              )}
            <div className={styles.horizontalLine}/>
          </Collapse>

          {holyMasses
            ?.filter(m =>
              m.schedule.getFullYear() > new Date().getFullYear() ||
              (m.schedule.getFullYear() === new Date().getFullYear() &&
                m.schedule.getMonth() > new Date().getMonth()
              ) ||
              (m.schedule.getFullYear() === new Date().getFullYear() &&
                m.schedule.getMonth() === new Date().getMonth() &&
                m.schedule.getDate() >= new Date().getDate()))
            ?.map((holyMass, index) =>
              <HolyMassEditor
                key={index}
                holyMass={holyMass}
                admin={admin ?? undefined}
                onChange={holyMass => handleHolyMassUpdate(holyMass)}
              />
            )}

          <Button
            className={styles.button}
            icon='/icons/add.png'
            iconClassName={styles.icon}
            text='Add new Holy Mass'
            onClick={() => setHolyMasses([...holyMasses ?? [],
              {id: '', description: '', schedule: new Date()} as IHolyMass])}
          />

        </div>

      </div>


      <BodyEditor
        className={styles.bodyEditor}
        wrapperClassName={styles.wrapperClassName}
        body={pageSelections?.confessions ?? ''}
        onBodyUpdate={confessions => setPageSections({...pageSelections, confessions} as IHolyMassSections)}
      />

      <Button icon='/img/youtube.png' text='YouTube' onClick={() => Actions.redirect(Constants.fatherBenYouTubeChannel)}/>

      <BodyEditor
        className={styles.bodyEditor}
        wrapperClassName={styles.wrapperClassName}
        body={pageSelections?.body ?? ''}
        onBodyUpdate={body => setPageSections({...pageSelections, body} as IHolyMassSections)}
      />

      <div style={{width:'100%'}}>
        <ImagePicker
          title='Image Gallery'
          images={page.images}
          mainImage={page.mainImage}
          onChange={(images, mainImage) => setPage({...page, images, mainImage})}
        />
      </div>


      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </Body>
  );
}


export default EditHolyMassPage;