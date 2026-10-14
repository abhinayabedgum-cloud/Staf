/**
 * TalentSync Enterprise Application (Plan A)
 * 7 Workflow Screens matching Assignment Rubric:
 * 1. Demand Intake
 * 2. Employee Skills Matrix
 * 3. Resource Ranking & Search
 * 4. Candidate Comparison
 * 5. Allocation Approval Workflow
 * 6. Utilization & Skill-Gap Dashboard
 * 7. AI Staffing Assistant
 */

const API_BASE = 'http://localhost:8080/api';

// APP STATE
const state = {
    currentPage: 'intake',
    demands: [],
    employees: [],
    skills: [],
    allocations: [],
    comparisonCandidates: []
};

// API HELPER
async function apiFetch(path, method = 'GET', body = null) {
    const opts = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + path, opts);
    if (!res.ok) {
        let errMessage = 'HTTP ' + res.status;
        try {
            const errJson = await res.json();
            errMessage = errJson.message || errJson.error || errMessage;
        } catch {}
        throw new Error(errMessage);
    }
    return res.status === 204 ? null : await res.json();
}

// TOAST NOTIFIER
function showToast(msg, type = 'info') {
    const container = document.getElementById('toastArea');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// MODAL CONTROLLER
function openModal(title, bodyHtml) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('modalBackdrop').classList.add('open');
}

function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
}

// ROUTER
function navigate(page) {
    state.currentPage = page;
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navEl = document.getElementById('nav-' + page);
    if (navEl) navEl.classList.add('active');

    const titles = {
        intake: { title: 'Demand Intake & Project Requirements', desc: 'Create and track client staffing demands, roles, and mandatory competencies.' },
        skills: { title: 'Employee Skills Matrix', desc: 'Verified technical competencies, proficiency levels, and certification evidence.' },
        search: { title: 'Deterministic Resource Search & Ranking', desc: 'Mathematically scored candidate matching (50% Skills, 30% Availability, 10% Location, 10% Experience).' },
        compare: { title: 'Candidate Comparison Matrix', desc: 'Side-by-side justification of candidate suitability and capacity fit.' },
        approvals: { title: 'Allocation Approval & Governance Workflow', desc: 'Review requested allocations, prevent conflicting over-allocation, and enforce manager approval.' },
        dashboard: { title: 'Workforce Utilization & Skill-Gap Analytics', desc: 'Executive metrics on organizational capacity, active allocations, and missing skills.' },
        ai: { title: 'AI Staffing Assistant (Evidence-Grounded)', desc: 'Controlled, tool-augmented decision support with verifiable explanations.' }
    };

    const info = titles[page] || { title: 'TalentSync', desc: '' };
    document.getElementById('pageTitle').textContent = info.title;
    document.getElementById('pageDesc').textContent = info.desc;

    const renderers = {
        intake: renderIntakeScreen,
        skills: renderSkillsScreen,
        search: renderSearchScreen,
        compare: renderCompareScreen,
        approvals: renderApprovalsScreen,
        dashboard: renderDashboardScreen,
        ai: renderAiScreen
    };

    if (renderers[page]) renderers[page]();
}

// ============================================================================
// SCREEN 1: DEMAND INTAKE
// ============================================================================
async function renderIntakeScreen() {
    const container = document.getElementById('mainContent');
    container.innerHTML = '<div class="panel"><div class="panel-body">Loading project demands...</div></div>';

    try {
        const [demands, skills] = await Promise.all([apiFetch('/demands'), apiFetch('/skills')]);
        state.demands = demands;
        state.skills = skills;

        container.innerHTML = `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">Active Project Demands (${demands.length})</span>
                <button class="btn btn-primary btn-sm" onclick="showCreateDemandModal()">+ New Demand Intake</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Project Name</th>
                            <th>Role Required</th>
                            <th>Location</th>
                            <th>Primary Skill</th>
                            <th>Dates</th>
                            <th>Required %</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${demands.map(d => `
                        <tr>
                            <td><strong>#${d.id}</strong></td>
                            <td><strong>${d.projectName}</strong></td>
                            <td>${d.role}</td>
                            <td>${d.location}</td>
                            <td><span class="badge badge-neutral">${d.requiredSkill ? d.requiredSkill.name : 'General'}</span></td>
                            <td>${d.startDate} &rarr; ${d.endDate}</td>
                            <td>${d.allocationPercent}%</td>
                            <td><span class="badge badge-open">${d.status}</span></td>
                            <td>
                                <button class="btn btn-secondary btn-sm" onclick="goToMatchingForDemand(${d.id})">Find Candidates</button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    } catch (err) {
        container.innerHTML = `<div class="panel"><div class="panel-body text-danger">Failed to load demands: ${err.message}</div></div>`;
    }
}

