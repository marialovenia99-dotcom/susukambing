/* ==========================================================================
   SATRADHAN — Air Defense & Engineering Office
   Semua data di bawah ini adalah DATA FIKTIF/DUMMY untuk keperluan demo.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. DIGITAL CLOCK + DATE (realtime)
     --------------------------------------------------------------------- */
  const clockTime = document.getElementById('clockTime');
  const clockDate = document.getElementById('clockDate');
  const hariList = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const bulanList = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  function updateClock(){
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    clockTime.textContent = `${hh}:${mm}:${ss}`;
    clockDate.textContent = `${hariList[now.getDay()]}, ${now.getDate()} ${bulanList[now.getMonth()]} ${now.getFullYear()}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------------------------------------------------------------------
     2. SIDEBAR: collapse (desktop) + hamburger (mobile)
     --------------------------------------------------------------------- */
  const appEl = document.querySelector('.app');
  const collapseBtn = document.getElementById('sidebarCollapseBtn');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('sidebarOverlay');

  collapseBtn.addEventListener('click', () => {
    appEl.classList.toggle('collapsed');
  });

  hamburgerBtn.addEventListener('click', () => {
    appEl.classList.toggle('mobile-open');
  });
  overlay.addEventListener('click', () => appEl.classList.remove('mobile-open'));

  /* ---------------------------------------------------------------------
     3. NAVIGATION between sections
     --------------------------------------------------------------------- */
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.section;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(`page-${target}`).classList.add('active');
      document.getElementById('content').scrollTo({top:0, behavior:'smooth'});
      appEl.classList.remove('mobile-open');
    });
  });

  /* ---------------------------------------------------------------------
     4. DASHBOARD — animated stat counters
     --------------------------------------------------------------------- */
  const statEls = document.querySelectorAll('.stat-value[data-count]');
  statEls.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const timer = setInterval(() => {
      current += step;
      if(current >= target){ current = target; clearInterval(timer); }
      el.textContent = current;
    }, 25);
  });

  /* ---------------------------------------------------------------------
     5. Activity feed (dummy)
     --------------------------------------------------------------------- */
  const feedData = [
    {time:'08:12', text:'<b>Tim Engineering</b> menyelesaikan pemeriksaan rutin perangkat radar.'},
    {time:'09:40', text:'<b>Bagian Administrasi</b> memperbarui jadwal agenda minggu ini.'},
    {time:'10:55', text:'<b>Personel baru</b> ditempatkan pada Bidang Operasional.'},
    {time:'13:20', text:'Pengumuman baru dipublikasikan mengenai pemeliharaan fasilitas.'},
    {time:'15:05', text:'<b>Bidang Engineering</b> menyelesaikan laporan sarana bulanan.'},
  ];
  const feedList = document.getElementById('feedList');
  feedData.forEach(f => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="feed-time">${f.time}</span><span class="feed-text">${f.text}</span>`;
    feedList.appendChild(li);
  });

  /* ---------------------------------------------------------------------
     6. Ticker (Informasi)
     --------------------------------------------------------------------- */
  const tickerItems = [
    'Jadwal pemeliharaan sarana teknis: setiap hari Jumat.',
    'Rapat koordinasi bulanan: minggu ketiga setiap bulan.',
    'Pelatihan teknis peralatan akan diadakan bulan ini.',
    'Mohon perhatian jadwal kegiatan lapangan terbaru.',
  ];
  const tickerTrack = document.getElementById('tickerTrack');
  const tickerContent = tickerItems.map(t => `<span>${t}</span>`).join('');
  tickerTrack.innerHTML = tickerContent + tickerContent; // duplicate for seamless loop

  /* ---------------------------------------------------------------------
     7. KEGIATAN — timeline data + filter
     --------------------------------------------------------------------- */
  const kegiatanData = [
    {tanggal:'10 September 2026', judul:'Technical Training', kategori:'TRAINING', desc:'Pelatihan teknis peralatan dan pemeliharaan.', status:'Selesai'},
    {tanggal:'15 September 2026', judul:'Field Activity', kategori:'FIELD ACTIVITY', desc:'Kegiatan lapangan dan pemeriksaan sarana.', status:'Berlangsung'},
    {tanggal:'20 September 2026', judul:'Engineering Meeting', kategori:'MEETING', desc:'Rapat koordinasi bidang teknik.', status:'Terjadwal'},
    {tanggal:'24 September 2026', judul:'Preventive Maintenance', kategori:'MAINTENANCE', desc:'Pemeliharaan berkala perangkat kantor.', status:'Terjadwal'},
    {tanggal:'28 September 2026', judul:'Upacara Bulanan', kategori:'CEREMONY', desc:'Upacara bendera dan pengarahan bulanan.', status:'Terjadwal'},
    {tanggal:'02 Oktober 2026', judul:'Rapat Evaluasi Kinerja', kategori:'MEETING', desc:'Evaluasi kinerja triwulan seluruh bidang.', status:'Terjadwal'},
  ];

  const timelineList = document.getElementById('timelineList');
  function renderKegiatan(filter){
    timelineList.innerHTML = '';
    const data = filter === 'ALL' ? kegiatanData : kegiatanData.filter(k => k.kategori === filter);
    if(data.length === 0){
      timelineList.innerHTML = '<p class="body-text">Tidak ada kegiatan pada kategori ini.</p>';
      return;
    }
    data.forEach(k => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-card">
          <span class="timeline-date">${k.tanggal}</span>
          <div class="timeline-title-row">
            <span class="timeline-title">${k.judul}</span>
            <span class="badge badge-olive">${k.kategori}</span>
          </div>
          <p class="timeline-desc">${k.desc} <span style="color:var(--text-faint)">— Status: ${k.status}</span></p>
        </div>`;
      timelineList.appendChild(item);
    });
  }
  renderKegiatan('ALL');

  document.querySelectorAll('.filter-chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip[data-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderKegiatan(chip.dataset.filter);
    });
  });

  /* ---------------------------------------------------------------------
     8. AGENDA — daftar jadwal hari ini
     --------------------------------------------------------------------- */
  const agendaData = [
    {time:'09:00', title:'Rapat koordinasi', kat:'MEETING'},
    {time:'11:00', title:'Pemeriksaan fasilitas', kat:'MAINTENANCE'},
    {time:'13:00', title:'Technical briefing', kat:'TRAINING'},
    {time:'15:00', title:'Evaluasi kegiatan', kat:'MEETING'},
  ];
  const agendaList = document.getElementById('agendaList');
  agendaData.forEach(a => {
    const row = document.createElement('div');
    row.className = 'agenda-row';
    row.innerHTML = `<span class="agenda-time">${a.time}</span><span class="agenda-title">${a.title}</span><span class="badge badge-olive">${a.kat}</span>`;
    agendaList.appendChild(row);
  });

  /* ---------------------------------------------------------------------
     9. PENGUMUMAN
     --------------------------------------------------------------------- */
  const announceData = [
    {type:'important', label:'IMPORTANT', icon:'fa-triangle-exclamation', title:'Pemeliharaan fasilitas kantor', date:'08 September 2026'},
    {type:'info', label:'INFO', icon:'fa-circle-info', title:'Jadwal kegiatan bulan September', date:'05 September 2026'},
    {type:'notice', label:'NOTICE', icon:'fa-bell', title:'Rapat koordinasi seluruh staf', date:'03 September 2026'},
    {type:'info', label:'INFO', icon:'fa-circle-info', title:'Pembaruan sistem informasi kantor', date:'01 September 2026'},
  ];
  const announceList = document.getElementById('announceList');
  announceData.forEach(a => {
    const div = document.createElement('div');
    div.className = `announce-item ${a.type}`;
    div.innerHTML = `
      <i class="fa-solid ${a.icon} announce-icon"></i>
      <div class="announce-body">
        <span class="announce-tag">[${a.label}]</span>
        <h4 class="announce-title">${a.title}</h4>
        <span class="announce-date">Dipublikasikan: ${a.date}</span>
      </div>`;
    announceList.appendChild(div);
  });

  /* ---------------------------------------------------------------------
     10. DOKUMENTASI — gallery + modal
     --------------------------------------------------------------------- */
  const galleryData = [
    {title:'Pemeriksaan Radar', date:'12 Agu 2026', kategori:'Radar', icon:'fa-satellite-dish'},
    {title:'Pelatihan Teknis', date:'20 Agu 2026', kategori:'Pelatihan', icon:'fa-chalkboard-user'},
    {title:'Ruang Kontrol', date:'25 Agu 2026', kategori:'Ruang Kontrol', icon:'fa-display'},
    {title:'Kendaraan Teknis', date:'28 Agu 2026', kategori:'Kendaraan', icon:'fa-truck-monster'},
    {title:'Kegiatan Lapangan', date:'02 Sep 2026', kategori:'Kegiatan', icon:'fa-person-digging'},
    {title:'Maintenance Berkala', date:'05 Sep 2026', kategori:'Maintenance', icon:'fa-screwdriver-wrench'},
    {title:'Engineering Workshop', date:'07 Sep 2026', kategori:'Engineering', icon:'fa-gears'},
    {title:'Apel Pagi', date:'09 Sep 2026', kategori:'Kegiatan', icon:'fa-flag'},
  ];
  const galleryGrid = document.getElementById('galleryGrid');
  galleryData.forEach(g => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <div class="gallery-thumb"><i class="fa-solid ${g.icon}"></i></div>
      <div class="gallery-caption">
        <h4>${g.title}</h4>
        <div class="gallery-meta"><span>${g.date}</span><span>${g.kategori}</span></div>
      </div>`;
    item.addEventListener('click', () => openModal(g));
    galleryGrid.appendChild(item);
  });

  const modalOverlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalCategory = document.getElementById('modalCategory');
  const modalClose = document.getElementById('modalClose');

  function openModal(g){
    modalImage.innerHTML = `<i class="fa-solid ${g.icon}"></i>`;
    modalTitle.textContent = g.title;
    modalDate.textContent = g.date;
    modalCategory.textContent = g.kategori;
    modalOverlay.classList.add('open');
  }
  function closeModal(){ modalOverlay.classList.remove('open'); }
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  /* ---------------------------------------------------------------------
     11. DATA PERSONEL — table with search, filter, sort
     --------------------------------------------------------------------- */
  const personelData = [
    {nama:'Budi Santosa', jabatan:'Kepala Bidang Engineering', bagian:'Engineering', status:'Aktif'},
    {nama:'Siti Rahayu', jabatan:'Staf Administrasi', bagian:'Administrasi', status:'Aktif'},
    {nama:'Agus Wijaya', jabatan:'Teknisi Radar', bagian:'Radar', status:'Tugas Luar'},
    {nama:'Dewi Lestari', jabatan:'Operator Sistem', bagian:'Operasional', status:'Aktif'},
    {nama:'Rian Pratama', jabatan:'Teknisi Mekanik', bagian:'Engineering', status:'Cuti'},
    {nama:'Fitri Handayani', jabatan:'Staf Keuangan', bagian:'Administrasi', status:'Aktif'},
    {nama:'Hendra Kusuma', jabatan:'Teknisi Elektronika', bagian:'Radar', status:'Aktif'},
    {nama:'Nur Aini', jabatan:'Sekretaris', bagian:'Administrasi', status:'Aktif'},
    {nama:'Yusuf Maulana', jabatan:'Operator Radar', bagian:'Radar', status:'Tugas Luar'},
    {nama:'Lina Marlina', jabatan:'Staf Operasional', bagian:'Operasional', status:'Aktif'},
    {nama:'Dedi Setiawan', jabatan:'Teknisi Kendaraan', bagian:'Engineering', status:'Aktif'},
    {nama:'Rina Wulandari', jabatan:'Staf Personalia', bagian:'Administrasi', status:'Cuti'},
  ];

  const personelTbody = document.getElementById('personelTbody');
  const personelSearch = document.getElementById('personelSearch');
  const personelFilter = document.getElementById('personelFilter');
  let sortKey = null, sortAsc = true;

  function statusClass(status){
    if(status === 'Aktif') return 'aktif';
    if(status === 'Cuti') return 'cuti';
    return 'tugas';
  }

  function renderPersonel(){
    const q = personelSearch.value.trim().toLowerCase();
    const bagian = personelFilter.value;
    let rows = personelData.filter(p => {
      const matchQ = p.nama.toLowerCase().includes(q) || p.jabatan.toLowerCase().includes(q);
      const matchB = bagian === 'ALL' || p.bagian === bagian;
      return matchQ && matchB;
    });
    if(sortKey){
      rows = [...rows].sort((a,b) => {
        const va = a[sortKey].toLowerCase(), vb = b[sortKey].toLowerCase();
        if(va < vb) return sortAsc ? -1 : 1;
        if(va > vb) return sortAsc ? 1 : -1;
        return 0;
      });
    }
    personelTbody.innerHTML = '';
    if(rows.length === 0){
      personelTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-faint);">Tidak ada data ditemukan.</td></tr>';
      return;
    }
    rows.forEach((p, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${p.nama}</td>
        <td>${p.jabatan}</td>
        <td>${p.bagian}</td>
        <td><span class="status-tag ${statusClass(p.status)}">${p.status}</span></td>`;
      personelTbody.appendChild(tr);
    });
  }
  renderPersonel();
  personelSearch.addEventListener('input', renderPersonel);
  personelFilter.addEventListener('change', renderPersonel);
  document.querySelectorAll('#personelTable th[data-key]').forEach(th => {
    if(th.dataset.key === 'no' || th.dataset.key === 'status') return;
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      sortAsc = (sortKey === key) ? !sortAsc : true;
      sortKey = key;
      renderPersonel();
    });
  });

  /* ---------------------------------------------------------------------
     12. SARANA & PRASARANA — inventory cards + filter
     --------------------------------------------------------------------- */
  const saranaData = [
    {nama:'Unit Radar Pemantau', kategori:'RADAR SYSTEM', jumlah:4, kondisi:'good', icon:'fa-satellite-dish'},
    {nama:'Panel Kontrol Radar', kategori:'RADAR SYSTEM', jumlah:6, kondisi:'maintenance', icon:'fa-satellite'},
    {nama:'Genset Cadangan', kategori:'ENGINEERING EQUIPMENT', jumlah:3, kondisi:'good', icon:'fa-plug'},
    {nama:'Alat Ukur Elektronik', kategori:'ENGINEERING EQUIPMENT', jumlah:10, kondisi:'inspection', icon:'fa-gauge'},
    {nama:'Radio Komunikasi', kategori:'COMMUNICATION EQUIPMENT', jumlah:18, kondisi:'good', icon:'fa-walkie-talkie'},
    {nama:'Antena Komunikasi', kategori:'COMMUNICATION EQUIPMENT', jumlah:5, kondisi:'good', icon:'fa-tower-broadcast'},
    {nama:'Kendaraan Teknis Roda 4', kategori:'VEHICLE', jumlah:6, kondisi:'maintenance', icon:'fa-truck'},
    {nama:'Kendaraan Operasional', kategori:'VEHICLE', jumlah:8, kondisi:'good', icon:'fa-car'},
    {nama:'Meja &amp; Kursi Kantor', kategori:'OFFICE FACILITY', jumlah:60, kondisi:'good', icon:'fa-chair'},
    {nama:'Perangkat Komputer', kategori:'OFFICE FACILITY', jumlah:35, kondisi:'inspection', icon:'fa-computer'},
  ];
  const saranaGrid = document.getElementById('saranaGrid');
  const condMeta = {
    good:{label:'GOOD', cls:'cond-good'},
    maintenance:{label:'MAINTENANCE', cls:'cond-maint'},
    inspection:{label:'INSPECTION', cls:'cond-inspect'},
  };
  function renderSarana(filter){
    saranaGrid.innerHTML = '';
    const data = filter === 'ALL' ? saranaData : saranaData.filter(s => s.kategori === filter);
    data.forEach(s => {
      const meta = condMeta[s.kondisi];
      const card = document.createElement('div');
      card.className = 'sarana-card';
      card.innerHTML = `
        <div class="sarana-card-head">
          <div class="sarana-icon"><i class="fa-solid ${s.icon}"></i></div>
        </div>
        <div class="sarana-name">${s.nama}</div>
        <div class="sarana-cat">${s.kategori}</div>
        <div class="sarana-meta">
          <span class="sarana-qty">Jumlah: ${s.jumlah}</span>
          <span class="cond-tag ${meta.cls}"><span class="dot ${s.kondisi === 'good' ? 'dot-green' : 'dot-amber'}"></span>${meta.label}</span>
        </div>`;
      saranaGrid.appendChild(card);
    });
  }
  renderSarana('ALL');
  document.querySelectorAll('.filter-chip[data-sfilter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip[data-sfilter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderSarana(chip.dataset.sfilter);
    });
  });

  /* ---------------------------------------------------------------------
     13. KONTAK — simple confirmation (no backend)
     --------------------------------------------------------------------- */
  const sendMsgBtn = document.getElementById('sendMsgBtn');
  if(sendMsgBtn){
    sendMsgBtn.addEventListener('click', () => {
      sendMsgBtn.textContent = 'Pesan Terkirim';
      sendMsgBtn.disabled = true;
      setTimeout(() => {
        sendMsgBtn.textContent = 'Kirim Pesan';
        sendMsgBtn.disabled = false;
      }, 2500);
    });
  }

});
