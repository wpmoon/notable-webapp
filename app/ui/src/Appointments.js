import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Appointments.module.css'

const Appointments = (props) => {
  const [schedule, setSchedule] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (props.selectedPhys !== null) {
      axios.get("http://localhost:8000/schedule/" + props.selectedPhys.id).then((res) => {
        setSchedule(res.data);
        setErr(null)
      }).catch(err => {
        setSchedule(null);
        setErr(err)
      })
    }
  }, [props.selectedPhys]);

  if (err) {
    return (
      <div className={styles.msg}>There was an server error</div>
    )
  }

  if (!schedule) {
    return (
      <div className={styles.msg}>Please select a physician to display today's appointments on the left</div>
    )
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.nameHeader}>Dr. {props.selectedPhys.first} {props.selectedPhys.last}</h2>
      <span className={styles.email}>{props.selectedPhys.email}</span>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Kind</th>
          </tr>
        </thead>
        <tbody>

          {schedule && schedule.appt.map((appt, index) => {
            return (
              <tr key={appt.name}>
                <td>{index + 1}</td>
                <td>{appt.name}</td>
                <td>{new Date(appt.time).toLocaleString([], { timeZone: "UTC", hour: "numeric", minute: "numeric", hour12: true })}</td>
                <td>{appt.kind}</td>
              </tr>
            )
          })}
        </tbody>

      </table>
    </div>

  )
}

export default Appointments