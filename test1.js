// var tester = require('acme-challenge-test');
const {google} = require('googleapis');
var dns = google.dns('v1');
const {Storage} = require('@google-cloud/storage');
//// GOOGLE DNS requirs its own CLI for testing, gcloud using its api for DNS MGMT
// // CREATE gcloud dns managed-zones create zone_name --description='newzone' --dns-name='dns_name.com'
// // LIST gcloud dns record-sets list --zone=zone_name
// // DELETE gcloud dns managed-zones delete zone_name
// Imports the Google Cloud client library.
// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlaatform/google-cloud-node/blob/master/docs/authentication.md
const projectId = 'east-high-support'
const keyFilename = './credentials.json'
const storage = new Storage({projectId, keyFilename});

//Makes an authenticated API request.
async function bukryd(){
try {
  const [buckets] = await storage.getBuckets();

  console.log('Buckets:')
  buckets.forEach(bucket => {
    console.log(bucket.name);
  });
} catch (err) {
  console.error('ERROR:', err);
}};
bukryd()
authorize(function(authClient) {
	var request = {
	  // Identifies the project addressed by this request.
	  project: 'east-high-support',  
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
//   function authorize(callback) {
// 	google.auth.getApplicationDefault(function(err, authClient) {
// 	  if (err) {
// 		console.error('authentication failed: ', err);
// 		return;
// 	  }
// 	  if (authClient.createScopedRequired && authClient.createScopedRequired()) {
// 		var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
// 		authClient = authClient.createScoped(scopes);
// 	  }
// 	  callback(authClient);
// 	});
//   }
// // The dry-run tests can pass on, literally, 'example.com'
// // but the integration tests require that you have control over the domain
// //code for GCLOUD

// var domain = 'e';

// tester
// 	.testRecord('http-01', domain, {
// 		// Should set a TXT record for dnsHost with dnsAuthorization and ttl || 300
// 		set: function(opts) {
// 			console.log('set opts:', opts);
// 			throw new Error('set not implemented');
// 		},

// 		// Should remove the *one* TXT record for dnsHost with dnsAuthorization
// 		// Should NOT remove otherrecords for dnsHost (wildcard shares dnsHost with
// 		// non-wildcard)
// 		remove: function(opts) {
// 			console.log('remove opts:', opts);
// 			throw new Error('remove not implemented');
// 		},

// 		// Should get the record via the DNS server's API
// 		get: function(opts) {
// 			console.log('get opts:', opts);
// 			throw new Error('get not implemented');
// 		}
// 	})
// 	.then(function() {
// 		console.info('PASS');
// 	});