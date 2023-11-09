import React, { FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import {useParams} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import PageEditor from "../../Components/AdminPage/PageEditor";

const EditPage: FunctionComponent = () => {

  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [page, setPage] = React.useState<IPage | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const admin = AdminHelper.getAdminCredentials();
    setAdmin(admin);

    if (!id) {
      setPage({
        title: '',
        body: '',
        urlSegment: '',
        mainImage: '',
        images: Array<string>(),
      } as IPage);

      setLoading(false);
      return;
    }
    try {

      Api.getPage(id).then((page) => {
        if (page) {
          page.images ??= [];
          setPage(page);
          setLoading(false);
        }
      });
    } catch (e) {
      log.info(e);
    }
  }, []);

  const savePage = async () => {
    if (!page) return;
    setLoading(true);

    if (!page.id) {
      page.urlSegment = generateUrlSegment(page.title);
      await Api.createPage(page, admin?.token ?? '');
    } else {
      await Api.updatePage(page.id, page, admin?.token ?? '');
    }

    setLoading(false);

    window.close()
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage({...page, title: event.target.value} as IPage)
  };

  const generateUrlSegment = (title: string) => {
    return title.toLowerCase().trim().replace(/ /g, '-');
  }

  if (loading) return (
    <div className={styles.body}>
      <Loading/>
    </div>);

  return (
    <div className={styles.body}>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Title</p>
        <input className={styles.inputStyling} type="text" value={page?.title} onChange={e => updateTitle(e)}/>
      </div>

      <PageEditor page={page ?? {} as IPage} onChange={setPage} showTitle={false}/>

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={savePage}/>
    </div>
  );
}


export default EditPage;