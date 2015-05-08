var base64 = {
	chars : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+',

	encode : function(input, pad) {
		if (typeof pad !== 'boolean') {
			pad = true;
		}
		var output = '';
		var input_index = 0;
		var input_remaining = input.length;
		do {
			var buffer_length = 0;
			if (input_remaining >= 3) {
				buffer_length = 3;
			} else {
				buffer_length = input_remaining;
			}
			input_remaining -= buffer_length;

			var buffer = 0;
			for (var i = 0; i < buffer_length; i++) {
				buffer <<= 8;
				buffer |= input.charCodeAt(input_index++);
			}
			buffer <<= 8 * (3 - buffer_length);

			for (var i = 3; i >= 3 - buffer_length; i--) {
				output += this.chars[(buffer >> (i * 6)) & 63];
			}
		} while (input_remaining);

		if (pad) {
			var padded_length = Math.floor((input.length + (input.length % 3) + 1) / 3) * 4;
			while (output.length < padded_length) {
				output += '=';
			}
		}
		return output;
	},

	decode : function(input) {
		input = input.replace(/\=*$/, '');

		var output = '';
		var input_index = 0;
		var input_remaining = input.length;
		do {
			var buffer_length = 0;
			if (input_remaining >= 4) {
				buffer_length = 4;
			} else {
				buffer_length = input_remaining;
			}
			input_remaining -= buffer_length;

			var buffer = 0;
			for (var i = 0; i < buffer_length; i++) {
				buffer <<= 6;
				buffer |= this.chars.indexOf(input[input_index++]);
			}
			buffer <<= 6 * (4 - buffer_length);

			for (var i = 2; i >= 4 - buffer_length; i--) {
				output += String.fromCharCode((buffer >> (i * 8)) & 255);
			}
		} while(input_remaining);
		return output;
	},

	isBase64 : function(input) {
		return !input.replace(/\=*$/, '').match(/[^A-Za-z0-9\/\+]/);
	},

};

module.exports = base64;
