import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";

import BookingStatusForm from "@/components/update-status-modal-form";

interface Booking {
  id: number;
  userId: number;
  bookingDate: string;
  status: string;
  description: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface BookingTableProps {
  bookings: Booking[];
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Booking Details</TableCaption>
        <Thead>
          <Tr>
            <Th>Booking ID</Th>
            <Th>Booking Date</Th>
            <Th>Status</Th>
            <Th>Description</Th>
            <Th>User Name</Th>
            <Th>User Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>{booking.id}</Td>
              <Td>{new Date(booking.bookingDate).toLocaleDateString()}</Td>
              <Td>
                {booking.status}
                <BookingStatusForm bookingId={booking.id} />
              </Td>
              <Td>{booking.description}</Td>
              <Td>
                {booking.user.firstName} {booking.user.lastName}
              </Td>
              <Td>{booking.user.email}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Booking ID</Th>
            <Th>Booking Date</Th>
            <Th>Status</Th>
            <Th>Description</Th>
            <Th>User Name</Th>
            <Th>User Email</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default BookingTable;
