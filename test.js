var tester = require('acme-challenge-test');
const {google} = require('googleapis');
var dns = google.dns('v1');

authorize(function(authClient) {
	var request = {
	  // Identifies the project addressed by this request.
	  project: 'east-high-support',  // TODO: Update placeholder value.
  
	  resource: {
		// TODO: Add desired properties to the request body.
	  },
  
	  auth: authClient,
	};
  
	dns.managedZones.create(request, function(err, response) {
	  if (err) {
		console.error(err);
		return;
	  }
  
	  // TODO: Change code below to process the `response` object:
	  console.log(JSON.stringify(response, null, 2));
	});
  });
  
  function authorize(callback) {
	google.auth.getApplicationDefault(function(err, authClient) {
	  if (err) {
		console.error('authentication failed: ', err);
		return;
	  }
	  if (authClient.createScopedRequired && authClient.createScopedRequired()) {
		var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
		authClient = authClient.createScoped(scopes);
	  }
	  callback(authClient);
	});
  }
// The dry-run tests can pass on, literally, 'example.com'
// but the integration tests require that you have control over the domain
//code for GCLOUD
// CREATE gcloud dns managed-zones create zone_name --description='newzone' --dns-name='dns_name.com'
// LIST gcloud dns record-sets list --zone=zone_name
// DELETE gcloud dns managed-zones delete zone_name
var domain = 'e';

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