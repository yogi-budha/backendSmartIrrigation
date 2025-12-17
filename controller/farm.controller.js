import Farm from '../models/farm.model.js';
export const createFarm = async (req, res) => {
  try {
    console.log(req.body)
    const { farm_name, location, area } = req.body;
    const userId = req.userId;

    const newFarm = new Farm({
      userId,
      farm_name,
      location,
      area,
    });
    console.log(newFarm)

    await newFarm.save();

    return res.status(201).json({
      success: true,
      message: "Farm created successfully",
      data: newFarm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getFarm = async (req, res) => {
  try {
    const { farm_id } = req.params;
    const userId = req.userId;

    const farm = await Farm.findOne({ _id: farm_id, userId });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: farm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateFarm = async (req, res) => {
  try {
    const { farm_id } = req.params;
    const { farm_name, location, area } = req.body;
    const userId = req.user.userId;

    const updatedFarm = await Farm.findOneAndUpdate(
      { _id: farm_id, userId },
      { farm_name, location, area },
      { new: true }
    );

    if (!updatedFarm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Farm updated successfully",
      data: updatedFarm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteFarm = async (req, res) => {
  try {
    const { farm_id } = req.params;
    const userId = req.user.userId;

    const deletedFarm = await Farm.findOneAndDelete({ _id: farm_id, userId });

    if (!deletedFarm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Farm deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};