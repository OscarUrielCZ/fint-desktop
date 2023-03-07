import moment from 'moment';
import 'moment-timezone';

function castFirebaseDate(object: any): Date {
	const momentDate = moment(object);

	if (momentDate.isValid())
		return momentDate.toDate();

	return moment(object.seconds*1000).toDate();
}

function UTCtoCST(date: Date): Date {
	let m = moment.utc(date);
	m.tz('America/Mexico_City');

	return m.toDate();
}

function CSTtoUTC(date: Date): Date {
	return moment.tz(date, 'America/Mexico_City').utc().toDate();
}

export {
	castFirebaseDate,
	UTCtoCST,
	CSTtoUTC
};