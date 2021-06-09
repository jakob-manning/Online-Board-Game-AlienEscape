import React, {useEffect} from 'react';
import favicon from "../../Images/android-chrome-512x512.png"

const NotificationHandler: React.FC = () => {
    // Initialize notifications
    try {
        Notification.requestPermission()
    } catch (e) {
        console.log(e);
    }

    const notify = (title: string, body: string) => {
        new Notification(title, {
            body: body,
            icon: favicon,
        });
    }

    useEffect( () => {
        notify("hello world", "How are you doing?")
        return

    },[])

    return (
        <div>
            <p>Testing Notifications</p>
            {Notification.permission}

        </div>
    );
};

export default NotificationHandler;
