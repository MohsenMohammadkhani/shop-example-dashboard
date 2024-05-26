$(window).on("load", function () {
  slimScroll();
});

$(window).on("click", function () {
  slimScroll();
});

function slimScroll() {
  const heightSideBar = $("#sidebar").height();
  $("#sidebar").slimScroll({
    height: heightSideBar + "px",
  });
}

