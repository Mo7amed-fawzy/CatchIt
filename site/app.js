const repository = 'Mo7amed-fawzy/CatchIt';
const archiveName = 'universal-downloader-linux-x64.tar.gz';
const releasesUrl = `https://github.com/${repository}/releases`;
const downloadLinks = [document.getElementById('download-button'), document.getElementById('install-download')];
const status = document.getElementById('release-status');

async function loadLatestRelease() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error('Release unavailable');
    const release = await response.json();
    const archive = release.assets?.find((asset) => asset.name === archiveName);
    if (!archive || release.draft || release.prerelease ||
        !archive.browser_download_url.startsWith(`${releasesUrl}/download/`)) {
      throw new Error('No production archive');
    }
    for (const link of downloadLinks) link.href = archive.browser_download_url;
    status.textContent = `أحدث إصدار إنتاج: ${release.tag_name} · Linux x86_64`;
  } catch {
    for (const link of downloadLinks) link.href = releasesUrl;
    status.textContent = 'تصفح الإصدارات المتاحة على GitHub.';
  }
}

loadLatestRelease();
