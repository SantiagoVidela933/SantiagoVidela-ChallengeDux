'use client';

import { Button } from 'primereact/button';
import styles from './Header.module.css';
import Image from 'next/image';
import logo from '/public/logo.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.icon}><Button icon="pi pi-cog" className={styles.iconButton} /></div>
    </header>
  )
}

