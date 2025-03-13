async function fetchRooms(filterType = "ALL") {
  try {
    const response = await fetch(
      "https://hotelbooking.stepprojects.ge/api/Rooms/GetAll"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const roomsData = await response.json();
    console.log(`Filter Type: ${filterType}`);
    console.log(`Rooms Data:`, roomsData);

    const filterMap = {
      "Single Room": ["Junior Suite"],
      "Double Room": ["Premium Room", "Club Twin Room"],
      "Deluxe Room": [
        "Grand Deluxe Suite",
        "Executive Suite",
        "Deluxe Twin Room",
        "Deluxe Double Room",
      ],
    };

    let filteredRooms =
      filterType === "ALL"
        ? roomsData
        : roomsData.filter((room) =>
            filterMap[filterType]?.includes(room.name)
          );

    applyPriceFilter(filteredRooms);
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}

function applyPriceFilter(rooms) {
  const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("max-price").value) || Infinity;

  const filteredRooms = rooms.filter((room) => {
    const price = room.pricePerNight || 0;
    return price >= minPrice && price <= maxPrice;
  });

  displayRooms(filteredRooms);
}

function displayRooms(rooms) {
  const roomsContainer = document.querySelector(".guests-fav-rooms");
  roomsContainer.innerHTML = "";

  if (rooms.length === 0) {
    roomsContainer.innerHTML = `<p>No rooms available in this price range.</p>`;
    return;
  }

  rooms.forEach((room) => {
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("appended-divs");

    const roomType = room.name || "Room Type Not Available";
    const price = room.pricePerNight
      ? `$${room.pricePerNight}`
      : "Price Not Available";
    let roomImg = room.images?.[0]?.source || "https://via.placeholder.com/300";

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
    button.addEventListener("click", (event) => {
      const roomId = event.target.getAttribute("data-room-id");
      localStorage.setItem("selectedRoomId", roomId);
      window.location.href = "./book.html";
    });
  });
}

document.querySelectorAll(".same-buttons, .all-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filterType = button.textContent.trim();
    fetchRooms(filterType === "ALL" ? "ALL" : filterType);
  });
});

document
  .getElementById("filter-submit")
  .addEventListener("click", () => fetchRooms());

document.addEventListener("DOMContentLoaded", () => fetchRooms("ALL"));

document.querySelector(".fa-bars").addEventListener("click", function () {
  const menu = document.querySelector("ul");
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
});
