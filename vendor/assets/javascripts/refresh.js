google.load("feeds", "1");

function loadRSS(str) {
    
    var feed = new google.feeds.Feed("http://finance.yahoo.com/rss/headline?s="+str);
    feed.setNumEntries(10);

    // clear old articles
    $('div[class*="article-container"]').remove();
    
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
                var firstArticle = $('.article-container-0')
                    $('.feature-text').find('span').text(firstArticle.find('.snip').text());
                $('.headline').text(firstArticle.find('.title').text());
                $(".article").hide();
            }
        });

    // refresh list of feeds
    $(".tags li").removeClass("active");
    //if ( $(".tags[name*=+str+").length ) {
        $(".tags").prepend($("<li></li>").append( $('<a></a>').attr('onClick','loadRSS("GOOG"); return false;')
                                                  .text(str))
                           .attr('name', str)
                           .addClass("active"));
    //} 
    
}

$(document).ready(function(){

        // default to GOOG stock symbol for now
        loadRSS('GOOG');
        
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
                $(".headline").text(title);
                $(".feature-text").find("span").text(content);
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
                $(".headline").text(title);
                $(".feature-text").find("span").text(content);
            });
    });

