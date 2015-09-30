var expect = require('chai').expect;

var ec2 = require('../api/modules/ec2.js');

describe('EC2', function() {
	describe('#validateCredentials()', function() {
		it('returns true when all needed credential information is present', function() {
			expect(ec2.validateCredentials({accessKeyId:"aki", secretAccessKey: "sak", region: "eu-west-1"})).to.be.true;
		});
	});
});