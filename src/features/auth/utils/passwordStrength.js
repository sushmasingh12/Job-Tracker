
export const getStrength =(val) =>{
    if (!val) return { score: 0, label: "", color: "" };
  
    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
  
    const map = {
      1: { label: "Weak",   color: "#ef4444" },
      2: { label: "Fair",   color: "#f59e0b" },
      3: { label: "Good",   color: "#f59e0b" },
      4: { label: "Strong", color: "#22c55e" },
    };
  
    return { score, ...map[score] };
  }