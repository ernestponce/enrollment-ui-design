import React, { useState } from 'react';
import './App.css';

function App() {
  // --- STATE MANAGEMENT ---
  const [academicLevel, setAcademicLevel] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // --- DATA LISTS (Phase 1 Compliance) ---
  const undergradPrograms = {
    "College of Engineering and Architecture": [
      "BS Architecture", "BS Chemical Engineering", "BS Civil Engineering", 
      "BS Computer Engineering", "BS Electrical Engineering", "BS Electronics Engineering", 
      "BS Industrial Engineering", "BS Mechanical Engineering"
    ],
    "College of Computer Studies": [
      "BS Computer Science", "BS Data Science and Analytics", 
      "BS Entertainment and Multimedia Computing", "BS Information Technology"
    ],
    "College of Business Education": [
      "BS Accountancy", "BS Accounting Information System", "BS Business Administration", 
      "Financial Management", "Human Resource Management", 
      "Logistics and Supply Chain Management", "Marketing Management"
    ],
    "College of Arts": [
      "Bachelor of Arts in English Language", "Bachelor of Arts in Political Science"
    ]
  };

  const gradPrograms = {
    "Doctorate Degrees": [
      "Doctor in Information Technology", 
      "Doctor of Engineering with Specialization in Computer Engineering", 
      "Doctor of Philosophy in Computer Science"
    ],
    "Master's Degrees": [
      "Master in Information Systems", "Master in Information Technology", 
      "Master in Logistics and Supply Chain Management", 
      "Master of Engineering with Specialization in Civil Engineering", 
      "Master of Engineering with Specialization in Computer Engineering", 
      "Master of Engineering with Specialization in Electrical Engineering", 
      "Master of Engineering with Specialization in Electronics Engineering", 
      "Master of Engineering with Specialization in Industrial Engineering", 
      "Master of Engineering with Specialization in Mechanical Engineering", 
      "Master of Science in Computer Science"
    ]
  };

  // --- VALIDATION HELPERS ---
  const handleNameInput = (e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ''); };
  const handleNumberInput = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); };
  const handleSuffixInput = (e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s.]/g, ''); };
  
  const handleGradeInput = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, ''); 
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    if (parts.length === 2 && parts[1].length > 2) value = parts[0] + '.' + parts[1].slice(0, 2);
    if (parseFloat(value) > 5) value = "5.00";
    e.target.value = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRegistered(true); 
  };

  // --- DYNAMIC LOGIC ---
  let availablePrograms = [];
  if (academicLevel === 'undergrad' && selectedCategory) {
    availablePrograms = undergradPrograms[selectedCategory] || [];
  } else if (academicLevel === 'graduate' && selectedCategory) {
    availablePrograms = gradPrograms[selectedCategory] || [];
  }

  return (
    <div className="App">
      <header className="header fade-in-down">
        <h1>ADEi University Digital Registrar</h1>
        <p>Student Enrollment Portal</p>
      </header>

      <form className="enrollment-form slide-up-fade" onSubmit={handleSubmit}>
        
        {/* 1. Personal Information Section */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="grid-container">
            <div className="form-group"><label>First Name</label><input type="text" onInput={handleNameInput} required /></div>
            <div className="form-group"><label>Middle Name</label><input type="text" onInput={handleNameInput} /></div>
            <div className="form-group"><label>Last Name</label><input type="text" onInput={handleNameInput} required /></div>
            <div className="form-group"><label>Suffix</label><input type="text" onInput={handleSuffixInput} /></div>
            <div className="form-group"><label>Date of Birth</label><input type="date" max={new Date().toISOString().split("T")[0]} required /></div>
            <div className="form-group"><label>Gender</label><select required><option value="">Select...</option><option>Male</option><option>Female</option><option>Non-binary</option></select></div>
            <div className="form-group"><label>Nationality</label><select><option>Filipino</option><option>Other</option></select></div>
            <div className="form-group"><label>Religion</label><input type="text" onInput={handleNameInput} /></div>
          </div>
        </fieldset>

        {/* 2. Contact Details Section */}
        <fieldset>
          <legend>Contact Details</legend>
          <div className="grid-container">
            <div className="form-group"><label>Email Address</label><input type="email" required /></div>
            <div className="form-group"><label>Mobile Number</label><input type="tel" onInput={handleNumberInput} maxLength="11" required /></div>
            <div className="form-group"><label>Landline</label><input type="tel" onInput={handleNumberInput} maxLength="10" /></div>
            <div className="form-group full-width">
              <label>Home Address</label>
              <div className="address-grid">
                <input type="text" placeholder="Street" required />
                <input type="text" placeholder="Barangay" required />
                <input type="text" placeholder="City" onInput={handleNameInput} required />
                <input type="text" placeholder="Province" onInput={handleNameInput} required />
                <input type="text" placeholder="Zip Code" onInput={handleNumberInput} maxLength="4" required />
              </div>
            </div>
          </div>
        </fieldset>

        {/* 3. Academic History Section */}
        <fieldset>
          <legend>Academic History</legend>
          <div className="grid-container">
            <div className="form-group"><label>Grade School Name</label><input type="text" /></div>
            <div className="form-group"><label>Year Graduated</label><input type="number" min="1900" max="2026" onInput={(e) => { if(e.target.value.length > 4) e.target.value = e.target.value.slice(0,4); }} /></div>
            <div className="form-group full-width"><label>Grade School Address</label><input type="text" /></div>
            <div className="form-group"><label>Junior High School Name</label><input type="text" /></div>
            <div className="form-group"><label>Year Graduated</label><input type="number" min="1900" max="2026" onInput={(e) => { if(e.target.value.length > 4) e.target.value = e.target.value.slice(0,4); }} /></div>
            <div className="form-group full-width"><label>Junior High School Address</label><input type="text" /></div>
            <div className="form-group"><label>Senior High School Name</label><input type="text" /></div>
            <div className="form-group"><label>Year Graduated</label><input type="number" min="1900" max="2026" onInput={(e) => { if(e.target.value.length > 4) e.target.value = e.target.value.slice(0,4); }} /></div>
            <div className="form-group">
              <label>Grade Average (Max 5.0)</label>
              <input type="number" step="0.01" min="0" max="5.0" onInput={handleGradeInput} />
            </div>
            <div className="form-group full-width"><label>Senior High School Address</label><input type="text" /></div>
          </div>
        </fieldset>

        {/* 4. Enrollment Choices Section */}
        <fieldset>
          <legend>Enrollment Choices</legend>
          <div className="grid-container">
            {/* Step 1: Academic Level */}
            <div className="form-group radio-group">
              <label>Academic Level (Required First):</label>
              <label><input type="radio" name="level" onChange={() => { setAcademicLevel('undergrad'); setSelectedCategory(''); }} required /> Undergraduate</label>
              <label><input type="radio" name="level" onChange={() => { setAcademicLevel('graduate'); setSelectedCategory(''); }} required /> Graduate</label>
            </div>

            {/* Step 2: Semestral Level (NEW FEATURE) */}
            <div className="form-group radio-group">
              <label>Semester:</label>
              <label><input type="radio" name="semester" value="1st" required /> 1st Sem</label>
              <label><input type="radio" name="semester" value="2nd" required /> 2nd Sem</label>
              <label><input type="radio" name="semester" value="summer" required /> Summer</label>
            </div>

            {/* Step 3: Campus Choice */}
            <div className="form-group radio-group">
              <label>Campus:</label>
              <label><input type="radio" name="campus" value="manila" required /> Manila</label>
              <label><input type="radio" name="campus" value="qc" required /> Quezon City</label>
            </div>

            <div className="form-group full-width">
              <label>{!academicLevel ? "Select Level First" : (academicLevel === 'graduate' ? "Graduate Program Type" : "College Department")}</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} disabled={!academicLevel} required>
                <option value="">{!academicLevel ? "--- Locked ---" : "Select..."}</option>
                {academicLevel === 'undergrad' && Object.keys(undergradPrograms).map((c) => <option key={c} value={c}>{c}</option>)}
                {academicLevel === 'graduate' && Object.keys(gradPrograms).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Degree Program</label>
              <select disabled={!selectedCategory} required>
                <option value="">{!selectedCategory ? "--- Locked ---" : "Select Program..."}</option>
                {availablePrograms.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Submit Registration</button>
      </form>

      {isRegistered && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon"><div className="checkmark"></div></div>
            <h2>Successfully Registered!</h2>
            <p>Welcome to ADEi University. Application received.</p>
            <button className="confirm-btn" onClick={() => setIsRegistered(false)}>Perfect!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;