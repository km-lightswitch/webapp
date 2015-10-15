var AWS = require('aws-sdk');
var _ = require('lodash');
var config = require('config');

var validateCredentials = function validateCredentials(credentials) {
    if (!credentials.accessKeyId) {
        throw new Error("Missing access key id");
    }
    if (!credentials.secretAccessKey) {
        throw new Error("Missing secret access key");
    }
    return true;
};

var getInstances = function (credentials) {
    validateCredentials(credentials);
    var ec2 = new AWS.EC2({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        region: "eu-west-1"
    });

    var params = {};
    return new Promise(function (resolve, reject) {
        ec2.describeInstances(params, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(toInstances(data));
            }
        });
    });
};

function toInstances(data) {
    var instances = _.map(data.Reservations, function (reservation) {
        return toInstance(reservation.Instances[0]);
    });
    return instances;
}

function toInstance(instanceData) {
    var instance = {
        InstanceId: instanceData.InstanceId,
        State: instanceData.State.Name,
        InstanceType: instanceData.InstanceType,
        AvailabilityZone: instanceData.Placement.AvailabilityZone,
        PrivateIpAddress: instanceData.PrivateIpAddress
    };

    var instanceTags = instanceData.Tags;
    if (instanceTags.length > 0) {
        instance.Tags = _.map(instanceTags, function (el) {
           	var returnMap = {};
            returnMap[el.Key] = el.Value;
            return returnMap;
        });
    }

    if (instanceData.PublicIpAddress) {
        instance.PublicIpAddress = instanceData.PublicIpAddress;
    }

    return instance;
}

module.exports = {
    validateCredentials: validateCredentials,
    getInstances: getInstances
};
