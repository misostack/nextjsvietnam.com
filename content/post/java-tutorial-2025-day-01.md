---
title: "Java Tutorial 2025 Day 01: Hello CLI"
type: "post"
date: 2025-06-28T15:19:22+07:00
description: "Java Tutorial 2025 Day 01"
keywords: ["Java Tutorial 2025 Day 01"]
categories: ["java"]
tags: ["java"]
image: /articles/java-tutorial-2025-day-01/001.png
---

### SourceCode

- [Source code](https://github.com/RefactorEveryThing/ret_java_cli_001)

**Create Main App**

![Create main app](/articles/java-tutorial-2025-day-01/002.png)

```java
mkdir -p  src/main/java/com/nextjsvietnam
package com.nextjsvietnam;

public class App {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}

```

**Set the appropriate java version**

```sh
touch .sdkmanrc
sdk env
mvn --version
```

> .sdkmanrc content

```
java=22-oracle
```

Build and run with maven cli

```sh
mvn
```

## Maven Cheatsheet

| Command            | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `mvn validate`     | Validate that the project’s `pom.xml` is correct and all necessary information is available. |
| `mvn compile`      | Compile source code of the project.                                                          |
| `mvn test-compile` | Compile test source code.                                                                    |
| `mvn test`         | Run tests using a suitable unit testing framework (e.g. JUnit).                              |
| `mvn package`      | Take the compiled code and package it (e.g. JAR, WAR).                                       |
| `mvn verify`       | Run any checks on results of integration tests to ensure quality criteria.                   |
| `mvn install`      | Install the package into the local repository, for use as a dependency in other projects.    |
| `mvn deploy`       | Copy the final package to the remote repository for sharing with other developers.           |

| Command                  | Description                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `mvn clean`              | Remove the `target/` directory with all build output.                                          |
| `mvn site`               | Generate a site (documentation, reports) for the project.                                      |
| `mvn site:run`           | Generate and serve the project site on a local web server.                                     |
| `mvn dependency:tree`    | Print the dependency hierarchy for the project.                                                |
| `mvn dependency:analyze` | Analyze declared vs. used dependencies.                                                        |
| `mvn help:effective-pom` | Display the effective POM as seen by Maven (after inheritance and interpolation).              |
| `mvn help:describe`      | Show detailed information about a plugin or goal (e.g. `mvn help:describe -Dplugin=compiler`). |
| `mvn help:help`          | Display help for Maven itself or for a specific plugin/goal.                                   |

### Typical workflow with maven

```sh
# 1. Clean, compile, run tests, package, install to local repo
mvn clean install

# 2. Clean, compile, package, then run your main class
mvn clean package exec:java -Dexec.mainClass=com.nextjsvietnam.App

# 3. Quickly compile and test with debug output
mvn clean test -X

# 4. Dependency analysis and tree
mvn dependency:analyze dependency:tree

# 5. Generate site and open locally
mvn site site:run

```

Add new package to POM

```sh
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.nextjsvietnam</groupId>
    <artifactId>ret_java_cli_001</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>22</maven.compiler.source>
        <maven.compiler.target>22</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <build>
        <plugins>
            <!-- Ensure the compiler uses the release flag -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <release>22</release>
                </configuration>
            </plugin>

            <!-- Upgrade the dependency plugin to a version that understands Java 22 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <version>3.8.1</version>
            </plugin>
        </plugins>
    </build>
</project>
```

Create a Makefile

```sh
# Load environment vars from .env (must be in KEY=VALUE format)
-include .env

# Default to 'local' if ENVIRONMENT isn't set in .env
ENVIRONMENT ?= local

# Project root
ROOT_DIR := $(shell pwd)

# Maven command
MVN := mvn

# Your main class
MAIN_CLASS := com.nextjsvietnam.App

# Phony targets
.PHONY: all install run clean package

# Default target
all: install

install:  ## Install dependencies and build the project
	@echo "[$(ENVIRONMENT)] Installing and building in $(ROOT_DIR)"
	@$(MVN) clean install

run: install  ## Build and run the application
	@echo "[$(ENVIRONMENT)] Running application"
	@$(MVN) clean package exec:java -Dexec.mainClass=$(MAIN_CLASS)

clean:  ## Clean up build artifacts
	@echo "[$(ENVIRONMENT)] Cleaning project"
	@$(MVN) clean

package:  install ## Clean up build artifacts
	@echo "[$(ENVIRONMENT)] Package project"
	@$(MVN) package

```

```sh
make
make install
make run
make clean
make package
```

Output file stay at

```sh
./target/ret_java_cli_001-1.0-SNAPSHOT.jar
```

Run a java jar

```sh
java -cp "./target/ret_java_cli_001-1.0-SNAPSHOT.jar:lib/*" com.nextjsvietnam.App
```

```js
java
Invoke the Java Virtual Machine.

-cp (or -classpath)
Sets the classpath—the list of places the JVM searches for .class files and JARs.

"my-app-1.0-SNAPSHOT.jar:lib/*"

my-app-1.0-SNAPSHOT.jar
Your application’s own JAR.

:
Classpath separator on macOS/Linux (; on Windows).

lib/*
“All JARs in the lib/ directory.” Any third-party libraries you copied there via mvn dependency:copy-dependencies.

com.mycompany.app.App
The fully-qualified name of the class whose public static void main(String[]) you want to run.
```

## Ship to developer or enduser

### Ship to developer

- [Shade Only] (https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html)

> pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.nextjsvietnam</groupId>
    <artifactId>ret_java_cli_001</artifactId>
    <version>1.0</version>

    <properties>
        <maven.compiler.source>22</maven.compiler.source>
        <maven.compiler.target>22</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <build>
        <plugins>
            <!-- Ensure the compiler uses the release flag -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <release>22</release>
                </configuration>
            </plugin>

            <!-- Upgrade the dependency plugin to a version that understands Java 22 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <version>3.8.1</version>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.6.0</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <manifestEntries>
                                        <Main-Class>com.nextjsvietnam.App</Main-Class>
                                        <Build-Number>2025962801</Build-Number>
                                    </manifestEntries>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

### Ship to end users

**Shade + Appassembler**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.nextjsvietnam</groupId>
    <artifactId>ret_java_cli_001</artifactId>
    <version>1.0</version>

    <properties>
        <maven.compiler.source>22</maven.compiler.source>
        <maven.compiler.target>22</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <build>
        <plugins>
            <!-- Ensure the compiler uses the release flag -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <release>22</release>
                </configuration>
            </plugin>

            <!-- Upgrade the dependency plugin to a version that understands Java 22 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <version>3.8.1</version>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.6.0</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <manifestEntries>
                                        <Main-Class>com.nextjsvietnam.App</Main-Class>
                                        <Build-Number>2025962801</Build-Number>
                                    </manifestEntries>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>appassembler-maven-plugin</artifactId>
                <version>2.1.0</version>
                <executions>
                    <execution>
                        <id>generate-scripts</id>
                        <phase>package</phase>
                        <goals>
                            <goal>assemble</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <programs>
                        <program>
                            <mainClass>com.nextjsvietnam.App</mainClass>
                            <name>greeting_cli</name>
                        </program>
                    </programs>
                    <repositoryName>repo</repositoryName>
                    <assembleDirectory>${project.build.directory}/app</assembleDirectory>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

Output

```sh
./target/app/bin/greeting_cli
./target/app/bin/greeting_cli.bat
```

### When to choose which ?

**Shade-only**

- ✅ You need the simplest build.
- ✅ Your users don’t mind java -jar ….
- ✅ You’re distributing it as part of another package or Docker image.

**Shade + Appassembler**

- ✅ You want a frictionless, “native” CLI feel.
- ✅ You need both Unix and Windows launchers.
- ✅ You’re handing this tool to non-Java users.

Either way, you end up with a self-contained artifact. If minimal setup is your goal, go with Shade-only; if maximum polish and ease of use is your goal, add Appassembler.
