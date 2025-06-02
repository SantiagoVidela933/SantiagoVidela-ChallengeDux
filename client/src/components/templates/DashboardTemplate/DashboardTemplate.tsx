'use client';

import Header from '@/components/molecules/Header/Header';
import styles from './DashboardTemplate.module.css';
import Sidebar from '@/components/molecules/Sidebar/Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function DashboardTemplate({children}:Props){
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}