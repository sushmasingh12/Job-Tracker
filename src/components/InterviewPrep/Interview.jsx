import React from "react";

const Interview = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className=" mx-auto p-8 space-y-12 pb-32">
        <div class="flex-1 flex flex-col min-w-0 bg-background-light relative overflow-y-auto">
          <div class="bg-white border-b border-neutral-border p-6 ">
            <div class=" mx-auto w-full">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div class="flex items-start gap-4">
                  <div class="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-border shrink-0">
                    <span class="material-symbols-outlined text-4xl text-neutral-muted">
                      business
                    </span>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold text-neutral-text">
                      Senior Product Designer
                    </h1>
                    <div class="flex items-center gap-2 text-neutral-muted mt-1">
                      <span class="font-medium">Google</span>
                      <span class="text-xs">•</span>
                      <span class="text-sm">Mountain View, CA</span>
                    </div>
                    <div class="mt-2 flex gap-2">
                      <span class="px-2.5 py-0.5 bg-primary-light text-primary-dark text-xs font-medium rounded-full">
                        Final Round
                      </span>
                      <span class="px-2.5 py-0.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">
                        On-site
                      </span>
                    </div>
                  </div>
                </div>
                <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 min-w-70">
                  <div class="p-2 bg-primary/10 rounded-full text-primary">
                    <span class="material-symbols-outlined">timer</span>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-primary uppercase tracking-wide">
                      Interview In
                    </p>
                    <div class="text-xl font-bold text-neutral-text font-mono flex gap-1">
                      <span>02</span>
                      <span class="text-sm font-normal text-neutral-muted self-end mb-1">
                        d
                      </span>
                      <span>:</span>
                      <span>14</span>
                      <span class="text-sm font-normal text-neutral-muted self-end mb-1">
                        h
                      </span>
                      <span>:</span>
                      <span>35</span>
                      <span class="text-sm font-normal text-neutral-muted self-end mb-1">
                        m
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white border-b border-neutral-border sticky top-0 z-20">
            <div class="max-w-5xl mx-auto w-full px-4 sm:px-8">
              <nav aria-label="Tabs" class="flex gap-8">
                <button class="border-b-2 border-primary py-4 px-1 text-sm font-medium text-primary flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">
                    quiz
                  </span>
                  Practice Questions
                </button>
                <button class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-neutral-muted hover:text-neutral-text hover:border-neutral-300 flex items-center gap-2 transition-colors">
                  <span class="material-symbols-outlined text-[18px]">
                    video_camera_front
                  </span>
                  Mock Interview
                </button>
                <button class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-neutral-muted hover:text-neutral-text hover:border-neutral-300 flex items-center gap-2 transition-colors">
                  <span class="material-symbols-outlined text-[18px]">
                    domain
                  </span>
                  Company Research
                </button>
                <button class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-neutral-muted hover:text-neutral-text hover:border-neutral-300 flex items-center gap-2 transition-colors">
                  <span class="material-symbols-outlined text-[18px]">
                    folder_special
                  </span>
                  My Answers
                </button>
              </nav>
            </div>
          </div>
          <div class="flex-1 mx-auto w-full">
            <div class="flex flex-wrap items-center gap-3 p-6">
              <span class="text-sm font-medium text-neutral-muted mr-2">
                Filter by:
              </span>
              <button class="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium transition-colors shadow-sm">
                All Questions
              </button>
              <button class="px-4 py-2 rounded-full bg-white border border-neutral-border text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors">
                Behavioral
              </button>
              <button class="px-4 py-2 rounded-full bg-white border border-neutral-border text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors">
                Technical
              </button>
              <button class="px-4 py-2 rounded-full bg-white border border-neutral-border text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors">
                Product Sense
              </button>
              <button class="px-4 py-2 rounded-full bg-white border border-neutral-border text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors">
                Leadership
              </button>
            </div>
            <div class="space-y-4">
              <div class="bg-white rounded-xl border border-neutral-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <span class="bg-neutral-100 text-neutral-600 font-mono text-xs px-2 py-1 rounded">
                      #01
                    </span>
                    <span class="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Behavioral
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="block w-2 h-2 rounded-full bg-success"></span>
                    <span class="text-xs font-medium text-neutral-muted">
                      Easy
                    </span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-neutral-text mb-2">
                  Tell me about a time you had a conflict with a stakeholder.
                  How did you resolve it?
                </h3>
                <p class="text-neutral-muted text-sm mb-6 line-clamp-2">
                  Focus on the STAR method (Situation, Task, Action, Result).
                  Highlight your communication skills and ability to find common
                  ground.
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 text-sm text-neutral-muted">
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">
                        schedule
                      </span>{" "}
                      3 min prep
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">
                        mic
                      </span>{" "}
                      Voice answer
                    </span>
                  </div>
                  <button class="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px]">
                      play_arrow
                    </span>
                    Practice Answer
                  </button>
                </div>
              </div>
              <div class="bg-white rounded-xl border border-neutral-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <span class="bg-neutral-100 text-neutral-600 font-mono text-xs px-2 py-1 rounded">
                      #02
                    </span>
                    <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Product Sense
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="block w-2 h-2 rounded-full bg-warning"></span>
                    <span class="text-xs font-medium text-neutral-muted">
                      Medium
                    </span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-neutral-text mb-2">
                  How would you improve Google Maps for a specific user segment?
                </h3>
                <p class="text-neutral-muted text-sm mb-6 line-clamp-2">
                  Demonstrate your product thinking framework. Identify a user
                  segment, pain points, prioritize solutions, and define success
                  metrics.
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 text-sm text-neutral-muted">
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">
                        schedule
                      </span>{" "}
                      5 min prep
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">
                        mic
                      </span>{" "}
                      Voice answer
                    </span>
                  </div>
                  <button class="bg-white border border-neutral-border hover:bg-neutral-50 text-neutral-text text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px]">
                      play_arrow
                    </span>
                    Practice Answer
                  </button>
                </div>
              </div>
              <div class="bg-white rounded-xl border border-neutral-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <span class="bg-neutral-100 text-neutral-600 font-mono text-xs px-2 py-1 rounded">
                      #03
                    </span>
                    <span class="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Technical
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="block w-2 h-2 rounded-full bg-danger"></span>
                    <span class="text-xs font-medium text-neutral-muted">
                      Hard
                    </span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-neutral-text mb-2">
                  Walk me through your process for conducting a design audit on
                  a legacy system.
                </h3>
                <p class="text-neutral-muted text-sm mb-6 line-clamp-2">
                  Be specific about your methodology. Discuss heuristics,
                  accessibility standards, and how you prioritize findings for
                  engineering teams.
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 text-sm text-neutral-muted">
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">
                        schedule
                      </span>{" "}
                      8 min prep
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">
                        mic
                      </span>{" "}
                      Voice answer
                    </span>
                  </div>
                  <button class="bg-white border border-neutral-border hover:bg-neutral-50 text-neutral-text text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px]">
                      play_arrow
                    </span>
                    Practice Answer
                  </button>
                </div>
              </div>
              <div class="bg-white rounded-xl border border-neutral-border p-6 shadow-sm hover:shadow-md transition-shadow opacity-60">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <span class="bg-neutral-100 text-neutral-600 font-mono text-xs px-2 py-1 rounded">
                      #04
                    </span>
                    <span class="bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Leadership
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="block w-2 h-2 rounded-full bg-warning"></span>
                    <span class="text-xs font-medium text-neutral-muted">
                      Medium
                    </span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-neutral-text mb-2">
                  Describe a situation where you had to persuade a team to adopt
                  your design vision.
                </h3>
                <div class="flex items-center gap-2 mt-6">
                  <span class="text-xs font-medium text-success flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>{" "}
                    Completed
                  </span>
                  <span class="text-xs text-neutral-muted">• Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-80 bg-neutral-surface border-l border-neutral-border flex flex-col h-[calc(100vh-64px)] z-20 shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.05)] overflow-y-auto">
          <div class="p-6 border-b border-neutral-border">
            <h2 class="text-lg font-bold text-neutral-text mb-1">
              Session Stats
            </h2>
            <p class="text-xs text-neutral-muted">
              Track your preparation progress.
            </p>
          </div>
          <div class="p-6 space-y-8">
            <div>
              <div class="flex justify-between items-end mb-2">
                <span class="text-sm font-medium text-neutral-muted">
                  Questions Practiced
                </span>
                <span class="text-2xl font-bold text-neutral-text">
                  12
                  <span class="text-sm font-normal text-neutral-muted">
                    /50
                  </span>
                </span>
              </div>
              <div class="w-full bg-neutral-100 rounded-full h-2 mb-4">
                <div
                  class="bg-primary h-2 rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-background-light p-3 rounded-lg border border-neutral-border text-center">
                  <div class="text-xs text-neutral-muted mb-1">Streak</div>
                  <div class="font-bold text-neutral-text flex items-center justify-center gap-1">
                    <span class="material-symbols-outlined text-orange-500 text-sm">
                      local_fire_department
                    </span>{" "}
                    3 Days
                  </div>
                </div>
                <div class="bg-background-light p-3 rounded-lg border border-neutral-border text-center">
                  <div class="text-xs text-neutral-muted mb-1">Time</div>
                  <div class="font-bold text-neutral-text">2h 15m</div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-neutral-text mb-4 flex items-center gap-2">
                Confidence Meter
                <span
                  class="material-symbols-outlined text-neutral-400 text-sm cursor-help"
                  title="Based on your self-assessments"
                >
                  help
                </span>
              </h3>
              <div class="relative pt-4 pb-2 flex justify-center">
                <div class="w-48 h-24 bg-neutral-100 rounded-t-full relative overflow-hidden">
                  <div class="absolute bottom-0 left-0 w-full h-full bg-linear-to-r from-red-400 via-yellow-400 to-green-500 opacity-20"></div>
                </div>
                <div class="absolute bottom-2 left-1/2 w-1 h-24 bg-neutral-800 origin-bottom transform -translate-x-1/2 rotate-[-20deg] rounded-full z-10 transition-transform duration-1000 ease-out"></div>
                <div class="absolute bottom-0 left-1/2 w-4 h-4 bg-neutral-800 rounded-full transform -translate-x-1/2 translate-y-1/2 z-20"></div>
              </div>
              <div class="flex justify-between text-xs text-neutral-muted mt-2 px-2">
                <span>Low</span>
                <span class="font-bold text-neutral-text">Moderate</span>
                <span>High</span>
              </div>
              <p class="text-xs text-neutral-muted text-center mt-3">
                You're gaining momentum! Try tackling a few 'Hard' questions to
                boost confidence.
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-neutral-text mb-3">
                Recent Activity
              </h3>
              <div class="space-y-3">
                <div class="flex gap-3 items-start">
                  <div class="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-[16px]">
                      mic
                    </span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-neutral-text">
                      Recorded Answer
                    </p>
                    <p class="text-xs text-neutral-muted">
                      "Why Google?" • 2h ago
                    </p>
                  </div>
                </div>
                <div class="flex gap-3 items-start">
                  <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-[16px]">
                      edit_note
                    </span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-neutral-text">
                      Added Notes
                    </p>
                    <p class="text-xs text-neutral-muted">
                      Leadership principles • 5h ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-auto p-4 border-t border-neutral-border bg-neutral-50">
            <button class="w-full bg-white hover:bg-neutral-50 border border-neutral-border text-neutral-text font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-sm">
              <span class="material-symbols-outlined text-[18px]">
                add_circle
              </span>
              Add Custom Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
