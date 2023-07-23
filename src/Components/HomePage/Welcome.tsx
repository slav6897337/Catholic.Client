import {FunctionComponent} from "react";
import styles from "./Welcome.module.css";

const Welcome: FunctionComponent = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeTitleLine} />

      <p>
        We are an active, English-speaking Christian community located in
        Bratislava, Slovakia, which comes together to deepen our faith. Our
        weekly English language programs are open to all who seek a closer
        relationship with Our Lord Jesus Christ. "Click" on the above icons
        for more information on our varous programs. Again, welcome!
      </p>
      <h1>Who we are: yesterday and today</h1>
      <p>
        It all started in 1993, when a retired Divine Word missionary,
        Father Frantisek Sirovic SVD, started saying masses in English.
        Thereafter, we have been blessed to have diocesan priests serving
        us, as well as those representing the Divine Word, Jesuit,
        Redemptorist and Rogationist religious orders.
      </p>
      <p>{`We in the English speaking community come from all corners of the globe. We are a mix of ethnicities, nationalities and sometimes even denominations and religions. And while you can see Slovaks, Africans, Americans, Asians, British, Dutch, French, Germans, Italians, Spanish, etc. among us, we all sing the same songs and share the same communion. Some of us are permanent residents of Bratislava, others are just passing through and grace us with their presence. `}</p>
      <p>
        Whatever your circumstances, you are most cordially welcome to
        join us.
      </p>
      <p>Looking forward to seeing you!</p>
    </div>
  );
};

export default Welcome;
