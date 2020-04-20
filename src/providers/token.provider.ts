import { MethodConfig, Method } from "@methodus/server";


@MethodConfig('NewrelicProvider')
export class NewrelicProvider {

    @Method()
    async getAccountID() {
        if (process.env.NEW_RELIC_ACCOUNT_ID) {
            return process.env.NEW_RELIC_ACCOUNT_ID;
        } else {
            throw (`No NEW_RELIC_ACCOUNT_ID defined in env`)
        }
    }


    @Method()
    async getLicenseKey() {
        if (process.env.NEW_RELIC_LICENSE_KEY) {
            return process.env.NEW_RELIC_LICENSE_KEY;
        } else {
            throw (`No NEW_RELIC_LICENSE_KEY defined in env`)
        }
    }

    @Method()
    async getAppName() {
        if (process.env.NEW_RELIC_APP_NAME) {
            return process.env.NEW_RELIC_APP_NAME;
        } else {
            throw (`No NEW_RELIC_APP_NAME defined in env`)
        }
    }

    @Method()
    async getHostName() {
        if (process.env.NEW_RELIC_HOST_NAME) {
            return process.env.NEW_RELIC_HOST_NAME;
        } else {
            return process.env.COMPUTERNAME!;
        }
    }
}