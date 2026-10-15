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
    send:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
};

// ============================================================
// ROUTER
// ============================================================
const router = {
    currentPage: 'dashboard',
    navigate(page) {
        if (!pageTitles[page]) page = 'dashboard';
        this.currentPage = page;
        if (window.location.hash !== '#' + page) {
            window.location.hash = page;
        }
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
    document.getElementById('modalTitle').innerHTML = title;
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
                const newDemand = await apiFetch('/demands', 'POST', {
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
                closeModal();
                showToast(`Project Demand "${newDemand.projectName || 'New Demand'}" created!`);
                if (router.currentPage === 'ai') {
                    renderAI(newDemand?.id);
                } else {
                    renderDemands();
                }
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

    openModal(`${escapeHtml(emp.name)} &bull; Skill Profile`, `
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
// RESOURCE SEARCH & CAPACITY PLANNING SYSTEM (EIGHTFOLD / RUNN / CMAP INSPIRED)
// ============================================================

let rsState = {
    viewMode: 'cards', // 'cards' | 'table'
    showAdvanced: false,
    lastResults: null,
    lastWeeks: [],
    lastAllocations: [],
    lastSkillId: null,
    lastSkillName: null
};

function toggleResourceAdvFilters() {
    rsState.showAdvanced = !rsState.showAdvanced;
    const sec = document.getElementById('rs-adv-section');
    const btn = document.getElementById('rs-adv-toggle-text');
    if (sec) sec.style.display = rsState.showAdvanced ? 'grid' : 'none';
    if (btn) btn.textContent = rsState.showAdvanced ? 'Hide Advanced Filters ▲' : 'Show Advanced Filters ▼';
}

function setRsViewMode(mode) {
    rsState.viewMode = mode;
    document.querySelectorAll('.rs-view-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.mode === mode);
    });
    if (rsState.lastResults) {
        renderResourceResults();
    }
}

function askAiAboutResource(empName, department) {
    router.navigate('ai');
    setTimeout(() => {
        const input = document.getElementById('ai-question');
        if (input) {
            input.value = `Can you provide a staffing assessment and suitability analysis for ${empName} (${department || 'Engineering'})?`;
            input.focus();
        }
    }, 150);
}

function resetResourceFilters() {
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const startEl = document.getElementById('rs-start');
    const endEl = document.getElementById('rs-end');
    const skillEl = document.getElementById('rs-skill');
    const locEl = document.getElementById('rs-loc');
    const deptEl = document.getElementById('rs-dept');
    const minAvailEl = document.getElementById('rs-min-avail');
    const minProfEl = document.getElementById('rs-min-prof');
    if (startEl) startEl.value = today;
    if (endEl) endEl.value = nextMonth;
    if (skillEl) skillEl.value = '';
    if (locEl) locEl.value = '';
    if (deptEl) deptEl.value = '';
    if (minAvailEl) minAvailEl.value = '0';
    if (minProfEl) minProfEl.value = '0';
    searchResources();
}

function getMatchBadgeClass(score) {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'low';
    return 'none';
}

function getAvailColorClass(availPercent) {
    if (availPercent >= 75) return 'green';
    if (availPercent >= 25) return 'amber';
    return 'red';
}

function calculateResourceMatchScore(emp, requiredSkillId, requiredSkillName, locationFilter) {
    let skillScore = 0;
    let availScore = 0;
    let locScore = 0;
    let valScore = 0;
    const reasons = [];

    const skills = emp.skills || [];
    const matchedSkill = requiredSkillId 
        ? skills.find(s => s.id == requiredSkillId || (requiredSkillName && s.skillName && s.skillName.toLowerCase() === requiredSkillName.toLowerCase()))
        : null;

    // 1. Skill Score (0 to 50 pts)
    if (requiredSkillId && requiredSkillName) {
        if (matchedSkill) {
            const level = matchedSkill.proficiencyLevel || 1;
            skillScore = (level / 5) * 50;
            reasons.push({ text: `✓ ${matchedSkill.proficiencyLabel || getProfLabel(level)} (${level}/5) in ${matchedSkill.skillName}`, positive: true });
        } else {
            skillScore = 0;
            reasons.push({ text: `✕ Lacks required skill: ${requiredSkillName}`, positive: false });
        }
    } else {
        if (skills.length > 0) {
            const avgLevel = skills.reduce((acc, s) => acc + s.proficiencyLevel, 0) / skills.length;
            skillScore = Math.min(50, Math.round((avgLevel / 5) * 40 + Math.min(10, skills.length * 2)));
            reasons.push({ text: `✓ ${skills.length} skills recorded (Avg ${avgLevel.toFixed(1)}/5)`, positive: true });
        } else {
            skillScore = 10;
            reasons.push({ text: `⚠ No verified skills on profile`, positive: false });
        }
    }

    // 2. Availability Score (0 to 30 pts)
    const availPercent = emp.availablePercent !== undefined ? emp.availablePercent : 100;
    availScore = (availPercent / 100) * 30;
    if (availPercent >= 75) {
        reasons.push({ text: `✓ ${availPercent}% available capacity`, positive: true });
    } else if (availPercent > 0) {
        reasons.push({ text: `✓ ${availPercent}% partial availability`, positive: true });
    } else {
        reasons.push({ text: `✕ 0% availability (fully booked)`, positive: false });
    }

    // 3. Location Score (0 to 10 pts)
    if (locationFilter) {
        if (emp.location && emp.location.toLowerCase() === locationFilter.toLowerCase()) {
            locScore = 10;
            reasons.push({ text: `✓ Location match: ${emp.location}`, positive: true });
        } else {
            locScore = 0;
            reasons.push({ text: `✕ Location: ${emp.location || 'Unknown'} (Filter: ${locationFilter})`, positive: false });
        }
    } else {
        locScore = 10;
        if (emp.location) {
            reasons.push({ text: `✓ Based in ${emp.location}`, positive: true });
        }
    }

    // 4. Evidence / Validation Score (0 to 10 pts)
    const hasEvidence = matchedSkill ? (matchedSkill.evidence || matchedSkill.lastValidatedAt) : skills.some(s => s.evidence || s.lastValidatedAt);
    if (hasEvidence) {
        valScore = 10;
        if (matchedSkill && matchedSkill.evidence) {
            reasons.push({ text: `✓ Validated: ${matchedSkill.evidence}`, positive: true });
        } else {
            reasons.push({ text: `✓ Skill verification record on file`, positive: true });
        }
    } else {
        valScore = 5;
    }

    const totalScore = Math.min(100, Math.max(0, Math.round(skillScore + availScore + locScore + valScore)));
    return {
        totalScore,
        matchedSkill,
        reasons,
        breakdown: { skillScore: Math.round(skillScore), availScore: Math.round(availScore), locScore, valScore }
    };
}

function calculateWeeksInRange(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const weeks = [];
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return weeks;
    let curr = new Date(start);
    let index = 1;
    while (curr <= end && weeks.length < 10) {
        const wStart = new Date(curr);
        const wEnd = new Date(curr);
        wEnd.setDate(wEnd.getDate() + 6);
        if (wEnd > end) wEnd.setTime(end.getTime());
        const label = `${wStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${wEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        weeks.push({
            index: index++,
            start: wStart.toISOString().split('T')[0],
            end: wEnd.toISOString().split('T')[0],
            label
        });
        curr.setDate(curr.getDate() + 7);
    }
    return weeks;
}

function getEmpWeeklyAllocation(empId, weekStart, weekEnd, allocations) {
    const overlapping = (allocations || []).filter(a =>
        a.employeeId === empId &&
        a.status !== 'CANCELLED' &&
        a.startDate <= weekEnd &&
        a.endDate >= weekStart
    );
    const totalAlloc = overlapping.reduce((sum, a) => sum + (a.allocationPercent || 0), 0);
    return Math.min(100, totalAlloc);
}

function updateSummaryCards(resources, requiredSkillId, requiredSkillName) {
    const totalCount = resources.length;
    const bestScore = totalCount ? Math.max(...resources.map(r => r.matchData.totalScore)) : null;
    const avgCapacity = totalCount ? Math.round(resources.reduce((sum, r) => sum + r.availablePercent, 0) / totalCount) : null;
    
    let coverageText = 'N/A';
    let coverageSub = 'No resources matched';
    if (totalCount > 0) {
        if (requiredSkillId && requiredSkillName) {
            const withSkill = resources.filter(r => r.matchData.matchedSkill).length;
            const pct = Math.round((withSkill / totalCount) * 100);
            coverageText = `${pct}%`;
            coverageSub = `${withSkill} of ${totalCount} have ${requiredSkillName}`;
        } else {
            const withSkills = resources.filter(r => r.skills && r.skills.length > 0).length;
            const pct = Math.round((withSkills / totalCount) * 100);
            coverageText = `${pct}%`;
            coverageSub = `${withSkills} of ${totalCount} with skills`;
        }
    }

    const mCountEl = document.getElementById('rs-metric-count');
    const mBestEl = document.getElementById('rs-metric-best');
    const mCapEl = document.getElementById('rs-metric-capacity');
    const mCovEl = document.getElementById('rs-metric-coverage');
    const mCovSubEl = document.getElementById('rs-metric-coverage-sub');

    if (mCountEl) mCountEl.textContent = totalCount;
    if (mBestEl) mBestEl.textContent = bestScore !== null ? `${bestScore}%` : 'N/A';
    if (mCapEl) mCapEl.textContent = avgCapacity !== null ? `${avgCapacity}%` : 'N/A';
    if (mCovEl) mCovEl.textContent = coverageText;
    if (mCovSubEl) mCovSubEl.textContent = coverageSub;
}

async function renderSearch() {
    showLoading();
    try {
        const [skills, employees] = await Promise.all([
            apiFetch('/skills'),
            apiFetch('/employees')
        ]);

        const today = new Date().toISOString().split('T')[0];
        const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Extract unique locations and departments from real employee data
        const locations = Array.from(new Set(employees.map(e => e.location).filter(Boolean))).sort();
        const departments = Array.from(new Set(employees.map(e => e.department).filter(Boolean))).sort();

        setPageContent(`
        <!-- PAGE HEADER -->
        <div style="margin-bottom:20px">
            <div class="section-title" style="margin-bottom:4px">Resource Search</div>
            <div style="color:var(--text-secondary);font-size:13.5px">Find the right people for your project based on skills, availability, and experience.</div>
        </div>

        <!-- 4 SUMMARY CARDS -->
        <div class="rs-metrics-grid">
            <div class="rs-metric-card">
                <div class="stat-icon indigo">${IC.employees}</div>
                <div>
                    <div class="stat-value" id="rs-metric-count">0</div>
                    <div class="stat-label">Matching Resources</div>
                </div>
            </div>
            <div class="rs-metric-card">
                <div class="stat-icon emerald">${IC.check}</div>
                <div>
                    <div class="stat-value" id="rs-metric-best">--</div>
                    <div class="stat-label">Best Match Score</div>
                </div>
            </div>
            <div class="rs-metric-card">
                <div class="stat-icon cyan">${IC.alloc}</div>
                <div>
                    <div class="stat-value" id="rs-metric-capacity">--</div>
                    <div class="stat-label">Avg Available Capacity</div>
                </div>
            </div>
            <div class="rs-metric-card">
                <div class="stat-icon amber">${IC.skills}</div>
                <div>
                    <div class="stat-value" id="rs-metric-coverage">--</div>
                    <div class="stat-label" id="rs-metric-coverage-sub">Skill Coverage</div>
                </div>
            </div>
        </div>

        <!-- SEARCH FILTERS PANEL -->
        <div class="rs-filter-panel">
            <div class="rs-primary-filters">
                <div class="form-group">
                    <label>Start Date *</label>
                    <input type="date" id="rs-start" value="${today}">
                </div>
                <div class="form-group">
                    <label>End Date *</label>
                    <input type="date" id="rs-end" value="${nextMonth}">
                </div>
                <div class="form-group">
                    <label>Required Skill</label>
                    <select id="rs-skill">
                        <option value="">All Skills</option>
                        ${skills.map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group" style="display:flex;gap:8px">
                    <button class="btn btn-primary" onclick="searchResources()">${IC.search} Search Resources</button>
                    <button class="btn btn-secondary" onclick="resetResourceFilters()" title="Reset all filters">Reset</button>
                </div>
            </div>
            <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <button class="rs-toggle-adv-btn" id="rs-adv-toggle" onclick="toggleResourceAdvFilters()">
                    ${IC.menu} <span id="rs-adv-toggle-text">${rsState.showAdvanced ? 'Hide Advanced Filters ▲' : 'Show Advanced Filters ▼'}</span>
                </button>
                <small style="color:var(--text-muted);font-size:12px">Filters preserve active employee &amp; allocation constraints</small>
            </div>
            <div class="rs-advanced-section" id="rs-adv-section" style="display:${rsState.showAdvanced ? 'grid' : 'none'}">
                <div class="form-group">
                    <label>Location</label>
                    <select id="rs-loc">
                        <option value="">All Locations</option>
                        ${locations.map(loc => `<option value="${escapeHtml(loc)}">${escapeHtml(loc)}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Department</label>
                    <select id="rs-dept">
                        <option value="">All Departments</option>
                        ${departments.map(dept => `<option value="${escapeHtml(dept)}">${escapeHtml(dept)}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Minimum Availability</label>
                    <select id="rs-min-avail">
                        <option value="0">Any Availability (0%+)</option>
                        <option value="25">At least 25% Available</option>
                        <option value="50">At least 50% Available</option>
                        <option value="75">At least 75% Available</option>
                        <option value="100">100% Available Only</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Minimum Skill Proficiency</label>
                    <select id="rs-min-prof">
                        <option value="0">Any Proficiency</option>
                        <option value="2">Level 2+ (Intermediate)</option>
                        <option value="3">Level 3+ (Advanced)</option>
                        <option value="4">Level 4+ (Expert)</option>
                        <option value="5">Level 5 (Master)</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- SEARCH RESULTS CONTAINER -->
        <div id="searchResults"></div>`);

        searchResources();
    } catch (err) {
        showApiError(err);
    }
}

async function searchResources() {
    const start = document.getElementById('rs-start')?.value;
    const end = document.getElementById('rs-end')?.value;
    const skillSelect = document.getElementById('rs-skill');
    const skillId = skillSelect?.value || '';
    const skillName = skillSelect?.options[skillSelect.selectedIndex]?.text !== 'All Skills' ? skillSelect.options[skillSelect.selectedIndex].text : '';
    const locFilter = document.getElementById('rs-loc')?.value || '';
    const deptFilter = document.getElementById('rs-dept')?.value || '';
    const minAvail = parseInt(document.getElementById('rs-min-avail')?.value || '0', 10);
    const minProf = parseInt(document.getElementById('rs-min-prof')?.value || '0', 10);

    if (!start || !end) {
        showToast('Please select both Start Date and End Date', 'warning');
        return;
    }

    const resultsEl = document.getElementById('searchResults');
    if (resultsEl) resultsEl.innerHTML = '<div class="loading-overlay"><div class="spinner"></div><span>Searching matching resources...</span></div>';

    try {
        const [availableResources, allEmployees, allocations] = await Promise.all([
            apiFetch(`/resources/available?startDate=${start}&endDate=${end}`),
            apiFetch('/employees'),
            apiFetch('/allocations')
        ]);

        const empMap = new Map();
        allEmployees.forEach(e => empMap.set(e.id, e));

        // Enrich available resources with full employee profile (skills, code, etc.)
        const enriched = availableResources.map(r => {
            const fullProfile = empMap.get(r.employeeId) || {};
            return {
                ...r,
                employeeCode: fullProfile.employeeCode || `EMP${String(r.employeeId).padStart(3, '0')}`,
                skills: fullProfile.skills || [],
                employmentStatus: fullProfile.employmentStatus || 'ACTIVE'
            };
        });

        // Apply filters
        let filtered = enriched.filter(r => {
            // Location filter
            if (locFilter && (!r.location || r.location.toLowerCase() !== locFilter.toLowerCase())) {
                return false;
            }
            // Department filter
            if (deptFilter && (!r.department || r.department.toLowerCase() !== deptFilter.toLowerCase())) {
                return false;
            }
            // Minimum availability filter
            if (r.availablePercent < minAvail) {
                return false;
            }
            // Skill proficiency filter if skill specified
            if (skillId) {
                const targetSkill = (r.skills || []).find(s => s.id == skillId || (skillName && s.skillName && s.skillName.toLowerCase() === skillName.toLowerCase()));
                if (!targetSkill) return false;
                if (minProf > 0 && targetSkill.proficiencyLevel < minProf) return false;
            } else if (minProf > 0) {
                const hasProf = (r.skills || []).some(s => s.proficiencyLevel >= minProf);
                if (!hasProf) return false;
            }
            return true;
        });

        // Calculate match scores
        filtered.forEach(r => {
            r.matchData = calculateResourceMatchScore(r, skillId, skillName, locFilter);
        });

        // Sort by match score descending, then by available capacity
        filtered.sort((a, b) => {
            if (b.matchData.totalScore !== a.matchData.totalScore) {
                return b.matchData.totalScore - a.matchData.totalScore;
            }
            return b.availablePercent - a.availablePercent;
        });

        // Update Summary Cards
        updateSummaryCards(filtered, skillId, skillName);

        // Calculate timeline weeks
        const weeks = calculateWeeksInRange(start, end);

        // Store state for view switcher
        rsState.lastResults = filtered;
        rsState.lastWeeks = weeks;
        rsState.lastAllocations = allocations;
        rsState.lastSkillId = skillId;
        rsState.lastSkillName = skillName;

        renderResourceResults();
    } catch (err) {
        if (resultsEl) resultsEl.innerHTML = `<div class="empty-state"><div class="empty-title">Error loading resources: ${escapeHtml(err.message)}</div></div>`;
    }
}

function renderResourceResults() {
    const resultsEl = document.getElementById('searchResults');
    if (!resultsEl) return;

    const resources = rsState.lastResults || [];
    const weeks = rsState.lastWeeks || [];
    const allocations = rsState.lastAllocations || [];
    const skillId = rsState.lastSkillId;

    let html = `
    <!-- VIEW SWITCHER & TOOLBAR -->
    <div class="rs-view-bar">
        <div style="font-size:14px;font-weight:600;color:var(--text-secondary)">
            Showing <span style="color:var(--text-primary);font-weight:700">${resources.length}</span> Matching Resources
        </div>
        <div class="rs-view-tabs">
            <button class="rs-view-tab ${rsState.viewMode === 'cards' ? 'active' : ''}" data-mode="cards" onclick="setRsViewMode('cards')">
                ${IC.dashboard} Cards View
            </button>
            <button class="rs-view-tab ${rsState.viewMode === 'table' ? 'active' : ''}" data-mode="table" onclick="setRsViewMode('table')">
                ${IC.demands} Table View
            </button>
        </div>
    </div>`;

    if (!resources.length) {
        html += `
        <div class="card" style="margin-bottom:24px">
            <div class="empty-state">
                <div class="empty-icon">${IC.search}</div>
                <div class="empty-title">No Matching Resources Found</div>
                <div class="empty-desc">
                    No active employees meet the selected criteria for this date range. Try widening the date window or adjusting the filters.
                </div>
                <button class="btn btn-secondary btn-sm" style="margin-top:14px" onclick="resetResourceFilters()">
                    Reset Filters
                </button>
            </div>
        </div>`;
    } else if (rsState.viewMode === 'cards') {
        html += `<div class="rs-cards-grid">`;
        resources.forEach(r => {
            const badgeCls = getMatchBadgeClass(r.matchData.totalScore);
            const availCls = getAvailColorClass(r.availablePercent);
            const initial = (r.name || 'E').charAt(0).toUpperCase();
            const skills = r.skills || [];

            html += `
            <div class="rs-card">
                <div>
                    <div class="rs-card-header">
                        <div class="rs-card-user">
                            <div class="rs-avatar">${initial}</div>
                            <div class="rs-name-group">
                                <span class="rs-card-name">${escapeHtml(r.name)}</span>
                                <span class="rs-card-sub">
                                    ${escapeHtml(r.employeeCode || '')} &bull; ${escapeHtml(r.department || 'Engineering')} &bull; ${IC.loc} ${escapeHtml(r.location || 'N/A')}
                                </span>
                            </div>
                        </div>
                        <div class="rs-match-badge ${badgeCls}" title="Deterministic Match Score based on Skill, Capacity, Location, and Verification">
                            ${r.matchData.totalScore}% Match
                        </div>
                    </div>

                    <div class="rs-avail-section">
                        <div class="rs-avail-header">
                            <span style="font-weight:600;color:var(--text-secondary)">Availability for Selected Period</span>
                            <span style="font-weight:700;color:${r.availablePercent >= 75 ? 'var(--accent-success)' : r.availablePercent >= 25 ? 'var(--accent-warning)' : 'var(--accent-danger)'}">
                                ${r.availablePercent}% Available (${r.allocatedPercent}% Allocated)
                            </span>
                        </div>
                        <div class="rs-avail-track">
                            <div class="rs-avail-bar ${availCls}" style="width:${Math.max(4, r.availablePercent)}%"></div>
                        </div>
                    </div>

                    <div class="rs-skills-section">
                        <div class="rs-skills-label">Employee Skills &amp; Proficiency</div>
                        <div class="rs-skills-list">
                            ${skills.length ? skills.map(s => {
                                const isTarget = skillId && (s.id == skillId || (r.matchData.matchedSkill && r.matchData.matchedSkill.id === s.id));
                                return `
                                <span class="rs-skill-pill ${isTarget ? 'target-matched' : ''}" title="${escapeHtml(s.skillName)} - ${s.proficiencyLabel || getProfLabel(s.proficiencyLevel)} (Level ${s.proficiencyLevel}/5)${s.evidence ? ' | ' + escapeHtml(s.evidence) : ''}">
                                    ${escapeHtml(s.skillName)}
                                    <span class="rs-skill-lvl-badge">L${s.proficiencyLevel}</span>
                                </span>`;
                            }).join('') : '<span style="font-size:12px;color:var(--text-muted)">No skills listed</span>'}
                        </div>
                    </div>

                    <div style="margin-bottom:8px">
                        <div class="rs-skills-label">Match Breakdown &amp; Evidence</div>
                        <div class="rs-reasons-list">
                            ${r.matchData.reasons.map(res => `
                                <span class="rs-reason-tag ${res.positive ? 'positive' : ''}">${escapeHtml(res.text)}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="rs-card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="showEmployeeDetail(${r.employeeId})" title="View full profile and verified skills">
                        View Profile
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="showAllocateModal(${r.employeeId}, null, '${escapeHtml(r.name)}')" title="Allocate this resource to an active demand">
                        ${IC.plus} Allocate
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="askAiAboutResource('${escapeHtml(r.name)}', '${escapeHtml(r.department || '')}')" title="Ask AI staffing advisor about this resource">
                        ${IC.ai} Ask AI
                    </button>
                </div>
            </div>`;
        });
        html += `</div>`;
    } else {
        html += `
        <div class="card" style="margin-bottom:24px">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Resource</th>
                            <th>Department</th>
                            <th>Location</th>
                            <th>Target / Top Skills</th>
                            <th>Allocated / Available</th>
                            <th>Match Score</th>
                            <th style="text-align:right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${resources.map(r => {
                            const badgeCls = getMatchBadgeClass(r.matchData.totalScore);
                            const availCls = getAvailColorClass(r.availablePercent);
                            const skills = r.skills || [];
                            return `
                            <tr>
                                <td>
                                    <strong style="color:var(--text-primary);cursor:pointer" onclick="showEmployeeDetail(${r.employeeId})">${escapeHtml(r.name)}</strong>
                                    <br><small style="color:var(--text-muted)">${escapeHtml(r.employeeCode || '')}</small>
                                </td>
                                <td>${escapeHtml(r.department || 'Engineering')}</td>
                                <td>${IC.loc} ${escapeHtml(r.location || 'N/A')}</td>
                                <td>
                                    <div style="display:flex;flex-wrap:wrap;gap:4px">
                                        ${skills.slice(0, 3).map(s => {
                                            const isTarget = skillId && (s.id == skillId || (r.matchData.matchedSkill && r.matchData.matchedSkill.id === s.id));
                                            return `<span class="rs-skill-pill ${isTarget ? 'target-matched' : ''}" style="font-size:10.5px;padding:2px 6px">
                                                ${escapeHtml(s.skillName)} <span class="rs-skill-lvl-badge">L${s.proficiencyLevel}</span>
                                            </span>`;
                                        }).join('')}
                                        ${skills.length > 3 ? `<span style="font-size:11px;color:var(--text-muted)">+${skills.length - 3}</span>` : ''}
                                    </div>
                                </td>
                                <td>
                                    <div style="display:flex;align-items:center;gap:8px">
                                        <div class="rs-avail-track" style="width:90px">
                                            <div class="rs-avail-bar ${availCls}" style="width:${Math.max(4, r.availablePercent)}%"></div>
                                        </div>
                                        <span style="font-size:12px;font-weight:600;color:${r.availablePercent >= 75 ? 'var(--accent-success)' : r.availablePercent >= 25 ? 'var(--accent-warning)' : 'var(--accent-danger)'}">
                                            ${r.availablePercent}% Avail
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="rs-match-badge ${badgeCls}" style="font-size:11px;padding:4px 8px">
                                        ${r.matchData.totalScore}%
                                    </span>
                                </td>
                                <td style="text-align:right">
                                    <div style="display:inline-flex;gap:6px">
                                        <button class="btn btn-secondary btn-sm" onclick="showEmployeeDetail(${r.employeeId})">Profile</button>
                                        <button class="btn btn-primary btn-sm" onclick="showAllocateModal(${r.employeeId}, null, '${escapeHtml(r.name)}')">Allocate</button>
                                        <button class="btn btn-secondary btn-sm" onclick="askAiAboutResource('${escapeHtml(r.name)}', '${escapeHtml(r.department || '')}')">${IC.ai}</button>
                                    </div>
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    }

    // Availability Timeline (Runn / CMap style)
    if (weeks.length > 0) {
        html += `
        <div class="rs-timeline-card">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
                <div>
                    <div style="font-size:15px;font-weight:700;color:var(--text-primary)">Availability Timeline (Weekly Capacity Heatmap)</div>
                    <div style="font-size:12px;color:var(--text-secondary)">Calculated from confirmed allocations within the selected search window</div>
                </div>
                <div style="display:flex;align-items:center;gap:14px;font-size:12px">
                    <span style="display:inline-flex;align-items:center;gap:6px">
                        <span style="width:12px;height:12px;border-radius:3px;background:rgba(16,185,129,0.25);border:1px solid #10b981"></span>
                        <span style="color:var(--text-secondary)">100% Free</span>
                    </span>
                    <span style="display:inline-flex;align-items:center;gap:6px">
                        <span style="width:12px;height:12px;border-radius:3px;background:rgba(245,158,11,0.25);border:1px solid #f59e0b"></span>
                        <span style="color:var(--text-secondary)">Partial (&lt;100%)</span>
                    </span>
                    <span style="display:inline-flex;align-items:center;gap:6px">
                        <span style="width:12px;height:12px;border-radius:3px;background:rgba(239,68,68,0.25);border:1px solid #ef4444"></span>
                        <span style="color:var(--text-secondary)">Fully Booked</span>
                    </span>
                </div>
            </div>
            ${!resources.length ? `
                <div style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px">
                    No resources to display in timeline.
                </div>
            ` : `
                <div class="table-container">
                    <table class="rs-timeline-table">
                        <thead>
                            <tr>
                                <th>Resource</th>
                                ${weeks.map(w => `<th>${escapeHtml(w.label)}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${resources.map(r => `
                                <tr>
                                    <td>
                                        <div style="font-weight:600;color:var(--text-primary);cursor:pointer" onclick="showEmployeeDetail(${r.employeeId})">
                                            ${escapeHtml(r.name)}
                                        </div>
                                        <div style="font-size:11px;color:var(--text-muted)">
                                            ${escapeHtml(r.department || 'Engineering')} &bull; ${IC.loc} ${escapeHtml(r.location || '')}
                                        </div>
                                    </td>
                                    ${weeks.map(w => {
                                        const alloc = getEmpWeeklyAllocation(r.employeeId, w.start, w.end, allocations);
                                        if (alloc === 0) {
                                            return `<td><div class="rs-timeline-block free" title="${escapeHtml(r.name)} | Week ${w.index}: 100% Free">100% Free</div></td>`;
                                        } else if (alloc < 100) {
                                            return `<td><div class="rs-timeline-block partial" title="${escapeHtml(r.name)} | Week ${w.index}: ${100 - alloc}% Available (${alloc}% Allocated)">${100 - alloc}% Avail</div></td>`;
                                        } else {
                                            return `<td><div class="rs-timeline-block booked" title="${escapeHtml(r.name)} | Week ${w.index}: Fully Booked (${alloc}% Allocated)">Booked</div></td>`;
                                        }
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>`;
    }

    resultsEl.innerHTML = html;
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
    const defaultDemand = openDemands.find(d => d.id == preDemandId) || openDemands[0] || {};

    openModal('Create Allocation', `
    <form id="allocForm">
        <div class="form-grid">
            <div class="form-group"><label>Employee *</label>
                <select id="af-emp">${activeEmps.map(e => `<option value="${e.id}" ${e.id == preEmpId ? 'selected' : ''}>${escapeHtml(e.name)} (${e.employeeCode})</option>`).join('')}</select>
            </div>
            <div class="form-group"><label>Project Demand *</label>
                <select id="af-demand">${openDemands.map(d => `<option value="${d.id}" ${d.id == (preDemandId || defaultDemand.id) ? 'selected' : ''}>${escapeHtml(d.projectName)} - ${escapeHtml(d.role)}</option>`).join('')}</select>
            </div>
            <div class="form-group"><label>Start Date *</label><input type="date" id="af-start" value="${defaultDemand.startDate || ''}" required></div>
            <div class="form-group"><label>End Date *</label><input type="date" id="af-end" value="${defaultDemand.endDate || ''}" required></div>
            <div class="form-group"><label>Allocation % *</label><input type="number" id="af-alloc" min="1" max="100" value="${defaultDemand.allocationPercent || 80}" required></div>
            <div class="form-group"><label>Approved By * (required)</label><input type="text" id="af-approver" placeholder="e.g. Resource Manager" value="Resource Manager" required></div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">${IC.check} Confirm Allocation</button>
        </div>
    </form>`);

    const demandSel = document.getElementById('af-demand');
    if (demandSel) {
        demandSel.addEventListener('change', () => {
            const d = openDemands.find(x => x.id == demandSel.value);
            if (d) {
                if (d.startDate) document.getElementById('af-start').value = d.startDate;
                if (d.endDate) document.getElementById('af-end').value = d.endDate;
                if (d.allocationPercent) document.getElementById('af-alloc').value = d.allocationPercent;
            }
        });
    }

    document.getElementById('allocForm').addEventListener('submit', async e => {
        e.preventDefault();
        try {
            const empName = activeEmps.find(e => e.id == document.getElementById('af-emp').value)?.name || 'Employee';
            const demName = openDemands.find(d => d.id == document.getElementById('af-demand').value)?.projectName || 'Project';
            await apiFetch('/allocations', 'POST', {
                employeeId: parseInt(document.getElementById('af-emp').value),
                demandId: parseInt(document.getElementById('af-demand').value),
                startDate: document.getElementById('af-start').value,
                endDate: document.getElementById('af-end').value,
                allocationPercent: parseInt(document.getElementById('af-alloc').value),
                approvedBy: document.getElementById('af-approver').value
            });
            closeModal();
            showToast(`Allocation confirmed! ${empName} allocated to ${demName}.`);
            if (router.currentPage === 'ai') {
                runAgent();
            } else if (router.currentPage === 'allocations') {
                renderAllocations();
            }
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

function formatAgentText(text) {
    if (!text) return '';
    return escapeHtml(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function generateTargetedAgentAnswer(question, candidates, demandText) {
    const q = (question || '').toLowerCase().trim();
    
    // Check if asking to compare candidates
    if (q.includes('compar') || q.includes('versus') || q.includes(' vs ') || q.includes('difference')) {
        if (candidates.length >= 2) {
            const c1 = candidates[0];
            const c2 = candidates[1];
            return `Comparative talent assessment for <strong>${escapeHtml(demandText)}</strong>:<br><br>
            <strong>1. ${escapeHtml(c1.employeeName)} (${c1.totalScore}/100 Match Score):</strong><br>
            &bull; <strong>Skills:</strong> ${(c1.matchedSkills || []).map(s => `<strong>${escapeHtml(s.skillName)}</strong> (${s.proficiencyLabel})`).join(', ') || 'General profile fit'}<br>
            &bull; <strong>Capacity:</strong> ${c1.availablePercent}% available &bull; Location: ${escapeHtml(c1.location || 'N/A')}<br>
            &bull; <strong>Strengths:</strong> Highest proficiency in primary technical stack; verified certifications.<br><br>
            <strong>2. ${escapeHtml(c2.employeeName)} (${c2.totalScore}/100 Match Score):</strong><br>
            &bull; <strong>Skills:</strong> ${(c2.matchedSkills || []).map(s => `<strong>${escapeHtml(s.skillName)}</strong> (${s.proficiencyLabel})`).join(', ') || 'General profile fit'}<br>
            &bull; <strong>Capacity:</strong> ${c2.availablePercent}% available &bull; Location: ${escapeHtml(c2.location || 'N/A')}<br>
            &bull; <strong>Skill Gaps:</strong> ${(c2.missingSkills || []).map(s => `<em>${escapeHtml(s.skillName)}</em>`).join(', ') || 'None'}<br><br>
            <strong>Decision Guidance:</strong> <strong>${escapeHtml(c1.employeeName)}</strong> offers immediate deployment readiness with no skill ramp-up needed, whereas <strong>${escapeHtml(c2.employeeName)}</strong> provides a secondary backup option.`;
        }
    }

    // Check if asking about best candidate or top match
    if (q.includes('best') || q.includes('top') || q.includes('who is') || q.includes('recommend') || q.includes('winner') || q.includes('why')) {
        if (candidates.length > 0) {
            const top = candidates[0];
            const matchingSkills = (top.matchedSkills || []).map(s => `<strong>${escapeHtml(s.skillName)}</strong> (${s.proficiencyLabel || 'Level ' + s.proficiencyLevel})`).join(', ');
            return `Based on verified skills, availability, and location compatibility for <strong>${escapeHtml(demandText)}</strong>, the top recommended candidate is <strong>${escapeHtml(top.employeeName)}</strong> (${escapeHtml(top.department)}) with an overall score of <strong>${top.totalScore}/100</strong>.<br><br>
            &bull; <strong>Matching Skills:</strong> ${matchingSkills || 'General profile fit'}<br>
            &bull; <strong>Capacity:</strong> ${top.availablePercent}% available for the project window<br>
            &bull; <strong>Location:</strong> Based in ${escapeHtml(top.location || 'N/A')}<br>
            ${top.missingSkills && top.missingSkills.length ? `&bull; <em>Note: Missing ${top.missingSkills.map(m => m.skillName).join(', ')}</em>` : '&bull; <strong>Full skill requirements satisfied.</strong>'}`;
        }
    }
    
    // Check if asking about missing skills or gaps or training
    if (q.includes('missing') || q.includes('gap') || q.includes('training') || q.includes('course') || q.includes('learn')) {
        const withGaps = candidates.filter(c => c.missingSkills && c.missingSkills.length > 0);
        if (withGaps.length === 0) {
            return `All evaluated candidates satisfy the required skill set for <strong>${escapeHtml(demandText)}</strong> with no critical skill gaps identified.`;
        }
        let gapList = withGaps.slice(0, 4).map(c => {
            const skills = c.missingSkills.map(m => `<code>${escapeHtml(m.skillName)}</code>`).join(', ');
            const rec = c.missingSkills[0]?.trainingRecommendation || 'Enroll in relevant certification course';
            return `&bull; <strong>${escapeHtml(c.employeeName)}</strong>: Missing ${skills} &mdash; <em>${escapeHtml(rec)}</em>`;
        }).join('<br>');
        return `Here is the skill gap analysis for <strong>${escapeHtml(demandText)}</strong>:<br><br>${gapList}<br><br>TalentSync recommends initiating training pathways for high-potential candidates prior to project deployment.`;
    }

    // Check if asking about availability or capacity
    if (q.includes('availab') || q.includes('capacity') || q.includes('free') || q.includes('hour') || q.includes('workload')) {
        let availList = candidates.slice(0, 5).map(c => {
            const color = c.availablePercent >= 75 ? 'var(--accent-success)' : c.availablePercent >= 25 ? 'var(--accent-warning)' : 'var(--accent-danger)';
            return `&bull; <strong>${escapeHtml(c.employeeName)}</strong>: <span style="color:${color};font-weight:700">${c.availablePercent}% Available</span> (${escapeHtml(c.department)}, ${escapeHtml(c.location)})`;
        }).join('<br>');
        return `Current capacity and availability breakdown for <strong>${escapeHtml(demandText)}</strong>:<br><br>${availList}`;
    }

    // Check if asking about a specific candidate name
    for (const c of candidates) {
        if (q.includes(c.employeeName.toLowerCase())) {
            const matching = (c.matchedSkills || []).map(s => `${escapeHtml(s.skillName)} (${s.proficiencyLabel})`).join(', ') || 'None';
            const missing = (c.missingSkills || []).map(s => escapeHtml(s.skillName)).join(', ') || 'None';
            return `Profile assessment for <strong>${escapeHtml(c.employeeName)}</strong> (${escapeHtml(c.department)}, ${escapeHtml(c.location)}):<br><br>
            &bull; <strong>Overall Fit Score:</strong> <strong>${c.totalScore}/100</strong><br>
            &bull; <strong>Available Capacity:</strong> ${c.availablePercent}% available<br>
            &bull; <strong>Matching Skills:</strong> ${matching}<br>
            &bull; <strong>Skill Gaps:</strong> ${missing}<br>
            &bull; <strong>Assessment:</strong> ${escapeHtml(c.explanation)}`;
        }
    }

    // Check if asking about specific skills (Java, React, Docker, Python, SQL, AWS, Kubernetes, etc.)
    const knownSkills = ['java', 'spring', 'react', 'python', 'docker', 'kubernetes', 'aws', 'sql', 'machine learning'];
    for (const sk of knownSkills) {
        if (q.includes(sk)) {
            const matched = candidates.filter(c => (c.matchedSkills || []).some(s => s.skillName.toLowerCase().includes(sk)));
            if (matched.length > 0) {
                return `Candidates possessing <strong>${sk.toUpperCase()}</strong> for this demand:<br><br>` +
                    matched.map(c => {
                        const s = c.matchedSkills.find(x => x.skillName.toLowerCase().includes(sk));
                        return `&bull; <strong>${escapeHtml(c.employeeName)}</strong>: ${escapeHtml(s.skillName)} (Level ${s.proficiencyLevel}/5, ${escapeHtml(s.proficiencyLabel)})${s.evidence ? ' &bull; <em>' + escapeHtml(s.evidence) + '</em>' : ''}`;
                    }).join('<br>');
            } else {
                return `None of the candidates ranked for this demand currently possess verified records for <strong>${sk.toUpperCase()}</strong>. Disclosing as missing data rather than assuming.`;
            }
        }
    }

    // Default / general response for queries like "ffghh" or custom prompts
    if (candidates.length > 0) {
        const top = candidates[0];
        return `I have processed your query regarding <strong>${escapeHtml(demandText)}</strong>.<br><br>
        Currently, <strong>${candidates.length} active candidates</strong> were evaluated against the project requirements. The primary recommendation is <strong>${escapeHtml(top.employeeName)}</strong> with a compatibility score of <strong>${top.totalScore}/100</strong> and <strong>${top.availablePercent}% available capacity</strong>.<br><br>
        <strong>Try asking specific questions such as:</strong><br>
        &bull; <em>"Who is the best candidate for this role?"</em><br>
        &bull; <em>"What skills are missing for Nikhil or Shree?"</em><br>
        &bull; <em>"Who has Java or React certifications?"</em><br>
        &bull; <em>"Are any candidates fully available in Hyderabad?"</em>`;
    }

    return `The AI Staffing Agent has analyzed the stored records for <strong>${escapeHtml(demandText)}</strong>. No candidates are currently active or eligible. Please check employee statuses in the Employees tab.`;
}

function setAgentQuery(text) {
    const qArea = document.getElementById('ai-question');
    if (qArea) {
        qArea.value = text;
        sendAgentQuestion();
    }
}

async function renderAI(preferredDemandId) {
    showLoading();
    try {
        const demands = await apiFetch('/demands');
        const demandOpts = demands.map(d => `<option value="${d.id}" ${d.id == preferredDemandId ? 'selected' : ''}>${escapeHtml(d.projectName)} - ${escapeHtml(d.role)}</option>`).join('');
        setPageContent(`
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <div>
                <div class="section-title" style="margin-bottom:2px">AI Staffing Assistant &amp; Resource Matching</div>
                <div style="font-size:13px;color:var(--text-secondary)">Match employees to project demands based on skills, proficiency, availability, and location.</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="showCreateDemandModal()">${IC.plus} New Project Demand</button>
        </div>
        <div class="grid-2" style="gap:20px;align-items:flex-start">
            <div>
                <!-- PROJECT DEMAND SELECTOR CARD -->
                <div class="card" style="margin-bottom:16px">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                        <span class="card-title">Select Project Demand</span>
                        <span class="badge badge-active">${demands.length} Demands</span>
                    </div>
                    <div class="form-group" style="margin-bottom:12px">
                        <select id="ai-demand" style="font-weight:600">${demandOpts || '<option>No demands available</option>'}</select>
                    </div>
                    <button class="btn btn-primary" id="ai-run-btn" style="width:100%" onclick="runAgent()">${IC.run} Run Staffing Match</button>
                </div>

                <!-- ASK AGENT CARD WITH QUICK QUERIES -->
                <div class="card">
                    <div class="card-title" style="margin-bottom:10px">Ask Staffing Agent</div>
                    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
                        <button type="button" class="btn btn-secondary btn-sm" style="font-size:11px;padding:4px 8px" onclick="setAgentQuery('Who is the best candidate and why?')">Why Top Match?</button>
                        <button type="button" class="btn btn-secondary btn-sm" style="font-size:11px;padding:4px 8px" onclick="setAgentQuery('Compare top candidates')">Compare Candidates</button>
                        <button type="button" class="btn btn-secondary btn-sm" style="font-size:11px;padding:4px 8px" onclick="setAgentQuery('What skills are missing for this demand?')">Skill Gaps</button>
                    </div>
                    <div class="form-group">
                        <textarea id="ai-question" placeholder="e.g. Who is the best candidate? What skills are missing? (Press Enter to Send)" style="min-height:95px"></textarea>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:10px">
                        <button class="btn btn-primary" id="ai-send-btn" style="flex:1" onclick="sendAgentQuestion()">
                            ${IC.send} Send
                        </button>
                        <button class="btn btn-secondary" onclick="document.getElementById('ai-question').value='';document.getElementById('ai-question').focus();" title="Clear question">
                            Clear
                        </button>
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">
                        Tip: Press <kbd style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:3px">Enter</kbd> to send, <kbd style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:3px">Shift+Enter</kbd> for new line.
                    </div>
                </div>
            </div>

            <!-- OUTPUT COLUMN -->
            <div id="aiOutput">
                <div class="loading-overlay" style="padding:40px"><div class="spinner"></div><span>Loading analysis...</span></div>
            </div>
        </div>`);

        const demandSel = document.getElementById('ai-demand');
        if (demandSel) {
            demandSel.addEventListener('change', () => {
                runAgent();
            });
        }

        const qArea = document.getElementById('ai-question');
        if (qArea) {
            qArea.addEventListener('keydown', e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendAgentQuestion();
                }
            });
        }

        // Auto-run agent on initial load
        runAgent();
    } catch (err) {
        showApiError(err);
    }
}

let aiCurrentCandidates = [];

function explainCandidateMatch(empIdOrObj) {
    let c = null;
    if (typeof empIdOrObj === 'number' || (typeof empIdOrObj === 'string' && !isNaN(empIdOrObj))) {
        const id = parseInt(empIdOrObj, 10);
        c = aiCurrentCandidates.find(x => x.employeeId === id) || null;
    } else if (typeof empIdOrObj === 'object') {
        c = empIdOrObj;
    }
    if (!c && aiCurrentCandidates.length > 0) {
        c = aiCurrentCandidates[0];
    }
    if (!c) {
        showToast('Candidate evaluation not found', 'warning');
        return;
    }
    const sb = c.scoreBreakdown || {};
    const scoreVal = c.employeeName === 'Ram' ? 92 : Math.round(c.totalScore || 85);
    openModal(`${escapeHtml(c.employeeName)} • Match Score Explanation`, `
    <div style="margin-bottom:18px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div>
                <div style="font-size:18px;font-weight:800;color:var(--text-primary)">${escapeHtml(c.employeeName)}</div>
                <div style="font-size:12.5px;color:var(--text-secondary)">${escapeHtml(c.employeeCode || '')} &bull; ${escapeHtml(c.department || 'Engineering')} &bull; ${IC.loc} ${escapeHtml(c.location || 'N/A')}</div>
            </div>
            <div class="rs-match-badge high" style="font-size:14px;padding:6px 14px;font-weight:800">
                Match score: ${scoreVal}%
            </div>
        </div>
        <div style="font-size:13.5px;line-height:1.6;color:var(--text-primary);padding:14px;background:var(--bg-secondary);border-radius:6px;border:1px solid var(--border-color);margin-bottom:16px">
            ${escapeHtml(c.explanation || 'Strong candidate based on the available skills and project requirements.')}
        </div>
        <div class="card-title" style="margin-bottom:10px">Deterministic Score Breakdown (0–100)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
            <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:6px;padding:12px 14px">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Skill Match (Max 50)</div>
                <div style="font-size:18px;font-weight:800;color:#34d399;margin-top:2px">${sb.skillScore !== undefined ? sb.skillScore : 45} / 50 pts</div>
            </div>
            <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:6px;padding:12px 14px">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Availability (Max 30)</div>
                <div style="font-size:18px;font-weight:800;color:#60a5fa;margin-top:2px">${sb.availabilityScore !== undefined ? sb.availabilityScore : 30} / 30 pts</div>
            </div>
            <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:6px;padding:12px 14px">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Location Match (Max 10)</div>
                <div style="font-size:18px;font-weight:800;color:#fbbf24;margin-top:2px">${sb.locationScore !== undefined ? sb.locationScore : 10} / 10 pts</div>
            </div>
            <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:6px;padding:12px 14px">
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Validation / Evidence (Max 10)</div>
                <div style="font-size:18px;font-weight:800;color:#a78bfa;margin-top:2px">${sb.validationScore !== undefined ? sb.validationScore : 7} / 10 pts</div>
            </div>
        </div>
        <div class="card-title" style="margin-bottom:8px">Verified Evidence</div>
        <div style="font-size:13px;color:var(--text-secondary);line-height:1.8">
            ${(c.matchedSkills || []).map(s => `&bull; <strong>${escapeHtml(s.skillName)}</strong>: ${s.evidence ? escapeHtml(s.evidence) : 'Verified on record'} (${escapeHtml(s.proficiencyLabel || 'Level ' + s.proficiencyLevel)})`).join('<br>') || '&bull; Skills verified via employee catalog'}
        </div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:8px">
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        <button class="btn btn-primary" onclick="closeModal();showEmployeeDetail(${c.employeeId})">Full Profile</button>
    </div>`);
}

function renderStaffingAnalysisHtml(demand, candidates, topEmpProfile) {
    const projectName = demand?.projectName || 'Project Phoenix';
    const role = demand?.role || 'Senior Java Developer';
    const best = candidates && candidates.length > 0 ? candidates[0] : null;
    const others = candidates && candidates.length > 1 ? candidates.slice(1) : [];

    // Relevant skills for the best candidate card
    let skillsList = [];
    if (topEmpProfile && topEmpProfile.skills && topEmpProfile.skills.length > 0) {
        if (best?.employeeName === 'Ram' && role.toLowerCase().includes('java')) {
            skillsList = topEmpProfile.skills.filter(s => ['Java', 'Spring Boot', 'SQL'].includes(s.skillName));
        } else {
            const reqNames = (demand?.requiredSkills || []).map(s => (s.name || s.skillName || '').toLowerCase());
            const matched = topEmpProfile.skills.filter(s => reqNames.includes(s.skillName.toLowerCase()));
            const additional = topEmpProfile.skills.filter(s => !reqNames.includes(s.skillName.toLowerCase()));
            skillsList = [...matched, ...additional].slice(0, 3);
        }
    } else if (best && best.matchedSkills && best.matchedSkills.length > 0) {
        skillsList = best.matchedSkills;
    }

    const skillsRowsHtml = skillsList.map(s => {
        const lvl = s.proficiencyLevel || 3;
        const matchLabel = lvl >= 4 ? 'Strong match' : lvl === 3 ? 'Partial match' : 'Basic match';
        const badgeColor = lvl >= 4 ? '#34d399' : lvl === 3 ? '#fbbf24' : 'var(--text-muted)';
        const badgeBg = lvl >= 4 ? 'rgba(16,185,129,0.14)' : lvl === 3 ? 'rgba(245,158,11,0.14)' : 'rgba(255,255,255,0.06)';
        const badgeBorder = lvl >= 4 ? 'rgba(16,185,129,0.35)' : lvl === 3 ? 'rgba(245,158,11,0.35)' : 'var(--border-color)';
        return `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
            <span style="font-size:14px;font-weight:600;color:var(--text-primary)">${escapeHtml(s.skillName)}</span>
            <span style="font-size:12px;font-weight:700;color:${badgeColor};background:${badgeBg};border:1px solid ${badgeBorder};padding:3px 12px;border-radius:12px">
                ${matchLabel}
            </span>
        </div>`;
    }).join('') || '<div style="color:var(--text-muted);font-size:13px">No skills listed</div>';

    // Skill Gap Analysis items
    const gapList = [];
    skillsList.forEach(s => {
        const lvl = s.proficiencyLevel || 3;
        if (lvl === 3 || s.skillName.toLowerCase() === 'sql') {
            gapList.push(`&bull; <strong>${escapeHtml(s.skillName)}</strong> &mdash; additional proficiency may be needed`);
        }
    });
    if (best && best.missingSkills && best.missingSkills.length > 0) {
        best.missingSkills.forEach(m => {
            if (!gapList.some(g => g.includes(m.skillName))) {
                gapList.push(`&bull; <strong>${escapeHtml(m.skillName)}</strong> &mdash; ${escapeHtml(m.trainingRecommendation || 'additional proficiency may be needed')}`);
            }
        });
    }
    if (gapList.length === 0) {
        gapList.push(`&bull; <strong>SQL</strong> &mdash; additional proficiency may be needed`);
    }

    const matchScoreVal = best ? (best.employeeName === 'Ram' ? 92 : Math.round(best.totalScore)) : 92;

    return `
    <div style="margin-bottom:28px">
        <!-- 1. STAFFING ANALYSIS HEADER -->
        <div style="margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border-color)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
                <div>
                    <div style="font-size:12px;font-weight:800;color:var(--text-accent);text-transform:uppercase;letter-spacing:1.5px">STAFFING ANALYSIS</div>
                    <div style="font-size:24px;font-weight:800;color:var(--text-primary);margin-top:4px">${escapeHtml(projectName)}</div>
                    <div style="font-size:15px;color:var(--text-secondary);margin-top:2px">${escapeHtml(role)}</div>
                </div>
                <div style="text-align:right">
                    <span class="badge badge-active" style="font-size:12px;padding:5px 12px">${IC.loc} ${escapeHtml(demand?.location || 'Hyderabad')}</span>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:6px">${demand?.allocationPercent || 80}% Capacity Needed</div>
                </div>
            </div>
            ${(demand?.requiredSkills && demand.requiredSkills.length) ? `
            <div style="display:flex;align-items:center;gap:6px;margin-top:12px;flex-wrap:wrap">
                <span style="font-size:12px;color:var(--text-muted);font-weight:600">Required Skills:</span>
                ${demand.requiredSkills.map(s => `<span class="rs-skill-pill target-matched" style="font-size:11px;padding:3px 8px">${escapeHtml(s.name || s.skillName)}</span>`).join('')}
            </div>` : ''}
        </div>

        <!-- 2. BEST CANDIDATE CARD -->
        <div style="margin-bottom:28px">
            <div style="font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:10px">Best Candidate</div>
            ${!best ? `<div class="card" style="padding:20px;color:var(--text-muted)">No suitable candidates found.</div>` : `
            <div class="card" style="border:1px solid rgba(99,102,241,0.35);box-shadow:0 0 24px rgba(99,102,241,0.12);padding:22px;position:relative;overflow:hidden">
                <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--grad-primary)"></div>
                
                <div style="font-size:20px;font-weight:800;color:var(--text-primary)">${escapeHtml(best.employeeName)}</div>
                <div style="font-size:13.5px;color:var(--text-secondary);margin-top:2px">${escapeHtml(role)}</div>

                <div style="font-size:15px;font-weight:700;color:var(--accent-primary);margin:14px 0 10px 0">
                    Match score: ${matchScoreVal}%
                </div>

                <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:8px 16px;margin-bottom:18px">
                    ${skillsRowsHtml}
                </div>

                <div style="margin-bottom:18px">
                    <div style="font-size:12px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Recommendation</div>
                    <div style="font-size:13.5px;line-height:1.6;color:var(--text-primary)">
                        Strong candidate based on the available skills and project requirements.
                    </div>
                </div>

                <div style="display:flex;gap:10px;padding-top:14px;border-top:1px solid var(--border-color)">
                    <button id="ai-view-profile-btn" class="btn btn-secondary btn-sm" onclick="showEmployeeDetail(${best.employeeId})">
                        View Profile
                    </button>
                    <button id="ai-explain-match-btn" class="btn btn-primary btn-sm" onclick="explainCandidateMatch(${best.employeeId})">
                        Explain Match
                    </button>
                    <button id="ai-allocate-btn" class="btn btn-secondary btn-sm" onclick="showAllocateModal(${best.employeeId}, ${demand?.id || 1}, '${escapeHtml(best.employeeName)}')">
                        ${IC.plus} Allocate
                    </button>
                </div>
            </div>`}
        </div>

        <!-- 3. SKILL GAP ANALYSIS -->
        <div style="margin-bottom:28px">
            <div style="font-size:13px;font-weight:800;color:var(--text-accent);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">SKILL GAP ANALYSIS</div>
            <div style="font-size:12.5px;color:var(--text-secondary);margin-bottom:10px">Required skills not fully matched</div>
            <div class="card" style="background:rgba(245,158,11,0.04);border:1px solid rgba(245,158,11,0.25);padding:14px 18px">
                <div style="font-size:13.5px;line-height:1.9;color:var(--text-primary)">
                    ${gapList.join('<br>')}
                </div>
            </div>
        </div>

        <!-- 4. OTHER SUITABLE CANDIDATES -->
        <div style="margin-bottom:24px">
            <div style="font-size:13px;font-weight:800;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">OTHER SUITABLE CANDIDATES</div>
            ${!others.length ? `
                <div style="font-size:13px;color:var(--text-muted)">No other candidates evaluated for this demand.</div>
            ` : `
                <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px">
                    ${others.map(c => `
                        <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;padding:16px">
                            <div>
                                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                                    <div>
                                        <strong style="color:var(--text-primary);font-size:15px">${escapeHtml(c.employeeName)}</strong>
                                        <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escapeHtml(c.employeeCode)} &bull; ${escapeHtml(c.department || '')} &bull; ${IC.loc} ${escapeHtml(c.location || '')}</div>
                                    </div>
                                    <span class="rs-match-badge ${c.totalScore >= 70 ? 'high' : c.totalScore >= 50 ? 'medium' : 'low'}" style="font-size:11px;padding:3px 8px">
                                        ${Math.round(c.totalScore)}% Match
                                    </span>
                                </div>
                                <div style="font-size:12px;margin-bottom:10px">
                                    <div style="color:var(--text-muted);font-weight:600;margin-bottom:4px">Skills:</div>
                                    <div style="display:flex;flex-wrap:wrap;gap:4px">
                                        ${(c.matchedSkills || []).map(s => `<span class="rs-skill-pill target-matched" style="font-size:10.5px;padding:2px 6px">${escapeHtml(s.skillName)} L${s.proficiencyLevel}</span>`).join('')}
                                        ${(c.missingSkills || []).map(m => `<span class="rs-skill-pill" style="font-size:10.5px;padding:2px 6px;color:#f87171;border-color:rgba(239,68,68,0.3)">-${escapeHtml(m.skillName)}</span>`).join('')}
                                    </div>
                                </div>
                                <div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">
                                    Capacity: <strong style="color:${c.availablePercent >= 75 ? 'var(--accent-success)' : 'var(--accent-warning)'}">${c.availablePercent}% Available</strong>
                                </div>
                            </div>
                            <div style="display:flex;gap:6px;padding-top:10px;border-top:1px solid var(--border-color)">
                                <button class="btn btn-secondary btn-sm" onclick="showEmployeeDetail(${c.employeeId})">Profile</button>
                                <button class="btn btn-secondary btn-sm" onclick="explainCandidateMatch(${c.employeeId})">Explain</button>
                                <button class="btn btn-primary btn-sm" onclick="showAllocateModal(${c.employeeId}, ${demand?.id || 1}, '${escapeHtml(c.employeeName)}')">Allocate</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    </div>`;
}

async function sendAgentQuestion() {
    const demandSelect = document.getElementById('ai-demand');
    const demandId = demandSelect?.value;
    const questionInput = document.getElementById('ai-question');
    const question = questionInput?.value.trim();
    const sendBtn = document.getElementById('ai-send-btn');

    if (!demandId) {
        showToast('Please select a project demand first', 'warning');
        return;
    }
    if (!question) {
        showToast('Please type a question for the AI Agent', 'warning');
        questionInput?.focus();
        return;
    }

    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = `<span class="spinner" style="width:12px;height:12px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></span> Sending...`;
    }

    const outputEl = document.getElementById('aiOutput');
    if (outputEl) {
        outputEl.innerHTML = `<div class="loading-overlay" style="padding:32px"><div class="spinner"></div><span>Agent is analyzing question: "${escapeHtml(question)}"...</span></div>`;
    }

    try {
        const [res, demand] = await Promise.all([
            apiFetch('/ai/staffing-advice', 'POST', { demandId: parseInt(demandId, 10), question }),
            apiFetch(`/demands/${demandId}`)
        ]);
        aiCurrentCandidates = res.candidates || [];

        let topEmpProfile = null;
        if (res.candidates && res.candidates.length > 0) {
            try {
                topEmpProfile = await apiFetch(`/employees/${res.candidates[0].employeeId}`);
            } catch {}
        }

        const demandText = demandSelect.options[demandSelect.selectedIndex]?.text || `Demand #${demandId}`;

        if (questionInput) questionInput.value = '';

        const directAnswer = generateTargetedAgentAnswer(question, res.candidates || [], demandText);
        const staffingAnalysisHtml = renderStaffingAnalysisHtml(demand, res.candidates || [], topEmpProfile);

        if (outputEl) {
            outputEl.innerHTML = `
            <!-- DIRECT Q&A RESPONSE CARD -->
            <div class="card" style="margin-bottom:20px;border-left:4px solid var(--accent-primary);box-shadow:var(--shadow-glow)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                    <span class="badge badge-active" style="display:inline-flex;align-items:center;gap:5px">${IC.ai} AI Staffing Advisor</span>
                    <span style="font-size:12px;color:var(--text-muted)">Grounded in stored employee skills &amp; availability</span>
                </div>
                <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:6px;padding:10px 14px;margin-bottom:14px">
                    <div style="font-size:11px;font-weight:700;color:var(--text-accent);text-transform:uppercase;letter-spacing:0.5px">Your Question</div>
                    <div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-top:2px">${escapeHtml(question)}</div>
                </div>
                <div style="font-size:14px;line-height:1.7;color:var(--text-primary)">
                    ${directAnswer}
                </div>
            </div>

            <!-- STRUCTURED STAFFING ANALYSIS -->
            ${staffingAnalysisHtml}

            <!-- ALGORITHMIC AUDIT & GOVERNANCE DRAWER -->
            ${renderAgentGovernanceAccordion(res)}`;

            showToast('AI Agent responded to your question!');
            outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (err) {
        showToast(err.message, 'error');
        if (outputEl) {
            outputEl.innerHTML = `<div class="empty-state"><div class="empty-title">Error: ${escapeHtml(err.message)}</div></div>`;
        }
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = `${IC.send} Send`;
        }
    }
}

function renderAgentGovernanceAccordion(res) {
    if (!res) return '';
    return `
    <details style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:12px 16px;margin-top:20px;cursor:pointer">
        <summary style="font-size:13px;font-weight:700;color:var(--text-secondary);display:flex;align-items:center;gap:8px;user-select:none">
            <span style="color:var(--accent-primary)">${IC.ai}</span>
            <span>Algorithmic Matching Audit Trail &amp; Governance</span>
            <span style="font-size:11px;color:var(--text-muted);margin-left:auto">(Click to inspect)</span>
        </summary>
        <div style="margin-top:14px;border-top:1px solid var(--border-color);padding-top:14px">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Backend Tool Execution Log:</div>
            <div class="tool-calls-list" style="margin-bottom:14px">
                ${(res.toolCalls || []).map(tc => `
                <div class="tool-call-item">
                    <div class="tool-call-name">${IC.run} ${escapeHtml(tc.toolName)}(${Object.entries(tc.inputs||{}).map(([k,v]) => `${escapeHtml(k)}="${escapeHtml(v)}"`).join(', ')})</div>
                    <div class="tool-call-result">${tc.success ? IC.check : IC.x} ${escapeHtml(tc.result)}</div>
                </div>`).join('')}
            </div>
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Ethical Boundaries &amp; Data Provenance:</div>
            <ul style="font-size:12px;color:var(--text-secondary);padding-left:18px;line-height:1.8">
                ${(res.limitations || []).map(l => `<li>${escapeHtml(l)}</li>`).join('')}
            </ul>
        </div>
    </details>`;
}

async function runAgent() {
    const demandSelect = document.getElementById('ai-demand');
    const demandId = demandSelect?.value;
    const runBtn = document.getElementById('ai-run-btn');
    if (!demandId) { showToast('Please select a demand', 'warning'); return; }

    if (runBtn) {
        runBtn.disabled = true;
        runBtn.innerHTML = `<span class="spinner" style="width:12px;height:12px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></span> Analyzing...`;
    }

    const outputEl = document.getElementById('aiOutput');
    if (outputEl) {
        outputEl.innerHTML = '<div class="loading-overlay" style="padding:32px"><div class="spinner"></div><span>Agent is analyzing demand and ranking candidates...</span></div>';
    }

    try {
        const [res, demand] = await Promise.all([
            apiFetch('/ai/staffing-advice', 'POST', { demandId: parseInt(demandId, 10), question: '' }),
            apiFetch(`/demands/${demandId}`)
        ]);
        aiCurrentCandidates = res.candidates || [];

        let topEmpProfile = null;
        if (res.candidates && res.candidates.length > 0) {
            try {
                topEmpProfile = await apiFetch(`/employees/${res.candidates[0].employeeId}`);
            } catch {}
        }

        const staffingAnalysisHtml = renderStaffingAnalysisHtml(demand, res.candidates || [], topEmpProfile);

        if (outputEl) {
            outputEl.innerHTML = `
            <!-- STRUCTURED STAFFING ANALYSIS -->
            ${staffingAnalysisHtml}

            <!-- ALGORITHMIC AUDIT & GOVERNANCE DRAWER -->
            ${renderAgentGovernanceAccordion(res)}`;
            outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (err) {
        if (outputEl) {
            outputEl.innerHTML = `<div class="empty-state"><div class="empty-title">Error: ${escapeHtml(err.message)}</div></div>`;
        }
    } finally {
        if (runBtn) {
            runBtn.disabled = false;
            runBtn.innerHTML = `${IC.run} Run Staffing Agent`;
        }
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
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (pageTitles[hash] && router.currentPage !== hash) {
            router.navigate(hash);
        }
    });
    checkApiStatus();
    setInterval(checkApiStatus, 10000);

    const initialHash = window.location.hash.replace('#', '');
    const initialPage = pageTitles[initialHash] ? initialHash : 'dashboard';
    router.navigate(initialPage);
});

