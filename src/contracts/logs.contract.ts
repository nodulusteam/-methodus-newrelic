import { Method, MethodConfig, Mapping, Inject } from '@methodus/server';
import { Entry, Events } from '../interfaces/event';
import { Verbs } from '@methodus/platform-rest';
import { NewrelicProvider } from '../providers/token.provider';

@MethodConfig('NewRelicLogs')
export class NewRelicLogs {
    constructor(@Inject('NewrelicTokenProvider') public newrelicProvider: NewrelicProvider) {

    }
    async logOne(message: Entry) {
        const appName = await this.newrelicProvider.getAppName();
        const hostName = await this.newrelicProvider.getHostName();

        message.service = appName;
        message.hostname = hostName;

        const license = await this.newrelicProvider.getLicenseKey();
        return await this.simpleLog(license, message);
    }

    async logMany(message: Entry[]) {
        const license = await this.newrelicProvider.getLicenseKey();
        const appName = await this.newrelicProvider.getAppName();
        const hostName = await this.newrelicProvider.getHostName();
        const ev: Events = {
            common: {
                attributes: {
                    service: appName,
                    hostname: hostName,
                }
            },
            logs: message
        }

        return await this.innerLog(license, [ev]);
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


