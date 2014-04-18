var ClickCounterViewModel = function(names) {
    this.numberOfClicks = ko.observable(0);
    this.names = ko.observableArray(names)
 
    this.registerClick = function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    };
 
    this.resetClicks = function() {
        this.numberOfClicks(0);
    };
 
    this.hasClickedTooManyTimes = ko.computed(function() {
        return this.numberOfClicks() >= 5;
    }, this);
	
	this.fertig = ko.computed(function() {
		return this.numberOfClicks() >=4;
	}, this);
	
	this.nichtFertig = ko.computed(function() {
		return this.numberOfClicks() <4;
	}, this);
};
 
ko.applyBindings(new ClickCounterViewModel(["Upload","In der Warteschlange","Wurde analysiert","Der Künstler sucht nach Inspiration","Der Künstler ist fertig","Sie werden weitergeleitet"]));