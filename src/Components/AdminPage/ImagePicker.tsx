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

interface IProps {
  title: string;
  images: string[];
  onChange: (images: string[]) => void;
  titleClassName?: string;
  className?: string;
}

const ImagePicker: FunctionComponent<IProps> = ({title, onChange, images, titleClassName, className}) => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modalLoading, setModalLoading] = React.useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const modalRef = useRef<ModalHandle | null>(null);
  const [popupContent, setPopupContent] = React.useState<React.JSX.Element | null>(null);
  const loadedImages = useRef(new Set<number>()).current;

  useEffect(() => {
      const admin = AdminHelper.getAdminCredentials();
      setAdmin(admin);
  }, []);

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setModalLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);

    Api.uploadImage(formData, admin?.token ?? '').then((image) => {
      if (!image) return;
      onChange([...images, image]);
      modalRef.current?.toggle();
    }).finally(() => setModalLoading(false));
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
    </div>
  );

  const deleteImage = async (index: number) => {
    const newImages = images.slice(0, index).concat(images.slice(index + 1));
    onChange(newImages);

    await Api.deleteImage(images[index], admin?.token ?? '');
    modalRef.current?.toggle();
  };

  const DeleteImage = (index: number) => (
    <Modal
      title='Are you certain you want to remove photo?'
      okOnClick={() => deleteImage(index)}
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

        <Button
          className={styles.addButton}
          icon='/icons/upload.png'
          text='Upload New Image'
          onClick={() => PoopUpContent(UploadImage)}
        />

        <ImageGallery
          images={images}
          buttonIcon='/icons/delete.png'
          buttonText='Delete image'
          buttonOnClick={index => PoopUpContent(DeleteImage(index))}
        />

      </div>


      <Popup ref={modalRef} loading={modalLoading}>
        {popupContent}
      </Popup>
    </>

  );
}

export default ImagePicker;
