const fs = require('fs');
const path = require('path');

const snapshotPath = path.join(__dirname, '..', 'prisma', 'seed.db.snapshot.json');
const data = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

const exactMap = {
  'CEO & Founder': 'CEO & Nha sang lap',
  'Creative Director': 'Giam doc sang tao',
  'Lead Developer': 'Truong nhom phat trien',
  'Senior Developer': 'Lap trinh vien cap cao',
  'UX Designer': 'Nha thiet ke UX',
  'Project Manager': 'Quan ly du an',
  'Web Development': 'Phat trien web',
  'Mobile Development': 'Phat trien ung dung di dong',
  'UI/UX Design': 'Thiet ke UI/UX',
  'Cloud Solutions': 'Giai phap dam may',
  'Digital Marketing': 'Tiep thi so',
  Cybersecurity: 'An ninh mang',
  'Visionary leader with 15+ years in digital innovation, driving our mission to create exceptional user experiences.':
    'Nha lanh dao tam nhin voi hon 15 nam doi moi so, dan dat su menh tao ra trai nghiem nguoi dung vuot troi.',
  'Award-winning designer specializing in modern UI/UX, bringing artistic vision to every project.':
    'Nha thiet ke dat giai thuong, chuyen ve UI/UX hien dai, mang tam nhin nghe thuat vao moi du an.',
  'Full-stack expert passionate about clean code and innovative web technologies.':
    'Chuyen gia full-stack dam me clean code va cong nghe web doi moi.',
  'Frontend specialist with expertise in React and modern JavaScript frameworks.':
    'Chuyen gia frontend thanh thao React va cac framework JavaScript hien dai.',
  'User experience expert focused on creating intuitive and accessible digital products.':
    'Chuyen gia trai nghiem nguoi dung, tap trung tao ra san pham so truc quan va de tiep can.',
  'Experienced project manager ensuring seamless delivery and client satisfaction.':
    'Quan ly du an giau kinh nghiem, dam bao ban giao suon se va su hai long cua khach hang.',
  'Custom web applications built with cutting-edge technologies and best practices.':
    'Xay dung ung dung web tuy chinh bang cong nghe tien tien va thuc hanh tot nhat.',
  'Native and cross-platform mobile apps for iOS and Android devices.':
    'Phat trien ung dung di dong native va da nen tang cho thiet bi iOS va Android.',
  'User-centered design solutions that enhance usability and engagement.':
    'Giai phap thiet ke lay nguoi dung lam trung tam, nang cao tinh de dung va muc do tuong tac.',
  'Scalable cloud infrastructure and migration services for modern businesses.':
    'Ha tang dam may co kha nang mo rong va dich vu chuyen doi danh cho doanh nghiep hien dai.',
  'Data-driven marketing strategies to boost your online presence and growth.':
    'Chien luoc tiep thi dua tren du lieu de tang hien dien truc tuyen va tang truong.',
  'Protect your digital assets with comprehensive security solutions and threat protection.':
    'Bao ve tai san so bang giai phap bao mat toan dien va kha nang phong chong de doa.',
};

function translateIfKnown(en) {
  if (typeof en !== 'string') return null;
  const trimmed = en.trim();
  if (!trimmed) return null;
  return exactMap[trimmed] || null;
}

let translatedCount = 0;

