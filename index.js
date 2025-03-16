async function fetchRooms() {
  try {
    const response = await fetch(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const roomsData = await response.json();

    const roomsContainer = document.querySelector(".guests-fav-rooms");
    roomsContainer.innerHTML = "";

    if (roomsData.length === 0) {
      roomsContainer.innerHTML = `<p>No rooms available.</p>`;
      return;
    }

    // Limit to first 6 rooms
    const limitedRooms = roomsData.slice(0, 6);

    limitedRooms.forEach((room) => {
      const roomDiv = document.createElement("div");
      roomDiv.classList.add("appended-divs");

      const roomType = room.name || "Room Type Not Available";
      const price = room.pricePerNight
        ? `$${room.pricePerNight}`
        : "Price Not Available";

      let roomImg = "https://via.placeholder.com/300";
      if (room.images && room.images.length > 0) {
        roomImg = room.images[0].source || roomImg;
      }

      roomDiv.innerHTML = `
        <div class="h3-div">
          <h3>${roomType}</h3>
          <h3>Night price :: ${price}</h3>
        </div>
        <img src="${roomImg}" alt="${roomType}" />
        <button class="book-button" data-room-id="${room.id}">Book Now</button>
      `;

      roomsContainer.appendChild(roomDiv);
    });

    document.querySelectorAll(".book-button").forEach((button) => {
      button.addEventListener("click", function () {
        const roomId = this.getAttribute("data-room-id");
        localStorage.setItem("selectedRoomId", roomId);
        window.location.href = "book.html";
      });
    });
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRooms);

document.querySelector(".fa-bars").addEventListener("click", function () {
  const menu = document.querySelector("ul");
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
});
