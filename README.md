# fews-web-oc



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Application Configuration

The application configuration is stored in the `.env` or the `public/app-config.json` file. All settings are provided as a key-value pair.
Settings in the `.env` file are parsed on build time, while settings in the `app-config.json` are handled on run-time.
The following settings can be provided:

| Key                                     | Description                                                                                                           |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `VUE_APP_FEWS_WEBSERVICES_URL`          | Url of the FewsWebServices, e.g. "https://rwsos-dataservices-ont.avi.deltares.nl/iwp/FewsWebServices"                 |
| `VUE_APP_REQUEST_HEADER_AUTHORIZATION`  | 'Bearer': pass OIDC `id_token` as bearer for request to the FewsWebServices                                           |
|                                         | 'Off': no Authorization request header                                                                                |
| `VUE_APP_AUTH_AUTHORITY`                | Url of the OIDC authority, e.g. "https://login.microsoftonline.com/MYTENANTID/".                                      |
|                                         | If not configured the web oc can be accessed without authentication.                                                  |
| `VUE_APP_AUTH_METADATA_URL`             | Url of the OIDC meta data, e.g. "https://login.microsoftonline.com/MYTENANTID/v2.0/.well-known/openid-configuration". |
| `VUE_APP_AUTH_SCOPE`                    | Scope, e.g. "openid profile email Offline_Access api://myclientid/Delft-FEWSWebServices".                             |
| `VUE_APP_REQUEST_HEADER_AUTHORIZATION`  | Url of the OIDC meta data, e.g. "https://login.microsoftonline.com/MYTENANTID/v2.0/.well-known/openid-configuration". |
| `VUE_APP_MAPBOX_TOKEN`                   | Mapbox token. Can be retrieved from: https://account.mapbox.com/access-tokens.                                       |

For general documentation about the Web OC, please see: 

[Documentation](docs/)

Pipeline trigger test.