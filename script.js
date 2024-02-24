jQuery(window).on("load", function () {
	"use strict";
	// bootstrap wysihtml5
	$(".textarea_editor").wysihtml5({
		html: true,
	});
});
jQuery(window).on("load resize", function () {
	// custom scrollbar
	$(".customscroll").mCustomScrollbar({
		theme: "dark-2",
		scrollInertia: 300,
		autoExpandScrollbar: true,
		advanced: { autoExpandHorizontalScroll: true },
	});
});
jQuery(document).ready(function () {
	"use strict";
	// Background Image
	jQuery(".bg_img").each(function (i, elem) {
		var img = jQuery(elem);
		jQuery(this).hide();
		jQuery(this)
			.parent()
			.css({
				background: "url(" + img.attr("src") + ") no-repeat center center",
			});
	});

	/*==============================================================*/
	// Image to svg convert start
	/*==============================================================*/
	jQuery("img.svg").each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr("id");
		var imgClass = $img.attr("class");
		var imgURL = $img.attr("src");
		jQuery.get(
			imgURL,
			function (data) {
				var $svg = jQuery(data).find("svg");
				if (typeof imgID !== "undefined") {
					$svg = $svg.attr("id", imgID);
				}
				if (typeof imgClass !== "undefined") {
					$svg = $svg.attr("class", imgClass + " replaced-svg");
				}
				$svg = $svg.removeAttr("xmlns:a");
				if (
					!$svg.attr("viewBox") &&
					$svg.attr("height") &&
					$svg.attr("width")
				) {
					$svg.attr(
						"viewBox",
						"0 0 " + $svg.attr("height") + " " + $svg.attr("width")
					);
				}
				$img.replaceWith($svg);
			},
			"xml"
		);
	});
	/*==============================================================*/
	// Image to svg convert end
	/*==============================================================*/

	// click to scroll
	// $('.collapse-box').on('shown.bs.collapse', function () {
	// 	$(".customscroll").mCustomScrollbar("scrollTo",$(this));
	// });

	// code split
	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
		"/": "&#x2F;",
	};
	function escapeHtml(string) {
		return String(string).replace(/[&<>"'\/]/g, function (s) {
			return entityMap[s];
		});
	}
	//document.addEventListener("DOMContentLoaded", init, false);
	window.onload = function init() {
		var codeblock = document.querySelectorAll("pre code");
		if (codeblock.length) {
			for (var i = 0, len = codeblock.length; i < len; i++) {
				var dom = codeblock[i];
				var html = dom.innerHTML;
				html = escapeHtml(html);
				dom.innerHTML = html;
			}
			$("pre code").each(function (i, block) {
				hljs.highlightBlock(block);
			});
		}
	};

	// Search Icon
	$("#filter_input").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#filter_list .fa-hover").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});

	// custom select 2 init
	$(".custom-select2").select2();

	// Bootstrap Select
	//$('.selectpicker').selectpicker();

	// tooltip init
	$('[data-toggle="tooltip"]').tooltip();

	// popover init
	$('[data-toggle="popover"]').popover();

	// form-control on focus add class
	$(".form-control").on("focus", function () {
		$(this).parent().addClass("focus");
	});
	$(".form-control").on("focusout", function () {
		$(this).parent().removeClass("focus");
	});

	// sidebar menu icon
	$('.menu-icon, [data-toggle="left-sidebar-close"]').on("click", function () {
		//$(this).toggleClass('open');
		$("body").toggleClass("sidebar-shrink");
		$(".left-side-bar").toggleClass("open");
		$(".mobile-menu-overlay").toggleClass("show");
	});
	$('[data-toggle="header_search"]').on("click", function () {
		jQuery(".header-search").slideToggle();
	});

	var w = $(window).width();
	$(document).on("touchstart click", function (e) {
		if (
			$(e.target).parents(".left-side-bar").length == 0 &&
			!$(e.target).is(".menu-icon, .menu-icon img")
		) {
			$(".left-side-bar").removeClass("open");
			$(".menu-icon").removeClass("open");
			$(".mobile-menu-overlay").removeClass("show");
		}
	});
	// $(window).on("resize", function () {
	// 	var w = $(window).width();
	// 	if ($(window).width() > 1200) {
	// 		$(".left-side-bar").removeClass("open");
	// 		$(".menu-icon").removeClass("open");
	// 		$(".mobile-menu-overlay").removeClass("show");
	// 	}
	// });

	// sidebar menu Active Class
	$("#accordion-menu").each(function () {
		var vars = window.location.href.split("/").pop();
		$(this)
			.find('a[href="' + vars + '"]')
			.addClass("active");
	});

	// click to copy icon
	$(".fa-hover").click(function (event) {
		event.preventDefault();
		var $html = $(this).find(".icon-copy").first();
		var str = $html.prop("outerHTML");
		CopyToClipboard(str, true, "Copied");
	});
	var clipboard = new ClipboardJS(".code-copy");
	clipboard.on("success", function (e) {
		CopyToClipboard("", true, "Copied");
		e.clearSelection();
	});

	// date picker
	$(".date-picker").datepicker({
		language: "en",
		autoClose: true,
		dateFormat: "dd MM yyyy",
	});
	$(".datetimepicker").datepicker({
		timepicker: true,
		language: "en",
		autoClose: true,
		dateFormat: "dd MM yyyy",
	});
	$(".datetimepicker-range").datepicker({
		language: "en",
		range: true,
		multipleDates: true,
		multipleDatesSeparator: " - ",
	});
	$(".month-picker").datepicker({
		language: "en",
		minView: "months",
		view: "months",
		autoClose: true,
		dateFormat: "MM yyyy",
	});

	// only time picker
	$(".time-picker").timeDropper({
		mousewheel: true,
		meridians: true,
		init_animation: "dropdown",
		setCurrentTime: false,
	});
	$(".time-picker-default").timeDropper();

	// var color = $('.btn').data('color');
	// console.log(color);
	// $('.btn').style('color'+color);
	$("[data-color]").each(function () {
		$(this).css("color", $(this).attr("data-color"));
	});
	$("[data-bgcolor]").each(function () {
		$(this).css("background-color", $(this).attr("data-bgcolor"));
	});
	$("[data-border]").each(function () {
		$(this).css("border", $(this).attr("data-border"));
	});

	$("#accordion-menu").vmenuModule({
		Speed: 400,
		autostart: false,
		autohide: true,
	});
});

