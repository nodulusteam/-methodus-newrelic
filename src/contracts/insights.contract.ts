import { Method, MethodConfig, Mapping, Inject } from '@methodus/server';
import { Entry, Events } from '../interfaces/event';
import { Verbs } from '@methodus/platform-rest';
import { NewrelicProvider } from '../providers/token.provider';

//  https://insights-collector.newrelic.com/v1/accounts/$accountId/events/
@MethodConfig('NewRelicInsights')
export class NewRelicInsights {
    constructor(@Inject('NewrelicTokenProvider') public newrelicProvider: NewrelicProvider) {

    }

    // async eventMany(message: Entry[]) {
    //     const ev: Events = {
    //         // common: {
    //         //     attributes: {
    //         //         service: process.env.NEW_RELIC_APP_NAME!,
    //         //         hostname: process.env.COMPUTERNAME!,
    //         //         environment: process.env.NODE_ENV!,
    //         //     }
    //         // },
    //         logs: message
    //     }
    //     return await this.simpleEvent(process.env.NEW_RELIC_LICENSE_KEY!, process.env.NEW_RELIC_ACCOUNT_ID!, message)
    // }


    async eventSingle(message: any) {
        // const appName = await this.newrelicProvider.getAppName();
        // message.service = appName;
        // message.hostname = process.env.COMPUTERNAME!;

        const license = await this.newrelicProvider.getLicenseKey();
        const accountId = await this.newrelicProvider.getAccountID();
        const ev: Events = {
            // common: {
            //     attributes: {
            //         service: process.env.NEW_RELIC_APP_NAME!,
            //         hostname: process.env.COMPUTERNAME!,
            //         environment: process.env.NODE_ENV!,
            //     }
            // },
            logs: message
        }
        return await this.simpleEvent(license, accountId, message)
    }

    @Method(Verbs.Post, '/v1/accounts/:accountId/events')
    async simpleEvent(@Mapping.Headers('X-License-Key') licenseKey: string, @Mapping.Param('accountId') accountId: string, @Mapping.Body() ev: any) { // 
        return {}
    }





}