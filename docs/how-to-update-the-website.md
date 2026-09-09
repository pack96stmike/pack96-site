# How to Update the Pack 96 Website

**pack96.com** · A guide for pack leaders and the next website admin

Last updated September 9, 2026.

---

## 1. The big picture

The pack website has two pages:

- **The public page** at **pack96.com**. Who we are, what Scouts do, the dens, leadership, how to join. Anyone can see it.
- **The members page** at **pack96.com/members.html**. The pack calendar, photo album, leader contact information, announcements, and documents. It asks for the **pack password** first.

**The most important thing to know:** almost nothing on the site is edited on the site. The website reads its content from Google. When you change the Google Calendar, a Google Sheet, a Google Doc, or a Drive folder, the website updates itself within a few minutes. You never need to touch code for day-to-day changes.

| To change… | Edit this in Google… |
|---|---|
| Events, dates, meeting times | the **Pack 96** Google Calendar |
| An announcement for families | the **Pack 96 Announcements** Google Doc |
| Documents and forms | the **Documents** folder in Google Drive |
| Photos from events | the **Pack 96** Google Photos album |
| Who the leaders and den leaders are | the **Pack 96 Site Content** Google Sheet, *Leadership* and *Contacts* tabs |
| Links (council, forms, Scoutbook) | the same sheet, *Links* tab |

Everything above lives in the **pack96webadmin@gmail.com** Google account, inside a Drive folder called **Pack 96 Website**. Leaders who need to edit are shared on that folder, the calendar, and the album. You do not need the pack96webadmin login to edit; you need to be shared.

The few things that *do* require touching the website itself are in Section 4: changing the pack password, editing the words on the public page, and swapping the public photos.

---

## 2. Rules that keep families safe

1. **The calendar is public.** It works exactly like the school and choir calendars. Put the event, time, and venue name. **Never put a child's name, a home address, or medical information in a calendar event.** "Den meeting, St. Michael cafeteria" is right. "Den meeting at the Smiths' house, 123 Maple St" is not.
2. **Contact information stays on the members page.** Phone numbers and emails belong only in the *Contacts* tab of the sheet. Do not put them in the calendar, the announcements doc, the Links tab, or the Documents folder.
3. **The Documents folder is viewable by anyone with its link.** Handouts, forms, and packing lists are fine. Anything with family contact details, rosters, or medical forms is not. Those belong in the pack's regular (private) Drive, not the website folder.
4. **The pack password is shared with every pack family.** Treat it as "families only," not as secret. Change it every fall and any time it seems to have spread (Section 4.1).
5. **Photos:** follow the pack's photo policy. If a family has asked not to have their child pictured, honor it.

---

## 3. Everyday updates (no technical skill needed)

### 3.1 Add, change, or cancel an event

