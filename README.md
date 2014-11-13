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
                        "sap.extension": "bower_components/sapui5-extensions/src/"
        }'> /* endOfResourceroots */
    </script>
    ```

## Contents

### sap.extensions.ui.FunctionImport

```html
<sap.extensions.ui.FunctionImport
  functionImportName="FunctionName"
  parameters="
    {
      Argument1: '1',
      Argument2: '2'
    }"
  asModelName="FunctionImport"
  modelName="SourceModel">
  <Text text="{FunctionImport>/Result}"/>
</sap.extensions.ui.FunctionImport>
```
