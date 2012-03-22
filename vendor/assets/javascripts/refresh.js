$(function() {
  $(".read-more-link").on("click", function() {
    $(this).hide();
    $(".read-more-text").slideDown();
  });

  $(".read-less-link").on("click", function() {
    $(".read-more-link").show();
    $(".read-more-text").slideUp();
  });
});

