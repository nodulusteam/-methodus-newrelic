import { Method, MethodConfig, Mapping } from '@methodus/server';
import { Entry, Events } from '../interfaces/event';
import { Verbs } from '@methodus/platform-rest';

@MethodConfig('NewRelicLogs')
export class NewRelicLogs {
    async log(message: Entry[]) {
        const ev: Events = {
            common: {
                attributes: {
                    service: process.env.NEW_RELIC_APP_NAME!,
                    hostname: process.env.COMPUTERNAME!,
                }
            },
            logs: message
        }

        console.log(ev);

        return await this.innerLog(process.env.NEW_RELIC_LICENSE_KEY!, ev)
    }

    @Method(Verbs.Post, '/log/v1')
    async simpleLog(@Mapping.Headers('X-License-Key') licenseKey: string, @Mapping.Body() ev: Entry) {
        return {}
    }

    @Method(Verbs.Post, '/log/v1')
    async innerLog(@Mapping.Headers('X-License-Key') licenseKey: string, @Mapping.Body() events: any) {
        return {}
    }








}


