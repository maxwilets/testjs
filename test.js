var tester = require('acme-challenge-test');

// The dry-run tests can pass on, literally, 'example.com'
// but the integration tests require that you have control over the domain
var domain = 'example.com';

tester
	.testRecord('http-01', domain, {
		// Should set a TXT record for dnsHost with dnsAuthorization and ttl || 300
		set: function(opts) {
			console.log('set opts:', opts);
			throw new Error('set not implemented');
		},

		// Should remove the *one* TXT record for dnsHost with dnsAuthorization
		// Should NOT remove otherrecords for dnsHost (wildcard shares dnsHost with
		// non-wildcard)
		remove: function(opts) {
			console.log('remove opts:', opts);
			throw new Error('remove not implemented');
		},

		// Should get the record via the DNS server's API
		get: function(opts) {
			console.log('get opts:', opts);
			throw new Error('get not implemented');
		}
	})
	.then(function() {
		console.info('PASS');
	});