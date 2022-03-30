import { Log, UserManager } from 'oidc-client-ts'
import oidcSettings from './config'

Log.setLogger(console)
Log.setLevel(Log.WARN)

declare module 'vue/types/vue' {
  interface Vue {
    $auth: UserManager;
  }
}

export const authenticationService = new UserManager(oidcSettings)

export default {
  install (Vue: any): void { // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    Vue.prototype.$auth = authenticationService
  }
}