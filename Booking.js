async function confirmBooking() {
  console.log("hii");
  
    const userId = localStorage.getItem("user_id"); // Assuming user is logged in
    const cylinderType = document.getElementById("cylinderType").value;
    const deliveryOption = document.getElementById("deliveryOption").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
  
    const bookingDetails = { user_id: userId, cylinder_type: cylinderType, delivery_option: deliveryOption, payment_method: paymentMethod };
    console.log(bookingDetails);
    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Booking successful!");
        closeModal("gasBookingModal");
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("❌ Booking failed!");
    }
  }
  