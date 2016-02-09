var fs = require("fs");
var request = require("request");
var mime	= require("mime");

var files = fs.readdirSync("./");

var test = (/\.(gz|tar|iso|zip)$/i);

var queue = [];

for( file in files ){

	if( test.test(files[file]) ){

		queue.push(files[file]);

	};

};

var uploadFile = function(authToken, filename ){

	console.log("\nExecuting upload for " + filename );

	return new Promise(function(resolve,reject){

		var fstatus = fs.statSync(filename);

		fs.open( filename, 'r', function( status, fDescriptor ){

			if(status){
				reject(status.message);
			}else{

				var buffer = new Buffer(fstatus.size);
				fs.read(fDescriptor, buffer,0, fstatus.size, 0, function(err,num){
					
					request.post({
							  'url': 'https://www.googleapis.com/upload/drive/v2/files',
							  'qs': {
							     //request module adds "boundary" and "Content-Length" automatically.
							    'uploadType': 'multipart'

							  },
							  'headers' : {
							    'Authorization': 'Bearer ' + authToken
							  },
							  'multipart':  [
							    {
							      'Content-Type': 'application/json; charset=UTF-8',
							      'body': JSON.stringify({
								 'title': filename,
								 'parents': [
								   {
								     'id': 'root'
								   }
								 ]
							       })
							    },
							    {
							      'Content-Type': mime.lookup(filename),
							      'body': buffer
							    }
							  ]
							}, function(err,httpResponse,body){

								if(err){
									reject(err);
								}else{
									resolve(body);
								}

							});

				});

				

			}



		});

		//console.log(fstatus);
		//resolve(fstatus);	


	});

}


/**
 * 
 *  REQUEST THE SAVING OF ELIGIBLE FILES INTO DRIVE
 * 
 */
function saveFile( auth ){

console.log(auth)

/*	
	queue.reduce(function(sequence,filename){

		return sequence.then(function(){

			return uploadFile( "", filename);


		}).then(function(d){

			console.log(d)

		}).catch(function(e){

			console.err(d);

		}).then(function(d){

			console.log("DONE EXECUTING");

		});

	},Promise.resolve());
	
*/
}


