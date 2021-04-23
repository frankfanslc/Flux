import { xf, exists, empty, first, filterIn, prn } from '../functions.js';
import { ble } from './web-ble.js';
import { Device } from './device.js';
import { HeartRateService } from './hrs/hrs.js';
import { DeviceInformationService } from './dis/dis.js';

function onHeartRate(value) {
    if(value.hr) xf.dispatch(`heartRate`, value.hr);
}
function onHrmInfo(value) {
    console.log(`Heart Rate Monitor Information: `, value);
}

class Hrm extends Device {
    defaultId() { return `hrm`; }
    defaultFilter() { return ble.requestFilters.hrm; }
    postInit() {
        const self = this;
    }
    async initServices(device) {
        const hrs = new HeartRateService({ble: ble, onHeartRate: onHeartRate, ...device});
        await hrs.init();

        const dis = new DeviceInformationService({ble: ble, onInfo: onHrmInfo, ...device});
        await dis.init();

        return { hrs, dis };
    }
}

export { Hrm }
