import React, {FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {defaultPage, IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import {useParams} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditNewsPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import {defaultNews, INews} from "../../Domain/INews";
import BodyEditor from "../../Components/AdminPage/BodyEditor";
import PageEditor from "../../Components/AdminPage/PageEditor";
import Checkbox from "../../Components/StyledComponents/Checkbox";
import {Collapse} from "../../Components/StyledComponents/Collapse";

const EditNewsPage: FunctionComponent = () => {
  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [news, setNews] = React.useState<INews>(defaultNews);
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [collapse, setCollapse] = React.useState<boolean>(false);

  useEffect(() => {
    const admin = AdminHelper.getAdminCredentials();
    setAdmin(admin);

    if (!id) {
      setLoading(false);
      return;
    }
    try {
      Api.getNews({take: 1000, skip: 0, holyMassOnly: false}).then((newsResponse) => {
        const news = newsResponse?.items?.find((item) => item.id === id);
        if (news) {
          setNews(news);
          if (news?.link) {
            Api.getPage(news.link).then((page) => {
              if (page) {
                page.images ??= [];
                setPage(page);
                setCollapse(true);
                if(!news.link){
                  setNews({...news, link: generateUrlSegment(news.title)});
                }
              }
              setLoading(false);
            });
          } else {
            setPage({title: news.title, urlSegment: generateUrlSegment(news.title), body:''} as IPage)
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
    await saveNews();
    await savePage();
    setLoading(false);

    //window.close()
  };

  const savePage = async () => {
    if (!page || !page.body) return;
    if (!page.id) {
      await Api.createPage(page, admin?.token ?? '');
    } else {
      await Api.updatePage(page.id, page, admin?.token ?? '');
    }
  };

  const saveNews = async () => {
    if (!news) return;
    if (!news.id) {
      await Api.createNews(news, admin?.token ?? '');
    } else {
      await Api.updateNews(news.id, news, admin?.token ?? '');
    }
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage({...page, title: event.target.value} as IPage)
    setNews({...news, title: event.target.value, link: page.body ? generateUrlSegment(news.title) : null} as INews)
  };

  const updatePage = (page: IPage) => {
    setPage(page);
    if(!news.link){
      setNews({...news, link: generateUrlSegment(news.title)})
    }
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
        <input className={styles.inputStyling} type="text" value={news.title ?? page?.title}
               onChange={e => updateTitle(e)}/>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>News Description</p>
        <textarea
          className={styles.inputDescriptionStyling}
          maxLength={200}
          value={news.description}
          onChange={e =>  setNews({...news, description: e.target.value} as INews)                  }
        />
      </div>

      <Checkbox
        value={news.isChurchNews}
        text='Show this news only on Holly Mass page'
        onClick={isChurchNews => setNews({...news, isChurchNews} as INews)}
      />

      <Collapse isExpanded={collapse} text='Add Page for News' onClick={value => setCollapse(value)}>
        <PageEditor page={page ?? {} as IPage} onChange={updatePage} showTitle={false}/>
      </Collapse>

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </div>
  );
}


export default EditNewsPage;