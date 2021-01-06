# Simple Barcode Identifier

In this simple project my intention was to create a function that identifies product names by barcode using the google search api

9780099477464 &rarr; brave new world

## Setup
Clone the project
```
git clone https://github.com/vmotta8/barcode-identifier.git
```

Install dependencies
```
barcode-identifier % yarn
```

Create secrets.config.ts
```
export default {
  CUSTOM_SEARCH_API_KEY: '',
  SEARCH_ENGINE_ID: ''
}
```

Place the barcode in the index file and run
```
barcode-identifier % yarn name
```

