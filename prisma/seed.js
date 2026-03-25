// Load environment variables first
require('dotenv').config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD) {
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    process.env.DATABASE_URL = `mysql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

const { PrismaClient } = require('@prisma/client');

// Prisma 6 works with traditional approach
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding authorization data...');

  const uiFeatures = [
    'overview',
    'services',
    'products',
    'news',
    'media',
    'banners',
    'homeFeatures',
    'contacts',
    'aboutTeam',
    'aboutStats',
    'users',
    'userPassword',
    'permissions',
  ];

  // Map sidebar feature ids -> permission name prefixes in DB
  const featureToPermissionPrefix = {
    overview: 'site',
    services: 'services',
    products: 'products',
    news: 'news',
    media: 'media',
    banners: 'banners',
    homeFeatures: 'homeFeatures',
    contacts: 'contacts',
    aboutTeam: 'aboutTeam',
    aboutStats: 'aboutStats',
    users: 'users',
    userPassword: 'userPassword',
    permissions: 'permissions',
  };

  const actions = ['create', 'read', 'update', 'delete'];

  // CRUD permissions per feature, e.g. "services.read", "services.update", ...
  const permissionNames = [];
  for (const feature of Object.values(featureToPermissionPrefix)) {
    for (const action of actions) permissionNames.push(`${feature}.${action}`);
  }

  const permissionNameToId = new Map();
  for (const name of permissionNames) {
    const p = await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name} permission` },
    });
    permissionNameToId.set(name, p.id);
  }

  const roles = ['SYSADMIN', 'ADMIN', 'MANAGER', 'EDITOR', 'WRITER'];
  const roleNameToId = new Map();
  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r },
      update: {},
      create: { name: r, permissions: null },
    });
    roleNameToId.set(r, role.id);
  }

  // Keep RolePermission minimal for non-sysadmin users so the Permission UI can fully enable/disable
  // by creating/deleting UserPermission rows.
  for (const r of roles) {
    const roleId = roleNameToId.get(r);
    await prisma.rolePermission.deleteMany({ where: { roleId } });
  }

  // SYSADMIN: full CRUD for all permissions via role permissions.
  const sysRoleId = roleNameToId.get('SYSADMIN');
  for (const permissionId of permissionNameToId.values()) {
    await prisma.rolePermission.create({
      data: { roleId: sysRoleId, permissionId },
    });
  }

  // Seed users (testing)
  const bcrypt = require('bcryptjs');
  const sysAdminPassword = 'VULEITS@2025#';
  const usersToSeed = [
    { email: 'vuleitsolution@gmail.com', role: 'SYSADMIN', isProtected: true },
    { email: 'admin1@example.com', role: 'ADMIN', isProtected: false },
    { email: 'manager1@example.com', role: 'MANAGER', isProtected: false },
    { email: 'editor1@example.com', role: 'EDITOR', isProtected: false },
    { email: 'writer1@example.com', role: 'WRITER', isProtected: false },
    // Guest demo: MANAGER role, password "demo", view-only (read, no create/update/delete)
    { email: 'demo@vuleits.com', role: 'MANAGER', isProtected: false, password: 'demo', readOnlyPermissions: true },
  ];

  // Defaults used to create UserPermission rows (Permission UI toggles these).
  // These match the "Role Permission Matrix (CRUD)" logic you requested, but stored per-user.
  const roleCrudDefaults = {
    SYSADMIN: Object.fromEntries(uiFeatures.map((f) => [f, { create: true, read: true, update: true, delete: true }])),
    ADMIN: Object.fromEntries(uiFeatures.map((f) => [f, { create: true, read: true, update: true, delete: true }])),
    MANAGER: (() => {
      const base = Object.fromEntries(uiFeatures.map((f) => [f, { create: false, read: false, update: false, delete: false }])); // start empty
      for (const f of ['overview', 'services', 'products', 'news', 'media', 'banners', 'homeFeatures', 'contacts', 'aboutTeam', 'aboutStats']) {
        base[f] = { create: true, read: true, update: true, delete: false };
      }
      base.users = { create: false, read: false, update: false, delete: false };
      base.permissions = { create: false, read: false, update: false, delete: false };
      return base;
    })(),
    EDITOR: (() => {
      const base = Object.fromEntries(uiFeatures.map((f) => [f, { create: false, read: false, update: false, delete: false }])); // start empty
      for (const f of ['overview', 'news', 'media', 'banners', 'homeFeatures', 'contacts', 'aboutTeam', 'aboutStats']) {
        base[f] = { create: true, read: true, update: true, delete: false };
      }
      base.services = { create: false, read: true, update: false, delete: false };
      base.products = { create: false, read: true, update: false, delete: false };
      base.users = { create: false, read: false, update: false, delete: false };
      base.permissions = { create: false, read: false, update: false, delete: false };
      return base;
    })(),
    WRITER: (() => {
      const base = Object.fromEntries(uiFeatures.map((f) => [f, { create: false, read: false, update: false, delete: false }])); // start empty
      base.overview = { create: false, read: true, update: false, delete: false };
      base.news = { create: true, read: true, update: false, delete: false };
      base.media = { create: true, read: true, update: false, delete: false };
      base.banners = { create: false, read: true, update: false, delete: false };
      base.services = { create: false, read: true, update: false, delete: false };
      base.products = { create: false, read: true, update: false, delete: false };
      base.homeFeatures = { create: false, read: true, update: false, delete: false };
      base.contacts = { create: false, read: true, update: false, delete: false };
      base.aboutTeam = { create: false, read: true, update: false, delete: false };
      base.aboutStats = { create: false, read: true, update: false, delete: false };
      base.users = { create: false, read: false, update: false, delete: false };
      base.permissions = { create: false, read: false, update: false, delete: false };
      return base;
    })(),
  };

  const readOnlyMatrix = Object.fromEntries(
    uiFeatures.map((f) => [f, { create: false, read: true, update: false, delete: false }]),
  );
  readOnlyMatrix.users = { create: false, read: false, update: false, delete: false };
  readOnlyMatrix.userPassword = { create: false, read: false, update: false, delete: false };
  readOnlyMatrix.permissions = { create: false, read: false, update: false, delete: false };

  await prisma.user.deleteMany({ where: { email: 'demo' } });

  for (const u of usersToSeed) {
    const roleId = roleNameToId.get(u.role);
    if (!roleId) continue;

    const plainPassword = u.password != null ? u.password : sysAdminPassword;
    const hash = await bcrypt.hash(plainPassword, 10);

    const created = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        roleId,
        isProtected: u.isProtected,
        password: hash,
        isActive: true,
      },
      create: {
        email: u.email,
        password: hash,
        roleId,
        isActive: true,
        isProtected: u.isProtected,
      },
    });

    // Reset user permissions to match the role defaults
    await prisma.userPermission.deleteMany({ where: { userId: created.id } });

    const defaults = u.readOnlyPermissions ? readOnlyMatrix : roleCrudDefaults[u.role];
    for (const feature of uiFeatures) {
      const prefix = featureToPermissionPrefix[feature];
      const crud = defaults[feature] || { create: false, read: false, update: false, delete: false };
      for (const action of actions) {
        const permissionName = `${prefix}.${action}`;
        const permissionId = permissionNameToId.get(permissionName);
        if (!permissionId) continue;
        if (crud[action]) {
          await prisma.userPermission.create({
            data: { userId: created.id, permissionId },
          });
        }
      }
    }
  }

  // Seed Home Page features from HomePage.tsx fallback list (only if empty)
  const homeFeatureCount = await prisma.homeFeature.count();
  if (homeFeatureCount === 0) {
    console.log('Seeding home page features...');
    await prisma.homeFeature.createMany({
      data: [
        {
          order: 0,
          isActive: true,
          icon: '✨',
          title: 'Modern Design',
          description:
            'Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy.',
        },
        {
          order: 1,
          isActive: true,
          icon: '⚡',
          title: 'Fast Performance',
          description:
            'Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices.',
        },
        {
          order: 2,
          isActive: true,
          icon: '📱',
          title: 'Responsive',
          description:
            'Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays.',
        },
        {
          order: 3,
          isActive: true,
          icon: '🎨',
          title: 'Interactive UI',
          description:
            'Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.',
        },
        {
          order: 4,
          isActive: true,
          icon: '🔒',
          title: 'Secure & Safe',
          description:
            'Built with modern security standards and best practices to ensure your data and user privacy are protected.',
        },
        {
          order: 5,
          isActive: true,
          icon: '🚀',
          title: 'Easy Integration',
          description:
            'Simple to implement and customize for any project with clean, well-documented code and flexible components.',
        },
      ],
    });
  }

  // Seed About/Services using raw SQL (works even if Prisma Client wasn't regenerated yet)
  const aboutStatCountRows = await prisma.$queryRaw`SELECT COUNT(*) as c FROM AboutStat`;
  const aboutStatCount = Number(aboutStatCountRows?.[0]?.c || 0);
  if (aboutStatCount === 0) {
    console.log('Seeding about page stats...');
    await prisma.$executeRaw`
      INSERT INTO AboutStat (number, label, \`order\`, isActive, createdAt, updatedAt) VALUES
      ('150+', 'Projects Completed', 0, true, NOW(), NOW()),
      ('50+', 'Happy Clients', 1, true, NOW(), NOW()),
      ('3', 'Years Experience', 2, true, NOW(), NOW()),
      ('24/7', 'Support Available', 3, true, NOW(), NOW())
    `;
  }

  const aboutTeamCountRows = await prisma.$queryRaw`SELECT COUNT(*) as c FROM AboutTeamMember`;
  const aboutTeamCount = Number(aboutTeamCountRows?.[0]?.c || 0);
  if (aboutTeamCount === 0) {
    console.log('Seeding about page team...');
    await prisma.$executeRaw`
      INSERT INTO AboutTeamMember (emoji, name, role, bio, \`order\`, isActive, createdAt, updatedAt) VALUES
      ('👨‍💼', 'John Anderson', 'CEO & Founder', 'Visionary leader with 15+ years in digital innovation, driving our mission to create exceptional user experiences.', 0, true, NOW(), NOW()),
      ('👩‍🎨', 'Sarah Chen', 'Creative Director', 'Award-winning designer specializing in modern UI/UX, bringing artistic vision to every project.', 1, true, NOW(), NOW()),
      ('👨‍💻', 'Michael Torres', 'Lead Developer', 'Full-stack expert passionate about clean code and innovative web technologies.', 2, true, NOW(), NOW()),
      ('👩‍💻', 'Emma Wilson', 'Senior Developer', 'Frontend specialist with expertise in React and modern JavaScript frameworks.', 3, true, NOW(), NOW()),
      ('👨‍🎨', 'David Kim', 'UX Designer', 'User experience expert focused on creating intuitive and accessible digital products.', 4, true, NOW(), NOW()),
      ('👩‍💼', 'Lisa Martinez', 'Project Manager', 'Certified PMP with a track record of delivering complex projects on time and budget.', 5, true, NOW(), NOW())
    `;
  }

  const servicesCountRows = await prisma.$queryRaw`SELECT COUNT(*) as c FROM ServiceItem`;
  const servicesCount = Number(servicesCountRows?.[0]?.c || 0);
  if (servicesCount === 0) {
    console.log('Seeding services page items...');
    await prisma.$executeRaw`
      INSERT INTO ServiceItem (icon, title, description, features, \`order\`, isActive, createdAt, updatedAt) VALUES
      ('🎨', 'UI/UX Design', 'Create stunning user interfaces with modern design principles, focusing on usability and aesthetic appeal.', ${JSON.stringify([
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Responsive Design',
      ])}, 0, true, NOW(), NOW()),
      ('💻', 'Web Development', 'Build fast, secure, and scalable websites using the latest web technologies and best practices.', ${JSON.stringify([
        'Frontend Development',
        'Backend Integration',
        'Performance Optimization',
        'SEO Implementation',
      ])}, 1, true, NOW(), NOW()),
      ('📱', 'Mobile Apps', 'Develop native and cross-platform mobile applications that deliver exceptional user experiences.', ${JSON.stringify([
        'iOS & Android Development',
        'Cross-platform Solutions',
        'App Store Optimization',
        'Maintenance & Updates',
      ])}, 2, true, NOW(), NOW()),
      ('🚀', 'Digital Strategy', 'Strategic consulting to help your business thrive in the digital landscape with data-driven insights.', ${JSON.stringify([
        'Digital Transformation',
        'Analytics & Reporting',
        'Growth Strategy',
        'Technology Consulting',
      ])}, 3, true, NOW(), NOW()),
      ('☁️', 'Cloud Solutions', 'Modernize your infrastructure with scalable cloud services and seamless migration strategies.', ${JSON.stringify([
        'Cloud Migration',
        'DevOps & Automation',
        'Infrastructure as Code',
        '24/7 Monitoring',
      ])}, 4, true, NOW(), NOW()),
      ('🔒', 'Cybersecurity', 'Protect your digital assets with comprehensive security solutions and threat protection.', ${JSON.stringify([
        'Security Auditing',
        'Penetration Testing',
        'Data Protection',
        'Compliance Management',
      ])}, 5, true, NOW(), NOW())
    `;
  }

  // Seed News (sample data for testing)
  const newsCountRows = await prisma.$queryRaw`SELECT COUNT(*) as c FROM News`;
  const newsCount = Number(newsCountRows?.[0]?.c || 0);
  console.log(`Ensuring sample news articles... (existing: ${newsCount})`);

  const authorIdRows = await prisma.$queryRaw`SELECT id FROM \`User\` ORDER BY id ASC LIMIT 1`;
  const authorId = Number(authorIdRows?.[0]?.id || 1);

  const now = new Date();
  // MySQL DATETIME(3) expects: YYYY-MM-DD HH:MM:SS.sss (no trailing Z)
  const toMysqlDateTime = (d) => d.toISOString().replace('T', ' ').replace('Z', '');
  const daysAgo = (n) => new Date(now.getTime() - n * 86400000);

  const articles = [
      {
        title: 'Ecosystem Update: VULE ITS introduces new dashboard',
        slug: 'ecosystem-update-vule-its-introduces-new-dashboard',
        category: 'Technology',
        description: 'A quick look at the latest dashboard improvements and performance optimizations.',
        tags: ['Updates', 'Technology'],
        content: `
          <h1>Ecosystem Update</h1>
          <p>We’re excited to share improvements to our admin experience and public content rendering.</p>
          <h2>What changed</h2>
          <ul>
            <li>Faster pages with lazy-loaded thumbnails</li>
            <li>Better SEO metadata generation</li>
            <li>More flexible rich content blocks</li>
          </ul>
          <h3>TypeScript snippet</h3>
          <pre><code class="language-ts">type Article = { title: string; slug: string };</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(2)),
      },
      {
        title: 'Politics Brief: Policy focus for the quarter',
        slug: 'politics-brief-policy-focus-for-the-quarter',
        category: 'Politics',
        description: 'Highlights from our policy focus for the upcoming quarter.',
        tags: ['Policy', 'Politics'],
        content: `
          <h1>Politics Brief</h1>
          <p>Here are the main points we’re focusing on this quarter.</p>
          <h2>Key themes</h2>
          <ol>
            <li>Transparency</li>
            <li>Community engagement</li>
            <li>Execution and accountability</li>
          </ol>
          <h3>Code example</h3>
          <pre><code class="language-javascript">console.log('Hello from news content');</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(5)),
      },
      {
        title: 'Economy Watch: Market signals to track',
        slug: 'economy-watch-market-signals-to-track',
        category: 'Economy',
        description: 'A short list of signals we’re monitoring for economic movements.',
        tags: ['Economy', 'Trends'],
        content: `
          <h1>Economy Watch</h1>
          <p>We monitor a set of market and operational indicators.</p>
          <h2>Signals</h2>
          <p>Inflation trend, job reports, consumer sentiment, and investment activity.</p>
          <h3>CSS snippet</h3>
          <pre><code class="language-css">.badge { padding: 4px 8px; border-radius: 999px; }</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(8)),
      },
      {
        title: 'Entertainment: Behind the scenes of our redesign',
        slug: 'entertainment-behind-the-scenes-of-our-redesign',
        category: 'Entertainment',
        description: 'A behind-the-scenes look at the design decisions and layout improvements.',
        tags: ['Entertainment', 'Design'],
        content: `
          <h1>Behind the Scenes</h1>
          <p>We rebuilt major UI blocks for a more immersive experience.</p>
          <h2>Design goals</h2>
          <ul>
            <li>Modern glass effects</li>
            <li>Readable typography</li>
            <li>Consistent spacing system</li>
          </ul>
          <h3>HTML block</h3>
          <p><code>&lt;div&gt;New layout component&lt;/div&gt;</code></p>
        `,
        publishedAt: toMysqlDateTime(daysAgo(1)),
      },
      {
        title: 'Health Update: Tips for better content clarity',
        slug: 'health-update-tips-for-better-content-clarity',
        category: 'Health',
        description: 'Practical tips to keep articles clear, structured, and SEO-friendly.',
        tags: ['Health', 'SEO'],
        content: `
          <h1>Health Update</h1>
          <p>Good structure helps both users and search engines.</p>
          <h2>Checklist</h2>
          <ul>
            <li>Use headings (H1-H3)</li>
            <li>Include meta descriptions</li>
            <li>Optimize images for the web</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(10)),
      },
      // ==============================
      // Technology (add more samples)
      // ==============================
      {
        title: 'Technology Deep Dive: Admin UX performance tuning',
        slug: 'technology-deep-dive-admin-ux-performance-tuning',
        category: 'Technology',
        description: 'We tuned loading behavior and rendering to improve perceived speed.',
        tags: ['Technology', 'Performance', 'UX'],
        content: `
          <h1>Admin UX Performance Tuning</h1>
          <p>We optimized UI interactions and reduced unnecessary re-renders.</p>
          <h2>Key improvements</h2>
          <ul>
            <li>Lazy-load non-critical UI sections</li>
            <li>Smarter data fetch timing</li>
            <li>Reduce expensive state updates</li>
          </ul>
          <h3>JavaScript snippet</h3>
          <pre><code class="language-javascript">const delay = (ms) => new Promise(r => setTimeout(r, ms));</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(6)),
      },
      {
        title: 'Technology Security: Hardening rich content rendering',
        slug: 'technology-security-hardening-rich-content-rendering',
        category: 'Technology',
        description: 'Safer handling of embedded code and media in article content.',
        tags: ['Technology', 'Security'],
        content: `
          <h1>Hardening Rich Content</h1>
          <p>We sanitize stored HTML while preserving code blocks for readability.</p>
          <h2>What we allow</h2>
          <ul>
            <li>Headings (H1-H3)</li>
            <li>Images with lazy loading</li>
            <li>Preformatted code snippets</li>
          </ul>
          <h3>TypeScript example</h3>
          <pre><code class="language-ts">type Sanitized = { html: string };</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(12)),
      },
      {
        title: 'Technology Benchmark: Measuring real page speed',
        slug: 'technology-benchmark-measuring-real-page-speed',
        category: 'Technology',
        description: 'A practical guide to performance measurements and follow-ups.',
        tags: ['Technology', 'Benchmark'],
        content: `
          <h1>Measuring Real Page Speed</h1>
          <p>Use consistent metrics and track regressions over time.</p>
          <h2>Suggested checklist</h2>
          <ol>
            <li>Measure LCP and CLS</li>
            <li>Check image sizes</li>
            <li>Verify caching headers</li>
          </ol>
          <h3>CSS snippet</h3>
          <pre><code class="language-css">img { content-visibility: auto; }</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(18)),
      },

      // ==============================
      // Politics (add more samples)
      // ==============================
      {
        title: 'Politics Update: Transparency report highlights',
        slug: 'politics-update-transparency-report-highlights',
        category: 'Politics',
        description: 'A short transparency report with the top highlights.',
        tags: ['Politics', 'Transparency'],
        content: `
          <h1>Transparency Report</h1>
          <p>We’re sharing the most important changes and metrics.</p>
          <h2>Highlights</h2>
          <ul>
            <li>Improved communication cadence</li>
            <li>Clearer reporting</li>
            <li>Stronger accountability</li>
          </ul>
          <h3>JavaScript sample</h3>
          <pre><code class="language-javascript">function formatDate(d){ return d.toISOString().slice(0,10); }</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(7)),
      },
      {
        title: 'Politics Brief: Community engagement initiatives',
        slug: 'politics-brief-community-engagement-initiatives',
        category: 'Politics',
        description: 'New community initiatives for feedback, events, and collaboration.',
        tags: ['Politics', 'Community'],
        content: `
          <h1>Community Engagement</h1>
          <p>We’re launching new ways to gather and publish feedback.</p>
          <h2>Plan</h2>
          <ol>
            <li>Monthly feedback threads</li>
            <li>Quarterly public summaries</li>
            <li>Volunteer-led sessions</li>
          </ol>
        `,
        publishedAt: toMysqlDateTime(daysAgo(14)),
      },
      {
        title: 'Politics Desk: Budget allocation overview',
        slug: 'politics-desk-budget-allocation-overview',
        category: 'Politics',
        description: 'An overview of budget allocation for the next quarter.',
        tags: ['Politics', 'Budget'],
        content: `
          <h1>Budget Allocation</h1>
          <p>Where resources are directed to maximize impact.</p>
          <h2>Allocation</h2>
          <ul>
            <li>Operations</li>
            <li>Infrastructure</li>
            <li>Community programs</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(25)),
      },

      // ==============================
      // Economy (add more samples)
      // ==============================
      {
        title: 'Economy Insight: Growth signals to watch',
        slug: 'economy-insight-growth-signals-to-watch',
        category: 'Economy',
        description: 'Tracking growth and stability using practical indicators.',
        tags: ['Economy', 'Growth'],
        content: `
          <h1>Growth Signals</h1>
          <p>These are the indicators we monitor for a stable trajectory.</p>
          <h2>Signals</h2>
          <ul>
            <li>Revenue trends</li>
            <li>Operational efficiency</li>
            <li>Customer retention</li>
          </ul>
          <h3>TypeScript snippet</h3>
          <pre><code class="language-ts">type Signal = 'revenue'|'retention';</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(9)),
      },
      {
        title: 'Economy Watch: Financial health checks',
        slug: 'economy-watch-financial-health-checks',
        category: 'Economy',
        description: 'A simple checklist for financial health and decision making.',
        tags: ['Economy', 'Finance'],
        content: `
          <h1>Financial Health Checks</h1>
          <p>Keep your metrics actionable and consistent.</p>
          <h2>Checklist</h2>
          <ol>
            <li>Cash runway</li>
            <li>Cost control</li>
            <li>Risk assessment</li>
          </ol>
        `,
        publishedAt: toMysqlDateTime(daysAgo(16)),
      },
      {
        title: 'Economy Operations: Measuring efficiency',
        slug: 'economy-operations-measuring-efficiency',
        category: 'Economy',
        description: 'How we measure efficiency across teams and workflows.',
        tags: ['Economy', 'Operations'],
        content: `
          <h1>Measuring Efficiency</h1>
          <p>Efficiency is a composite metric—optimize the system, not only output.</p>
          <h2>Approach</h2>
          <ul>
            <li>Cycle time tracking</li>
            <li>Automation opportunities</li>
            <li>Continuous improvement</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(30)),
      },

      // ==============================
      // Entertainment (add more samples)
      // ==============================
      {
        title: 'Entertainment Feature: UX storytelling for articles',
        slug: 'entertainment-feature-ux-storytelling-for-articles',
        category: 'Entertainment',
        description: 'A storytelling approach to improve readability and engagement.',
        tags: ['Entertainment', 'Storytelling'],
        content: `
          <h1>UX Storytelling</h1>
          <p>Structure your articles like a narrative: set context, then deliver value.</p>
          <h2>Structure</h2>
          <ul>
            <li>Hook with the headline</li>
            <li>Use H2 sections for clarity</li>
            <li>End with a takeaway</li>
          </ul>
          <h3>HTML example</h3>
          <pre><code class="language-html">&lt;h2&gt;Structure&lt;/h2&gt;</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(4)),
      },
      {
        title: 'Entertainment Update: Media and layout polish',
        slug: 'entertainment-update-media-and-layout-polish',
        category: 'Entertainment',
        description: 'Polishing media presentation and improving spacing consistency.',
        tags: ['Entertainment', 'Design'],
        content: `
          <h1>Media & Layout Polish</h1>
          <p>Small changes that make a big visual difference across devices.</p>
          <h2>Improvements</h2>
          <ul>
            <li>Consistent card heights</li>
            <li>Better typography scale</li>
            <li>Improved responsive spacing</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(11)),
      },
      {
        title: 'Entertainment Lab: Interaction micro-animations',
        slug: 'entertainment-lab-interaction-micro-animations',
        category: 'Entertainment',
        description: 'Using micro-animations to create delightful UX without affecting performance.',
        tags: ['Entertainment', 'Interaction'],
        content: `
          <h1>Micro-animations</h1>
          <p>Keep animations subtle and performance-friendly.</p>
          <h2>Rules of thumb</h2>
          <ol>
            <li>Use transforms over layout changes</li>
            <li>Avoid heavy repaints</li>
            <li>Prefer short durations</li>
          </ol>
          <h3>JavaScript example</h3>
          <pre><code class="language-javascript">requestAnimationFrame(() => console.log('anim'));</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(22)),
      },

      // ==============================
      // Health (add more samples)
      // ==============================
      {
        title: 'Health Brief: Accessibility checklist for articles',
        slug: 'health-brief-accessibility-checklist-for-articles',
        category: 'Health',
        description: 'Accessibility improvements that help both users and SEO.',
        tags: ['Health', 'Accessibility'],
        content: `
          <h1>Accessibility Checklist</h1>
          <p>Accessible content improves usability and helps search engines understand structure.</p>
          <h2>Checklist</h2>
          <ul>
            <li>Use semantic headings</li>
            <li>Ensure readable contrast</li>
            <li>Optimize images and alt text</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(3)),
      },
      {
        title: 'Health Update: Practical SEO content habits',
        slug: 'health-update-practical-seo-content-habits',
        category: 'Health',
        description: 'Simple habits that keep content SEO-friendly and easy to scan.',
        tags: ['Health', 'SEO'],
        content: `
          <h1>Practical SEO Habits</h1>
          <p>Focus on clarity: clean structure, meaningful headings, and useful sections.</p>
          <h2>Habits</h2>
          <ol>
            <li>Write a strong description</li>
            <li>Use consistent heading order</li>
            <li>Add relevant internal context</li>
          </ol>
          <h3>CSS snippet</h3>
          <pre><code class="language-css">.lead{ line-height: 1.6; }</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(13)),
      },
      {
        title: 'Health Watch: Optimizing images for the web',
        slug: 'health-watch-optimizing-images-for-the-web',
        category: 'Health',
        description: 'How to reduce payload while keeping images clear and fast.',
        tags: ['Health', 'Performance'],
        content: `
          <h1>Optimize Images</h1>
          <p>Smaller images load faster and improve Core Web Vitals.</p>
          <h2>Tips</h2>
          <ul>
            <li>Use modern formats</li>
            <li>Resize to expected dimensions</li>
            <li>Lazy-load non-critical images</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(21)),
      },
      // ==============================
      // Extra samples for slider testing
      // ==============================
      {
        title: 'Technology Feature: Content rendering pipeline',
        slug: 'technology-feature-content-rendering-pipeline',
        category: 'Technology',
        description: 'A quick overview of how content flows from editor to public rendering.',
        tags: ['Technology', 'Content'],
        content: `
          <h1>Content Rendering Pipeline</h1>
          <p>From editor input to sanitized output, we keep the steps predictable.</p>
          <h2>Stages</h2>
          <ul>
            <li>Store content</li>
            <li>Sanitize markup</li>
            <li>Render safely</li>
          </ul>
          <h3>TypeScript</h3>
          <pre><code class="language-ts">type PipelineStep = { name: string; ok: boolean };</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(7)),
      },
      {
        title: 'Technology Brief: Code snippet formatting rules',
        slug: 'technology-brief-code-snippet-formatting-rules',
        category: 'Technology',
        description: 'Keep code blocks readable with consistent styles and spacing.',
        tags: ['Technology', 'Code'],
        content: `
          <h1>Code Snippet Formatting</h1>
          <p>Code blocks should be legible and not break layout.</p>
          <h2>Rules</h2>
          <ul>
            <li>Use pre/code tags</li>
            <li>Keep line heights consistent</li>
            <li>Avoid inline styles in content</li>
          </ul>
          <h3>CSS</h3>
          <pre><code class="language-css">pre { white-space: pre-wrap; }</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(14)),
      },
      {
        title: 'Politics Feature: Community transparency forum',
        slug: 'politics-feature-community-transparency-forum',
        category: 'Politics',
        description: 'A forum to share progress updates and gather feedback.',
        tags: ['Politics', 'Community'],
        content: `
          <h1>Transparency Forum</h1>
          <p>We invite the community to review and propose improvements.</p>
          <h2>Agenda</h2>
          <ol>
            <li>Update</li>
            <li>Q&A</li>
            <li>Next steps</li>
          </ol>
        `,
        publishedAt: toMysqlDateTime(daysAgo(9)),
      },
      {
        title: 'Politics Brief: Operational accountability report',
        slug: 'politics-brief-operational-accountability-report',
        category: 'Politics',
        description: 'An accountability report highlighting execution metrics.',
        tags: ['Politics', 'Accountability'],
        content: `
          <h1>Accountability Report</h1>
          <p>We measure outcomes and publish the results with clarity.</p>
          <h2>Metrics</h2>
          <ul>
            <li>Delivery rate</li>
            <li>Quality checks</li>
            <li>Time to resolve</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(18)),
      },
      {
        title: 'Economy Feature: Efficiency without burnout',
        slug: 'economy-feature-efficiency-without-burnout',
        category: 'Economy',
        description: 'We optimize throughput while protecting wellbeing and sustainability.',
        tags: ['Economy', 'Efficiency'],
        content: `
          <h1>Efficiency Without Burnout</h1>
          <p>Long-term efficiency balances performance and people.</p>
          <h2>Approach</h2>
          <ul>
            <li>Clear priorities</li>
            <li>Automate repetitive tasks</li>
            <li>Protect focus time</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(6)),
      },
      {
        title: 'Economy Brief: Investment in tooling',
        slug: 'economy-brief-investment-in-tooling',
        category: 'Economy',
        description: 'Tooling investments that reduce cost and improve reliability.',
        tags: ['Economy', 'Tooling'],
        content: `
          <h1>Investment in Tooling</h1>
          <p>Better tooling means fewer surprises and more stable releases.</p>
          <h2>Examples</h2>
          <ul>
            <li>CI improvements</li>
            <li>Testing automation</li>
            <li>Observability</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(24)),
      },
      {
        title: 'Entertainment Feature: Article layout improvements',
        slug: 'entertainment-feature-article-layout-improvements',
        category: 'Entertainment',
        description: 'Layout tweaks designed to improve reading comfort.',
        tags: ['Entertainment', 'Layout'],
        content: `
          <h1>Layout Improvements</h1>
          <p>Better spacing and consistent typographic rhythm.</p>
          <h2>Changes</h2>
          <ul>
            <li>Improved heading scale</li>
            <li>Readable line spacing</li>
            <li>Cleaner spacing between sections</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(8)),
      },
      {
        title: 'Entertainment Brief: Micro-interactions guide',
        slug: 'entertainment-brief-micro-interactions-guide',
        category: 'Entertainment',
        description: 'A small guide for adding micro-interactions that feel natural.',
        tags: ['Entertainment', 'UX'],
        content: `
          <h1>Micro-interactions</h1>
          <p>Subtle interactions help users understand system state.</p>
          <h2>Checklist</h2>
          <ol>
            <li>Keep durations short</li>
            <li>Avoid layout shifts</li>
            <li>Ensure accessibility</li>
          </ol>
        `,
        publishedAt: toMysqlDateTime(daysAgo(15)),
      },
      {
        title: 'Health Feature: Structured content for SEO',
        slug: 'health-feature-structured-content-for-seo',
        category: 'Health',
        description: 'Structure content with headings and lists to improve scanability.',
        tags: ['Health', 'SEO'],
        content: `
          <h1>Structured Content</h1>
          <p>Headings and lists make articles easier to understand and index.</p>
          <h2>Tips</h2>
          <ul>
            <li>Use H1 for title</li>
            <li>Use H2/H3 for sections</li>
            <li>Add concise lists</li>
          </ul>
        `,
        publishedAt: toMysqlDateTime(daysAgo(5)),
      },
      {
        title: 'Health Brief: Performance checklist for images',
        slug: 'health-brief-performance-checklist-for-images',
        category: 'Health',
        description: 'A checklist to improve image performance in article pages.',
        tags: ['Health', 'Performance'],
        content: `
          <h1>Image Performance Checklist</h1>
          <p>Better images reduce load time and improve user experience.</p>
          <h2>Checklist</h2>
          <ul>
            <li>Use modern formats</li>
            <li>Resize before upload</li>
            <li>Enable lazy loading</li>
          </ul>
          <h3>Code</h3>
          <pre><code class="language-javascript">const img = document.querySelector('img');</code></pre>
        `,
        publishedAt: toMysqlDateTime(daysAgo(16)),
      },
    ];

    for (const a of articles) {
      // If slug exists already, skip (so re-running seed is safe)
      // NOTE: MySQL doesn't support IF NOT EXISTS for unique constraints in one statement.
      // We'll do a COUNT check per article.
      const existsRows = await prisma.$queryRaw`SELECT COUNT(*) as c FROM News WHERE slug = ${a.slug}`;
      const exists = Number(existsRows?.[0]?.c || 0) > 0;
      if (exists) continue;

      await prisma.$executeRaw`
        INSERT INTO News (title, slug, description, content, tags, status, category, imageId, startDate, publishedAt, authorId, seoTitle, seoDescription, seoKeywords, createdAt, updatedAt)
        VALUES (
          ${a.title}, ${a.slug}, ${a.description}, ${a.content},
          ${JSON.stringify(a.tags)}, 'Active', ${a.category}, NULL,
          NULL, ${a.publishedAt}, ${authorId},
          ${a.title}, ${a.description}, ${a.tags.join(', ')},
          NOW(), NOW()
        )
      `;
    }
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
