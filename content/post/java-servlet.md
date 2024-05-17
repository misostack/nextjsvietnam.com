---
title: "Java Servlet"
type: "post"
date: 2024-05-08T09:16:47+07:00
description: "Java Servlet provide a component-based, platform-independent method for building Webbased applications"
keywords: ["java servlet"]
categories: ["java"]
tags: ["java"]
image: "https://gist.github.com/assets/31009750/eb25bb12-ca2c-4f67-88eb-4f472e74711c"
---

### Install Tomcat Server

- https://tomcat.apache.org/download-90.cgi#9.0.89

For windows, you can download zip and extract in your appropriate folder.

> C:/java/tomcat/

For linux/mac

```sh
mkdir tomcat
cd tomcat
curl -O https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.89/bin/apache-tomcat-9.0.89.tar.gz
tar xvf apache-tomcat-9.0.89.tar.gz
# if wanna start tomcat local
sudo mv apache-tomcat-9.0.89 /usr/local/tomcat
echo 'export CATALINA_HOME="/usr/local/tomcat"' >> ~/.zshrc

# Source the profile to update your current session
source ~/.zshrc
cd /usr/local/tomcat/bin
chmod +x *.sh
./startup.sh
```

You can access Tomcat server at http://localhost:8080/

```
Using CATALINA_BASE:   /usr/local/tomcat
Using CATALINA_HOME:   /usr/local/tomcat
Using CATALINA_TMPDIR: /usr/local/tomcat/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar
Tomcat started.
```

### To Integrate with Jetbrains

Edit -> Configuration -> Add New Configuration -> Tomcat Server Local

