function loadRSS(a) {
    var b = new google.feeds.Feed("http://finance.yahoo.com/rss/headline?s=" + a);
    b.setNumEntries(10), $('div[class*="article-container"]').remove(), b.load(function (a) {
        if (!a.error) {
            for (var b = 0; b < a.feed.entries.length; b++) {
                var c = a.feed.entries[b],
                    d = $("<div></div>").addClass("article-container-" + b),
                    e = $("<div></div>").addClass("title");
                e.text(c.title), d.append(e);
                var f = $("<div></div>").addClass("snip");
                f.append($("<small></small>").text(c.contentSnippet)), d.append(f);
                var g = $("<div></div>").addClass("link");
                g.append($("<a></a>").attr("href", c.link).html("read more &raquo;")), d.append(g), $(".article").append(d)
            }
            var h = $(".article-container-0");
            $(".feature-text").find("span").text(h.find(".snip").text()), $(".headline").text(h.find(".title").text()), $(".article").hide()
        }
    }), $(".tags li").removeClass("active"), $(".tags").prepend($("<li></li>").append($("<a></a>").attr("onClick", 'loadRSS("GOOG"); return false;').text(a)).attr("name", a).addClass("active"))
};

function get_hostname(url) {
  var m = ((url||'')+'').match(/^http:\/\/[^/]+/);
  return m ? m[0] : null;
};

google.load("feeds", "1");
$(document).ready(function(){

       var feed = new google.feeds.Feed("http://finance.yahoo.com/rss/headline?s=GOOG");
       feed.setNumEntries(10);

       feed.load(function(result) {
               if (!result.error) {
                   for (var i = 0; i < result.feed.entries.length; i++) {
                       var entry = result.feed.entries[i];
                       var article = $("<div></div>").addClass("article-container-" + i);
                       var title = $("<div></div>").addClass("title");
                       title.text(entry.title);
                       article.append(title);
                       var snip = $("<div></div>").addClass("snip");
                       snip.append($("<small></small>").text(entry.contentSnippet));
                       article.append(snip);
                       var link = $("<div></div>").addClass("link");
                       link.append( $("<a></a>").attr('href',entry.link)
                                                .html('read more &raquo;') );
                       article.append(link);
                       $(".article").append(article);
                   }
                   var firstArticle = $('.article-container-0');
                   var source = firstArticle.find("a").attr("href");
                   $('.feature-text').find('span').text(firstArticle.find('.snip').text());
                   $('.headline').text(firstArticle.find('.title').text());
                   $(".source a").attr("href", source);
                   $(".source a").text(get_hostname(source));
                   $(".article").hide();
               }
           });
   });
$(function() {
  $(".read-more-link").on("click", function() {
    $(this).hide();
    $(".read-more-text").slideDown();
  });

  $(".read-less-link").on("click", function() {
    $(".read-more-link").show();
    $(".read-more-text").slideUp();
  });

  $("#next_article").on("click", function() {
    var currentFeature = $("#feature").attr('data-current');

    var nextElement = $(currentFeature).next();
    if (nextElement.length == 0) {
      nextElement = $(".article-container-0");
    }
    $("#feature").attr('data-current', '.' + nextElement.attr('class'));

    var title = nextElement.find(".title").text();
    var content = nextElement.find(".snip").text();
    var source = nextElement.find("a").attr("href");
    $(".headline").text(title);
    $(".feature-text").find("span").text(content);
    $(".source a").attr("href", source);
    $(".source a").text(get_hostname(source));
  });

  $("#prev_article").on("click", function() {
    var currentFeature = $("#feature").attr('data-current');

    var prevElement = $(currentFeature).prev();
    if (prevElement.length == 0) {
      prevElement = $(".article-container-9");
    }
    $("#feature").attr('data-current', '.' + prevElement.attr('class'));

    var title = prevElement.find(".title").text();
    var content = prevElement.find(".snip").text();
    var source = prevElement.find("a").attr("href");
    $(".headline").text(title);
    $(".feature-text").find("span").text(content);
    $(".source a").attr("href", source);
    $(".source a").text(get_hostname(source));
  });
});

