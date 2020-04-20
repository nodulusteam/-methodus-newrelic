import { ModuleConfiguration, ConfiguredServer, Injector } from '@methodus/server';
import { NewrelicModule } from '..';
import { NewRelicInsights } from '../contracts/insights.contract';

@ModuleConfiguration(NewrelicModule)
class testServer extends ConfiguredServer { }

(async () => {
    new testServer();
    const service: NewRelicInsights = Injector.get(NewRelicInsights);
    const timeStamp = new Date();
    const resultForMany = await service.eventSingle([{
        'eventType': 'Purchase',
        'account': 5,
        'amount': 12309,
        'product': 'Item'
    }])
    console.log(resultForMany);


})()




