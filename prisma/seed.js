// Load environment variables first
require('dotenv').config({ path: '.env' });

const { PrismaClient } = require('@prisma/client');

// Prisma 6 works with traditional approach
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding authorization data...');

  // Define some basic permissions
  const permissionNames = [
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'site.manage',
    'homeFeatures.manage',
    'about.manage',
    'services.manage',
    'full_control',
  ];

  const permissions = [];
  for (const name of permissionNames) {
    const p = await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name} permission` },
    });
    permissions.push(p);
  }

  // Ensure SYSADMIN role exists
  const role = await prisma.role.upsert({
    where: { name: 'SYSADMIN' },
    update: {},
    create: { name: 'SYSADMIN', permissions: JSON.stringify(['full_control']) },
  });

  // Attach all permissions to SYSADMIN via RolePermission
  for (const p of permissions) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: role.id, permissionId: p.id } },
      update: {},
      create: { roleId: role.id, permissionId: p.id },
    });
  }

  // Create sample sysAdmin user (protected) with hashed password
  const bcrypt = require('bcryptjs');
  const sysAdminEmail = 'vuleitsolution@gmail.com';
  const sysAdminPassword = 'VULEITS@2025#';
  const hash = await bcrypt.hash(sysAdminPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: sysAdminEmail },
    update: { roleId: role.id, isProtected: true, password: hash },
    create: {
      email: sysAdminEmail,
      password: hash,
      roleId: role.id,
      isActive: true,
      isProtected: true,
    },
  });

  // Assign explicit user permissions for sysAdmin (redundant but explicit)
  for (const p of permissions) {
    await prisma.userPermission.upsert({
      where: { userId_permissionId: { userId: user.id, permissionId: p.id } },
      update: {},
      create: { userId: user.id, permissionId: p.id },
    });
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
