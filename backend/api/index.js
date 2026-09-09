const express = require("express");
const cors = require("cors");

const app = express();

const { initializeDatabase } = require("../db/db.connect");
const Hotel = require("../models/hotel.models");

// Connect Database
initializeDatabase();

// CORS Configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// ---------------------------------------------------------
// Add new hotel
// ---------------------------------------------------------

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

// ---------------------------------------------------------
// Read all hotels
// ---------------------------------------------------------

async function readAllHotels() {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();

    if (hotels.length !== 0) {
      res.json(hotels);
    } else {
      res.status(404).json({
        error: "No hotels found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hotels.",
    });
  }
});

// ---------------------------------------------------------
// Read hotel by phone number
// ---------------------------------------------------------

async function readHotelByPhoneNumber(phoneNumber) {
  try {
    const hotel = await Hotel.findOne({
      phoneNumber: phoneNumber,
    });

    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhoneNumber(
      req.params.phoneNumber
    );

    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({
        error: "Hotel not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hotel.",
    });
  }
});

// ---------------------------------------------------------
// Read hotels by rating
// ---------------------------------------------------------

async function readHotelByRating(hotelRating) {
  try {
    const hotels = await Hotel.find({
      rating: Number(hotelRating),
    });

    return hotels;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotels = await readHotelByRating(
      req.params.hotelRating
    );

    if (hotels.length !== 0) {
      res.json(hotels);
    } else {
      res.status(404).json({
        error: "No hotels found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hotels.",
    });
  }
});

// ---------------------------------------------------------
// Read hotels by category
// ---------------------------------------------------------

async function readHotelByCategory(hotelCategory) {
  try {
    const hotels = await Hotel.find({
      category: hotelCategory,
    });

    return hotels;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotels = await readHotelByCategory(
      req.params.hotelCategory
    );

    if (hotels.length !== 0) {
      res.json(hotels);
    } else {
      res.status(404).json({
        error: "No hotels found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hotels.",
    });
  }
});

// ---------------------------------------------------------
// Read hotel by name
// ---------------------------------------------------------

async function readHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({
      name: hotelName,
    });

    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(
      req.params.hotelName
    );

    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({
        error: "Hotel not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch hotel.",
    });
  }
});

// ---------------------------------------------------------
// Update hotel by ID
// ---------------------------------------------------------

async function updateHotelById(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      dataToUpdate,
      { new: true }
    );

    return updatedHotel;
  } catch (error) {
    throw error;
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotelById(
      req.params.hotelId,
      req.body
    );

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

// ---------------------------------------------------------
// Delete hotel by ID
// ---------------------------------------------------------

async function deleteHotelById(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    return deletedHotel;
  } catch (error) {
    throw error;
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(
      req.params.hotelId
    );

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

// ---------------------------------------------------------
// Local pe chalega, Vercel pe nahi
// ---------------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    message: "Hotel API is running successfully.",
  });
});

if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}
module.exports = app;