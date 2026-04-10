import { fetchUserSettings, updateUserSettings } from "./settings_Services.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await fetchUserSettings(req.user._id);
    res.status(200).json({ success: true, settings });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ success: false, message: "Server error while fetching settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updatedSettings = await updateUserSettings(req.user._id, req.body);
    res.status(200).json({ success: true, settings: updatedSettings });
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ success: false, message: "Server error while updating settings" });
  }
};
