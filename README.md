# CatchIt

**نزّل الفيديو الذي تريده بالجودة والصوت المناسبين لك — من مكان واحد.**

CatchIt تطبيق لتنزيل فيديوهات YouTube على Linux، مع نسخة تجريبية لنظام Android. يتيح اختيار جودة الفيديو، لغة الصوت، والترجمة المتاحة، ويدمج الفيديو والصوت محليًا.

[تنزيل أحدث إصدار](https://github.com/Mo7amed-fawzy/CatchIt/releases/latest)

[الموقع الرسمي لـCatchIt](https://mo7amed-fawzy.github.io/CatchIt/)

الموقع مبني بملفات HTML وCSS وJavaScript ثابتة. أيقونتا Linux وAndroid في أزرار التنزيل من [Simple Icons](https://simpleicons.org/).

## لماذا CatchIt؟

- تنزيل فيديو واحد مجانًا بدون إنشاء حساب.
- اختيار جودة الفيديو من الجودات المتاحة فعليًا.
- اختيار لغة الصوت، مثل العربية أو الإنجليزية، عند توفر أكثر من مسار.
- تنزيل الصوت فقط بصيغة MP3 أو M4A أو FLAC.
- حفظ ترجمة منفصلة بجانب الفيديو عند توفرها.
- دمج سريع محليًا بدون رفع روابطك أو ملفاتك إلى خادم خارجي.
- سجل للتنزيلات مع التقدم، الإلغاء، وإعادة المحاولة.
- أدوات التنزيل والدمج الأساسية مضمّنة داخل التطبيق.
- تحديثات موقّعة يمكن تنزيلها والتحقق منها من داخل CatchIt.

## Free وPro

تتيح النسخة المجانية تنزيل فيديو واحد في كل مرة بدون حساب.

يفتح CatchIt Pro:

- وضع التنزيل المتعدد.
- بدء التنزيلات تلقائيًا بعد جلب معلومات الفيديو.
- تفعيل لمدة سنة باستخدام رمز مخصص لجهازك.

لا يحتاج التفعيل إلى بريد إلكتروني أو كلمة مرور. للحصول على رمز Pro، تواصل مع الجهة التي وفّرت لك التطبيق وأرسل Installation ID الظاهر في Settings.

## التثبيت على Linux

1. افتح صفحة [Releases](https://github.com/Mo7amed-fawzy/CatchIt/releases/latest).
2. نزّل `universal-downloader-linux-x64.tar.gz` من أحدث إصدار.
3. فك ضغط الملف مع الاحتفاظ بالمجلد كاملًا.
4. شغّل `universal_downloader` من داخل المجلد.

يتطلب التطبيق Linux x86_64 بواجهة GTK 3. تم اختباره على Ubuntu 24.04. أدوات yt-dlp وFFmpeg وFFprobe وDeno مضمّنة، ولا يحتاج المستخدم إلى تثبيتها منفصلة.

## التثبيت على Android

نزّل `catchit-android-universal.apk` من [صفحة الموقع](https://mo7amed-fawzy.github.io/CatchIt/) وثبّته على جهاز يعمل بنظام Android 10 أو أحدث. الملف الواحد يضم ARM32 وARM64 وx86_64. هذه نسخة تجريبية؛ تحقق التنزيل الكامل على محاكي x86_64، وما زال اختبار ARM64 على هاتف فعلي مطلوبًا.

## تحديثات موثوقة

يعرض CatchIt إشعارًا عند توفر إصدار أحدث. يتم تنزيل التحديث من هذا المستودع مباشرة، ثم يتحقق التطبيق من توقيعه الرقمي وحجمه وبصمة SHA-256 قبل عرضه للتثبيت. يظل الإصدار السابق محفوظًا كنسخة احتياطية أثناء التحديث.

## الخصوصية

تتم معالجة روابط التنزيل وملفات الوسائط على جهازك. لا يرسل CatchIt سجل التنزيلات أو الروابط أو أسماء الملفات إلى خدمة التفعيل.

## English

CatchIt is a Linux desktop media downloader for YouTube with an Android preview. Choose the available video quality, preferred audio language, subtitles, or audio-only output. Single downloads are free without an account; CatchIt Pro unlocks multi-download mode and automatic downloads for one year.

[Download the latest release](https://github.com/Mo7amed-fawzy/CatchIt/releases/latest)

CatchIt processes downloads locally and verifies every in-app update using an Ed25519 signature, exact file size, and SHA-256 digest before installation.

---

CatchIt is intended for downloading content you own or are authorized to download. You are responsible for following the applicable platform terms and local laws.
