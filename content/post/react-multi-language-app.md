---
title: "React Multi Language App"
type: "post"
date: 2023-03-16T01:49:48+07:00
description: "The fast and furious way to add multi language in your react application."
keywords: ["React Multi Language App"]
categories: ["reactjs"]
tags: []
image: "/common/no-image.png"
---

The key is using the right tool. I've find out i18n-next is the best one for javascript ecosystem. It also supports ReactJS, VueJS, Angular, and many

Here is your tips

```sh
npm install react-i18next i18next  --save
yarn add react-i18next i18next i18next-icu
```

**Create your I18nAdapter**

```js
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nActiveLanguage } from "./i18n-switcher";
import ICU from "i18next-icu";
import en from "./en";
import vn from "./vn";
import enDataset from "./en-dataset";
import vnDataset from "./vn-dataset";

export const i18nResources = {
  en: {
    translation: {
      ...enDataset,
      ...en,
    },
  },
  vn: {
    translation: {
      ...vnDataset,
      ...vn,
    },
  },
};

const i18nAdapter = createInstance({
  fallbackLng: i18nActiveLanguage,
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  resources: i18nResources,
});

i18nAdapter.use(initReactI18next).use(ICU).init();

export default i18nAdapter;

import { useTranslation } from "react-i18next";

const I18nTrans = ({ k, params }) => {
  const { t } = useTranslation();
  if (!k) {
    throw new Error(`Please define your fucking key!!!`);
  }
  return t(k, params || {});
};

// i18n switcher
import { FormControl, MenuItem, Select, makeStyles } from '@material-ui/core';
import { I18N_SUPPORTED_LANGUAGES } from 'constants/common';
import { ENV_I18N_DEFAULT_LANGUAGE } from 'env/local';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles(() => {
  const whiteColor = 'rgba(255, 255, 255)';
  return {
    select: {
      color: whiteColor,
      padding: '6px',
      marginTop: '3px',
      '&:before': {
        content: 'none',
      },
      '&:after': {
        content: 'none',
      },
    },
    icon: {
      fill: whiteColor,
    },
  };
});

const I18nSwitcher = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyle();

  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('lang') || 'vn'
  );

  const handleChange = ({ target }) => {
    i18n.changeLanguage(target.value);
    localStorage.setItem('lang', target.value);
    setCurrentLang(target.value);
  };
  return (
    <>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={currentLang}
          onChange={handleChange}
          className={classes.select}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}>
          {I18N_SUPPORTED_LANGUAGES.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export const i18nActiveLanguage =
  localStorage.getItem('lang') ?? ENV_I18N_DEFAULT_LANGUAGE;

export default I18nSwitcher;

```

**Usage**

```js
import { I18nextProvider } from "react-i18next";
import i18nAdapter from "i18n/i18n-adapter";

<I18nextProvider i18n={i18nAdapter}>
  <App />
</I18nextProvider>;

import I18nTrans from 'i18n/i18n-text';
// without params
<I18nTrans k={'ConfigTheme.ConfigThemStep1.title'} />
// with params
<I18nTrans k={'ConfigTheme.ConfigThemStep1.title'} params={numPhotos:10} />

const { t } = useTranslation();

t('your.key');
```
