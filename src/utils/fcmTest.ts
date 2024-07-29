import { toast } from "react-toastify";

export const SendNotification = async (recipientToken: string , setLoading : (loading: boolean) => void): Promise<void> => {

    const notificationPayload = {
        to: recipientToken,
        notification: {
            title: 'New Message',
            body: 'Hi there!',
        },
    };
    if (recipientToken) {
        setLoading(true);
        try {
            const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `key=${process.env.REACT_APP_SERVER_KEY}`,
                },
                body: JSON.stringify(notificationPayload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const text = await response.text();
            try {
                const data = JSON.parse(text); // Try to parse it as JSON
                console.log('Notification sent:', data);
            } catch (error) {
                console.error('Response is not valid JSON:', text);
            }
        } catch (err) {
            console.error('An error occurred while sending notification:', err);
        }
        finally{
            setLoading(false);
        }
    }
    else{
        toast.error('Recipient token is missing. Please enable push notifications.');
    }
};
