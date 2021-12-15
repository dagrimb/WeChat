WeChat is a native, mobile chat application to be used on both Android and iOS devices. It was developed in React Native, employing several of its libraries, such as asyncStorage to store messages for offline access. Other technologies used are Expo, Android Emulator, and Google Firestore Database. Users are able to instantly chat with the ones they love, taking and sending pictures, as well as their current location.

TECHNOLOGIES USED
-React Native
-Expo (for developing/testing React Native apps)
-Android Emulator (to see how your app looks on various Android devices)
-Google Firestore Database (cloud-based database that allows users to store and retrieve real-time data)

SETTING UP THE DEVELOPMENT ENVIRONMENT: What you will need
-A computer and mobile device
-WiFi that both your computer and mobile device can access at the same time
-A terminal
-The latest LTS Node version. If on Windows 10, upgrade using nvm-windows; otherwise, use Node Version Management (NVM).
-Expo CLI, app, and account (all three for testing on your mobile device)- see setup description below
-Android Studio

SETTING UP EXPO

*Install Expo-CLI on your machine*
Navigate to the main project directory and enter the command **npm install expo-cli --global** (could take several minutes)

*Install the Expo app*
Search for the Expo app in iOS or Android app store and download to your device.

Here is what it looks like in the Google Play store:

<img src= "https://user-images.githubusercontent.com/74441727/146094107-ba6ac0fc-c4ff-456b-8e15-767b5226da39.png" width=200/>

And after you have installed and opened it:

<img src= "https://user-images.githubusercontent.com/74441727/146094224-0d54b3ba-f1ae-49e1-afee-55d3a2ad0e7b.png" width=200/>

*Expo account*: if you do not have one already, please go to Expo's website (http://expo.dev) and create a free account.



SETTING UP ANDROID STUDIO and ANDROID EMULATOR

*Windows 10 users*
-Enable "Virtualization Technology feature" (for increased performance)

Setup:
1) Download and install Android Studio (http://developer.android.com/studio). Once downloaded, follow the installation instructions and make sure you do not uncheck the box that says "Android Virtual Device"
2) After installation, locate and launch the Android Studio application
3) You will have a series of of steps to configured. When you get to **Install Type** be sure to select **Custom**
4) Continue to go through the screens. When you get to the **SDK Components Setup** screen, make sure to select **Android Virtual Device**
5) Keep press **Next** leaving everything as it is and **Finish** on the final screen to complete the download.
6) Android Studio should launch its startup screen. 
7) Click **Configure** and choose **SDK Manager**. 
8) Click **SDK Tools** tab
9) See if your **Android SDK Build-Tools** are installed. If not, click the row with that name and click the download icon next to it to download the latest version.

*AMD/Intel CPU users only*
-AMD: Enable/install "Android Emulator Hypervisor Driver for AMD processors(installer)" by checking its box (if it is not already installed)
-Intel: Enable/install "Intel x86 Emulator Accelerator (HAXM installer)" by checking its box (if it is not already installed)

*MacOS users only*
-Copy the path for the location of the Android SDK (in the **Android SDK Location** box near the top of your screen)
-If you are using the built-in MacOs Terminal, locate and open your **~/.zschr** file 
-In your **~/.zschr** file enter the following (make sure to edit the path in both of these with the path you copied in the Android SDK Location box):
  1) **export ANDROID_SDK=/Users/myuser/Library/Android/sdk
  2) **export PATH=/User/myuser/Library/Android/sdk/platform-tools:$PATH

10) Close **Settings for New Projects** window
11) Click **Configure, AVD Manager, Create Virtual Device** and a phone from the list.
12) Click **Next**
13) You should now be on a page that says "System Image." Clicked the tab that says **Recommended** and select an OS.
14) Clicked the **Download** link next to the OS you want to install.
15) After a few minutes, you will be able to enter a device name of your choice and select **Finish**.
16) Go to the Virtual Device Manager and select **Play**. This should launch your new emulator.
17) Go to the browser in your account and select **Run on Android device/emulator**. 


FIRESTORE DATABASE CONFIGURATION

*Purpose*
For storing messages and user info. Your database will ensure that the messages remain intact, even if you logout of the chat screen or go offline.

*Steps*
1) Go to the Google Firestore website: http://firebase.google.com
2) You can use your personal Google credentials create an account. Sign-in in the upper-right corner. 
3) Click **Go to Console** (also in the upper-righthand side of the screen)
4) New Users: click **Create Project**. Existing Users that have created projects before: click **Add Project**
5) Fill out the information in the form.
6) Give your project a name
7) Leave the default settings as is. Agree to the terms and click **Create Project**
8) You should now be at the dashboard where you will create your database. Go to the menu on the left-hand side and click **Develop**.
9) Click **Cloud Firestore**
10) Select **Create Database**
11) Click **Start in test mode**
12) For the location, choose an option under **Multi-region** that is nearest to you.
13) Click **Done** and your database should load.
14) Click **Start Collection** to launch modal. 
15) Type in collection name.
16) Go to your **Project Settings**. Under the **General** tab, go to the section that says **Your apps**. Click the **</>** button (otherwise known as the **Firestore for Web** button.
17) A new screen will open and will ask you to register the application. Fill in your chosen name for the app and click **Register**.
18) You should now have your personal configuration code for your database. Replace the default credentials in the **initializeApp()** function in Chat.js (lines 35-47) with this configuration code.


OTHER DEPEDENCIES/LIBRARIES NEEDED (to be installed in the root project folder via the CLI-- imports are already in place).
-React Navigation: **npm install --save react-navigation**
-The dependencies that React Navigation uses: 
a) **npm install @react-navigation/native @ react-navigation/stack**
b) **expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view**
-Gifted Chat: **npm install react-native-gifted-chat --save**
-Firestore (via Firebase): **npm install --save firebase@7.9.0**
-React Native's asyncStorage (for offline storage): **expo install @react-native-community/async-storage**
-NetInfo (for determining if application is offline): **expo install @react-native-community/netinfo**
-Expo Permissions API: **expo install expo-permissions**
-Expo ImagePicker API: **expo install expo-image-picker**
-Expo Location API: **expo install expo-location**
-React Native Maps API: **expo install react-native-maps**

WHAT YOUR **package.json** SHOULD LOOK LIKE

{
  "name": "wechat",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "@expo-google-fonts/dev": "^0.2.0",
    "@expo-google-fonts/inter": "^0.2.0",
    "@react-native-async-storage/async-storage": "~1.15.0",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "6.0.2",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/stack": "^6.0.11",
    "expo": "~43.0.2",
    "expo-app-loading": "~1.2.1",
    "expo-font": "~10.0.3",
    "expo-image-picker": "~11.0.3",
    "expo-location": "~13.0.4",
    "expo-permissions": "~13.0.3",
    "expo-status-bar": "~1.1.0",
    "firebase": "^7.9.0",
    "navigationbar-react-native": "^0.0.5",
    "prop-types": "^15.7.2",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-native": "0.64.3",
    "react-native-gesture-handler": "~1.10.2",
    "react-native-gifted-chat": "^0.16.3",
    "react-native-keyboard-aware-scroll-view": "^0.9.5",
    "react-native-maps": "0.28.1",
    "react-native-navigation-bar": "^0.2.1",
    "react-native-reanimated": "~2.2.0",
    "react-native-safe-area-context": "3.3.2",
    "react-native-screens": "~3.8.0",
    "react-native-web": "0.17.1",
    "react-navigation": "^4.4.4"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9"
  },
  "private": true
}

