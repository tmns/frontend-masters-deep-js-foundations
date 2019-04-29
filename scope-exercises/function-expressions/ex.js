function printRecords(recordIds) {
	const filteredRecords = studentRecords.filter(function byId(studentRecord) {
		return recordIds.includes(studentRecord.id);
	})

	const sortedRecords = [...filteredRecords].sort(function byName(filteredRecord1, filteredRecord2) {
		return filteredRecord1.name > filteredRecord2.name;
	})

	sortedRecords.forEach(function printRecord(sortedRecord) {
		console.log(`${sortedRecord.name} (${sortedRecord.id}): ${sortedRecord.paid ? 'Paid' : 'Not Paid'}`)
	})
}

function paidStudentsToEnroll() {
	const paidNotEnrolled = studentRecords.filter(function byId(studentRecord) {
		return studentRecord.paid && !currentEnrollment.includes(studentRecord.id);
	})

	const paidNotEnrolledIds = paidNotEnrolled.map(function extractId(studentRecord) {
		return studentRecord.id;
	})

	return [...currentEnrollment, ...paidNotEnrolledIds];
}

function remindUnpaid(recordIds) {
	const unpaidRecords = studentRecords.filter(function(studentRecord) {
		return recordIds.includes(studentRecord.id) && !studentRecord.paid;
	})
	
	const unpaidIds = unpaidRecords.map(function extractId(unpaidRecord) {
		return unpaidRecord.id;
	})

	printRecords(unpaidIds);
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
