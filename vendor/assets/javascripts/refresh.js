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
		var tempHeadline = $(".headline").text();
		var tempTimestamp = $(".timestamp").text();
		var tempFeatureText = $(".feature-text span").text();
		var tempMoreText = $(".read-more-text span").text();

		$(".headline").text($("#next-page-headline").text());
		$(".timestamp").text($("#next-page-timestamp").text());
		$(".feature-text span").text($("#next-page-feature-text").text());
		$(".read-more-text span").text($("#next-page-more-text").text());

		$("#next-page-headline").text(tempHeadline);
		$("#next-page-timestamp").text(tempTimestamp);
		$("#next-page-feature-text").text(tempFeatureText);
		$("#next-page-more-text").text(tempMoreText);

		$(".read-more-text").hide();
		$(".read-more-link").show();
	    });
    });
