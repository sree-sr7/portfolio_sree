import React from 'react';
import BlueprintPhoto from './BlueprintPhoto';

// --- ICONS FOR FOOTER ---
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// Reusable Project Card
const MonoCard = ({ number, title, category, stack, desc }) => (
  <div className="group relative border-b border-r border-silver bg-noir hover:bg-paper transition-colors duration-300 h-full min-h-[300px] flex flex-col justify-between p-8 cursor-pointer">
    <div className="flex justify-between items-start w-full">
      <span className="font-mono text-xs text-gray-500 group-hover:text-black transition-colors">{number}</span>
      <span className="font-mono text-xs border border-silver px-2 py-1 rounded-full text-gray-400 group-hover:border-black group-hover:text-black transition-colors uppercase">{category}</span>
    </div>
    <div className="mt-8">
      <h3 className="text-4xl font-bold text-paper mb-4 group-hover:text-noir transition-colors leading-tight">{title}</h3>
      <p className="text-gray-500 group-hover:text-gray-800 text-sm leading-relaxed max-w-sm transition-colors">{desc}</p>
    </div>
    <div className="mt-8 pt-6 border-t border-silver/30 group-hover:border-black/10">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {stack.map(tech => (
          <span key={tech} className="text-xs font-mono text-gray-400 group-hover:text-black font-bold">[{tech}]</span>
        ))}
      </div>
    </div>
  </div>
);

