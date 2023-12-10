import React, {FunctionComponent} from "react";
import styles from "./PageEditor.module.css";
import {IPage} from "../../Domain/IPage";
import BodyEditor from "./BodyEditor";
import ImagePicker from "./ImagePicker";

interface IProps {
  page: IPage;
  onChange: (page: IPage) => void;
  showTitle?: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
}

const PageEditor: FunctionComponent<IProps> = ({page, onChange, showTitle = true, resizeWidth, resizeHeight}) => {

  return (
    <div className={`${styles.body}`}>

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
        onBodyUpdate={(body, bodyText) => onChange({...page, body, bodyText} as IPage)}
      />

      <ImagePicker
        title='Image Gallery'
        images={page.images}
        mainImage={page.mainImage}
        onChange={(images, mainImage) => onChange({...page, images, mainImage})}
        resizeWidth={resizeWidth}
        resizeHeight={resizeHeight}
      />
    </div>
  );
}

export default PageEditor;
