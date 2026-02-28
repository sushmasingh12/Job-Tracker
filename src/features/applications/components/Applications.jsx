import React from 'react'

const Applications = () => {
  return (
<div
      class="flex-1 overflow-auto bg-background-light dark:bg-background-dark p-6 lg:p-10">
     
      <div
        class="mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div class="relative w-full lg:w-96 group">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span
              class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input
            class="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm backdrop-blur-md transition-all shadow-sm"
            placeholder="Search by role, company..." type="text" />
        </div>
        <div
          class="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-white shadow-md shadow-blue-500/20 whitespace-nowrap">
            All
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/80 transition-colors border border-transparent dark:border-slate-700 whitespace-nowrap">
            Applied
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/80 transition-colors border border-transparent dark:border-slate-700 whitespace-nowrap">
            Interview
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/80 transition-colors border border-transparent dark:border-slate-700 whitespace-nowrap">
            Offer
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/80 transition-colors border border-transparent dark:border-slate-700 whitespace-nowrap">
            Rejected
          </button>
        </div>
      </div>
      <div class="space-y-4">
        <div
          class="group relative flex flex-col md:flex-row md:items-center p-4 rounded-2xl bg-white/60 dark:bg-[#1e293b]/40 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-[#1e293b]/60 transition-all shadow-sm hover:shadow-md overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/80"></div>
          <div class="flex items-center gap-4 flex-1 mb-4 md:mb-0">
            <div
              class="h-12 w-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 text-lg font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 shrink-0">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-500">G</span>
            </div>
            <div class="min-w-0">
              <h3
                class="text-base font-semibold text-slate-900 dark:text-white truncate">Senior
                Software Engineer</h3>
              <div
                class="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-0.5 gap-2">
                <span
                  class="font-medium text-slate-700 dark:text-slate-300">Google</span>
                <span class="w-1 h-1 rounded-full bg-slate-400"></span>
                <span class="flex items-center gap-1">
                  <span
                    class="material-symbols-outlined text-[14px]">location_on</span>
                  Mountain View, CA
                </span>
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                  Remote
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-6 md:gap-8 lg:gap-12 text-sm">
            <div class="hidden lg:block text-slate-500 dark:text-slate-400">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Applied</p>
              <span>Oct 24, 2023</span>
            </div>
            <div class="hidden sm:block">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Salary</p>
              <span class="font-medium text-green-600 dark:text-green-400">$180k
                - $240k</span>
            </div>
            <div class="w-28 flex justify-end md:justify-center">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                <span
                  class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Interview
              </span>
            </div>
            <div
              class="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                title="View Details">
                <span
                  class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                title="Edit">
                <span class="material-symbols-outlined text-[20px]">edit</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Delete">
                <span
                  class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>
        </div>
        <div
          class="group relative flex flex-col md:flex-row md:items-center p-4 rounded-2xl bg-white/60 dark:bg-[#1e293b]/40 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-[#1e293b]/60 transition-all shadow-sm hover:shadow-md overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/80"></div>
          <div class="flex items-center gap-4 flex-1 mb-4 md:mb-0">
            <div
              class="h-12 w-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 text-lg font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 shrink-0">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-teal-500">S</span>
            </div>
            <div class="min-w-0">
              <h3
                class="text-base font-semibold text-slate-900 dark:text-white truncate">Frontend
                Developer</h3>
              <div
                class="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-0.5 gap-2">
                <span
                  class="font-medium text-slate-700 dark:text-slate-300">Spotify</span>
                <span class="w-1 h-1 rounded-full bg-slate-400"></span>
                <span class="flex items-center gap-1">
                  <span
                    class="material-symbols-outlined text-[14px]">location_on</span>
                  New York, NY
                </span>
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                  Hybrid
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-6 md:gap-8 lg:gap-12 text-sm">
            <div class="hidden lg:block text-slate-500 dark:text-slate-400">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Applied</p>
              <span>Oct 22, 2023</span>
            </div>
            <div class="hidden sm:block">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Salary</p>
              <span class="font-medium text-green-600 dark:text-green-400">$140k
                - $160k</span>
            </div>
            <div class="w-28 flex justify-end md:justify-center">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                Applied
              </span>
            </div>
            <div
              class="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <span
                  class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <span class="material-symbols-outlined text-[20px]">edit</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <span
                  class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>
        </div>
        <div
          class="group relative flex flex-col md:flex-row md:items-center p-4 rounded-2xl bg-white/60 dark:bg-[#1e293b]/40 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-[#1e293b]/60 transition-all shadow-sm hover:shadow-md overflow-hidden">
          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/80"></div>
          <div class="flex items-center gap-4 flex-1 mb-4 md:mb-0">
            <div
              class="h-12 w-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 text-lg font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 shrink-0">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-red-500">N</span>
            </div>
            <div class="min-w-0">
              <h3
                class="text-base font-semibold text-slate-900 dark:text-white truncate">Full
                Stack Engineer</h3>
              <div
                class="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-0.5 gap-2">
                <span
                  class="font-medium text-slate-700 dark:text-slate-300">Netflix</span>
                <span class="w-1 h-1 rounded-full bg-slate-400"></span>
                <span class="flex items-center gap-1">
                  <span
                    class="material-symbols-outlined text-[14px]">location_on</span>
                  Los Gatos, CA
                </span>
                <span
                  class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                  Remote
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-6 md:gap-8 lg:gap-12 text-sm">
            <div class="hidden lg:block text-slate-500 dark:text-slate-400">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Applied</p>
              <span>Oct 15, 2023</span>
            </div>
            <div class="hidden sm:block">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Salary</p>
              <span class="font-medium text-green-600 dark:text-green-400">$210k
                - $280k</span>
            </div>
            <div class="w-28 flex justify-end md:justify-center">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                <span class="material-symbols-outlined text-[14px]">check</span>
                Offer
              </span>
            </div>
            <div
              class="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <span
                  class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <span class="material-symbols-outlined text-[20px]">edit</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <span
                  class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>
        </div>
        <div
          class="group relative flex flex-col md:flex-row md:items-center p-4 rounded-2xl bg-white/60 dark:bg-[#1e293b]/40 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-[#1e293b]/60 transition-all shadow-sm hover:shadow-md overflow-hidden opacity-75 hover:opacity-100">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60"></div>
          <div class="flex items-center gap-4 flex-1 mb-4 md:mb-0">
            <div
              class="h-12 w-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 text-lg font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 shrink-0">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-br from-slate-500 to-slate-700">A</span>
            </div>
            <div class="min-w-0">
              <h3
                class="text-base font-semibold text-slate-900 dark:text-white truncate">Product
                Designer</h3>
              <div
                class="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-0.5 gap-2">
                <span
                  class="font-medium text-slate-700 dark:text-slate-300">Airbnb</span>
                <span class="w-1 h-1 rounded-full bg-slate-400"></span>
                <span class="flex items-center gap-1">
                  <span
                    class="material-symbols-outlined text-[14px]">location_on</span>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-6 md:gap-8 lg:gap-12 text-sm">
            <div class="hidden lg:block text-slate-500 dark:text-slate-400">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Applied</p>
              <span>Sep 28, 2023</span>
            </div>
            <div class="hidden sm:block">
              <p
                class="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">Salary</p>
              <span class="font-medium text-green-600 dark:text-green-400">$160k
                - $190k</span>
            </div>
            <div class="w-28 flex justify-end md:justify-center">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                Rejected
              </span>
            </div>
            <div
              class="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <span
                  class="material-symbols-outlined text-[20px]">visibility</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <span class="material-symbols-outlined text-[20px]">edit</span>
              </button>
              <button
                class="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <span
                  class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
        <span class="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 4
          of 47 entries</span>
        <div class="flex items-center gap-2">
          <button
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50">
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button
            class="px-3 py-1 rounded-lg bg-primary text-white text-sm font-medium">1</button>
          <button
            class="px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors">2</button>
          <button
            class="px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors">3</button>
          <span class="text-slate-400">...</span>
          <button
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Applications