function showCreateDemandModal() {
    openModal('New Project Demand Intake', `
    <form id="demandForm">
        <div class="form-row">
            <div class="form-group">
                <label>Project Name *</label>
                <input type="text" id="df-project" class="form-control" required placeholder="e.g. Mobile Banking 2.0">
            </div>
            <div class="form-group">
                <label>Role Required *</label>
                <input type="text" id="df-role" class="form-control" required placeholder="e.g. Lead Java Developer">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Location *</label>
                <input type="text" id="df-loc" class="form-control" required placeholder="e.g. New York or Remote">
            </div>
            <div class="form-group">
                <label>Primary Required Skill *</label>
                <select id="df-skill" class="form-control">
                    ${state.skills.map(s => `<option value="${s.id}">${s.name} (${s.category})</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Start Date *</label>
                <input type="date" id="df-start" class="form-control" required>
            </div>
            <div class="form-group">
                <label>End Date *</label>
                <input type="date" id="df-end" class="form-control" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Allocation Percentage (1-100%) *</label>
                <input type="number" id="df-alloc" class="form-control" min="1" max="100" value="100" required>
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select id="df-priority" class="form-control">
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                </select>
            </div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Demand</button>
        </div>
    </form>`);

    document.getElementById('demandForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await apiFetch('/demands', 'POST', {
                projectName: document.getElementById('df-project').value,
                role: document.getElementById('df-role').value,
                location: document.getElementById('df-loc').value,
                requiredSkillId: parseInt(document.getElementById('df-skill').value),
                startDate: document.getElementById('df-start').value,
                endDate: document.getElementById('df-end').value,
                allocationPercent: parseInt(document.getElementById('df-alloc').value),
                priority: document.getElementById('df-priority').value
            });
            closeModal();
            showToast('Demand created successfully!', 'success');
            renderIntakeScreen();
        } catch (err) {
            showToast(err.message, 'error');
        }
    });
}

function goToMatchingForDemand(demandId) {
    navigate('search');
    setTimeout(() => {
        const select = document.getElementById('searchDemandSelect');
        if (select) {
            select.value = demandId;
            runDemandMatching();
        }
    }, 100);
}

// ============================================================================
// SCREEN 2: EMPLOYEE SKILLS MATRIX
// ============================================================================
async function renderSkillsScreen() {
    const container = document.getElementById('mainContent');
    container.innerHTML = '<div class="panel"><div class="panel-body">Loading skills matrix...</div></div>';

    try {
        const [employees, skills] = await Promise.all([apiFetch('/employees'), apiFetch('/skills')]);
        state.employees = employees;
        state.skills = skills;

        container.innerHTML = `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">Employee Skills & Competency Matrix</span>
                <div style="display:flex;gap:8px">
                    <button class="btn btn-secondary btn-sm" onclick="showAddSkillCatalogModal()">+ New Skill Type</button>
                    <button class="btn btn-primary btn-sm" onclick="showAddEmployeeModal()">+ Add Employee</button>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Verified Skills & Proficiency</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${employees.map(e => `
                        <tr>
                            <td><strong>${e.employeeCode}</strong></td>
                            <td><strong>${e.name}</strong></td>
                            <td>${e.department}</td>
                            <td>${e.location}</td>
                            <td><span class="badge ${e.employmentStatus === 'ACTIVE' ? 'badge-confirmed' : 'badge-neutral'}">${e.employmentStatus}</span></td>
                            <td>
                                <div style="display:flex;flex-wrap:wrap;gap:4px">
                                    ${(e.skills || []).map(s => `
                                        <span class="badge badge-neutral" title="Evidence: ${s.evidence || 'None'}">
                                            ${s.skillName} (L${s.proficiencyLevel} - ${s.proficiencyLabel})
                                        </span>
                                    `).join('') || '<span style="color:#94a3b8">No skills recorded</span>'}
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-secondary btn-sm" onclick="showAssignSkillModal(${e.id}, '${e.name}')">+ Skill</button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    } catch (err) {
        container.innerHTML = `<div class="panel"><div class="panel-body text-danger">Error: ${err.message}</div></div>`;
    }
}

function showAddEmployeeModal() {
    openModal('Register New Employee', `
    <form id="empForm">
        <div class="form-row">
            <div class="form-group"><label>Employee Code *</label><input type="text" id="ef-code" class="form-control" placeholder="EMP015" required></div>
            <div class="form-group"><label>Full Name *</label><input type="text" id="ef-name" class="form-control" placeholder="John Doe" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label>Department *</label><input type="text" id="ef-dept" class="form-control" placeholder="Engineering" required></div>
            <div class="form-group"><label>Base Location *</label><input type="text" id="ef-loc" class="form-control" placeholder="New York" required></div>
        </div>
        <div class="form-group"><label>Corporate Email *</label><input type="email" id="ef-email" class="form-control" placeholder="johndoe@example.com" required></div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Employee</button>
        </div>
    </form>`);

    document.getElementById('empForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await apiFetch('/employees', 'POST', {
                employeeCode: document.getElementById('ef-code').value,
                name: document.getElementById('ef-name').value,
                department: document.getElementById('ef-dept').value,
                location: document.getElementById('ef-loc').value,
                email: document.getElementById('ef-email').value,
                employmentStatus: 'ACTIVE',
                maxAllocationPercent: 100
            });
            closeModal();
            showToast('Employee registered successfully!', 'success');
            renderSkillsScreen();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

function showAssignSkillModal(empId, empName) {
    openModal('Assign Verified Skill to ' + empName, `
    <form id="assignSkillForm">
        <div class="form-group">
            <label>Select Competency *</label>
            <select id="as-skill" class="form-control">
                ${state.skills.map(s => `<option value="${s.id}">${s.name} (${s.category})</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Proficiency Level (1=Beginner, 5=Master) *</label>
            <select id="as-level" class="form-control">
                <option value="1">1 - Beginner</option>
                <option value="2">2 - Intermediate</option>
                <option value="3" selected>3 - Advanced</option>
                <option value="4">4 - Expert</option>
                <option value="5">5 - Master</option>
            </select>
        </div>
        <div class="form-group">
            <label>Validation Evidence / Certification Reference *</label>
            <input type="text" id="as-evidence" class="form-control" placeholder="e.g. AWS Solutions Architect or 4 yrs microservices" required>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Map Verified Skill</button>
        </div>
    </form>`);

    document.getElementById('assignSkillForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await apiFetch(`/employees/${empId}/skills`, 'POST', {
                skillId: parseInt(document.getElementById('as-skill').value),
                proficiencyLevel: parseInt(document.getElementById('as-level').value),
                evidence: document.getElementById('as-evidence').value,
                lastValidatedAt: new Date().toISOString().split('T')[0]
            });
            closeModal();
            showToast('Skill assigned with verified evidence!', 'success');
            renderSkillsScreen();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

function showAddSkillCatalogModal() {
    openModal('Add Skill to Master Catalog', `
    <form id="catSkillForm">
        <div class="form-group"><label>Skill Name *</label><input type="text" id="cs-name" class="form-control" placeholder="e.g. Kubernetes" required></div>
        <div class="form-group"><label>Category *</label><input type="text" id="cs-cat" class="form-control" placeholder="e.g. DevOps / Cloud" required></div>
        <div class="form-group"><label>Description</label><input type="text" id="cs-desc" class="form-control" placeholder="Brief domain scope"></div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Add to Catalog</button>
        </div>
    </form>`);

    document.getElementById('catSkillForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await apiFetch('/skills', 'POST', {
                name: document.getElementById('cs-name').value,
                category: document.getElementById('cs-cat').value,
                description: document.getElementById('cs-desc').value
            });
            closeModal();
            showToast('Skill catalog updated!', 'success');
            renderSkillsScreen();
        } catch (err) { showToast(err.message, 'error'); }
    });
}

