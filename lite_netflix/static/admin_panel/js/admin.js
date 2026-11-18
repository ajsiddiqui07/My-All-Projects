/**
 * Netflix Admin Panel - JavaScript Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle
  const sidebar = document.getElementById('admin-sidebar');
  const openSidebarBtn = document.getElementById('open-sidebar-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (openSidebarBtn && sidebar) {
    openSidebarBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      if (sidebarOverlay) sidebarOverlay.classList.add('show');
    });
  }

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('show');
  };

  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // 2. Topbar Profile Dropdown
  const userTrigger = document.getElementById('user-dropdown-trigger');
  const userMenu = document.getElementById('user-dropdown-menu');

  if (userTrigger && userMenu) {
    userTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target) && !userTrigger.contains(e.target)) {
        userMenu.classList.remove('show');
      }
    });
  }

  // 3. Password Visibility Toggle
  const togglePassBtns = document.querySelectorAll('.password-toggle-btn');
  togglePassBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target') || 'admin-password-input';
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      // Toggle SVG paths
      const eyeIcon = btn.querySelector('.icon-eye');
      const eyeOffIcon = btn.querySelector('.icon-eye-off');
      if (eyeIcon && eyeOffIcon) {
        eyeIcon.style.display = isPassword ? 'none' : 'block';
        eyeOffIcon.style.display = isPassword ? 'block' : 'none';
      }
    });
  });

  // 4. File Upload Live Preview
  const fileInputs = document.querySelectorAll('.admin-file-input[data-preview]');
  fileInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      const previewId = input.getAttribute('data-preview');
      const previewImg = document.getElementById(previewId);
      const containerId = input.getAttribute('data-preview-container');
      const previewContainer = containerId ? document.getElementById(containerId) : (previewImg ? previewImg.closest('.media-preview-container') : null);

      if (file && previewImg) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImg.src = event.target.result;
          if (previewContainer) previewContainer.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // 5. Delete Confirmation Modal
  const deleteModal = document.getElementById('delete-modal');
  const deleteModalForm = document.getElementById('delete-modal-form');
  const deleteModalItemName = document.getElementById('delete-modal-item-name');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const modalCloseBtn = document.getElementById('close-delete-modal-btn');

  const deleteTriggers = document.querySelectorAll('[data-action="open-delete-modal"]');
  deleteTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-delete-url');
      const name = btn.getAttribute('data-item-name') || 'this item';

      if (deleteModalForm) deleteModalForm.setAttribute('action', url);
      if (deleteModalItemName) deleteModalItemName.textContent = name;
      if (deleteModal) deleteModal.classList.add('show');
    });
  });

  const hideDeleteModal = () => {
    if (deleteModal) deleteModal.classList.remove('show');
  };

  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', hideDeleteModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideDeleteModal);
  if (deleteModal) {
    deleteModal.addEventListener('click', (e) => {
      if (e.target === deleteModal) hideDeleteModal();
    });
  }

  // 6. Dismissible Message Alerts
  const alertCloseBtns = document.querySelectorAll('.admin-alert-close');
  alertCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('.admin-alert');
      if (alert) {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-8px)';
        setTimeout(() => alert.remove(), 200);
      }
    });
  });

  // Auto-dismiss alerts after 6 seconds
  const autoAlerts = document.querySelectorAll('.admin-alert');
  autoAlerts.forEach((alert) => {
    setTimeout(() => {
      if (document.body.contains(alert)) {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-8px)';
        setTimeout(() => alert.remove(), 250);
      }
    }, 6000);
  });

  // 7. Initialize Dashboard Analytics Charts
  const chartScript = document.getElementById('charts-data');
  if (chartScript && window.Chart) {
    try {
      const chartData = JSON.parse(chartScript.textContent);

      // Top Movies Chart
      const topMoviesCanvas = document.getElementById('topMoviesChart');
      if (topMoviesCanvas && chartData.topMovies) {
        new Chart(topMoviesCanvas, {
          type: 'bar',
          data: {
            labels: chartData.topMovies.labels.length ? chartData.topMovies.labels : ['No movies yet'],
            datasets: [{
              label: 'Total Views',
              data: chartData.topMovies.views.length ? chartData.topMovies.views : [0],
              backgroundColor: 'rgba(229, 9, 20, 0.85)',
              borderColor: '#e50914',
              borderWidth: 1,
              borderRadius: 6,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1f1f26',
                titleColor: '#ffffff',
                bodyColor: '#a0a0ab',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 10,
                displayColors: false
              }
            },
            scales: {
              x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#a0a0ab', font: { size: 11 } }
              },
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#a0a0ab', precision: 0 }
              }
            }
          }
        });
      }

      // Genre Distribution Chart
      const genreCanvas = document.getElementById('genreChart');
      if (genreCanvas && chartData.genres) {
        new Chart(genreCanvas, {
          type: 'doughnut',
          data: {
            labels: chartData.genres.labels.length ? chartData.genres.labels : ['No genres'],
            datasets: [{
              data: chartData.genres.counts.length ? chartData.genres.counts : [1],
              backgroundColor: [
                '#e50914',
                '#3b82f6',
                '#10b981',
                '#f59e0b',
                '#8b5cf6',
                '#ec4899',
                '#06b6d4',
                '#64748b'
              ],
              borderColor: '#19191f',
              borderWidth: 2,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  color: '#a0a0ab',
                  boxWidth: 12,
                  font: { size: 11 }
                }
              },
              tooltip: {
                backgroundColor: '#1f1f26',
                titleColor: '#ffffff',
                bodyColor: '#a0a0ab',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 10
              }
            },
            cutout: '70%'
          }
        });
      }
    } catch (err) {
      console.error('Failed to parse or render chart analytics:', err);
    }
  }
});
