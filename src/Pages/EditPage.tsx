import React, {ChangeEvent, ChangeEventHandler, FunctionComponent, ReactNode, useEffect, useRef} from 'react';
import log from "loglevel";
import Api from "../Utiles/Api";
import {IPage} from "../Domain/IPage";
import Loading from "../Components/PageElements/Loading";
import PageCard from "../Components/AdminPage/PageCard";
import Modal from "../Components/PageElements/Modal";
import {useParams} from "react-router-dom";
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditPage.module.css";
import Button from "../Components/StyledComponents/Button";
import Actions from "../Utiles/Actions";
import Constants from "../Domain/Constants";
import Popup, {ModalHandle} from "../Components/PopUp/Popup";
import Gallery from "../Components/Carousel/Gallery";
import AdminHelper from "../Utiles/Admin";
import {IAdmin} from "../Domain/IAdmin";

const EditPage: FunctionComponent = () => {

  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [page, setPage] = React.useState<IPage | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const modalRef = useRef<ModalHandle | null>(null);
  const [popupContent, setPopupContent] = React.useState<React.JSX.Element | null>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const loadedImages = useRef(new Set<number>()).current;

  useEffect(() => {
    Api.listImages().then((images) => {
      if (!images) return;
      setImages(images);
    });
  }, []);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
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
      const admin = AdminHelper.getAdminCredentials();
      setAdmin(admin);

      Api.getPage(id).then((page) => {
        if (page) {
          page.images ??= [];
          setPage(page);
          setEditorState(EditorState.createWithContent(stateFromHTML(page.body)));
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
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const newPage = {...page, body};

    if (!page.id) {
      newPage.urlSegment = generateUrlSegment(page.title);
      await Api.createPage(newPage, admin?.token ?? '');
    } else {
      await Api.updatePage(newPage.id, newPage, admin?.token ?? '');
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

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);
    Api.uploadImage(formData, admin?.token ?? '').then((image) => {
      if (!image) return;
      const newPage = {...page, mainImage: image} as IPage
      setPage(newPage);
      modalRef.current?.toggle();
    });
  };

  const UploadImage = (
    <div>
      <input
        type="file"
        name="file"
        id="file"
        className={styles.inputfile}
        onChange={e => saveImage(e)}
      />

      <Button
        className={styles.button}
        text='Close'
        onClick={() => modalRef?.current?.toggle()}/>
    </div>
  );


  const SelectMainImage = () => (
    <div>
      <div className={styles.imageContainer}>
        {images.map((image, index) =>
          <button className={styles.imageButton} key={index}
                  onClick={() => setPage({...page, mainImage: image} as IPage)}>
            <img src={Api.getImageUrl(image)}
                 alt={index.toString()}
                 className={styles.listImages}
                 onLoad={() => {
                   loadedImages.add(index);
                   setImages(images => [...images]);
                 }}
            />
            {!loadedImages.has(index) && <Loading/>}
          </button>
        )
        }
      </div>

      <Button
        className={styles.button}
        text='Close'
        onClick={() => modalRef?.current?.toggle()}/>
    </div>
  );

  const addImageToGallery = (newImage: string) => {
    page?.images?.push(newImage);
    setPage({...page} as IPage);
  };

  const UpdateImageGallery = () => (
    <div>
      <div className={styles.imageContainer}>
        {images.map((image, index) =>
          <button className={styles.imageButton} key={index}
                  onClick={() => {
                    addImageToGallery(image)
                  }}>
            <img src={Api.getImageUrl(image)}
                 alt={index.toString()} className={styles.listImages}
                 onLoad={() => {
                   loadedImages.add(index);
                   setImages(images => [...images]);
                 }}
            />
            {!loadedImages.has(index) && <Loading/>}

          </button>
        )}
      </div>

      <Button
        className={styles.button}
        text='Close'
        onClick={() => modalRef?.current?.toggle()}/>

    </div>
  );

  const PoopUpContent = (content: React.JSX.Element) => {
    setPopupContent(content);
    modalRef?.current?.toggle();
  };


  return (
    <div className={styles.body}>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Title</p>
        <input className={styles.inputStyling} type="text" value={page?.title} onChange={e => updateTitle(e)}/>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Main Text</p>

        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName={styles.wrapperClassName}
          editorClassName={styles.editorClassName}
        />
      </div>


      <div className={styles.blockContainer}>
        <p className={styles.header}>Main Image</p>
        {page?.mainImage ?
          <div>
            <img src={Api.getImageUrl(page?.mainImage)} alt="main" className={styles.mainImage}/>

            <Button
              className={styles.button}
              icon='/icons/delete.png'
              text='Delete Main Image'
              onClick={() =>
                setPage({...page, mainImage: ''})
              }/>
          </div>
          : null}

        <div className={styles.buttonsContainer}>
          <Button
            className={styles.button}
            icon='/icons/upload.png'
            text='Upload New Image'
            onClick={() => PoopUpContent(UploadImage)}/>

          <Button
            className={styles.button}
            icon='/icons/image.png'
            text='Select Exsisting Image'
            onClick={() => PoopUpContent(
              <SelectMainImage/>
            )}/>
        </div>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Image Gallery</p>
        {page?.images?.length ?
          <div className={styles.galleryWrapper}>
            <Gallery
              items={page.images.map((item, index) => (
                <div key={index}>
                  <img className={styles.galleryImage}
                       src={Api.getImageUrl(item)}
                       alt={index.toString()}
                  />
                  <Button
                    className={styles.button}
                    icon='/icons/delete.png'
                    text='Remove from gallery'
                    onClick={() => {
                      let images = [...page?.images];
                      images = images.slice(0, index).concat(images.slice(index + 1));
                      setPage({...page, images} as IPage)
                    }}/>
                </div>
              ))}/>
          </div>
          : null}

        <div className={styles.buttonsContainer}>
          <Button
            className={styles.button}
            icon='/icons/upload.png'
            text='Upload New Image'
            onClick={() => PoopUpContent(UploadImage)}/>

          <Button
            className={styles.button}
            icon='/icons/image.png'
            text='Select Exsisting Image'
            onClick={() => PoopUpContent(
              <UpdateImageGallery/>
            )}/>
        </div>
      </div>

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={savePage}/>

      <Popup ref={modalRef}>
        {popupContent}
      </Popup>
    </div>
  );
}


export default EditPage;