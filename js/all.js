$.domReady(function() {
	UI.init();
});

var UI = {

	init: function() {

		$(".js-toggle-menu").bind("click", function(e) {
			$(".js-header__nav").toggleClass("content--show");
			e.stop();
		});

		UI.slideshow.init();

	}, 

    slideshow: {
    
        init: function() {
        
            var slideshows = $(".slideshow");
            for(var i=0, length=slideshows.length;i<length;i++) {
            	
                var slideshow = $(slideshows[i]), 
                    panels_container = slideshow.find(".slideshow__panels"), 
                    content = slideshow.find(".slideshow__panel"),
                    window_width = document.documentElement.clientWidth, 
                    slideshow_width = window_width * content.length;
                
                slideshow.height(content.height());
                slideshow.find(".slideshow__panel").width(window_width);
            
                panels_container.addClass("js-slideshow__panels");
                panels_container.width(slideshow_width);
                
                $(content[0]).attr("data-current", "true");
                this.addControls(slideshow);
            
            }
            
            $(window).on("resize", function() {
                UI.slideshow.resize();
            });
            
        }, 
        
        resize: function() {
            var slideshows = $(".slideshow");
            for(var i=0, length=slideshows.length;i<length;i++) {
            
                var slideshow = $(slideshows[i]), 
                    panels_container = slideshow.find(".slideshow__panels"), 
                    content = slideshow.find(".slideshow__panel"),
                    window_width = document.documentElement.clientWidth, 
                    slideshow_width = window_width * content.length;
                
                slideshow.find(".slideshow__panel").width(window_width);
                slideshow.height(content.height());
                panels_container.width(slideshow_width);
            
            }
        }, 
        
        addControls: function(slideshow) {
            
            var html = "<div class='slideshow__controls'>";
                html += "<a href='./' class='slideshow__control slideshow__control--previous'><span>Previous</span></a>";
                html+= "<a href='./' class='slideshow__control slideshow__control--next'><span>Next</span></a>";
                html += "</div>";
            
            slideshow.append(html);
            this.updateUI(slideshow);
            
        }, 
        
        updateUI: function(slideshow) {
            
            var current_panel = UI.slideshow.currentPanel(slideshow), 
                next_panel = UI.slideshow.nextPanel(slideshow), 
                previous_panel = UI.slideshow.previousPanel(slideshow);
                
            slideshow.find(".slideshow__control").show().removeClass("slideshow__control--disabled");
            if(previous_panel.length == 0) {
                slideshow.find(".slideshow__control--previous").addClass("slideshow__control--disabled");
            }
            
            if(next_panel.length == 0) {
                slideshow.find(".slideshow__control--next").addClass("slideshow__control--disabled");
            }
            
            slideshow.find(".slideshow__control--previous").bind("click", function(e) {
                UI.slideshow.freezeUI(this);
                UI.slideshow.move(slideshow, this, "previous");
                e.stop();
            });
            
            slideshow.find(".slideshow__control--next").bind("click", function(e) {
                UI.slideshow.freezeUI(this);
                UI.slideshow.move(slideshow, this, "next");
                e.stop();
            });
            
        }, 
        
        move: function(slideshow, link, action) {
            
            if(!$(link).hasClass("slideshow__control--disabled")) {
                
                var window_width = document.documentElement.clientWidth, 
                    current_position = parseInt(slideshow.find(".slideshow__panels").css("left")), 
                    new_position = 0, 
                    current_panel = UI.slideshow.currentPanel(slideshow), 
                    next_panel = UI.slideshow.nextPanel(slideshow), 
                    previous_panel = UI.slideshow.previousPanel(slideshow);

                if(action == "next") {
                    new_position = current_position - window_width;
                    next_panel.attr("data-current", "true");
                } else if(action == "previous") {
                    new_position = current_position + window_width;
                    previous_panel.attr("data-current", "true");
                }
                current_panel.removeAttr("data-current");
                
                slideshow.find(".slideshow__panels").animate({
                  left: new_position, 
                  complete: function() {
                      UI.slideshow.updateUI(slideshow);
                  }
                });
                
            }
            
        },

        currentPanel: function(slideshow) {
            return slideshow.find(".slideshow__panel[data-current='true']");
        }, 
        
        nextPanel: function(slideshow) {
            return UI.slideshow.currentPanel(slideshow).next();
        }, 
        
        previousPanel: function(slideshow) {
            return UI.slideshow.currentPanel(slideshow).previous();
        }, 
        
        freezeUI: function(l) {
            var link = $(l);
            link.off("click");
            link.on("click", function(e) {
                e.stop();
            });
        }
        
    },

};