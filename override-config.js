

const overrideConfig = {
    audioQuality: {
        stereo: false
    },
    bosh: 'https://xmpp.rtcv5-us.cometchat-staging.com/http-bind',
    bridgeChannel: {
        preferSctp: true
    },
    constraints: {
        video: {
            height: {
                ideal: 720,
                max: 720,
                min: 180
            },
            width: {
                ideal: 1280,
                max: 1280,
                min: 320
            }
        }
    },
    e2ee: [],
    e2eping: {
        enabled: false
    },
    flags: {
        receiveMultipleVideoStreams: true,
        sendMultipleVideoStreams: true,
        sourceNameSignaling: true,
        ssrcRewritingEnabled: true
    },
    hiddenDomain: 'hidden.rtcv5-us.cometchat-staging.com',
    hosts: {
        domain: 'rtcv5-us.cometchat-staging.com',
        muc: 'conference.rtcv5-us.cometchat-staging.com'
    },
    p2p: {
        enabled: true
    },
    resolution: 720,
    serviceUrl:
        'wss://xmpp.rtcv5-us.cometchat-staging.com/xmpp-websocket?room=test',
    websocket:
        'wss://xmpp.rtcv5-us.cometchat-staging.com/xmpp-websocket'
};

/**
 * Merges two configuration objects deeply.
 * - For objects: recursively merges properties.
 * - For arrays: concatenates them (you can customize this behavior if needed).
 * - For other types: the second object's value takes precedence.
 * @param {Object} config1 - The first configuration object.
 * @param {Object} config2 - The second configuration object (takes precedence).
 * @returns {Object} - The merged configuration object.
 */
function mergeConfigs(config1, config2) {
    const result = { ...config1 };

    for (const key in config2) {
        if (config2.hasOwnProperty(key)) {
            if (
                typeof config2[key] === 'object'
                && config2[key] !== null
                && !Array.isArray(config2[key])
            ) {
                // Deep merge for objects
                result[key] = mergeConfigs(result[key] || {}, config2[key]);
            } else if (Array.isArray(config2[key])) {
                // Concatenate arrays (customize as needed, e.g., unique merge)
                result[key] = (result[key] || []).concat(config2[key]);
            } else {
                // Overwrite for primitives
                result[key] = config2[key];
            }
        }
    }

    return result;
}

config = mergeConfigs(config, overrideConfig);
