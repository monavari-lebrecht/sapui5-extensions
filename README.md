# SAPUI5/OpenUI5-Extensions

## Descrition

Bower component with additional components for SAPUI5/OpenUI5.

## Usage

1. ```bower install sapui5-extensions --save-dev```
2. register the sap.extension namespace in your sapui5 bootstrap tag:
Example:
    ```html
    <script id="sap-ui-bootstrap"
        src="bower_components/openui5-bower/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_bluecrystal"
        data-sap-ui-libs="sap.m, sap.ui.layout"
        data-sap-ui-xx-bindingSyntax="complex"
        data-sap-ui-resourceroots='{
                        "my.namespace": "./",
                        "openui5.extension": "bower_components/sapui5-extensions/src/"
        }'> /* endOfResourceroots */
    </script>
    ```
    
## Tests

### Karma

1. install dependencies by running   
    ```npm install```
2. start karma server  
    ```node_modules/karma/bin/karma start karma.conf.js```  
    Per default one PhantomJS Instance is also started, connects to karma and executes the tests.
3. Open a browser of your choice and connect it to [localhost:9876](http://localhost:9876/). The tests should be executed immediately.

### Browser

1. install dependencies by running
    ```npm install```
2. start grunt web server
    ```grunt connect:qunit```
3. Open a browser of your choice and open [localhost:9090](http://localhost:9090/). The tests should be executed immediately.

See also:

- [Karma](http://karma-runner.github.io/)
- [QUnit](http://qunitjs.com/)

## Contents

### openui5.extensions.ui.FunctionImport

```html
<openui5.extensions.ui.FunctionImport
  functionImportName="FunctionName"
  parameters="
    {
      Argument1: '1',
      Argument2: '2'
    }"
  asModelName="FunctionImport"
  modelName="SourceModel">
  <Text text="{FunctionImport>/Result}"/>
</openui5.extensions.ui.FunctionImport>
```
