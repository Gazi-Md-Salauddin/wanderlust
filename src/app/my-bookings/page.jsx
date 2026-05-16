import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import BookingCancelAlert from '@/components/BookingCancalAlert'

const MyBookingPage = async ({bookingId}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const { token } = auth.api.getToken({
      headers: await headers(),
    })
    const user = session?.user;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
    const bookings = await res.json();
    
    return (
        <div className="max-w-7xl mx-auto mt-6">
            <h1 className="text-2xl font-bold my-6">My Bookings</h1>
            <div>
                {bookings.map((booking) => (
                    <div key={booking._id}>
                        <Image
                            src={booking.imageUrl}
                            width={100}
                            height={100}
                            alt={booking.destinationName}
                        />
                        <div>
                            <h1 className="font-bold text-2xl">
                                {booking.destinationName}
                            </h1>
                            <p>
                                {new Date(
                                    booking.departureDate
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </p>

                            <p>Booking Id: {booking._id}</p>

                            <p className="text-3xl font-bold text-cyan-500">
                                ${booking.price}
                            </p>

                            <BookingCancelAlert bookingId={booking._id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookingPage;
