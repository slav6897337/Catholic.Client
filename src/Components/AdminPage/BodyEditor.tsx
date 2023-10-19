import React, {FunctionComponent, useEffect} from "react";
import styles from "./BodyEditor.module.css";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw, EditorState} from "draft-js";
import {stateFromHTML} from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";

interface IProps {
  body: string;
  title: string;
  onBodyUpdate: (body: string) => void
  titleClassName?: string;
  className?: string;
}

const BodyEditor: FunctionComponent<IProps> = (props) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  useEffect(() => {
    setEditorState(EditorState.createWithContent(stateFromHTML(props?.body)));
  }, []);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    props.onBodyUpdate(body);
  };

  return (
      <div className={`${styles.container} ${props.className}`}>
        {props.title && <h3 className={`${styles.header} ${props.titleClassName}`}>{props.title}</h3>}

        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName={styles.wrapperClassName}
          editorClassName={styles.editorClassName}
        />
      </div>
  );

}

export default BodyEditor;