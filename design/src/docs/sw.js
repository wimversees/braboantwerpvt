importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "agenda.html",
    "revision": "5963ffcdee5c60ef77619ba9a3a4b5af"
  },
  {
    "url": "contact.html",
    "revision": "dec30bffccddbd57393577eadbf5304c"
  },
  {
    "url": "design/css/main.css",
    "revision": "518216b1734eb253cbd6348fc9339928"
  },
  {
    "url": "design/css/tomnamurois-main.css",
    "revision": "71e79f7af66eb8937460b62d47c20142"
  },
  {
    "url": "design/fonts/fontawesome/fontawesome-webfont.svg",
    "revision": "acf3dcb7ff752b5296ca23ba2c7c2606"
  },
  {
    "url": "design/fonts/futura/book/FuturaBT-Book.svg",
    "revision": "93de27059ec772732384dbe7b15c3d9c"
  },
  {
    "url": "design/img/etf-logo.svg",
    "revision": "69f1fe5e111e8cd220a35945932e619c"
  },
  {
    "url": "design/img/european-transport-workers-federation-fair-transport-badge-full.svg",
    "revision": "26806f7c8470a4c5fb6e33a32e6898c6"
  },
  {
    "url": "design/img/european-transport-workers-federation-fair-transport.svg",
    "revision": "adc354afd4e584b647e7a5a81b5ce3b2"
  },
  {
    "url": "design/img/intro-block-bg.jpg",
    "revision": "9e4f48867851dab45722669e768ff5d3"
  },
  {
    "url": "design/js/applib.js",
    "revision": "1acd3cca6781157abaf8f904bba44e50"
  },
  {
    "url": "design/js/lib.js",
    "revision": "f25622a12c4551632f73200a9de635db"
  },
  {
    "url": "index.html",
    "revision": "337cbc4911114c8ddc55f9022108b529"
  },
  {
    "url": "info.html",
    "revision": "af35f24d349ccc6d53a774ad48187ace"
  },
  {
    "url": "location.html",
    "revision": "ec78b19483ca1879ac229dd9befad651"
  },
  {
    "url": "news.html",
    "revision": "1dbd4c6b084cb556012988aa92cf1312"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
