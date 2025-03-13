let guestInput = document.getElementById("guest-count");

async function fetchRoomDetails() {
  try {
    const roomId = localStorage.getItem("selectedRoomId");
    if (!roomId) {
      alert("No room selected.");
      return;
    }

    const response = await fetch(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const roomsData = await response.json();
    const room = roomsData.find((r) => r.id == roomId);

    if (room) {
      const roomInfoDiv = document.getElementById("room-info");
      roomInfoDiv.innerHTML = `
        <div class="maindiv">
          <img src="${
            room.images[0]?.source || "https://via.placeholder.com/300"
          }" alt="${room.name}" class="book-img"/>
          <h2>${room.name}</h2>
          <p><strong>Price per Night:</strong> $${
            room.pricePerNight || "N/A"
          }</p>
          <p><strong>Maximum Guests:</strong> ${
            room.maximumGuests || "Description not available"
          }</p>
          <p><strong>Availability:</strong> ${
            room.available ? "Available" : "Not Available"
          }</p>
        </div>
      `;

      // Update the guest input max value
      guestInput.setAttribute("max", room.maximumGuests);
    } else {
      alert("Room not found");
    }
  } catch (error) {
    console.error("Error fetching room details:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRoomDetails);

document.querySelector(".fa-bars").addEventListener("click", function () {
  const menu = document.querySelector("ul");
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
});

let inputDate = document.getElementById("date-input");

let today = new Date();
let formattedDate = today.toISOString().split("T")[0];

inputDate.value = formattedDate;

let secondDate = document.getElementById("input-2");

let NowDay = new Date();
let ChangedDate = today.toISOString().split("T")[0];

secondDate.value = ChangedDate;

console.log(room.maximumGuests);
