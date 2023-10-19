import React, {ChangeEvent, ChangeEventHandler, FunctionComponent, ReactNode, useEffect, useRef} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {defaultPage, IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import PageCard from "../../Components/AdminPage/PageCard";
import Modal from "../../Components/PageElements/Modal";
import {useParams} from "react-router-dom";
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Constants from "../../Domain/Constants";
import Popup, {ModalHandle} from "../../Components/PopUp/Popup";
import Gallery from "../../Components/Carousel/Gallery";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import {defaultNews, INews} from "../../Domain/INews";
import BodyEditor from "../../Components/AdminPage/BodyEditor";
import PageEditor from "../../Components/AdminPage/PageEditor";

const EditNewsPage: FunctionComponent = () => {
  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [news, setNews] = React.useState<INews>(defaultNews);
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      const admin = AdminHelper.getAdminCredentials();
      setAdmin(admin);

      Api.getNews({take: 1000, skip: 0, holyMassOnly: false}).then((newsResponse) => {
        const news = newsResponse?.items?.find((item) => item.id === id);
        if (news) {
          setNews(news);
          if (news?.link) {
            Api.getPage(news.link).then((page) => {
              if (page) {
                page.images ??= [];
                setPage(page);
              }
              setLoading(false);
            });
          }
          else {
            setLoading(false);
          }
        }
      });
    } catch (e) {
      log.info(e);
    }
  }, []);

  const save = async () => {
    setLoading(true);

    if (!page) return;

    if (!page.id) {
      page.urlSegment = generateUrlSegment(page.title);
      await Api.createPage(page, admin?.token ?? '');
    } else {
      await Api.updatePage(page.id, page, admin?.token ?? '');
    }

    setLoading(false);

    //window.close()
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

      <BodyEditor
        body={news?.description ?? ''}
        title="News Description"
        onBodyUpdate={description => setNews({...news, description} as INews)}
      />

      <PageEditor page={page ?? {} as IPage}  onChange={setPage} showTitle={false}/>

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </div>
  );
}


export default EditNewsPage;