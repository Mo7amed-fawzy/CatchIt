const repository = 'Mo7amed-fawzy/CatchIt';
const archiveName = 'universal-downloader-linux-x64.tar.gz';
const androidArchiveName = 'catchit-android-universal.apk';
const windowsArchiveName = 'universal-downloader-windows-x64.zip';
const windowsManifestName = 'catchit-update-windows-x64.json';
const releasesUrl = `https://github.com/${repository}/releases`;
const windowsDownloadLinks = [
  document.getElementById('windows-hero-download'),
  document.getElementById('windows-download'),
];
const androidDownloadLinks = [
  document.getElementById('android-hero-download'),
  document.getElementById('android-download'),
];
const downloadLinks = [
  document.getElementById('header-download'),
  document.getElementById('download-button'),
  document.getElementById('install-download'),
];
const status = document.getElementById('release-status');

function archiveFor(release) {
  if (release.draft) return null;
  const archive = release.assets?.find((asset) => asset.name === archiveName);
  if (typeof archive?.browser_download_url !== 'string' ||
      !archive.browser_download_url.startsWith(`${releasesUrl}/download/`)) return null;
  return archive;
}

async function loadLatestRelease() {
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    const productionResponse = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, { headers });
    let release;
    if (productionResponse.ok) {
      const production = await productionResponse.json();
      if (!production.prerelease && archiveFor(production)) release = production;
    }
    if (!release) {
      const previewResponse = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=20`, { headers });
      if (!previewResponse.ok) throw new Error('Releases unavailable');
      const releases = await previewResponse.json();
      release = releases.find((item) => !item.prerelease && archiveFor(item)) ??
        releases.find((item) => item.prerelease && archiveFor(item));
    }
    if (!release) throw new Error('No downloadable archive');
    const archive = archiveFor(release);
    for (const link of downloadLinks) link.href = archive.browser_download_url;
    const channel = release.prerelease ? 'نسخة تجريبية' : 'آخر إصدار رسمي';
    status.textContent = `${channel}: ${release.tag_name} · Linux x86_64`;
    if (release.prerelease) document.getElementById('header-download').title = 'نزّل النسخة التجريبية';
  } catch {
    status.textContent = 'لينك التحميل مش متاح دلوقتي. جرّب تحدّث الصفحة كمان شوية.';
  }
}

loadLatestRelease();

async function loadWindowsRelease() {
  const windowsStatus = document.getElementById('windows-release-status');
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=20`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error('Releases unavailable');
    const releases = await response.json();
    const release = releases.find((item) =>
      !item.draft && !item.prerelease &&
      item.assets?.some((asset) =>
        asset.name === windowsManifestName &&
        asset.browser_download_url?.startsWith(`${releasesUrl}/download/`)) &&
      item.assets?.some((asset) =>
        asset.name === windowsArchiveName &&
        asset.browser_download_url?.startsWith(`${releasesUrl}/download/`)));
    if (!release) throw new Error('Windows release unavailable');
    const archive = release.assets.find((asset) => asset.name === windowsArchiveName);
    for (const link of windowsDownloadLinks) link.href = archive.browser_download_url;
    windowsStatus.textContent = `آخر إصدار رسمي: ${release.tag_name} · Windows x64`;
  } catch {
    windowsStatus.textContent = 'تحميل Windows مش متاح دلوقتي. جرّب تاني بعد شوية.';
    for (const link of windowsDownloadLinks) link.removeAttribute('href');
  }
}

loadWindowsRelease();

async function loadAndroidRelease() {
  const androidStatus = document.getElementById('android-release-status');
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=20`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error('Releases unavailable');
    const releases = await response.json();
    const release = releases.find((item) =>
      !item.draft && item.assets?.some((asset) =>
        asset.name === androidArchiveName &&
        asset.browser_download_url?.startsWith(`${releasesUrl}/download/`)));
    if (!release) throw new Error('Android release unavailable');
    const asset = release.assets.find((item) => item.name === androidArchiveName);
    for (const link of androidDownloadLinks) link.href = asset.browser_download_url;
    androidStatus.textContent = `${release.prerelease ? 'نسخة تجريبية' : 'آخر إصدار رسمي'}: ${release.tag_name} · Android 10+`;
  } catch {
    androidStatus.textContent = 'تحميل Android مش متاح دلوقتي. جرّب تاني بعد شوية.';
    for (const link of androidDownloadLinks) link.removeAttribute('href');
  }
}

loadAndroidRelease();

const demoCard = document.querySelector('.demo-card');
const heroArt = document.querySelector('.hero-art');
const mobileCardMedia = window.matchMedia('(max-width: 620px)');
const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
let activePointerId = null;
let startX = 0;
let lastX = 0;
let restoreTimer;

function setDemoCardOffset(offset) {
  demoCard.style.setProperty('--drag-x', `${offset}px`);
}

function resetDemoCard() {
  activePointerId = null;
  demoCard.classList.remove('is-pressed', 'is-dragging');
  heroArt.classList.remove('is-card-focused');
  setDemoCardOffset(0);
}

demoCard.addEventListener('pointerdown', (event) => {
  if (!mobileCardMedia.matches || event.button !== 0 || activePointerId !== null) return;
  window.clearTimeout(restoreTimer);
  activePointerId = event.pointerId;
  startX = event.clientX;
  lastX = event.clientX;
  demoCard.classList.add('is-pressed', 'is-dragging');
  heroArt.classList.add('is-card-focused');
  demoCard.setPointerCapture(event.pointerId);
});

demoCard.addEventListener('pointermove', (event) => {
  if (event.pointerId !== activePointerId) return;
  lastX = event.clientX;
  setDemoCardOffset((lastX - startX) * 2.5);
});

demoCard.addEventListener('pointerup', (event) => {
  if (event.pointerId !== activePointerId) return;
  const distance = lastX - startX;
  activePointerId = null;
  demoCard.classList.remove('is-pressed', 'is-dragging');
  heroArt.classList.remove('is-card-focused');
  if (Math.abs(distance) < 55 || reducedMotionMedia.matches) {
    setDemoCardOffset(0);
    return;
  }
  setDemoCardOffset(Math.sign(distance) * (window.innerWidth + demoCard.offsetWidth));
  restoreTimer = window.setTimeout(() => setDemoCardOffset(0), 320);
});

demoCard.addEventListener('pointercancel', (event) => {
  if (event.pointerId === activePointerId) resetDemoCard();
});
