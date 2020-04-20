import { ModuleConfiguration, ConfiguredServer, Injector } from '@methodus/server';
import { NewrelicModule } from '..';
import { NewRelicLogs } from '../contracts/logs.contract';

@ModuleConfiguration(NewrelicModule)
class testServer extends ConfiguredServer { }

(async () => {

    new testServer();
    const service: NewRelicLogs = Injector.get(NewRelicLogs);

    let logsCounter = 0;
    const logsArray: any = [];
    await new Promise((resolve) => {
        const interval = setInterval(() => {

            logsCounter++;

            console.log(logsCounter, new Date().getTime());
            logsArray.push({
                message: `go message for ${logsCounter}`,
                timestamp: new Date().getTime()
            });
            if (logsCounter >= 10) {
                clearInterval(interval);
                resolve();
            }
        }, 2000);
    });

    const resultForMany = await service.logMany(logsArray)
    console.log(resultForMany);

    // const resultForOne = await service.logOne({ message: `go message for singlexxx ${timeStamp}` })
    // console.log(resultForOne);

})()




