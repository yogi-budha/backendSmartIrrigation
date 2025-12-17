import Sensor from '../models/sensor.model.js';

import SensorData from '../models/sensorData.model.js';
export const createSensor = async (req, res) => {
  try {
    const {
      type,
      lastReading,
    } = req.body;

    const zoneId = req.params.zone_id;

    const newSensor = new Sensor({
      zoneId,
      type,
      lastReading,
    });
    console.log(req.body,newSensor)

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
    const { sensor_id } = req.params;
    const userId = req.user.userId;

    const sensor = await Sensor.findOne({ _id: sensor_id, userId });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    return res.status(200).json({
        success: true,        
        data: sensor,                                                                                                                       
    })
    } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }}

export const updateSensor = async (req, res) => {
    try {
        
      const data = await SensorData.create(req.body);
   await Sensor.findByIdAndUpdate(req.body.sensorId, {
     lastReading: req.body.value,
   });
    return res.status(200).json({
        success:true,
        message:"Sensor data added successfully",
        data:data
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
