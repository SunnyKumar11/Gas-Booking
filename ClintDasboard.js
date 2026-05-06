async function fetchBookingDetails() {
  try {
    const loggedInUserId = localStorage.getItem("user_id"); // Get user ID from storage
    // console.log(loggedInUserId);

    if (!loggedInUserId) {
      console.error("❌ No logged-in user found.");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/clientdashboard/booking-details/${loggedInUserId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const bookings = await response.json();
    const tableBody = document.getElementById("orderDetailsTable");
    tableBody.innerHTML = ""; // Clear previous data

    bookings
      .filter((booking) => booking.user_status?.toLowerCase() === "active") // Ensure user is active
      .forEach((booking, index) => {
        const row = `
        <tr>
            <!-- Booking ID -->
          <td class="border border-gray-300 px-4 py-2">${
            index + 1
          }</td>  <!-- Serial Number -->
          <td class="border border-gray-300 px-4 py-2">${
            booking.FullName
          }</td>   <!-- Full Name -->
          <td class="border border-gray-300 px-4 py-2">${
            booking.cylinder_type
          }</td>   <!-- Cylinder Type -->
          <td class="border border-gray-300 px-4 py-2">${
            booking.delivery_option
          }</td> <!-- Delivery Option -->
          <td class="border border-gray-300 px-4 py-2">${
            booking.payment_method
          }</td>  <!-- Payment -->
          <td class="border border-gray-300 px-4 py-2 status-cell ${
            booking.status.toLowerCase() === "delivered"
              ? "text-green-500 font-bold"
              : booking.status.toLowerCase() === "pending"
              ? "text-red-500 font-bold"
              : "text-yellow-500 font-bold"
          }">
              ${booking.status}
          </td> <!-- Status with color -->
          <td class="border border-gray-300 px-4 py-2">${
            booking.PhoneNumber
          }</td> 
          <td class="border border-gray-300 px-4 py-2">${
            booking.Address
          }</td>    <!-- Address -->
        </tr>
      `;
        tableBody.innerHTML += row;
      });

    document.getElementById("orderModal").classList.remove("hidden"); // Show modal
  } catch (error) {
    console.error("❌ Error fetching booking details:", error);
  }
}




