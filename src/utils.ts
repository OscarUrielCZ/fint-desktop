import moment from 'moment';
import 'moment-timezone';

function castFirebaseDate(object: any): string {
	const momentDate = moment(object);

	if (momentDate.isValid())
		return momentDate.format('YYYY-MM-DD');

	return moment(object.seconds*1000).format('YYYY-MM-DD');
}

function UTCtoCST(date: Date): string {
	let m = moment.utc(date);
	m.tz('America/Mexico_City');

	return m.format('YYYY-MM-DD');
}

function CSTtoUTC(date: Date): Date {
	return moment.tz(date, 'America/Mexico_City').utc().toDate();
}

export {
	castFirebaseDate,
	UTCtoCST,
	CSTtoUTC
};