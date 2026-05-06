console.log("✅ Auth.js is loaded!");

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded");

  // ✅ Handle Registration Form (Only if exists)
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    console.log("🔵 Register Form Found");

    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("📩 Register Form Submitted!");

      const userData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zipCode: document.getElementById("zipCode").value,
        password: document.getElementById("password").value,
      };
      console.log("User Data:", userData);

      try {
        const response = await axios.post("http://localhost:3000/api/registration", userData);
        console.log(response);
        alert(response.data.message);
        window.location.href = "login.html"; // Redirect to login after successful registration
      } catch (error) {
        console.error("Registration Error:", error);
        alert(error.response ? error.response.data.error : "Registration failed");
      }
    });
  } else {
    console.log("🔴 No Register Form Found (Skipping registration handling)");
  }

  // ✅ Handle Login Form (Only if exists)
  // const loginForm = document.getElementById("loginForm");
  // if (loginForm) {
  //   console.log("🔵 Login Form Found");

  //   loginForm.addEventListener("submit", async function (event) {
  //     event.preventDefault();
  //     console.log("📩 Login Form Submitted!");

  //     const loginData = {
  //       email: document.getElementById("loginEmail").value,
  //       password: document.getElementById("loginPassword").value,
  //     };
  //     console.log("Login Data:", loginData);

  //     try {
  //       const response = await axios.post("http://localhost:3000/api/login", loginData);
  //       console.log("Server Response:", response.data);
  //       if (response.data.user) {
  //         // Store user details in localStorage
  //         localStorage.setItem("user_id", response.data.user.id);
  //         localStorage.setItem("user_name", response.data.user.fullName);
  //         localStorage.setItem("user_email", response.data.user.email);
  //     }
  //     console.log("login",response.data.user);
      
    
  //       alert("✅ Login successful!");
  //       window.location.href = "hero.html"; // Redirect on success
        
  //     } catch (error) {
  //       console.error("Login Error:", error);
  //       alert("❌ Failed to log in. Please try again.");
  //     }
  //   });
  // } else {
  //   console.log("🔴 No Login Form Found (Skipping login handling)");
  // }



const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const loginData = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        loginData
      );

      console.log("Server Response:", response.data);

      // ✅ Only proceed if user exists
      if (response.data.user) {
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("user_name", response.data.user.fullName);
        localStorage.setItem("user_email", response.data.user.email);

        console.log("✅ Stored user_id:", response.data.user.id);

        alert("✅ Login successful!");
        window.location.href = "hero.html";
      } else {
        alert("❌ Invalid login response");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("❌ Login failed. Check email/password.");
    }
  });
}
});
