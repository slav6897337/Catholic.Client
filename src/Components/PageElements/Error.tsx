import React, {useEffect} from 'react';
import styles from './Error.module.css';
import {ERROR, EventEmitter, POPUP_HIDDEN} from "../../Utiles/EventEmitter";

const Error: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    EventEmitter.on(ERROR, (error) => {
      setError(error);
      EventEmitter.trigger(POPUP_HIDDEN);
      setTimeout(() => {
        setError(null);
      }, 5000);
    });

    return () => EventEmitter.off(ERROR);
  }, []);

  return (
    <>
      {error ?
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
        : null}
    </>
  );
};
export default Error;