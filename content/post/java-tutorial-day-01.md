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

**OOP**

```java
// Base class for all heroes
class Hero {
    // You might want to include common attributes or methods here
}

// Archer class that extends Hero
class Archer extends Hero {
    // Method to simulate firing an arrow
    public void fire() {
        System.out.println("Firing arrow");
    }
}

// Knight class that extends Hero
class Knight extends Hero {
    // Method to simulate a charge
    public void charge() {
        System.out.println("Charged");
    }
}

// Demo class to use these classes
public class Demo {
    public static void main(String[] args) {
        // Create an array of Hero objects
        Hero[] heroes = new Hero[2];
        heroes[0] = new Archer();
        heroes[1] = new Knight();

        // Iterate through the array and perform actions based on the type of Hero
        for (Hero hero : heroes) {
            if (hero instanceof Archer) {
                ((Archer) hero).fire();
            }
            if (hero instanceof Knight) {
                ((Knight) hero).charge();
            }
        }
    }
}

```

**Datetime**

```java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public static void playingWithDateTime() {
    LocalDate today = LocalDate.now();
    LocalDateTime currentTime = LocalDateTime.now();
    System.out.println("Now: " + today);
    System.out.println("Now: " + currentTime);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    System.out.println(currentTime.format(formatter));
}
```

There are 2 types of time

1. Moment

- The moment Vietnam won the AFF Cup at 7:30 p.m. on December 15, 2018

> moment = datetime + context

The context here is the time zone. Time zones are characterized by a time offset (offset) from the coordinated universal time UTC. Deviation is expressed as ±hh:mm

Vietnam belongs to the Indochina Time zone (Indochina Time - ICT) with an offset of UTC+07:00, meaning that the clock in Vietnam runs 7 hours faster than the UTC clock.

So that

> VNTime = UTC+07:00

> moment = UTC + offset

2. Relative/represent time

Is the time used only for display (relative/represent time - briefly called rtime), excluding time zone context.

- People from all over the world celebrate New Year's Eve at 00:00 on January 1 every year.
- International Women's Day is March 8

In daily life, when we want to compare times, we cannot use rtime, but must add a time zone or an offset to make rtime absolute (moment) before comparing.

> moment = rtime + (zone or offset)

> IANA Time Zone Database

- [IANA](https://www.iana.org/time-zones)

In the tz database, a time zone will have a name based on its geographical location, in the form of Area/Location, where area is the name of the continent or ocean, location is the name of the city or island.

The time zone in Ho Chi Minh City is called Asia/Ho_Chi_Minh
The time zone in Auckland (New Zealand) is called Pacific/Auckland
However, not every city has its own time zone. See the full list here.

Why we need this?

Daylight Saving Time (DST)

If you don't know, a city can use 2 time zones alternately during the year.

![image](https://gist.github.com/assets/31009750/9f9ad4b6-de8c-435f-bf4a-9f0f510ebce4)

![image](https://gist.github.com/assets/31009750/91114c8d-cf99-49f8-8284-3552914ff663)

```java
public static void playingWithTimezone() {
    // Convert relative time to moment
    String timeZone = "Asia/Ho_Chi_Minh";
    ZoneId zoneId = ZoneId.of(timeZone);
    Instant userInputDateTime = LocalDateTime.parse("2024-05-03T11:00:00").atZone(zoneId).toInstant();
    System.out.println(userInputDateTime); // 2024-05-03T04:00:00Z
}
```

### Java Array

- Static Size Array
- Dynamic Size Array

```java
    public static void playingWithArray() {
        // this is static size array
        String[] stringArray = {"A", "B", "C"};
        stringArray[0] = "X";
        System.out.println(stringArray[0]);
        // this is resizable array ( dynamic size )
        ArrayList<String> strings = new ArrayList<>();
        strings.add("A");
        strings.add("B");
        for (String string : strings) {
            System.out.println(string);
        }
        strings.remove(1);
        System.out.println(strings);
        strings.add("C");
        System.out.println(strings);
        strings.add("B");
        System.out.println(strings);
        strings.add("E");
        strings.set(strings.size() - 1, "F");
        System.out.println(strings);
        strings.remove(1);
        System.out.println(strings);
        System.out.println(strings.size());
        System.out.println(strings.get(2));
        Collections.sort(strings);
        System.out.println(strings);
    }
```

> Array List

- The ArrayList class has a regular array inside it. When an element is added, it is placed into the array. If the array is not big enough, a new, larger array is created to replace the old one and the old one is removed.

> LinkedList

- The LinkedList stores its items in "containers." The list has a link to the first container and each container has a link to the next container in the list. To add an element to the list, the element is placed into a new container and that container is linked to one of the other containers in the list.

- For many cases, the ArrayList is more efficient as it is common to need access to random items in the list, but the LinkedList provides several methods to do certain operations more efficiently: addFirst, addLast, removeFirst, removeLast, getFirst, getLast

```java
LinkedList<String> linkedList = new LinkedList<>();
linkedList.add("a");
linkedList.add("b");
linkedList.add("c");
linkedList.addFirst("x");
linkedList.addLast("y");
linkedList.addLast("z");
System.out.println(linkedList);
linkedList.removeFirst();
linkedList.removeLast();
```

> HashMap

```java
    public static void playWithHashMap() {
        HashMap<String, User> users = new HashMap<>();
        users.put("001", User.createUser(UserType.Admin));
        users.put("002", User.createUser(UserType.Member));
        for (Map.Entry<String, User> entry : users.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
        for (String userId : users.keySet()) {
            System.out.println(userId + " " + users.get(userId));
        }
        for (User user : users.values()) {
            System.out.println(user);
        }
        System.out.println(users.get("001"));
    }
```

## Reference

- [jEnv](https://www.jenv.be/)
- [sdkman](https://sdkman.io/install)
- [Packages and API](https://docs.oracle.com/en/java/javase/22/docs/api/index.html)
- []
