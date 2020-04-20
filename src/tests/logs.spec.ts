import { Injector, ConfiguredServer, ModuleConfiguration } from '@methodus/server';
import { NewRelicLogs } from '../contracts/logs.contract';
import { NewrelicModule } from '..';

@ModuleConfiguration(NewrelicModule)
class testServer extends ConfiguredServer { }


describe('NewRelicLogs', () => {
    new testServer();
    jest.setTimeout(1000 * 30);
    test('log simple', async () => {
        const service: NewRelicLogs = Injector.get(NewRelicLogs);
        let logsCounter = 0;
        const logsArray: any = [];
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                logsCounter++;

                logsArray.push({
                    message: `go message for ${logsCounter}`,
                    timestamp: new Date().getTime()
                });
                if (logsCounter >= 3) {
                    clearInterval(interval);
                    resolve();
                }
            }, 2000);
        });

        const resultForMany = await service.logMany(logsArray)
        expect(resultForMany).toBeDefined();
    });
});