1. Go to **calendar.google.com** while signed into a Google account that has been shared on the Pack 96 calendar (ask the webadmin if you aren't).
2. On the left, under "Other calendars" or "My calendars," make sure **Pack 96** is checked.
3. Click the day → fill in the title, time, and location → make sure the calendar dropdown says **Pack 96**, not your personal calendar → Save.
4. To change or cancel, click the event → pencil to edit, or trash can to delete.

The website shows the change within a few minutes. Families who added the pack calendar to their phones see it there too.

**Tips:** Use the location field for the venue (e.g., "Camp Craig / Cub World"). Put details like "bring a camp chair" in the description. For a multi-day campout, make it an all-day event spanning the dates.

**How families subscribe:** on the members page, under the calendar, there is an **Add to Google Calendar** button and, for iPhone/Outlook users, a subscription address with instructions.

### 3.2 Post an announcement

1. Open the Drive folder **Pack 96 Website** → open the Google Doc **Pack 96 Announcements**.
2. Put the newest announcement at the **top**. Start with the date in bold, then the message. Keep it short; link to a document in the Documents folder for anything long.
3. Close the doc. It's saved automatically and appears on the members page within about five minutes.

Delete old announcements once they're stale so the page stays short. Family contact info doesn't belong here.

### 3.3 Add a document or form

1. Open the Drive folder **Pack 96 Website** → **Documents**.
2. Drag the file in, or click **New → File upload**. PDFs and Google Docs both work. Give it a clear name; the file name is what families see (e.g., "Fall Campout Packing List 2026").
3. Done. It appears in the Documents list on the members page. To remove a document, delete it from the folder.

Do not put anything with family contact details, rosters, or medical forms here (see Section 2).

### 3.4 Add photos

1. Open **photos.google.com** → **Sharing** → the **Pack 96** album (you'll have received the link; ask the webadmin if not).
2. Click **Add photos** and choose from your device.
3. That's it. Families open the album from the members page.

Photos on the *public* page are a separate, hand-picked set (Section 4.3).

### 3.5 Change a leader, den leader, or contact

The **Pack 96 Site Content** Google Sheet in the *Pack 96 Website* folder has three tabs at the bottom. Edit cells like any spreadsheet.

**Leadership tab** (public — shown on the homepage). Columns: **Name · Role · Den**.

- Pack roles (Cubmaster, Committee Chair, Treasurer, …): leave **Den** blank.
- Den leaders: Role = `Den Leader`, Den = exactly one of **Lions, Tigers, Wolves, Bears, Webelos**. Spelling matters.
- A vacant role: put `Open` in the Name cell. The site shows "Open position."
- Rows show in the order they appear. Insert or move rows to reorder.

**Contacts tab** (members only). Same columns plus **Email · Phone**. Keep the names and roles matching the Leadership tab. This is the only place phone numbers and emails should ever appear.

**Do not** rename the tabs, rename the header row, or add columns to the left. The site finds data by the header names.

Changes show within about five minutes. If they don't, see Section 5.

### 3.6 Add or change a link

Same sheet, **Links** tab. Columns: **Title · URL · Note · Show**.

- **Show** = `public` puts it under "Helpful Links" on the homepage. `members` puts it under "Other links" on the members page. `both` does both.
- Paste the full address starting with `https://`.
- To remove a link, delete its row.

This is for web pages (council site, AHMR form page, Scoutbook). For actual files, use the Documents folder instead.

---

## 4. Admin tasks (once a year or when needed)

These need the **pack96stmike** GitHub login. GitHub is the free service that hosts the site. You do not need to install anything; everything below is done in a web browser.

### 4.1 Change the pack password

Do this every fall before the new-family email, and whenever the password seems to have spread beyond pack families. It takes about five minutes.

**What you need:** the file `private.json` from the *Pack 96 Website* Drive folder (the parent folder, not Documents). It holds the private links the members page uses. It is never put on the website in readable form.

1. In Chrome, go to **https://pack96.com/tools/encrypt.html**. This page runs entirely on your computer; nothing is uploaded.
2. Open `private.json` from Drive (right-click → Open with → Text Editor, or Google Docs) and copy all of its text.
3. On the encrypt page, click in the big text box, select all (Ctrl+A), and paste.
4. Type the new password in **Pack password** and again in **Repeat password**. Six or more characters.
5. Click **Encrypt**. A green "Encrypted" message appears. Click **Download private.enc**. It saves to your Downloads folder. If Chrome asks whether to keep the file, choose Keep.
6. Go to **github.com**, sign in as **pack96stmike**, open the repository **pack96-site**.
7. Click **Add file → Upload files**. Drag `private.enc` from Downloads onto the page. Under "Commit changes," leave the message as is and click **Commit changes**. It replaces the old file.
8. Wait one to two minutes. Open **pack96.com/members.html** and try the new password. The old one no longer works.
9. Save the new password in the pack's password manager (Google Password Manager in the pack96webadmin Chrome profile) and tell den leaders. Families who ticked "Remember me" will be asked for the new password next time.

**Changing what's in `private.json`** (for example, a new calendar or a new photo album) is the same procedure: edit the text in step 3 before encrypting, and save the edited `private.json` back to Drive so the next person has it.

### 4.2 Edit the words on the public page

Small text changes (a sentence in Who We Are, a date in How to Join) can be made in the browser.

1. On github.com as pack96stmike, open **pack96-site** → click **index.html**.
2. Click the **pencil icon** (top right of the file) to edit.
3. Use Ctrl+F to find the text you want to change. Change only the words **between** the angle-bracket tags, like `<p>this text</p>`. Don't touch the tags themselves.
4. Click **Commit changes** (top right) → **Commit changes** again in the popup.
5. The live site updates in one to two minutes. Hard-refresh (Ctrl+Shift+R) if you don't see it.

If something looks broken afterward, click the file's **History** and use the "…" menu on the previous version to see what changed, or ask the webadmin. Nothing is ever lost; every version is kept.

**Do not** edit `members.html`, anything in `js/`, or `config.js` unless you know what you're doing. Those are the site's machinery.

### 4.3 Change the photos on the public page

The homepage photo strip and the four preview photos are files in the site's `photos` folder, chosen by hand.

1. On github.com as pack96stmike, open **pack96-site** → open the **photos** folder → **Add file → Upload files** → drag in your photo → Commit changes. Keep photos under about 500 KB; resize big phone photos first (any photo app can "export for web"). Use simple file names with no spaces, like `campout-2026.jpg`.
2. Open **index.html** → pencil → Ctrl+F for `photos/` to find the strip. Each line is one photo, like `<img src="photos/IMG_6395.jpg" alt="Scouts at the Pinewood Derby" …>`. Change the file name to yours and update the short description after `alt=`. Add a line to add a photo; delete a line to remove one.
3. Commit changes.

Photos for families to browse go in the Google Photos album (Section 3.4), not here.

### 4.4 Domain renewal

The address **pack96.com** is registered at **Cloudflare** under the pack96webadmin account and renews every September. Auto-renew is on and the pack pays. If it ever lapses, the site and every printed address stop working, so check each September that the payment method on the Cloudflare account is current.

---

## 5. When something looks wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| A change in the sheet, doc, or calendar isn't showing | Google publishes changes on a delay | Wait five minutes, then hard-refresh (Ctrl+Shift+R). |
| Leaders show but a new one is missing | Den spelled differently, or the row has no Name | Check spelling: Lions, Tigers, Wolves, Bears, Webelos. Fill the Name cell. |
| Homepage shows old leaders or old links | The sheet's publishing was turned off | In the sheet: File → Share → Publish to the web → make sure it's published. |
| Members page says "That password didn't work" | Wrong password, or a new password was just set | Ask the webadmin for the current one. Tick "Remember me" so it sticks. |
| Members page says "The members page isn't set up yet" | `private.enc` is missing or damaged on GitHub | Redo Section 4.1. |
| Calendar box is empty | Calendar not shared publicly | In Google Calendar settings for Pack 96: "Make available to public," "See all event details." |
| Documents list is empty | Folder sharing changed | Right-click the Documents folder → Share → General access: Anyone with the link, Viewer. |
| Whole site is down | Domain lapsed, or GitHub outage | Check Cloudflare for the domain (Section 4.4); check githubstatus.com. The old address pack96-website.web.app forwards here and is not a backup. |

---

## 6. Yearly checklist (each September)

- [ ] Update the Leadership and Contacts tabs after officer and den leader changes. Move den leaders up a grade with their dens.
- [ ] Change the pack password (Section 4.1) and put the new one in the welcome email to families.
- [ ] Confirm the Cloudflare domain renewal and payment method.
- [ ] Clear out last year's announcements and stale documents.
- [ ] Load the year's events into the calendar.
- [ ] Make sure the printed handout says **pack96.com**.

---

## 7. Handing the site to the next webadmin

The site is designed to change hands without rebuilding anything. Hand over:

1. **The pack96webadmin Google account.** Change its recovery email and phone to the new person. This account owns the Drive folder, calendar, photo album, and the Cloudflare registration.
2. **The pack96stmike GitHub account** login. Confirm the new person can sign in.
3. **The Cloudflare account** (signed in with pack96webadmin). Confirm auto-renew and the payment method.
4. **The Drive folder *Pack 96 Website***, including `private.json`.
5. **This guide.**
6. Then change the pack password (Section 4.1) so the outgoing admin's copy is retired.

For anyone technical who inherits it: the full technical README is in the GitHub repository, and the site is plain HTML, CSS, and JavaScript with no build step and no server.

---

## 8. Glossary

- **GitHub / GitHub Pages** — the free service that stores the site's files and serves them at pack96.com. Editing a file there is what "updating the website" means.
- **Repository ("repo")** — the folder of site files on GitHub, named `pack96-site`.
- **Commit** — saving a change on GitHub. Every commit is kept, so mistakes can be undone.
- **private.json / private.enc** — the list of private links (calendar, contacts sheet, album, documents folder). The `.json` is the readable original kept in Drive; the `.enc` is the encrypted copy on the website that the pack password unlocks.
- **Publish to the web** — a Google Sheets/Docs setting that lets the website read a document. Separate from sharing.
- **Cloudflare** — where the domain name pack96.com is registered and where its DNS settings live.
- **DNS** — the settings that point pack96.com at GitHub. Set once; don't change unless the site moves.
