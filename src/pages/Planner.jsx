import { useState } from "react";

const HOURS = [5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11];

export default function Planner() {
  const today = new Date();
  const [date, setDate] = useState(
    `${String(today.getMonth()+1).padStart(2,'0')}/${String(today.getDate()).padStart(2,'0')}/${today.getFullYear()}`
  );
  const [priorities, setPriorities] = useState(["","",""]);
  const [brainDump, setBrainDump] = useState("");
  const [slots, setSlots] = useState(
    HOURS.reduce((acc, h, i) => { acc[`${i}-00`] = ""; acc[`${i}-30`] = ""; return acc; }, {})
  );

  const updatePriority = (i, val) => {
    const p = [...priorities]; p[i] = val; setPriorities(p);
  };

  const updateSlot = (key, val) => setSlots(s => ({ ...s, [key]: val }));

  return (
    <>
    
      <div className="planner-page">
        {/* Header */}
        <div className="header">
          <div className="title-block">
            <div className="title-main">Daily Timeboxing</div>
            <div className="title-sub">Planner</div>
          </div>
          <div className="date-block">
            Date:
            <input
              className="date-input"
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="MM / DD / YYYY"
            />
          </div>
        </div>

        {/* Body */}
        <div className="main-grid">
          {/* Left */}
          <div className="left-col">
            <div className="section-label">Top Priorities</div>
            <div className="priorities-list">
              {priorities.map((p, i) => (
                <input
                  key={i}
                  className="priority-input"
                  value={p}
                  onChange={e => updatePriority(i, e.target.value)}
                  placeholder={`Priority ${i + 1}`}
                />
              ))}
            </div>

            <div className="section-label">Brain Dump</div>
            <textarea
              className="brain-dump-area"
              value={brainDump}
              onChange={e => setBrainDump(e.target.value)}
              placeholder="Everything on your mind..."
            />
          </div>

          {/* Right — time grid */}
          <div className="time-grid-wrapper">
            <div className="time-grid-header">
              <span></span>
              <span>:00</span>
              <span>:30</span>
            </div>
            <div className="time-grid">
              {HOURS.map((h, i) => (
                <div className="time-row" key={`${h}-${i}`}>
                  <div className="hour-cell">{h}</div>
                  <input
                    className="slot-input"
                    value={slots[`${i}-00`]}
                    onChange={e => updateSlot(`${i}-00`, e.target.value)}
                  />
                  <input
                    className="slot-input"
                    value={slots[`${i}-30`]}
                    onChange={e => updateSlot(`${i}-30`, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="print-btn" onClick={() => window.print()}>
        🖨GUARDAR
      </button>
    </>
  );
}