const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("../db/db.connect");
const Hotel = require("../models/hotel.models");

initializeDatabase();

app.use(cors());
app.use(express.json());

// const newHotel = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: [
//     "https://example.com/hotel1-photo1.jpg",
//     "https://example.com/hotel1-photo2.jpg",
//   ],
// };

async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const savedHotel = await hotel.save();
    return savedHotel;
  } catch (error) {
    throw error;
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await createHotel(req.body);

    res.status(201).json({
      message: "Hotel added successfully.",
      hotel: savedHotel,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add hotel.",
    });
  }
});

// createHotel(newHotel)

// ---------------------------------------------------------
// IMPORTANT: specific routes must come BEFORE the generic
// "/hotels/:hotelName" route, otherwise Express will match
// "/hotels/directory/...", "/hotels/rating/...", and
// "/hotels/category/..." as if "directory", "rating", and
// "category" were hotel names.
// ---------------------------------------------------------

// Read hotel by phone number

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);

    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

async function readHotelByPhoneNumber(phoneNumber) {
  try {
    const hotel = await Hotel.findOne({ phoneNumber: phoneNumber });
    return hotel;
  } catch (error) {
    console.log(error);
  }
}

// Read hotels by rating

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotels = await readHotelByRating(req.params.hotelRating);

    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

async function readHotelByRating(hotelRating) {
  try {
    const hotels = await Hotel.find({ rating: Number(hotelRating) });
    return hotels;
  } catch (error) {
    console.log(error);
  }
}

// Read hotels by category

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotels = await readHotelByCategory(req.params.hotelCategory);

    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

async function readHotelByCategory(hotelCategory) {
  try {
    const hotels = await Hotel.find({ category: hotelCategory });
    return hotels;
  } catch (error) {
    console.log(error);
  }
}

// Read all hotels

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();

    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

async function readAllHotels() {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    console.log(error);
  }
}

// Read hotel by name
// NOTE: this generic route must stay BELOW all the specific
// "/hotels/..." routes above (directory, rating, category),
// but it can be anywhere relative to "/hotels" (plain) since
// that's a different, non-conflicting path.

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);

    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

async function readHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    return hotel;
  } catch (error) {
    throw error;
  }
}

// Delete hotel by ID
async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(req.params.hotelId);

    if (deletedHotel) {
      res.status(200).json({
        message: "Hotel deleted successfully.",
      });
    } else {
      res.status(404).json({
        error: "Hotel not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete hotel.",
    });
  }
});

// Update hotel rating by ID
async function updateHotelById(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    throw error;
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotelById(req.params.hotelId, req.body);

    if (updatedHotel) {
      res.status(200).json({
        message: "Hotel updated successfully.",
        hotel: updatedHotel,
      });
    } else {
      res.status(404).json({
        error: "Hotel not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update hotel.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;