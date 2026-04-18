import User from "./auth_Model.js";
import generateToken from "../../utils/generateTokens.js";
import Joi from "joi";

// ── Validation Schemas ────────────────────────────────────────────────────

const registerSchema = Joi.object({
  firstname: Joi.string().min(2).required().messages({
    "string.min": "First name must be at least 2 characters",
    "any.required": "First name is required",
  }),
  lastname: Joi.string().min(2).required().messages({
    "string.min": "Last name must be at least 2 characters",
    "any.required": "Last name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Valid email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Valid email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// ── Register ──────────────────────────────────────────────────────────────

export const registerUser = async (res, { firstname, lastname, email, password }) => {
  try {
    const { error } = registerSchema.validate(
      { firstname, lastname, email, password },
      { abortEarly: false }
    );
    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      throw new Error(messages);
    }

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const user = await User.create({ firstname, lastname, email, password });
    generateToken(res, user._id);

    return {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  } catch (error) {
    console.error("Register Error:", error.message);
    throw error;
  }
};

// ── Login ─────────────────────────────────────────────────────────────────

export const loginUser = async (res, { email, password }) => {
  try {
    const { error } = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      throw new Error(messages);
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) throw new Error("Invalid email or password");

    // Google-only account pe password login try kiya toh
    if (!user.password) throw new Error("This account uses Google Sign-In. Please login with Google.");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    generateToken(res, user._id);

    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// ── Logout ────────────────────────────────────────────────────────────────

export const logoutUser = (res) => {
  res.cookie("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
    path: "/",
  });
  return { message: "Logged out successfully" };
};

// ── Google Auth ───────────────────────────────────────────────────────────

export const googleAuthUser = async (res, { googleId, email, firstname, lastname }) => {
  try {
    // Pehle googleId se dhundo, phir email se
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Bilkul naya user — Google se pehli baar aa raha hai
      user = await User.create({
        googleId,
        email,
        firstname,
        lastname,
        isVerified: true,        // Google verified email hai
      });
    } else if (!user.googleId) {
      // Pehle email/password se register kiya tha — Google account link kar do
      user.googleId = googleId;
      await user.save();
    }

    generateToken(res, user._id);

    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    throw error;
  }
};