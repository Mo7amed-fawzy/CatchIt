const repository = 'Mo7amed-fawzy/CatchIt';
const archiveName = 'universal-downloader-linux-x64.tar.gz';
const androidArchiveName = 'catchit-android-universal.apk';
const releasesUrl = `https://github.com/${repository}/releases`;
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
    const channel = release.prerelease ? 'نسخة تجريبية' : 'أحدث إصدار إنتاج';
    status.textContent = `${channel}: ${release.tag_name} · Linux x86_64`;
    if (release.prerelease) document.getElementById('header-download').title = 'تنزيل نسخة تجريبية';
  } catch {
    status.textContent = 'رابط التحميل غير متاح حاليًا. حاول تحديث الصفحة بعد قليل.';
  }
}

loadLatestRelease();

async function loadAndroidRelease() {
  const androidLink = document.getElementById('android-download');
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
    androidLink.href = asset.browser_download_url;
    androidStatus.textContent = `${release.prerelease ? 'نسخة تجريبية' : 'إصدار إنتاج'}: ${release.tag_name} · Android 10+`;
  } catch {
    androidStatus.textContent = 'تنزيل Android غير متاح حاليًا. حاول مرة أخرى لاحقًا.';
    androidLink.removeAttribute('href');
  }
}

loadAndroidRelease();
