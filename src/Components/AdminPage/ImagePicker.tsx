import React, {FunctionComponent, useEffect, useRef} from "react";
import styles from "./ImagePicker.module.css";
import Button from "../StyledComponents/Button";
import WhiteContainer from "../PageElements/WhiteContainer";
import Loading from "../PageElements/Loading";
import Api from "../../Utiles/Api";
import {IPage} from "../../Domain/IPage";
import {useParams} from "react-router-dom";
import {IAdmin} from "../../Domain/IAdmin";
import Popup, {ModalHandle} from "../PopUp/Popup";
import Gallery from "../Carousel/Gallery";
import Modal from "../PageElements/Modal";
import AdminHelper from "../../Utiles/Admin";
import log from "loglevel";
import ImageGallery from "../Carousel/ImageGallery";
import allNews from "../News/AllNews";

interface IProps {
  title: string;
  images: string[];
  mainImage?: string
  onChange: (images: string[], mainImage?: string) => void;
  titleClassName?: string;
  className?: string;
}

const ImagePicker: FunctionComponent<IProps> = ({title, onChange, images, mainImage, titleClassName, className}) => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modalLoading, setModalLoading] = React.useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const modalRef = useRef<ModalHandle | null>(null);
  const [popupContent, setPopupContent] = React.useState<React.JSX.Element | null>(null);
  const loadedImages = useRef(new Set<number>()).current;

  const allImages = mainImage ? [...images, mainImage] : images;

  useEffect(() => {
    const admin = AdminHelper.getAdminCredentials();
    setAdmin(admin);
  }, []);

  const saveImage = (e: HTMLInputElement) => {
    if (!e.files) return;
    setLoading(true);
    const file = e.files[0];
    const formData = new FormData();
    formData.append(file.name, file);

    Api.uploadImage(formData, admin?.token ?? '').then((image) => {
      if (!image) return;
      onChange([...images, image], mainImage);
    }).finally(() => setLoading(false));
  };

  const deleteImage = async (image: string) => {
    const newMainImage = image == mainImage ? undefined : mainImage;
    const newImages = images.filter(i => i !== image);
    onChange(newImages, newMainImage);

    await Api.deleteImage(image, admin?.token ?? '');
    modalRef.current?.toggle();
  };

  const makeManeImage = (image: string) => {
    const newImages = allImages.filter(i => i !== image);
    onChange(newImages, image);
  };

  const DeleteImage = (image: string) => (
    <Modal
      title='Are you certain you want to remove photo?'
      okOnClick={() => deleteImage(image)}
      cancelOnClick={() => modalRef?.current?.toggle()}
    />
  );

  const PoopUpContent = (content: React.JSX.Element) => {
    setPopupContent(content);
    modalRef?.current?.toggle();
  };

  if (loading) return (
    <div className={styles.body}>
      <Loading/>
    </div>);

  return (
    <>
      <div className={styles.blockContainer}>
        <p className={styles.header}>{title}</p>

        <form className={styles.inputLabel}>
          <img className={styles.inputImage} src='/icons/upload.png' alt='Upload' />
          <label>
            <p>Upload New Image</p>
            <input
              type="file"
              name="file"
              id="file"
              accept='image/*'
              className={styles.inputFile}

              onChange={e => saveImage(e.target)}
            />
          </label>
        </form>

        <ImageGallery
          images={allImages}
          rightButtonIcon='/icons/delete.png'
          rightButtonText='Delete image'
          rightButtonOnClick={index => PoopUpContent(DeleteImage(index))}
          leftButtonIcon={'/icons/wallpaper.png'}
          leftButtonText={'Pin to Top'}
          leftButtonOnClick={index => makeManeImage(index)}
          leftButtonCondition={image => mainImage !== image}
        />

      </div>

      <Popup ref={modalRef} loading={modalLoading}>
        {popupContent}
      </Popup>
    </>

  );
}

export default ImagePicker;
