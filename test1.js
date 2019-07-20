// var tester = require('acme-challenge-test');
const { google } = require('googleapis');
var dns = google.dns('v1');
const { Storage } = require('@google-cloud/storage');
const key = process.env.key
//// GOOGLE DNS requirs its own CLI for testing, gcloud using its api for DNS MGMT
// // CREATE gcloud dns managed-zones create zone_name --description='newzone' --dns-name='dns_name.com'
// // LIST gcloud dns record-sets list --zone=zone_name
// // DELETE gcloud dns managed-zones delete zone_name
// Imports the Google Cloud client library.
// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlaatform/google-cloud-node/blob/master/docs/authentication.md
const projectId = 'east-high-support';
const keyFilename = './credentials.json';
const storage = new Storage({ projectId, keyFilename });

//Makes an authenticated API request.
async function bukryd() {
	try {
		const [ buckets ] = await storage.getBuckets();

		console.log('Buckets:');
		buckets.forEach((bucket) => {
			console.log(bucket.name);
		});
	} catch (err) {
		console.error('ERROR:', err);
	}
}
bukryd();
authorize(function(authClient) {
	var request = {
		// Identifies the project addressed by this request.
		project: 'east-high-support',
		resource: {
			// TODO: Add desired properties to the request body.
		},

		auth: authClient
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
			var scopes = [ 'https://www.googleapis.com/auth/cloud-platform' ];
			authClient = authClient.createScoped(scopes);
		}
		callback(authClient);
	});
}
