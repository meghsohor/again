  //GA Goals Track
    var ga = function (action, label) {
    var waitForGA = setInterval(function () {
        if (typeof window.ga === 'function') {
        clearInterval(waitForGA);
            setTimeout(function () {
        window.ga('create', 'UA-169625128-1', 'auto');
                window.ga('send', {
        hitType: 'event',
                    eventCategory: 'Click',
                    eventAction: action,
                    eventLabel: label,
                    nonInteraction: true // ?
                });
                console.log('Again - GA ', 'Action:' + action, 'Label:' + label);

            }, 250);
        }
    }, 50);
};

 //Add Event Listener
 var on = function(type, selector, cb) {
        window.addEventListener(type, function (event) {
            var target = event.target.closest(selector);
            if (null === target) {
                return;
            }
            var callback = cb.bind(target);
            callback(event);
        });
};


// Link click
on('click', 'a', function() {
    //External links
    if(!this.href.includes(location.host) || !this.href.includes(':') || this.href !== '#')
    {
        ga('Outbound Link', this.href);
    } else {
        ga('Link', this.textContent.trim());
    }

});

//FAQ Click
on('click', '.collapsible-item-header', function() {
        ga('FAQ Click', this.textContent.trim());

});