import moment from "moment";
import "moment-timezone";

function castFirebaseDate(object) {
	// let d = new Date(object.seconds*1000);
	// return UTCtoCST(d);
	return moment(object.seconds*1000).format("YYYY-MM-DD");
}

function UTCtoCST(date) {
	let m = moment.utc(date);
	m.tz("America/Mexico_City");
	// console.log(date, " a ", m);
	return m.format("YYYY-MM-DD");
}

function CSTtoUTC(date) {
	return moment.tz(date, "America/Mexico_City").utc().toDate();
}

export {
	castFirebaseDate,
	UTCtoCST,
	CSTtoUTC
};