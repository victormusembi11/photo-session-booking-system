import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleViewMore = (bookingId: number) => {
    router.push(`/client/bookings/${bookingId}`);
  };

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
            <Th>View More</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>{booking.id}</Td>
              <Td>{new Date(booking.bookingDate).toLocaleDateString()}</Td>
              <Td>{booking.status}</Td>
              <Td>{booking.description}</Td>
              <Td>
                {booking.user.firstName} {booking.user.lastName}
              </Td>
              <Td>{booking.user.email}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClick={() => handleViewMore(booking.id)}>
                  View More
                </Button>
              </Td>
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
            <Th>View More</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default BookingTable;
