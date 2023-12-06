import React, {FunctionComponent, useEffect, useRef} from "react";
import styles from "./ImagePicker.module.css";
import Loading from "../PageElements/Loading";
import Api from "../../Utiles/Api";
import {IAdmin} from "../../Domain/IAdmin";
import Popup, {ModalHandle} from "../PopUp/Popup";
import Modal from "../PageElements/Modal";
import AdminHelper from "../../Utiles/Admin";
import ImageGallery from "../Carousel/ImageGallery";
import ImageCrop from "./ImageCrop";
import {ISize} from "../../Domain/ISize";

interface IProps {
  title: string;
  images: string[];
  mainImage?: string
  onChange: (images: string[], mainImage?: string) => void;
  titleClassName?: string;
  className?: string;
  crop?: ISize;
}

const ImagePicker: FunctionComponent<IProps> = ({
                                                  title,
                                                  onChange,
                                                  images,
                                                  mainImage,
                                                  crop
                                                }) => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modalLoading, setModalLoading] = React.useState<boolean>(false);
  const modalRef = useRef<ModalHandle | null>(null);
  const [popupContent, setPopupContent] = React.useState<React.JSX.Element | null>(null);

  const allImages = mainImage ? [mainImage, ...images] : images;

  useEffect(() => {
    const admin = AdminHelper.getAdminCredentials();
    setAdmin(admin);
  }, []);

  const pickImage = (e: HTMLInputElement) => {
    if (!e.files) return;

    if (crop) {
      PoopUpContent(Cropper(e.files[0]));
    } else {
      saveImage(e.files[0]);
    }
  };

  const Cropper = (image: File) => (
    <ImageCrop image={image}
               size={crop ?? {width: 1000, height: 500}}
               saveImage={(i) => saveImage(i)}
    />
  );

  const saveImage = (f: File | null) => {
    if (!f) return;
    setLoading(true);

    const formData = new FormData();
    formData.append(f.name, f);

    Api.uploadImage(formData, admin?.token ?? '').then((image) => {
      if (!image) return;
      onChange([...images, image], mainImage);
    }).finally(() => setLoading(false));
  };

  const deleteImage = async (image: string) => {
    setModalLoading(true);
    const newMainImage = image === mainImage ? undefined : mainImage;
    const newImages = images.filter(i => i !== image);
    onChange(newImages, newMainImage);
    await Api.deleteImage(image, admin?.token ?? '');
    setLoading(false);
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

  if (loading) return (<Loading/>);

  return (
    <>
      <div className={styles.blockContainer}>
        <p className={styles.header}>{title}</p>

        <form className={styles.inputLabelContainer}>
          <label className={styles.inputLabel}>
            <img className={styles.inputImage} src='/icons/upload.png' alt='Upload'/>
            <p>Upload New Image</p>
            <input
              type="file"
              name="file"
              id="file"
              accept='image/*'
              className={styles.inputFile}

              onChange={e => pickImage(e.target)}
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
