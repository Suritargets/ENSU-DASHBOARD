"use client";
import { useState, useReducer } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid, Area, AreaChart, Legend
} from "recharts";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"];

// ===== DATA =====
const initialEmployees = [
  { id:1, name:"Niel Kalpoe", role:"Directie / Admin Staff", email:"director@ensunv.com", lastLogin:"3 uur geleden", avatar:"NK" },
  { id:2, name:"Irshaad Fatehmahomed", role:"Admin Staff", email:"office@ensunv.com", lastLogin:"5 uur geleden", avatar:"IF" },
  { id:3, name:"Maria Roopnarine", role:"Admin Staff", email:"mroopnarine.ensunv@gmail.com", lastLogin:"5 uur geleden", avatar:"MR" },
  { id:4, name:"Priya Kedar", role:"Finance", email:"finance@ensunv.com", lastLogin:"5 uur geleden", avatar:"PK" },
  { id:5, name:"Walinda Lingard", role:"Teken Kamer", email:"wlingard436.ensunv@gmail.com", lastLogin:"32 min geleden", avatar:"WL" },
  { id:6, name:"Evani Esperance", role:"Teken Kamer", email:"evaniesperance.ensunv@gmail.com", lastLogin:"Gisteren", avatar:"EE" },
  { id:7, name:"Simone Soesanna", role:"Teken Kamer", email:"s.soesanna.ensunv@gmail.com", lastLogin:"Gisteren", avatar:"SS" },
  { id:8, name:"Shanita Sital", role:"Teken Kamer", email:"shsital.ensunv@gmail.com", lastLogin:"2 dagen geleden", avatar:"ShS" },
  { id:9, name:"Tanisha Sewradj", role:"Teken Kamer", email:"tsewradj.ensunv@gmail.com", lastLogin:"5 uur geleden", avatar:"TS" },
  { id:10, name:"Jojo Castillo", role:"Teken Kamer", email:"surveyor.ensunv@gmail.com", lastLogin:"7 dagen geleden", avatar:"JC" },
  { id:11, name:"Jonathan Sandie", role:"Teken Kamer", email:"jsandie.ensunv@gmail.com", lastLogin:"7 dagen geleden", avatar:"JS" },
  { id:12, name:"Manisha Ramharakh", role:"Teken Kamer", email:"manisharamharakh7.ensunv@gmail.com", lastLogin:"Een week geleden", avatar:"MaR" },
  { id:13, name:"Santusha Sital", role:"Admin Staff", email:"s.sital.ensunv@gmail.com", lastLogin:"5 dagen geleden", avatar:"SaS" },
  { id:14, name:"Kenscky Alimoestar", role:"Consultant / PM", email:"alimoestar@gmail.com", lastLogin:"56 min geleden", avatar:"KA" },
];

