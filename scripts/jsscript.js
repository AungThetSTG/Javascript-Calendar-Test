
(function(){
	var operateDate = new Date();
	var week_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", 
	"August", "September", "October", "November", "December"];
	var container = create_element("div", {id: "calendar"});

	function calendar(date = new Date()){
		if(date == 'Invalid Date'){
			console.err(date);
		}
		else{
			operateDate = date;
			create_calendar();
			return container;
		}
		return false;
	}
		/**********************
			Create Function
		*//////////////////////
		function create_calendar(){
			var cal= create_element("div", {class: "cal"});
			var current_month= create_element("div",{class:"current_month month_width month_position"});
			var cal_content= create_element("div",{class:"cal_content"});
			container.clear();
			//create month's div
			appendElement(cal, current_month);
			//create calendar's tilte and content
			appendElement(cal_content, create_title(),create_body())
			//append calendar to calendar's div	
			appendElement(current_month, cal_content);
			//container...............
			appendElement(container, create_header(), cal);
			//fill calendar title (Sunday ,Monday, ...)
			fill_calendar();
		}
		function create_header(){
			var cal_header = create_element("div", {class: "cal_header"});
			var cal_header_content = create_element("div", {class: "cal_header_content"});
			var header_content = create_element("div", {class: "header_content"});
			var cal_header_month = create_element("div", {class:"cal_header_month header_content_position"});
			var cal_header_year = create_element("div", {class:"cal_header_year header_content_position"});
			var prev_button = create_element("div", {class:" prev_button button_size fa fa-reply"});
			var next_button = create_element("div", {class:" next_button button_size fa fa-mail-forward"});

			appendElement(header_content, cal_header_month,cal_header_year);
			appendElement(cal_header_content, header_content);
			appendElement(cal_header, prev_button, next_button, cal_header_content);

			cal_header_month.addEventListener('click', show_month_view);
			cal_header_year.addEventListener('click', show_year_view);
			next_button.addEventListener('click', nextMonth);
			prev_button.addEventListener('click', previousMonth);
			return cal_header;
		}
		function create_body(){
			var cal_date = create_element("div", {class: 'cal_date'});
			for(var i=0;i<7;i++){
				appendElement(cal_date, create_row());
			}
			return cal_date;
		}
		function create_row(){
			var cal_dates_row = create_element("div", {class:'cal_dates_row'});
			for(var i=0;i<7;i++){
				appendElement(cal_dates_row, create_cal_date());
			}
			return cal_dates_row;
		}
		function create_cal_date(){
			var cal_date = create_element("div", {class: 'cal_dates'});
			var date_content = create_element("div", {class: 'date_content'});
			cal_date.addEventListener('click', date_alert);
			appendElement(cal_date, date_content.cloneNode(true));
			return cal_date;
		}
		function create_title(){
			var cal_day = create_element("div", {class:"cal_day"});
			var cal_days = create_element("div", {class:"cal_days cal_days_position"});
			for(var i=0;i<7;i++){
				appendElement(cal_day, cal_days.cloneNode(true));
			}
			return cal_day;
		}
		function create_month_view(){
			var month_container = create_element("div", {class: "month_container"});
			for(var i=0;i<3;i++){
				var month_row = create_element("div", {class: "month_row"});
				for(var j=0;j<4;j++){
					var months = create_element("div", {class: "months", month_index: i*4+j});
					months.addEventListener('click',chosen_month);
					month_row.appendChild(months);
				}
				month_container.appendChild(month_row);
			}
			return month_container;
		}
		function create_year_view(){
			var year_container = create_element("div", {class: 'year_container'});
			for(var i=0;i<3;i++){
				var year_row = create_element("div", {class: "year_row"});
				for(var j=0;j<4;j++){
					var years = create_element("div", {class: 'years'});
					years.addEventListener('click', chosen_year);
					year_row.appendChild(years);
				}
				year_container.appendChild(year_row);
			}
			return year_container;
		}
		/**********************
			Fill Function
		*//////////////////////
		function fill_calendar(){
			var header = container.childNodes[0];
			var content = container.childNodes[1];
			fill_cal_header(header);
			fill_cal_title(content.querySelector('.cal_day'));
			fill_cal_content(content);
		}
		function fill_cal_header(header){
			var header_content = header.childNodes[2].childNodes[0];
			var header_month = header_content.childNodes[0];
			var header_year = header_content.childNodes[1];
			header_month.innerText = months[operateDate.getMonth()];
			header_year.innerText = operateDate.getFullYear();
		}
		function fill_cal_title(title){
			title.childNodes.forEach(function(eachDay, index){
				eachDay.innerHTML = week_days[index];
			});
			return title;
		}
		function fill_cal_content(calendar_body){
			var date = new Date(operateDate);
			var currentMonth = date.getMonth();		//current month
			date.setDate(1);
			var previousMonthDays = date.getDay();
			date.setDate(date.getDate()-previousMonthDays);
			Object.values(calendar_body.querySelectorAll('.cal_dates')).forEach(function(date_cell){
				date_cell.classList.remove("prev_month_container");
				date_cell.classList.remove("next_month_container");
					if(date.getMonth() < currentMonth ? 
						date.getFullYear() == operateDate.getFullYear() :
						date.getFullYear() < operateDate.getFullYear() ){	//operate month reach before current month
						date_cell.classList.add("prev_month_container");
					}
					else if(date.getMonth() > currentMonth ? 
							date.getFullYear() == operateDate.getFullYear() :
							date.getFullYear() > operateDate.getFullYear() ){ //operate month reach after current month
						date_cell.classList.add("next_month_container");
					}
					date_cell.childNodes[0].innerHTML = date.getDate();
					date.setDate(date.getDate()+1);
				});
		}
		function fill_cal_title_month(){
			var cal_header = container.childNodes[0];
			var cal_header_content = cal_header.childNodes[2];
			var header_content = cal_header_content.childNodes[0];
			var next = cal_header.querySelector('.next_button');
			var previous = cal_header.querySelector('.prev_button');

			next.removeEventListener('click', nextMonth);
			previous.removeEventListener('click', previousMonth);

			header_content.classList.add('cursor');
			if(header_content.querySelector('.cal_header_month')){
				header_content.removeChild(header_content.querySelector('.cal_header_month'));
			}
			header_content.childNodes[0].classList.remove('header_content_position');
			header_content.childNodes[0].classList.add('header_year_position');
		}
		function fill_cal_content_month(){
			var month_container = container.childNodes[1];
			month_container.childNodes.forEach(function(row, rowIndex){
				row.childNodes.forEach(function(element, columnIndex){
					var index = rowIndex * 4 + columnIndex;
					element.innerHTML = months[index];
				});
			});
		}
		function fill_cal_content_year(){
			var year_container = container.childNodes[1];
			var range = 12;
			var current = operateDate.getFullYear();
			var titleText = current;
			var yearText = current;
			if(current + 11 > 2100){
				titleText = "2089-2100";
				yearText = 2089;
			}
			else{
				titleText = current +"-"+(current+11);
			}
			year_container.childNodes.forEach(function(row, rowIndex){
				row.childNodes.forEach(function(column, columnIndex){
					column.innerHTML = yearText;
					column.setAttribute("year", yearText);
					yearText++;
				});
			});
			fill_cal_title_year(titleText);
		}
		function fill_cal_title_year(titleText){
			var cal_header = container.childNodes[0];
			var cal_header_content = cal_header.childNodes[2];
			var header_content = cal_header_content.childNodes[0];
			var next = cal_header.querySelector('.next_button');
			var previous = cal_header.querySelector('.prev_button');

			next.removeEventListener('click', nextMonth);
			previous.removeEventListener('click', previousMonth);
			next.addEventListener('click', nextYearView);
			previous.addEventListener('click', previousYearView);

			header_content.classList.add('cursor');
			if(header_content.querySelector('.cal_header_month')){
				header_content.removeChild(header_content.querySelector('.cal_header_month'));
			}
			header_content.childNodes[0].classList.remove('header_content_position');
			header_content.childNodes[0].classList.add('header_year_position');
			header_content.childNodes[0].innerHTML = titleText;
		}
		/**********************
			Show Function
		*//////////////////////
		function show_year_view(){
			var year_container = create_year_view();
			container.removeChild(container.childNodes[1]);
			container.appendChild(year_container);
			fill_cal_content_year();
		}
		function show_month_view(){
			var month_view = create_month_view();
			container.removeChild(container.childNodes[1]);
			container.appendChild(month_view);
			fill_cal_content_month();
			fill_cal_title_month();
		}
		/**********************
			Event Function
		*//////////////////////
		function chosen_year(e){
			var year = e.target.getAttribute("year");
			operateDate.setFullYear(year);
			container.removeChild(container.querySelector('.cal_header'));
			var cal_header = create_header();
			fill_cal_header(cal_header);
			container.prepend(cal_header);
			show_month_view();
		}
		function chosen_month(e){
			operateDate.setMonth(e.target.getAttribute('month_index'));
			create_calendar();
		}
		function date_alert(e){
			var ele = e.target;
			var date = new Date(operateDate);
			if(ele.classList.contains('prev_month_container')){
				date.setMonth(operateDate.getMonth()-1);
			}
			else if(ele.classList.contains('next_month_container')){
				date.setMonth(operateDate.getMonth()+1);
			}
			date.setDate(ele.childNodes[0].innerText);
			alert(date);
		}
		function nextMonth(){
			operateDate.setMonth(operateDate.getMonth()+1);
			create_calendar();
		}
		function previousMonth(){
			operateDate.setMonth(operateDate.getMonth()-1);
			fill_calendar();
		}
		function nextYearView(){
			operateDate.setFullYear(operateDate.getFullYear() + 12);
			show_year_view();
		}
		function previousYearView(){
			operateDate.setFullYear(operateDate.getFullYear()-12);
			show_year_view();
		}
		/**********************
			Utilities Function
		*//////////////////////
		container["clear"] = function(){
			while(this.hasChildNodes()){
				this.removeChild(this.lastChild);
			}
		}
		function create_element(ele, attributes){
			var element = document.createElement(ele);
			if(attributes){
				bindAttribute(element, attributes);		
			}
			return element;
		}
		function bindAttribute(element, attributes){
			var keys = Object.keys(attributes).map(function(key){
				element.setAttribute(key, attributes[key]);
			});
		}
		function appendElement(){
			var element = Array.prototype.shift.call(arguments);
			while(arguments.length > 0){
				element.appendChild(Array.prototype.shift.call(arguments));
			}
			return element;
		}
		window.calendar = calendar;
		window.addEventListener('resize', function(){
			var date_cell = container.querySelectorAll('.cal_dates');
			var date_row = container.querySelectorAll('.cal_dates_row');
			var cell_width = getComputedStyle(container.querySelector('.cal_dates')).width;
			date_cell.forEach(function(ele){
				ele.style.height = cell_width;
			});
			date_row.forEach(function(ele){
				ele.style.height = cell_width;
			})
		});
	})(document);