import React, {FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {defaultPage, IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditNewsPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import PageEditor from "../../Components/AdminPage/PageEditor";
import {Collapse} from "../../Components/StyledComponents/Collapse";
import IHolyMass from "../../Domain/IHolyMass";
import moment from "moment";

const EditHollyMassPage: FunctionComponent = () => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [hollyMasses, setHollyMasses] = React.useState<IHolyMass[]>();
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [collapse, setCollapse] = React.useState<boolean>(false);

  useEffect(() => {

    try {
      const admin = AdminHelper.getAdminCredentials();
      setAdmin(admin);

      Api.getPage('holy-mass').then((page) => {
        if (page) {
          console.log('page');
          page.images ??= [];
          setPage(page);
        }
      });
      Api.listHollyMasses().then(masses => {
        if(masses?.length){
          console.log('masses');
          setHollyMasses(masses);
        }
      })
    } catch (e) {
      log.info(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = async () => {
    if (!page || !page.body || !page.id) return;
    setLoading(true);

    page.urlSegment = 'holy-mass';
    await Api.updatePage(page.id, page, admin?.token ?? '');
    setLoading(false);

    window.close()
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage({...page, title: event.target.value} as IPage)
  };


  if (loading) return (
    <div className={styles.body}>
      <Loading/>
    </div>);

  return (
    <div className={styles.body}>

      {hollyMasses?.map((holyMass, index) =>
        <span key={index}>
              {moment(holyMass.date).format('dddd, MMMM DD h:mm')}
          at {moment(holyMass.date).format('h:mm a')}.
          {holyMass.description ? ` - ${holyMass.description}` : null}
          <br/>
            </span>
      )}



      {/*<BodyEditor*/}
      {/*  body={news?.description ?? ''}*/}
      {/*  title="News Description"*/}
      {/*  onBodyUpdate={description => setNews({...news, description} as INews)}*/}
      {/*/>*/}


      <Collapse isExpanded={collapse} text='Add Page for News' onClick={value => setCollapse(value)}>
        <PageEditor page={page ?? {} as IPage} onChange={setPage} showTitle={false}/>
      </Collapse>

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </div>
  );
}


export default EditHollyMassPage;