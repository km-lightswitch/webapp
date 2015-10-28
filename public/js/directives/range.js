'use strict'
var RangeDirective = function ($document) {
	return {
		templateUrl: 'views/range.html',
		scope: {
			start: '=',
			end: '=',
			class: '='
		},
		controller: 'RangeController as rangeController',
		link: function (scope, element, attr) {
		}
	};
}

class RangeController {
	constructor($scope, $document) {
		this.x = 0;
		this.width = 100;
		this.handleWidth = 10;
		this.left = 0;
		this.handle;
		this.scope = $scope;

		this.setLeft(0);

		$document.on('mousemove', (ev) => {
			ev.preventDefault();
			this.divMove(ev);
		});
		$document.on('mouseup', (ev) => {
			ev.preventDefault();
			this.mouseUp(ev);
		});
	}

	setLeft(left) {
		this.left = left;
		this.rangeLeft = this.handleWidth + this.left;
		this.endLeft = this.left + this.handleWidth + this.width;
	}

	divMove(ev) {
		ev.preventDefault();
		if (!this.handle)
			return;

		this.delta = (ev.clientX - this.x);
		this.x = ev.clientX;
		var width = this.width;


		if (this.handle.id === 'range') {
			this.left += this.delta;
		}

		if (this.handle.id === 'end') {
			let newWidth = this.width + this.delta;
			if (newWidth > 10) {
				width = newWidth;
			}
		}

		if (this.handle.id === 'start') {
			let newWidth = this.width - this.delta;
			if (newWidth > 10) {
				width = newWidth
				this.left += this.delta;
			}
		}

		this.scope.$apply(() => {
			this.width = width;
			this.setLeft(this.left);
		});
	}

	mouseDown(ev) {
		ev.preventDefault();
		this.handle = ev.target;
		this.x = ev.clientX;
	}

	mouseUp(ev) {
		ev.preventDefault();
		this.handle = null;
	}
}

module.exports = {
	RangeDirective: RangeDirective,
	RangeController: RangeController
};