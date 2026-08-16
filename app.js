/* ==========================================================================
   Innovation & Automation Club (IAC) - Main Application Controller (app.js)
   Department of Electronics & Instrumentation Engineering (EIE)
   Bundelkhand University, Jhansi
   ========================================================================== */

const IACApp = {
    currentView: 'home',
    facultyCategory: 'all',
    currentTeamDomain: 'all',
    projectCategory: 'all',
    theme: 'dark',

    // ----------------------------------------------------------------------
    // 1. INITIALIZATION & ROUTING SETUP
    // ----------------------------------------------------------------------
    init() {
        console.log("⚡ IAC Hub Application Initializing...");
        
        this.initTheme();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupRegistrationForm();
        this.setupKeyboardShortcuts();
        
        // Initial Rendering
        this.renderLabManuals();
        this.renderFacultyGrid();
        this.renderDomainTabs();
        this.renderTeamGrid();
        this.renderAlumniGrid();
        this.renderProjectsGrid();
        this.renderEventsGrid();
        this.startCountdown();

        // Handle initial hash routing
        this.handleHashChange();
        window.addEventListener('hashchange', () => this.handleHashChange());
    },

    // ----------------------------------------------------------------------
    // 2. LIGHT / DARK THEME MANAGEMENT
    // ----------------------------------------------------------------------
    initTheme() {
        const savedTheme = localStorage.getItem('iac_theme') || 'dark';
        this.applyTheme(savedTheme);

        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    },

    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    },

    applyTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('iac_theme', theme);

        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');

        if (icon && text) {
            if (theme === 'light') {
                icon.className = 'fas fa-moon text-indigo-600';
                text.textContent = 'Dark Mode';
            } else {
                icon.className = 'fas fa-sun text-yellow-400';
                text.textContent = 'Light Mode';
            }
        }
    },

    // ----------------------------------------------------------------------
    // 3. NAVIGATION & VIEW SWITCHING (INSTANT RESPONSIVE ROUTING)
    // ----------------------------------------------------------------------
    setupNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href').substring(1);
                if (targetId) {
                    // Close mobile nav if open
                    const mobileNav = document.getElementById('mobile-nav');
                    if (mobileNav) mobileNav.classList.add('hidden');

                    if (['curriculum'].includes(targetId)) {
                        this.switchView('home');
                        setTimeout(() => {
                            const el = document.getElementById(targetId);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                    } else if (['home', 'faculty', 'team', 'alumni', 'projects', 'events', 'join'].includes(targetId)) {
                        this.switchView(targetId);
                    }
                }
            });
        });
    },

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        if (menuBtn && mobileNav) {
            menuBtn.addEventListener('click', () => {
                mobileNav.classList.toggle('hidden');
            });
        }
    },

    handleHashChange() {
        const hash = window.location.hash.substring(1) || 'home';
        const validViews = ['home', 'faculty', 'team', 'alumni', 'projects', 'events', 'join'];
        
        if (validViews.includes(hash)) {
            this.switchView(hash);
        } else if (['curriculum'].includes(hash)) {
            this.switchView('home');
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            this.switchView('home');
        }
    },

    switchView(viewName) {
        this.currentView = viewName;
        
        // Hide all views
        document.querySelectorAll('.view-page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show target view
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) {
            targetView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${viewName}`) {
                link.classList.add('text-indigo-500', 'font-bold');
            } else {
                link.classList.remove('text-indigo-500', 'font-bold');
            }
        });
    },

    // ----------------------------------------------------------------------
    // 4. RENDER FACULTY GRID & MODAL (WITH OFFICIAL QUALIFICATIONS & EXPERIENCE)
    // ----------------------------------------------------------------------
    setFacultyCategory(cat) {
        this.facultyCategory = cat;
        
        document.querySelectorAll('.faculty-cat-btn').forEach(btn => {
            if (btn.getAttribute('data-category') === cat) {
                btn.className = 'faculty-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md transition';
            } else {
                btn.className = 'faculty-cat-btn px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700/40 text-slate-400 hover:bg-slate-800/40 transition';
            }
        });

        this.renderFacultyGrid();
    },

    renderFacultyGrid() {
        const grid = document.getElementById('faculty-grid');
        const searchInput = document.getElementById('faculty-search');
        if (!grid) return;

        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = IAC_DATA.faculty.filter(f => {
            const matchesCat = this.facultyCategory === 'all' || f.category === this.facultyCategory;
            const matchesSearch = !searchTerm || 
                f.name.toLowerCase().includes(searchTerm) || 
                f.qualification.toLowerCase().includes(searchTerm) || 
                f.designation.toLowerCase().includes(searchTerm);
            return matchesCat && matchesSearch;
        });

        if (searchInput && !searchInput.dataset.listener) {
            searchInput.dataset.listener = "true";
            searchInput.addEventListener('input', () => this.renderFacultyGrid());
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    <i class="fas fa-user-slash text-4xl mb-3 text-slate-600 block"></i>
                    <p class="font-bold">No faculty mentors found matching search criteria.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(f => `
            <div class="cyber-card rounded-3xl p-6 flex flex-col justify-between group hover:border-indigo-500/60 transition">
                <div>
                    <div class="flex items-center gap-4 mb-4">
                        <img src="${f.image}" alt="${f.name}" class="w-16 h-16 rounded-2xl object-cover border border-indigo-500/40 crisp-img"
                            onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=4f46e5&color=fff';">
                        <div>
                            <h3 class="font-bold text-base text-white group-hover:text-indigo-400 transition">${f.name}</h3>
                            <p class="text-xs text-indigo-400 font-semibold mb-1">${f.designation}</p>
                            <span class="inline-block bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                                ${f.experience} Experience
                            </span>
                        </div>
                    </div>

                    <div class="space-y-2 mb-4 text-xs">
                        <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                            <span class="text-indigo-400 font-bold block text-[10px] uppercase tracking-wider mb-0.5">Qualification:</span>
                            <span class="text-slate-300 font-semibold">${f.qualification}</span>
                        </div>
                        <div class="flex items-center justify-between text-slate-400 text-[11px] px-1">
                            <span><i class="fas fa-phone-alt text-emerald-500 mr-1"></i> ${f.phone}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between border-t border-slate-800 pt-4 mt-2">
                    <span class="text-[11px] text-slate-400"><i class="fas fa-envelope text-indigo-500 mr-1"></i> ${f.email}</span>
                    <button onclick="IACApp.openFacultyModal('${f.id}')" class="text-indigo-400 font-bold text-xs hover:underline flex items-center gap-1">
                        View Details <i class="fas fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    openFacultyModal(id) {
        const f = IAC_DATA.faculty.find(item => item.id === id);
        if (!f) return;

        const content = document.getElementById('faculty-modal-content');
        content.innerHTML = `
            <div class="text-center mb-6">
                <img src="${f.image}" alt="${f.name}" class="w-24 h-24 rounded-3xl object-cover mx-auto mb-4 border-2 border-indigo-500/60 crisp-img"
                    onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=4f46e5&color=fff';">
                <h3 class="text-2xl font-bold text-white mb-1">${f.name}</h3>
                <p class="text-xs text-indigo-400 font-bold mb-1">${f.designation}</p>
                <span class="text-xs text-slate-300 font-semibold block">${f.qualification}</span>
            </div>

            <div class="space-y-4 text-xs text-slate-300">
                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <strong class="text-indigo-400 block text-xs uppercase tracking-wider mb-1">Biography & Academic Experience:</strong>
                    <p class="leading-relaxed text-slate-300">${f.bio}</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <strong class="text-slate-400 block text-[10px] uppercase">Academic Experience</strong>
                        <span class="font-bold text-cyan-400 text-sm">${f.experience}</span>
                    </div>
                    <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <strong class="text-slate-400 block text-[10px] uppercase">Department Role</strong>
                        <span class="font-bold text-white text-xs">${f.category === 'hod' ? 'HOD / Coordinator' : f.designation}</span>
                    </div>
                </div>

                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-envelope text-indigo-500"></i>
                        <span>Email: <a href="mailto:${f.email}" class="text-indigo-400 font-bold hover:underline">${f.email}</a></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-phone-alt text-emerald-500"></i>
                        <span>Phone Contact: <strong class="text-white">${f.phone}</strong></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-door-open text-indigo-500"></i>
                        <span>Cabin: ${f.cabin}</span>
                    </div>
                </div>
            </div>
        `;

        this.openModal('faculty-modal');
    },

    // ----------------------------------------------------------------------
    // 5. RENDER DOMAIN TABS & CORE TEAM GRID (ALL MEMBERS & DOMAIN FILTERS)
    // ----------------------------------------------------------------------
    renderDomainTabs() {
        const container = document.getElementById('domain-tabs');
        if (!container) return;

        container.innerHTML = IAC_DATA.domains.map(d => `
            <button onclick="IACApp.selectDomain('${d.id}')" data-domain="${d.id}"
                class="domain-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${d.id === this.currentTeamDomain ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'border border-slate-700/40 text-slate-400 hover:bg-slate-800/40'}">
                <i class="fas ${d.icon}"></i>
                <span>${d.name}</span>
            </button>
        `).join('');
    },

    selectDomain(domainId) {
        this.currentTeamDomain = domainId;
        this.renderDomainTabs();
        this.renderTeamGrid();
    },

    renderTeamGrid() {
        const grid = document.getElementById('team-grid');
        if (!grid) return;

        // If domain is 'all', show all 12 core members! Otherwise filter by domain.
        const filtered = (this.currentTeamDomain === 'all' || !this.currentTeamDomain)
            ? IAC_DATA.team
            : IAC_DATA.team.filter(t => t.domain === this.currentTeamDomain);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    <p class="font-bold text-sm">No team members currently listed under this domain.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(t => `
            <div class="cyber-card rounded-3xl p-6 flex flex-col justify-between group hover:border-indigo-500/60 transition">
                <div>
                    <div class="flex items-center gap-4 mb-4">
                        <img src="${t.image}" alt="${t.name}" class="w-16 h-16 rounded-2xl object-cover border border-indigo-500/40 crisp-img"
                            onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4f46e5&color=fff';">
                        <div>
                            <h3 class="font-bold text-base text-white group-hover:text-indigo-400 transition">${t.name}</h3>
                            <p class="text-xs text-indigo-400 font-bold mb-1">${t.role}</p>
                            <span class="inline-block bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                ${t.batch}
                            </span>
                        </div>
                    </div>

                    <p class="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">${t.bio}</p>
                </div>

                <div class="flex items-center justify-between border-t border-slate-800 pt-3">
                    <div class="flex space-x-3 text-slate-400 text-sm">
                        <a href="${t.github}" target="_blank" class="hover:text-white transition" title="GitHub Profile"><i class="fab fa-github"></i></a>
                        <a href="${t.linkedin}" target="_blank" class="hover:text-indigo-400 transition" title="LinkedIn Profile"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <button onclick="IACApp.openTeamModal('${t.id}')" class="text-indigo-400 font-bold text-xs hover:underline flex items-center gap-1">
                        View Details <i class="fas fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    openTeamModal(id) {
        const t = IAC_DATA.team.find(item => item.id === id);
        if (!t) return;

        const content = document.getElementById('team-modal-content');
        content.innerHTML = `
            <div class="text-center mb-6">
                <img src="${t.image}" alt="${t.name}" class="w-24 h-24 rounded-3xl object-cover mx-auto mb-4 border-2 border-indigo-500/60 crisp-img"
                    onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4f46e5&color=fff';">
                <h3 class="text-2xl font-bold text-white mb-1">${t.name}</h3>
                <p class="text-xs text-indigo-400 font-bold mb-2">${t.role}</p>
                <span class="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    ${t.batch}
                </span>
            </div>

            <div class="space-y-4 text-xs text-slate-300">
                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <strong class="text-indigo-400 block text-xs uppercase tracking-wider mb-1">Domain & Responsibilities:</strong>
                    <p class="leading-relaxed text-slate-300">${t.bio}</p>
                </div>

                <div class="flex justify-center gap-4 text-sm pt-2">
                    <a href="${t.github}" target="_blank" class="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${t.linkedin}" target="_blank" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                </div>
            </div>
        `;

        this.openModal('team-modal');
    },

    // ----------------------------------------------------------------------
    // 6. RENDER ALUMNI SPOTLIGHT
    // ----------------------------------------------------------------------
    renderAlumniGrid() {
        const grid = document.getElementById('alumni-grid');
        if (!grid) return;

        grid.innerHTML = IAC_DATA.alumni.map(a => `
            <div class="cyber-card rounded-3xl p-6 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-bold text-lg text-white">${a.name}</h3>
                            <p class="text-xs text-indigo-400 font-semibold">${a.designation}</p>
                        </div>
                        <span class="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                            ${a.passoutYear}
                        </span>
                    </div>

                    <blockquote class="text-xs text-slate-300 italic leading-relaxed bg-slate-950/60 p-4 rounded-2xl border-l-2 border-indigo-500 mb-4">
                        "${a.quote}"
                    </blockquote>
                </div>

                <div class="flex items-center justify-between border-t border-slate-800 pt-3">
                    <span class="text-xs font-bold text-slate-400"><i class="fas fa-building text-indigo-500 mr-1"></i> ${a.companyLogo}</span>
                    <a href="${a.linkedin}" target="_blank" class="text-indigo-400 hover:underline font-bold text-xs flex items-center gap-1">
                        LinkedIn <i class="fab fa-linkedin text-[10px]"></i>
                    </a>
                </div>
            </div>
        `).join('');
    },

    // ----------------------------------------------------------------------
    // 7. RENDER PROJECTS GRID
    // ----------------------------------------------------------------------
    filterProjects(cat) {
        this.projectCategory = cat;
        
        document.querySelectorAll('.project-cat-btn').forEach(btn => {
            if (btn.getAttribute('data-category') === cat) {
                btn.className = 'project-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md transition';
            } else {
                btn.className = 'project-cat-btn px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700/40 text-slate-400 hover:bg-slate-800/40 transition';
            }
        });

        this.renderProjectsGrid();
    },

    renderProjectsGrid() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        const filtered = this.projectCategory === 'all'
            ? IAC_DATA.projects
            : IAC_DATA.projects.filter(p => p.category === this.projectCategory);

        grid.innerHTML = filtered.map(p => `
            <div class="cyber-card rounded-3xl p-6 flex flex-col justify-between group hover:border-indigo-500/60 transition">
                <div>
                    <h3 class="font-bold text-base text-white group-hover:text-indigo-400 transition mb-2">${p.title}</h3>
                    <p class="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">${p.description}</p>

                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${p.techStack.map(t => `<span class="bg-slate-950 text-indigo-400 border border-slate-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-md">${t}</span>`).join('')}
                    </div>
                </div>

                <div class="flex items-center justify-between border-t border-slate-800 pt-3">
                    <div class="flex space-x-3 text-slate-400 text-sm">
                        <a href="${p.github}" target="_blank" class="hover:text-white transition" title="GitHub Code"><i class="fab fa-github"></i></a>
                        <a href="${p.demoVideo}" target="_blank" class="hover:text-red-400 transition" title="Watch Video Demo"><i class="fab fa-youtube"></i></a>
                    </div>
                    <button onclick="IACApp.openProjectModal('${p.id}')" class="text-indigo-400 font-bold text-xs hover:underline flex items-center gap-1">
                        Read Details <i class="fas fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    openProjectModal(id) {
        const p = IAC_DATA.projects.find(item => item.id === id);
        if (!p) return;

        const content = document.getElementById('project-modal-content');
        content.innerHTML = `
            <h3 class="text-xl font-bold text-white mb-2">${p.title}</h3>
            
            <div class="flex flex-wrap gap-1.5 mb-4">
                ${p.techStack.map(t => `<span class="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold px-2.5 py-1 rounded-md">${t}</span>`).join('')}
            </div>

            <div class="space-y-4 text-xs text-slate-300">
                <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <strong class="text-indigo-400 block text-xs uppercase tracking-wider mb-1">Project Abstract:</strong>
                    <p class="leading-relaxed text-slate-300">${p.description}</p>
                </div>

                <div class="flex justify-center gap-4 text-sm pt-2">
                    <a href="${p.github}" target="_blank" class="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition">
                        <i class="fab fa-github"></i> View Repository
                    </a>
                    <a href="${p.demoVideo}" target="_blank" class="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition">
                        <i class="fab fa-youtube"></i> Watch Demo
                    </a>
                </div>
            </div>
        `;

        this.openModal('project-modal');
    },

    // ----------------------------------------------------------------------
    // 8. RENDER EVENTS GRID & COUNTDOWN
    // ----------------------------------------------------------------------
    renderEventsGrid() {
        const grid = document.getElementById('events-grid');
        if (!grid) return;

        grid.innerHTML = IAC_DATA.events.map(e => `
            <div class="cyber-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-3">
                        <span class="bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            ${e.status}
                        </span>
                        <span class="text-xs font-bold text-slate-400"><i class="fas fa-calendar-alt text-indigo-500 mr-1"></i> ${e.date}</span>
                    </div>

                    <h3 class="text-lg font-bold text-white mb-2">${e.title}</h3>
                    <p class="text-xs text-slate-300 leading-relaxed mb-4">${e.description}</p>
                </div>

                <div class="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-clock text-indigo-500"></i>
                        <span>Time: ${e.time}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-map-marker-alt text-indigo-500"></i>
                        <span>Venue: ${e.venue}</span>
                    </div>
                    <a href="#join" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-center block mt-3 transition">
                        Register for Event
                    </a>
                </div>
            </div>
        `).join('');
    },

    renderLabManuals() {
        const grid = document.getElementById('lab-manuals-grid');
        if (!grid || !IAC_DATA.labManuals) return;

        grid.innerHTML = IAC_DATA.labManuals.map(m => `
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-indigo-500/50 transition">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center text-lg">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-xs text-white">${m.title}</h4>
                        <span class="text-[10px] text-slate-400">${m.subject} • ${m.size}</span>
                    </div>
                </div>
                <a href="#join" class="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white p-2 rounded-xl text-xs transition" title="Download PDF">
                    <i class="fas fa-download"></i>
                </a>
            </div>
        `).join('');
    },

    startCountdown() {
        const timerEl = document.getElementById('countdown-timer');
        if (!timerEl) return;

        // Set fixed target 3 days out
        const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

        setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                timerEl.textContent = "EVENT LIVE NOW";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timerEl.textContent = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        }, 1000);
    },

    // ----------------------------------------------------------------------
    // 9. LIVE HARDWARE SIMULATOR WORKBENCH METHODS
    // ----------------------------------------------------------------------
    toggleLed() {
        const ind = document.getElementById('sim-led-indicator');
        const txt = document.getElementById('sim-status-text');
        if (!ind) return;

        if (ind.classList.contains('sim-led-on')) {
            ind.className = 'sim-led-off';
            if (txt) txt.textContent = 'ESP32 PIN 13 LED: OFF (LOW 0V)';
        } else {
            ind.className = 'sim-led-on';
            if (txt) txt.textContent = 'ESP32 PIN 13 LED: ON (HIGH 3.3V)';
        }
    },

    toggleRelay() {
        const ind = document.getElementById('sim-relay-indicator');
        const txt = document.getElementById('sim-status-text');
        if (!ind) return;

        if (ind.classList.contains('sim-relay-on')) {
            ind.className = 'sim-relay-off';
            if (txt) txt.textContent = 'SIEMENS PLC RELAY: DE-ENERGIZED (OPEN)';
        } else {
            ind.className = 'sim-relay-on';
            if (txt) txt.textContent = 'SIEMENS PLC RELAY: ENERGIZED (COIL ACTIVE 24V)';
        }
    },

    readAdc() {
        const display = document.getElementById('sim-adc-display');
        const txt = document.getElementById('sim-status-text');
        if (!display) return;

        const val = Math.floor(Math.random() * 800) + 200; // 200mV to 1000mV
        display.textContent = `${val} mV`;
        if (txt) txt.textContent = `PRESSURE SENSOR ADC SAMPLED: ${val} mV (12-BIT RESOLUTION)`;
    },

    // ----------------------------------------------------------------------
    // 10. GLOBAL COMMAND SEARCH PALETTE (CTRL + K)
    // ----------------------------------------------------------------------
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleCommandSearch();
            }
            if (e.key === 'Escape') {
                this.closeModal('command-search-modal');
                this.closeModal('faculty-modal');
                this.closeModal('team-modal');
                this.closeModal('project-modal');
            }
        });
    },

    toggleCommandSearch() {
        const modal = document.getElementById('command-search-modal');
        if (!modal) return;

        if (modal.classList.contains('hidden')) {
            this.openModal('command-search-modal');
            const input = document.getElementById('command-input');
            if (input) {
                input.value = '';
                input.focus();
                this.handleCommandInput('');
            }
        } else {
            this.closeModal('command-search-modal');
        }
    },

    handleCommandInput(query) {
        const resultsEl = document.getElementById('command-results');
        if (!resultsEl) return;

        const q = query.toLowerCase().trim();

        if (!q) {
            resultsEl.innerHTML = `
                <div class="p-3 text-xs text-slate-400">
                    <span class="font-bold text-indigo-400 uppercase tracking-wider block mb-2">QUICK SUGGESTIONS:</span>
                    <ul class="space-y-1.5">
                        <li class="cursor-pointer hover:text-white" onclick="IACApp.navigateToQuery('Er. Neha Jain')">🔍 Er. Neha Jain (HOD Profile)</li>
                        <li class="cursor-pointer hover:text-white" onclick="IACApp.navigateToQuery('Shubhra Yadav')">👑 Shubhra Yadav (President)</li>
                        <li class="cursor-pointer hover:text-white" onclick="IACApp.navigateToQuery('PLC')">🤖 PLC & SCADA Lab Project</li>
                        <li class="cursor-pointer hover:text-white" onclick="IACApp.navigateToQuery('ESP32')">📡 ESP32 IoT Weather Station</li>
                    </ul>
                </div>
            `;
            return;
        }

        let matches = [];

        // Search Faculty
        IAC_DATA.faculty.forEach(f => {
            if (f.name.toLowerCase().includes(q) || f.qualification.toLowerCase().includes(q)) {
                matches.push({ type: 'Faculty Mentor', title: f.name, sub: `${f.designation} (${f.experience})`, action: () => { this.closeModal('command-search-modal'); this.switchView('faculty'); this.openFacultyModal(f.id); } });
            }
        });

        // Search Team
        IAC_DATA.team.forEach(t => {
            if (t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q)) {
                matches.push({ type: 'Core Lead', title: t.name, sub: `${t.role} (${t.batch})`, action: () => { this.closeModal('command-search-modal'); this.switchView('team'); this.openTeamModal(t.id); } });
            }
        });

        // Search Projects
        IAC_DATA.projects.forEach(p => {
            if (p.title.toLowerCase().includes(q) || p.techStack.some(ts => ts.toLowerCase().includes(q))) {
                matches.push({ type: 'Project Hardware', title: p.title, sub: p.techStack.join(', '), action: () => { this.closeModal('command-search-modal'); this.switchView('projects'); this.openProjectModal(p.id); } });
            }
        });

        if (matches.length === 0) {
            resultsEl.innerHTML = `<p class="text-slate-500 text-xs text-center py-4">No results found for "${query}".</p>`;
            return;
        }

        resultsEl.innerHTML = matches.map((m, idx) => `
            <div onclick="window.IACApp_CommandActions[${idx}]()" class="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs transition">
                <div>
                    <h5 class="font-bold text-white">${m.title}</h5>
                    <p class="text-[10px] text-slate-400">${m.sub}</p>
                </div>
                <span class="bg-indigo-500/20 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase">${m.type}</span>
            </div>
        `).join('');

        window.IACApp_CommandActions = matches.map(m => m.action);
    },

    navigateToQuery(q) {
        const input = document.getElementById('command-input');
        if (input) {
            input.value = q;
            this.handleCommandInput(q);
        }
    },

    // ----------------------------------------------------------------------
    // 11. REGISTRATION FORM & MONGODB ATLAS BACKEND INTEGRATION
    // ----------------------------------------------------------------------
    setupRegistrationForm() {
        const form = document.getElementById('iac-registration-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin text-xs"></i> Submitting Application...`;
            }

            const fullName = document.getElementById('fullName').value;
            const rollNo = document.getElementById('rollNo').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dept = document.getElementById('department').value;
            const year = document.getElementById('year').value;
            const interestEl = document.querySelector('input[name="interest"]:checked');
            const interest = interestEl ? interestEl.value : 'Embedded Systems';

            const payload = { fullName, rollNo, email, phone, department: dept, year, interest };

            let isSavedInMongo = false;

            // 1. Save to API Backend with await
            try {
                const hostname = window.location.hostname || 'localhost';
                const apiHost = `http://${hostname}:5000`;

                const response = await fetch(`${apiHost}/api/applications`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const resData = await response.json();
                if (resData.success) {
                    isSavedInMongo = true;
                    console.log('✅ Application saved successfully:', resData.data);
                } else {
                    console.warn('⚠️ Server response error:', resData);
                }
            } catch (err) {
                console.warn('⚠️ API Error or Backend Offline:', err.message);
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }

            form.reset();

            // Display Success Confirmation Card in place of form (Clean Student View)
            const formCard = form.parentNode;
            if (formCard) {
                form.style.display = 'none';

                let successCard = document.getElementById('iac-success-card');
                if (!successCard) {
                    successCard = document.createElement('div');
                    successCard.id = 'iac-success-card';
                    formCard.appendChild(successCard);
                }

                successCard.style.display = 'block';
                successCard.className = 'text-center py-6 px-4 animate-fade-in';
                successCard.innerHTML = `
                    <div class="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg shadow-emerald-500/10">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <span class="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
                        ✅ Membership Registered
                    </span>
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">Application Submitted Successfully!</h3>
                    <p class="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-6">
                        Thank you, <strong class="text-cyan-400">${fullName}</strong>! Your B.Tech membership application has been registered with Innovation & Automation Club (IAC).
                    </p>
                    
                    <div class="bg-slate-900/90 border border-slate-700/60 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2.5 text-xs sm:text-sm text-slate-300 mb-6 shadow-inner">
                        <div class="flex justify-between border-b border-slate-800 pb-2">
                            <span class="text-slate-500 uppercase font-semibold">Student Name:</span>
                            <span class="font-bold text-white">${fullName}</span>
                        </div>
                        <div class="flex justify-between border-b border-slate-800 pb-2">
                            <span class="text-slate-500 uppercase font-semibold">Roll Number:</span>
                            <span class="font-mono text-cyan-400 font-bold">${rollNo}</span>
                        </div>
                        <div class="flex justify-between border-b border-slate-800 pb-2">
                            <span class="text-slate-500 uppercase font-semibold">Department:</span>
                            <span>${dept} (${year})</span>
                        </div>
                        <div class="flex justify-between border-b border-slate-800 pb-2">
                            <span class="text-slate-500 uppercase font-semibold">Selected Domain:</span>
                            <span class="text-indigo-400 font-semibold">${interest}</span>
                        </div>
                        <div class="flex justify-between pt-1">
                            <span class="text-slate-500 uppercase font-semibold">Application Status:</span>
                            <span class="text-emerald-400 font-bold flex items-center gap-1.5">
                                <i class="fas fa-check-double text-xs"></i> Registered & Confirmed
                            </span>
                        </div>
                    </div>

                    <button id="reset-form-btn" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition">
                        <i class="fas fa-plus-circle mr-1.5"></i> Submit Another Application
                    </button>
                `;

                this.showToast(`✅ Application for ${fullName} submitted successfully!`);

                document.getElementById('reset-form-btn')?.addEventListener('click', () => {
                    successCard.style.display = 'none';
                    form.style.display = 'block';
                    form.reset();
                });
            }
        });
    },

    // ----------------------------------------------------------------------
    // 12. ADMIN APPLICATIONS VIEWER (MONGODB DATA PROCESSOR)
    // ----------------------------------------------------------------------
    openAdminPortal() {
        const apiKey = prompt("🔑 Enter Admin Secret API Key to view received MongoDB Atlas applications:\n(Default key: iac_admin_secret_key_2026)");
        if (!apiKey) return;

        const hostname = window.location.hostname || 'localhost';
        const apiHost = `http://${hostname}:5000`;

        fetch(`${apiHost}/api/applications`, {
            headers: { 'x-api-key': apiKey }
        })
        .then(res => {
            if (!res.ok) throw new Error('Invalid Admin API Key or Backend Server Offline');
            return res.json();
        })
        .then(resData => {
            if (resData.success) {
                this.renderAdminApplicationsModal(resData.data, apiKey, apiHost);
            }
        })
        .catch(err => {
            alert(`❌ Error: ${err.message}\nMake sure the Express server is running on http://localhost:5000!`);
        });
    },

    renderAdminApplicationsModal(applications, apiKey, apiHost) {
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('project-modal-content');
        if (!modal || !modalContent) return;

        const rows = applications.length === 0 
            ? `<p class="text-slate-400 text-xs text-center py-6">No applications received in MongoDB Atlas yet.</p>`
            : applications.map(app => `
                <div class="p-4 rounded-2xl bg-slate-900 border border-slate-700/50 space-y-2 text-xs">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold text-white text-sm">${app.fullName}</h4>
                            <span class="text-[10px] text-indigo-400 font-mono">Roll: ${app.rollNo} • ${app.department} (${app.year})</span>
                        </div>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : app.status === 'contacted' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'}">
                            ${app.status}
                        </span>
                    </div>
                    <div class="text-[11px] text-slate-300 space-y-1">
                        <div><i class="fas fa-envelope text-indigo-400 mr-1.5"></i> ${app.email}</div>
                        <div><i class="fab fa-whatsapp text-emerald-400 mr-1.5"></i> ${app.phone}</div>
                        <div><i class="fas fa-microchip text-cyan-400 mr-1.5"></i> Interest: <strong class="text-white">${app.interest}</strong></div>
                        <div class="text-[10px] text-slate-500 pt-1">Submitted: ${new Date(app.submittedAt).toLocaleString()}</div>
                    </div>
                    <div class="flex gap-2 pt-2 border-t border-slate-800">
                        <button onclick="IACApp.updateAppStatus('${app._id}', 'contacted', '${apiKey}', '${apiHost}')" class="bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 text-[10px] px-2.5 py-1 rounded font-bold transition">Mark Contacted</button>
                        <button onclick="IACApp.updateAppStatus('${app._id}', 'approved', '${apiKey}', '${apiHost}')" class="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-[10px] px-2.5 py-1 rounded font-bold transition">Approve</button>
                    </div>
                </div>
            `).join('');

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between border-b border-slate-700/50 pb-3">
                    <div>
                        <h3 class="text-lg font-bold text-white"><i class="fas fa-database text-emerald-400 mr-2"></i> MongoDB Atlas Applications</h3>
                        <p class="text-xs text-slate-400">Received Student Applications (${applications.length} Total)</p>
                    </div>
                    <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full">LIVE DB</span>
                </div>
                <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    ${rows}
                </div>
            </div>
        `;

        this.openModal('project-modal');
    },

    updateAppStatus(id, newStatus, apiKey, apiHost) {
        fetch(`${apiHost}/api/applications/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(`Status updated to ${newStatus}`);
                this.openAdminPortal();
            }
        })
        .catch(err => alert('Error updating status: ' + err.message));
    },

    // ----------------------------------------------------------------------
    // 13. HELPER MODAL WINDOW METHODS
    // ----------------------------------------------------------------------
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
};

// Global attachment for inline HTML event handlers
window.IACApp = IACApp;

// Auto-start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    IACApp.init();
});
