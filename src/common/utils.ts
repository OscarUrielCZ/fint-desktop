import moment from 'moment';
import 'moment-timezone';

function castFirebaseDate(object: any): Date {
	const momentDate = moment(object);

	if (momentDate.isValid())
		return momentDate.toDate();

	return moment(object.seconds*1000).toDate();
}

function CSTtoUTC(date: Date): Date {
	return moment.tz(date, 'America/Mexico_City').utc().toDate();
}
function numberWithCommas(x: number | string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function UTCtoCST(date: Date): Date {
	let m = moment.utc(date);
	m.tz('America/Mexico_City');

	return m.toDate();
}

function toDateObject(dateText: string): Date {
	return moment(dateText, 'YYYY-MM-DD').toDate();
}

export {
	castFirebaseDate,
	CSTtoUTC,
    numberWithCommas,
	UTCtoCST,
	toDateObject
};