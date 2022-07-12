function changeLanguage(lang)
{
  $("html").lang=lang;
}

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
