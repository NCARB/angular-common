# packaged ncarb-angular-services

This repo is for distribution on `bower`.

## Install

You can install this package with `bower`.

Then add `ncarb.services` as a dependency for your app:

```javascript
angular.module('myApp', [require('ncarb.services')]);
```

### bower

```shell
bower install ncarb-angular-services --save
```

Add a `<script>` to your `index.html` (otherwise let grunt wiredep handle it):

```html
<script src="/bower_components/ncarb-angular-services/services.js"></script>
```

Then add `ncarb.services` as a dependency for your app:

```javascript
angular.module('myApp', ['ncarb.services']);
```
