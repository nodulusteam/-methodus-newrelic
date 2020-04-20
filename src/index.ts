import { Module, ClientConfiguration } from '@methodus/server';
import { NewRelicLogs } from './contracts/logs.contract';
import { NewRelicInsights } from './contracts/insights.contract';
import { Http } from '@methodus/platform-rest';

@Module('Newrelic')
@ClientConfiguration(NewRelicLogs, Http, 'https://log-api.newrelic.com')
@ClientConfiguration(NewRelicInsights, Http, 'https://insights-collector.newrelic.com')
export class NewrelicModule {
    providers = [NewRelicLogs, NewRelicInsights]
}

export * from './contracts/logs.contract';
export * from './contracts/insights.contract';