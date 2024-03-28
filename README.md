# Blog JSGURU.NET

## Theme Development

```bash
# Run hugo site
hugo serve
# Watch change theme assset
cd assets/themes/2022
yarn serve
# Build theme asset
cd assets/themes/2022
yarn build
```

## Content Creator

```bash
hugo new [archtype]/[post-name].md "Post title"
# archtype === 'post'

hugo new post/hello.md "hello"
```

### Get Remote Data

- https://gohugo.io/templates/data-templates/

### AWS Series post

```
hugo new post/aws-series-vpc.md "AWS Series VPC"
```

### AWS Labs Posts

```
hugo new post/aws-lab-series.md "AWS Lab Series - Build And Deploy RestApi in AWS"
```

### ReactJS Examples

```
hugo new post/reactjs-examples-vs-code-extensions.md "ReactJS Examples - VSCode Extensions 2024"
```

### React Native Tutorial

```
hugo new post/react-native-examples-setup-working-place-for-react-native-developer.md "[React Native Examples] Setup working place for React Native Developer"
```
