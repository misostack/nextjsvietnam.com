---
title: "Java for Beginner"
type: "post"
date: 2022-10-12T09:03:37+07:00
description: "Java languages, essential Java classes, GUI"
keywords: ["java", "java-beginner"]
categories: ["java"]
tags: ["java"]
image: "https://user-images.githubusercontent.com/31009750/179880182-c9ef3fc3-6a72-42e4-9d06-69ee336e085f.png"
---

## Materials

- [Java Beginner Learning Path](https://docs.oracle.com/javase/tutorial/tutorialLearningPaths.html)
- [Java Developer Center](https://dev.java/learn/)

## Overview Architecture

![image](https://user-images.githubusercontent.com/31009750/179880593-d0c60179-b32b-4f19-b490-a4729d35db10.png)

> Java Platform

![image](https://user-images.githubusercontent.com/31009750/179880656-d0c59894-64ef-4c32-8c0d-72f6730aa553.png)

> What can Java do?

![image](https://user-images.githubusercontent.com/31009750/179881065-c161a4e7-2e6c-49be-a036-0ea9e497f86a.png)

## Development Tools

- [Netbeans](https://netbeans.apache.org/kb/docs/java/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)

### Setup Development Environment

1. Install Java

- [Install JDK & JRE](https://www.oracle.com/java/technologies/downloads/#java8-windows)

> What does Java 8 Packages include ?

![image](https://user-images.githubusercontent.com/31009750/179881422-085f412a-f764-4793-9df3-6dd0acd95fab.png)

## Getting Start

> Object Oriented Concept

- Object
- Class
- Instance
- Inheritance

> Language Basic

- Variables
- Data types
- Operators
- Control flow
- Array
- Annotation
- Interface and inheritance
- Numbers & Strings
- Generic
- Lambda Expressions
- Pattern matching
- Exceptions
- Packages

> Debug & Test

- [Sample Debug & Test with Netbeans](https://netbeans.apache.org/kb/docs/java/)

> Excercises

1. Create a program read a csv file and display on screen in table format of its content. Limit to 10 rows, if user press esc then stop, if user press arrow down ( go to next 10 rows) and in contrast ( arrow up ).
2. Create a program that can crawl data from a list of newspaper ( allow user can select ) and save into an SQLite database
3. Create a program that can read a csv file and insert data in an SQLite database

## Create GUI with Swing

- [Headfirst Swing](https://docs.oracle.com/javase/tutorial/uiswing/index.html)

## Build, Run, Package Management

- [Maven](https://maven.apache.org/what-is-maven.html)
- [Using Maven with Netbeans](https://netbeans.apache.org/wiki/MavenBestPractices.asciidoc)

> Day 1 : Java Variables

```java
package javacore.net;

import java.text.NumberFormat;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        // customer information
        String customerName;
        String customerDob;
        String customerEmail;
        String customerPhoneNumber;
        char customerGender;
        boolean isActiveCustomer;
        int customerPoint;
        double customerBalance;

        // init values
        customerName = "Learn Enough Java";
        customerDob = "01/01/2000";
        customerEmail = "learn.enough.java@nextjsvietnam.com";
        customerPhoneNumber = "+84937590678";
        customerGender = 'M';
        customerPoint = 2530000;
        customerBalance = 5175.25;
        isActiveCustomer = true;

        String customerInformation = ""
                + "Customer Name : " + customerName + "\n"
                + String.format("Customer Dob: %s\n", customerDob)
                + String.format("Customer Email: %4s\n", customerEmail)
                + String.format("Customer PhoneNumber: %s\n", customerPhoneNumber)
                + String.format("Customer Gender: %s\n", customerGender == 'M' ? "Male" : "Female")
                + String.format("Customer Point: %s points\n", NumberFormat.getInstance().format(customerPoint))
                + String.format("Customer Balance: %s USD\n", NumberFormat.getCurrencyInstance(new Locale("en-US")).format(customerBalance))
                + String.format("Customer is active: %s\n", isActiveCustomer ? "Yes" : "No");

        System.out.println(customerInformation);
    }
}
```

> Day 2 : Java Array & Loop

1. Java Array's length is fixed
2. You can use ArrayList to make a dynamic size array.

```java
package javacore.net;

// Day 2: Java Array & Loops
public class JavaArrayLoop {
    public static void run() {

        // There are 26 letters in English
        char[] englishLetters = new char[26];
        byte letterCount = 0;
        for (char c = 'a'; c <= 'z'; c++) {
            englishLetters[letterCount] = c;
            letterCount++;
        }
        String englishAlphabet = "";
        for (byte i = 0; i < englishLetters.length; i++) {
            englishAlphabet += Character.toString(englishLetters[i]) + " ";
        }
        System.out.printf("%s\n", englishAlphabet.trim());
        System.out.printf("%s\n", englishAlphabet.trim().toUpperCase());

        String[] listOfRepeatedChars = JavaArrayLoop.generateRepeatedCharacters(5);
        for (byte i = 0; i < listOfRepeatedChars.length; i++) {
            System.out.printf("%s ", listOfRepeatedChars[i]);
        }
        System.out.println();

        int[] customerPoints = {10, 3, 6, 3, 8, 2, 5, 8, 3, 7};
        JavaArrayLoop.sortCustomerPoints(customerPoints);
        for (int i = 0; i < customerPoints.length; i++) {
            System.out.printf("%s ", customerPoints[i]);
        }
    }

    static char[] getEnglishAlphabet() {
        // There are 26 letters in English
        char[] englishLetters = new char[26];
        byte letterCount = 0;
        for (char c = 'a'; c <= 'z'; c++) {
            englishLetters[letterCount] = c;
            letterCount++;
        }
        return englishLetters;
    }

    // write a function to generate a list of string like this
    // IF N= 5 THEN output = ["a", "bb", "ccc", "dddd", "eeeee"];
    static String[] generateRepeatedCharacters(int n) {
        String[] result;
        result = new String[n];
        var letters = JavaArrayLoop.getEnglishAlphabet();
        for (int i = 0; i < n; i++) {
            result[i] = Character.toString(letters[i]).repeat(i + 1);
        }
        return result;
    }

    // write a sort function in one dimension number array
    static void sortCustomerPoints(int[] points) {
        // selection sort
        // split your array into 2 parts: left, right
        // left is the sorted parts, right is the unsorted parts
        // the main idea is pick an item from right part and compare it with last item in left parts
        int tmp;
        for (int i = 0; i < points.length - 1; i++) {
            for (int j = i + 1; j < points.length; j++) {
                // we will find the smallest element and put it in the left parts
                if (points[j] < points[i]) {
                    // swap position
                    tmp = points[i];
                    points[i] = points[j];
                    points[j] = tmp;
                }
            }
        }
    }
}

```

> Day 3 : Java Array List

```java
package javacore.net;

import java.util.ArrayList;

public class JavaArrayList {
    public static void run() {
        // Programming languages
        ArrayList<String> programmingLanguages = new ArrayList<String>();
        String userInput = "java,c#,php,python,ruby,javascript,go,haskell,typescript,kotlin,dart,swift";
        String[] arrayOfStr = userInput.split(",");
        for (String item : arrayOfStr
        ) {
            programmingLanguages.add(item);
        }

        for (int i = 0; i < programmingLanguages.size(); i++) {
            System.out.printf("%d. %s\n", i + 1, StringHelper.toCaptitalize(programmingLanguages.get(i)));
        }
    }
}

// StringHelper.java
package javacore.net;

public class StringHelper {
    public static String toCaptitalize(String str) {
        // convert to char

        // uppercase first char
        String newStr = "";
        for (int i = 0; i < str.length(); i++) {
            newStr += str.charAt(i);
            if (i == 0) {
                newStr = newStr.toUpperCase();
            }
        }
        return newStr;
    }
}

```
