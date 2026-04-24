const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'btcons.db'));

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
`);

const projects = [
  {
    title: 'NYCREATES – Albany NanoTech Complex Expansion',
    division: 'building',
    market: 'Advanced Technology',
    location: 'Albany, NY',
    year: 2024,
    description: 'A landmark expansion of the Albany NanoTech Complex, adding over 400,000 SF of cutting-edge research and development space to support the global semiconductor industry.',
    image_url: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80',
    featured: 1
  },
  {
    title: 'University of Idaho Student Housing',
    division: 'building',
    market: 'Higher Education',
    location: 'Moscow, ID',
    year: 2023,
    description: 'A modern 500-bed student housing complex featuring study rooms, collaborative spaces, and sustainable design elements that enhance campus life.',
    image_url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80',
    featured: 1
  },
  {
    title: 'M&T Bank Stadium Renovations',
    division: 'building',
    market: 'Sports & Entertainment',
    location: 'Baltimore, MD',
    year: 2024,
    description: 'A comprehensive renovation of M&T Bank Stadium including new premium club spaces, updated concourse amenities, and state-of-the-art AV systems for 71,000 fans.',
    image_url: 'https://images.unsplash.com/photo-1565803974275-dccd2f933cbb?w=800&q=80',
    featured: 1
  },
  {
    title: 'Sovren Mixed-Use Development',
    division: 'development',
    market: 'Mixed-Use',
    location: 'Arlington, VA',
    year: 2023,
    description: 'A vibrant mixed-use community featuring 350 luxury residential units, 25,000 SF of retail, and thoughtfully designed public plazas in a prime metro location.',
    image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    featured: 1
  },
  {
    title: 'Alnylam Pharmaceutical Manufacturing Facility',
    division: 'building',
    market: 'Life Sciences',
    location: 'Cambridge, MA',
    year: 2024,
    description: 'A GMP-compliant pharmaceutical manufacturing facility with cleanrooms, biologics processing suites, and integrated quality control labs for a leading biotech company.',
    image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    featured: 1
  },
  {
    title: 'The Hive Innovation Center',
    division: 'development',
    market: 'Commercial',
    location: 'Chicago, IL',
    year: 2023,
    description: 'A dynamic innovation hub providing flexible co-working space, event venues, and startup incubator resources across 200,000 SF of urban office space.',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    featured: 1
  },
  {
    title: 'Inova Health System – Loudoun Hospital Patient Tower',
    division: 'building',
    market: 'Healthcare',
    location: 'Loudoun, VA',
    year: 2024,
    description: 'A new 132-bed patient tower expanding Inova Loudoun Hospital\'s capacity with modern ICU, surgical suites, and patient-centered healing environments.',
    image_url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80',
    featured: 1
  },
  {
    title: 'The Peninsula',
    division: 'development',
    market: 'Multifamily',
    location: 'Washington, DC',
    year: 2022,
    description: 'A premier waterfront residential development featuring 280 luxury apartments with panoramic views, resort-style amenities, and direct access to trails and parks.',
    image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    featured: 1
  },
  {
    title: 'Ohlone Community College – Academic Core Buildings',
    division: 'building',
    market: 'Higher Education',
    location: 'Fremont, CA',
    year: 2023,
    description: 'Three interconnected academic buildings providing 120,000 SF of flexible classroom, lab, and collaborative learning space for Ohlone\'s growing student population.',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    featured: 1
  },
  {
    title: 'Eastern Michigan University Student Housing',
    division: 'building',
    market: 'Higher Education',
    location: 'Ypsilanti, MI',
    year: 2024,
    description: 'A 650-bed residential community designed to foster academic success with integrated study spaces, wellness facilities, and a vibrant social environment.',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: 1
  },
  {
    title: 'Metro Transit Operations Center',
    division: 'building',
    market: 'Transportation',
    location: 'Minneapolis, MN',
    year: 2023,
    description: 'A 180,000 SF transit operations and maintenance facility supporting the region\'s light rail network with state-of-the-art control systems and fleet maintenance capabilities.',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    featured: 0
  },
  {
    title: 'Barnaby & 7th Affordable Housing',
    division: 'development',
    market: 'Affordable & Mixed-Income Housing',
    location: 'Washington, DC',
    year: 2025,
    description: 'A 240-unit affordable housing development serving low-to-moderate income families in NW Washington, featuring community spaces, a childcare center, and green building design.',
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    featured: 0
  },
  {
    title: 'Jefferson County Courthouse',
    division: 'building',
    market: 'Civic & Public Administration',
    location: 'Louisville, KY',
    year: 2022,
    description: 'A modern 250,000 SF civic courthouse featuring secure courtrooms, public service areas, and cutting-edge technology infrastructure to serve Jefferson County\'s growing population.',
    image_url: 'https://images.unsplash.com/photo-1565439765535-b51ae5a59d47?w=800&q=80',
    featured: 0
  },
  {
    title: 'Highland Elementary School',
    division: 'building',
    market: 'K-12 Education',
    location: 'Phoenix, AZ',
    year: 2023,
    description: 'A 75,000 SF elementary school designed around 21st-century learning principles with flexible classrooms, maker spaces, outdoor learning gardens, and LEED Silver certification.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    featured: 0
  },
  {
    title: 'Apex Data Center Campus',
    division: 'building',
    market: 'Data Centers',
    location: 'Ashburn, VA',
    year: 2024,
    description: 'A 500,000 SF hyperscale data center campus with 120MW of critical IT capacity, advanced cooling systems, and N+1 redundant power infrastructure.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    featured: 0
  }
];

const news = [
  {
    title: 'BTCONS Development Announces Launch of Leasing for Phase 2 of Barnaby & 7th',
    category: 'Press Release',
    excerpt: 'BTCONS Development is pleased to announce the launch of leasing for Phase 2 of Barnaby & 7th, a 240-unit affordable housing community in Northwest Washington, DC.',
    image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    published_date: '2026-03-15',
    division: 'Development'
  },
  {
    title: 'BTCONS Development Announces Andreas Vlahakis as Head of Capital Markets',
    category: 'Press Release',
    excerpt: 'BTCONS Development has appointed Andreas Vlahakis as Head of Capital Markets, bringing over 20 years of real estate finance expertise to the growing development platform.',
    image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    published_date: '2026-04-02',
    division: 'Development'
  },
  {
    title: 'Judson Center Breaks Ground on Expansion in Royal Oak, Michigan',
    category: 'News',
    excerpt: 'BTCONS Building joins community leaders to celebrate the groundbreaking of the Judson Center expansion, a 40,000 SF behavioral health and community services facility.',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    published_date: '2026-04-10',
    division: 'Building'
  },
  {
    title: 'BTCONS Development Announces Mark Lawson as Development Director',
    category: 'Press Release',
    excerpt: 'BTCONS Development welcomes Mark Lawson as Development Director, where he will lead mixed-income housing initiatives across the Mid-Atlantic region.',
    image_url: 'https://images.unsplash.com/photo-1590650046871-92c887180603?w=600&q=80',
    published_date: '2026-04-14',
    division: 'Development'
  },
  {
    title: 'BTCONS Celebrates Topping Out of Elgin Area School District Legacy Project',
    category: 'News',
    excerpt: 'BTCONS Building and Elgin Area School District U46 celebrated the topping out of Legacy Elementary School, a 98,000 SF state-of-the-art K-8 learning community.',
    image_url: 'https://images.unsplash.com/photo-1535916707197-b8b23cfafecc?w=600&q=80',
    published_date: '2026-04-18',
    division: 'Building'
  },
  {
    title: 'BTCONS Named Among ENR Top 20 Contractors for 2025',
    category: 'Award',
    excerpt: 'Engineering News-Record has ranked BTCONS Building among the nation\'s Top 20 General Contractors for 2025, recognizing the firm\'s continued growth and project excellence.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    published_date: '2026-03-28',
    division: 'Building'
  }
];

const jobs = [
  {
    title: 'Project Manager',
    department: 'Building Operations',
    location: 'Boston, MA',
    type: 'Full-time',
    description: 'Lead complex construction projects from preconstruction through closeout. Manage subcontractors, budgets, schedules, and client relationships for projects ranging from $50M to $500M.',
    posted_date: '2026-04-01'
  },
  {
    title: 'Senior Estimator',
    department: 'Preconstruction',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Prepare detailed cost estimates for complex construction projects across multiple market sectors. Partner with operations and business development teams to win and plan new work.',
    posted_date: '2026-04-05'
  },
  {
    title: 'Development Associate',
    department: 'Development',
    location: 'Washington, DC',
    type: 'Full-time',
    description: 'Support real estate development projects from site acquisition through project delivery. Analyze market conditions, manage due diligence, and coordinate with financing partners.',
    posted_date: '2026-03-20'
  },
  {
    title: 'Virtual Design & Construction Manager',
    department: 'VDC & Technology',
    location: 'Chicago, IL',
    type: 'Full-time',
    description: 'Lead BIM/VDC implementation on major projects. Develop model-based workflows, coordinate clash detection, and drive technology adoption across project teams.',
    posted_date: '2026-04-10'
  },
  {
    title: 'Site Superintendent',
    department: 'Building Operations',
    location: 'Multiple Locations',
    type: 'Full-time',
    description: 'Direct daily field operations on major construction projects ensuring safety, quality, and schedule performance. Coordinate subcontractors and manage field teams.',
    posted_date: '2026-04-12'
  },
  {
    title: 'Financial Analyst',
    department: 'Development Finance',
    location: 'Providence, RI',
    type: 'Full-time',
    description: 'Analyze investment opportunities, prepare financial models, and support the capital formation process for diverse real estate development projects across the US.',
    posted_date: '2026-03-25'
  },
  {
    title: 'Sustainability Manager',
    department: 'Sustainability & Innovation',
    location: 'Boston, MA',
    type: 'Full-time',
    description: 'Drive sustainability strategy and LEED/green building compliance across the project portfolio. Partner with clients and project teams to meet decarbonization and ESG goals.',
    posted_date: '2026-04-08'
  },
  {
    title: 'Marketing & Communications Specialist',
    department: 'Corporate Marketing',
    location: 'Providence, RI',
    type: 'Full-time',
    description: 'Develop compelling content, manage proposal efforts, and support brand communications across digital and print channels for both BTCONS Building and Development divisions.',
    posted_date: '2026-04-15'
  }
];

const insertProject = db.prepare(`INSERT INTO projects (title, division, market, location, year, description, image_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
const insertNews = db.prepare(`INSERT INTO news (title, category, excerpt, image_url, published_date, division) VALUES (?, ?, ?, ?, ?, ?)`);
const insertJob = db.prepare(`INSERT INTO jobs (title, department, location, type, description, posted_date) VALUES (?, ?, ?, ?, ?, ?)`);

const seedAll = db.transaction(() => {
  for (const p of projects) insertProject.run(p.title, p.division, p.market, p.location, p.year, p.description, p.image_url, p.featured);
  for (const n of news) insertNews.run(n.title, n.category, n.excerpt, n.image_url, n.published_date, n.division);
  for (const j of jobs) insertJob.run(j.title, j.department, j.location, j.type, j.description, j.posted_date);
});

seedAll();
console.log('Database seeded: 15 projects, 6 news, 8 jobs');