// sidebar menu accordion
(function ($) {
	$.fn.vmenuModule = function (option) {
		var obj, item;
		var options = $.extend(
			{
				Speed: 220,
				autostart: true,
				autohide: 1,
			},
			option
		);
		obj = $(this);

		item = obj.find("ul").parent("li").children("a");
		item.attr("data-option", "off");

		item.unbind("click").on("click", function () {
			var a = $(this);
			if (options.autohide) {
				a.parent()
					.parent()
					.find("a[data-option='on']")
					.parent("li")
					.children("ul")
					.slideUp(options.Speed / 1.2, function () {
						$(this).parent("li").children("a").attr("data-option", "off");
						$(this).parent("li").removeClass("show");
					});
			}
			if (a.attr("data-option") == "off") {
				a.parent("li")
					.children("ul")
					.slideDown(options.Speed, function () {
						a.attr("data-option", "on");
						a.parent("li").addClass("show");
					});
			}
			if (a.attr("data-option") == "on") {
				a.attr("data-option", "off");
				a.parent("li").children("ul").slideUp(options.Speed);
				a.parent("li").removeClass("show");
			}
		});
		if (options.autostart) {
			obj.find("a").each(function () {
				$(this)
					.parent("li")
					.parent("ul")
					.slideDown(options.Speed, function () {
						$(this).parent("li").children("a").attr("data-option", "on");
					});
			});
		} else {
			obj.find("a.active").each(function () {
				$(this)
					.parent("li")
					.parent("ul")
					.slideDown(options.Speed, function () {
						$(this).parent("li").children("a").attr("data-option", "on");
						$(this).parent("li").addClass("show");
					});
			});
		}
	};
})(window.jQuery || window.Zepto);