const initialEvaluations = [
  { id:1, employeeId:1, period:"Maart 2026", perfexAdoptie:88, takenAfgerond:15, takenOpen:3, urenGelogd:40, kwaliteit:9, samenwerking:9, perfexGebruik:8, opmerkingen:"Actief in Perfex, stuurt team aan vanuit directie." },
  { id:2, employeeId:2, period:"Maart 2026", perfexAdoptie:82, takenAfgerond:20, takenOpen:4, urenGelogd:42, kwaliteit:8, samenwerking:8, perfexGebruik:7, opmerkingen:"Betrouwbaar op kantoor, goed met facturatie." },
  { id:3, employeeId:3, period:"Maart 2026", perfexAdoptie:80, takenAfgerond:18, takenOpen:3, urenGelogd:40, kwaliteit:8, samenwerking:8, perfexGebruik:7, opmerkingen:"Consistent gebruik Perfex voor admin taken." },
  { id:4, employeeId:4, period:"Maart 2026", perfexAdoptie:85, takenAfgerond:22, takenOpen:2, urenGelogd:40, kwaliteit:9, samenwerking:8, perfexGebruik:8, opmerkingen:"Finance module goed onder de knie." },
  { id:5, employeeId:5, period:"Maart 2026", perfexAdoptie:92, takenAfgerond:25, takenOpen:1, urenGelogd:44, kwaliteit:9, samenwerking:9, perfexGebruik:9, opmerkingen:"Beste Perfex-gebruiker, zeer actief." },
  { id:6, employeeId:6, period:"Maart 2026", perfexAdoptie:70, takenAfgerond:16, takenOpen:5, urenGelogd:38, kwaliteit:7, samenwerking:7, perfexGebruik:6, opmerkingen:"Goede voortgang, meer uren loggen." },
  { id:7, employeeId:7, period:"Maart 2026", perfexAdoptie:68, takenAfgerond:14, takenOpen:6, urenGelogd:36, kwaliteit:7, samenwerking:7, perfexGebruik:6, opmerkingen:"Groeit in Perfex gebruik, gisteren actief." },
  { id:8, employeeId:10, period:"Maart 2026", perfexAdoptie:45, takenAfgerond:10, takenOpen:8, urenGelogd:28, kwaliteit:6, samenwerking:6, perfexGebruik:4, opmerkingen:"7 dagen niet ingelogd, opvolging nodig." },
  { id:9, employeeId:11, period:"Maart 2026", perfexAdoptie:42, takenAfgerond:9, takenOpen:9, urenGelogd:26, kwaliteit:6, samenwerking:6, perfexGebruik:3, opmerkingen:"7 dagen niet ingelogd, extra training nodig." },
  { id:10, employeeId:14, period:"Maart 2026", perfexAdoptie:95, takenAfgerond:30, takenOpen:5, urenGelogd:45, kwaliteit:9, samenwerking:9, perfexGebruik:10, opmerkingen:"Consultant/PM - monitort alles, topgebruiker." },
];

const initialProblems = [
  { id:1, title:"Teken Kamer medewerkers loggen uren niet consistent", category:"Perfex Adoptie", severity:"Hoog", status:"Open", assignee:"Kenscky Alimoestar", created:"2026-03-15", description:"Jojo Castillo en Jonathan Sandie al 7 dagen niet ingelogd." },
  { id:2, title:"Stagnatie kadastraal project Commewijne", category:"Stagnatie", severity:"Hoog", status:"In behandeling", assignee:"Niel Kalpoe", created:"2026-03-20", description:"Meting loopt 5 dagen achter door weer en terrein." },
  { id:3, title:"Facturen >30 dagen onbetaald (3 klanten)", category:"Financieel", severity:"Medium", status:"Open", assignee:"Priya Kedar", created:"2026-03-22", description:"Drie facturen staan >30 dagen open, opvolging via finance." },
  { id:4, title:"Perfex notificaties niet op mobiel", category:"Technisch", severity:"Medium", status:"Open", assignee:"Kenscky Alimoestar", created:"2026-03-25", description:"Push-notificaties komen niet door op Android voor buitendienst." },
  { id:5, title:"Website ensunv.com verouderd", category:"Digitalisering", severity:"Laag", status:"Gepland", assignee:"Kenscky Alimoestar", created:"2026-03-28", description:"Website vernieuwen met Next.js. Gepland Q2." },
  { id:6, title:"Manisha Ramharakh een week niet actief", category:"Perfex Adoptie", severity:"Medium", status:"Open", assignee:"Kenscky Alimoestar", created:"2026-03-30", description:"Teken Kamer medewerker al een week niet ingelogd in Perfex." },
];

