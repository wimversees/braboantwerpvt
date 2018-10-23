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
    "url": "design/css/main.css",
    "revision": "73edb87643fb3ee219c1b4000a62d3fa"
  },
  {
    "url": "design/img/logo.svg",
    "revision": "ab4fd26120e91dcd95fba70aca05ec07"
  },
  {
    "url": "design/js/applib.js",
    "revision": "05d6b42431853ca763aba7e9e94791de"
  },
  {
    "url": "design/js/lib.js",
    "revision": "369d526e31bc22e72282863775b4fb94"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
