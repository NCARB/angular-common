# packaged angular-services

This repo is for distribution on `npm` and `bower`.

## Install

You can install this package either with `npm` or with `bower`.

### npm

```shell
npm install ncarb-angular-services
```

Then add `ncarb.services` as a dependency for your app:

```javascript
angular.module('myApp', [require('ncarb.services')]);
```

### bower

```shell
bower install ncarb-angular-services
```

Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/ncarb-angular-services/services.js"></script>
```

Then add `ncarb.services` as a dependency for your app:

```javascript
angular.module('myApp', ['ncarb.services']);
```
