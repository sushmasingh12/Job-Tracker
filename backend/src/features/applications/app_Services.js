import Application from "./app_Model.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

const buildSalaryRange = (salaryMin, salaryMax) => {
  if (salaryMin && salaryMax)
    return `₹${Number(salaryMin).toLocaleString()} - ₹${Number(salaryMax).toLocaleString()}`;
  if (salaryMin) return `₹${Number(salaryMin).toLocaleString()}+`;
  if (salaryMax) return `Up to ₹${Number(salaryMax).toLocaleString()}`;
  return undefined;
};

// Maps each status to the Material Symbol icon + Tailwind color used in the
// statusHistory timeline on the frontend (ApplicationDetails.jsx)
const STATUS_HISTORY_CONFIG = {
  Applied:   { icon: "send",               color: "bg-blue-500"    },
  Interview: { icon: "chat_bubble",         color: "bg-amber-500"   },
  Offer:     { icon: "workspace_premium",   color: "bg-emerald-500" },
  Rejected:  { icon: "cancel",              color: "bg-red-500"     },
  Hired:     { icon: "check_circle",        color: "bg-purple-500"  },
};

const makeHistoryEntry = (status) => ({
  label: status,
  date:  new Date(),
  icon:  STATUS_HISTORY_CONFIG[status]?.icon  ?? "circle",
  color: STATUS_HISTORY_CONFIG[status]?.color ?? "bg-slate-400",
});

// ── CREATE ───────────────────────────────────────────────────────────────────

export const createApplication = async (userId, body) => {
  const {
    jobTitle, company, location, workType,
    applicationDate, status,
    salaryMin, salaryMax, salaryRange,
    jobPostUrl, jobDescription, notes,
  } = body;

  const resolvedStatus = status || "Applied";
  
  return await Application.create({
    user: userId,
    jobTitle,
    company,
    location,
    workType: workType || "On-site",
    applicationDate,
    status: resolvedStatus,
    salaryRange: salaryRange || buildSalaryRange(salaryMin, salaryMax),
    jobPostUrl,
    jobDescription,
    notes,
    // Auto-seed the first history entry so the timeline always has data
    statusHistory: [makeHistoryEntry(resolvedStatus)],
  });
};

// ── GET ALL ──────────────────────────────────────────────────────────────────

export const getApplications = async (userId, query = {}) => {
  const {
    status,
    search,
    sortBy  = "createdAt",
    order   = "desc",
    page    = 1,
    limit   = 10,
  } = query;

  const filter = { user: userId };
  if (status && status !== "All") filter.status = status;
  if (search) {
    filter.$or = [
      { jobTitle: { $regex: search, $options: "i" } },
      { company:  { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [applications, total, stats] = await Promise.all([
    Application.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit))
      .select("-__v"),
    Application.countDocuments(filter),
    Application.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  return { applications, total, stats };
};

// ── GET BY ID ─────────────────────────────────────────────────────────────────

export const getApplicationById = async (userId, appId) => {
  return await Application.findOne({ _id: appId, user: userId }).select("-__v");
};

// ── UPDATE ───────────────────────────────────────────────────────────────────

export const updateApplication = async (userId, appId, body) => {
  const { salaryMin, salaryMax, ...rest } = body;

  if (salaryMin !== undefined || salaryMax !== undefined) {
    rest.salaryRange = buildSalaryRange(salaryMin, salaryMax);
  }

  return await Application.findOneAndUpdate(
    { _id: appId, user: userId },
    { $set: rest },
    { returnDocument: "after", runValidators: true, select: "-__v" }
  );
};

// ── UPDATE STATUS ─────────────────────────────────────────────────────────────
// Also appends a new entry to statusHistory so the frontend timeline stays fresh

export const updateStatus = async (userId, appId, status) => {
  return await Application.findOneAndUpdate(
    { _id: appId, user: userId },
    {
      $set:  { status },
      $push: { statusHistory: makeHistoryEntry(status) },
    },
    { returnDocument: "after", runValidators: true, select: "-__v" }
  );
};

// ── SAVE COVER LETTER ─────────────────────────────────────────────────────────
 
export const saveCoverLetter = async (userId, appId, content) => {
  return await Application.findOneAndUpdate(
    { _id: appId, user: userId },
    {
      $set: {
        "coverLetter.content":     content,
        "coverLetter.generatedAt": new Date(),
      },
    },
    { returnDocument: "after", select: "-__v" }
  );
};

// ── SAVE RESUME ───────────────────────────────────────────────────────────────

export const saveResume = async (userId, appId, { content, }) => {
  return await Application.findOneAndUpdate(
    { _id: appId, user: userId },
    {
      $set: {
        optimizedResume: {
          content,
         
          savedAt: new Date(),
        },
      },
    },
    { returnDocument: "after", select: "-__v" }
  );
};

// ── DELETE ───────────────────────────────────────────────────────────────────

export const deleteApplication = async (userId, appId) => {
  return await Application.findOneAndDelete({ _id: appId, user: userId });
};