google.load("feeds", "1");

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