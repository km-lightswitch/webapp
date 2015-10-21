var _ = require('lodash');

var ds = [{ Key: 'Name', Value: 'mongo2' },
	{ Key: 'app', Value: 'mongo' },
	{ Key: 'env', Value: 'live' }];

var info = _.map(ds, function (el) {
	var returnMap = {};
	returnMap[el.Key] = el.Value;
	return returnMap;
});

console.log(info);