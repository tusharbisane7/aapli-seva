const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateTicketPDF = (booking, path) => {

  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(path));

  doc.fontSize(22)
  .text("Maharashtra Setu Bus Ticket");

  doc.moveDown();

  doc.fontSize(14)
  .text(`Passenger: ${booking.fullName}`);

  doc.text(`Bus: ${booking.busName}`);

  doc.text(`Seats: ${booking.seats}`);

  doc.text(`Pickup: ${booking.pickup}`);

  doc.text(`Drop: ${booking.dropPoint}`);

  doc.text(`Amount: ₹${booking.amount}`);

  doc.text(`Status: ${booking.bookingStatus}`);

  doc.end();

};

module.exports = generateTicketPDF;