import React from 'react';
import styles from './Notification.module.css';

interface Props {
    message: string;
}

export const Notification: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
};
