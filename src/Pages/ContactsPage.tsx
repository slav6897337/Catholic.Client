import React from 'react';
import {defaultPage, IPage} from "../Domain/IPage";
import {Page} from "./Page";
import styles from "./ContactsPage.module.css";

const email = 'info@catholic.sk';

const ContactsPage: React.FC = () => {
  const [page, setPage] = React.useState<IPage>(preloadPage);
  const [loading, setLoading] = React.useState(false);

  return (
    <Page onPageLoad={p => setPage(p)} onLoading={l => setLoading(l)} preloadPage={page}>
      <div className={styles.contactsContainer}>

        <h2 className={styles.contactsTitle}>For more information contact us:</h2>

        <div className={styles.contactsTextContainer}>
          <div className={styles.contactsItemContainer}>
            <img src={'/icons/email.png'} alt='email'/>
            <p className={`${styles.contactsText}`}>EMAIL</p>
            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a>
          </div>

          <div className={styles.contactsItemContainer}>
            <img src={'/icons/address.png'} alt='address'/>
            <p className={`${styles.contactsText}`}>ADDRESS</p>
            <p>Church of St. Ladislaus Špitálska, 811 08 Staré Mesto, Bratislava</p>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: page.body}}/>
    </Page>
  );
}

export default ContactsPage;


const preloadPage: IPage = {
  ...defaultPage,
  title: 'Contact us'
};