import React, {FunctionComponent} from "react";
import styles from "./PageEditor.module.css";
import {IPage} from "../../Domain/IPage";
import BodyEditor from "./BodyEditor";
import ImagePicker from "./ImagePicker";
import admin from "../../Utiles/Admin";
import Button from "../StyledComponents/Button";

interface IProps {
  page: IPage;
  onChange: (page: IPage) => void,
  showTitle?: boolean
}

const PageEditor: FunctionComponent<IProps> = ({page, onChange, showTitle = true}) => {

  return (
    <div className={styles.body}>

      {showTitle &&
          <div className={styles.blockContainer}>
              <p className={styles.header}>Title</p>
              <input
                  className={styles.inputStyling}
                  type="text"
                  value={page.title}
                  onChange={e => onChange({...page, title: e.target.value})}
              />
          </div>
      }

      <BodyEditor
        body={page.body}
        title='Page Main Text'
        onBodyUpdate={body => onChange({...page, body} as IPage)}
      />

      <ImagePicker
        title='Image Gallery'
        images={page.images}
        onChange={images => onChange({...page, images})}
      />
    </div>
  );
}

export default PageEditor;
