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
    "revision": "36ba42ccc5e6db6f36e85f9e675deec2"
  },
  {
    "url": "design/img/logo.svg",
    "revision": "ab4fd26120e91dcd95fba70aca05ec07"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
