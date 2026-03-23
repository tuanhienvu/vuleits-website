// Load environment variables first
require('dotenv').config({ path: '.env' });

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
