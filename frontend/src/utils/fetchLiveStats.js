// This mirrors your example fetchLiveStats but with a safe fallback. It intentionally does NOT call any real API key.
// It sets demo values (keeps the same pattern as earlier code).
export async function fetchLiveStats(query, setStats) {
  // Try to call backend AI proxy if configured (but backend may not have a mock AI)
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/ai/renewable-forecast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'India', dateRange: {} })
    });
    if (res.ok) {
      const j = await res.json();
      // try to coerce to the required shape
      const out = {
        renewableCapacityGW: j.predictedGenerationMW ? Math.round((j.predictedGenerationMW[0] || 1500) / 1000) : 180,
        co2SavedMillionTons: j.targetAchievementForecast ? Math.round((j.targetAchievementForecast.predictedAchievementPercent || 90) * 0.17 * 10)/10 : 15.5,
        activeProjects: 4500
      };
      setStats(out);
      return;
    }
  } catch (err) {
    // ignore and fallback
  }

  // Fallback demo
  setStats({
    renewableCapacityGW: 180,
    co2SavedMillionTons: 15.5,
    activeProjects: 4500
  });
}
