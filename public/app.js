let allJobs = [];

async function searchJobs() {
  const query = document.getElementById('jobInput').value.trim();
  const location = document.getElementById('locationInput').value.trim();
  const errorDiv = document.getElementById('error');
  const loading = document.getElementById('loading');

  errorDiv.textContent = '';
  if (!query) { errorDiv.textContent = 'Please enter a job title.'; return; }

  loading.style.display = 'block';
  document.getElementById('results').innerHTML = '';

  try {
    const res = await fetch(`/api/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location || 'remote')}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    allJobs = (data.data || []).map(job => ({
      title: job.job_title || 'N/A',
      company: job.employer_name || 'N/A',
      location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country || 'Remote',
      type: job.job_employment_type || 'N/A',
      date: job.job_posted_at_datetime_utc || '',
      link: job.job_apply_link || '#',
      remote: job.job_is_remote
    }));

    renderJobs();
  } catch (err) {
    errorDiv.textContent = 'Error: ' + err.message;
  } finally {
    loading.style.display = 'none';
  }
}

function renderJobs() {
  const sortBy = document.getElementById('sortBy').value;
  const filter = document.getElementById('filterInput').value.toLowerCase();

  let jobs = allJobs.filter(j =>
    j.title.toLowerCase().includes(filter) ||
    j.company.toLowerCase().includes(filter) ||
    j.location.toLowerCase().includes(filter)
  );

  if (sortBy === 'title') jobs.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortBy === 'company') jobs.sort((a, b) => a.company.localeCompare(b.company));
  else jobs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const container = document.getElementById('results');
  if (jobs.length === 0) { container.innerHTML = '<p>No jobs found. Try a different search.</p>'; return; }

  container.innerHTML = jobs.map(job => `
    <div class="job-card">
      <h2>${job.title}</h2>
      <div class="company">🏢 ${job.company}</div>
      <div class="meta">📍 ${job.location} &nbsp;|&nbsp; 🕒 ${job.type} &nbsp;|&nbsp; 📅 ${job.date ? new Date(job.date).toDateString() : 'N/A'}</div>
      <span class="badge">${job.remote ? '🌍 Remote' : '🏠 On-site'}</span>
      <br/><br/>
      <a href="${job.link}" target="_blank">Apply Now →</a>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('jobInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') searchJobs();
  });
});
