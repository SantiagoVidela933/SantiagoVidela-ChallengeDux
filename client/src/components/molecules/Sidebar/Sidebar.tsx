'use client';

import { Button } from 'primereact/button';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.icon}><Button icon="pi pi-home" className={styles.iconButton} /></div>
      <div className={styles.icon}><Button icon="pi pi-users" className={styles.iconButton} /></div>
      <div className={styles.icon}><Button icon="pi pi-chart-line" className={styles.iconButton} /></div>
      <div className={styles.icon}><Button icon="pi pi-cog" className={styles.iconButton} /></div>
      <div className={styles.icon}><Button icon="pi pi-bell" className={styles.iconButton} /></div>
      <div className={styles.icon}><Button icon="pi pi-sign-out" className={styles.iconButton} /></div>
    </div>
  )
};