![image](https://gist.github.com/assets/31009750/1cd4b93a-121f-4adc-9ec4-5442a3d38be9)

Select Deployment

![image](https://gist.github.com/assets/31009750/f5ee231f-ed09-410c-b314-494ab1ec8929)

There are 2 types

- war only
- war exploded -> select this when development, your assets will be synced automatically

### Init project with maven

```sh
mvn org.apache.maven.plugins:maven-archetype-plugin:3.1.2:generate -DarchetypeArtifactId="maven-archetype-webapp" -DarchetypeGroupId="org.apache.maven.archetypes" -DarchetypeVersion="1.4" -DgroupId="net.refactoreverything" -DartifactId="reweb"
```

```xml
<!-- pom.xml -->
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>net.refactoreverything</groupId>
  <artifactId>reweb</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>reweb Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>22</maven.compiler.source>
    <maven.compiler.target>22</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>reweb</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```

```java
package net.refactoreverything;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, World!</h1>");
        out.println("</body></html>");
    }
}

```

> reweb\src\main\webapp\WEB-INF\web.xml

```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>net.refactoreverything.HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>

```

```sh
jar tf ROOT.war
cd /usr/local/tomcat/logs
docker exec -it javacore-app-1 sh
```

```Dockerfile
# Stage 1: Build the application using Maven and JDK 11
FROM maven:3.8.6-openjdk-11 AS build

# Copy the application source code and pom.xml to the image
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app

# Set the working directory for the build stage
WORKDIR /usr/src/app

# Compile and package the application
RUN mvn clean package

# Stage 2: Create the final image using Tomcat 9 with JDK 11
FROM tomcat:9.0-jdk11-corretto

# Remove the default web applications from Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the WAR file from the build stage to the Tomcat webapps directory
COPY --from=build /usr/src/app/target/*.war /usr/local/tomcat/webapps/ROOT.war

# Set the working directory to Tomcat's folder
WORKDIR /usr/local/tomcat

# Expose the port Tomcat listens on
EXPOSE 8080

# Command to run Tomcat
CMD ["catalina.sh", "run"]
```

### JSP

- Directive Tag

```jsp
<%-- Directive Tag --%>
<%@page    import="java.util.Random" %>
```

- Declaration Tag

```jsp
<%!
int counter = 0;
// Declaration tag
String convertNumberToTag(int number) {
    if(number < 0) {
        return "";
    }
    if(number <=6) {
        String headingTag = "h" + Integer.toString(number);
        return "<" + headingTag + ">Heading " + number + "</" + headingTag + ">";
    }
    return "<h6>Heading " + Integer.toString(number) + "</h6>";
}

int randomANumberGTETargetNumber(int targetNumber){
    // reset counter;
    counter = 0;
    int returnedValue = 0;
    if(targetNumber <= returnedValue){
        return targetNumber;
    }
    while(returnedValue < targetNumber) {
        returnedValue = new Random().nextInt(targetNumber) + 1;
        counter += 1;
    }
    return returnedValue;
}
%>
```

- Expression Tag

```jsp
<%-- Expression Tag --%>
<p>Number of times need to random the target number:<%= counter %></p>
```

- Scriptlet Tag

```jsp
<%
    // Scriptlet tag
    int n = randomANumberGTETargetNumber(10);
    for (int i = 0; i < n; i++) {
        out.println(convertNumberToTag(i+1));
    }
%>
```

Tags

```jsp
<%@include file="layout/header.jsp"%>
<%@ page import="java.time.LocalDateTime" %>
```

### JSP - Standard Tag Library (JSTL) Tutorial

Install dependencies package

> pom.xml

```xml
    <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/jakarta.servlet.jsp.jstl/jakarta.servlet.jsp.jstl-api -->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
```

Please take a look at this diagram.

In JSTL, if you wanna you custom tag on JSP page, you need to add it through @taglib

```jsp
<%@include file="/layout/header.jsp" %>
<h1><c:out value="${pageTitle}" /></h1>
<p>Hello world 123!</p>
<%@include file="/layout/footer.jsp" %>
```

### Connect to mysql

Add dependencies https://mvnrepository.com/artifact/mysql/mysql-connector-java

```xml
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
    </dependency>
```

### Connect DB and run query

```sql
CREATE SCHEMA `jsp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

USE jsp;

DROP TABLE IF EXISTS jsp_employees;

CREATE TABLE IF NOT EXISTS jsp_employees (
                                             id INT NOT NULL AUTO_INCREMENT,
                                             first_name VARCHAR(250) NOT NULL,
                                             email VARCHAR(250) NOT NULL,
                                             last_name VARCHAR(250) NOT NULL,
                                             PRIMARY KEY (id),
                                             CONSTRAINT UC_EMAIL UNIQUE (email)
);

INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Java',  'mrjava@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('C#',  'mrcsharp@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Golang',  'mrgolang@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Python',  'mrpython@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('PHP',  'mrphp@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Ruby',  'mrruby@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Kotlin',  'mrkotlin@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Swift',  'mrswift@nextjsvietnam.com', 'Mr');
INSERT INTO jsp_employees (first_name, email, last_name)
VALUES ('Dart',  'mrdart@nextjsvietnam.com', 'Mr');
```

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="model.Employee" %>
<%@ page import="java.util.ArrayList" %>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<sql:setDataSource var="db" driver="com.mysql.cj.jdbc.Driver" />

<%
    String DB_URL = "jdbc:mysql://localhost:3306/jsp";
    String DB_USER = "root";
    String DB_PASS = "123456";
    Connection connection = null;
    ArrayList<Employee> employees = new ArrayList<Employee>();
    try {
        // Load the MySQL JDBC driver
        Class.forName("com.mysql.cj.jdbc.Driver");

        // Establish connection to the database
        connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
        Statement statement = connection.createStatement();

        // Execute a SQL query
        String sql = "SELECT * FROM jsp_employees";
        ResultSet resultSet = statement.executeQuery(sql);

        // Process the ResultSet
        while (resultSet.next()) {
            int id = resultSet.getInt("id");
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");

            // Create an Employee object and add it to the list
            Employee employee = new Employee(id, email, firstName, lastName);
            employees.add(employee);
        }
    } catch (ClassNotFoundException e) {
        out.println("MySQL JDBC Driver not found: " + e.getMessage());
    } catch (SQLException e) {
        out.println("Database error: " + e.getMessage());
    } finally {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                out.println("Error closing the connection: " + e.getMessage());
            }
        }
    }
    request.setAttribute("pageTitle", "Employees");
%>

<%@ include file="layout/header.jsp" %>
<table class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <% for (Employee employee : employees) { %>
    <tr>
        <td><%= employee.getId() %></td>
        <td><%= employee.getFirst()%></td>
        <td><%= employee.getLast()%></td>
        <td><%= employee.getAge()%></td>
    </tr>
    <% } %>
</table>
<%@ include file="layout/footer.jsp" %>

```

**JSTL(Java Server Pages Standard Tag Library) version**

```jsp
<%@page language="java" contentType="text/html;" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="pageTitle" scope="request" type="String"/>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><c:out value="${pageTitle}" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
```

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="model.Employee" %>
<%@ page import="java.util.ArrayList" %>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<sql:setDataSource var="db"
                   driver="com.mysql.cj.jdbc.Driver"
                   url="jdbc:mysql://localhost:3306/jsp"
                   user="root"
                   password="123456"
/>
<sql:query var="resultSet" dataSource="${db}">SELECT * FROM jsp_employees</sql:query>
<%
    request.setAttribute("pageTitle", "Employees");
%>
<%@ include file="layout/header.jsp" %>
<table class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach items="${resultSet.rows}" var="employee">
                <tr>
                    <td><c:out value="${employee.id}" /></td>
                    <td><c:out value="${employee.first_name}" /></td>
                    <td><c:out value="${employee.last_name}" /></td>
                    <td><c:out value="${employee.email}" /></td>
                </tr>
        </c:forEach>
    </tbody>
</table>
<%@ include file="layout/footer.jsp" %>
```

## Reference

### Hot reload Mode with IntelliJ

![image](https://gist.github.com/assets/31009750/d30516a2-8fb7-4394-903b-45d2a61d2baa)

### Shorcuts

1. You can use the shortcut Shift + F10 (Windows/Linux) or Control + R (macOS) when your Tomcat run configuration is selected.
2. Update Resources: Ctrl + F10 (Windows/Linux) or Cmd + F10 (macOS) to update resources like HTML, CSS, and JavaScript.
3. Update Classes and Resources: Ctrl + Shift + F10 (Windows/Linux) or Cmd + Shift + F10 (macOS) to update Java classes and resources without restarting the server.
4. Open Run/Debug Configurations: Alt + Shift + F10 (Windows/Linux) or Control + Alt + R (macOS), then press 0 to edit configurations.
5. View Running Servers: Use the Services tab (Alt + 8 on Windows/Linux, Cmd + 8 on macOS) to view and manage running servers.
6. Remote Debugging: If you need to debug your application, set breakpoints as usual in your code, and instead of Run, use Debug (Shift + F9) to start the server in debug mode.
