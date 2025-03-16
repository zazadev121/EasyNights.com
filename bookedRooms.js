
// document.addEventListener("DOMContentLoaded", displayBookedRooms);

// async function displayBookedRooms() {
//   const bookedRoomsContainer = document.getElementById("main");
//   bookedRoomsContainer.innerHTML = "<h2>Booked Rooms</h2>";

//   try {
//     const response = await fetch("https://67d545b6d2c7857431efdfb5.mockapi.io/book");
//     if (!response.ok) {
//       throw new Error("Failed to fetch booked rooms");
//     }
    
//     const bookedRooms = await response.json();
//     const roomsResponse = await fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll");
//     if (!roomsResponse.ok) {
//       throw new Error("Failed to fetch room details");
//     }
//     const roomsData = await roomsResponse.json();

//     if (bookedRooms.length === 0) {
//       bookedRoomsContainer.innerHTML += "<p>No rooms booked yet.</p>";
//       return;
//     }

//     bookedRooms.forEach((room) => {
//       const roomDetails = roomsData.find(r => r.id == room.roomId);
//       const roomImage = roomDetails?.images[0]?.source || "https://via.placeholder.com/300";
      
//       const nightsStayed = calculateNights(room.checkIn, room.checkOut);
      
//       const roomDiv = document.createElement("div");
//       roomDiv.classList.add("booked-room");
//       roomDiv.innerHTML = `
//         <div class="room-card">
//           <img src="${roomImage}" alt="${room.roomName}" class="room-img"/>
//           <h3>${room.roomName}</h3>
//           <p><strong>Check-in:</strong> ${new Date(room.checkIn).toLocaleDateString()}</p>
//           <p><strong>Check-out:</strong> ${new Date(room.checkOut).toLocaleDateString()}</p>
//           <p><strong>Nights Booked:</strong> ${nightsStayed}</p>
//           <p><strong>Guests:</strong> ${room.guests}</p>
//           <button class="delete-btn" data-id="${room.id}">Delete</button>
//         </div>
//       `;
//       bookedRoomsContainer.appendChild(roomDiv);
//     });

//     document.querySelectorAll(".delete-btn").forEach((button) => {
//       button.addEventListener("click", async (event) => {
//         const roomId = event.target.getAttribute("data-id");
//         await deleteRoom(roomId);
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching booked rooms:", error);
//   }
// }

// function calculateNights(checkIn, checkOut) {
//   const startDate = new Date(checkIn);
//   const endDate = new Date(checkOut);
//   return Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
// }

// async function deleteRoom(roomId) {
//   try {
//     const response = await fetch(`https://67d545b6d2c7857431efdfb5.mockapi.io/book/${roomId}`, {
//       method: "DELETE",
//     });
    
//     if (!response.ok) {
//       throw new Error("Failed to delete room");
//     }

//     Swal.fire({
//       icon: "success",
//       title: "Room Deleted",
//       text: "The booked room has been successfully deleted.",
//     }).then(() => {
//       displayBookedRooms();
//     });
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Delete Failed",
//       text: "An error occurred while deleting the room. Please try again.",
//     });
//     console.error("Error deleting room:", error);
//   }
// }



document.addEventListener("DOMContentLoaded", displayBookedRooms);

async function displayBookedRooms() {
  const bookedRoomsContainer = document.getElementById("main");
  bookedRoomsContainer.innerHTML = "<h2>Booked Rooms</h2>";

  try {
    const response = await fetch("https://67d545b6d2c7857431efdfb5.mockapi.io/book");
    if (!response.ok) {
      throw new Error("Failed to fetch booked rooms");
    }
    
    const bookedRooms = await response.json();
    const roomsResponse = await fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll");
    if (!roomsResponse.ok) {
      throw new Error("Failed to fetch room details");
    }
    const roomsData = await roomsResponse.json();

    if (bookedRooms.length === 0) {
      bookedRoomsContainer.innerHTML += "<p>No rooms booked yet.</p>";
      return;
    }

    bookedRooms.forEach((room) => {
      const roomDetails = roomsData.find(r => r.id == room.roomId);
      const roomImage = roomDetails?.images[0]?.source || "https://via.placeholder.com/300";
      const pricePerNight = roomDetails?.pricePerNight || 0;
      
      const nightsStayed = calculateNights(room.checkIn, room.checkOut);
      const totalCost = nightsStayed * pricePerNight;
      
      const roomDiv = document.createElement("div");
      roomDiv.classList.add("booked-room");
      roomDiv.innerHTML = `
        <div class="room-card">
          <img src="${roomImage}" alt="${room.roomName}" class="room-img"/>
          <h3>${room.roomName}</h3>
          <p><strong>Check-in:</strong> ${new Date(room.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> ${new Date(room.checkOut).toLocaleDateString()}</p>
          <p><strong>Nights Booked:</strong> ${nightsStayed}</p>
          <p><strong>Guests:</strong> ${room.guests}</p>
          <p><strong>Price per Night:</strong> $${pricePerNight.toFixed(2)}</p>
          <p><strong>Total Cost:</strong> $${totalCost.toFixed(2)}</p>
          <button class="delete-btn" data-id="${room.id}">Delete</button>
        </div>
      `;
      bookedRoomsContainer.appendChild(roomDiv);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const roomId = event.target.getAttribute("data-id");
        await deleteRoom(roomId);
      });
    });
  } catch (error) {
    console.error("Error fetching booked rooms:", error);
  }
}

function calculateNights(checkIn, checkOut) {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  return Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
}

async function deleteRoom(roomId) {
  try {
    const response = await fetch(`https://67d545b6d2c7857431efdfb5.mockapi.io/book/${roomId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete room");
    }

    Swal.fire({
      icon: "success",
      title: "Room Deleted",
      text: "The booked room has been successfully deleted.",
    }).then(() => {
      displayBookedRooms();
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "An error occurred while deleting the room. Please try again.",
    });
    console.error("Error deleting room:", error);
  }
}