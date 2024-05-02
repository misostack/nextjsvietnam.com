---
title: "Java Tutorial Day 01 - Hello World!"
type: "post"
date: 2024-05-02T09:04:38+07:00
description: "Java Tutorial Day 01"
keywords: ["Java Tutorial Day 01"]
categories: ["java"]
tags: ["java"]
image: "https://gist.github.com/assets/31009750/eb25bb12-ca2c-4f67-88eb-4f472e74711c"
---

**Goals**

1. [x] Install multiple version java in your local
2. [x] Introduction of Java IDE
3. [x] Run Hello World Example
4. [x] OOP and Packages

## Install multiple version java in your local

To manage multiple Java versions on macOS, you can use a version manager like jEnv or SDKMAN!. Here's how to set up each:

### SDKMAN

```sh
curl -s "https://get.sdkman.io" | bash
```

```sh
sdk list java
sdk install java 11.0.2-open
sdk install java 17.0.2-open
```

- https://sdkman.io/jdks

```sh
sdk list java | grep oracle
sdk install java 22-oracle
sdk use java 22-oracle
sdk default java 22-oracle
```

## Install Java IDE

- [IntelliJ IDE](https://www.jetbrains.com/idea/)

## Run Hello World

Let's create a new project with IntelliJ (Java IDE).

![image](https://gist.github.com/assets/31009750/091c0816-4259-4bff-8260-182ae5a829b7)

Some informations, we should take note:

- Build System: IntelliJ | Maven | Graddle
- JDK: Oracle OpenJDK 22

![image](https://gist.github.com/assets/31009750/0dc95cd9-5061-47e0-ac02-d3b696ec545e)

```sh
cd src
javac Main.java
java Main
```

### Data Types

1. Numbers

- Integers: byte, short, int , long
- Floating Point: float, double(8 bytes)
- BigDecimal: for accounting

2. Strings

- String

3. Characters

- char ( 2bytes )

4. Boolean

- boolean

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void dataTypes() {
        String firstName = "Java";
        String lastName = "Essentials";
        int age = 25;
        float salary = 10000.00f;
        boolean married = true;
        char aChar = 'a';

        System.out.println(firstName + " " + lastName + " " + age + " " + salary + " " + married + " " + aChar);

        System.out.printf("%s\n %s\n", firstName, salary);

        double a = 3, b = 4, c;
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        System.out.println(c);
        float d1 = (float) 2/3;
        float d2 = (float) 1/3;
        System.out.println(d1 + " + " +  d2 + " = " + d1 + d2); // 0.6666667 + 0.33333334 = 0.66666670.33333334
        double e = (double) 2/3;
        double z = (double) 2/3; // 0.6666666666666666
        System.out.println(e);
        System.out.println(e == z);
        System.out.println(e == d1);
        // BigDecimal for accounting

        BigDecimal number = new BigDecimal(2);
        System.out.println(number.divide(new BigDecimal(3),100, RoundingMode.HALF_UP));
    }

    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.printf("Hello and welcome!");
        Main.dataTypes();

        for (int i = 1; i <= 5; i++) {
            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("i = " + i);
        }
    }
}
```

## OOP and Packages

```java
import package.name.Class;   // Import a single class
import package.name.*;   // Import the whole package
```

Create your own package

![image](https://gist.github.com/assets/31009750/5e678e69-b362-490e-a559-21d8895ab060)

```java
package example;

public class Example {
    public static void main(String[] args) {
        System.out.println("This is Example package!");
    }

    private String title;

    public Example(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return this.title;
    }
}
```

```java
// src/Main.java
import example.Example;

public static void main(String[] args) {
    // OOP
    Example example = new Example("Java");
    System.out.println(example + " " + example.getTitle());
    System.out.println(example.getClass().getName());
}
```

```sh
minhson@mymac src % javac example/Example.java
minhson@mymac src % java example.Example
This is Example package!
```

## Reference

- [jEnv](https://www.jenv.be/)
- [sdkman](https://sdkman.io/install)
- [Packages and API](https://docs.oracle.com/en/java/javase/22/docs/api/index.html)
