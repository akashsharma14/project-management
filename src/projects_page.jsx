import { useState } from "react";

const PRIMARY = "#7c3bed";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mso {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-weight: normal;
    font-style: normal;
    font-size: 22px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }
  .mso-filled { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  .mso-sm { font-size: 18px; }
  .mso-xs { font-size: 16px; }

  .projects-root {
    font-family: 'Inter', sans-serif;
    background: #f7f6f8;
    display: flex;
    height: 100vh;
    overflow: hidden;
    color: #0f172a;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px;
    min-width: 240px;
    background: white;
    border-right: 1px solid rgba(124,59,237,0.1);
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    flex-shrink: 0;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 22px 24px;
  }
  .brand-icon {
    width: 40px; height: 40px;
    background: ${PRIMARY};
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: white; flex-shrink: 0;
  }
  .brand-icon .mso { font-size: 20px; }
  .brand-name { font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.2; }
  .brand-sub  { font-size: 11px; color: #94a3b8; margin-top: 2px; }

  .sidebar-nav {
    flex: 1;
    padding: 4px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow-y: auto;
  }
  .nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px; font-weight: 500;
    color: #475569;
    cursor: pointer;
    background: none; border: none; width: 100%; text-align: left;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .nav-link:hover { background: rgba(124,59,237,0.05); color: ${PRIMARY}; }
  .nav-link:hover .mso { color: ${PRIMARY}; }
  .nav-link.active { background: rgba(124,59,237,0.08); color: ${PRIMARY}; font-weight: 600; }
  .nav-link .mso { font-size: 20px; flex-shrink: 0; color: #64748b; }
  .nav-link.active .mso { color: ${PRIMARY}; }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid rgba(124,59,237,0.08);
  }
  .storage-card {
    background: rgba(124,59,237,0.04);
    border-radius: 12px;
    padding: 14px 16px;
  }
  .storage-label {
    font-size: 10px; font-weight: 700;
    color: ${PRIMARY};
    text-transform: uppercase; letter-spacing: 1.2px;
    margin-bottom: 8px;
  }
  .storage-bar-bg {
    width: 100%; height: 6px;
    background: rgba(124,59,237,0.15);
    border-radius: 99px;
    margin-bottom: 8px;
    overflow: hidden;
  }
  .storage-bar-fill {
    height: 100%;
    background: ${PRIMARY};
    border-radius: 99px;
    transition: width 0.4s ease;
  }
  .storage-text { font-size: 10px; color: #64748b; }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

  /* TOPBAR */
  .topbar {
    height: 64px;
    background: white;
    border-bottom: 1px solid rgba(124,59,237,0.08);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px;
    flex-shrink: 0; gap: 16px;
  }
  .search-wrap { position: relative; flex: 1; max-width: 400px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 18px; pointer-events: none; }
  .search-input {
    width: 100%;
    background: rgba(124,59,237,0.04);
    border: none; border-radius: 8px;
    padding: 9px 14px 9px 38px;
    font-size: 13px; font-family: 'Inter', sans-serif; color: #0f172a;
    outline: none; transition: box-shadow 0.2s;
  }
  .search-input::placeholder { color: #94a3b8; }
  .search-input:focus { box-shadow: 0 0 0 2px rgba(124,59,237,0.2); }

  .topbar-right { display: flex; align-items: center; gap: 8px; }
  .notif-btn {
    position: relative; background: none; border: none; cursor: pointer;
    padding: 8px; border-radius: 8px; color: #475569;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .notif-btn:hover { background: rgba(124,59,237,0.05); }
  .notif-dot {
    position: absolute; top: 8px; right: 8px;
    width: 8px; height: 8px;
    background: #ef4444; border-radius: 50%; border: 2px solid white;
  }

  .user-info-wrap {
    display: flex; align-items: center; gap: 12px;
    padding-left: 20px;
    border-left: 1px solid rgba(124,59,237,0.1);
  }
  .user-text { text-align: right; }
  .user-name { font-size: 13px; font-weight: 600; color: #0f172a; }
  .user-role { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .user-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(124,59,237,0.2);
    cursor: pointer;
  }

  /* CONTENT */
  .content { flex: 1; overflow-y: auto; padding: 32px; }

  .content-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 16px; margin-bottom: 28px;
  }
  .page-title { font-size: 28px; font-weight: 900; letter-spacing: -0.5px; color: #0f172a; }
  .page-sub { font-size: 14px; color: #64748b; margin-top: 4px; }

  .btn-create-project {
    display: flex; align-items: center; gap: 8px;
    background: ${PRIMARY}; color: white;
    border: none; border-radius: 12px;
    padding: 11px 22px;
    font-size: 14px; font-weight: 700;
    cursor: pointer; white-space: nowrap;
    box-shadow: 0 4px 14px rgba(124,59,237,0.3);
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .btn-create-project:hover { background: #6b2ed6; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,59,237,0.38); }
  .btn-create-project:active { transform: translateY(0); }
  .btn-create-project .mso { font-size: 20px; }

  /* FILTERS BAR */
  .filters-bar {
    display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
    margin-bottom: 28px;
  }
  .filter-pill {
    padding: 6px 18px; border-radius: 99px;
    font-size: 13px; font-weight: 500;
    cursor: pointer; border: none; transition: all 0.2s;
  }
  .filter-pill.active { background: ${PRIMARY}; color: white; }
  .filter-pill.inactive {
    background: white; color: #475569;
    border: 1px solid rgba(124,59,237,0.12);
  }
  .filter-pill.inactive:hover { border-color: ${PRIMARY}; color: ${PRIMARY}; }

  .view-toggle-wrap { margin-left: auto; }
  .view-toggle {
    display: flex; align-items: center;
    background: white; border: 1px solid rgba(124,59,237,0.1);
    border-radius: 8px; padding: 4px; gap: 2px;
  }
  .view-btn {
    background: none; border: none; cursor: pointer;
    padding: 6px; border-radius: 6px;
    color: #94a3b8; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .view-btn.active { background: rgba(124,59,237,0.1); color: ${PRIMARY}; }
  .view-btn:hover:not(.active) { background: rgba(124,59,237,0.04); color: #475569; }
  .view-btn .mso { font-size: 18px; }

  /* PROJECT GRID */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* PROJECT CARD */
  .project-card {
    background: white;
    border: 1px solid rgba(124,59,237,0.06);
    border-radius: 14px;
    padding: 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    cursor: default;
    position: relative;
  }
  .project-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.09);
    transform: translateY(-2px);
    border-color: rgba(124,59,237,0.12);
  }
  .project-card:hover .project-name { color: ${PRIMARY}; }

  .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  .card-icon {
    width: 46px; height: 46px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .card-icon .mso { font-size: 22px; }

  .more-btn {
    background: none; border: none; cursor: pointer;
    color: #94a3b8; padding: 4px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.15s, background 0.15s;
  }
  .more-btn:hover { color: ${PRIMARY}; background: rgba(124,59,237,0.06); }

  .project-name { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 6px; transition: color 0.2s; }
  .project-desc { font-size: 13px; color: #64748b; line-height: 1.55; margin-bottom: 24px; }

  .progress-section { margin-bottom: 24px; }
  .progress-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .progress-label { font-size: 13px; font-weight: 500; color: #334155; }
  .progress-pct { font-size: 13px; font-weight: 700; color: ${PRIMARY}; }
  .progress-track {
    width: 100%; height: 7px;
    background: rgba(124,59,237,0.1);
    border-radius: 99px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: ${PRIMARY};
    border-radius: 99px;
    transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  }

  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid rgba(124,59,237,0.05);
  }
  .avatar-stack { display: flex; }
  .stack-av {
    width: 30px; height: 30px; border-radius: 50%;
    border: 2px solid white;
    object-fit: cover; background: #e2e8f0;
    margin-left: -8px;
  }
  .stack-av:first-child { margin-left: 0; }
  .stack-more {
    width: 30px; height: 30px; border-radius: 50%;
    border: 2px solid white;
    background: rgba(124,59,237,0.1);
    color: ${PRIMARY};
    font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin-left: -8px;
  }
  .task-count { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #64748b; }
  .task-count .mso { font-size: 16px; color: #94a3b8; }

  /* ADD NEW PROJECT CARD */
  .new-project-card {
    border: 2px dashed rgba(124,59,237,0.22);
    border-radius: 14px;
    padding: 24px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    cursor: pointer;
    background: rgba(255,255,255,0.6);
    color: #94a3b8;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    min-height: 200px;
  }
  .new-project-card:hover {
    border-color: rgba(124,59,237,0.5);
    color: ${PRIMARY};
    background: rgba(124,59,237,0.02);
  }
  .new-project-icon {
    width: 48px; height: 48px; border-radius: 50%;
    background: rgba(124,59,237,0.06);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    transition: background 0.2s;
  }
  .new-project-card:hover .new-project-icon { background: rgba(124,59,237,0.12); }
  .new-project-icon .mso { font-size: 26px; }
  .new-project-name { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  .new-project-hint { font-size: 12px; }
`;

const NAV = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "folder",    label: "Projects",      active: true, filled: true },
  { icon: "check_box", label: "Tasks" },
  { icon: "group",     label: "Team" },
  { icon: "notifications", label: "Notifications" },
  { icon: "settings",  label: "Settings" },
];

const FILTERS = ["All Projects", "Active", "Completed", "On Hold"];

const PROJECTS = [
  {
    icon: "design_services",
    iconBg: "#f3e8ff", iconColor: PRIMARY,
    name: "SaaS Design System",
    desc: "Unified UI components for the web dashboard.",
    progress: 65,
    tasks: 12,
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_hygXY35qs9c6TMRr5QYCwgJt9_j1Q8bUnaiOQXykTGedrbiM4By2Q_BPVDbf4clN_2PrwKZqGh69pLlghji9-Wv1FBfmFlUi4pMq4YGitj4QJBlHf3882Ejrh9aw4f2CgfCCQPdIVFoxT9CkYlQvEoMbicZUQAnf1k65mCi2tbj3IGJUgecHNIHsSRg2M0DRwsCVtP9VKY4hAcKAoKOs6u45edXAAHjA26JUSwbg4R0AToXZeZEyj_90si4xI3rkGRY_AsxU3GPb",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsvJK8UDgdLrY0bCUG3q9Z47HO66ozJLe5VxAin7ogH4Lii2wy22I_d0U4eQn00XWyfQGT6RLGXNd0lSaps2jB4YTFfE9XkH2p7KWcTt5lTIhcuQKrVYlKkH4Kr2OZGRuRs7XmrdP5ZHMJW5MNnL5mTIieQ0Bg8kOi6JXAbMqtShyO-4v6nmVfATVudGPDdhtlxulwfsblpWssJ-R2FiFQIc0aSvAGQ_WFeywxwrwUhQ8-1Qbb6I_KXNuqNt39-S3piVqig37s3nvH",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjtWwbmhuZGiVdu2LiWzrOtwrabpv3m26LcDlre_TIwcg761LhvA4kim7ivOuO-eVN6krhSw5JBMdkuIKSqL-l53qSh79rxX2H2PWuJro4x3vKtH-Y20ym5_A-ecBj3hfx_B76vF2tUkyqAX06iJsiAc7P05PA-HdyvICHsbtiDF5lNLojBwtRqv66RrkA3GdlrZ2DsegZ9bG2-Ob0yU4uoX7F8NkE1mHqXNJonjq504ENeAM4RjidN3TcMQqfAPfhDSUjo1P39sDi",
    ],
    extra: "+2",
  },
  {
    icon: "smartphone",
    iconBg: "#eff6ff", iconColor: "#3b82f6",
    name: "Mobile App Refresh",
    desc: "Updating the iOS and Android mobile experiences.",
    progress: 28,
    tasks: 45,
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCd2lqqEmtHT7gR2iofgkZ3LU_Rl8G5LYKPexmBEmHXKBc-QHrH26pXGSODc6aSIFsiaQaHIi0dp_0VvJ8ttAoE8BE05n_LrQ_RQMizKbGG495SLiOLtGm1XtcPlgjK6Z8Q2QwlAaMU8RO-01BpLTVjpzCm2aF45e5rOhDfXSoaxW1m4CHmQWHLj-beykrkBBKHRH3naXEbVRBtyHH1D3-qHwHfAoIGzTlA-iupd6fD2ullyOArIr-EyAmHUC25DxuxY2BxjJriOoA_",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdwvSM-aHS0__eMd1O74Tws9Nl-sd3GIwBI_-76RO_bhAp8lkOkxXaMyVyDaeO2EA0sY1d6E99iRiqIkEsUHmePqMuNzYUdYG1JaoC_6Qusy0_VbO-RmZiGW6eryFmupWdxUz3pYKavCcfMPyZSQKV6h73s_k3EXvzTyppUQD2FSldNp03ieCyjev7VOZnHjIRRtQOU9_zqjWj59zpM0qcHRIqiJYCerEGDjLf29iSh9iCpV_-LaJB8e4J3F2oCsZsly2I1zfxfFZc",
    ],
    extra: "+4",
  },
  {
    icon: "monitoring",
    iconBg: "#ecfdf5", iconColor: "#059669",
    name: "Marketing Analytics",
    desc: "Q3 performance tracking and data visualization.",
    progress: 92,
    tasks: 8,
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCuaLjxJm0nHZ0pLepsN79wVUtSo89TB9rYLLwUNhFfauyWw5fQUkDq2O_UMAQw_0hrnt2X_uR_kIDj546gUypLE5MPB5eCLVo6PIBXHjaxt1E2RRmr8uIRrhIPdlaxXxt51Dsz5PfFg16QD7b1Lr_Zu9lMaKh8_gn0GQ_FWdp5-FULjyesmjAOTY8Dq3q7RPoe-oXhfDCMyNslUmELAEDnduT-vGf0kWZGyQBmxTrU7PbahFMSe872YTVXQwrG7hOUgvpG-nR42YL",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEuNRyMr5dKaEzCrHu6SuU6USPwgFk2QTS9zvV40GdmFFsCCQQlB-GKZtoUxxHg-UH2luus-wTZQotbP_1Rk48-XH2FMq-N3WLmjIDIE__kqv7QPsAsNbeJ7kv6LMAl90mWnQq1q0D-aHrWpcF_jqivP8QMqovEQ7EOgDvcZqXhISjjs7qBpK43L2Qiyfz9c2dvEhyv1l3a_bJqSSwgAwNgMl0ZXBuZUuOA9y3BFmOLx2I0wAedNcKkAC07SsaFB_6u8ISAPzEfhyC",
    ],
    extra: null,
  },
  {
    icon: "payments",
    iconBg: "#fff7ed", iconColor: "#ea580c",
    name: "Payment Gateway",
    desc: "Stripe integration and checkout optimization.",
    progress: 40,
    tasks: 21,
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPA3Qdslvl1CBWcsqbRmGTo_dggIofigYwK-Q0xkt7L_i-kV509lwA4cqMtU2cvrEz_6dL6_Y-tK96CL5QAFPhb09DtDbBN8IZdeBFY3Ig2N9QI68zNtI9MnwO8KDlPkA-f1tmzEIe6STAfEI4G4zGcVCNaXCFxdNnOZSLqErCwplzqkC2NWvbWEDjISr2G10mk5GgcEsX2b8ZAviFHKeMk2rSNNAej2QfCtMfMhULg7XOj9GJQlp0Kwlk0K1o68VHV6GqtEKYs2ln",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6siFfXaWzutcUdvRgMf7xuD73KbuCasruJUEWPpyfMtPQSiyc2GpeP2-6tCimQ5BKPpQ1gOALgpGyD-TigMXflvjEmc9O2K62zGdXLH8goy1FiUTTXIegBFmFidij3dZEs5R3YGITXItsg2DDCAmV5k2VR4W5974IB8838Yg6RS-RjMPTvUC-da8YaYHz1ToJFZCAUC00phsw7cWTBRj0YvdZaOcp9U06hmOV3pDrHt9nLBiVajcE4f41cyXkV3aSTJALh3zAJ1Va",
    ],
    extra: "+1",
  },
  {
    icon: "campaign",
    iconBg: "#fdf2f8", iconColor: "#db2777",
    name: "Branding Overhaul",
    desc: "New logo, typography, and brand voice guidelines.",
    progress: 15,
    tasks: 16,
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB47dzUSjbDeG6KBiZmh78V2M7DLtJDu_Teov8fzgBmOqFogY_T9D5Q01bhyo61qGsO9JdnP1Td1L8ipcPlNV_V2FpKGfpV1xEjbAWZ99Zd8-jACe4Ab9pjU0g223mr_FdBYzw77537JFeLoKa1h2r9YD6OnMgiUv9aI6bDuVVddBBjJ8ShOkVhqcMFmZmnpOhHneZ6BLJmIdKPa20w7oD4NVYKTjeFjGNq-8JTghEjfdIP0mOT1rqV3MMbKFZxS8dnduIPSEq-to0-",
    ],
    extra: null,
  },
];

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="card-top">
        <div className="card-icon" style={{ background: project.iconBg }}>
          <span className="mso" style={{ color: project.iconColor }}>{project.icon}</span>
        </div>
        <button className="more-btn">
          <span className="mso mso-sm">more_horiz</span>
        </button>
      </div>

      <div className="project-name">{project.name}</div>
      <div className="project-desc">{project.desc}</div>

      <div className="progress-section">
        <div className="progress-row">
          <span className="progress-label">Progress</span>
          <span className="progress-pct">{project.progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="card-footer">
        <div className="avatar-stack">
          {project.avatars.map((src, i) => (
            <img key={i} className="stack-av" src={src} alt="member" />
          ))}
          {project.extra && (
            <div className="stack-more">{project.extra}</div>
          )}
        </div>
        <div className="task-count">
          <span className="mso mso-xs">task_alt</span>
          <span>{project.tasks} Tasks</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [activeView, setActiveView] = useState("grid");
  const [search, setSearch] = useState("");

  return (
    <div className="projects-root">
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="mso">rocket_launch</span>
          </div>
          <div>
            <div className="brand-name">Smart Project</div>
            <div className="brand-sub">Management SaaS</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ icon, label, active, filled }) => (
            <button key={label} className={`nav-link${active ? " active" : ""}`}>
              <span className={`mso${active && filled ? " mso-filled" : ""}`}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="storage-card">
            <div className="storage-label">Storage</div>
            <div className="storage-bar-bg">
              <div className="storage-bar-fill" style={{ width: "75%" }} />
            </div>
            <div className="storage-text">7.5 GB of 10 GB used</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="search-wrap">
            <span className="mso search-icon">search</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search projects, tasks, or files..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="topbar-right">
            <button className="notif-btn">
              <span className="mso">notifications</span>
              <span className="notif-dot" />
            </button>
            <div className="user-info-wrap">
              <div className="user-text">
                <div className="user-name">Alex Rivera</div>
                <div className="user-role">Project Manager</div>
              </div>
              <img
                className="user-avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8OxCy-EOrfP7CNuhOAI0R0sMkxLyukQA9slUBrYb5mHVgQQ4iFAlWYhEdi-amF5hmWMxp8hOVMIEWSd7gRdgQp3g2XMIRVPzb6oWxAVchNy1Z_SwWiT0NosZr1kCugjJqY7GGNkmEiiTX0BggaXJEvcEGvBf6ssMFypXsm4UQYFQyxAPdF0ATpYoujmGnVhNG5yqOMt0Ey6waTHjGCxW0OOKLLu70tkVY18ZEY5qN8HBSgfu5i9r5PpkMNwFZBrDkdCalF933Eyj_"
                alt="Alex Rivera"
              />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="content">
          {/* HEADER ROW */}
          <div className="content-header">
            <div>
              <h2 className="page-title">Projects</h2>
              <p className="page-sub">You have 12 active projects this month</p>
            </div>
            <button className="btn-create-project">
              <span className="mso">add</span>
              Create Project
            </button>
          </div>

          {/* FILTERS BAR */}
          <div className="filters-bar">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-pill ${activeFilter === f ? "active" : "inactive"}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
            <div className="view-toggle-wrap">
              <div className="view-toggle">
                <button
                  className={`view-btn${activeView === "grid" ? " active" : ""}`}
                  onClick={() => setActiveView("grid")}
                  title="Grid view"
                >
                  <span className="mso">grid_view</span>
                </button>
                <button
                  className={`view-btn${activeView === "list" ? " active" : ""}`}
                  onClick={() => setActiveView("list")}
                  title="List view"
                >
                  <span className="mso">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* PROJECTS GRID */}
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}

            {/* ADD NEW CARD */}
            <div className="new-project-card">
              <div className="new-project-icon">
                <span className="mso">add</span>
              </div>
              <div className="new-project-name">Add New Project</div>
              <div className="new-project-hint">Select a template or start blank</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}