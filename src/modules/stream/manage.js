import NodeCache from "node-cache";

import { UUID, encrypt } from "../sub/crypto.js";
import { streamLifespan } from "../config.js";

const streamCache = new NodeCache({ stdTTL: streamLifespan, checkperiod: 120 });
const salt = process.env.streamSalt;

export function createStream(obj) {
    let streamUUID = UUID(),
        exp = Math.floor(new Date().getTime()) + streamLifespan,
        ghmac = encrypt(`${streamUUID},${obj.service},${obj.ip},${exp}`, salt)

    streamCache.set(streamUUID, {
        id: streamUUID,
        service: obj.service,
        type: obj.type,
        urls: obj.u,
        filename: obj.filename,
        hmac: ghmac,
        ip: obj.ip,
        exp: exp,
        isAudioOnly: !!obj.isAudioOnly,
        audioFormat: obj.audioFormat,
        time: obj.time,
        copy: obj.copy,
        metadata: obj.fileMetadata ? obj.fileMetadata : false
    });
    return `${process.env.selfURL}api/stream?t=${streamUUID}&e=${exp}&h=${ghmac}`;
}

export function verifyStream(ip, id, hmac, exp) {
    try {
        let streamInfo = streamCache.get(id);
        if (streamInfo) {
            let ghmac = encrypt(`${id},${streamInfo.service},${ip},${exp}`, salt);
            if (hmac == ghmac && ip == streamInfo.ip && ghmac == streamInfo.hmac && exp > Math.floor(new Date().getTime()) && exp == streamInfo.exp) {
                return streamInfo;
            } else {
                return { error: 'Unauthorized', status: 401 };
            }
        } else {
            return { error: 'this stream token does not exist', status: 400 };
        }
    } catch (e) {
        return { status: 500, body: { status: "error", text: "Internal Server Error" } };
    }
}