const phraseMap = [
  ['Visionary leader', 'Nha lanh dao tam nhin'],
  ['digital innovation', 'doi moi so'],
  ['user experiences', 'trai nghiem nguoi dung'],
  ['Award-winning designer', 'Nha thiet ke dat giai thuong'],
  ['modern UI/UX', 'UI/UX hien dai'],
  ['artistic vision', 'tam nhin nghe thuat'],
  ['Full-stack expert', 'Chuyen gia full-stack'],
  ['clean code', 'ma nguon sach'],
  ['web technologies', 'cong nghe web'],
  ['Frontend specialist', 'Chuyen gia frontend'],
  ['modern JavaScript frameworks', 'cac framework JavaScript hien dai'],
  ['User experience expert', 'Chuyen gia trai nghiem nguoi dung'],
  ['digital products', 'san pham so'],
  ['Experienced project manager', 'Quan ly du an giau kinh nghiem'],
  ['client satisfaction', 'su hai long cua khach hang'],
  ['Custom web applications', 'Ung dung web tuy chinh'],
  ['cutting-edge technologies', 'cong nghe tien tien'],
  ['best practices', 'thuc hanh tot nhat'],
  ['Native and cross-platform mobile apps', 'Ung dung di dong native va da nen tang'],
  ['iOS and Android devices', 'thiet bi iOS va Android'],
  ['User-centered design solutions', 'Giai phap thiet ke lay nguoi dung lam trung tam'],
  ['enhance usability and engagement', 'nang cao tinh de dung va muc do tuong tac'],
  ['Scalable cloud infrastructure', 'Ha tang dam may co kha nang mo rong'],
  ['modern businesses', 'doanh nghiep hien dai'],
  ['Data-driven marketing strategies', 'Chien luoc tiep thi dua tren du lieu'],
  ['online presence', 'hien dien truc tuyen'],
  ['Protect your digital assets', 'Bao ve tai san so cua ban'],
  ['security solutions', 'giai phap bao mat'],
  ['threat protection', 'phong chong de doa'],
  ['Technology', 'Cong nghe'],
  ['Business', 'Kinh doanh'],
  ['Product Updates', 'Cap nhat san pham'],
  ['Case Studies', 'Du an tieu bieu'],
  ['Events', 'Su kien'],
  ['Insights', 'Goc nhin'],
  ['Politics', 'Chinh tri'],
  ['Economy', 'Kinh te'],
  ['Entertainment', 'Giai tri'],
  ['Health', 'Suc khoe'],
  ['Update', 'Cap nhat'],
  ['Brief', 'Tong quan'],
  ['Watch', 'Theo doi'],
  ['Deep Dive', 'Chuyen sau'],
  ['dashboard', 'bang dieu khien'],
  ['performance', 'hieu nang'],
  ['loading behavior', 'hanh vi tai'],
  ['rendering', 'ket xuat'],
  ['improve perceived speed', 'cai thien toc do cam nhan'],
  ['A quick look at the latest dashboard improvements and performance optimizations.', 'Tom tat nhanh cac cai tien moi cua bang dieu khien va toi uu hieu nang.'],
  ['Highlights from our policy focus for the upcoming quarter.', 'Diem nhan trong trong tam chinh sach cho quy sap toi.'],
  ['A short list of signals we’re monitoring for economic movements.', 'Danh sach ngan cac tin hieu chung toi dang theo doi cho bien dong kinh te.'],
  ['A behind-the-scenes look at the design decisions and layout improvements.', 'Goc nhin hau truong ve cac quyet dinh thiet ke va cai tien bo cuc.'],
  ['Practical tips to keep articles clear, structured, and SEO-friendly.', 'Meo thuc te giup bai viet ro rang, co cau truc va than thien SEO.'],
  ['We tuned loading behavior and rendering to improve perceived speed.', 'Chung toi toi uu hanh vi tai va ket xuat de cai thien toc do cam nhan.'],
  ['Safer handling of embedded code and media in article content.', 'Xu ly an toan hon doi voi ma nhung va media trong noi dung bai viet.'],
  ['A practical guide to performance measurements and follow-ups.', 'Huong dan thuc te ve do luong hieu nang va cac buoc theo doi.'],
];

function translateByPhrases(text) {
  if (typeof text !== 'string' || !text.trim()) return text;
  let out = text;
  for (const [en, vi] of phraseMap) {
    out = out.split(en).join(vi);
  }
  return out;
}

function walk(node) {
  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }
  if (!node || typeof node !== 'object') return;

  for (const key of Object.keys(node)) {
    const value = node[key];
    if (key.endsWith('Vi')) {
      const baseKey = key.slice(0, -2);
      const enVal = node[baseKey];
      const viVal = value;
      if (typeof enVal === 'string' && typeof viVal === 'string' && enVal.trim() === viVal.trim()) {
        const translated = translateIfKnown(enVal);
        if (translated && translated !== viVal) {
          node[key] = translated;
          translatedCount += 1;
        } else {
          const phraseTranslated = translateByPhrases(enVal);
          if (phraseTranslated !== viVal) {
            node[key] = phraseTranslated;
            translatedCount += 1;
          }
        }
      }
      if ((viVal == null || viVal === '') && typeof enVal === 'string' && enVal.trim()) {
        const translated = translateIfKnown(enVal);
        if (translated) {
          node[key] = translated;
          translatedCount += 1;
        } else {
          const phraseTranslated = translateByPhrases(enVal);
          node[key] = phraseTranslated;
          if (phraseTranslated !== enVal) translatedCount += 1;
        }
      }
    }

    if (value && typeof value === 'object') walk(value);
  }
}

walk(data);
fs.writeFileSync(snapshotPath, JSON.stringify(data, null, 2));
console.log(`Updated snapshot VI fields. Applied translations: ${translatedCount}`);
