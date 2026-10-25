# CatchIt

CatchIt is a desktop video downloader for Linux and Windows, with an Android app available as an APK. Choose the available video quality, audio language, and subtitles before downloading. Files are prepared on your device.

[Website](https://mo7amed-fawzy.github.io/CatchIt/) · [Releases](https://github.com/Mo7amed-fawzy/CatchIt/releases)

## Download and install

| Platform | Download | Install |
| --- | --- | --- |
| Linux x86_64 | `universal-downloader-linux-x64.tar.gz` from the [latest release](https://github.com/Mo7amed-fawzy/CatchIt/releases/latest) | Extract the archive, keep the folder intact, and run `universal_downloader` from inside it. |
| Windows 10/11 x64 | `universal-downloader-windows-x64.zip` from the [latest release](https://github.com/Mo7amed-fawzy/CatchIt/releases/latest) | Extract the ZIP, keep the folder intact, and run `universal_downloader.exe` from inside it. |
| Android 10+ | `catchit-android-universal.apk` from a [release that includes the APK](https://github.com/Mo7amed-fawzy/CatchIt/releases) | Open the downloaded APK on your device to install it. |

The desktop archives include the download and media tools needed for normal use. Linux requires GTK 3; the Linux build was tested on Ubuntu 24.04.

## Features

- Select from the video qualities and audio languages available for a link.
- Save available subtitles as a separate file.
- Download audio only as MP3, M4A, or FLAC.
- Track progress, cancel a download, and retry it.
- Merge video and audio locally without re-encoding when the selected streams allow it.

## Free and Pro

Free lets you download one video at a time without creating an account. CatchIt Pro adds multiple downloads and can start downloads automatically after link information is fetched. Pro is activated for one year with a code tied to your installation. To request a code, contact the person or team that supplied CatchIt and share the Installation ID shown in Settings.

## Updates and privacy

The desktop app checks for newer releases and verifies downloaded updates against their Ed25519 signature, exact size, and SHA-256 digest before installation. It keeps the previous version as a backup during an update.

CatchIt processes download links and media files on your device. The activation service does not receive your download history, links, or file names.

Use CatchIt only for content you own or have permission to download. Follow the relevant platform terms and local laws.
