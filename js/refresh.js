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
                    var firstArticle = $('.article-container-0')
                        $('.feature-text').find('span').text(firstArticle.find('.snip').text());
                    $('.headline').text(firstArticle.find('.title').text());
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

function showRSS(str) {
    var feed = new google.feeds.Feed("http://finance.yahoo.com/rss/headline?s="+str);
    feed.setNumEntries(10);


    $("table").filter(".article").remove();
    $("#tags li").removeClass("active");
    $("#tags").prepend($("<li></li>").append( $('<a></a>').attr('href','#')
					      .text(str))
		       .addClass("active"));

    if ($("#rssOutput ul").length == 0) {
	$("#rssOutput").prepend( $("<ul></ul>").addClass( "nav nav-pills" ).append( $("<li></li>").addClass("active")
										    .append( $("<a></a>").attr("href","#/recent")
											     .text("recent")))
				 .append( $("<li></li>").append( $("<a></a>").attr("href","#/archived")
								 .text("archived"))));
    }    

    feed.load(function(result) {
	    if (!result.error) {

		for (var i = 0; i < result.feed.entries.length; i++) {
		    var entry = result.feed.entries[i];

		    var table = $("<table></table>").addClass("article table table-bordered");
		    var body = $("<tbody></tbody>");                              
		    var row = $("<tr></tr>");
		    var col = $("<td></td>");

		    var article = $("<div></div>").addClass("article-container");
		    var title = $("<div></div>").addClass("title");
		    title.text(entry.title)
			.css('font-weight','bold');
		    article.append(title);

		    var pub = $("<div></div>").addClass("mute");
		    pub.append($("<small></small>").text( jQuery.timeago( entry.publishedDate ) ) );
		    article.append(pub);
                              
		    var snip = $("<div></div>").addClass("snip");
		    snip.append($("<small></small>").text(entry.contentSnippet));
		    article.append(snip);

		    var link = $("<div></div>").addClass("link");
		    link.append( $("<a></a>").attr('href',entry.link)
				 .html('read more &raquo;') );
		    article.append(link);

		    var feedback = $("<ul></ul>").addClass("feedback");                  
		    feedback.append( $("<li></li>").append( $("<a></a>").html( $("<i></i>").addClass("icon-ok icon-white"))
							    .attr('href',"#/ok")
							    .addClass("feedback-ok")));
		    feedback.append( $("<li></li>").append( $("<a></a>").html( $("<i></i>").addClass("icon-remove icon-white"))
							    .attr('href',"#/remove")
							    .addClass("feedback-remove")));
		    feedback.append( $("<li></li>").append( $("<a></a>").html( $("<i></i>").addClass("icon-comments icon-white"))
							    .attr('href',"#/comments")			      
							    .addClass("feedback-comments")));
                              
		    feedback.append( $("<li></li>").append( $("<a></a>").html( $("<i></i>").addClass("icon-tags icon-white"))
							    .attr('href',"#/tags")			      			      
							    .addClass("feedback-tags")));

		    feedback.append( $("<li></li>").append( $("<a></a>").html( $("<i></i>").addClass("icon-check icon-white"))
							    .attr('href',"#/share")			      			      			      
							    .addClass("feedback-save")));
	      
		    feedback.append( $("<li></li>").append( $("<a></a>").html( $("<i></i>").addClass("icon-share icon-white"))
							    .attr('href',"#/share")			      			      			      
							    .addClass("feedback-share")));

		    article.append(feedback);
                              
		    col.append(article);                  
		    row.append(col);
		    body.append(row)                              
			table.append(body);
		    $("#rssOutput").append(table);
		}
	    }
	});
}