// copy to clipboard function
function CopyToClipboard(value, showNotification, notificationText) {
	var $temp = $("<input>");
	if (value != "") {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(value).select();
		document.execCommand("copy");
		$temp.remove();
	}
	if (typeof showNotification === "undefined") {
		showNotification = true;
	}
	if (typeof notificationText === "undefined") {
		notificationText = "Copied to clipboard";
	}
	var notificationTag = $("div.copy-notification");
	if (showNotification && notificationTag.length == 0) {
		notificationTag = $("<div/>", {
			class: "copy-notification",
			text: notificationText,
		});
		$("body").append(notificationTag);

		notificationTag.fadeIn("slow", function () {
			setTimeout(function () {
				notificationTag.fadeOut("slow", function () {
					notificationTag.remove();
				});
			}, 1000);
		});
	}
}

// detectIE Browser
(function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf("MSIE ");
	if (msie > 0) {
		// IE 10 or older => return version number
		var ieV = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
		document.querySelector("body").className += " IE";
	}

	var trident = ua.indexOf("Trident/");
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf("rv:");
		var ieV = parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
		document.querySelector("body").className += " IE";
	}

	// other browser
	return false;
})();
<script>
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create a stock chart
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating_the_chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
}));

// Set global number format
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

//
// Main (value) panel
//

// Create a main stock panel (chart)
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(70)
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom"
  }),
  tooltip: am5.Tooltip.new(root, {}),
  numberFormat: "#,###.00",
  extraTooltipPrecision: 2
}));

var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  groupData: true,
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  name: "MSFT",
  valueXField: "Date",
  valueYField: "Close",
  highValueYField: "High",
  lowValueYField: "Low",
  openValueYField: "Open",
  calculateAggregates: true,
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "{valueY}"
}));

// Set main value series
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll([valueSeries]);


// Add cursor(s)
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: [valueSeries],
  snapToSeriesBy: "y!"
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});


// Function that dynamically loads data
function loadData(ticker, series) {

  // Load external data
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
  am5.net.load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + ".csv").then(function(result) {

    // Parse loaded data
    var data = am5.CSVParser.parse(result.response, {
      delimiter: ",",
      skipEmpty: true,
      useColumnNames: true
    });

    // Process data (convert dates and values)
    var processor = am5.DataProcessor.new(root, {
      dateFields: ["Date"],
      dateFormat: "yyyy-MM-dd",
      numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"]
    });
    processor.processMany(data);

    // Set data
    am5.array.each(series, function(item) {
      item.data.setAll(data);
    });
  });

}

// Load initial data for the first series
loadData("MSFT", [valueSeries, sbSeries]);

// Add toolbar
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
});

// Add an event listener to each radio button
		const radioButtons = document.querySelectorAll('input[name="radio-group"]');
		const cards = document.querySelectorAll('.card');
		const boxDsh = document.querySelector('.boxDsh');

		radioButtons.forEach(radioButton => {
			radioButton.addEventListener('change', function () {
				// Set opacity for all cards
				cards.forEach(card => {
					card.style.opacity = '0.5';
					card.classList.remove('highlighted'); // Remove highlighted class from all cards
				});

				// Set opacity to 1 for the selected card and add highlighted class
				const selectedCard = document.querySelector(`[for="${this.id}"]`).closest('.card');
				if (selectedCard) {
					selectedCard.style.opacity = '1';
					selectedCard.classList.add('highlighted');
				}

				// Add opDIV class to boxDsh
				boxDsh.classList.add('opDIV');
			});
		});

