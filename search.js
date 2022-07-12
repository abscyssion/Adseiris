$(document).ready(function () {
  var db;

  initSqlJs().then(function () {
    const sqlPromise = initSqlJs();

    const dataPromise = fetch("db.sqlite").then((res) => res.arrayBuffer());
    Promise.all([sqlPromise, dataPromise]).then(([SQL, buf]) => {
      db = new SQL.Database(new Uint8Array(buf));
    });
  });

  function query(text) {
    en = db.exec(
      `SELECT * FROM Dictionary WHERE MeaningEnglish LIKE "%${text}%";`
    );
    pl = db.exec(
      `SELECT * FROM Dictionary WHERE MeaningPolish LIKE "%${text}%";`
    );
    ad = db.exec(`SELECT * FROM Dictionary WHERE Word LIKE "%${text}%";`);
    let res = [];
    res = res.concat(en, pl, ad);

    if (res.length > 0) return res[0].values;
    else return false;
  }

  {
    var typingTimer;
    var $input = $("#search-input");

    $input.keyup(() => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(refreshResults, 700);
    });

    $input.change(() => {
      clearTimeout(typingTimer);
    });
  }

  {
    const parent = $("#results");
    let lastInput = null;
    function refreshResults() {
      let input = $input.val().replace(/\s/g, "");
      let results;
      if (input.length && input != lastInput) {
        //If input is not just whitespaces or is blank or is the same as previous one, make a query.
        lastInput = input;
        results = query($input.val());
        if (results) {
          //If query returns a valid record, proceed.

          //Create a result element for every result.
          let resultElements = "<ul> ";
          results.forEach((result) => {
            let word = result[0];
            let part = result[1];
            let gender = checkGender(word);
            let meanings = "";
            let i = 1;
            result[2].split(", ").forEach((meaning) => {
              meanings += "<i>" + i + ". </i>" + meaning + "<br>";
              i++;
            });

            let resultElement = `\
              <li>
                  <div class="result-top"></div>
                  <div class="result-rest">
                      <b>${word}</b> ${part} <i> ${gender} </i> <br />
                      ${meanings} <br>
                      <small>▼</small> Show noun declination
                  </div>
              </li>
              `;
            resultElements += resultElement;
          });

          resultElements += "</ul>";
          parent.html($(resultElements));
        } else {
          parent.html($(""));
        }
      }
    }

    function checkGender(word) {
      if (!/[aāiïoōuū]/.test(word.toString().charAt(word.length - 1)))
        return "masc.";
      else return "non-masc.";
    }

    //function generateNounDeclension(noun) {}
  }
});
