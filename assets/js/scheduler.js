window.addEventListener("DOMContentLoaded", function(){

    // different configs for different screen sizes
    var compactView = {
        xy: {
            nav_height: 80
        },
        config: {
            header: {
                rows: [
                    { 
                        cols: [
                            "prev",
                            "date",
                            "next",
                        ]
                    },
                    { 
                        cols: [
                            "day",
                            "week",
                            "month",
                            "spacer",
                            "today"
                        ]
                    }
                ]
            }
        },
        templates: {
            month_scale_date: scheduler.date.date_to_str("%D"),
            week_scale_date: scheduler.date.date_to_str("%D, %j"),
            event_bar_date: function(start,end,ev) {
                return "";
            }
            
        }
    };
    var fullView = {
        xy: {
            nav_height: 80
        },
        config: {
            header: [
                "day",
                "week",
                "month",
                "date",
                "prev",
                "today",
                "next"
            ]
        },
        templates: {
            month_scale_date: scheduler.date.date_to_str("%l"),
            week_scale_date: scheduler.date.date_to_str("%l, %F %j"),
            event_bar_date: function(start,end,ev) {
                return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
            }
        }
    };

    function resetConfig(){
        var settings;
        if(window.innerWidth < 1000){
            settings = compactView;
        } else {
            settings = fullView;
        }
        scheduler.utils.mixin(scheduler.config, settings.config, true);
        scheduler.utils.mixin(scheduler.templates, settings.templates, true);
        scheduler.utils.mixin(scheduler.xy, settings.xy, true);
        return true;
    }

    scheduler.config.responsive_lightbox = true;
    resetConfig();
    scheduler.attachEvent("onBeforeViewChange", resetConfig);
    scheduler.attachEvent("onSchedulerResize", resetConfig);



    scheduler.init('scheduler_here',new Date(2018,0,1),"week");
    // scheduler.load("../common/events.json");

    document.querySelector(".add_event_button").addEventListener("click", function(){
        scheduler.addEventNow();
    });
});