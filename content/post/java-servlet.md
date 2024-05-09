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

###

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