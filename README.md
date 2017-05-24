# packaged ncarb-angular-common

This repo is for distribution on `bower`.

## Install

```shell
bower install ncarb-angular-common --save
```

Then add `ncarb.services and/or ncarb.directives` as a dependency for your app:

```javascript
angular.module('myApp', ['ncarb.services','ncarb.directives']);
```


Add a `<script>` reference to your `index.html` (otherwise let grunt wiredep handle it):

```html
<script src="/bower_components/ncarb-angular-common/servicesModule.js"></script>
```

## Docs

```shell
npm install -g conventional-changelog@1.1.0
```