---
title: "[React Native Examples] Setup Working Place for React Native Developer"
type: "post"
date: 2024-03-28T08:51:55+07:00
description: "In this tutorial, you will learn how to setup an efficient working place for React Native developers"
keywords:
  ["React Native Examples Setup Working Place for React Native Developer"]
categories: ["cheatsheet", "react-native-examples"]
tags: ["react-native"]
image: "https://gist.github.com/assets/31009750/95a8de37-b9d3-4f73-9d72-0aeecaf1a257"
---

## Forewords

### What is React Native?

![image](https://gist.github.com/assets/31009750/2934a1f8-e2b4-4e32-b3e6-e7c1ad81d952)

### Technical View

#### Views

> JSX Components are compiled to Native Views, not the javascript logic code.

![image](https://gist.github.com/assets/31009750/805856fb-d359-4c8f-9fe0-41f542a5fc44)

> Components are compiled

![image](https://gist.github.com/assets/31009750/218d3ce4-0fc8-4802-bbb3-f41ce4afc7b7)

![image](https://gist.github.com/assets/31009750/3a8e2c2d-51a9-4ef2-b948-9a21f68676a9)

#### What about JS Logic Code?

![image](https://gist.github.com/assets/31009750/1132f3fe-136b-4abb-8543-fde966e79ec6)

### Expo CLI vs React Native CLI

![image](https://gist.github.com/assets/31009750/02be7f09-776b-421f-8358-837bcd81a924)

**Conclusion**:

- You can start with expo cli because of easy working flow and less setup
- With expo, you can test with native functions like camera with devices more easier.
- You can always switch from expo cli to react native cli just by using "eject"
- With React Native CLI setup, you can mix between js code and platform native code, such as: kotline or swift
- React Natve CLI required more setup

## Setup working environment

- [x] Install [Android Studio](https://developer.android.com/studio)
- [x] Create new [React Native project with expo](https://reactnative.dev/docs/environment-setup)
- [ ] VSCode Extension and setup Debug
- [ ] Setup Android Studio To publish your app for testing
- [ ] Setup Android Studio To publish your app for production

### Install Android Studio

- Download the latest Android Studio version at official link
- Then you can create a new virtual device(which will be used to run for testing your React Native app)

![image](https://gist.github.com/assets/31009750/f5702b20-b5a4-4efd-8b0f-1ebfeef08dba)

And you get this virtual device on your screen

![image](https://gist.github.com/assets/31009750/796df274-4531-46b6-85b8-dac2eb4e912d)

### Create new React Native project with expo

```sh
npx create-expo-app rn2024
cd rn2024
npm i
npm run start
```

![image](https://user-images.githubusercontent.com/31009750/317572581-ae416229-2370-482a-94ba-4d33d0f8fcca.png)

As you can see, if you wanna run on your virtual devices, just press "a". Make sure you start your virtual device first. You can check list of your android devices like this

```sh
adb list
# You may see something like this
# List of devices attached
# emulator-5554   device
```

![image](https://gist.github.com/assets/31009750/6e460a7c-0300-42ec-aeca-455702c3f4b2)

And this is how your app display in virtual device

![image](https://gist.github.com/assets/31009750/f4a7087d-75a7-4ee0-9d76-13b049d5db7b)

### Start your android emulator via command line

To start an Android emulator on Windows using the command line, you first need to make sure that the Android SDK and the emulator are correctly installed and that the emulator command is properly set up in your system's PATH

> C:\Users\[Your-Username]\AppData\Local\Android\Sdk\emulator

```sh
# list device
emulator -list-avds
# start device
emulator -avd Pixel_3a_API_34_extension_level_7_x86_64
# start with non-interactive mode/deamon mode
start /min emulator -avd Pixel_3a_API_34_extension_level_7_x86_64 > output.txt
```

Feel free to find details at [https://developer.android.com/studio/run/emulator-commandline](https://developer.android.com/studio/run/emulator-commandline)

### Connect localhost API with android emulator

#### 1st Option

Android emulators use the special IP address **10.0.2.2** to refer to the localhost of the host machine.

So instead of using http://localhost:8000, you shoud change it to http://10.0.2.2:8000 when accessing from emulator.

If you are developing with Android 9 (API level 28) or higher, you must also configure the network security settings to allow clear text (non-HTTPS) communication, as 10.0.2.2 might not have an SSL certificate.

**Create or edit the network_security_config.xml in the res/xml folder of your project:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
</network-security-config>
```

**Reference this file in your manifest inside the <application> tag:**

```xml
<application
    ...
    android:networkSecurityConfig="@xml/network_security_config"
    ...
>
    ...
</application>
```

#### 2nd Option

```sh
adb forward tcp:EMULATOR_PORT tcp:PC_PORT
```

Eg: your api is at http://127.0.0.1:8000

```sh
adb forward tcp:8000 tcp:8000
```
