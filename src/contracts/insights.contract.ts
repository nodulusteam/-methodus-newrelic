import { Method, MethodConfig, Mapping } from '@methodus/server';
import { Entry, Events } from '../interfaces/event';
import { Verbs } from '@methodus/platform-rest';

//  https://insights-collector.newrelic.com/v1/accounts/$accountId/events/
@MethodConfig('NewRelicInsights')
export class NewRelicInsights {
    async event(message: Entry[]) {
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
        return await this.simpleEvent(process.env.NEW_RELIC_LICENSE_KEY!, process.env.NEW_RELIC_ACCOUNT_ID!, message)
    }

    @Method(Verbs.Post, '/v1/accounts/:accountId/events')
    async simpleEvent(@Mapping.Headers('X-License-Key') licenseKey: string, @Mapping.Param('accountId') accountId: string, @Mapping.Body() ev: any) {
        return {}
    }





}