/**************apex*******/
var options = {
  chart: {
    width: "100%",
    height: 380,
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
    colors: ["#fff"],
  },
  series: [
    {
      data: [44, 55, 41, 64, 22, 43, 21],
    },
  ],
  xaxis: {
    categories: [
      "Korea",
      "Canada",
      "Poland",
      "Italy",
      "France",
      "Japan",
      "China",
    ],
  },
  
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="arrow_box">' +
        "<span>" +
        w.globals.labels[dataPointIndex] +
        ": " +
        series[seriesIndex][dataPointIndex] +
        "</span>" +
        "</div>"
      );
    },
  },
  colors: ["#8c68cd", "#FFBD33", "#33FF49", "#33B3FF", "#B033FF", "#FF33F9", "#33FFF4"], // Specify custom bar colors here
};

var chart = new ApexCharts(document.querySelector("#apex-chart"), options);

chart.render();
var options = {
	chart: {
		height: 410,
		type: "radialBar"
	},
	plotOptions: {
		circle: {
			dataLabels: {
				showOn: "hover"
			}
		}
	},
	series: [44, 55, 67, 83],
	labels: ["Apples", "Oranges", "Bananas", "Berries"]
};

var chart1 = new ApexCharts(document.querySelector("#chart"), options);
chart1.render();


var stackedOptions = {
  chart: {
    type: 'bar',
    stacked: true,
    shadow: {
      enabled: true,
      blur: 1,
      opacity: 0.5
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '62%',
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0,
  },
  series: [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21]
    },
    {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32]
    },
    {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20]
    },
    {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4]
    }
  ],
  
  title: {
    text: ''
  },
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
  },
  yaxis: {
    title: {
      text: undefined
    },
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function(val) {
        return val + "K"
      }
    }
  },
  fill: {
    type: 'pattern',
    opacity: 1,
    pattern: {
      style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'],
    }
  },
  states: {
    hover: {
      filter: 'none'
    }
  },
  legend: {
    position: 'right',
    show: false
  }
}
var stackedBarChart = new ApexCharts(
  document.querySelector("#stackedBarChart"),
  stackedOptions
);
        
stackedBarChart.render();

/*********************/
var options = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#chart4"), options);
  chart.render();
/*********************/
 var options = {
          series: [
          {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33]
          },
          {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13]
          }
        ],
          chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Average High & Low Temperature',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart5"), options);
        chart.render();
/***********************/
 var options = {
          series: [{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14]
        }, {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8]
        }],
          chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart6"), options);
        chart.render();
/**************************/
 var options = {
          series: [
          {
            name: "",
            data: [200, 330, 548, 740, 880, 990, 1100, 1380],
          },
        ],
          chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            distributed: true,
            barHeight: '80%',
            isFunnel: true,
          },
        },
        colors: [
          '#F44F5E',
          '#E55A89',
          '#D863B1',
          '#CA6CD8',
          '#B57BED',
          '#8D95EB',
          '#62ACEA',
          '#4BC3E6',
        ],
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] 
          },
          dropShadow: {
            enabled: true,
          },
        },
        title: {
          text: 'Pyramid Chart',
          align: 'middle',
        },
        xaxis: {
          categories: ['Sweets', 'Processed Foods', 'Healthy Fats', 'Meat', 'Beans & Legumes', 'Dairy', 'Fruits & Vegetables', 'Grains'],
        },
        legend: {
          show: false,
        },
        };

        var chart = new ApexCharts(document.querySelector("#chart7"), options);
        chart.render();
/*******************/
 var options = {
          series: [44, 55, 13, 43, 22],
          chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart8"), options);
        chart.render();

/*******************/
   var options = {
          series: [44, 55, 41, 17, 15],
          chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart9"), options);
        chart.render();

/****************/
  var options = {
          series: [44, 55, 41, 17, 15],
          chart: {
          width: 380,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
       
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart10"), options);
        chart.render();

/*********************/
 var options = {
          series: [{
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20],
        }, {
          name: 'Series 2',
          data: [20, 30, 40, 80, 20, 80],
        }, {
          name: 'Series 3',
          data: [44, 76, 78, 13, 43, 10],
        }],
          chart: {
          height: 350,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ['2011', '2012', '2013', '2014', '2015', '2016']
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart11"), options);
        chart.render();