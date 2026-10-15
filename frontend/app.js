// ============================================================
// TalentSync Frontend Application
// Vanilla JS - no framework required
// ============================================================

const API_BASE = 'http://localhost:8080/api';

// ============================================================
// SVG ICONS
// ============================================================
const IC = {
    dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    demands:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    employees: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    skills:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    search:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    alloc:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    ai:        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
    check:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    x:         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    warn:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    loc:       `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    bot:       `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7"/><path d="M5 14a7 7 0 0 1 7-7h1V5.73"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,
    plus:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    close:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    run:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    logo:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    bell:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    menu:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
};

// ============================================================
// ROUTER
// ============================================================
const router = {
    currentPage: 'dashboard',
    navigate(page) {
        this.currentPage = page;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const navEl = document.getElementById(`nav-${page}`);
        if (navEl) navEl.classList.add('active');
        document.getElementById('pageTitle').textContent = pageTitles[page] || page;
        renderPage(page);
    }
};

const pageTitles = {
    dashboard: 'Dashboard',
    demands: 'Project Demands',
    employees: 'Employees',
    skills: 'Skills Matrix',
    search: 'Resource Search',
    allocations: 'Allocation Workflow',
    ai: 'AI Staffing Assistant'
};

// ============================================================
// API HELPERS
// ============================================================
async function apiFetch(path, method = 'GET', body = null) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = 'success') {
    const iconMap = { success: IC.check, error: IC.x, warning: IC.warn };
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type !== 'success' ? type : ''}`;
    toast.innerHTML = `<span class="toast-icon">${iconMap[type] || IC.check}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ============================================================
// MODAL
// ============================================================
function openModal(title, bodyHtml) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }

// ============================================================
// LOADING / PAGE CONTENT
// ============================================================
function setPageContent(html) { document.getElementById('pageContent').innerHTML = html; }
function showLoading() { setPageContent(`<div class="loading-overlay"><div class="spinner"></div><span>Loading...</span></div>`); }

// ============================================================
// UTILITIES
// ============================================================
function proficiencyDots(level) {
    let dots = '';
    for (let i = 1; i <= 5; i++) dots += `<div class="dot ${i <= level ? 'filled' : ''}"></div>`;
    return `<div class="proficiency-bar"><div class="proficiency-dots">${dots}</div></div>`;
}
function getProfLabel(level) { return ['','Beginner','Intermediate','Advanced','Expert','Master'][level] || 'Unknown'; }
function badgeHtml(text, type) {
    const cls = type || text.toLowerCase().replace(/[_\s]/g, '-');
    return `<span class="badge badge-${cls}">${text}</span>`;
}
function scoreRing(score) {
    const r = 40, circ = 2 * Math.PI * r;
    const filled = (score / 100) * circ;
    const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
    return `<div class="score-ring">
        <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="${r}" stroke="rgba(99,102,241,0.1)" stroke-width="8" fill="none"/>
            <circle cx="50" cy="50" r="${r}" stroke="${color}" stroke-width="8" fill="none"
                stroke-dasharray="${filled} ${circ}" stroke-linecap="round" transform="rotate(-90 50 50)"/>
        </svg>
        <div class="score-ring-text"><div class="score-value">${score.toFixed(0)}</div><div class="score-label">/ 100</div></div>
    </div>`;
}

// ============================================================
// DASHBOARD
// ============================================================
async function renderDashboard() {
    showLoading();
    try {
        const [employees, demands, allocations] = await Promise.all([
            apiFetch('/employees'), apiFetch('/demands'), apiFetch('/allocations')
        ]);
        const openDemands = demands.filter(d => d.status === 'OPEN').length;
        const activeAllocs = allocations.filter(a => a.status === 'CONFIRMED').length;
        const activeEmps = employees.filter(e => e.employmentStatus === 'ACTIVE').length;

        setPageContent(`
        <div class="stats-grid">
            <div class="stat-card indigo">
                <div class="stat-icon">${IC.employees}</div>
                <div><div class="stat-value">${employees.length}</div><div class="stat-label">Total Employees</div></div>
            </div>
            <div class="stat-card emerald">
                <div class="stat-icon">${IC.demands}</div>
                <div><div class="stat-value">${openDemands}</div><div class="stat-label">Open Demands</div></div>
            </div>
            <div class="stat-card amber">
                <div class="stat-icon">${IC.alloc}</div>
                <div><div class="stat-value">${activeAllocs}</div><div class="stat-label">Active Allocations</div></div>
            </div>
            <div class="stat-card cyan">
                <div class="stat-icon">${IC.check}</div>
                <div><div class="stat-value">${activeEmps}</div><div class="stat-label">Active Staff</div></div>
            </div>
        </div>
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Recent Demands</span>
                    <button class="btn btn-secondary btn-sm" onclick="router.navigate('demands')">View All</button>
                </div>
                ${demands.length === 0
                    ? `<div class="empty-state"><div class="empty-icon">${IC.demands}</div><div class="empty-title">No demands yet</div></div>`
                    : `<div class="table-container"><table>
                        <thead><tr><th>Project</th><th>Role</th><th>Priority</th><th>Status</th></tr></thead>
                        <tbody>${demands.slice(0,5).map(d => `<tr>
                            <td>${d.projectName}</td><td>${d.role}</td>
                            <td>${badgeHtml(d.priority, d.priority.toLowerCase())}</td>
                            <td>${badgeHtml(d.status, d.status.toLowerCase().replace('_','-'))}</td>
                        </tr>`).join('')}</tbody></table></div>`}
            </div>
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Recent Allocations</span>
                    <button class="btn btn-secondary btn-sm" onclick="router.navigate('allocations')">View All</button>
                </div>
                ${allocations.length === 0
                    ? `<div class="empty-state"><div class="empty-icon">${IC.alloc}</div><div class="empty-title">No allocations yet</div><div class="empty-desc">Go to Demands and click Match to find candidates</div></div>`
                    : `<div class="table-container"><table>
                        <thead><tr><th>Employee</th><th>Project</th><th>%</th><th>Status</th></tr></thead>
                        <tbody>${allocations.slice(0,5).map(a => `<tr>
                            <td>${a.employeeName}</td><td>${a.projectName}</td>
                            <td>${a.allocationPercent}%</td>
                            <td>${badgeHtml(a.status, a.status.toLowerCase())}</td>
                        </tr>`).join('')}</tbody></table></div>`}
            </div>
        </div>`);
    } catch (err) {
        setPageContent(`<div class="empty-state"><div class="empty-icon">${IC.warn}</div>
            <div class="empty-title">Cannot connect to API</div>
            <div class="empty-desc">Make sure Spring Boot is running on port 8080.<br>${err.message}</div></div>`);
    }
}

