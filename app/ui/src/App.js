import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Appointments from './Appointments';

function App() {
  const [phys, setPhys] = useState(null);
  const [selectedPhys, selectPhys] = useState(null)
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/physicians").then((res) => {
      setPhys(res.data);
      setErr(null);
    }).catch(err => {
      setPhys(null);
      setErr(err);
    })
  }, []);

  const handleSelect = (phys) => {
    selectPhys(phys);
  }

  return (
    <div className={styles.center}>

    <div className={styles.app}>
      <div className={styles.physList}>
        <h3 className={styles.appName}>Notable</h3>
        <h3>Physicians</h3>
        { err ? (<div>There was an server error</div>) : (
          <ul>
          {phys && phys.physicians.map(phys => {
            return (
              <li key={phys.id} className={`${selectedPhys && selectedPhys.id === phys.id ? styles.selected : ''}`} onClick={() => handleSelect(phys)}>
                <span>{phys.name}</span>
              </li>
            )
          })}
        </ul>
        )}
        <div className={styles.logoutContainer}>
          <button className={styles.logout} onClick={() => {alert("You are logged out")}}>Logout</button>
        </div>
      </div>
      <Appointments selectedPhys={selectedPhys}/>
    </div>
    </div>

  );
}



export default App;
