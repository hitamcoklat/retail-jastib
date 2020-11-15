import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import CAccount from "./CAccount";
import Pesanan from "./Pesanan";
import Footer from './Footer';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';

const PageChange = () => {
    
    const globalState = useSelector(state => state)
    console.log(globalState.footer)

    useEffect(() => {

        OneSignal.setLogLevel(6, 0);

        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init(OPEN_SIGNAL_ID, { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

        OneSignal.addEventListener('received', onReceived);
        OneSignal.addEventListener('opened', onOpened);
        OneSignal.addEventListener('ids', onIds);

        return () => {
            OneSignal.removeEventListener('received', onReceived);
            OneSignal.removeEventListener('opened', onOpened);
            OneSignal.removeEventListener('ids', onIds);            
        }

    }, [])

    const onReceived = (notification) => {
        console.log("Notification received: ", notification);
    }

    const onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    const onIds = (device) => {
        console.log('Device info: ', device);
    }    

    function renderPage () {
        if(globalState.footer.PAGE == 'one') {
            return <PageOne />
        } else if (globalState.footer.PAGE == 'two') {
            return <Pesanan />
        } else if (globalState.footer.PAGE == 'account') {
            return <CAccount />
        } 
        else {
            return <PageThree />
        }
    }

    return (
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
            {renderPage()}
            <Footer />
        </View>
    );
}

export default PageChange;