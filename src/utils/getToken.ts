import { getToken } from "firebase/messaging";
// import { getOrRegisterServiceWorker } from "./serviceWorker";
import { messaging } from "./firebase";


export const getFirebaseToken = async (): Promise<string | undefined> => {
  try {
    // const serviceWorkerRegistration = await getOrRegisterServiceWorker();
    const token = await getToken(messaging);
    console.log("DSADSA" , token)
    return token;
  } catch (error) {
    console.error("An error occurred while retrieving the Firebase token:", error);
    return undefined;
  }
};
