# Pack 96 website

Cub Scout Pack 96, St. Michael School, Sharonville. A plain static site: two HTML pages, one stylesheet, a folder of photos. No framework, no database, no build step, nothing to pay for.

- **Public page** `index.html`: who we are, what Scouts do, the dens, leadership, how to join.
- **Members page** `members.html`: pack calendar, photo album, leader contacts, documents. Gated by the pack password.

Hosted on GitHub Pages from this repository (`pack96stmike/pack96-site`, branch `main`) at **https://pack96.com** (domain registered at Cloudflare under the pack96webadmin account; the `CNAME` file in this repo tells GitHub the domain). Push to `main` and the site updates within a minute or two.

## Where things live

| What | Where | Who can edit |
|---|---|---|
| Site code, photos, `private.enc` | this GitHub repo | whoever has the pack96stmike GitHub login |
| Pack calendar | Google Calendar on `pack96webadmin@gmail.com` (public, "see all event details") | anyone the calendar is shared with as "make changes to events" |
| Leader names, roles, contacts | **Pack 96 Site Content** Google Sheet in the *Pack 96 Website* Drive folder | anyone the sheet is shared with |
| Handout, dues policy, other documents | the *Pack 96 Website* Drive folder | anyone the folder is shared with |
| Photo album | Google Photos shared album on `pack96webadmin@gmail.com` | album collaborators |
| `private.json` (plaintext of `private.enc`) | the *Pack 96 Website* Drive folder, **never in GitHub** | webadmin |
| Pack password, GitHub login, Google login | Google Password Manager in the pack96webadmin Chrome profile | webadmin |

The idea: **day-to-day changes happen in Google (calendar, sheet, docs, album) and the site picks them up on its own.** The repo only changes for copy edits, new photos, or a password change.

## Everyday tasks

**Add or change an event** → edit the Google Calendar. Done. Rule: no children's names, home addresses, or medical details in events. Venue names only. The calendar is public, like the school and choir calendars.

**Change a leader or den leader** → edit the *Leadership* tab (public: Name, Role, Den) and the *Contacts* tab (members only: Name, Role, Den, Email, Phone) of the Site Content sheet. The site refreshes within about five minutes. Put `Open` in the Name column for a vacant role and it shows as "Open position".

**Post photos** → add them to the shared Google Photos album.

**Post an announcement** → edit the *Announcements* Google Doc. It is embedded on the members page.

**Add a document** → drop it in the **Documents** subfolder of *Pack 96 Website* on Drive. It appears on the members page on its own. That subfolder is shared "Anyone with the link can view", so keep `private.json` and anything with family contact details *outside* it (the parent folder is fine).

**Add or change a link** (council, AHMR form, Scoutbook, anything that's a web page rather than a file) → edit the *Links* tab of the Site Content sheet. Columns: Title, URL, Note, Show. Show is `public` (homepage Helpful Links), `members` (members page "Other links"), or `both`. The site reads the Links tab live through the sheet's "Anyone with the link can view" sharing (the other two tabs use Publish to the web; either way works). Don't put genuinely private URLs there; the photo album stays in `private.json`.

**Edit site copy** → edit `index.html` in GitHub (pencil icon works fine for small changes) and commit.

**Change a photo** → drop the file in `photos/`, reference it in `index.html`. Keep files under about 500 KB.

## Changing the pack password (or any private link)

`private.enc` is an encrypted copy of `private.json`. The password is the only key. To change the password or anything inside:

1. Open `private.json` from the Drive folder and make your edits.
2. Open `tools/encrypt.html` from this folder in Chrome (double-click it; it runs locally, nothing is uploaded).
3. Paste the JSON, type the new password twice, click **Encrypt**, download `private.enc`.
4. Replace `private.enc` in the repo, commit, push.
5. Tell families the new password (den leaders, pack96sms email). Old password stops working immediately.

"Remember me" on the members page stores the password in that browser only.

**What the gate is and isn't.** One shared password, enforced by encryption, so nothing private is readable in the page source without it. It is a curtain, not user accounts: anyone given the password can pass it on, and there is no per-person revocation. That matches what the pack needs today. If real accounts are ever wanted, put Cloudflare Access (free for small groups) in front of `members.html`.

## One-time setup checklist

Done once by the webadmin; kept here so the next webadmin knows what exists.

- [ ] GitHub repo `pack96stmike/pack96-site`, public. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
- [ ] Google Calendar "Pack 96" on pack96webadmin: Settings → *Access permissions for events* → check **Make available to public**, "See all event details". Copy the **Calendar ID** from *Integrate calendar* into `private.json`. Share edit rights with the Cubmaster and committee chair.
- [ ] Drive folder *Pack 96 Website* on pack96webadmin, shared with the committee as editors. Inside it a **Documents** subfolder shared *Anyone with the link → Viewer*; its ID (the long string at the end of the folder URL) goes in `private.json` as `documentsFolderId`.
- [ ] Sheet *Pack 96 Site Content* with tabs `Leadership`, `Contacts`, and `Links`. File → Share → **Publish to the web** → pick the tab → *Comma-separated values (.csv)* → Publish. Leadership and Links CSV links go in `config.js`; the Contacts CSV link goes in `private.json`.
- [ ] Doc *Announcements*: File → Share → Publish to the web → Embed → copy the `src` URL into `private.json` as `announcementsEmbedUrl`.
- [ ] Google Photos shared album "Pack 96", link-sharing on, collaboration on. Link into `private.json`.
- [ ] Encrypt `private.json` → `private.enc`, commit.
- [ ] Old Firebase project `pack96-website`: delete Cloud Functions and Firestore, confirm the plan is Spark (free). Optionally deploy a one-line redirect page so `pack96-website.web.app` forwards here.

## Files

```
index.html          public page
members.html        members page (public shell; content comes from private.enc)
private.enc         encrypted members data (safe to publish)
config.js           public settings: pack email, leadership sheet URL, fallback leader list
css/style.css
js/site.js          nav, den tabs, leadership rendering, CSV parsing
js/crypto.js        encrypt/decrypt (Web Crypto, no libraries)
js/members.js       members page logic
tools/encrypt.html  local tool to make private.enc
photos/             pack photos used on the public page
```
