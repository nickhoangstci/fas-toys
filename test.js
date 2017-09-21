
var app = {
	
	dt: undefined,
	
	numItems: 100,
	
	paging: true,
	pageCfg: {
		pageSize: 10,
		navSpan: 3,
		allPageSizes: [10, 25, 50, 100]
	},
	
	controller: function() {
	
		function renderBirthDate(item, cell, column) {
			var t = new Date(item.birthDate);
			return t.toLocaleDateString();
		}
		function renderFullBirthDate(item, cell, column) {
			var t = new Date(item.birthDate);
			return t.toString();
		}
		function renderExactAge(item, cell, column) {
			var dt = (new Date()) - item.birthDate;
			var years = dt / (1000*60*60*24*365);
			return years;
		}
		function renderAgeStr(item, cell, column) {
			return Math.round(renderExactAge(item)) + ' years';
		}
		function sortAge(a, b) {
			a = (new Date()) - a.birthDate;
			b = (new Date()) - b.birthDate;
			return a - b;
		}
		
		app.dt = (new better.DataTable('tableContainer'))
			.setConfig({
				searchable: true,
				sortable: true,
				paging: {
					pageSize: 10,
					navSpan: 3,
					allPageSizes: [10, 25, 50, 100]
				},
				columns: [
					/*{ label: ' ',
						render: function(item) {
							var input = document.createElement('input');
							input.type = 'checkbox';
							input.checked = false;
							return input;
						},
						searchable: false,
						sortable: falseF
					},*/
					{ field: 'firstName' },
					{ field: 'lastName' },
					{ label: 'Full Name',
						render: function(item, cell) {
							var link = cell.appendChild(document.createElement('a'));
							link.innerHTML = item.firstName + ' ' + item.lastName;
							link.addEventListener('click', function() {
								alert(item.firstName + item.lastName + '@softtechconsulting.com');
							});
						},
						search: function(item) {
							return item.firstName + ' ' + item.lastName;
						},
						sortable: false
					},
					{ field: 'birthDate',
						render: renderBirthDate,
						search: renderFullBirthDate },
					{ label: 'Age',
						render: renderAgeStr,
						search: renderAgeStr,
						sort: sortAge }
				]
			})
			.setItems(app.createData());
	},
	createData: function() {
		var firstNames = [ 'John', 'Mary', 'Bill' ];
		var lastNames = [ 'Doe', 'Jane', 'Nye' ];
		
		function randInt(a, b) {
			if (arguments.length === 1) {
				b = a;
				a = 0;
			}
			return Math.floor(a + (b - a) * Math.random());
		}
		
		var items = new Array(app.numItems);
		
		for (var i=0; i<items.length; i++) {
			items[i] = {
				firstName: firstNames[randInt(firstNames.length)],
				lastName: lastNames[randInt(lastNames.length)],
				birthDate: randInt(Date.now()-100*(1000*60*60*24*365), Date.now())
			};
		}
		return items;
	},
	
	setNumItems: function(e) {
		app.numItems = e.value*1;
		app.dt.setItems(app.createData());
	},
	setSearchable: function(e) {
		app.dt.setSearchable(e.checked);
	},
	refresh: function() {
		app.dt.setPaging(app.paging ? app.pageCfg : undefined);
	},
	setPaging: function(e) {
		app.paging = e.checked;
		app.refresh();
	},
	setPageSize: function(e) {
		app.pageCfg.pageSize = e.value*1;
		app.refresh();
	},
	setPageNavSpan: function(e) {
		app.pageCfg.navSpan = e.value*1;
		app.refresh();
	}
};

window.addEventListener('load', function() {
	app.controller();
});
