import React from "react";

const ReviewCover = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="h-14 bg-neutral-surface border-b border-neutral-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-success text-dark flex items-center justify-center font-bold text-sm">
              4
            </div>
            <span className="font-semibold text-neutral-text">
              Review &amp; Edit
            </span>
          </div>
          <div className="h-4 w-px bg-neutral-border"></div>
          <span className="text-sm text-neutral-muted flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-success">
              check_circle
            </span>
            All steps completed
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-muted flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              cloud_done
            </span>
            Auto-saved
          </span>
          <div className="h-4 w-px bg-neutral-border"></div>
          <span className="text-xs text-neutral-muted font-mono">
            248 words
          </span>
        </div>
      </div>
      <div className="h-12 bg-neutral-surface border-b border-neutral-border flex items-center px-4 gap-1 overflow-x-auto">
        <div className="flex items-center border-r border-neutral-border pr-4 gap-1">
          <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
            <span className="material-symbols-outlined text-[20px]">undo</span>
          </button>
          <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
            <span className="material-symbols-outlined text-[20px]">redo</span>
          </button>
        </div>
        <select className="text-sm border-none bg-transparent font-medium text-neutral-text focus:ring-0 cursor-pointer hover:bg-background-light rounded px-2 py-1">
          <option>Normal Text</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </select>
        <div className="h-4 w-px bg-neutral-border mx-2"></div>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-text font-bold bg-neutral-100 transition">
          <span className="material-symbols-outlined text-[20px]">
            format_bold
          </span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">
            format_italic
          </span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">
            format_underlined
          </span>
        </button>
        <div className="h-4 w-px bg-neutral-border mx-2"></div>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">
            format_align_left
          </span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">
            format_align_center
          </span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">
            format_align_right
          </span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">
            format_list_bulleted
          </span>
        </button>
      </div>
      <div className="mx-auto p-8 pb-32">
        <div className="flex gap-6">
          {/* Right Side - Cover Letter Editor */}
          <div className="flex-1 flex flex-col bg-background-light">
            <div className="flex-1 overflow-y-auto  flex justify-center bg-background-light">
              <div className="w-full bg-white shadow-lg min-h-150 p-24 text-neutral-text text-[11pt] font-serif leading-relaxed outline-none focus:ring-2 focus:ring-primary/20">
                <div className="editor-content" contentEditable="true">
                  <p className="mb-8">
                    <strong>John Doe</strong>
                    <br />
                    123 Creative Lane, San Francisco, CA 94105
                    <br />
                    (555) 123-4567 | john.doe@email.com
                  </p>
                  <p className="mb-8">October 24, 2023</p>
                  <p className="mb-4">
                    Hiring Manager
                    <br />
                    Google
                    <br />
                    1600 Amphitheatre Parkway
                    <br />
                    Mountain View, CA 94043
                  </p>
                  <p className="mb-6">
                    <strong>
                      Re: Application for Senior Product Designer Position
                    </strong>
                  </p>
                  <p>Dear Hiring Manager,</p>
                  <p>
                    I am writing to express my enthusiastic interest in the
                    Senior Product Designer position at Google, as advertised on
                    your careers page. With over 8 years of experience crafting
                    user-centric digital products and a proven track record of
                    increasing user engagement by 40% in my previous role at
                    TechFlow, I am confident in my ability to contribute
                    meaningfully to Google's design ecosystem.
                  </p>
                  <p>
                    In my current role as Lead UX Designer at Creative
                    Solutions, I spearheaded the redesign of our core mobile
                    application, which serves over 2 million daily active users.
                    By implementing a new design system and conducting extensive
                    user research, I reduced churn by 15% and improved the app
                    store rating from 3.8 to 4.7 stars. This experience aligns
                    perfectly with Google's mission to organize the world's
                    information and make it universally accessible and useful.
                  </p>
                  <p>
                    My expertise in data-driven design and cross-functional
                    collaboration has allowed me to bridge the gap between
                    engineering and product teams effectively. I am particularly
                    drawn to Google's commitment to inclusive design, and I am
                    eager to bring my skills in accessibility-first prototyping
                    to your team.
                  </p>
                  <p>
                    I would welcome the opportunity to discuss how my background
                    in product strategy and visual design can help drive
                    innovation at Google. Thank you for considering my
                    application. I look forward to the possibility of
                    contributing to your team.
                  </p>
                  <p className="mt-8">Sincerely,</p>
                  <p className="mt-4">John Doe</p>
                </div>
              </div>
            </div>
          </div>
          {/* Left Sidebar - Finalize Letter */}
          <div className="w-80 bg-neutral-surface border-r border-neutral-border flex flex-col h-[calc(100vh-140px)] sticky top-0 shadow-lg">
            <div className="p-6 border-b border-neutral-border">
              <h2 className="text-lg font-bold text-neutral-text mb-1">
                Finalize Letter
              </h2>
              <p className="text-xs text-neutral-muted">
                Review your generated cover letter and choose your next action.
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex gap-2 items-start mb-2">
                  <span className="material-symbols-outlined text-blue-600 text-xl">
                    auto_awesome
                  </span>
                  <h3 className="text-sm font-semibold text-blue-800">
                    AI Insight
                  </h3>
                </div>
                <p className="text-xs text-neutral-muted mb-3">
                  This draft has a strong opening and effectively quantifies
                  your achievements. Consider emphasizing your leadership skills
                  more in the third paragraph.
                </p>
                <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                  Apply Suggestion{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-text">
                  Actions
                </label>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:shadow-sm transition group text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background-light group-hover:bg-blue-100 flex items-center justify-center text-neutral-muted group-hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-[20px]">
                        refresh
                      </span>
                    </div>
                    <span className="text-sm font-medium text-neutral-text">
                      Regenerate
                    </span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:shadow-sm transition group text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-background-light group-hover:bg-blue-100 flex items-center justify-center text-neutral-muted group-hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-[20px]">
                        content_copy
                      </span>
                    </div>
                    <span className="text-sm font-medium text-neutral-text">
                      Copy to Clipboard
                    </span>
                  </div>
                </button>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-text">
                  Download
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:bg-blue-50 transition text-center">
                    <span className="material-symbols-outlined text-red-500 mb-1">
                      picture_as_pdf
                    </span>
                    <span className="text-xs font-medium text-neutral-text">
                      PDF
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:bg-blue-50 transition text-center">
                    <span className="material-symbols-outlined text-blue-600 mb-1">
                      description
                    </span>
                    <span className="text-xs font-medium text-neutral-text">
                      DOCX
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-border bg-gray-50">
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md transition flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>
                Save to Application
              </button>
              <div className="mt-3 text-center">
                <a
                  className="text-xs text-neutral-muted hover:text-primary underline"
                  href="#"
                >
                  Back to customization
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCover;
