
import Sensor from "../models/sensor.model.js";

import SensorData from "../models/sensorData.model.js";
import Zone from "../models/zone.model.js";
export const createSensor = async (req, res) => {
  try {
    const { type, lastReading } = req.body;

    const zoneId = req.params.zone_id;

    const newSensor = new Sensor({
      zoneId,
      type,
      lastReading,
    });
    console.log(req.body, newSensor);

    await newSensor.save();

    return res.status(201).json({
      success: true,
      message: "Sensor created successfully",
      data: newSensor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSensor = async (req, res) => {
  try {
    console.log("this is sensors controller")
    const {zone_id} = req.params
    console.log(zone_id)

    const zone = await Zone.findById(zone_id).populate("sensors");
    console.log(zone)
    
    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    // console.log(zone)
    const sensor_id = zone.sensors[0]
    console.log(sensor_id)
    if(!sensor_id){
      return res.status(404).json({
        success: false,
        message: "No sensors found in this zone",
      });
    }

    const sensor = await Sensor.findById(sensor_id).populate("readings");

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: sensor.readings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateSensor = async (req, res) => {
  try {
    const data = await SensorData.create(req.body);
    await Sensor.findByIdAndUpdate(req.body.sensorId, {
      lastReading: req.body.value,
      $push: { readings: data._id },
    });

    return res.status(200).json({
      success: true,
      message: "Sensor data added successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