export default function DesignMono() {
  return (
    <div className="min-h-screen bg-noir text-paper font-sans selection:bg-paper selection:text-noir overflow-x-hidden">
      
      <div className="fixed inset-0 bg-[size:50px_50px] bg-grid-pattern opacity-[0.15] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-silver bg-noir/80 backdrop-blur-sm">
        <div className="flex justify-between items-center px-6 h-16 max-w-[1600px] mx-auto">
          <div className="font-black text-xl tracking-tighter">SREE<span className="text-gray-500">.DEV</span></div>
          <div className="flex gap-6 text-xs font-mono font-bold tracking-widest uppercase">
            <a href="#work" className="hover:underline decoration-2 underline-offset-4">Index</a>
            <a href="#about" className="hover:underline decoration-2 underline-offset-4">Profile</a>
            <a href="#contact" className="hover:bg-paper hover:text-noir px-3 py-1 transition-colors border border-silver">Contact</a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <header className="pt-32 pb-24 border-b border-silver relative z-10">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 px-6">
          
          <div className="relative z-20 flex-1">
            <p className="font-mono text-xs text-gray-500 mb-4 animate-pulse">
              SYSTEM_STATUS: ONLINE // ROLE: SECURITY_ARCHITECT
            </p>
            
            <h1 className="text-[14vw] lg:text-[11vw] leading-[0.8] font-black tracking-tighter mix-blend-difference mb-8 break-words">
              SECURITY<br/>
              SOFTWARE<br/>
              ENGINEER
            </h1>

            <div className="flex flex-col gap-8 max-w-2xl">
               <p className="text-xl text-gray-400 leading-snug">
                 Leveraging <span className="text-paper font-bold">Full Stack</span> architecture knowledge to audit, protect, and recover digital assets. 
                 Pivoting from development to <span className="text-paper font-bold">Vulnerability Assessment</span> and <span className="text-paper font-bold">Network Defense</span>. 
                 Actively advancing into <span className="text-paper font-bold">Python Automation</span> for offensive security.
               </p>
            </div>
          </div>

          <div className="h-[500px] w-full lg:w-[500px] relative flex-shrink-0 border-l border-silver bg-noir/50 backdrop-blur-sm mt-12 lg:mt-0">
             <BlueprintPhoto />
          </div>

        </div>
      </header>

      {/* MARQUEE */}
      <div className="border-b border-silver overflow-hidden py-3 bg-paper text-noir flex relative">
        <div className="animate-marquee whitespace-nowrap font-mono font-bold text-lg tracking-widest flex-shrink-0 min-w-full px-4">
           FLUTTER DEVELOPMENT /// LARAVEL BACKEND /// CYBER SECURITY /// SQLITE /// FIREBASE /// PYTHON AUTOMATION /// 
        </div>
        <div className="animate-marquee whitespace-nowrap font-mono font-bold text-lg tracking-widest flex-shrink-0 min-w-full px-4">
           FLUTTER DEVELOPMENT /// LARAVEL BACKEND /// CYBER SECURITY /// SQLITE /// FIREBASE /// PYTHON AUTOMATION /// 
        </div>
      </div>

      {/* PROJECTS & EXPERIENCE GRID */}
      <main className="border-b border-silver" id="work">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-silver gap-[1px]">
          
          {/* PROJECT 1 */}
          <MonoCard 
            number="001" 
            title="Elderly Companion" 
            category="Flutter App" 
            desc="Offline-first medication & appointment manager. Features SOS location sharing and Razorpay integration." 
            stack={['Flutter', 'SQLite', 'Firebase', 'Razorpay']} 
          />
          
          {/* PROJECT 2 */}
          <MonoCard 
            number="002" 
            title="FitGen Platform" 
            category="Full Stack Web" 
            desc="Dynamic workout generator and progress tracker. Generates routines based on user physique requirements." 
            stack={['PHP', 'Bootstrap', 'JS', 'MySQL']} 
          />
          
          {/* PROJECT 3 */}
          <MonoCard 
            number="003" 
            title="Campus Halls" 
            category="Web System" 
            desc="College venue reservation system. Managed conflicting schedules and approval workflows as Project Lead." 
            stack={['Laravel', 'Tailwind', 'SQL']} 
          />

           {/* EXPERIENCE LOG - UPDATED TIMELINE */}
           <div className="md:col-span-2 lg:col-span-1 bg-noir p-8 border-b border-r border-silver flex flex-col justify-between group hover:bg-paper transition-colors duration-300 min-h-[300px]" id="about">
             <h3 className="font-mono text-xs text-gray-500 mb-6 uppercase tracking-widest group-hover:text-black transition-colors">Career Log</h3>
             
             <div className="space-y-8">
                {/* 1. LATEST: MCA */}
                <div>
                  <div className="text-lg font-bold text-paper group-hover:text-noir transition-colors">Master of Computer Applications</div>
                  <div className="text-xs font-mono text-gray-500 group-hover:text-gray-600 transition-colors">Rajagiri College • 2025-2027</div>
                </div>

                {/* 2. UG: BCA */}
                <div>
                   <div className="text-lg font-bold text-paper group-hover:text-noir transition-colors">Bachelor of Computer Applications</div>
                   <div className="text-xs font-mono text-gray-500 group-hover:text-gray-600 transition-colors">SCMS School of Technology • 2022-2025</div>
                </div>

                {/* 3. WORK: SEALORD (Pre-UG) */}
                <div>
                  <div className="text-lg font-bold text-paper group-hover:text-noir transition-colors">Asst. Reservations Manager</div>
                  <div className="text-xs font-mono text-gray-500 group-hover:text-gray-600 transition-colors">Sealord Hotel Group • 2022</div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed group-hover:text-gray-800 transition-colors">
                    Managed centralized bookings for 4 branches (Kochi, Thekkady, Munnar, Sulthan Bathery).
                  </p>
                </div>

                {/* 4. SCHOOLING */}
                <div>
                   <div className="text-lg font-bold text-paper group-hover:text-noir transition-colors">Higher Secondary</div>
                   <div className="text-xs font-mono text-gray-500 group-hover:text-gray-600 transition-colors">Indian School Al-Seeb, Oman</div>
                </div>
             </div>
           </div>

        </div>
      </main>
      
      {/* FOOTER */}
      <footer className="py-20 px-6 border-b border-silver" id="contact">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          
          <div>
             <h2 className="text-[10vw] font-black leading-none tracking-tighter hover:text-gray-700 transition-colors cursor-pointer">
               LET'S TALK
             </h2>
          </div>

          <div className="flex flex-col gap-6 text-right">
             <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">Contact Signal</div>
             
             <div className="flex flex-col gap-1">
               <a href="mailto:sreerajsr49@gmail.com" className="text-xl font-bold text-paper hover:text-white transition-colors">sreerajsr49@gmail.com</a>
               <a href="tel:+917593825257" className="text-xl font-bold text-paper hover:text-white transition-colors">+91 7593825257</a>
             </div>

             <div className="flex justify-end gap-4 mt-4">
                <a href="#" className="p-2 border border-silver text-gray-400 hover:text-black hover:bg-paper transition-colors rounded-full" aria-label="LinkedIn">
                   <LinkedInIcon />
                </a>
                <a href="#" className="p-2 border border-silver text-gray-400 hover:text-black hover:bg-paper transition-colors rounded-full" aria-label="GitHub">
                   <GitHubIcon />
                </a>
             </div>
          </div>

        </div>
      </footer>
    </div>
  );
}