// ============================================================
// DEMANDS
// ============================================================
async function renderDemands() {
    showLoading();
    try {
        const demands = await apiFetch('/demands');
        setPageContent(`
        <div class="section-header">
            <span class="section-title">Project Demands</span>
            <button class="btn btn-primary" onclick="showCreateDemandModal()">${IC.plus} New Demand</button>
        </div>
        <div class="card">
            <div class="table-container"><table>
                <thead><tr><th>Project</th><th>Role</th><th>Location</th><th>Period</th><th>Alloc%</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>${demands.length === 0
                    ? `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:40px">No demands yet.</td></tr>`
                    : demands.map(d => `<tr>
                        <td><strong>${d.projectName}</strong></td>
                        <td>${d.role}</td>
                        <td>${IC.loc} ${d.location || 'Remote'}</td>
                        <td style="font-size:12px">${d.startDate} &rarr; ${d.endDate}</td>
                        <td>${d.allocationPercent}%</td>
                        <td>${badgeHtml(d.priority, d.priority.toLowerCase())}</td>
                        <td>${badgeHtml(d.status, d.status.toLowerCase().replace('_','-'))}</td>
                        <td><button class="btn btn-secondary btn-sm" onclick="showRecommendations(${d.id})">${IC.ai} Match</button></td>
                    </tr>`).join('')}
                </tbody>
            </table></div>
        </div>`);
    } catch (err) { showApiError(err); }
}

async function showCreateDemandModal() {
    let opts = '';
    try {
        const skills = await apiFetch('/skills');
        opts = (skills || []).map(s => `<option value="${s.id}">${s.name} (${s.category})</option>`).join('');
    } catch (err) {
        console.warn('Failed to load skills list:', err);
    }
    openModal('Create New Demand', `
        <form id="demandForm">
            <div class="form-grid">
                <div class="form-group"><label>Project Name *</label><input type="text" id="df-project" placeholder="e.g. Project Alpha" required></div>
                <div class="form-group"><label>Role *</label><input type="text" id="df-role" placeholder="e.g. Senior Java Developer" required></div>
                <div class="form-group"><label>Start Date *</label><input type="date" id="df-start" required></div>
                <div class="form-group"><label>End Date *</label><input type="date" id="df-end" required></div>
                <div class="form-group"><label>Allocation % *</label><input type="number" id="df-alloc" min="1" max="100" value="100" required></div>
                <div class="form-group"><label>Priority *</label>
                    <select id="df-priority">
                        <option value="LOW">Low</option><option value="MEDIUM" selected>Medium</option>
                        <option value="HIGH">High</option><option value="CRITICAL">Critical</option>
                    </select>
                </div>
                <div class="form-group"><label>Location</label><input type="text" id="df-location" placeholder="e.g. Hyderabad, Pune or Remote"></div>
                <div class="form-group full-width"><label>Required Skills (hold Ctrl to select multiple)</label>
                    <select id="df-skills" multiple style="height:120px">${opts}</select>
                </div>
                <div class="form-group full-width"><label>Description</label>
                    <textarea id="df-desc" placeholder="Additional details..."></textarea>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Create Demand</button>
            </div>
        </form>`);
        document.getElementById('demandForm').addEventListener('submit', async e => {
            e.preventDefault();
            const skillIds = Array.from(document.getElementById('df-skills').selectedOptions).map(o => parseInt(o.value));
            try {
                await apiFetch('/demands', 'POST', {
                    projectName: document.getElementById('df-project').value,
                    role: document.getElementById('df-role').value,
                    startDate: document.getElementById('df-start').value,
                    endDate: document.getElementById('df-end').value,
                    allocationPercent: parseInt(document.getElementById('df-alloc').value),
                    priority: document.getElementById('df-priority').value,
                    location: document.getElementById('df-location').value,
                    requiredSkillIds: skillIds,
                    description: document.getElementById('df-desc').value
                });
                closeModal(); showToast('Demand created!'); renderDemands();
            } catch (err) { showToast(err.message, 'error'); }
        });
}

async function showRecommendations(demandId) {
    openModal('AI Candidate Recommendations', '<div class="loading-overlay"><div class="spinner"></div><span>Analyzing candidates...</span></div>');
    try {
        const [recs, demand] = await Promise.all([
            apiFetch(`/demands/${demandId}/recommendations`, 'POST'),
            apiFetch(`/demands/${demandId}`)
        ]);
        let html = `<div class="simulation-notice">${IC.warn} Scores computed deterministically from stored data only.</div>
            <p style="color:var(--text-secondary);margin-bottom:16px;font-size:13px">Found <strong>${recs.length}</strong> candidates for <strong>${demand.role}</strong></p>`;
        if (!recs.length) {
            html += '<div class="empty-state"><div class="empty-title">No candidates found</div></div>';
        } else {
            html += recs.map(r => `
            <div class="candidate-card" style="margin-bottom:12px">
                <div class="candidate-header">
                    <div class="candidate-avatar">${r.employeeName.charAt(0)}</div>
                    <div class="candidate-info">
                        <div class="candidate-name">${r.employeeName} <small style="color:var(--text-muted)">(${r.employeeCode})</small></div>
                        <div class="candidate-meta">${IC.loc} ${r.location || 'N/A'} &bull; ${r.department || 'N/A'}</div>
                    </div>
                    <div class="score-ring-container">${scoreRing(r.totalScore)}</div>
                </div>
                ${r.scoreBreakdown ? `<div style="margin:12px 0">
                    <div class="progress-bar-container">
                        <div class="progress-label"><span>Skills</span><span>${r.scoreBreakdown.skillScore}/50</span></div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${(r.scoreBreakdown.skillScore/50)*100}%"></div></div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-label"><span>Availability</span><span>${r.scoreBreakdown.availabilityScore}/30</span></div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${(r.scoreBreakdown.availabilityScore/30)*100}%;background:linear-gradient(90deg,#10b981,#34d399)"></div></div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-label"><span>Location</span><span>${r.scoreBreakdown.locationScore}/10</span></div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${(r.scoreBreakdown.locationScore/10)*100}%;background:linear-gradient(90deg,#8b5cf6,#a78bfa)"></div></div>
                    </div>
                </div>` : ''}
                <div class="candidate-tags">
                    ${(r.matchedSkills||[]).map(s => `<span class="skill-tag">${IC.check} ${s.skillName} (${s.proficiencyLabel})</span>`).join('')}
                    ${(r.missingSkills||[]).map(s => `<span class="skill-tag missing">${IC.x} ${s.skillName}</span>`).join('')}
                </div>
                ${!r.meetsSkillRequirements ? `<div class="warning-badge">${IC.warn} Missing required skills</div>` : ''}
                ${!r.meetsAvailabilityRequirement ? `<div class="warning-badge">${IC.warn} Insufficient availability (${r.availablePercent}% available)</div>` : ''}
                <button class="btn ${r.meetsSkillRequirements && r.meetsAvailabilityRequirement ? 'btn-success' : 'btn-secondary'} btn-sm"
                    style="margin-top:12px" onclick="showAllocateModal(${r.employeeId},${demandId},'${r.employeeName}')">
                    ${IC.check} ${r.meetsSkillRequirements && r.meetsAvailabilityRequirement ? 'Allocate' : 'Allocate Anyway'}
                </button>
            </div>`).join('');
        }
        document.getElementById('modalBody').innerHTML = html;
    } catch (err) {
        document.getElementById('modalBody').innerHTML = `<div class="empty-state"><div class="empty-title">Error: ${err.message}</div></div>`;
    }
}

// ============================================================
// EMPLOYEES
// ============================================================
async function renderEmployees() {
    showLoading();
    try {
        const employees = await apiFetch('/employees');
        setPageContent(`
        <div class="section-header">
            <span class="section-title">Employees</span>
            <button class="btn btn-primary" onclick="showCreateEmployeeModal()">${IC.plus} Add Employee</button>
        </div>
        <div class="card">
            <div class="table-container"><table>
                <thead><tr><th>Code</th><th>Name</th><th>Location</th><th>Department</th><th>Status</th><th>Skills</th><th>Actions</th></tr></thead>
                <tbody>${employees.map(e => `<tr>
                    <td><code style="color:var(--accent-primary)">${e.employeeCode}</code></td>
                    <td><strong>${e.name}</strong></td>
                    <td>${IC.loc} ${e.location || 'N/A'}</td>
                    <td>${e.department || 'N/A'}</td>
                    <td>${badgeHtml(e.employmentStatus, e.employmentStatus === 'ACTIVE' ? 'active' : e.employmentStatus === 'ON_LEAVE' ? 'on-leave' : 'cancelled')}</td>
                    <td>${(e.skills||[]).slice(0,3).map(s => `<span class="skill-tag">${s.skillName}</span>`).join(' ')}${(e.skills||[]).length > 3 ? `<span class="skill-tag">+${(e.skills||[]).length-3}</span>` : ''}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm" onclick="showEmployeeDetail(${e.id})">View</button>
                        <button class="btn btn-secondary btn-sm" onclick="showAddSkillModal(${e.id},'${e.name}')">${IC.plus} Skill</button>
                    </td>
                </tr>`).join('')}</tbody>
            </table></div>
        </div>`);
    } catch (err) { showApiError(err); }
}

function showCreateEmployeeModal() {
    openModal('Add New Employee', `
    <form id="employeeForm">
        <div class="form-grid">
            <div class="form-group"><label>Employee Code *</label><input type="text" id="ef-code" placeholder="e.g. EMP007" required></div>
            <div class="form-group"><label>Full Name *</label><input type="text" id="ef-name" placeholder="e.g. Jane Smith" required></div>
            <div class="form-group"><label>Email</label><input type="email" id="ef-email" placeholder="jane@example.com"></div>
            <div class="form-group"><label>Location</label><input type="text" id="ef-location" placeholder="e.g. Hyderabad or Pune"></div>
            <div class="form-group"><label>Department</label><input type="text" id="ef-dept" placeholder="e.g. Engineering"></div>
            <div class="form-group"><label>Status *</label>
                <select id="ef-status">
                    <option value="ACTIVE">Active</option>
                    <option value="ON_LEAVE">On Leave</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            </div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Employee</button>
        </div>
    </form>`);
    document.getElementById('employeeForm').addEventListener('submit', async e => {
        e.preventDefault();
        try {
            await apiFetch('/employees', 'POST', {
                employeeCode: document.getElementById('ef-code').value,
                name: document.getElementById('ef-name').value,
                email: document.getElementById('ef-email').value,
                location: document.getElementById('ef-location').value,
                department: document.getElementById('ef-dept').value,
                employmentStatus: document.getElementById('ef-status').value
            });
            closeModal(); showToast('Employee added!'); renderEmployees();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

async function showAddSkillModal(empId, empName) {
    const skills = await apiFetch('/skills');
    openModal(`Add Skill - ${empName}`, `
    <form id="skillForm">
        <div class="form-grid">
            <div class="form-group full-width"><label>Select Skill *</label>
                <select id="sf-skill">${skills.map(s => `<option value="${s.id}">${s.name} (${s.category})</option>`).join('')}</select>
            </div>
            <div class="form-group"><label>Proficiency Level *</label>
                <select id="sf-level">
                    <option value="1">1 - Beginner</option><option value="2">2 - Intermediate</option>
                    <option value="3" selected>3 - Advanced</option>
                    <option value="4">4 - Expert</option><option value="5">5 - Master</option>
                </select>
            </div>
            <div class="form-group"><label>Last Validated Date</label><input type="date" id="sf-date"></div>
            <div class="form-group full-width"><label>Evidence / Certification</label>
                <input type="text" id="sf-evidence" placeholder="e.g. AWS Certified Developer">
            </div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Skill</button>
        </div>
    </form>`);
    document.getElementById('skillForm').addEventListener('submit', async e => {
        e.preventDefault();
        try {
            await apiFetch(`/employees/${empId}/skills`, 'POST', {
                skillId: parseInt(document.getElementById('sf-skill').value),
                proficiencyLevel: parseInt(document.getElementById('sf-level').value),
                lastValidatedAt: document.getElementById('sf-date').value || null,
                evidence: document.getElementById('sf-evidence').value
            });
            closeModal(); showToast('Skill added!'); renderEmployees();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

// State for Skills Matrix interactive filtering
let matrixState = {
    skills: [],
    employees: [],
    search: '',
    category: 'ALL',
    minLevel: 'ALL',
    employeeId: 'ALL'
};

function getProfColorClass(level) {
    if (level === 5) return 'lvl-5';
    if (level === 4) return 'lvl-4';
    if (level === 3) return 'lvl-3';
    if (level === 2) return 'lvl-2';
    if (level === 1) return 'lvl-1';
    return 'lvl-none';
}

async function showEmployeeDetail(id, highlightSkillName = null) {
    const emp = await apiFetch(`/employees/${id}`);
    const skillsList = emp.skills || [];
    const avgScore = skillsList.length
        ? (skillsList.reduce((acc, s) => acc + s.proficiencyLevel, 0) / skillsList.length).toFixed(1)
        : '0.0';

    openModal(`${emp.name} &bull; Skill Profile`, `
    <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border-color)">
        <div class="candidate-avatar" style="width:60px;height:60px;font-size:22px;border-radius:12px">${emp.name.charAt(0)}</div>
        <div style="flex:1">
            <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:18px;font-weight:700;color:var(--text-primary)">${emp.name}</span>
                <button class="btn btn-primary btn-sm" onclick="closeModal();showAddSkillModal(${emp.id}, '${emp.name}')">${IC.plus} Add Skill</button>
            </div>
            <div style="color:var(--text-secondary);font-size:12.5px;margin-top:2px">
                ${emp.employeeCode} &bull; ${emp.department || 'Engineering'} &bull; ${IC.loc} ${emp.location || 'N/A'}
            </div>
            <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
                ${badgeHtml(emp.employmentStatus, emp.employmentStatus === 'ACTIVE' ? 'active' : 'on-leave')}
                <span class="badge" style="background:rgba(99,102,241,0.12);color:var(--text-accent);border:1px solid rgba(99,102,241,0.25)">
                    ${skillsList.length} Skills &bull; Avg ${avgScore}/5
                </span>
            </div>
        </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span class="card-title" style="font-size:14px">Competency &amp; Verified Proficiency</span>
        <span style="font-size:11.5px;color:var(--text-muted)">Scale: 1 (Beginner) to 5 (Master)</span>
    </div>

    ${!skillsList.length ? '<div style="color:var(--text-muted);text-align:center;padding:24px 0">No skills currently recorded for this employee.</div>' :
    skillsList.map(s => {
        const isTarget = highlightSkillName && s.skillName.toLowerCase() === highlightSkillName.toLowerCase();
        const pct = Math.min(100, Math.max(0, (s.proficiencyLevel / 5) * 100));
        const colorCls = getProfColorClass(s.proficiencyLevel);
        return `
        <div class="skill-bar-card ${isTarget ? 'highlighted' : ''}">
            <div class="skill-bar-top">
                <div class="skill-bar-name">
                    <span>${s.skillName}</span>
                    <span class="skill-tag">${s.category}</span>
                    ${isTarget ? '<span class="badge badge-active" style="font-size:10px">Selected in Matrix</span>' : ''}
                </div>
                <div class="skill-bar-score" style="color:var(--text-primary)">
                    <span style="font-size:14px;font-weight:800">${s.proficiencyLevel}/5</span>
                    <span style="color:var(--text-secondary);margin-left:4px">(${getProfLabel(s.proficiencyLevel)})</span>
                </div>
            </div>
            <div class="skill-bar-track">
                <div class="skill-bar-fill ${colorCls}" style="width:${pct}%"></div>
            </div>
            <div class="skill-bar-meta">
                <span>${s.lastValidatedAt ? '✓ Validated: ' + s.lastValidatedAt : 'Validation pending'}</span>
                <span>${s.evidence ? 'Evidence: ' + s.evidence : 'Self-reported'}</span>
            </div>
        </div>`;
    }).join('')}`);
}

function showCellDetail(empId, skillName) {
    showEmployeeDetail(empId, skillName);
}

// ============================================================
// SKILLS MATRIX HEATMAP SYSTEM
// ============================================================
async function renderSkills() {
    showLoading();
    try {
        const [skills, employees] = await Promise.all([apiFetch('/skills'), apiFetch('/employees')]);
        matrixState.skills = skills || [];
        matrixState.employees = employees || [];
        renderSkillsMatrixView();
    } catch (err) { showApiError(err); }
}

function updateMatrixFilter(key, val) {
    matrixState[key] = val;
    renderSkillsMatrixView();
}

function resetMatrixFilters() {
    matrixState.search = '';
    matrixState.category = 'ALL';
    matrixState.minLevel = 'ALL';
    matrixState.employeeId = 'ALL';
    renderSkillsMatrixView();
}

function renderSkillsMatrixView() {
    const { skills, employees, search, category, minLevel, employeeId } = matrixState;

    // 1. Calculate dynamic summary statistics
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.employmentStatus === 'ACTIVE').length;
    const totalSkills = skills.length;

    let totalRatingsCount = 0;
    const skillRatingCounts = {};
    skills.forEach(s => skillRatingCounts[s.name] = 0);

    employees.forEach(emp => {
        (emp.skills || []).forEach(es => {
            totalRatingsCount++;
            if (skillRatingCounts[es.skillName] !== undefined) {
                skillRatingCounts[es.skillName]++;
            }
        });
    });

    // Skills requiring development: 0 employees rated or only 1 employee rated
    const devNeededCount = skills.filter(s => (skillRatingCounts[s.name] || 0) <= 1).length;

    // Unique categories for filter dropdown
    const categories = Array.from(new Set(skills.map(s => s.category))).sort();

    // 2. Filter skills based on search, category, and minimum proficiency
    let filteredSkills = skills.filter(skill => {
        // Text search
        if (search) {
            const q = search.toLowerCase();
            const matchName = skill.name.toLowerCase().includes(q);
            const matchCat = skill.category.toLowerCase().includes(q);
            if (!matchName && !matchCat) return false;
        }

        // Category filter
        if (category !== 'ALL' && skill.category !== category) {
            return false;
        }

        // Proficiency level filter
        if (minLevel !== 'ALL') {
            const hasMatchingLevel = employees.some(emp => {
                const es = (emp.skills || []).find(s => s.skillName === skill.name);
                if (!es) return minLevel === 'NONE';
                if (minLevel === 'NONE') return false;
                return es.proficiencyLevel >= parseInt(minLevel);
            });
            if (!hasMatchingLevel) return false;
        }

        return true;
    });

    // 3. Filter employees (if specific employee selected in filter)
    let displayEmployees = employees;
    if (employeeId !== 'ALL') {
        displayEmployees = employees.filter(e => e.id == employeeId);
    }

    setPageContent(`
    <!-- Page Header -->
    <div class="section-header" style="margin-bottom:16px">
        <div>
            <div class="section-title">Enterprise Skills Matrix</div>
            <div style="font-size:12.5px;color:var(--text-secondary);margin-top:2px">
                Color-coded numeric competency heatmap for enterprise workforce planning and skill gap analysis.
            </div>
        </div>
        <button class="btn btn-primary" onclick="showAddSkillCatalogModal()">${IC.plus} Add Skill to Catalog</button>
    </div>

    <!-- 1. Dynamic Summary Metrics Cards -->
    <div class="matrix-metrics">
        <div class="metric-card">
            <div class="metric-icon-box blue">${IC.employees}</div>
            <div class="metric-info">
                <span class="metric-value">${activeEmployees} <span style="font-size:13px;font-weight:500;color:var(--text-secondary)">/ ${totalEmployees}</span></span>
                <span class="metric-label">Active Workforce</span>
                <span class="metric-meta">Assigned across departments</span>
            </div>
        </div>
        <div class="metric-card">
            <div class="metric-icon-box purple">${IC.skills}</div>
            <div class="metric-info">
                <span class="metric-value">${totalSkills}</span>
                <span class="metric-label">Competency Catalog</span>
                <span class="metric-meta">${categories.length} skill domains tracked</span>
            </div>
        </div>
        <div class="metric-card">
            <div class="metric-icon-box green">${IC.check}</div>
            <div class="metric-info">
                <span class="metric-value">${totalRatingsCount}</span>
                <span class="metric-label">Verified Ratings</span>
                <span class="metric-meta">Across employee profiles</span>
            </div>
        </div>
        <div class="metric-card">
            <div class="metric-icon-box amber">${IC.warn}</div>
            <div class="metric-info">
                <span class="metric-value">${devNeededCount}</span>
                <span class="metric-label">Coverage Gap Skills</span>
                <span class="metric-meta">0-1 rated specialists</span>
            </div>
        </div>
    </div>

    <!-- 2. Search & Filters Toolbar -->
    <div class="matrix-toolbar">
        <div class="matrix-filters-group">
            <input type="text" class="matrix-search-input" placeholder="Search skill or category..." 
                   value="${escapeHtml(search)}" oninput="updateMatrixFilter('search', this.value)">

            <select class="matrix-select" onchange="updateMatrixFilter('category', this.value)">
                <option value="ALL" ${category === 'ALL' ? 'selected' : ''}>All Categories (${categories.length})</option>
                ${categories.map(c => `<option value="${c}" ${category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>

            <select class="matrix-select" onchange="updateMatrixFilter('minLevel', this.value)">
                <option value="ALL" ${minLevel === 'ALL' ? 'selected' : ''}>All Proficiency Levels</option>
                <option value="5" ${minLevel === '5' ? 'selected' : ''}>Level 5: Master Only</option>
                <option value="4" ${minLevel === '4' ? 'selected' : ''}>Level 4+: Expert or Master</option>
                <option value="3" ${minLevel === '3' ? 'selected' : ''}>Level 3+: Advanced and above</option>
                <option value="1" ${minLevel === '1' ? 'selected' : ''}>Has Any Rating (1-5)</option>
                <option value="NONE" ${minLevel === 'NONE' ? 'selected' : ''}>Unrated / Coverage Gaps</option>
            </select>

            <select class="matrix-select" onchange="updateMatrixFilter('employeeId', this.value)">
                <option value="ALL" ${employeeId === 'ALL' ? 'selected' : ''}>All Employees (${employees.length})</option>
                ${employees.map(e => `<option value="${e.id}" ${employeeId == e.id ? 'selected' : ''}>${e.name}</option>`).join('')}
            </select>

            ${(search || category !== 'ALL' || minLevel !== 'ALL' || employeeId !== 'ALL') ? `
                <button class="matrix-reset-btn" onclick="resetMatrixFilters()">Reset Filters</button>
            ` : ''}
        </div>
        <div style="font-size:12px;color:var(--text-secondary);font-weight:500">
            Showing <strong>${filteredSkills.length}</strong> of ${skills.length} skills
        </div>
    </div>

    <!-- 3. Heatmap Proficiency Legend -->
    <div class="matrix-legend">
        <span class="legend-title">Proficiency Scale:</span>
        <span class="legend-item"><span class="heatmap-badge lvl-5" style="width:24px;height:20px;font-size:11px">5</span> Master</span>
        <span class="legend-item"><span class="heatmap-badge lvl-4" style="width:24px;height:20px;font-size:11px">4</span> Expert</span>
        <span class="legend-item"><span class="heatmap-badge lvl-3" style="width:24px;height:20px;font-size:11px">3</span> Advanced</span>
        <span class="legend-item"><span class="heatmap-badge lvl-2" style="width:24px;height:20px;font-size:11px">2</span> Intermediate</span>
        <span class="legend-item"><span class="heatmap-badge lvl-1" style="width:24px;height:20px;font-size:11px">1</span> Beginner</span>
        <span class="legend-item"><span class="heatmap-badge lvl-none" style="width:24px;height:20px;font-size:11px">&mdash;</span> Not Rated</span>
        <span style="margin-left:auto;font-size:11px;color:var(--text-muted)">Tip: Click any cell or employee name for deep-dive profile</span>
    </div>

    <!-- 4. Heatmap Matrix Table -->
    <div class="card" style="padding:0;overflow:hidden">
        <div class="table-container" style="max-height:680px;overflow:auto">
            <table class="matrix-table" style="margin:0">
                <thead style="position:sticky;top:0;background:var(--bg-card);z-index:5;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
                    <tr>
                        <th style="min-width:180px;text-align:left">Skill</th>
                        <th style="min-width:130px;text-align:left">Category</th>
                        ${displayEmployees.map(e => `
                            <th class="emp-col-header" onclick="showEmployeeDetail(${e.id})" title="Click to view ${escapeHtml(e.name)}'s complete profile">
                                <div class="emp-col-avatar">${e.name.charAt(0)}</div>
                                <div class="emp-col-name">${escapeHtml(e.name.split(' ')[0])}</div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${!filteredSkills.length ? `
                        <tr><td colspan="${displayEmployees.length + 2}" style="text-align:center;padding:36px;color:var(--text-muted)">
                            No skills found matching your search and filter criteria.
                        </td></tr>
                    ` :
                    filteredSkills.map(skill => {
                        const cells = displayEmployees.map(emp => {
                            const es = (emp.skills || []).find(s => s.skillName === skill.name);
                            if (es) {
                                const lvl = es.proficiencyLevel;
                                const lbl = getProfLabel(lvl);
                                const cls = getProfColorClass(lvl);
                                const titleTxt = `${emp.name}: Level ${lvl} (${lbl}) - ${skill.name}`;
                                return `
                                <td class="heatmap-cell">
                                    <div class="heatmap-badge ${cls}" title="${escapeHtml(titleTxt)}" 
                                         onclick="showCellDetail(${emp.id}, '${escapeHtml(skill.name)}')">
                                        ${lvl}
                                    </div>
                                </td>`;
                            } else {
                                const titleTxt = `${emp.name} is not rated for ${skill.name}. Click to add.`;
                                return `
                                <td class="heatmap-cell">
                                    <div class="heatmap-badge lvl-none" title="${escapeHtml(titleTxt)}" 
                                         onclick="showAddSkillModal(${emp.id}, '${escapeHtml(emp.name)}')">
                                        &mdash;
                                    </div>
                                </td>`;
                            }
                        }).join('');

                        return `
                        <tr>
                            <td>
                                <strong style="color:var(--text-primary);font-size:13.5px">${escapeHtml(skill.name)}</strong>
                                ${skill.description ? `<br><small style="color:var(--text-muted);font-size:11px">${escapeHtml(skill.description)}</small>` : ''}
                            </td>
                            <td><span class="skill-tag">${escapeHtml(skill.category)}</span></td>
                            ${cells}
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    </div>`);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function showAddSkillCatalogModal() {
    openModal('Add New Skill', `
    <form id="catalogForm">
        <div class="form-grid">
            <div class="form-group"><label>Skill Name *</label><input type="text" id="sc-name" placeholder="e.g. Kubernetes" required></div>
            <div class="form-group"><label>Category *</label><input type="text" id="sc-cat" placeholder="e.g. DevOps" required></div>
            <div class="form-group full-width"><label>Description</label><textarea id="sc-desc" placeholder="Brief description..."></textarea></div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Skill</button>
        </div>
    </form>`);
    document.getElementById('catalogForm').addEventListener('submit', async e => {
        e.preventDefault();
        try {
            await apiFetch('/skills', 'POST', {
                name: document.getElementById('sc-name').value,
                category: document.getElementById('sc-cat').value,
                description: document.getElementById('sc-desc').value
            });
            closeModal(); showToast('Skill added!'); renderSkills();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

// ============================================================
// RESOURCE SEARCH
// ============================================================
async function renderSearch() {
    showLoading();
    const skills = await apiFetch('/skills');
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
    setPageContent(`
    <div class="section-title" style="margin-bottom:20px">Resource Search &amp; Availability</div>
    <div class="card" style="margin-bottom:20px">
        <div class="form-grid">
            <div class="form-group"><label>Start Date *</label><input type="date" id="rs-start" value="${today}"></div>
            <div class="form-group"><label>End Date *</label><input type="date" id="rs-end" value="${nextMonth}"></div>
            <div class="form-group"><label>Filter by Skill</label>
                <select id="rs-skill">
                    <option value="">All Skills</option>
                    ${skills.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group" style="align-self:flex-end">
                <button class="btn btn-primary" onclick="searchResources()">${IC.search} Search</button>
            </div>
        </div>
    </div>
    <div id="searchResults"></div>`);
    searchResources();
}

async function searchResources() {
    const start = document.getElementById('rs-start').value;
    const end = document.getElementById('rs-end').value;
    const skillId = document.getElementById('rs-skill').value;
    if (!start || !end) { showToast('Please select both dates', 'warning'); return; }
    document.getElementById('searchResults').innerHTML = '<div class="loading-overlay"><div class="spinner"></div></div>';
    try {
        let url = `/resources/available?startDate=${start}&endDate=${end}`;
        if (skillId) url += `&skillId=${skillId}`;
        const resources = await apiFetch(url);
        document.getElementById('searchResults').innerHTML = `
        <div class="card">
            <div class="card-header"><span class="card-title">Available Resources (${resources.length})</span></div>
            ${!resources.length
                ? `<div class="empty-state"><div class="empty-icon">${IC.search}</div><div class="empty-title">No available resources</div><div class="empty-desc">All employees may be fully allocated in this period.</div></div>`
                : `<div class="table-container"><table>
                    <thead><tr><th>Name</th><th>Location</th><th>Department</th><th>Allocated %</th><th>Available %</th></tr></thead>
                    <tbody>${resources.map(r => `<tr>
                        <td><strong>${r.name}</strong></td>
                        <td>${IC.loc} ${r.location || 'N/A'}</td>
                        <td>${r.department || 'N/A'}</td>
                        <td>
                            <div class="progress-bar" style="width:120px;display:inline-block;vertical-align:middle;margin-right:8px">
                                <div class="progress-fill" style="width:${r.allocatedPercent}%;background:linear-gradient(90deg,#f59e0b,#ef4444)"></div>
                            </div>${r.allocatedPercent}%
                        </td>
                        <td style="color:var(--accent-success);font-weight:600">${r.availablePercent}%</td>
                    </tr>`).join('')}</tbody>
                </table></div>`}
        </div>`;
    } catch (err) {
        document.getElementById('searchResults').innerHTML = `<div class="empty-state"><div class="empty-title">${err.message}</div></div>`;
    }
}

// ============================================================
// ALLOCATIONS
// ============================================================
async function renderAllocations() {
    showLoading();
    try {
        const allocations = await apiFetch('/allocations');
        setPageContent(`
        <div class="section-header">
            <span class="section-title">Allocation Approval Workflow</span>
            <button class="btn btn-primary" onclick="showAllocateModal()">${IC.plus} Create Allocation</button>
        </div>
        <div class="card">
            <div class="table-container"><table>
                <thead><tr><th>Employee</th><th>Project / Role</th><th>Period</th><th>Alloc%</th><th>Approved By</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>${!allocations.length
                    ? `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">No allocations yet. Go to Demands and click Match.</td></tr>`
                    : allocations.map(a => `<tr>
                        <td><strong>${a.employeeName}</strong><br><small style="color:var(--text-muted)">${a.employeeCode}</small></td>
                        <td>${a.projectName}<br><small style="color:var(--text-muted)">${a.role}</small></td>
                        <td style="font-size:12px">${a.startDate} &rarr; ${a.endDate}</td>
                        <td>${a.allocationPercent}%</td>
                        <td>${a.approvedBy || '-'}</td>
                        <td>${badgeHtml(a.status, a.status.toLowerCase())}</td>
                        <td>${a.status !== 'CANCELLED' ? `<button class="btn btn-danger btn-sm" onclick="cancelAllocation(${a.id})">Cancel</button>` : '-'}</td>
                    </tr>`).join('')}
                </tbody>
            </table></div>
        </div>`);
    } catch (err) { showApiError(err); }
}

async function showAllocateModal(preEmpId, preDemandId, preEmpName) {
    const [employees, demands] = await Promise.all([apiFetch('/employees'), apiFetch('/demands')]);
    const activeEmps = employees.filter(e => e.employmentStatus === 'ACTIVE');
    const openDemands = demands.filter(d => d.status === 'OPEN' || d.status === 'IN_PROGRESS');
    openModal('Create Allocation', `
    <form id="allocForm">
        <div class="form-grid">
            <div class="form-group"><label>Employee *</label>
                <select id="af-emp">${activeEmps.map(e => `<option value="${e.id}" ${e.id == preEmpId ? 'selected' : ''}>${e.name} (${e.employeeCode})</option>`).join('')}</select>
            </div>
            <div class="form-group"><label>Project Demand *</label>
                <select id="af-demand">${openDemands.map(d => `<option value="${d.id}" ${d.id == preDemandId ? 'selected' : ''}>${d.projectName} - ${d.role}</option>`).join('')}</select>
            </div>
            <div class="form-group"><label>Start Date *</label><input type="date" id="af-start" required></div>
            <div class="form-group"><label>End Date *</label><input type="date" id="af-end" required></div>
            <div class="form-group"><label>Allocation % *</label><input type="number" id="af-alloc" min="1" max="100" value="100" required></div>
            <div class="form-group"><label>Approved By * (required)</label><input type="text" id="af-approver" placeholder="e.g. HR Director" required></div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">${IC.check} Confirm Allocation</button>
        </div>
    </form>`);
    document.getElementById('allocForm').addEventListener('submit', async e => {
        e.preventDefault();
        try {
            await apiFetch('/allocations', 'POST', {
                employeeId: parseInt(document.getElementById('af-emp').value),
                demandId: parseInt(document.getElementById('af-demand').value),
                startDate: document.getElementById('af-start').value,
                endDate: document.getElementById('af-end').value,
                allocationPercent: parseInt(document.getElementById('af-alloc').value),
                approvedBy: document.getElementById('af-approver').value
            });
            closeModal(); showToast('Allocation confirmed!'); renderAllocations();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

async function cancelAllocation(id) {
    if (!confirm('Cancel this allocation? History will be retained and capacity released.')) return;
    try {
        await apiFetch(`/allocations/${id}/cancel`, 'PUT', { reason: 'Cancelled by user via UI' });
        showToast('Allocation cancelled. Capacity released.'); renderAllocations();
    } catch (err) { showToast(err.message, 'error'); }
}

// ============================================================
// AI ASSISTANT
// ============================================================
async function renderAI() {
    showLoading();
    const demands = await apiFetch('/demands');
    const demandOpts = demands.map(d => `<option value="${d.id}">${d.projectName} - ${d.role}</option>`).join('');
    setPageContent(`
    <div class="section-title" style="margin-bottom:4px">AI Staffing Assistant</div>
    <div class="simulation-notice">
        ${IC.warn} <strong>SIMULATION MODE:</strong> This AI agent simulates an LLM-based agentic workflow using deterministic Java logic.
        In production, a live AI model (e.g., Google Gemini) would power the tool calls with real reasoning.
    </div>
    <div class="grid-2" style="gap:20px;align-items:flex-start">
        <div>
            <div class="card" style="margin-bottom:16px">
                <div class="card-title" style="margin-bottom:12px">Configure Agent</div>
                <div class="form-group" style="margin-bottom:12px">
                    <label>Select Demand for Analysis</label>
                    <select id="ai-demand">${demandOpts || '<option>No demands available</option>'}</select>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="runAgent()">${IC.run} Run Staffing Agent</button>
            </div>
            <div class="card">
                <div class="card-title" style="margin-bottom:12px">Ask Agent</div>
                <div class="form-group">
                    <textarea id="ai-question" placeholder="e.g. Who is the best candidate? What skills are missing?" style="min-height:100px"></textarea>
                </div>
                <button class="btn btn-secondary" style="width:100%;margin-top:8px" onclick="runAgent()">Send</button>
            </div>
        </div>
        <div id="aiOutput">
            <div class="empty-state">
                <div class="empty-icon" style="display:flex;justify-content:center;opacity:0.4">${IC.bot}</div>
                <div class="empty-title">Run the agent to see results</div>
                <div class="empty-desc">Select a demand and click Run Staffing Agent</div>
            </div>
        </div>
    </div>`);
}

async function runAgent() {
    const demandId = document.getElementById('ai-demand').value;
    const question = document.getElementById('ai-question').value;
    if (!demandId) { showToast('Please select a demand', 'warning'); return; }
    document.getElementById('aiOutput').innerHTML = '<div class="loading-overlay"><div class="spinner"></div><span>Agent is analyzing...</span></div>';
    try {
        const res = await apiFetch('/ai/staffing-advice', 'POST', { demandId: parseInt(demandId), question });
        document.getElementById('aiOutput').innerHTML = `
        <div class="card" style="margin-bottom:16px">
            <div class="simulation-notice">${res.simulationNotice}</div>
            <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:var(--text-primary)">${res.answer}</div>
        </div>
        <div class="card" style="margin-bottom:16px">
            <div class="card-title" style="margin-bottom:12px">Agent Tool Calls</div>
            <div class="tool-calls-list">
                ${res.toolCalls.map(tc => `
                <div class="tool-call-item">
                    <div class="tool-call-name">${IC.run} ${tc.toolName}(${Object.entries(tc.inputs||{}).map(([k,v]) => `${k}="${v}"`).join(', ')})</div>
                    <div class="tool-call-result">${tc.success ? IC.check : IC.x} ${tc.result}</div>
                </div>`).join('')}
            </div>
        </div>
        <div class="card">
            <div class="card-title" style="margin-bottom:12px">Agent Limitations</div>
            <ul style="font-size:13px;color:var(--text-secondary);padding-left:20px;line-height:2">
                ${res.limitations.map(l => `<li>${l}</li>`).join('')}
            </ul>
        </div>`;
    } catch (err) {
        document.getElementById('aiOutput').innerHTML = `<div class="empty-state"><div class="empty-title">Error: ${err.message}</div></div>`;
    }
}

// ============================================================
// HELPERS
// ============================================================
function showApiError(err) {
    setPageContent(`<div class="empty-state">
        <div class="empty-icon" style="display:flex;justify-content:center">${IC.warn}</div>
        <div class="empty-title">Cannot reach API server</div>
        <div class="empty-desc">Make sure the Spring Boot backend is running.<br>
        Run: <code>mvn spring-boot:run</code> in the project root.<br><br>
        Error: ${err.message}</div>
    </div>`);
}

function renderPage(page) {
    const pages = { dashboard: renderDashboard, demands: renderDemands, employees: renderEmployees,
        skills: renderSkills, search: renderSearch, allocations: renderAllocations, ai: renderAI };
    if (pages[page]) pages[page]();
}

async function checkApiStatus() {
    try {
        await fetch('http://localhost:8080/api/employees');
        document.getElementById('statusDot').className = 'status-dot online';
        document.getElementById('statusText').textContent = 'API Online';
    } catch {
        document.getElementById('statusDot').className = 'status-dot offline';
        document.getElementById('statusText').textContent = 'API Offline';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => { e.preventDefault(); router.navigate(link.dataset.page); });
    });
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', e => {
        if (e.target === document.getElementById('modalOverlay')) closeModal();
    });
    checkApiStatus();
    setInterval(checkApiStatus, 10000);
    renderPage('dashboard');
});