const initialTasks = [
  { id:1, title:"Weekrapport genereren (Week 14)", project:"Perfex CRM Implementatie", assignee:"Kenscky Alimoestar", priority:"Hoog", status:"Te doen", deadline:"2026-04-04", type:"Rapport" },
  { id:2, title:"Training: facturen in Perfex", project:"Perfex CRM Implementatie", assignee:"Kenscky Alimoestar", priority:"Hoog", status:"Te doen", deadline:"2026-04-01", type:"Training" },
  { id:3, title:"Kadastrale meting perceel #487", project:"Kadaster Paramaribo Q2", assignee:"Walinda Lingard", priority:"Hoog", status:"In uitvoering", deadline:"2026-04-07", type:"Veldwerk" },
  { id:4, title:"Hoogtemetingen bouwproject Rainville", project:"Civiel Rainville", assignee:"Tanisha Sewradj", priority:"Medium", status:"In uitvoering", deadline:"2026-04-10", type:"Veldwerk" },
  { id:5, title:"Expertise rapport grensgeschil #12", project:"Juridisch 2026", assignee:"Niel Kalpoe", priority:"Hoog", status:"Review", deadline:"2026-04-03", type:"Rapport" },
  { id:6, title:"3 facturen versturen + opvolging", project:"Administratie", assignee:"Priya Kedar", priority:"Medium", status:"Te doen", deadline:"2026-04-02", type:"Financieel" },
  { id:7, title:"Stagnatie-scan taken >3 dagen", project:"Perfex CRM Implementatie", assignee:"Kenscky Alimoestar", priority:"Hoog", status:"Te doen", deadline:"Dagelijks", type:"Monitoring" },
  { id:8, title:"Website wireframes ontwerpen", project:"Digitalisering ENSU", assignee:"Kenscky Alimoestar", priority:"Laag", status:"Gepland", deadline:"2026-05-01", type:"Ontwikkeling" },
  { id:9, title:"Opvolging inactieve Teken Kamer", project:"Perfex CRM Implementatie", assignee:"Kenscky Alimoestar", priority:"Hoog", status:"Te doen", deadline:"2026-04-02", type:"Monitoring" },
  { id:10, title:"Office administratie digitaliseren", project:"Administratie", assignee:"Irshaad Fatehmahomed", priority:"Medium", status:"In uitvoering", deadline:"2026-04-15", type:"Administratie" },
];

const weeklyAdoption = [
  { week:"W10", adoptie:35, stagnatie:18 },
  { week:"W11", adoptie:48, stagnatie:14 },
  { week:"W12", adoptie:58, stagnatie:10 },
  { week:"W13", adoptie:72, stagnatie:7 },
  { week:"W14", adoptie:75, stagnatie:5 },
];

const projectStatus = [
  { name:"Afgerond", value:12, color:"#10b981" },
  { name:"In uitvoering", value:5, color:"#3b82f6" },
  { name:"Stilstaand", value:2, color:"#ef4444" },
  { name:"Gepland", value:3, color:"#6b7280" },
];

const urenPerRol = [
  { rol:"Teken Kamer", uren:220, target:280 },
  { rol:"Admin Staff", uren:120, target:120 },
  { rol:"Finance", uren:80, target:80 },
  { rol:"Directie", uren:40, target:40 },
  { rol:"Consultant/PM", uren:45, target:40 },
];

// ===== REDUCER =====
function reducer(state, action) {
  switch (action.type) {
    case "ADD_EVAL": return { ...state, evaluations:[...state.evaluations, { id:Date.now(), ...action.payload }] };
    case "ADD_PROBLEM": return { ...state, problems:[...state.problems, { id:Date.now(), ...action.payload }] };
    case "UPDATE_PROBLEM": return { ...state, problems:state.problems.map(p => p.id===action.id ? { ...p, status:action.status } : p) };
    case "ADD_TASK": return { ...state, tasks:[...state.tasks, { id:Date.now(), ...action.payload }] };
    case "UPDATE_TASK": return { ...state, tasks:state.tasks.map(t => t.id===action.id ? { ...t, status:action.status } : t) };
    default: return state;
  }
}

