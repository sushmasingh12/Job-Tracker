import Settings from "./settings_Model.js";
import User from "../auth/auth_Model.js";

export const fetchUserSettings = async (userId) => {
  let settings = await Settings.findOne({ user: userId });
  const user = await User.findById(userId);

  if (!settings) {
    settings = new Settings({ user: userId });
  }

  let isModified = false;

  if (user) {
    if (!settings.profile.fullName) {
      settings.profile.fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();
      isModified = true;
    }
    if (!settings.profile.email) {
      settings.profile.email = user.email || "";
      isModified = true;
    }
  }

  if (isModified || settings.isNew) {
    await settings.save();
  }

  return settings;
};

export const updateUserSettings = async (userId, data) => {
  const allowedKeys = [
    "profile",
    "account",
    "resume",
    "preferences",
    "notifications",
    "ai",
    "appearance",
    "privacy",
  ];

  let settings = await Settings.findOne({ user: userId });
  if (!settings) {
    settings = new Settings({ user: userId });
  }

  allowedKeys.forEach((key) => {
    if (data[key] !== undefined) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        for (const subKey in data[key]) {
          // Special handling for deeper nesting if necessary, like links
          if (
            typeof data[key][subKey] === "object" &&
            !Array.isArray(data[key][subKey])
          ) {
            for (const deepKey in data[key][subKey]) {
              if (!settings[key][subKey]) {
                  settings[key][subKey] = {};
              }
              settings[key][subKey][deepKey] = data[key][subKey][deepKey];
            }
          } else {
            settings[key][subKey] = data[key][subKey];
          }
        }
      } else {
        settings[key] = data[key];
      }
      // Force mongoose to mark modified if needed
      settings.markModified(key);
    }
  });

  await settings.save();
  return settings;
};
