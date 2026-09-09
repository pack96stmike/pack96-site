// Pack 96 site: members page. Fetches private.enc, decrypts it with the pack password, renders the private content.
(function () {
  "use strict";
  var REMEMBER_KEY = "pack96.pw";
  var gate = document.getElementById("gate"), content = document.getElementById("content");
  var pwInput = document.getElementById("pw"), err = document.getElementById("err"), remember = document.getElementById("remember");
  var blobPromise = fetch("private.enc", { cache: "no-store" }).then(function (r) {
    if (!r.ok) throw new Error("private.enc missing (HTTP " + r.status + ")");
    return r.text();
  });

  function tryPassword(pw, fromStorage) {
    err.textContent = "";
    return blobPromise.then(function (blob) { return P96Crypto.decrypt(pw, blob); }).then(function (json) {
      var data = JSON.parse(json);
      if (remember.checked) { try { localStorage.setItem(REMEMBER_KEY, pw); } catch (e) {} }
      render(data);
      gate.hidden = true; content.hidden = false;
      if (location.hash) { var t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }
    }).catch(function (e) {
      if (fromStorage) { try { localStorage.removeItem(REMEMBER_KEY); } catch (x) {} return; }
      err.textContent = /private\.enc/.test(e.message) ? "The members page isn't set up yet." : "That password didn't work. Check with your den leader.";
      console.warn(e);
    });
  }

  document.getElementById("gate-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var pw = pwInput.value.trim();
    if (pw) tryPassword(pw, false);
  });
  document.getElementById("logout").addEventListener("click", function (ev) {
    ev.preventDefault();
    try { localStorage.removeItem(REMEMBER_KEY); } catch (e) {}
    location.href = "index.html";
  });

  // Auto-login if remembered on this device
  var saved = null;
  try { saved = localStorage.getItem(REMEMBER_KEY); } catch (e) {}
  if (saved) { remember.checked = true; tryPassword(saved, true); }

  function render(d) {
    // Notes / callout
    var notes = document.getElementById("notes");
    if (d.notes) { notes.textContent = d.notes; notes.hidden = false; }

    // Calendar
    if (d.calendarId) {
      var id = d.calendarId, encId = encodeURIComponent(id);
      var frame = document.getElementById("cal");
      var base = "https://calendar.google.com/calendar/embed?src=" + encId + "&ctz=America%2FNew_York&showTitle=0&showPrint=0&showTz=0&showCalendars=0&bgcolor=%23ffffff&color=%23003366";
      var isNarrow = window.matchMedia("(max-width: 700px)").matches;
      function setMode(mode) {
        frame.src = base + "&mode=" + mode;
        document.querySelectorAll("[data-mode]").forEach(function (b) { b.classList.toggle("btn-navy", b.dataset.mode === mode); b.classList.toggle("btn-outline", b.dataset.mode !== mode); });
      }
      document.querySelectorAll("[data-mode]").forEach(function (b) { b.addEventListener("click", function () { setMode(b.dataset.mode); }); });
      setMode(isNarrow ? "AGENDA" : "MONTH");
      document.getElementById("cal-google").href = "https://calendar.google.com/calendar/u/0/r?cid=" + encId;
      document.getElementById("cal-ical").href = "https://calendar.google.com/calendar/ical/" + encId + "/public/basic.ics";
      document.getElementById("cal-ical-text").textContent = "https://calendar.google.com/calendar/ical/" + encId + "/public/basic.ics";
    } else {
      document.getElementById("calendar-body").innerHTML = '<p class="note">Calendar not set up yet.</p>';
    }

    // Photos
    var ph = document.getElementById("photos-link");
    if (d.photosUrl) ph.href = d.photosUrl; else ph.parentNode.innerHTML = '<p class="note">Photo album not set up yet.</p>';

    // Announcements (published Google Doc embed)
    if (d.announcementsEmbedUrl) {
      document.getElementById("ann").src = d.announcementsEmbedUrl;
      document.getElementById("ann-link").href = d.announcementsEmbedUrl.replace(/\?embedded=true.*$/, "");
    } else document.getElementById("announcements").hidden = true;

    // Contacts (published Google Sheet tab, CSV)
    var fallback = (window.PACK96 && window.PACK96.fallbackLeaders) || [];
    P96.loadPeople(d.contactsCsvUrl, fallback).then(function (people) {
      P96.renderLeaders(document.getElementById("pack-contacts"), people.filter(function (p) { return !p.den; }), true);
      P96.renderLeaders(document.getElementById("den-contacts"), people.filter(function (p) { return p.den; }), true);
      if (!d.contactsCsvUrl) document.getElementById("contacts-note").textContent = "Contact sheet not connected yet; showing names only.";
    });

    // Documents folder (a link-shared Google Drive folder; lists itself and updates on its own)
    if (d.documentsFolderId) {
      document.getElementById("docs-folder").src = "https://drive.google.com/embeddedfolderview?id=" + encodeURIComponent(d.documentsFolderId) + "#list";
      document.getElementById("docs-folder-link").href = "https://drive.google.com/drive/folders/" + encodeURIComponent(d.documentsFolderId);
    } else {
      document.getElementById("docs-folder-wrap").hidden = true;
      document.getElementById("docs-heading").hidden = true;
    }

    // Pinned links (external forms and pages that aren't files in the folder)
    var list = document.getElementById("docs");
    list.innerHTML = "";
    (d.documents || []).forEach(function (doc) {
      var a = document.createElement("a");
      a.href = doc.url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = P96.esc(doc.title) + (doc.note ? "<small>" + P96.esc(doc.note) + "</small>" : "");
      list.appendChild(a);
      if (doc.embedUrl) {
        var det = document.createElement("details"); det.className = "embed";
        det.innerHTML = "<summary>View here</summary>";
        var f = document.createElement("iframe"); f.className = "doc-frame"; f.loading = "lazy"; f.src = doc.embedUrl; f.title = doc.title;
        det.appendChild(f); list.appendChild(det);
      }
    });
    if (!(d.documents || []).length) { list.hidden = true; document.getElementById("docs-heading").hidden = true; }
  }
})();
