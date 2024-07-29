import { toast } from "react-toastify";

const generateRandomPhoneNumber = (): string => {
    // Generates a random 10-digit phone number
    const areaCode = Math.floor(Math.random() * 900) + 100; // 3 digits
    const prefix = Math.floor(Math.random() * 900) + 100; // 3 digits
    const lineNumber = Math.floor(Math.random() * 9000) + 1000; // 4 digits
    return `(${areaCode}) ${prefix}-${lineNumber}`;
};

export const SendNotification = async (recipientToken: string , setLoading : (loading: boolean) => void): Promise<void> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const greetings = [
        "Hello, how are you today?",
        "Hi there! Hope you're having a great day.",
        "Good morning! What can I do for you?",
        "Hey! How's it going?",
        "Greetings! How can I assist you?",
        "Hello! Nice to see you.",
        "Hi! What’s up?",
        "Welcome! How may I help you today?",
        "Hey there! Need any help?",
        "Good evening! How are you feeling today?",
        "Howdy! What’s new with you?",
        "Hi! It’s great to see you.",
        "Hello there! How’s everything?",
        "Hey! How can I make your day better?",
        "Greetings! What brings you here today?",
        "Hello! What’s on your mind?",
        "Hi there! What’s happening?",
        "Good day! How can I support you?",
        "Hey! Got any plans for today?",
        "Welcome back! How’s it going?",
        "Hello! What can I do for you right now?",
        "Hi! How can I be of service?"
    ];

    const randomIndex = Math.floor(Math.random() * greetings.length);
    const randomPhoneNumber = generateRandomPhoneNumber();

    const notificationPayload = {
        to: recipientToken,
        notification: {
            title: `New message from ${randomPhoneNumber}`,
            body: greetings[randomIndex],
        },
    }

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
