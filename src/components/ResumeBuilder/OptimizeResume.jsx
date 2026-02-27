import React from "react";

const OptimizeResume = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div class="flex flex-1 overflow-hidden">
        <div class="w-80 shrink-0 border-r border-blue-400/10 overflow-y-auto p-6 space-y-6">
          <div
            class="bg-neutral-surface border border-neutral-border rounded-2xl p-6 flex flex-col  items-center gap-4 
          relative  dark:bg-dark  dark:border-slate-700/50 backdrop-blur-sm  shadow-sm overflow-hidden"
          >
            
            <span class="text-xs uppercase tracking-widest text-slate-500">
              ATS Match Score
            </span>

            <div class="relative w-36 h-36 flex items-center justify-center">
              <div class="absolute text-center">
                <div id="scoreNum" class="text-3xl font-mono">
                  72
                </div>
                <div class="text-sm text-slate-500">/100</div>
              </div>
              <div class="w-36 h-36 rounded-full border-[10px] border-blue-500/30"></div>
            </div>

            <span class="text-xs font-semibold px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
              ⚡ Good Match
            </span>
            <div class="grid grid-cols-2 gap-3">
              <div class="neutral-surface border border-neutral-border rounded-xl p-4 space-y-2 dark:bg-dark  dark:border-slate-700/50 backdrop-blur-md p-6 shadow-md overflow-hidden">
                <div class="text-blue-400 text-xl font-mono">14</div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500">
                  Keywords
                </div>
              </div>

              <div class="neutral-surface border border-neutral-border rounded-xl p-4 space-y-2 dark:bg-dark  dark:border-slate-700/50 backdrop-blur-md p-6 shadow-md overflow-hidden">
                <div class="text-green-400 text-xl font-mono">9</div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500">
                  Matched
                </div>
              </div>

              <div class="neutral-surface border border-neutral-border rounded-xl p-4 space-y-2 dark:bg-dark  dark:border-slate-700/50 backdrop-blur-md p-6 shadow-md overflow-hidden">
                <div class="text-red-400 text-xl font-mono">5</div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500">
                  Missing
                </div>
              </div>

              <div class="neutral-surface border border-neutral-border rounded-xl p-4 space-y-2 dark:bg-dark  dark:border-slate-700/50 backdrop-blur-md p-6 shadow-md overflow-hidden">
                <div class="text-amber-400 text-xl font-mono">+24</div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500">
                  Potential
                </div>
              </div>
            </div>
           
            {/* !--FOR Score BREAKDOWN--! */}
            <div class="neutral-surface border border-neutral-border rounded-xl dark:bg-dark  dark:border-slate-700/50 backdrop-blur-md  shadow-md overflow-hidden p-5 space-y-4">
            <div class="text-xs uppercase tracking-widest text-slate-500">
              Score Breakdown
            </div>

            
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-400">Keywords & Skills</span>
                <span class="font-mono">68%</span>
              </div>
              <div class="h-2 bg-slate-300 border border-neutral-border rounded-full">
                <div class="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-[68%]"></div>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-400">Keywords & Skills</span>
                <span class="font-mono">68%</span>
              </div>
              <div class="h-2 bg-slate-300 border border-neutral-border rounded-full">
                <div class="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-[68%]"></div>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-400">Keywords & Skills</span>
                <span class="font-mono">68%</span>
              </div>
              <div class="h-2 bg-slate-300 border border-neutral-border rounded-full">
                <div class="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-[68%]"></div>
              </div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-400">Keywords & Skills</span>
                <span class="font-mono">68%</span>
              </div>
              <div class="h-2 bg-slate-300 border border-neutral-border rounded-full">
                <div class="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-[68%]"></div>
              </div>
          
          </div>
            
          </div>

          
          <div
            onclick="goToOptimize()"
            class="cursor-pointer bg-gradient-to-r from-blue-500/20 to-cyan-400/10 border border-blue-400/30 rounded-2xl p-5 hover:shadow-lg hover:shadow-blue-500/20 transition"
          >
            <div class="font-bold mb-1">Boost Your Score</div>
            <div class="text-sm text-slate-400">
              AI can improve your score to
              <span class="text-blue-400 font-semibold">96+</span>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col overflow-hidden">
          <div class="flex items-center justify-between  px-7 py-4 ">
            <div class="flex bg-neutral-surface rounded-md">
              <button
                
                class="px-5 py-2 text-sm rounded-md bg-primary text-white"
              >
                Before Resume
              </button>
              <button
                
                class="px-5 py-2 text-sm rounded-md text-slate-400"
              >
                After Resume
              </button>
            </div>

          </div>

          <div class="flex-1 overflow-y-auto p-8 flex justify-center">
            <div
              id="beforeResume"
              class="bg-white text-black w-full max-w-2xl p-12 shadow-lg rounded"
            >
              <h1 class="text-2xl font-bold mb-2">Alex Johnson</h1>
              <p class="text-sm text-gray-600 mb-6">Frontend Developer</p>
              <h2 class="uppercase text-xs font-bold border-b mb-3">Summary</h2>
              <p class="text-sm leading-relaxed text-gray-700">
                Frontend developer with 4 years of experience building web
                applications.
              </p>
            </div>

            <div
              id="afterResume"
              class="hidden bg-white text-black w-full max-w-2xl p-12 shadow-2xl rounded"
            >
              <h1 class="text-2xl font-bold mb-2">Alex Johnson</h1>
              <p class="text-sm text-gray-600 mb-6">Senior Frontend Engineer</p>
              <h2 class="uppercase text-xs font-bold border-b mb-3">Summary</h2>
              <p class="text-sm leading-relaxed text-gray-700">
                Results-driven Frontend Engineer with expertise in React &
                TypeScript.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between px-7 h-14 border-b border-blue-400/10 ">
        

        <div class="flex gap-3">
          <button class="px-4 py-2 text-sm border border-blue-400/20 rounded-lg text-slate-400 hover:text-white hover:border-blue-500 transition">
            Download PDF
          </button>

          <button class="px-4 py-2 text-sm border border-blue-400/20 rounded-lg text-slate-400 hover:text-white hover:border-blue-500 transition">
            Download DOCX
          </button>

          <button
            onclick="goToOptimize()"
            class="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg shadow-blue-500/20"
          >
            ✦ Optimize Resume →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizeResume;
