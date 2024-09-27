# i18n-google-sheets-manager

Export translation files from Google Docs spreadsheets.


## Configuration file

The project is configured through a json files whose default name is i18n-gs.json and is loaded from current directory.

To specify a different filename or path use the -c or --config configuration file path.

```
i18n-gs -c path/to/config-file.json
```


### Configuration file JSON structure


Prop | Description | Type | Default
------ | ------ | ------ | ------
**`credentials`** | Credendials informations | Credential object or path to a credential json file | **Required**
**`docID`** | Google sheet document id | string | **Required**
**`outputs`** | Array of outputs objects | Output[] | **Required**



### Credentials object / JSON structure


Prop | Description | Type | Default
------ | ------ | ------ | ------
**`client_email`** | Client email | string | **Required**
**`private_key`** | Private key | string | **Required**



### Output object structure


Prop | Description | Type | Default
------ | ------ | ------ | ------
**`sheetIndex`** | index of sheet | number | **Required**
**`method`** | 'json', 'yaml', 'po', 'strings' or 'android' file export | string | **Required**
**`outputDir`** | path of output directory | string | **Required**
**`fileName`** | filename / path relative to output dir, can contain a mustache value {{locale}}, ie: '{{locale}}.json' | string | optional
**`keyPathSeparator`** | Separator used on key, false to disable key extraction | string or false| "."


example file
```
{
  "credentials": "credentials.json",
  "docID": "...",
  "outputs": [
    {
      "sheetIndex": 0,
      "keyPathSeparator": ".",
      "method": "json",
      "outputDir": "./export/",
      "fileName": "{{locale}}/message_{{locale}}.json"
    },
    {
      "sheetIndex": 0,
      "keyPathSeparator": ".",
      "method": "yaml",
      "outputDir": "./export/",
      "fileName": "{{locale}}/message_{{locale}}.yml"
    },
    {
      "sheetIndex": 0,
      "keyPathSeparator": ".",
      "method": "po",
      "outputDir": "./export/",
      "fileName": "{{locale}}/LC_MESSAGES/message.po"
    },
    {
      "sheetIndex": 0,
      "method": "strings",
      "outputDir": "./export/",
       "fileName": "{{locale}}.lproj/Localizable.strings"
    },
    {
      "sheetIndex": 0,
      "method": "android",
      "outputDir": "./export/",
      "fileName": "values-{{locale}}/strings.xml"
    }
  ]
}
```
