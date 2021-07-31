import React from 'react';
import './Notification.module.css';

interface Props {
    message: string;
}

export const Notification: React.FC<Props> = ({ message }) => {
    return (
        <div className={'notification'}>
            <p>{message}</p>
        </div>
    );
};
