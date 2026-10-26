/* Crea8Hub social media image sizes. Checked October 2026.
   o: 1 = from the platform's own help pages, 0 = from 2026 roundups (Sprout Social, Hootsuite and others).
   ov: overlay in the resizer ("story" = top/bottom UI bands, "circle" = profile crop, "ytb" = YouTube banner safe area).
   kb: official file size limit in KB, used to warn after export. */
window.C8_SIZES_ASOF = 'October 2026';
window.C8_PLATFORMS = [
  ['instagram','Instagram'],['facebook','Facebook'],['tiktok','TikTok'],['x','X'],['linkedin','LinkedIn'],
  ['youtube','YouTube'],['whatsapp','WhatsApp'],['pinterest','Pinterest'],['google','Google']
];
window.C8_SIZES = [
  // Instagram
  {id:'ig-portrait',p:'instagram',n:'Instagram portrait post',w:1080,h:1350,r:'4:5',o:1,pop:1,def:1,
   t:'The best all-round feed size. It fills more of the screen than a square. The profile grid shows a 3:4 crop, so keep key content about 35 px in from the left and right edges.'},
  {id:'ig-34',p:'instagram',n:'Instagram 3:4 post',w:1080,h:1440,r:'3:4',o:1,
   t:'Supported since mid-2025. It matches most phone cameras and the profile grid, so nothing is cut off in the grid. Instagram may show it slightly smaller than 4:5 on some screens.'},
  {id:'ig-square',p:'instagram',n:'Instagram square post',w:1080,h:1080,r:'1:1',o:1,pop:1,def:1,
   t:'Safe for any feed, ad or carousel. Shows smaller than 4:5 in the feed and is cropped at the sides in the grid.'},
  {id:'ig-landscape',p:'instagram',n:'Instagram landscape post',w:1080,h:566,r:'1.91:1',o:1,
   t:'The widest shape Instagram allows. It takes the least space in the feed, so use it only when the picture must be wide.'},
  {id:'ig-story',p:'instagram',n:'Instagram Story / Reel',w:1080,h:1920,r:'9:16',o:1,pop:1,def:1,ov:'story',
   t:'Keep text and logos out of the top 14% (about 270 px) and bottom 20% (about 380 px). Reels captions and buttons cover even more of the bottom. Reel covers show as a 3:4 crop in the grid.'},
  {id:'ig-carousel',p:'instagram',n:'Instagram carousel slide',w:1080,h:1350,r:'4:5',o:0,
   t:'Up to 20 slides. Every slide takes the shape of the first one, so export them all at the same size.'},
  {id:'ig-profile',p:'instagram',n:'Instagram profile photo',w:320,h:320,r:'1:1',o:1,ov:'circle',
   t:'Shown as a small circle. Upload at least 320 x 320 and keep your logo in the middle.'},

  // Facebook
  {id:'fb-portrait',p:'facebook',n:'Facebook portrait post',w:1080,h:1350,r:'4:5',o:1,
   t:'Best for the mobile feed. For ads, Meta recommends 1440 x 1800 if your image is big enough. JPG or PNG, up to 30 MB.'},
  {id:'fb-square',p:'facebook',n:'Facebook square post',w:1080,h:1080,r:'1:1',o:1,
   t:'Works in the feed, Marketplace and most ad placements. Meta suggests 1440 x 1440 for ads.'},
  {id:'fb-link',p:'facebook',n:'Facebook link image',w:1200,h:630,r:'1.91:1',o:1,
   t:'The picture that shows when someone shares your website link (your Open Graph image). Also the shape for landscape ads.'},
  {id:'fb-story',p:'facebook',n:'Facebook Story / Reel',w:1080,h:1920,r:'9:16',o:1,ov:'story',
   t:'Keep the top 14% and bottom 20% free of text. For Reels ads, Meta asks for the bottom 35% to be kept clear.'},
  {id:'fb-cover',p:'facebook',n:'Facebook Page cover',w:851,h:315,r:'2.7:1',o:1,
   t:'Desktop shows about 820 x 312 and phones show 640 x 360, cutting the sides. Keep text in the middle. An sRGB JPG under 100 KB loads fastest; use PNG for logos and text.'},
  {id:'fb-profile',p:'facebook',n:'Facebook profile photo',w:720,h:720,r:'1:1',o:0,ov:'circle',
   t:'Shown as a circle. Guides list 320 x 320 as the minimum; we suggest 720 x 720 so it stays sharp on modern phones.'},
  {id:'fb-event',p:'facebook',n:'Facebook event cover',w:1920,h:1005,r:'1.91:1',o:0,
   t:'Phones trim the sides more than the top and bottom, so keep the event name in the centre.'},

  // TikTok
  {id:'tt-video',p:'tiktok',n:'TikTok video / photo post',w:1080,h:1920,r:'9:16',o:1,pop:1,ov:'story',
   t:'Full-screen vertical. Keep text out of the bottom fifth (caption) and the right edge (like and share buttons). Ad videos need at least 540 x 960.'},
  {id:'tt-profile',p:'tiktok',n:'TikTok profile photo',w:200,h:200,r:'1:1',o:0,ov:'circle',
   t:'Shown as a small circle. The minimum is 20 x 20, but upload at least 200 x 200.'},

  // X
  {id:'x-landscape',p:'x',n:'X post image (landscape)',w:1600,h:900,r:'16:9',o:1,
   t:'Shows in full in the timeline on phone and desktop. For ads, X takes JPG or PNG up to 5 MB.'},
  {id:'x-square',p:'x',n:'X post image (square)',w:1080,h:1080,r:'1:1',o:1,
   t:'Also shows in full. For ads, X recommends 800 x 800 as a minimum for 1:1.'},
  {id:'x-header',p:'x',n:'X header photo',w:1500,h:500,r:'3:1',o:1,
   t:'Phones crop the top and bottom, and your profile photo covers the bottom left. Keep the middle band clear for key details.'},
  {id:'x-profile',p:'x',n:'X profile photo',w:400,h:400,r:'1:1',o:1,ov:'circle',kb:2048,
   t:'Shown as a circle. JPG, PNG or GIF, up to 2 MB.'},

  // LinkedIn
  {id:'li-landscape',p:'linkedin',n:'LinkedIn landscape post',w:1200,h:627,r:'1.91:1',o:1,pop:1,def:1,
   t:'Also the size for link previews. Works for Facebook link images too, since the shape is almost identical.'},
  {id:'li-square',p:'linkedin',n:'LinkedIn square post',w:1080,h:1080,r:'1:1',o:0,
   t:'Takes more feed space than landscape on phones.'},
  {id:'li-portrait',p:'linkedin',n:'LinkedIn portrait post',w:1080,h:1350,r:'4:5',o:0,
   t:'Takes the most space in the mobile feed, which is where most LinkedIn scrolling happens.'},
  {id:'li-banner',p:'linkedin',n:'LinkedIn personal banner',w:1584,h:396,r:'4:1',o:1,kb:8192,
   t:'Your profile background. JPG or PNG, up to 8 MB. Your photo covers the bottom left on desktop and the middle on phones, so keep text to the right.'},
  {id:'li-cover',p:'linkedin',n:'LinkedIn company Page cover',w:4200,h:700,r:'6:1',o:1,kb:3072,
   t:'LinkedIn\'s Page image specs list 4200 x 700, PNG or JPG, up to 3 MB. Older guides say 1128 x 191, which is the same shape. Keep details away from the lower left (logo) and lower right.'},
  {id:'li-profile',p:'linkedin',n:'LinkedIn profile photo',w:400,h:400,r:'1:1',o:0,ov:'circle',kb:8192,
   t:'Shown as a circle. Up to 8 MB.'},
  {id:'li-logo',p:'linkedin',n:'LinkedIn company logo',w:400,h:400,r:'1:1',o:1,kb:3072,
   t:'Shown as a square with rounded corners. PNG or JPG, up to 3 MB.'},
  {id:'li-article',p:'linkedin',n:'LinkedIn article / newsletter cover',w:1920,h:1080,r:'16:9',o:1,
   t:'Use the same image on your blog and share it with the article.'},

  // YouTube
  {id:'yt-thumb',p:'youtube',n:'YouTube thumbnail',w:1280,h:720,r:'16:9',o:1,pop:1,def:1,kb:2048,
   t:'YouTube now recommends up to 3840 x 2160, with at least 640 px width. 1280 x 720 stays sharp and easily under the 2 MB mobile upload limit (50 MB on desktop). JPG or PNG.'},
  {id:'yt-banner',p:'youtube',n:'YouTube channel banner',w:2560,h:1440,r:'16:9',o:1,ov:'ytb',kb:6144,
   t:'Minimum 2048 x 1152, up to 6 MB. Only the centre strip shows on every device: 1235 x 338 at minimum size, about 1546 x 423 at full size. Put your name and logo there.'},
  {id:'yt-shorts',p:'youtube',n:'YouTube Shorts',w:1080,h:1920,r:'9:16',o:1,ov:'story',
   t:'Vertical video and Shorts thumbnails. Keep text clear of the bottom, where the title and buttons sit.'},
  {id:'yt-profile',p:'youtube',n:'YouTube profile picture',w:800,h:800,r:'1:1',o:1,ov:'circle',
   t:'Shows as a 98 x 98 circle. JPG, PNG, BMP or still GIF, up to 15 MB.'},

  // WhatsApp
  {id:'wa-status',p:'whatsapp',n:'WhatsApp Status',w:1080,h:1920,r:'9:16',o:0,pop:1,ov:'story',
   t:'Full-screen vertical, like a Story. Keep text away from the top (your name) and bottom (reply bar).'},
  {id:'wa-profile',p:'whatsapp',n:'WhatsApp profile / Business logo',w:640,h:640,r:'1:1',o:0,ov:'circle',
   t:'Shown as a circle. WhatsApp does not publish a size; guides suggest at least 500 x 500. Keep the logo well inside the circle.'},
  {id:'wa-catalogue',p:'whatsapp',n:'WhatsApp Business catalogue item',w:1080,h:1080,r:'1:1',o:0,
   t:'No official size is published. Square works best. Centre the product on a plain background and keep files under 5 MB.'},

  // Pinterest
  {id:'pin',p:'pinterest',n:'Pinterest pin',w:1000,h:1500,r:'2:3',o:1,pop:1,kb:20480,
   t:'PNG or JPG, up to 20 MB on desktop or 32 MB in the app. Pins wider than 2:3 may be cropped in the feed.'},
  {id:'pin-square',p:'pinterest',n:'Pinterest square pin',w:1000,h:1000,r:'1:1',o:0,
   t:'Fine for products and carousels, but 2:3 gets more space in the feed.'},
  {id:'pin-profile',p:'pinterest',n:'Pinterest profile photo',w:280,h:280,r:'1:1',o:0,ov:'circle',
   t:'Shown as a circle.'},

  // Google
  {id:'rda-landscape',p:'google',n:'Responsive display: landscape',w:1200,h:628,r:'1.91:1',o:1,pop:1,
   t:'Google Ads. Required for responsive display ads. Minimum 600 x 314. Google calls 1200 x 628 and 1200 x 1200 the most useful sizes across its network.'},
  {id:'rda-square',p:'google',n:'Responsive display: square',w:1200,h:1200,r:'1:1',o:1,pop:1,
   t:'Google Ads. Required. The display spec page asks for at least 300 x 300 (600 x 600 recommended); 1200 x 1200 is the size Google suggests for wider use.'},
  {id:'rda-logo',p:'google',n:'Responsive display: wide logo',w:1200,h:300,r:'4:1',o:1,
   t:'Google Ads. Optional landscape logo. Minimum 512 x 128. Use a transparent PNG or a plain background.'},
  {id:'gd-300x250',p:'google',n:'Display ad: medium rectangle',w:300,h:250,r:'6:5',o:1,kb:150,
   t:'Uploaded image ad. The most widely available display size. JPG, PNG or GIF, max 150 KB.'},
  {id:'gd-728x90',p:'google',n:'Display ad: leaderboard',w:728,h:90,r:'8.1:1',o:1,kb:150,
   t:'Uploaded image ad, shown across the top of web pages. Max 150 KB.'},
  {id:'gd-320x50',p:'google',n:'Display ad: mobile banner',w:320,h:50,r:'6.4:1',o:1,kb:150,
   t:'Uploaded image ad for phones. Keep it to a logo and a few words. Max 150 KB.'},
  {id:'gd-300x600',p:'google',n:'Display ad: half page',w:300,h:600,r:'1:2',o:1,kb:150,
   t:'Uploaded image ad. Big and visible on desktop. Max 150 KB.'},
  {id:'gd-336x280',p:'google',n:'Display ad: large rectangle',w:336,h:280,r:'6:5',o:1,kb:150,
   t:'Uploaded image ad. Max 150 KB.'},
  {id:'gd-160x600',p:'google',n:'Display ad: wide skyscraper',w:160,h:600,r:'4:15',o:1,kb:150,
   t:'Uploaded image ad for page sidebars. Max 150 KB.'},
  {id:'gd-970x250',p:'google',n:'Display ad: billboard',w:970,h:250,r:'3.9:1',o:1,kb:150,
   t:'Uploaded image ad at the top of desktop pages. Max 150 KB.'},
  {id:'gbp-photo',p:'google',n:'Google Business Profile photo',w:720,h:720,r:'1:1',o:1,kb:5120,
   t:'For your listing on Search and Maps. JPG or PNG, 10 KB to 5 MB, at least 250 x 250. Use real, well-lit photos without heavy filters.'},
  {id:'gbp-cover',p:'google',n:'Google Business Profile cover',w:1024,h:576,r:'16:9',o:0,kb:5120,
   t:'Google does not publish a separate cover size; the photo rules apply. A 16:9 image of 1024 x 576 or bigger crops well. Google may show a customer photo instead.'}
];
window.C8_SOURCES = [
  ['Instagram Help: photo resolution','https://help.instagram.com/1631821640426723'],
  ['exchange4media: Instagram adds 3:4 photos (May 2025)','https://www.exchange4media.com/digital-news/instagram-introduces-34-aspect-ratio-for-photo-uploads-143973.html'],
  ['Meta Ads Guide: image ad specs','https://www.facebook.com/business/ads-guide/update/image'],
  ['YouTube Help: add video thumbnails','https://support.google.com/youtube/answer/72431'],
  ['YouTube Help: manage your channel branding','https://support.google.com/youtube/answer/10456525'],
  ['X Help: uploading a profile photo','https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo'],
  ['X Business: creative ad specifications','https://help.x.com/en/business-and-advertising/creative-ad-specifications'],
  ['LinkedIn Help: Page image specifications','https://www.linkedin.com/help/linkedin/answer/a563309'],
  ['LinkedIn Help: profile background photo','https://www.linkedin.com/help/linkedin/answer/a568217'],
  ['Pinterest Help: product specs','https://help.pinterest.com/en/business/article/pinterest-product-specs'],
  ['Google Ads Help: responsive display ad specs','https://support.google.com/google-ads/answer/17090561'],
  ['Google Ads Help: uploaded display ad specs','https://support.google.com/google-ads/answer/1722096'],
  ['Google Ads Help: ad formats and sizes','https://support.google.com/google-ads/answer/13676244'],
  ['Google Business Profile Help: photos','https://support.google.com/business/answer/6103862'],
  ['Sprout Social: image sizes guide (Oct 2026)','https://sproutsocial.com/insights/social-media-image-sizes-guide/'],
  ['Hootsuite: image sizes guide (Oct 2026)','https://blog.hootsuite.com/social-media-image-sizes-guide/']
];
