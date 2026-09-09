// Pack 96 site: PUBLIC configuration.
// Anything here is visible to anyone. Private links (calendar, photos, contacts) go in private.json -> private.enc instead.
window.PACK96 = {
  packEmail: "pack96sms@gmail.com",

  // The "Leadership" tab of the Pack 96 Site Content Google Sheet, published to the web as CSV.
  // Columns: Name, Role, Den. Leave "" to use fallbackLeaders below.
  leadersCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQChEHV8nWW0phvIWo34ymJfOReKDjtM9v54IvoU0rqjvNILQKHZ6dgdXrh6NAzL37bKpUv78GQjuFz/pub?gid=0&single=true&output=csv",

  // The "Links" tab of the same sheet, published as CSV. Columns: Title, URL, Note, Show (public / members / both).
  // Feeds "Helpful Links" on the homepage and "Other links" on the members page. Leave "" to use the links written in index.html.
  linksCsvUrl: "https://docs.google.com/spreadsheets/d/1_OsXz7GpjZwL9FG03W8O4606xMFEXmhlxu_j6GlfBTs/gviz/tq?tqx=out:csv&sheet=Links",

  // Shown when leadersCsvUrl is empty or can't be reached. Keep it roughly current.
  fallbackLeaders: [
    { name: "Greg Bredestege", role: "Cubmaster", den: "" },
    { name: "Open", role: "Assistant Cubmaster", den: "" },
    { name: "Karen Berndt", role: "Committee Chair & Chartered Organization Rep", den: "" },
    { name: "Lisa Barrow", role: "Treasurer", den: "" },
    { name: "Carol Rose", role: "Fundraising Coordinator", den: "" },
    { name: "David Hoff", role: "Committee Member", den: "" },
    { name: "Open", role: "Den Leader", den: "Lions" },
    { name: "Karen Berndt", role: "Den Leader", den: "Tigers" },
    { name: "Paul Rose", role: "Den Leader", den: "Wolves" },
    { name: "Jonathan Kolk", role: "Den Leader", den: "Bears" },
    { name: "Chris Berndt", role: "Den Leader", den: "Webelos" }
  ]
};
