import { useState } from "react";

const today = new Date();
const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDay(year, month) { return new Date(year, month, 1).getDay(); }

const INITIAL_TASKS = [
  { id: 1, text: "Revisar correos importantes", done: true, priority: "alta" },
  { id: 2, text: "Reunión con el equipo de diseño", done: false, priority: "alta" },
  { id: 3, text: "Actualizar documentación del proyecto", done: false, priority: "media" },
  { id: 4, text: "Preparar presentación del viernes", done: false, priority: "alta" },
  { id: 5, text: "Responder mensajes pendientes", done: true, priority: "baja" },
  { id: 6, text: "Revisar pull requests", done: false, priority: "media" },
];

const STATS = [
  { label: "Tareas completadas", value: "12", sub: "de 18 esta semana", color: "#EF7270" },
  { label: "Horas enfocadas", value: "6.5h", sub: "hoy", color: "#EE9F80" },
  { label: "Racha actual", value: "7 días", sub: "sin interrupciones", color: "#CDAF7B" },
  { label: "Productividad", value: "82%", sub: "vs semana anterior ↑", color: "#59291B" },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [activeNav, setActiveNav] = useState("Dashboard");

  const toggleTask = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(t => [...t, { id: Date.now(), text: newTask, done: false, priority: "media" }]);
    setNewTask("");
  };
  const deleteTask = (id) => setTasks(t => t.filter(x => x.id !== id));

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);
  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

  const done = tasks.filter(t => t.done).length;
  const progress = Math.round((done / tasks.length) * 100);

  return (
    <>
      <div className="dash-root">

        

        <div className="main">
          {/* Header */}
          <div className="page-header">
            <div className="page-title">Buenos días</div>
            <div className="page-date">
              {DAY_NAMES[today.getDay()]}, {today.getDate()} de {MONTH_NAMES[today.getMonth()]} · {today.getFullYear()}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i} style={{ "--accent": s.color }}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="bottom-grid">
            {/* Tasks */}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">Tareas <em>de hoy</em></div>
                <div className="panel-count">{done}/{tasks.length} completadas</div>
              </div>
              <div className="progress-wrap">
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="progress-pct">{progress}%</div>
              </div>
              <div className="task-add">
                <input
                  className="task-add-input"
                  placeholder="Agregar nueva tarea..."
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addTask()}
                />
                <button className="task-add-btn" onClick={addTask}>+ Añadir</button>
              </div>
              <div className="task-list">
                {tasks.map(t => (
                  <div key={t.id} className={`task-item ${t.done ? "done" : ""}`} onClick={() => toggleTask(t.id)}>
                    <div className="task-check"><div className="task-check-inner" /></div>
                    <span className="task-text">{t.text}</span>
                    <span className={`task-priority priority-${t.priority}`}>{t.priority}</span>
                    <button className="task-delete" onClick={e => { e.stopPropagation(); deleteTask(t.id); }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="panel">
              <div className="cal-header">
                <div className="cal-title">{MONTH_NAMES[calMonth]}</div>
                <div className="cal-navs">
                  <button className="cal-nav" onClick={prevMonth}>‹</button>
                  <button className="cal-nav" onClick={nextMonth}>›</button>
                </div>
              </div>
              <div className="cal-grid">
                <div className="cal-days-header">
                  {DAY_NAMES.map(d => <div key={d} className="cal-day-name">{d}</div>)}
                </div>
                <div className="cal-days">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e${i}`} className="cal-day empty" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                    const isSel = day === selectedDay && !isToday;
                    return (
                      <div key={day} className={`cal-day ${isToday ? "today" : ""} ${isSel ? "selected" : ""}`} onClick={() => setSelectedDay(day)}>
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className="cal-selected-label">
                  Día seleccionado
                  <span>{selectedDay} {MONTH_NAMES[calMonth]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}