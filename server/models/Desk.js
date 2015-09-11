var mongoose = require('mongoose');

var deskSchema = mongoose.Schema({
	floor: {
		type: Number,
		required: '{PATH} is required!'
	},
	seat: {
		type: String,
		required: '{PATH} is required!'
	},
	orientation: {
		type: String,
		required: '{PATH} is required!'
	},
	classification: {
		type: String,
		required: '{PATH} is required!',
		default: 'employee'
	},
	xpos: {
		type: Number,
		required: '{PATH} is required!'
	},
	ypos: {
		type: Number,
		required: '{PATH} is required!'
	}
});

var Desk = mongoose.model('Desk', deskSchema);

function createDefaultDesks() {
	Desk.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			/*
			Desk.create({
				floor: 6,
				seat: '1-1',
				orientation: 'horz',
				xpos: 9,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				seat: '1-2',
				orientation: 'horz',
				xpos: 63,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				seat: '1-3',
				orientation: 'horz',
				xpos: 9,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				seat: '1-4',
				orientation: 'horz',
				xpos: 63,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				seat: '1-5',
				orientation: 'horz',
				xpos: 185,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				seat: '1-6',
				orientation: 'horz',
				xpos: 239,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				seat: '1-7',
				orientation: 'horz',
				xpos: 185,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				seat: '1-8',
				orientation: 'horz',
				xpos: 239,
				ypos: 86
			});
			Desk.create({
				floor: 6,
				seat: '1-9',
				orientation: 'horz',
				xpos: 36,
				ypos: 157
			});
			Desk.create({
				floor: 6,
				seat: '1-10',
				orientation: 'horz',
				xpos: 90,
				ypos: 157
			});
			Desk.create({
				floor: 6,
				seat: '1-11',
				orientation: 'horz',
				xpos: 36,
				ypos: 180
			});
			Desk.create({
				floor: 6,
				seat: '1-12',
				orientation: 'horz',
				xpos: 90,
				ypos: 180
			});
			Desk.create({
				floor: 6,
				seat: '2-1',
				orientation: 'horz',
				xpos: 378,
				ypos: 57
			});
			Desk.create({
				floor: 6,
				seat: '2-2',
				orientation: 'horz',
				xpos: 432,
				ypos: 57
			});
			Desk.create({
				floor: 6,
				seat: '2-3',
				orientation: 'horz',
				xpos: 486,
				ypos: 57
			});
			Desk.create({
				floor: 6,
				seat: '2-4',
				orientation: 'horz',
				xpos: 378,
				ypos: 80
			});
			Desk.create({
				floor: 6,
				seat: '2-5',
				orientation: 'horz',
				xpos: 432,
				ypos: 80
			});
			Desk.create({
				floor: 6,
				seat: '2-6',
				orientation: 'horz',
				xpos: 486,
				ypos: 80
			});
			Desk.create({
				floor: 6,
				seat: '2-7',
				orientation: 'horz',
				xpos: 412,
				ypos: 151
			});
			Desk.create({
				floor: 6,
				seat: '2-8',
				orientation: 'horz',
				xpos: 466,
				ypos: 151
			});
			Desk.create({
				floor: 6,
				seat: '2-9',
				orientation: 'horz',
				xpos: 412,
				ypos: 174
			});
			Desk.create({
				floor: 6,
				seat: '2-10',
				orientation: 'horz',
				xpos: 466,
				ypos: 174
			});
			Desk.create({
				floor: 6,
				seat: '3-1',
				orientation: 'vert',
				xpos: 630,
				ypos: 9
			});
			Desk.create({
				floor: 6,
				seat: '3-2',
				orientation: 'vert',
				xpos: 630,
				ypos: 63
			});
			Desk.create({
				floor: 6,
				seat: '3-3',
				orientation: 'vert',
				xpos: 705,
				ypos: 13
			});
			Desk.create({
				floor: 6,
				seat: '3-4',
				orientation: 'vert',
				xpos: 728,
				ypos: 13
			});
			Desk.create({
				floor: 6,
				seat: '3-5',
				orientation: 'vert',
				xpos: 705,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				seat: '3-6',
				orientation: 'vert',
				xpos: 728,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				seat: '4-1',
				orientation: 'vert',
				xpos: 833,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				seat: '4-2',
				orientation: 'vert',
				xpos: 856,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				seat: '4-3',
				orientation: 'vert',
				xpos: 833,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				seat: '4-4',
				orientation: 'vert',
				xpos: 856,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				seat: '4-5',
				orientation: 'vert',
				xpos: 919,
				ypos: 18
			});
			Desk.create({
				floor: 6,
				seat: '4-6',
				orientation: 'vert',
				xpos: 919,
				ypos: 72
			});
			Desk.create({
				floor: 6,
				seat: '5-1',
				orientation: 'horz',
				xpos: 947,
				ypos: 45
			});
			Desk.create({
				floor: 6,
				seat: '5-2',
				orientation: 'horz',
				xpos: 1001,
				ypos: 45
			});
			Desk.create({
				floor: 6,
				seat: '5-3',
				orientation: 'horz',
				xpos: 947,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				seat: '5-4',
				orientation: 'horz',
				xpos: 1001,
				ypos: 67
			});
			Desk.create({
				floor: 6,
				seat: '5-5',
				orientation: 'horz',
				xpos: 947,
				ypos: 135
			});
			Desk.create({
				floor: 6,
				seat: '5-6',
				orientation: 'horz',
				xpos: 1001,
				ypos: 135
			});
			*/
			// Floor 7
			Desk.create({
				floor: 7,
				seat: '073102',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 48
			});
			Desk.create({
				floor: 7,
				seat: '072902',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 102
			});
			Desk.create({
				floor: 7,
				seat: '073115',
				orientation: 'horz',
				classification: 'manager',
				xpos: 477,
				ypos: 48
			});
			Desk.create({
				floor: 7,
				seat: '072915',
				orientation: 'horz',
				classification: 'manager',
				xpos: 477,
				ypos: 102
			});
			Desk.create({
				floor: 7,
				seat: '073004',
				orientation: 'vert',
				xpos: 117,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073005',
				orientation: 'vert',
				xpos: 136,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073006',
				orientation: 'vert',
				xpos: 209,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073007',
				orientation: 'vert',
				xpos: 228,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073009',
				orientation: 'vert',
				xpos: 302,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073010',
				orientation: 'vert',
				xpos: 321,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073011',
				orientation: 'vert',
				xpos: 394,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '073013',
				orientation: 'vert',
				xpos: 413,
				ypos: 39
			});
			Desk.create({
				floor: 7,
				seat: '072904',
				orientation: 'vert',
				xpos: 117,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072905',
				orientation: 'vert',
				xpos: 136,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072906',
				orientation: 'vert',
				xpos: 209,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072907',
				orientation: 'vert',
				xpos: 228,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072909',
				orientation: 'vert',
				xpos: 302,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072910',
				orientation: 'vert',
				xpos: 321,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072911',
				orientation: 'vert',
				xpos: 394,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072913',
				orientation: 'vert',
				xpos: 413,
				ypos: 96
			});
			Desk.create({
				floor: 7,
				seat: '072601',
				orientation: 'vert',
				xpos: 9,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072401',
				orientation: 'vert',
				xpos: 9,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072301',
				orientation: 'vert',
				xpos: 9,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072603',
				orientation: 'vert',
				xpos: 83,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072403',
				orientation: 'vert',
				xpos: 83,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072303',
				orientation: 'vert',
				xpos: 83,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072604',
				orientation: 'vert',
				xpos: 102,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072404',
				orientation: 'vert',
				xpos: 102,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072304',
				orientation: 'vert',
				xpos: 102,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072605',
				orientation: 'vert',
				xpos: 175,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072405',
				orientation: 'vert',
				xpos: 175,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072305',
				orientation: 'vert',
				xpos: 175,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072607',
				orientation: 'vert',
				xpos: 194,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072407',
				orientation: 'vert',
				xpos: 194,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072307',
				orientation: 'vert',
				xpos: 194,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072608',
				orientation: 'vert',
				xpos: 268,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072408',
				orientation: 'vert',
				xpos: 268,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072308',
				orientation: 'vert',
				xpos: 268,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072609',
				orientation: 'vert',
				xpos: 287,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072409',
				orientation: 'vert',
				xpos: 287,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072309',
				orientation: 'vert',
				xpos: 287,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072610',
				orientation: 'vert',
				xpos: 360,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072410',
				orientation: 'vert',
				xpos: 360,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072310',
				orientation: 'vert',
				xpos: 360,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072612',
				orientation: 'vert',
				xpos: 379,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072412',
				orientation: 'vert',
				xpos: 379,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072312',
				orientation: 'vert',
				xpos: 379,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072613',
				orientation: 'vert',
				xpos: 453,
				ypos: 204
			});
			Desk.create({
				floor: 7,
				seat: '072413',
				orientation: 'vert',
				xpos: 453,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072313',
				orientation: 'vert',
				xpos: 453,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072414',
				orientation: 'vert',
				xpos: 472,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072314',
				orientation: 'vert',
				xpos: 472,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072416',
				orientation: 'vert',
				xpos: 545,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072316',
				orientation: 'vert',
				xpos: 545,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072417',
				orientation: 'vert',
				xpos: 564,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072317',
				orientation: 'vert',
				xpos: 564,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '072418',
				orientation: 'vert',
				xpos: 637,
				ypos: 261
			});
			Desk.create({
				floor: 7,
				seat: '072318',
				orientation: 'vert',
				xpos: 637,
				ypos: 318
			});
			Desk.create({
				floor: 7,
				seat: '073120',
				orientation: 'horz',
				classification: 'manager it',
				xpos: 630,
				ypos: 70
			});
			Desk.create({
				floor: 7,
				seat: '073021',
				orientation: 'horz',
				classification: 'manager it',
				xpos: 707,
				ypos: 71
			});
			Desk.create({
				floor: 7,
				seat: '073025',
				orientation: 'vert',
				xpos: 864,
				ypos: 34
			});
			Desk.create({
				floor: 7,
				seat: '072925',
				orientation: 'vert',
				xpos: 864,
				ypos: 97
			});
			Desk.create({
				floor: 7,
				seat: '072522',
				orientation: 'vert',
				xpos: 768,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072322',
				orientation: 'vert',
				xpos: 768,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072524',
				orientation: 'vert',
				xpos: 842,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072324',
				orientation: 'vert',
				xpos: 842,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072224',
				orientation: 'vert',
				xpos: 842,
				ypos: 357
			});
			Desk.create({
				floor: 7,
				seat: '072024',
				orientation: 'vert',
				xpos: 842,
				ypos: 414
			});
			Desk.create({
				floor: 7,
				seat: '072525',
				orientation: 'vert',
				xpos: 861,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072325',
				orientation: 'vert',
				xpos: 861,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072025',
				orientation: 'vert',
				xpos: 861,
				ypos: 414
			});
			Desk.create({
				floor: 7,
				seat: '072526',
				orientation: 'vert',
				xpos: 945,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072326',
				orientation: 'vert',
				xpos: 945,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072226',
				orientation: 'vert',
				xpos: 945,
				ypos: 357
			});
			Desk.create({
				floor: 7,
				seat: '072026',
				orientation: 'vert',
				xpos: 945,
				ypos: 414
			});
			Desk.create({
				floor: 7,
				seat: '072528',
				orientation: 'vert',
				xpos: 964,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072328',
				orientation: 'vert',
				xpos: 964,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072228',
				orientation: 'vert',
				xpos: 964,
				ypos: 357
			});
			Desk.create({
				floor: 7,
				seat: '072028',
				orientation: 'vert',
				xpos: 964,
				ypos: 414
			});
			Desk.create({
				floor: 7,
				seat: '072529',
				orientation: 'vert',
				xpos: 1037,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072329',
				orientation: 'vert',
				xpos: 1037,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072530',
				orientation: 'vert',
				xpos: 1056,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072330',
				orientation: 'vert',
				xpos: 1056,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072532',
				orientation: 'vert',
				xpos: 1129,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072332',
				orientation: 'vert',
				xpos: 1129,
				ypos: 300
			});
			Desk.create({
				floor: 7,
				seat: '072533',
				orientation: 'vert',
				xpos: 1148,
				ypos: 243
			});
			Desk.create({
				floor: 7,
				seat: '072003',
				orientation: 'vert ewa',
				classification: 'manager',
				xpos: 1058,
				ypos: 417
			});
			Desk.create({
				floor: 7,
				seat: '071830',
				orientation: 'vert ewa',
				classification: 'manager',
				xpos: 1016,
				ypos: 502
			});
			Desk.create({
				floor: 7,
				seat: '071626',
				orientation: 'vert',
				xpos: 905,
				ypos: 559
			});
			Desk.create({
				floor: 7,
				seat: '071526',
				orientation: 'vert',
				xpos: 905,
				ypos: 616
			});
			Desk.create({
				floor: 7,
				seat: '071326',
				orientation: 'vert',
				xpos: 905,
				ypos: 673
			});
			Desk.create({
				floor: 7,
				seat: '071627',
				orientation: 'vert',
				xpos: 924,
				ypos: 559
			});
			Desk.create({
				floor: 7,
				seat: '071527',
				orientation: 'vert',
				xpos: 924,
				ypos: 616
			});
			Desk.create({
				floor: 7,
				seat: '071524',
				orientation: 'vert',
				xpos: 826,
				ypos: 589
			});
			Desk.create({
				floor: 7,
				seat: '071424',
				orientation: 'vert',
				xpos: 826,
				ypos: 646
			});
			Desk.create({
				floor: 7,
				seat: '071224',
				orientation: 'vert',
				xpos: 826,
				ypos: 703
			});

			Desk.create({
				floor: 7,
				seat: '071023',
				orientation: 'vert',
				xpos: 797,
				ypos: 777
			});
			Desk.create({
				floor: 7,
				seat: '070823',
				orientation: 'vert',
				xpos: 797,
				ypos: 834
			});
			Desk.create({
				floor: 7,
				seat: '070723',
				orientation: 'vert',
				xpos: 797,
				ypos: 891
			});
			Desk.create({
				floor: 7,
				seat: '071024',
				orientation: 'vert',
				xpos: 816,
				ypos: 777
			});
			Desk.create({
				floor: 7,
				seat: '070824',
				orientation: 'vert',
				xpos: 816,
				ypos: 834
			});
			Desk.create({
				floor: 7,
				seat: '071021',
				orientation: 'vert',
				xpos: 724,
				ypos: 786
			});
			Desk.create({
				floor: 7,
				seat: '070821',
				orientation: 'vert',
				xpos: 724,
				ypos: 843
			});
			Desk.create({
				floor: 7,
				seat: '071016',
				orientation: 'vert',
				xpos: 552,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070916',
				orientation: 'vert',
				xpos: 552,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '071017',
				orientation: 'vert',
				xpos: 571,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070917',
				orientation: 'vert',
				xpos: 571,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '071013',
				orientation: 'vert',
				xpos: 460,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070913',
				orientation: 'vert',
				xpos: 460,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '071014',
				orientation: 'vert',
				xpos: 479,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070914',
				orientation: 'vert',
				xpos: 479,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '071011',
				orientation: 'vert',
				xpos: 367,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070911',
				orientation: 'vert',
				xpos: 367,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '071012',
				orientation: 'vert',
				xpos: 386,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070912',
				orientation: 'vert',
				xpos: 386,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '071009',
				orientation: 'vert',
				xpos: 293,
				ypos: 766
			});
			Desk.create({
				floor: 7,
				seat: '070909',
				orientation: 'vert',
				xpos: 293,
				ypos: 823
			});
			Desk.create({
				floor: 7,
				seat: '070609',
				orientation: 'vert',
				xpos: 293,
				ypos: 926
			});
			Desk.create({
				floor: 7,
				seat: '070409',
				orientation: 'vert',
				xpos: 293,
				ypos: 983
			});
			Desk.create({
				floor: 7,
				seat: '070411',
				orientation: 'vert',
				xpos: 367,
				ypos: 983
			});
			Desk.create({
				floor: 7,
				seat: '070612',
				orientation: 'vert',
				xpos: 386,
				ypos: 926
			});
			Desk.create({
				floor: 7,
				seat: '070412',
				orientation: 'vert',
				xpos: 386,
				ypos: 983
			});
			Desk.create({
				floor: 7,
				seat: '070613',
				orientation: 'vert',
				xpos: 458,
				ypos: 926
			});
			Desk.create({
				floor: 7,
				seat: '070413',
				orientation: 'vert',
				xpos: 458,
				ypos: 983
			});
			Desk.create({
				floor: 7,
				seat: '070614',
				orientation: 'vert',
				xpos: 477,
				ypos: 926
			});
			Desk.create({
				floor: 7,
				seat: '070414',
				orientation: 'vert',
				xpos: 477,
				ypos: 983
			});
			Desk.create({
				floor: 7,
				seat: '070616',
				orientation: 'horz',
				xpos: 543,
				ypos: 946
			});
			Desk.create({
				floor: 7,
				seat: '070618',
				orientation: 'horz',
				xpos: 600,
				ypos: 946
			});
			Desk.create({
				floor: 7,
				seat: '070209',
				orientation: 'vert',
				classification: 'manager',
				xpos: 293,
				ypos: 1075
			});
			Desk.create({
				floor: 7,
				seat: '070212',
				orientation: 'vert',
				classification: 'manager',
				xpos: 392,
				ypos: 1075
			});
			Desk.create({
				floor: 7,
				seat: '070214',
				orientation: 'vert',
				classification: 'manager',
				xpos: 446,
				ypos: 1075
			});
			Desk.create({
				floor: 7,
				seat: '072106',
				orientation: 'horz',
				xpos: 185,
				ypos: 426
			});
			Desk.create({
				floor: 7,
				seat: '071906',
				orientation: 'horz',
				xpos: 185,
				ypos: 445
			});
			Desk.create({
				floor: 7,
				seat: '071806',
				orientation: 'horz',
				xpos: 185,
				ypos: 519
			});
			Desk.create({
				floor: 7,
				seat: '071706',
				orientation: 'horz',
				xpos: 185,
				ypos: 538
			});
			Desk.create({
				floor: 7,
				seat: '071407',
				orientation: 'vert',
				xpos: 223,
				ypos: 610
			});
			Desk.create({
				floor: 7,
				seat: '071307',
				orientation: 'vert',
				xpos: 223,
				ypos: 667
			});
			Desk.create({
				floor: 7,
				seat: '071107',
				orientation: 'vert',
				xpos: 223,
				ypos: 724
			});
			Desk.create({
				floor: 7,
				seat: '071007',
				orientation: 'vert',
				xpos: 223,
				ypos: 781
			});

			Desk.create({
				floor: 7,
				seat: '071404',
				orientation: 'vert',
				xpos: 126,
				ypos: 610
			});
			Desk.create({
				floor: 7,
				seat: '071304',
				orientation: 'vert',
				xpos: 126,
				ypos: 667
			});
			Desk.create({
				floor: 7,
				seat: '071104',
				orientation: 'vert',
				xpos: 126,
				ypos: 724
			});
			Desk.create({
				floor: 7,
				seat: '071405',
				orientation: 'vert',
				xpos: 145,
				ypos: 610
			});
			Desk.create({
				floor: 7,
				seat: '071305',
				orientation: 'vert',
				xpos: 145,
				ypos: 667
			});
			Desk.create({
				floor: 7,
				seat: '071005',
				orientation: 'vert',
				xpos: 145,
				ypos: 781
			});
			Desk.create({
				floor: 7,
				seat: '071402',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 618
			});
			Desk.create({
				floor: 7,
				seat: '071302',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 672
			});
			Desk.create({
				floor: 7,
				seat: '072002',
				orientation: 'horz',
				classification: 'office',
				xpos: 9,
				ypos: 410
			});
			Desk.create({
				floor: 7,
				seat: '071802',
				orientation: 'horz',
				classification: 'office',
				xpos: 9,
				ypos: 493
			});
			// Floor 8
			Desk.create({
				floor: 8,
				seat: '083006',
				orientation: 'horz',
				xpos: 160,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				seat: '082906',
				orientation: 'horz',
				xpos: 160,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '083008',
				orientation: 'horz',
				xpos: 250,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				seat: '083010',
				orientation: 'horz',
				xpos: 307,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				seat: '083011',
				orientation: 'horz',
				xpos: 364,
				ypos: 80
			});
			Desk.create({
				floor: 8,
				seat: '082908',
				orientation: 'horz',
				xpos: 250,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082910',
				orientation: 'horz',
				xpos: 307,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082911',
				orientation: 'horz',
				xpos: 364,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082804',
				orientation: 'horz',
				xpos: 103,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				seat: '082806',
				orientation: 'horz',
				xpos: 160,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				seat: '082604',
				orientation: 'horz',
				xpos: 103,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				seat: '082808',
				orientation: 'horz',
				xpos: 250,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				seat: '082810',
				orientation: 'horz',
				xpos: 307,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				seat: '082811',
				orientation: 'horz',
				xpos: 364,
				ypos: 172
			});
			Desk.create({
				floor: 8,
				seat: '082708',
				orientation: 'horz',
				xpos: 250,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				seat: '082711',
				orientation: 'horz',
				xpos: 364,
				ypos: 191
			});
			Desk.create({
				floor: 8,
				seat: '082504',
				orientation: 'horz',
				xpos: 103,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				seat: '082506',
				orientation: 'horz',
				xpos: 160,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				seat: '082404',
				orientation: 'horz',
				xpos: 103,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				seat: '082406',
				orientation: 'horz',
				xpos: 160,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				seat: '082508',
				orientation: 'horz',
				xpos: 250,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				seat: '082510',
				orientation: 'horz',
				xpos: 307,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				seat: '082511',
				orientation: 'horz',
				xpos: 364,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				seat: '082513',
				orientation: 'horz',
				xpos: 421,
				ypos: 264
			});
			Desk.create({
				floor: 8,
				seat: '082408',
				orientation: 'horz',
				xpos: 250,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				seat: '082410',
				orientation: 'horz',
				xpos: 307,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				seat: '082411',
				orientation: 'horz',
				xpos: 364,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				seat: '082413',
				orientation: 'horz',
				xpos: 421,
				ypos: 283
			});
			Desk.create({
				floor: 8,
				seat: '082304',
				orientation: 'horz',
				xpos: 103,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				seat: '082306',
				orientation: 'horz',
				xpos: 160,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				seat: '082104',
				orientation: 'horz',
				xpos: 103,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				seat: '082308',
				orientation: 'horz',
				xpos: 250,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				seat: '082310',
				orientation: 'horz',
				xpos: 307,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				seat: '082311',
				orientation: 'horz',
				xpos: 364,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				seat: '082313',
				orientation: 'horz',
				xpos: 421,
				ypos: 356
			});
			Desk.create({
				floor: 8,
				seat: '082108',
				orientation: 'horz',
				xpos: 250,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				seat: '082111',
				orientation: 'horz',
				xpos: 364,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				seat: '082113',
				orientation: 'horz',
				xpos: 421,
				ypos: 375
			});
			Desk.create({
				floor: 8,
				seat: '082802',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 183
			});
			Desk.create({
				floor: 8,
				seat: '082502',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082302',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 313
			});
			Desk.create({
				floor: 8,
				seat: '082923',
				orientation: 'horz',
				xpos: 762,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082924',
				orientation: 'horz',
				xpos: 819,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082926',
				orientation: 'horz',
				xpos: 876,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082929',
				orientation: 'horz',
				xpos: 973,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082930',
				orientation: 'horz',
				xpos: 1030,
				ypos: 99
			});
			Desk.create({
				floor: 8,
				seat: '082823',
				orientation: 'horz',
				xpos: 762,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082824',
				orientation: 'horz',
				xpos: 819,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082826',
				orientation: 'horz',
				xpos: 876,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082723',
				orientation: 'horz',
				xpos: 762,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				seat: '082724',
				orientation: 'horz',
				xpos: 819,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				seat: '082829',
				orientation: 'horz',
				xpos: 973,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082830',
				orientation: 'horz',
				xpos: 1030,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082832',
				orientation: 'horz',
				xpos: 1087,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082833',
				orientation: 'horz',
				xpos: 1144,
				ypos: 169
			});
			Desk.create({
				floor: 8,
				seat: '082729',
				orientation: 'horz',
				xpos: 973,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				seat: '082732',
				orientation: 'horz',
				xpos: 1087,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				seat: '082733',
				orientation: 'horz',
				xpos: 1144,
				ypos: 188
			});
			Desk.create({
				floor: 8,
				seat: '082523',
				orientation: 'horz',
				xpos: 762,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082524',
				orientation: 'horz',
				xpos: 819,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082526',
				orientation: 'horz',
				xpos: 875,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082423',
				orientation: 'horz',
				xpos: 762,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				seat: '082424',
				orientation: 'horz',
				xpos: 819,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				seat: '082426',
				orientation: 'horz',
				xpos: 875,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				seat: '082529',
				orientation: 'horz',
				xpos: 973,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082530',
				orientation: 'horz',
				xpos: 1030,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082532',
				orientation: 'horz',
				xpos: 1087,
				ypos: 259
			});
			Desk.create({
				floor: 8,
				seat: '082429',
				orientation: 'horz',
				xpos: 973,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				seat: '082430',
				orientation: 'horz',
				xpos: 1030,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				seat: '082432',
				orientation: 'horz',
				xpos: 1087,
				ypos: 278
			});
			Desk.create({
				floor: 8,
				seat: '082323',
				orientation: 'horz',
				xpos: 762,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				seat: '082324',
				orientation: 'horz',
				xpos: 819,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				seat: '082326',
				orientation: 'horz',
				xpos: 875,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				seat: '082223',
				orientation: 'horz',
				xpos: 762,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				seat: '082224',
				orientation: 'horz',
				xpos: 819,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				seat: '082329',
				orientation: 'horz',
				xpos: 973,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				seat: '082330',
				orientation: 'horz',
				xpos: 1030,
				ypos: 348
			});
			Desk.create({
				floor: 8,
				seat: '082229',
				orientation: 'horz',
				xpos: 973,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				seat: '082230',
				orientation: 'horz',
				xpos: 1030,
				ypos: 367
			});
			Desk.create({
				floor: 8,
				seat: '083122',
				orientation: 'vert',
				classification: 'manager',
				xpos: 726,
				ypos: 9
			});
			Desk.create({
				floor: 8,
				seat: '083124',
				orientation: 'vert',
				classification: 'manager',
				xpos: 806,
				ypos: 9
			});
			Desk.create({
				floor: 8,
				seat: '083126',
				orientation: 'vert',
				classification: 'manager',
				xpos: 860,
				ypos: 9
			});
			Desk.create({
				floor: 8,
				seat: '083129',
				orientation: 'vert',
				classification: 'manager',
				xpos: 939,
				ypos: 9
			});
			Desk.create({
				floor: 8,
				seat: '083130',
				orientation: 'vert',
				classification: 'manager',
				xpos: 993,
				ypos: 9
			});
			Desk.create({
				floor: 8,
				seat: '080812',
				orientation: 'vert',
				xpos: 435,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080814',
				orientation: 'vert',
				xpos: 454,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080612',
				orientation: 'vert',
				xpos: 435,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080614',
				orientation: 'vert',
				xpos: 454,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080512',
				orientation: 'vert',
				xpos: 435,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080514',
				orientation: 'vert',
				xpos: 454,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080815',
				orientation: 'vert',
				xpos: 527,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080816',
				orientation: 'vert',
				xpos: 546,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080616',
				orientation: 'vert',
				xpos: 546,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080515',
				orientation: 'vert',
				xpos: 527,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080516',
				orientation: 'vert',
				xpos: 546,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080818',
				orientation: 'vert',
				xpos: 619,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080819',
				orientation: 'vert',
				xpos: 638,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080618',
				orientation: 'vert',
				xpos: 619,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080619',
				orientation: 'vert',
				xpos: 638,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080518',
				orientation: 'vert',
				xpos: 619,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080619',
				orientation: 'vert',
				xpos: 638,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080820',
				orientation: 'vert',
				xpos: 712,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080821',
				orientation: 'vert',
				xpos: 731,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080621',
				orientation: 'vert',
				xpos: 731,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080520',
				orientation: 'vert',
				xpos: 712,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080521',
				orientation: 'vert',
				xpos: 731,
				ypos: 967
			});
			Desk.create({
				floor: 8,
				seat: '080823',
				orientation: 'vert',
				xpos: 804,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080623',
				orientation: 'vert',
				xpos: 804,
				ypos: 910
			});
			Desk.create({
				floor: 8,
				seat: '080824',
				orientation: 'vert',
				classification: 'manager',
				xpos: 823,
				ypos: 853
			});
			Desk.create({
				floor: 8,
				seat: '080410',
				orientation: 'vert',
				xpos: 339,
				ypos: 1001
			});
			Desk.create({
				floor: 8,
				seat: '080411',
				orientation: 'vert',
				xpos: 358,
				ypos: 1001
			});
			Desk.create({
				floor: 8,
				seat: '080210',
				orientation: 'vert',
				xpos: 339,
				ypos: 1058
			});
			Desk.create({
				floor: 8,
				seat: '080211',
				orientation: 'vert',
				xpos: 358,
				ypos: 1058
			});
			Desk.create({
				floor: 8,
				seat: '082005',
				orientation: 'horz',
				xpos: 125,
				ypos: 460
			});
			Desk.create({
				floor: 8,
				seat: '082006',
				orientation: 'horz',
				xpos: 182,
				ypos: 460
			});
			Desk.create({
				floor: 8,
				seat: '081905',
				orientation: 'horz',
				xpos: 125,
				ypos: 479
			});
			Desk.create({
				floor: 8,
				seat: '081906',
				orientation: 'horz',
				xpos: 182,
				ypos: 479
			});
			Desk.create({
				floor: 8,
				seat: '081704',
				orientation: 'horz',
				xpos: 114,
				ypos: 554
			});
			Desk.create({
				floor: 8,
				seat: '081706',
				orientation: 'horz',
				xpos: 184,
				ypos: 554
			});
			Desk.create({
				floor: 8,
				seat: '081604',
				orientation: 'horz',
				xpos: 114,
				ypos: 573
			});
			Desk.create({
				floor: 8,
				seat: '081406',
				orientation: 'horz',
				xpos: 184,
				ypos: 573
			});
			Desk.create({
				floor: 8,
				seat: '081405',
				orientation: 'horz',
				xpos: 125,
				ypos: 652
			});
			Desk.create({
				floor: 8,
				seat: '081406',
				orientation: 'horz',
				xpos: 182,
				ypos: 652
			});
			Desk.create({
				floor: 8,
				seat: '081305',
				orientation: 'horz',
				xpos: 125,
				ypos: 671
			});
			Desk.create({
				floor: 8,
				seat: '081306',
				orientation: 'horz',
				xpos: 182,
				ypos: 671
			});
			Desk.create({
				floor: 8,
				seat: '081204',
				orientation: 'horz',
				xpos: 114,
				ypos: 745
			});
			Desk.create({
				floor: 8,
				seat: '081206',
				orientation: 'horz',
				xpos: 184,
				ypos: 745
			});
			Desk.create({
				floor: 8,
				seat: '081104',
				orientation: 'horz',
				xpos: 114,
				ypos: 764
			});
			Desk.create({
				floor: 8,
				seat: '081106',
				orientation: 'horz',
				xpos: 184,
				ypos: 764
			});
			Desk.create({
				floor: 8,
				seat: '082002',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 433
			});
			Desk.create({
				floor: 8,
				seat: '081802',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 487
			});
			Desk.create({
				floor: 8,
				seat: '081502',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 581
			});
			Desk.create({
				floor: 8,
				seat: '081302',
				orientation: 'horz',
				classification: 'manager',
				xpos: 9,
				ypos: 667
			});
		}
	});
}

exports.createDefaultDesks = createDefaultDesks;