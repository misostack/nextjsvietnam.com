---
title: "Java Tutorial 2025 Day 02 - Write Test with JUnit5"
type: "post"
date: 2025-07-02T13:49:22+07:00
description: "Java Tutorial 2025 Day 02"
keywords: ["Java Tutorial 2025 Day 02"]
categories: ["java"]
tags: ["java"]
image: /articles/java-tutorial-2025-day-02/001.png
---

### Source Code

- [Source code](https://github.com/RefactorEveryThing/ret_java_cli_001)

Add package to **pom.xml**

- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api

```xml
    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

```java
package com.nextjsvietnam;

import java.time.LocalDate;

public class DateUtils {
    public long dateDiff(LocalDate date1, LocalDate date2) {
        if (date1.isBefore(date2)){
            return date1.datesUntil(date2).count();
        }
        return date2.datesUntil(date1).count();
    }

    public long currentWeek(LocalDate d) {
        // Week Number = floor((days since January 1st + starting weekday offset) / 7) + 1
        LocalDate firstDayOfYear = LocalDate.of(d.getYear(), 1, 1);
        var daysSinceFirstDayOfYear = firstDayOfYear.datesUntil(d).count();
        var startWeekDayOffset = (long)firstDayOfYear.getDayOfWeek().getValue();
        return (long)Math.floor((double)(daysSinceFirstDayOfYear + startWeekDayOffset)/7) + 1;
     }
}
```

Write tests

```java
// src/test/java/com/nextjsvietnam/DateUtilsTest.java
package com.nextjsvietnam;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DateUtilsTest {
    @Test
    void SameDateTestCase() {
        var dateUtils = new DateUtils();
        var d1 = LocalDate.of(2025, 1, 1);
        var d2 = LocalDate.of(2025, 1, 1);
        assertEquals(0, dateUtils.dateDiff(d1, d2));
    }

    @Test
    void firstDateLessThanSecondDateTestCase() {
        var dateUtils = new DateUtils();
        var d1 = LocalDate.of(2024, 12, 31);
        var d2 = LocalDate.of(2025, 1, 1);
        assertEquals(1, dateUtils.dateDiff(d1, d2));
    }

    @Test
    void firstDateGreaterThanSecondDateTestCase() {
        var dateUtils = new DateUtils();
        var d1 = LocalDate.of(2025, 1, 31);
        var d2 = LocalDate.of(2025, 1, 1);
        assertEquals(30, dateUtils.dateDiff(d1, d2));
    }

    @Test
    void week27Test() {
        var dateUtils = new DateUtils();
        var today = LocalDate.now();
        assertEquals(27, dateUtils.currentWeek(today));
    }
}
```

### Run test

```sh
mvn clean test

mvn -Dtest=DateUtilsTest test

mvn -Dtest=DateUtilsTest#week27Test test
```

### Test report

- https://mvnrepository.com/artifact/org.apache.maven.plugins/maven-surefire-report-plugin
- https://maven.apache.org/surefire/maven-surefire-report-plugin/usage.html

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.13.2</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>5.13.2</version>
    <scope>test</scope>
</dependency>
<!-- https://mvnrepository.com/artifact/org.apache.maven.plugins/maven-surefire-report-plugin -->
<dependency>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-report-plugin</artifactId>
    <version>3.5.3</version>
</dependency>
```

```sh
mvn site
mvn surefire-report:report
```

![Report overview](/articles/java-tutorial-2025-day-02/002.png)

Add environment

![env](/articles/java-tutorial-2025-day-02/003.png)

### Repeat Tests

```java
    @DisplayName("TC1: Generate a number from specific range")
    @RepeatedTest(
            value = 50,
            name = "Repeating {displayName} {currentRepetition}/{totalRepetitions}"
    )

    void generateNumberTest() {
        int start = 50, end = 100;
        Random random = new Random();
        var randomNumber = random.nextInt(50, end + 1);
        assertTrue( randomNumber >= start && randomNumber <= end);
    }
```

### Parameterized Tests

```xml
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-params</artifactId>
            <version>5.13.2</version>
            <scope>test</scope>
        </dependency>
```

```java
    @DisplayName("Parameter Tests")
    @ParameterizedTest(name = "{displayName} with str={arguments}")
    @ValueSource(strings = {"a", "b", "c"})
    void parametersTest(String str) {
        assertFalse(str.isBlank());
    }

    @DisplayName("MethodSource")
    @ParameterizedTest()
    @MethodSource("phoneNumberList")
    void methodSourceTest(String str) {
        assertFalse(str.isEmpty());
    }

    private static List<String> phoneNumberList(){
        return Arrays.asList("012345678", "123456789");
    }

    @DisplayName("CsvFileSource")
    @ParameterizedTest()
    @CsvFileSource(resources = "/examples.csv", numLinesToSkip = 1)
    void csvFileSourceTest(String input, String expected) {
        String newValue = input.toUpperCase();
        assertEquals(newValue, expected);
    }
```

![test resource folder](/articles/java-tutorial-2025-day-02/004.png)

### Nested Tests

```java
package com.nextjsvietnam;
import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.jupiter.params.provider.ValueSources;

import static org.junit.jupiter.api.Assertions.*;

class DateUtilsTest {
    @Test
    @DisplayName("TC1: Same Date")
    void SameDateTestCase() {
        var dateUtils = new DateUtils();
        var d1 = LocalDate.of(2025, 1, 1);
        var d2 = LocalDate.of(2025, 1, 1);
        assertEquals(0, dateUtils.dateDiff(d1, d2));
    }

    @Test
    @DisplayName("TC2: 1st date less than 2nd date")
    void firstDateLessThanSecondDateTestCase() {
        var dateUtils = new DateUtils();
        var d1 = LocalDate.of(2024, 12, 31);
        var d2 = LocalDate.of(2025, 1, 1);
        assertEquals(1, dateUtils.dateDiff(d1, d2));
    }

    @Test
    @DisplayName("TC3: 1st date greater than 2nd date")
    void firstDateGreaterThanSecondDateTestCase() {
        var dateUtils = new DateUtils();
        var d1 = LocalDate.of(2025, 1, 31);
        var d2 = LocalDate.of(2025, 1, 1);
        assertEquals(30, dateUtils.dateDiff(d1, d2));
    }

    @Test
    @DisplayName("TC1: Week27")
    void week27Test() {
        var dateUtils = new DateUtils();
        var today = LocalDate.of(2025, 7, 2);
        assertEquals(27, dateUtils.currentWeek(today));
    }

    @Test
    @DisplayName("TC1: Assumption Sample")
    void assumptionSampleTest() {
        System.out.println(System.getProperty("ENV"));
        Assumptions.assumeTrue("DEV".equals(System.getProperty("ENV")));
        assertEquals("DEV", System.getProperty("ENV"));
    }

    @DisplayName("TC1: Generate a number from specific range")
    @RepeatedTest(
            value = 50,
            name = "Repeating {displayName} {currentRepetition}/{totalRepetitions}"
    )

    void generateNumberTest() {
        int start = 50, end = 100;
        Random random = new Random();
        var randomNumber = random.nextInt(50, end + 1);
        assertTrue( randomNumber >= start && randomNumber <= end);
    }


    @Nested
    class ExampleNestedTestOrGroupTests {
        @DisplayName("Parameter Tests")
        @ParameterizedTest(name = "{displayName} with str={arguments}")
        @ValueSource(strings = {"a", "b", "c"})
        void parametersTest(String str) {
            assertFalse(str.isBlank());
        }

        @DisplayName("MethodSource")
        @ParameterizedTest()
        @MethodSource("phoneNumberList")
        void methodSourceTest(String str) {
            assertFalse(str.isEmpty());
        }

        private static List<String> phoneNumberList(){
            return Arrays.asList("012345678", "123456789");
        }

        @DisplayName("CsvFileSource")
        @ParameterizedTest()
        @CsvFileSource(resources = "/examples.csv", numLinesToSkip = 1)
        void csvFileSourceTest(String input, String expected) {
            String newValue = input.toUpperCase();
            assertEquals(newValue, expected);
        }
    }
}
```
