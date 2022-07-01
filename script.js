initSqlJs().then(function () {
  const sqlPromise = initSqlJs();

  const dataPromise = fetch("db.sqlite").then((res) => res.arrayBuffer());
  Promise.all([sqlPromise, dataPromise]).then(([SQL, buf]) => {
    const db = new SQL.Database(new Uint8Array(buf));
    const res = db.exec("SELECT * FROM Dictionary");
    console.log(res);
  });

  // // Prepare a statement
  // const stmt = db.prepare("SELECT * FROM Dictionary");
  // stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

  // // Bind new values
  // stmt.bind({$start:1, $end:2});
  // while(stmt.step()) { //
  //   const row = stmt.getAsObject();
  //   console.log('Here is a row: ' + JSON.stringify(row));
  // }
});

let section_id = 0;

function scrollDown() {
  const sections = ["section-start", "section-about"];

  if (section_id < sections.length - 1) section_id++;

  setTimeout(() => {
    for (let i = 0; i < sections.length; i++) {
      if (i != section_id)
        document.getElementById(sections[i]).style.display = "none";
    }
  }, 440);

  console.log(section_id, sections[section_id]);
  document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
  //document.body.style.overflowY = "visible";
  document.getElementById(sections[section_id]).style.display = "inline-block";
  window.location.href = "#" + sections[section_id];
}
