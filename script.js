var db;

initSqlJs().then(function () {
  const sqlPromise = initSqlJs();

  const dataPromise = fetch("db.sqlite").then((res) => res.arrayBuffer());
  Promise.all([sqlPromise, dataPromise]).then(([SQL, buf]) => {
  db = new SQL.Database(new Uint8Array(buf));
    
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
  const sections = ["#section-start", "#section-about"];

  if (section_id < sections.length - 1) section_id++;

  setTimeout(() => {
    for (let i = 0; i < sections.length; i++) {
      if (i != section_id)
        $(sections[i]).css("display", "none")
    }
  }, 440);

  console.log(section_id, sections[section_id]);
  $("html")[0].style.scrollBehavior = "smooth";
  //document.body.style.overflowY = "visible";
  $(sections[section_id]).css("display", "block");
  window.location.href = sections[section_id];
}
