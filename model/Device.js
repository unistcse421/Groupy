/**
 * Created by Taehyun on 2016-05-02.
 */

function Device(device) {
    device = device || {uuid: null, push_enabled: null};
    this.uuid = device.uuid;
    this.push_enabled = device.push_enabled;
}

module.exports = Device;