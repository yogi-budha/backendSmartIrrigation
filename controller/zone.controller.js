import Zone from '../models/zone.model.js';
export const createZone = async (req, res) => {
  try {
    // console.log(req.body,req.params)
    const { zone_name, cropsTypes,soilTypes, area } = req.body;
    const {farm_id} = req.params

    const newZone = new Zone({
      farmId: farm_id,
      zone_name,
      cropsTypes,
      soilTypes,
      area,
    });

    console.log(newZone)
    await newZone.save();

    return res.status(201).json({
      success: true,
      message: "Zone created successfully",
      data: newZone,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getZone = async (req, res) => {
  try {

    const zone = await Zone.find();

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: zone,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateZone = async (req, res) => {
  try {
    const { zone_id } = req.params;
    const { zone_name, location, area } = req.body;
    const userId = req.user.userId;

    const updatedZone = await Zone.findOneAndUpdate(
      { _id: zone_id, userId },
      { zone_name, location, area },
      { new: true }
    );

    if (!updatedZone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Zone updated successfully",
      data: updatedZone,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteZone = async (req, res) => {
  try {
    const { zone_id } = req.params;
    const userId = req.user.userId;

    const deletedZone = await Zone.findOneAndDelete({ _id: zone_id, userId });

    if (!deletedZone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
        success: true,
        message: "Zone deleted successfully",
    })
    } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};