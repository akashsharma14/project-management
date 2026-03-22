import { useState } from "react";
import profileImg1 from "../assets/profile_img1.png";
import profileImg2 from "../assets/profile_img2.png";
const PRIMARY = "#7c3bed";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }

  .spm-settings {
    font-family: 'Inter', sans-serif;
    background: #f7f6f8;
    min-height: 100vh;
    display: flex;
    color: #0f172a;
  }

  /* ── SIDEBAR ── */
  @media (max-width: 900px) {
  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
}
  .sidebar-top { padding: 24px; flex: 1; overflow-y: auto; }
  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }
  .brand-icon {
    width: 32px; height: 32px;
    background: ${PRIMARY};
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    flex-shrink: 0;
  }
  .brand-icon .material-symbols-outlined { font-size: 18px; }
  .brand-name {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.4px;
    color: #0f172a;
  }
  .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    transition: background 0.15s, color 0.15s;
  }
  .nav-item:hover { background: #f8fafc; color: #0f172a; }
  .nav-item.active {
    background: rgba(124,59,237,0.08);
    color: ${PRIMARY};
    font-weight: 600;
  }
  .nav-item .material-symbols-outlined { font-size: 20px; flex-shrink: 0; }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid #e2e8f0;
  }
  .user-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
  }
  .user-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(124,59,237,0.12);
    flex-shrink: 0;
  }
  .user-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .user-name { font-size: 14px; font-weight: 600; color: #0f172a; }
  .user-role { font-size: 12px; color: #64748b; }
  .btn-upgrade {
    margin-top: 12px;
    width: 100%;
    background: ${PRIMARY};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 9px 0;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(124,59,237,0.25);
    transition: background 0.2s, transform 0.15s;
  }
  .btn-upgrade:hover { background: #6b2ed6; transform: translateY(-1px); }
  .btn-upgrade:active { transform: translateY(0); }

  /* ── MAIN ── */
  .main-content {
    margin-left: 256px;
    flex: 1;
    min-height: 100vh;
  }
  .main-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  .page-heading { margin-bottom: 32px; }
  .page-title {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -0.5px;
    color: #0f172a;
  }
  .page-subtitle { font-size: 14px; color: #64748b; margin-top: 4px; }

  /* ── TABS ── */
  .tabs {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 48px;
    overflow-x: auto;
    gap: 0;
  }
  .tab-btn {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s, border-color 0.2s;
    margin-bottom: -1px;
  }
  .tab-btn:hover { color: #334155; }
  .tab-btn.active {
    color: ${PRIMARY};
    font-weight: 700;
    border-bottom-color: ${PRIMARY};
  }

  /* ── SECTIONS ── */
  .settings-sections { display: flex; flex-direction: column; gap: 0; }
  .settings-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 32px;
    padding-bottom: 48px;
    margin-bottom: 48px;
    border-bottom: 1px solid #e2e8f0;
  }
  .settings-section:last-of-type { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
  .section-label { }
  .section-title { font-size: 16px; font-weight: 700; color: #0f172a; }
  .section-desc { font-size: 13px; color: #64748b; margin-top: 4px; line-height: 1.5; }
  .section-body { display: flex; flex-direction: column; gap: 20px; }

  /* ── FORM ELEMENTS ── */
  .form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 13px; font-weight: 600; color: #334155; }
  .form-input {
    width: 100%;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 9px 14px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    color: #0f172a;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .form-input:focus {
    border-color: ${PRIMARY};
    box-shadow: 0 0 0 3px rgba(124,59,237,0.12);
  }

  /* ── AVATAR ROW ── */
  .avatar-row {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .profile-avatar {
    width: 96px; height: 96px;
    border-radius: 50%;
    overflow: hidden;
    ring: 4px solid white;
    box-shadow: 0 0 0 4px white, 0 2px 8px rgba(0,0,0,0.1);
    flex-shrink: 0;
    background: #e2e8f0;
  }
  .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .avatar-actions { display: flex; gap: 10px; }
  .btn-upload {
    background: ${PRIMARY};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(124,59,237,0.25);
    transition: background 0.2s;
  }
  .btn-upload:hover { background: #6b2ed6; }
  .btn-remove {
    background: #f1f5f9;
    color: #475569;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-remove:hover { background: #e2e8f0; }

  /* ── CHECKBOX ITEMS ── */
  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .checkbox-item:hover { background: #f8fafc; border-color: #cbd5e1; }
  .checkbox-item.checked { border-color: rgba(124,59,237,0.3); background: rgba(124,59,237,0.03); }
  .custom-checkbox {
    width: 20px; height: 20px;
    border-radius: 5px;
    border: 2px solid #cbd5e1;
    background: white;
    flex-shrink: 0;
    margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s;
    cursor: pointer;
  }
  .custom-checkbox.checked {
    background: ${PRIMARY};
    border-color: ${PRIMARY};
  }
  .custom-checkbox.checked::after {
    content: '';
    width: 10px; height: 6px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(-45deg) translateY(-1px);
    display: block;
  }
  .checkbox-label-title { font-size: 14px; font-weight: 700; color: #0f172a; }
  .checkbox-label-desc { font-size: 12px; color: #64748b; margin-top: 2px; }

  /* ── UPLOAD ZONE ── */
  .upload-zone {
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: white;
    transition: border-color 0.2s, background 0.2s;
    text-align: center;
    gap: 8px;
  }
  .upload-zone:hover {
    border-color: rgba(124,59,237,0.4);
    background: rgba(124,59,237,0.02);
  }
  .upload-zone .material-symbols-outlined {
    font-size: 40px;
    color: #94a3b8;
    margin-bottom: 4px;
  }
  .upload-title { font-size: 14px; font-weight: 500; color: #334155; }
  .upload-hint { font-size: 12px; color: #94a3b8; }

  /* ── INTEGRATIONS ── */
  .integrations-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 8px;
  }
  .integration-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    transition: border-color 0.15s;
  }
  .integration-row:hover { border-color: #cbd5e1; }
  .integration-left { display: flex; align-items: center; gap: 12px; }
  .integration-icon {
    width: 40px; height: 40px;
    background: white;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    overflow: hidden;
    flex-shrink: 0;
  }
  .integration-icon img { width: 24px; height: 24px; object-fit: contain; }
  .integration-name { font-size: 14px; font-weight: 700; color: #0f172a; }
  .integration-status { font-size: 12px; color: #94a3b8; margin-top: 1px; }
  .btn-disconnect {
    font-size: 13px; font-weight: 700;
    color: #ef4444;
    background: none; border: none; cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;
  }
  .btn-disconnect:hover { color: #dc2626; }
  .btn-connect {
    font-size: 13px; font-weight: 700;
    color: ${PRIMARY};
    background: none; border: none; cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;
  }
  .btn-connect:hover { color: #6b2ed6; }

  /* ── ACTION FOOTER ── */
  .action-footer {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  .btn-discard {
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #475569;
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-discard:hover { background: #f1f5f9; }
  .btn-save {
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    color: white;
    background: ${PRIMARY};
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(124,59,237,0.3);
    transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
  }
  .btn-save:hover { transform: scale(1.02); box-shadow: 0 6px 20px rgba(124,59,237,0.35); }
  .btn-save:active { transform: scale(0.98); }
`;

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "account_tree", label: "Projects" },
  { icon: "check_box", label: "Tasks" },
  { icon: "group", label: "Team" },
  { icon: "notifications", label: "Notifications" },
  { icon: "settings", label: "Settings", active: true },
];

const TABS = ["Profile", "Notification Preferences", "Workspace Settings", "Integrations"];

export default function SmartPMSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [checks, setChecks] = useState({ tasks: true, mentions: true, updates: false });
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@smartpm.io",
    password: "",
    workspaceName: "Acme Corp Solutions",
  });

  const toggleCheck = (key) => setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  const handleInput = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="spm-settings">
      <style>{styles}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <span className="brand-name">SmartPM</span>
          </div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map(({ icon, label, active }) => (
              <button key={label} className={`nav-item${active ? " active" : ""}`}>
                <span className="material-symbols-outlined">{icon}</span>
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="user-row">
            <div className="user-avatar">
              <img
                src={profileImg1}
                alt="John Doe"
              />
            </div>
            <div>
              <div className="user-name">John Doe</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
          <button className="btn-upgrade">Upgrade Plan</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <div className="main-inner">
          <div className="page-heading">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your personal profile and workspace configurations.</p>
          </div>

          {/* TABS */}
          <div className="tabs">
            {TABS.map(t => (
              <button
                key={t}
                className={`tab-btn${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* SECTIONS */}
          <div className="settings-sections">

            {/* Profile Information */}
            <div className="settings-section">
              <div className="section-label">
                <div className="section-title">Profile Information</div>
                <div className="section-desc">Update your photo and personal details.</div>
              </div>
              <div className="section-body">
                <div className="avatar-row">
                  <div className="profile-avatar">
                    <img
                      src={profileImg2}
                      alt="Profile"
                    />
                  </div>
                  <div className="avatar-actions">
                    <button className="btn-upload">Upload New Photo</button>
                    <button className="btn-remove">Remove</button>
                  </div>
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-input"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInput("fullName")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      value={formData.email}
                      onChange={handleInput("email")}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInput("password")}
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="settings-section">
              <div className="section-label">
                <div className="section-title">Notification Preferences</div>
                <div className="section-desc">Decide which updates you'd like to receive via email or push.</div>
              </div>
              <div className="section-body">
                {[
                  { key: "tasks", title: "Task Assignments", desc: "Get notified when someone assigns a new task to you." },
                  { key: "mentions", title: "Mentions", desc: "Get notified when you are @mentioned in a comment or project." },
                  { key: "updates", title: "Project Updates", desc: "Weekly digests and major milestones achieved in your projects." },
                ].map(({ key, title, desc }) => (
                  <div
                    key={key}
                    className={`checkbox-item${checks[key] ? " checked" : ""}`}
                    onClick={() => toggleCheck(key)}
                  >
                    <div className={`custom-checkbox${checks[key] ? " checked" : ""}`} />
                    <div>
                      <div className="checkbox-label-title">{title}</div>
                      <div className="checkbox-label-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workspace Settings */}
            <div className="settings-section" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
              <div className="section-label">
                <div className="section-title">Workspace Settings</div>
                <div className="section-desc">Configure global settings for your organization.</div>
              </div>
              <div className="section-body">
                <div className="form-group">
                  <label className="form-label">Workspace Name</label>
                  <input
                    className="form-input"
                    type="text"
                    value={formData.workspaceName}
                    onChange={handleInput("workspaceName")}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Global Logo</label>
                  <div className="upload-zone">
                    <span className="material-symbols-outlined">cloud_upload</span>
                    <div className="upload-title">Click to upload or drag and drop</div>
                    <div className="upload-hint">SVG, PNG, JPG (max 800×400px)</div>
                  </div>
                </div>

                <div>
                  <div className="integrations-label">Integrations</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                    <div className="integration-row">
                      <div className="integration-left">
                        <div className="integration-icon">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF8w6fk8w_e2LNwRKSzXpz5PE0oGiK1pA0xuXixB0ljZGA_WG7cGjpUm3Qt8imRpOhFsGqGlemUFubv_D-MqUm4kA-ChfYXqbMp7kyOAKCcBKXt_bY1dgeZz86EndVJLpDVs7EMyTBz7xC22triMB3o9-e--WHgKixOw8GrbweamVzjnb1vpht2frrliFAu7Iym2PE2frZq97tpkQf-4rRJZm_qWzKBRfZalH05jci3Q-EQDJdimLUtVgH7EPUNZvfggW1Txlb7vQq"
                            alt="Slack"
                          />
                        </div>
                        <div>
                          <div className="integration-name">Slack</div>
                          <div className="integration-status">Synced with #project-updates</div>
                        </div>
                      </div>
                      <button className="btn-disconnect">Disconnect</button>
                    </div>

                    <div className="integration-row">
                      <div className="integration-left">
                        <div className="integration-icon">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7aV_QPw8szb9ubzHzm6e8-JXcX_d72UkLevhtiPJyIXZIksiFcW0N2ZSzKR4O-Gnfay-ZJSpKDzNfGh8mDa80tqd3D0520zAH_W1BTXltoMUQUGcTQrXona71rtu0Zmu4T89kvlaBzX78uWpP6ZWM3yeE4bj2y00q62CvbrnXrXfSzCSZWN8eTSrXtkn7YEuc8FDBHJTY_1gGXckm-Ya072jaoxPsXUljEgGkQFUfW-Q9tLpDMzQCiwsKaZ17PPeGG37miik40zLs"
                            alt="Google Drive"
                          />
                        </div>
                        <div>
                          <div className="integration-name">Google Drive</div>
                          <div className="integration-status">Not connected</div>
                        </div>
                      </div>
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION FOOTER */}
          <div className="action-footer">
            <button className="btn-discard">Discard Changes</button>
            <button className="btn-save">Save Changes</button>
          </div>
        </div>
      </main>
    </div>
  );
}