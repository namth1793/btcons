require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// DATA_DIR=/data khi dùng Railway Volume, mặc định dùng thư mục local
const dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'btcons.db'));

const DEFAULT_CONTENT = {
  hero: JSON.stringify({
    title: 'BTCONS is a leading global builder and real estate developer',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
  }),
  stats: JSON.stringify([
    { value: '150+', label: 'Years in Business', sub: 'Founded 1873' },
    { value: '20+',  label: 'Countries Worldwide', sub: 'Global Presence' },
    { value: '45+',  label: 'Office Locations',   sub: 'Across the US & Abroad' },
    { value: '$6B+', label: 'Annual Revenue',     sub: 'Top 10 US Contractor' },
  ]),
  about: JSON.stringify({
    title: 'About BTCONS',
    body: 'A leading global builder and real estate developer — innovative, solutions-driven, and community-focused for over 150 years.',
  }),
  navbar: JSON.stringify({
    links: {
      building: 'Xây dựng',
      development: 'Phát triển',
      projects: 'Dự án',
      about: 'Giới thiệu',
      careers: 'Tuyển dụng',
      news: 'Tin tức',
      contact: 'Liên hệ',
      cta: 'Hợp tác với chúng tôi',
    },
    buildingViewAll: 'Xem tất cả dịch vụ xây dựng →',
    developmentViewAll: 'Xem tất cả dịch vụ phát triển →',
    buildingDropdown: [
      { label: 'Dịch vụ', items: ['Quản lý xây dựng', 'Thiết kế & Thi công', 'Giao dự án tích hợp', 'Thiết kế & Thi công ảo', 'Chiến lược bền vững', 'Quản lý cơ sở vật chất'] },
      { label: 'Lĩnh vực', items: ['Y tế', 'Đại học', 'Giáo dục phổ thông', 'Khoa học sự sống', 'Trung tâm dữ liệu', 'Thể thao & Giải trí', 'Giao thông vận tải', 'Chính phủ'] },
    ],
    developmentDropdown: [
      { label: 'Dịch vụ', items: ['Mua lại', 'Phát triển', 'Tài chính & Tư vấn', 'Quản lý tài sản', 'Lập kế hoạch chiến lược', 'Đối tác công tư (PPP)'] },
      { label: 'Lĩnh vực', items: ['Chung cư', 'Nhà ở sinh viên', 'Nhà ở giá rẻ', 'Đa chức năng', 'Thương mại', 'Y tế', 'Chính phủ'] },
    ],
  }),
  seo: JSON.stringify({
    home:        { title: 'BTCONS - Global Builder & Real Estate Developer', description: 'BTCONS là nhà thầu xây dựng và phát triển bất động sản hàng đầu toàn cầu với hơn 150 năm kinh nghiệm.', keywords: 'xây dựng, bất động sản, BTCONS, nhà thầu, contractor' },
    building:    { title: 'Xây dựng - BTCONS', description: 'Dịch vụ xây dựng chuyên nghiệp: quản lý xây dựng, thiết kế & thi công, giải pháp bền vững.', keywords: 'xây dựng, quản lý xây dựng, thiết kế thi công' },
    development: { title: 'Phát triển - BTCONS', description: 'Dịch vụ phát triển bất động sản: mua lại, tài chính, quản lý tài sản, đối tác công tư.', keywords: 'bất động sản, phát triển, đầu tư' },
    projects:    { title: 'Dự án - BTCONS', description: 'Danh mục các dự án tiêu biểu của BTCONS.', keywords: 'dự án xây dựng, công trình, portfolio' },
    about:       { title: 'Giới thiệu - BTCONS', description: 'Tìm hiểu về lịch sử, sứ mệnh và đội ngũ của BTCONS.', keywords: 'về chúng tôi, BTCONS, lịch sử' },
    careers:     { title: 'Tuyển dụng - BTCONS', description: 'Cơ hội nghề nghiệp và việc làm tại BTCONS.', keywords: 'tuyển dụng, việc làm, career' },
    news:        { title: 'Tin tức - BTCONS', description: 'Tin tức, thông báo và cập nhật mới nhất từ BTCONS.', keywords: 'tin tức, thông báo, press release' },
    contact:     { title: 'Liên hệ - BTCONS', description: 'Liên hệ với BTCONS để được tư vấn về xây dựng và bất động sản.', keywords: 'liên hệ, contact, địa chỉ' },
  }),
};