// ============================================================================
// SCREEN 3: RESOURCE SEARCH & RANKING
// ============================================================================
async function renderSearchScreen() {
    const container = document.getElementById('mainContent');
    const demands = state.demands.length ? state.demands : await apiFetch('/demands');
    state.demands = demands;

    container.innerHTML = `
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">Deterministic Resource Search & Ranking Engine</span>
        </div>
        <div class="panel-body">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
                <label style="font-weight:600">Select Project Demand:</label>
                <select id="searchDemandSelect" class="form-control" style="max-width:400px" onchange="runDemandMatching()">
                    ${demands.map(d => `<option value="${d.id}">#${d.id} - ${d.projectName} (${d.role})</option>`).join('')}
                </select>
                <button class="btn btn-primary" onclick="runDemandMatching()">Run Deterministic Match</button>
            </div>
            <div id="matchingResults">
                <p style="color:#64748b">Select a project demand above and click "Run Deterministic Match" to compute candidate scores.</p>
            </div>
        </div>
    </div>`;

    if (demands.length > 0) runDemandMatching();
}

async function runDemandMatching() {
    const demandId = document.getElementById('searchDemandSelect').value;
    const resultsContainer = document.getElementById('matchingResults');
    resultsContainer.innerHTML = '<p>Evaluating workforce eligibility & calculating capacity...</p>';

    try {
        const [recs, demand] = await Promise.all([
            apiFetch(`/demands/${demandId}/recommendations`, 'POST'),
            apiFetch(`/demands/${demandId}`)
        ]);

        if (!recs.length) {
            resultsContainer.innerHTML = '<p class="text-danger">No active employees found matching minimum eligibility criteria.</p>';
            return;
        }

        resultsContainer.innerHTML = `
        <div style="margin-bottom:14px;font-size:13px;color:#475569">
            Showing <strong>${recs.length} candidates</strong> ranked deterministically for <strong>${demand.projectName}</strong> (${demand.role}).
            <br><small style="color:#64748b">Scoring Formula: 50% Verified Skill + 30% Date-Range Availability + 10% Location + 10% Validated Evidence</small>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Employee</th>
                        <th>Location</th>
                        <th>Match Score</th>
                        <th>Skill Fit (50)</th>
                        <th>Availability (30)</th>
                        <th>Location (10)</th>
                        <th>Status / Warnings</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${recs.map((r, idx) => `
                    <tr>
                        <td><strong>#${idx + 1}</strong></td>
                        <td>
                            <strong>${r.employeeName}</strong>
                            <br><small style="color:#64748b">${r.employeeCode} &bull; ${r.department}</small>
                        </td>
                        <td>${r.location}</td>
                        <td>
                            <strong style="color:var(--primary);font-size:15px">${r.totalScore}%</strong>
                            <div class="score-bar-bg" style="width:100px"><div class="score-bar-fill" style="width:${r.totalScore}%"></div></div>
                        </td>
                        <td>${r.scoreBreakdown ? r.scoreBreakdown.skillScore : '-'}/50</td>
                        <td>${r.scoreBreakdown ? r.scoreBreakdown.availabilityScore : '-'}/30 (${r.availablePercent}% free)</td>
                        <td>${r.scoreBreakdown ? r.scoreBreakdown.locationScore : '-'}/10</td>
                        <td>
                            ${!r.meetsSkillRequirements ? '<span class="badge badge-cancelled">Missing Skill</span>' : ''}
                            ${!r.meetsAvailabilityRequirement ? '<span class="badge badge-requested">Low Capacity</span>' : ''}
                            ${r.meetsSkillRequirements && r.meetsAvailabilityRequirement ? '<span class="badge badge-confirmed">Fully Eligible</span>' : ''}
                        </td>
                        <td>
                            <div style="display:flex;gap:4px">
                                <button class="btn btn-secondary btn-sm" onclick="addToComparison(${r.employeeId}, '${r.employeeName}')">Compare</button>
                                <button class="btn btn-primary btn-sm" onclick="showQuickAllocateModal(${r.employeeId}, ${demand.id})">Allocate</button>
                            </div>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
    } catch (err) {
        resultsContainer.innerHTML = `<p class="text-danger">Failed to calculate recommendations: ${err.message}</p>`;
    }
}

function addToComparison(empId, empName) {
    if (state.comparisonCandidates.some(c => c.id === empId)) {
        showToast(empName + ' is already in the comparison queue.', 'info');
        return;
    }
    if (state.comparisonCandidates.length >= 2) {
        state.comparisonCandidates.shift(); // keep max 2 for clean side-by-side
    }
    state.comparisonCandidates.push({ id: empId, name: empName });
    showToast(empName + ' added to comparison queue.', 'success');
}

// ============================================================================
// SCREEN 4: CANDIDATE COMPARISON MATRIX
// ============================================================================
async function renderCompareScreen() {
    const container = document.getElementById('mainContent');
    const employees = state.employees.length ? state.employees : await apiFetch('/employees');
    state.employees = employees;

    container.innerHTML = `
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">Side-by-Side Candidate Comparison Matrix</span>
        </div>
        <div class="panel-body">
            <div style="display:flex;gap:16px;align-items:center;margin-bottom:20px">
                <div>
                    <label style="font-weight:600;font-size:12px">Candidate A:</label>
                    <select id="compA" class="form-control" style="width:240px">
                        ${employees.map(e => `<option value="${e.id}">${e.name} (${e.employeeCode})</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label style="font-weight:600;font-size:12px">Candidate B:</label>
                    <select id="compB" class="form-control" style="width:240px">
                        ${employees.map((e, i) => `<option value="${e.id}" ${i === 1 ? 'selected' : ''}>${e.name} (${e.employeeCode})</option>`).join('')}
                    </select>
                </div>
                <div style="margin-top:18px">
                    <button class="btn btn-primary" onclick="renderSideBySideComparison()">Compare Candidates</button>
                </div>
            </div>

            <div id="compareMatrix">
                <!-- Matrix rendered here -->
            </div>
        </div>
    </div>`;

    renderSideBySideComparison();
}

async function renderSideBySideComparison() {
    const idA = document.getElementById('compA').value;
    const idB = document.getElementById('compB').value;
    const matrix = document.getElementById('compareMatrix');
    matrix.innerHTML = '<p>Building comparison attributes...</p>';

    try {
        const [empA, empB] = await Promise.all([
            apiFetch(`/employees/${idA}`),
            apiFetch(`/employees/${idB}`)
        ]);

        matrix.innerHTML = `
        <div class="comparison-container">
            <div class="comparison-header">Evaluation Criteria</div>
            <div class="comparison-header">${empA.name} (${empA.employeeCode})</div>
            <div class="comparison-header">${empB.name} (${empB.employeeCode})</div>

            <div class="comparison-row">
                <div class="comparison-label">Department</div>
                <div class="comparison-cell">${empA.department}</div>
                <div class="comparison-cell">${empB.department}</div>
            </div>

            <div class="comparison-row">
                <div class="comparison-label">Base Location</div>
                <div class="comparison-cell">${empA.location}</div>
                <div class="comparison-cell">${empB.location}</div>
            </div>

            <div class="comparison-row">
                <div class="comparison-label">Employment Status</div>
                <div class="comparison-cell"><span class="badge badge-confirmed">${empA.employmentStatus}</span></div>
                <div class="comparison-cell"><span class="badge badge-confirmed">${empB.employmentStatus}</span></div>
            </div>

            <div class="comparison-row">
                <div class="comparison-label">Configured Capacity</div>
                <div class="comparison-cell">${empA.maxAllocationPercent || 100}% Maximum</div>
                <div class="comparison-cell">${empB.maxAllocationPercent || 100}% Maximum</div>
            </div>

            <div class="comparison-row">
                <div class="comparison-label">Verified Competencies</div>
                <div class="comparison-cell">
                    ${(empA.skills || []).map(s => `
                        <div style="margin-bottom:4px">
                            <strong>${s.skillName}</strong> - L${s.proficiencyLevel} (${s.proficiencyLabel})
                            <br><small style="color:#64748b">Evidence: ${s.evidence || 'Stored in system'}</small>
                        </div>
                    `).join('') || 'None'}
                </div>
                <div class="comparison-cell">
                    ${(empB.skills || []).map(s => `
                        <div style="margin-bottom:4px">
                            <strong>${s.skillName}</strong> - L${s.proficiencyLevel} (${s.proficiencyLabel})
                            <br><small style="color:#64748b">Evidence: ${s.evidence || 'Stored in system'}</small>
                        </div>
                    `).join('') || 'None'}
                </div>
            </div>

            <div class="comparison-row">
                <div class="comparison-label">Recommendation Action</div>
                <div class="comparison-cell">
                    <button class="btn btn-primary btn-sm" onclick="showQuickAllocateModal(${empA.id}, null)">Select ${empA.name}</button>
                </div>
                <div class="comparison-cell">
                    <button class="btn btn-primary btn-sm" onclick="showQuickAllocateModal(${empB.id}, null)">Select ${empB.name}</button>
                </div>
            </div>
        </div>`;
    } catch (err) {
        matrix.innerHTML = `<p class="text-danger">Failed to load comparison: ${err.message}</p>`;
    }
}

// ============================================================================
// SCREEN 5: ALLOCATION APPROVAL WORKFLOW
// ============================================================================
async function renderApprovalsScreen() {
    const container = document.getElementById('mainContent');
    container.innerHTML = '<div class="panel"><div class="panel-body">Loading allocations...</div></div>';

    try {
        const allocations = await apiFetch('/allocations');
        state.allocations = allocations;

        container.innerHTML = `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">Resource Allocations & Manager Approval Workflow</span>
                <button class="btn btn-primary btn-sm" onclick="showQuickAllocateModal()">+ Create New Allocation</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Alloc ID</th>
                            <th>Employee</th>
                            <th>Project Demand</th>
                            <th>Period</th>
                            <th>Capacity %</th>
                            <th>Status</th>
                            <th>Approved By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allocations.length ? allocations.map(a => `
                        <tr>
                            <td><strong>#${a.id}</strong></td>
                            <td>${a.employeeName}</td>
                            <td>${a.projectName}</td>
                            <td>${a.startDate} &rarr; ${a.endDate}</td>
                            <td>${a.allocationPercent}%</td>
                            <td>
                                <span class="badge ${a.status === 'CONFIRMED' ? 'badge-confirmed' : a.status === 'CANCELLED' ? 'badge-cancelled' : 'badge-requested'}">
                                    ${a.status}
                                </span>
                            </td>
                            <td>${a.approvedBy || 'Pending'}</td>
                            <td>
                                ${a.status === 'CONFIRMED' ? `
                                    <button class="btn btn-danger btn-sm" onclick="cancelAllocationPrompt(${a.id})">Release Capacity (Cancel)</button>
                                ` : '<span style="color:#94a3b8">History Preserved</span>'}
                            </td>
                        </tr>`).join('') : '<tr><td colspan="8" style="text-align:center;padding:20px;color:#94a3b8">No allocations recorded.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>`;
    } catch (err) {
        container.innerHTML = `<div class="panel"><div class="panel-body text-danger">Error: ${err.message}</div></div>`;
    }
}

async function showQuickAllocateModal(preEmpId = null, preDemandId = null) {
    const [employees, demands] = await Promise.all([apiFetch('/employees'), apiFetch('/demands')]);
    const activeEmps = employees.filter(e => e.employmentStatus === 'ACTIVE');
    const openDemands = demands.filter(d => d.status === 'OPEN' || d.status === 'IN_PROGRESS');

    const selectedDemand = openDemands.find(d => d.id == preDemandId) || openDemands[0];
    const defStart = selectedDemand ? selectedDemand.startDate : '';
    const defEnd = selectedDemand ? selectedDemand.endDate : '';

    openModal('Confirm Resource Allocation', `
    <form id="allocForm">
        <div class="form-row">
            <div class="form-group">
                <label>Target Employee *</label>
                <select id="af-emp" class="form-control">
                    ${activeEmps.map(e => `<option value="${e.id}" ${e.id == preEmpId ? 'selected' : ''}>${e.name} (${e.employeeCode})</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Project Demand *</label>
                <select id="af-demand" class="form-control">
                    ${openDemands.map(d => `<option value="${d.id}" ${d.id == preDemandId ? 'selected' : ''}>#${d.id} - ${d.projectName} (${d.role})</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group"><label>Start Date *</label><input type="date" id="af-start" class="form-control" value="${defStart}" required></div>
            <div class="form-group"><label>End Date *</label><input type="date" id="af-end" class="form-control" value="${defEnd}" required></div>
        </div>
        <div class="form-row">
            <div class="form-group"><label>Allocation Percentage (1-100%) *</label><input type="number" id="af-percent" class="form-control" min="1" max="100" value="100" required></div>
            <div class="form-group"><label>Approver Signature (Name / Role) *</label><input type="text" id="af-approver" class="form-control" placeholder="e.g. Sarah Jenkins (Resource Director)" required></div>
        </div>
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Sign & Confirm Allocation</button>
        </div>
    </form>`);

    document.getElementById('allocForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await apiFetch('/allocations', 'POST', {
                employeeId: parseInt(document.getElementById('af-emp').value),
                demandId: parseInt(document.getElementById('af-demand').value),
                startDate: document.getElementById('af-start').value,
                endDate: document.getElementById('af-end').value,
                allocationPercent: parseInt(document.getElementById('af-percent').value),
                approvedBy: document.getElementById('af-approver').value
            });
            closeModal();
            showToast('Allocation approved and locked in system!', 'success');
            navigate('approvals');
        } catch (err) {
            showToast(err.message, 'error');
        }
    });
}

function cancelAllocationPrompt(allocId) {
    const reason = prompt('Enter justification for releasing capacity (retained for audit history):', 'Project rescheduled');
    if (!reason) return;
    apiFetch(`/allocations/${allocId}/cancel`, 'PUT', { reason })
        .then(() => {
            showToast('Allocation cancelled. Capacity released immediately.', 'success');
            renderApprovalsScreen();
        })
        .catch(err => showToast(err.message, 'error'));
}

// ============================================================================
// SCREEN 6: UTILIZATION & SKILL-GAP DASHBOARD
// ============================================================================
async function renderDashboardScreen() {
    const container = document.getElementById('mainContent');
    container.innerHTML = '<div class="panel"><div class="panel-body">Aggregating workforce metrics...</div></div>';

    try {
        const [employees, demands, allocations] = await Promise.all([
            apiFetch('/employees'),
            apiFetch('/demands'),
            apiFetch('/allocations')
        ]);

        const activeEmployees = employees.filter(e => e.employmentStatus === 'ACTIVE');
        const openDemands = demands.filter(d => d.status === 'OPEN' || d.status === 'IN_PROGRESS');
        const activeAllocations = allocations.filter(a => a.status === 'CONFIRMED');

        // calculate utilization rate
        const totalCapacity = activeEmployees.length * 100;
        const totalCommitted = activeAllocations.reduce((sum, a) => sum + (a.allocationPercent || 0), 0);
        const utilizationRate = totalCapacity ? Math.round((totalCommitted / totalCapacity) * 100) : 0;

        container.innerHTML = `
        <div class="grid-4">
            <div class="kpi-card">
                <div class="kpi-title">Active Workforce</div>
                <div class="kpi-value">${activeEmployees.length}</div>
                <div class="kpi-sub">${employees.length - activeEmployees.length} on leave/inactive</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-title">Open Demands</div>
                <div class="kpi-value">${openDemands.length}</div>
                <div class="kpi-sub">Requiring resource allocation</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-title">Confirmed Allocations</div>
                <div class="kpi-value">${activeAllocations.length}</div>
                <div class="kpi-sub">${allocations.length - activeAllocations.length} historical cancelled</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-title">Workforce Utilization</div>
                <div class="kpi-value" style="color:var(--primary)">${utilizationRate}%</div>
                <div class="kpi-sub">Bench Capacity: ${100 - utilizationRate}%</div>
            </div>
        </div>

        <div class="grid-2">
            <div class="panel">
                <div class="panel-header"><span class="panel-title">Urgent Unfilled Client Demands</span></div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr><th>Project</th><th>Role Required</th><th>Dates</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            ${openDemands.map(d => `
                            <tr>
                                <td><strong>${d.projectName}</strong></td>
                                <td>${d.role}</td>
                                <td>${d.startDate} &rarr; ${d.endDate}</td>
                                <td><button class="btn btn-secondary btn-sm" onclick="goToMatchingForDemand(${d.id})">Match</button></td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="panel">
                <div class="panel-header"><span class="panel-title">Workforce Allocation Ledger</span></div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr><th>Employee</th><th>Project</th><th>Load</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            ${allocations.slice(0, 5).map(a => `
                            <tr>
                                <td><strong>${a.employeeName}</strong></td>
                                <td>${a.projectName}</td>
                                <td>${a.allocationPercent}%</td>
                                <td><span class="badge ${a.status === 'CONFIRMED' ? 'badge-confirmed' : 'badge-cancelled'}">${a.status}</span></td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
    } catch (err) {
        container.innerHTML = `<div class="panel"><div class="panel-body text-danger">Failed to load dashboard: ${err.message}</div></div>`;
    }
}

// ============================================================================
// SCREEN 7: AI STAFFING ASSISTANT
// ============================================================================
async function renderAiScreen() {
    const container = document.getElementById('mainContent');
    const demands = state.demands.length ? state.demands : await apiFetch('/demands');
    state.demands = demands;

    container.innerHTML = `
    <div class="panel">
        <div class="panel-header">
            <span class="panel-title">Evidence-Grounded AI Staffing Advisor</span>
            <span class="badge badge-neutral">Mode: Deterministic Tool-Calling Simulation</span>
        </div>
        <div class="panel-body">
            <p style="color:#64748b;margin-bottom:16px;font-size:13px">
                The AI assistant queries backend data using read-only tool calls (<code>getDemandDetails</code>, <code>searchEligibleCandidates</code>, <code>getCandidateEvidence</code>). It cannot autonomously approve allocations or fabricate credentials.
            </p>

            <div style="display:flex;gap:10px;align-items:center;margin-bottom:16px">
                <label style="font-weight:600">Select Context Demand:</label>
                <select id="aiDemandSelect" class="form-control" style="max-width:360px">
                    ${demands.map(d => `<option value="${d.id}">#${d.id} - ${d.projectName} (${d.role})</option>`).join('')}
                </select>
            </div>

            <div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-secondary btn-sm" onclick="setAiQuery('Who is the top-ranked candidate and what is the justification?')">Prompt: Top Candidate & Justification</button>
                <button class="btn btn-secondary btn-sm" onclick="setAiQuery('Explain skill gaps and recommend training for non-matching candidates.')">Prompt: Skill Gaps & Training Path</button>
                <button class="btn btn-secondary btn-sm" onclick="setAiQuery('Are there any capacity conflicts for this project duration?')">Prompt: Check Capacity Conflicts</button>
            </div>

            <div style="display:flex;gap:8px;margin-bottom:20px">
                <input type="text" id="aiInput" class="form-control" placeholder="Ask a staffing question about this project...">
                <button class="btn btn-primary" onclick="sendAiMessage()">Ask Advisor</button>
            </div>

            <div id="aiResponseBox" style="background:var(--bg-subtle);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:16px;min-height:120px">
                <p style="color:#94a3b8">Advisor response will appear here with tool execution trace.</p>
            </div>
        </div>
    </div>`;
}

function setAiQuery(text) {
    document.getElementById('aiInput').value = text;
    sendAiMessage();
}

async function sendAiMessage() {
    const demandId = document.getElementById('aiDemandSelect').value;
    const question = document.getElementById('aiInput').value.trim();
    if (!question) return;

    const box = document.getElementById('aiResponseBox');
    box.innerHTML = '<p>Agent dispatching backend tools and evaluating evidence...</p>';

    try {
        const res = await apiFetch('/ai/staffing-advice', 'POST', {
            demandId: parseInt(demandId),
            question: question
        });

        box.innerHTML = `
        <div style="margin-bottom:16px">
            <h4 style="font-size:14px;font-weight:700;margin-bottom:8px">Staffing Advisor Analysis:</h4>
            <div style="line-height:1.6;font-size:13px;color:#1e293b">${res.response.replace(/\n/g, '<br>')}</div>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:12px;margin-bottom:12px">
            <div style="font-weight:600;font-size:12px;color:#64748b;margin-bottom:6px">EXECUTED TOOL CALL TRACE (VERIFIED EVIDENCE):</div>
            ${(res.toolCalls || []).map(tc => `
                <div style="font-family:monospace;font-size:11px;margin-bottom:4px;color:#334155">
                    &bull; <strong>${tc.toolName}</strong>(${JSON.stringify(tc.inputs || {})}) &rarr; <span style="color:#059669">${tc.result}</span>
                </div>
            `).join('')}
        </div>

        <div style="font-size:11px;color:#94a3b8">
            <strong>System Safeguards:</strong> ${(res.limitations || []).join(' | ')}
        </div>`;
    } catch (err) {
        box.innerHTML = `<p class="text-danger">AI Service Error: ${err.message}</p>`;
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================
async function checkApiHealth() {
    try {
        await fetch(API_BASE + '/employees');
        document.getElementById('statusDot').className = 'status-indicator online';
        document.getElementById('statusText').textContent = 'API Online (Port 8080)';
    } catch {
        document.getElementById('statusDot').className = 'status-indicator offline';
        document.getElementById('statusText').textContent = 'API Offline';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Nav Click Listeners
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.dataset.page);
        });
    });

    // Global Filter Listener
    const filterInput = document.getElementById('globalFilter');
    if (filterInput) {
        filterInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const rows = document.querySelectorAll('tbody tr, .comparison-row');
            rows.forEach(r => {
                const text = r.textContent.toLowerCase();
                r.style.display = (!query || text.includes(query)) ? '' : 'none';
            });
        });
    }

    // Modal listeners
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalBackdrop')) closeModal();
    });

    checkApiHealth();
    setInterval(checkApiHealth, 10000);
    navigate('intake');
});