// ===== HELPERS =====
function Badge({ text, variant="default" }) {
  const s = { default:"bg-gray-800 text-gray-300", success:"bg-green-900 text-green-300", warning:"bg-yellow-900 text-yellow-300", danger:"bg-red-900 text-red-300", info:"bg-blue-900 text-blue-300", purple:"bg-purple-900 text-purple-300" };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s[variant]}`}>{text}</span>;
}

function StatCard({ label, value, sub, color="blue", icon }) {
  const c = { blue:"bg-blue-950 text-blue-300 border-blue-900", green:"bg-green-950 text-green-300 border-green-900", yellow:"bg-yellow-950 text-yellow-300 border-yellow-900", red:"bg-red-950 text-red-300 border-red-900", purple:"bg-purple-950 text-purple-300 border-purple-900" };
  return (
    <div className={`rounded-xl border p-4 ${c[color]}`}>
      <div className="text-xs font-medium opacity-80">{icon} {label}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
      {sub && <div className="text-xs mt-1 opacity-70">{sub}</div>}
    </div>
  );
}

// ===== MAIN =====
export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, { employees:initialEmployees, evaluations:initialEvaluations, problems:initialProblems, tasks:initialTasks });
  const [tab, setTab] = useState("dashboard");
  const [showEvalForm, setShowEvalForm] = useState(false);
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selEmp, setSelEmp] = useState(null);

  const [newEval, setNewEval] = useState({ employeeId:1, period:"April 2026", perfexAdoptie:50, takenAfgerond:0, takenOpen:0, urenGelogd:0, kwaliteit:5, samenwerking:5, perfexGebruik:5, opmerkingen:"" });
  const [newProb, setNewProb] = useState({ title:"", category:"Perfex Adoptie", severity:"Medium", status:"Open", assignee:"Ken", description:"" });
  const [newTask, setNewTask] = useState({ title:"", project:"Perfex CRM Implementatie", assignee:"Ken", priority:"Medium", status:"Te doen", deadline:"", type:"Rapport" });

  const avgAdoption = Math.round(state.evaluations.reduce((s,e) => s+e.perfexAdoptie, 0) / state.evaluations.length);
  const openProbs = state.problems.filter(p => p.status==="Open").length;
  const highSev = state.problems.filter(p => p.severity==="Hoog" && p.status!=="Opgelost").length;
  const openTasks = state.tasks.filter(t => t.status!=="Afgerond").length;

  const tabs = [
    { id:"dashboard", label:"Dashboard", icon:"📊" },
    { id:"evaluaties", label:"Evaluaties", icon:"👥" },
    { id:"problemen", label:"Problemen", icon:"⚠️" },
    { id:"taken", label:"Taken", icon:"📋" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* HEADER */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">ENSU N.V. — Intern Dashboard</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">Engineering Surveys · Paramaribo, Suriname · Perfex CRM</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge text={`Adoptie: ${avgAdoption}%`} variant={avgAdoption>=80?"success":avgAdoption>=60?"warning":"danger"} />
            <Badge text={`${openProbs} problemen`} variant={openProbs>3?"danger":"warning"} />
            <Badge text={`${openTasks} taken`} variant="info" />
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex gap-1 px-4 md:px-6 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 md:px-4 py-3 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${tab===t.id ? "bg-gray-800 text-white border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-200"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-6">

        {/* ========== DASHBOARD ========== */}
        {tab==="dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              <StatCard icon="📈" label="Perfex Adoptie" value={`${avgAdoption}%`} sub="Target: 80-90%" color={avgAdoption>=80?"green":avgAdoption>=60?"yellow":"red"} />
              <StatCard icon="⚠️" label="Stagnatie" value={`${weeklyAdoption[weeklyAdoption.length-1].stagnatie}%`} sub="Target: <5%" color={weeklyAdoption[weeklyAdoption.length-1].stagnatie<=5?"green":"red"} />
              <StatCard icon="🔴" label="Hoog Prio" value={highSev} sub="problemen" color={highSev>0?"red":"green"} />
              <StatCard icon="📋" label="Open Taken" value={openTasks} sub="totaal" color="blue" />
              <StatCard icon="👥" label="Team" value={state.employees.length} sub="actief" color="purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-4">Adoptie & Stagnatie Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={weeklyAdoption}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="week" tick={{ fill:"#9ca3af", fontSize:12 }} />
                    <YAxis tick={{ fill:"#9ca3af", fontSize:12 }} />
                    <Tooltip contentStyle={{ backgroundColor:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#fff" }} />
                    <Area type="monotone" dataKey="adoptie" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} name="Adoptie %" />
                    <Area type="monotone" dataKey="stagnatie" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} name="Stagnatie %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-4">Projecten Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={projectStatus} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {projectStatus.map((e,i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">Uren per Rol</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={urenPerRol} layout="vertical" margin={{ left:90 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" tick={{ fill:"#9ca3af", fontSize:12 }} />
                  <YAxis type="category" dataKey="rol" tick={{ fill:"#e5e7eb", fontSize:13 }} width={90} />
                  <Tooltip contentStyle={{ backgroundColor:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#fff" }} />
                  <Bar dataKey="uren" fill="#3b82f6" radius={[0,6,6,0]} name="Gelogd" />
                  <Bar dataKey="target" fill="#374151" radius={[0,6,6,0]} name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Recente Problemen</h3>
                  <button onClick={() => setTab("problemen")} className="text-xs text-blue-400 hover:text-blue-300">Alles →</button>
                </div>
                {state.problems.filter(p => p.status!=="Opgelost").slice(0,4).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <div><div className="text-sm text-gray-200">{p.title}</div><div className="text-xs text-gray-500">{p.assignee}</div></div>
                    <Badge text={p.severity} variant={p.severity==="Hoog"?"danger":"warning"} />
                  </div>
                ))}
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Deadlines</h3>
                  <button onClick={() => setTab("taken")} className="text-xs text-blue-400 hover:text-blue-300">Alles →</button>
                </div>
                {state.tasks.filter(t => t.status!=="Afgerond").slice(0,4).map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <div><div className="text-sm text-gray-200">{t.title}</div><div className="text-xs text-gray-500">{t.assignee} · {t.deadline}</div></div>
                    <Badge text={t.priority} variant={t.priority==="Hoog"?"danger":"warning"} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== EVALUATIES ========== */}
        {tab==="evaluaties" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Personeelsevaluaties</h2>
              <button onClick={() => setShowEvalForm(!showEvalForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Nieuwe evaluatie</button>
            </div>
            {showEvalForm && (
              <div className="bg-gray-900 border border-blue-800 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-blue-300">Nieuwe Evaluatie</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <select value={newEval.employeeId} onChange={e => setNewEval({...newEval, employeeId:+e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                    {state.employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                  </select>
                  <input value={newEval.period} onChange={e => setNewEval({...newEval, period:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" placeholder="Periode" />
                  <input type="number" min="0" max="100" value={newEval.perfexAdoptie} onChange={e => setNewEval({...newEval, perfexAdoptie:+e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" placeholder="Adoptie %" />
                  <input type="number" value={newEval.urenGelogd} onChange={e => setNewEval({...newEval, urenGelogd:+e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" placeholder="Uren" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[["kwaliteit","Kwaliteit"],["samenwerking","Samenwerking"],["perfexGebruik","Perfex"]].map(([k,l]) => (
                    <div key={k}><label className="text-xs text-gray-400">{l}: {newEval[k]}/10</label><input type="range" min="1" max="10" value={newEval[k]} onChange={e => setNewEval({...newEval,[k]:+e.target.value})} className="w-full accent-blue-500" /></div>
                  ))}
                </div>
                <input value={newEval.opmerkingen} onChange={e => setNewEval({...newEval, opmerkingen:e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" placeholder="Opmerkingen..." />
                <button onClick={() => { dispatch({ type:"ADD_EVAL", payload:newEval }); setShowEvalForm(false); }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Opslaan</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.employees.map(emp => {
                const ev = state.evaluations.filter(e => e.employeeId===emp.id).slice(-1)[0];
                if(!ev) return null;
                return (
                  <div key={emp.id} onClick={() => setSelEmp(selEmp===emp.id?null:emp.id)}
                    className={`bg-gray-900 border rounded-xl p-5 cursor-pointer transition-colors ${selEmp===emp.id?"border-blue-500":"border-gray-800 hover:border-gray-700"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center text-sm font-bold">{emp.avatar}</div>
                      <div><div className="font-semibold text-white">{emp.name}</div><div className="text-xs text-gray-500">{emp.role}</div></div>
                    </div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Adoptie</span><span className={ev.perfexAdoptie>=80?"text-green-400":ev.perfexAdoptie>=60?"text-yellow-400":"text-red-400"}>{ev.perfexAdoptie}%</span></div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                      <div className="h-full rounded-full" style={{ width:`${ev.perfexAdoptie}%`, backgroundColor:ev.perfexAdoptie>=80?"#10b981":ev.perfexAdoptie>=60?"#f59e0b":"#ef4444" }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center"><div className="text-xs text-gray-500">Kwaliteit</div><div className="font-bold">{ev.kwaliteit}/10</div></div>
                      <div className="text-center"><div className="text-xs text-gray-500">Samenw.</div><div className="font-bold">{ev.samenwerking}/10</div></div>
                      <div className="text-center"><div className="text-xs text-gray-500">Perfex</div><div className="font-bold">{ev.perfexGebruik}/10</div></div>
                    </div>
                    {selEmp===emp.id && <div className="mt-3 pt-3 border-t border-gray-800"><div className="text-xs text-gray-400 italic">&quot;{ev.opmerkingen}&quot;</div><div className="text-xs text-gray-600 mt-1">Taken: {ev.takenAfgerond} klaar / {ev.takenOpen} open · {ev.urenGelogd}u gelogd</div></div>}
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">Team Vergelijking</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={state.employees.map(emp => { const ev=state.evaluations.filter(e => e.employeeId===emp.id).slice(-1)[0]; return { name:emp.name.split(" ")[0], adoptie:ev?.perfexAdoptie||0, kwaliteit:(ev?.kwaliteit||0)*10, perfex:(ev?.perfexGebruik||0)*10 }; })}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill:"#e5e7eb", fontSize:12 }} />
                  <YAxis tick={{ fill:"#9ca3af", fontSize:12 }} domain={[0,100]} />
                  <Tooltip contentStyle={{ backgroundColor:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#fff" }} />
                  <Legend wrapperStyle={{ fontSize:12 }} />
                  <Bar dataKey="adoptie" fill="#3b82f6" name="Adoptie %" radius={[4,4,0,0]} />
                  <Bar dataKey="kwaliteit" fill="#10b981" name="Kwaliteit" radius={[4,4,0,0]} />
                  <Bar dataKey="perfex" fill="#f59e0b" name="Perfex" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ========== PROBLEMEN ========== */}
        {tab==="problemen" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Probleemtracker</h2>
              <button onClick={() => setShowProblemForm(!showProblemForm)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Meld probleem</button>
            </div>
            {showProblemForm && (
              <div className="bg-gray-900 border border-red-800 rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <input placeholder="Titel" value={newProb.title} onChange={e => setNewProb({...newProb, title:e.target.value})} className="col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" />
                  <select value={newProb.category} onChange={e => setNewProb({...newProb, category:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                    {["Perfex Adoptie","Stagnatie","Financieel","Technisch","Digitalisering","HR","Klant"].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <select value={newProb.severity} onChange={e => setNewProb({...newProb, severity:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                    <option>Hoog</option><option>Medium</option><option>Laag</option>
                  </select>
                  <select value={newProb.assignee} onChange={e => setNewProb({...newProb, assignee:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                    {["Ken",...state.employees.map(e => e.name)].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <textarea placeholder="Beschrijving..." value={newProb.description} onChange={e => setNewProb({...newProb, description:e.target.value})} className="col-span-2 md:col-span-3 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" rows={2} />
                </div>
                <button onClick={() => { dispatch({ type:"ADD_PROBLEM", payload:{...newProb, created:new Date().toISOString().split("T")[0]} }); setShowProblemForm(false); setNewProb({ title:"", category:"Perfex Adoptie", severity:"Medium", status:"Open", assignee:"Ken", description:"" }); }} disabled={!newProb.title} className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm">Melden</button>
              </div>
            )}
            {state.problems.map(p => (
              <div key={p.id} className={`bg-gray-900 border rounded-xl p-5 ${p.status==="Opgelost"?"border-green-800 opacity-60":p.severity==="Hoog"?"border-red-800":"border-gray-800"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-white">{p.title}</h4>
                      <Badge text={p.severity} variant={p.severity==="Hoog"?"danger":"warning"} />
                      <Badge text={p.category} variant="info" />
                      <Badge text={p.status} variant={p.status==="Opgelost"?"success":p.status==="In behandeling"?"purple":"default"} />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{p.description}</p>
                    <div className="text-xs text-gray-600 mt-1">{p.assignee} · {p.created}</div>
                  </div>
                  {p.status!=="Opgelost" && (
                    <div className="flex gap-1">
                      <button onClick={() => dispatch({ type:"UPDATE_PROBLEM", id:p.id, status:"In behandeling" })} className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded hover:bg-purple-800">Behandel</button>
                      <button onClick={() => dispatch({ type:"UPDATE_PROBLEM", id:p.id, status:"Opgelost" })} className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded hover:bg-green-800">Opgelost</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== TAKEN ========== */}
        {tab==="taken" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Taken & Projecten</h2>
              <button onClick={() => setShowTaskForm(!showTaskForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Nieuwe taak</button>
            </div>
            {showTaskForm && (
              <div className="bg-gray-900 border border-blue-800 rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <input placeholder="Titel" value={newTask.title} onChange={e => setNewTask({...newTask, title:e.target.value})} className="col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" />
                  <select value={newTask.type} onChange={e => setNewTask({...newTask, type:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                    {["Rapport","Training","Veldwerk","Financieel","Monitoring","Ontwikkeling"].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <input placeholder="Project" value={newTask.project} onChange={e => setNewTask({...newTask, project:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" />
                  <select value={newTask.assignee} onChange={e => setNewTask({...newTask, assignee:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                    {["Ken",...state.employees.map(e => e.name)].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <input type="date" value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline:e.target.value})} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
                <button onClick={() => { dispatch({ type:"ADD_TASK", payload:newTask }); setShowTaskForm(false); setNewTask({ title:"", project:"Perfex CRM Implementatie", assignee:"Ken", priority:"Medium", status:"Te doen", deadline:"", type:"Rapport" }); }} disabled={!newTask.title} className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm">Toevoegen</button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Te doen","In uitvoering","Review","Afgerond"].map(status => (
                <div key={status} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-300 text-sm">{status}</h3>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{state.tasks.filter(t => t.status===status).length}</span>
                  </div>
                  <div className="space-y-2">
                    {state.tasks.filter(t => t.status===status).map(task => (
                      <div key={task.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <div className="text-sm text-white font-medium">{task.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{task.project}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{task.assignee}</span>
                          <Badge text={task.priority} variant={task.priority==="Hoog"?"danger":"warning"} />
                        </div>
                        {task.deadline && task.deadline!=="Dagelijks" && <div className="text-xs text-gray-600 mt-1">{task.deadline}</div>}
                        {status!=="Afgerond" && (
                          <button onClick={() => dispatch({ type:"UPDATE_TASK", id:task.id, status:status==="Te doen"?"In uitvoering":status==="In uitvoering"?"Review":"Afgerond" })}
                            className="mt-2 w-full text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded hover:bg-blue-800">
                            {status==="Te doen"?"▶ Start":status==="In uitvoering"?"📝 Review":"✅ Afronden"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 px-6 py-3 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs text-gray-500 gap-1">
          <span>ENSU N.V. Intern Dashboard v1.0 — Built by Ken&apos;s Agency</span>
          <span>Engineering Surveys · Paramaribo, Suriname</span>
        </div>
      </footer>
    </div>
  );
}