function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      division TEXT NOT NULL,
      market TEXT NOT NULL,
      location TEXT NOT NULL,
      year INTEGER,
      description TEXT,
      image_url TEXT,
      featured INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT,
      excerpt TEXT,
      image_url TEXT,
      published_date TEXT,
      division TEXT
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      department TEXT,
      location TEXT,
      type TEXT DEFAULT 'Full-time',
      description TEXT,
      posted_date TEXT
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      division TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Seed default content if missing
  const insertContent = db.prepare('INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)');
  for (const [key, value] of Object.entries(DEFAULT_CONTENT)) {
    insertContent.run(key, value);
  }

  const count = db.prepare('SELECT COUNT(*) as c FROM projects').get();
  if (count.c === 0) {
    tryRestoreFromCloud().then(restored => {
      if (!restored) require('./seed');
    });
  }
}

async function tryRestoreFromCloud() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'your_cloud_name') return false;
  try {
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });
    const result = await cloudinary.api.resource('btcons_backup/db_backup', { resource_type: 'raw' });
    if (!result?.secure_url) return false;
    const res = await fetch(result.secure_url);
    const backup = await res.json();
    restoreFromBackup(backup);
    console.log('[DB] Restored from Cloudinary backup');
    return true;
  } catch {
    return false;
  }
}

function restoreFromBackup(backup) {
  const insertProject = db.prepare(`INSERT OR REPLACE INTO projects (id,title,division,market,location,year,description,image_url,featured) VALUES (?,?,?,?,?,?,?,?,?)`);
  const insertNews    = db.prepare(`INSERT OR REPLACE INTO news (id,title,category,excerpt,image_url,published_date,division) VALUES (?,?,?,?,?,?,?)`);
  const insertJob     = db.prepare(`INSERT OR REPLACE INTO jobs (id,title,department,location,type,description,posted_date) VALUES (?,?,?,?,?,?,?)`);
  const insertContent = db.prepare(`INSERT OR REPLACE INTO content (key,value) VALUES (?,?)`);

  db.transaction(() => {
    (backup.projects || []).forEach(p => insertProject.run(p.id,p.title,p.division,p.market,p.location,p.year,p.description,p.image_url,p.featured));
    (backup.news    || []).forEach(n => insertNews.run(n.id,n.title,n.category,n.excerpt,n.image_url,n.published_date,n.division));
    (backup.jobs    || []).forEach(j => insertJob.run(j.id,j.title,j.department,j.location,j.type,j.description,j.posted_date));
    (backup.content || []).forEach(c => insertContent.run(c.key, c.value));
  })();
}

async function backupToCloud() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'your_cloud_name') return;
  try {
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });
    const payload = {
      projects: db.prepare('SELECT * FROM projects').all(),
      news:     db.prepare('SELECT * FROM news').all(),
      jobs:     db.prepare('SELECT * FROM jobs').all(),
      content:  db.prepare('SELECT * FROM content').all(),
    };
    const tmpPath = path.join(dataDir, '_backup.json');
    fs.writeFileSync(tmpPath, JSON.stringify(payload));
    await cloudinary.uploader.upload(tmpPath, { public_id: 'btcons_backup/db_backup', resource_type: 'raw', overwrite: true });
    fs.unlinkSync(tmpPath);
  } catch (e) {
    console.error('[Backup] Failed:', e.message);
  }
}

module.exports = { db, initDB, backupToCloud };
