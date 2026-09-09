// Pack 96 site: password-based encryption for the members page data.
// PBKDF2-SHA256 (250k iterations) -> AES-256-GCM. Uses the browser's built-in Web Crypto; no libraries.
// The same code encrypts (tools/encrypt.html) and decrypts (members.html).
window.P96Crypto = (function () {
  "use strict";
  var enc = new TextEncoder(), dec = new TextDecoder();
  function b64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
  function unb64(s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); }

  function deriveKey(password, salt) {
    return crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]).then(function (base) {
      return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: salt, iterations: 250000, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    });
  }

  return {
    // Returns a JSON string: {"v":1,"salt":...,"iv":...,"ct":...}
    encrypt: function (password, plaintext) {
      var salt = crypto.getRandomValues(new Uint8Array(16));
      var iv = crypto.getRandomValues(new Uint8Array(12));
      return deriveKey(password, salt).then(function (key) {
        return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(plaintext));
      }).then(function (ct) {
        return JSON.stringify({ v: 1, salt: b64(salt), iv: b64(iv), ct: b64(ct) });
      });
    },
    // Rejects if the password is wrong or the blob is damaged.
    decrypt: function (password, blob) {
      var o = JSON.parse(blob);
      return deriveKey(password, unb64(o.salt)).then(function (key) {
        return crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(o.iv) }, key, unb64(o.ct));
      }).then(function (pt) { return dec.decode(pt); });
    }
  };
})();
