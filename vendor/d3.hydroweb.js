var localeFormatter = d3.locale({
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['$', ''],
  dateTime: '%a %b %e %X %Y',
  date: '%m/%d/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Sept',
    'Oct',
    'Nov',
    'Déc',
  ],
  shortMonths: [
    'Janv',
    'Févr',
    'Mars',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aout',
    'Sept',
    'Oct',
    'Nov',
    'Déc',
  ],
})

var tickFormat = localeFormatter.timeFormat.multi([
  [
    '%H:%M',
    function (d) {
      return d.getMinutes()
    },
  ],
  [
    '%H:%M',
    function (d) {
      return d.getHours()
    },
  ],
  [
    '%a %d',
    function (d) {
      return d.getDay() && d.getDate() != 1
    },
  ],
  [
    '%b %d',
    function (d) {
      return d.getDate() != 1
    },
  ],
  [
    '%B',
    function (d) {
      return d.getMonth()
    },
  ],
  [
    '%Y',
    function () {
      return true
    },
  ],
])

Date.prototype.yyyymmdd = function () {
  var yyyy = this.getFullYear().toString()
  var mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
  var dd = this.getDate().toString()

  return (
    yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
  )
}

Date.prototype.yyyymmddhhmmss = function () {
  var hh = this.getHours().toString()
  var mm = this.getMinutes().toString()
  //       var ss  = this.getSeconds().toString();

  return (
    this.yyyymmdd() +
    ' ' +
    (hh[1] ? hh : '0' + hh[0]) +
    ':' +
    (mm[1] ? mm : '0' + mm[0]) +
    ' UTC'
  )
  //		+ ':' + (ss[1] ? ss : "0" + ss[0])
}

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days)
  return dat
}

Date.prototype.clone = function () {
  return new Date(this.getTime())
}

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h)
  return this
}

Date.prototype.addMinutes = function (minutes) {
  this.setMinutes(this.getMinutes() + minutes)
  return this
}

Date.prototype.addSeconds = function (seconds) {
  this.setSeconds(this.getSeconds() + seconds)
  return this
}

/*
 * D3.js extended functions
 */
d3.selection.prototype.first = function () {
  return d3.select(this[0][0])
}

d3.selection.prototype.last = function () {
  var last = this.size() - 1
  return d3.select(this[0][last])
}

Chart = function (options) {
  var margin = { top: 10, right: 20, bottom: 100, left: 80 }
  var margin2 = { top: 430, right: 20, bottom: 20, left: 80 }
  var width = 900 - margin.left - margin.right
  var height = 500 - margin.top - margin.bottom
  var height2 = 500 - margin2.top - margin2.bottom

  // Chart's data
  this.data = []

  var series = []

  var self = this

  var svg = null
  var brush = null

  var setErrorBar = true

  // HTML input date controlers
  this.inputStartDate = null
  this.inputEndDate = null

  this.startDate = null
  this.endDate = null
  this.size = 0

  var x_title = ''
  var y_title = ''

  // Focus chart
  var focus = null
  var focusHover = null

  // Context chart
  var context = null

  // Options arguments
  if (options != undefined) {
    if (typeof options === 'object') {
      /*
       * Height property
       */
      if (options.hasOwnProperty('height')) {
        if (
          margin2.top > options.height ||
          options.height - margin2.top - margin2.bottom > 50
        ) {
          margin2.top = options.height - 50 - margin2.bottom
        }
        height = options.height - margin.top - margin.bottom
        height2 = options.height - margin2.top - margin2.bottom
      }
      /*
       * Width property
       */
      if (options.hasOwnProperty('width')) {
        width = options.width - margin.left - margin.right
      }

      /*
       * RenderTo property
       * sets container where draw chart
       */
      if (options.hasOwnProperty('renderTo')) {
        if ($(options.renderTo).length > 0) {
          this.container = d3.select(options.renderTo)
        }
      }
      /*
       * X title property
       */
      if (options.hasOwnProperty('x_title')) {
        x_title = options.x_title
      }
      /*
       * Y title property
       */
      if (options.hasOwnProperty('y_title')) {
        y_title = options.y_title
      }
    }
  }

  var clip_id
  // Format dates
  var format = d3.time.format('%Y-%m-%d')

  // X scale
  var xScale = d3.time.scale().range([0, width]),
    yScale = d3.scale.linear().range([height, 0 /*height * 0.05*/]),
    x2Scale = d3.time.scale().range([0, width]),
    y2Scale = d3.scale.linear().range([height2, 0])

  // Main chart axis
  // X axis
  var xAxis = d3.svg
    .axis()
    .scale(xScale)
    .tickSize(6, 0)
    .orient('bottom')
    .tickFormat(tickFormat)

  // Y axis
  var yAxis = d3.svg.axis().scale(yScale).tickSize(width).orient('right')
  var yAxis_ = d3.svg.axis().scale(yScale).tickSize(6, 0).orient('left')

  // Slider chart axis
  // X axis
  var xAxis2 = d3.svg
    .axis()
    .scale(x2Scale)
    .orient('bottom')
    .tickFormat(tickFormat)
  // Y axis
  var yAxis2 = d3.svg.axis().scale(y2Scale).orient('left')

  // Chart line
  var line = d3.svg
    .line()
    .interpolate('monotone')
    .x(function (d) {
      return xScale(d.date)
    })
    .y(function (d) {
      return yScale(d.close)
    })

  var line2 = d3.svg
    .line()
    .x(function (d) {
      return x2Scale(d.date)
    })
    .y(function (d) {
      return y2Scale(d.close)
    })

  // returns data
  this.getData = function () {
    return this.data
  }

  var param = 'h'

  // reads JSON data
  this.read = function (json, indexParam) {
    // Chart's data
    var values = []

    // Saves start date and end date
    this.size = json.dates.length
    this.startDate = json.dates[0]
    this.endDate = json.dates[this.size - 1]
    this.total = 0

    var hauteurs = []
    for (var i = 0; i < this.size; i++) {
      hauteurs[i] =
        json[param][i].length === 2 ? json[param][i][0] : json[param][i]
      this.total += hauteurs[i]
    }
    var median = this.total / this.size
    hauteurs.sort()
    var decilMin = Math.floor(this.size * 0.1) - 1
    decilMin = hauteurs[decilMin]
    var decilMax = Math.floor(this.size * 0.9) - 1
    decilMax = hauteurs[decilMax]

    param = indexParam != undefined ? indexParam : param

    // Read data
    if (json[param] != null) {
      $(json.dates).each(function (index) {
        var yValue =
          json[param][index].length === 2
            ? json[param][index][0]
            : json[param][index]
        if (yValue != 9999.999) {
          var yError =
            json[param][index].length === 2 && json[param][index][1] != 9999.999
              ? json[param][index][1]
              : 0
          var yUncert =
            json[param][index].length === 2 ? json[param][index][1] : 9999.999
          values.push({
            date: format.parse(json.dates[index]),
            close: yValue,
            yError: yError,
            yUncert: yUncert,
            yMedian: median,
            yDecilMax: decilMax,
            yDecilMin: decilMin,
          })
        }
      })
    }

    this.data = values
    yDomainLimimts.min1 = d3.min(this.data, function (d) {
      return d.close - d.yError
    })
    yDomainLimimts.max1 = d3.max(this.data, function (d) {
      return d.close + d.yError
    })
    return this
  }

  var domain = null
  var yDomain = null
  var xDomain = null

  var yDomainLimimts = {
    min1: Number.MAX_SAFE_INTEGER,
    max1: -Number.MAX_SAFE_INTEGER,
    min2: Number.MAX_SAFE_INTEGER,
    max2: -Number.MAX_SAFE_INTEGER,
  }

  var MIN_DATE = '1980/01/01 00:00'
  var MAX_DATE = '2050/01/01 00:00'

  var xDomainLimimts = {
    min1: MAX_DATE,
    max1: MIN_DATE,
    min2: MAX_DATE,
    max2: MIN_DATE,
  }

  // draws chart line and error bars
  this.draw = function (redraw) {
    // SVG container

    svg =
      svg ||
      this.container
        .append('svg')
        .attr('width', '100%')
        .attr('height', height + margin.top + margin.bottom)

    // X axis domain
    /*DEM : NaN values : 9999.999
    domain = d3.extent(data, function(d) { return d.date; });
    */

    this.scaleYDomain()
    this.scaleXDomain()

    clip_id = 'clip_' + this.container[0][0].id

    d3.select('defs').remove()
    d3.select('.focus').remove()
    var defs = svg.append('defs')
    defs
      .append('clipPath')
      .attr('id', clip_id)
      .append('rect')
      .attr('width', width + 3)
      .attr('height', height)

    focus = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // draw X axis
    focus
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('x', width)
      .attr('dy', '-.81em')
      .style('text-anchor', 'end')
      .text(x_title)
      .attr('class', 'axis_title')

    // draw Y axis
    focus
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis)
      .call(customAxis)

    focus
      .append('g')
      .attr('class', 'yaxis_left')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis_)
      .append('svg:text')
      .attr('x', -200)
      .attr('y', -60)
      .attr('dy', '.1em')
      .attr('transform', 'rotate(-90)')
      .text(y_title)
      .attr('class', 'axis_title')

    /*
     * Draw chart line
     */
    /*
    focus
      .append('path')
      .datum(this.data)
      .attr('class', 'medianLine')
      .attr('d', medianLine)
      .style('clip-path', 'url(#' + clip_id + ')')

    focus
      .append('path')
      .datum(this.data)
      .attr('class', 'decilMax')
      .attr('d', decilMax)
      .style('clip-path', 'url(#' + clip_id + ')')

    focus
      .append('path')
      .datum(this.data)
      .attr('class', 'decilMin')
      .attr('d', decilMin)
      .style('clip-path', 'url(#' + clip_id + ')')
*/

    focus
      .append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', line)
      .style('clip-path', 'url(#' + clip_id + ')')

    return this
  }

  this.addTooltip = function (keys) {
    // hover tooltip + circle
    focusHover = focus
      .append('g')
      .attr('class', 'focus-hover')
      .style('display', 'none')

    focusHover.append('svg:circle').attr('r', 6)

    focusHover
      .append('rect')
      .attr('class', 'tooltip-hover')
      .attr('width', 130)
      .attr('height', 50 + 18 * (keys?.length || 0))
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 4)
      .attr('ry', 4)

    focusHover
      .append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 18)
      .attr('y', -2)
    focusHover
      .append('text')
      .attr('class', 'tooltip-flow')
      .attr('x', 18)
      .attr('y', 16)

    keys.forEach((key, index) => {
      focusHover
        .append('text')
        .attr('class', `tooltip-${key}`)
        .attr('x', 18)
        .attr('y', 16 + 18 * (index + 1))
    })

    focus
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function () {
        focusHover.style('display', null)
      })
      .on('mouseout', function () {
        focusHover.style('display', 'none')
      })
      .on('mousemove', mousemove)

    var bisectDate = d3.bisector(function (d) {
      return d.date
    }).left

    var data = this.data

    function mousemove() {
      var x0 = xScale.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i]
      if (d0 && d1) {
        var d = x0 - d0.date > d1.date - x0 ? d1 : d0
        focusHover.attr(
          'transform',
          'translate(' + xScale(d.date) + ',' + yScale(d.close) + ')'
        )
        focus.select('.tooltip-date').text(d.date.toLocaleDateString())
        focus.select('.tooltip-flow').text('flow: ' + Math.round(d.close))
        keys.forEach((key) =>
          focus.select(`.tooltip-${key}`).text(`${key}: ${Math.round(d[key])}`)
        )
      }
    }
  }

  // Add selection control
  this.addControl = function () {
    // check if context exists
    if (!focus || context) {
      return this
    }

    /* DEM : NaN values : 9999.999 */
    if (this.size <= 1) {
      $('#startDate').val(domain[0].yyyymmdd())
      $('#endDate').val(domain[1].yyyymmdd())
      document.getElementById('startDate').disabled = true
      document.getElementById('endDate').disabled = true
      svg.style('height', '455px')
      return this
    }

    // Brush control
    x2Scale.domain(domain)
    y2Scale.domain(yScale.domain())

    context = svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

    // draw chart
    context
      .append('path')
      .datum(this.data)
      .attr('class', 'line2')
      .attr('d', line2)
      .style('clip-path', 'url(#' + clip_id + ')')

    // Draw X axis
    context
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2)

    // draw y axis
    context
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate( 0, 0)')
      .call(yAxis2)

    // Brush control
    brush = d3.svg.brush().x(x2Scale)

    brush.on('brush', brushed.bind(this))
    context
      .append('g')
      .attr('id', 'brush_' + this.container[0][0].id)
      .attr('class', 'x brush')
      .call(brush)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', height2 + 7)

    var charts = [this] // fix console error purpose
    brush.on('brushend', function () {
      var d = brush.empty()
        ? [new Date(self.startDate), new Date(self.endDate)]
        : brush.extent() //xScale.domain();
      if (charts) {
        for (var i = 0; i < charts.length; i++) {
          if (self.id != charts[i].id) {
            // Update the time range for the other panels
            charts[i].update(d[0], d[1])
          }
        }
      }
    })

    // updates input fields start date and end date
    $('#startDate').val(
      brush.empty() ? domain[0].yyyymmdd() : brush.extent()[0].yyyymmdd()
    )
    $('#endDate').val(
      brush.empty() ? domain[1].yyyymmdd() : brush.extent()[1].yyyymmdd()
    )

    $('#startDate')[0].min = domain[0].yyyymmdd()
    $('#startDate')[0].max = domain[1].yyyymmdd()

    $('#endDate')[0].min = domain[0].yyyymmdd()
    $('#endDate')[0].max = domain[1].yyyymmdd()

    $('#startDate')
      .change(function () {
        $.each(charts, function (index) {
          charts[index].update(
            $('#startDate').val() + 'T00:00:00',
            $('#endDate').val() + 'T23:59:59'
          )
        })
      })
      .bind('enterKey', function (e) {
        $.each(charts, function (index) {
          charts[index].update(
            $('#startDate').val() + 'T00:00:00',
            $('#endDate').val() + 'T23:59:59'
          )
        })
      })
    $('#endDate')
      .change(function () {
        $.each(charts, function (index) {
          charts[index].update(
            $('#startDate').val() + 'T00:00:00',
            $('#endDate').val() + 'T23:59:59'
          )
        })
      })
      .bind('enterKey', function (e) {
        $.each(charts, function (index) {
          charts[index].update(
            $('#startDate').val() + 'T00:00:00',
            $('#endDate').val() + 'T23:59:59'
          )
        })
      })
    self.b = brush // TODO : to remove : only to test brush
    // return chart
    return this
  }

  // function which customize axis
  var customAxis = function (g) {
    g.selectAll('text').attr('x', -35).attr('dy', 2)
  }

  var errorBar = function () {
    //TODO
    //- Think of an additional way to represent error bars, maybe just the orthognal case (i.e. use width not height)
    //- Does ordinal scale even make sense here?  May need to remove.
    var size = 5,
      xError = function (d) {
        return exists(d[0].yError)
      },
      yError = function (d) {
        return exists(d[1].yError)
      },
      errormarker = null, //points will inherit from g.dataset
      xValue = function (d) {
        return d[0].date === undefined ? d[0] : d[0].date
      },
      yValue = function (d) {
        return d[1].date === undefined ? d[1] + 10 : d[1].date + 10
      },
      // xMedian = function(d) {return (d[1].date === undefined)?d[1]:d[1].date;},
      // yMedian = function(d) {return (d[1].date === undefined)?d[1]+10:d[1].date+10;},
      oldXScale, //probably can give these smarter defaults
      oldYScale,
      xScale,
      yScale

    function marks(datapoints) {
      datapoints.each(function (d, i) {
        var g = d3.select(this),
          //Use color/errormarker defined.
          errormarker = errormarker || exists(g.datum().errormarker)

        //Error
        var err = g.selectAll('.err').data(function (d) {
            return !(xError(d) === null) || !(yError(d) === null) ? [d] : []
          }, xValue),
          errEnter,
          errExit,
          errUpdate

        switch (errormarker) {
          case null: {
            errEnter = err.enter().append('path').attr('class', 'err')
            ;(errExit = d3.transition(err.exit()).remove()),
              (errUpdate = d3.transition(err)),
              (errTransform = function (selection, a, b) {
                selection.attr('d', function (d) {
                  var h =
                      yError(d) === null
                        ? [-size, size]
                        : [
                            b(yValue(d) - yError(d)) - b(yValue(d)),
                            b(yValue(d) + yError(d)) - b(yValue(d)),
                          ],
                    w =
                      xError(d) === null
                        ? [-size, size]
                        : [
                            a(xValue(d) - xError(d)) - a(xValue(d)),
                            a(xValue(d) + xError(d)) - a(xValue(d)),
                          ]

                  return (
                    'M 0,' +
                    h[0] +
                    ' L 0,' +
                    h[1] +
                    ' M ' +
                    w[0] +
                    ',' +
                    h[1] +
                    ' L ' +
                    w[1] +
                    ',' +
                    h[1] +
                    ' M ' +
                    w[0] +
                    ',' +
                    h[0] +
                    ' L ' +
                    w[1] +
                    ',' +
                    h[0]
                  )
                })
              })
            break
          }
          case errormarker: {
            //Normalize custom errors to 1px in their definition. Will be scaled back up here by size.
            err.append('use').attr('class', marker + ' err')
            err
              .selectAll('use')
              .attr('xlink:href', '#' + marker)
              .attr('transform', function (d) {
                return 'scale(' + xError(d) + ',' + yError(d) + ')'
              })
            break
          }
        }

        // For quantitative scales:
        // - enter new ticks from the old scale
        // - exit old ticks to the new scale
        if (xScale.ticks) {
          errEnter.call(errTransform, oldXScale, oldYScale)
          errUpdate.call(errTransform, xScale, yScale)
          errExit.call(errTransform, xScale, yScale)
        }

        // For ordinal scales:
        // - any entering ticks are undefined in the old scale
        // - any exiting ticks are undefined in the new scale
        // Therefore, we only need to transition updating ticks.
        else {
          var dx = xScale.rangeBand() / 2,
            x = function (d) {
              return xScale(d) + dx
            }
          var dy = yScale.rangeBand() / 2,
            y = function (d) {
              return yScale(d) + dy
            }
          errEnter.call(errTransform, x, y)
          errUpdate.call(errTransform, x, y)
        }
      })
    }

    marks.size = function (_) {
      if (!arguments.length) return size
      size = _
      return marks
    }

    marks.xError = function (_) {
      if (!arguments.length) return xError
      xError = _
      return marks
    }

    marks.yError = function (_) {
      if (!arguments.length) return yError
      yError = _
      return marks
    }

    marks.oldXScale = function (_) {
      if (!arguments.length) return oldXScale
      oldXScale = _
      return marks
    }

    marks.oldYScale = function (_) {
      if (!arguments.length) return oldYScale
      oldYScale = _
      return marks
    }

    marks.xScale = function (_) {
      if (!arguments.length) return xScale
      xScale = _
      return marks
    }

    marks.yScale = function (_) {
      if (!arguments.length) return yScale
      yScale = _
      return marks
    }

    marks.xValue = function (_) {
      if (!arguments.length) return xValue
      xValue = _
      return marks
    }

    marks.yValue = function (_) {
      if (!arguments.length) return yValue
      yValue = _
      return marks
    }

    marks.errormarker = function (_) {
      if (!arguments.length) return errormarker
      errormarker = _
      return marks
    }

    marks.xMedian = function (_) {
      if (!arguments.length) return xMedian
      errormarker = _
      return marks
    }
    marks.yMedian = function (_) {
      if (!arguments.length) return yMedian
      errormarker = _
      return marks
    }

    return marks
  }

  function exists(a) {
    return a === undefined ? null : a
  }

  var brushed = function () {
    /*
     * sets domain to display
     */
    xScale.domain(brush.empty() ? domain : brush.extent())

    if (
      xScale.domain()[0].getTime() == new Date(self.startDate).getTime() &&
      xScale.domain()[1].getTime() == new Date(self.endDate).getTime()
    ) {
      xScale.nice()
    }

    /*
     * updates chart to X domain
     */
    focus.select('.line').attr('d', line)

    this.redrawSeries()

    /*
     * updates X axis to X domain
     */
    focus.select('.x.axis').call(xAxis)

    // updates inputs date time
    //$("#startDate").val(xScale.domain()[0].yyyymmdd());
    //("#endDate").val(xScale.domain()[1].yyyymmdd());
    $('#startDate').val(
      brush.empty()
        ? x2Scale.domain()[0].yyyymmdd()
        : brush.extent()[0].yyyymmdd()
    )
    $('#endDate').val(
      brush.empty()
        ? x2Scale.domain()[1].yyyymmdd()
        : brush.extent()[1].yyyymmdd()
    )
  }

  this.update = function (startDate, endDate) {
    if (!isDateValid(startDate)) {
      startDate = brush.empty()
        ? x2Scale.domain()[0].yyyymmdd()
        : brush.extent()[0].yyyymmdd()
      $('#startDate').val(
        brush.empty()
          ? x2Scale.domain()[0].yyyymmdd()
          : brush.extent()[0].yyyymmdd()
      )
    }

    if (!isDateValid(endDate)) {
      endDate = brush.empty()
        ? x2Scale.domain()[1].yyyymmdd()
        : brush.extent()[1].yyyymmdd()
      $('#endDate').val(
        brush.empty()
          ? x2Scale.domain()[1].yyyymmdd()
          : brush.extent()[1].yyyymmdd()
      )
    }

    /*
     * Updates brush selector
     */
    var sd = new Date(startDate)
    var ed = new Date(endDate)

    if (sd.getTime() < new Date(this.startDate).getTime()) {
      sd = brush.empty() ? x2Scale.domain()[0] : brush.extent()[0]
      //			sd = new Date(sd.getTime() - sd.getTimezoneOffset() * 60000);
    }

    if (ed.getTime() > new Date(this.endDate).getTime()) {
      ed = brush.empty() ? x2Scale.domain()[1] : brush.extent()[1]
      //			ed = new Date(ed.getTime() - ed.getTimezoneOffset() * 60000);
    }

    if (
      sd.getTime() > ed.getTime() &&
      sd.getTime() != x2Scale.domain()[0].getTime()
    ) {
      sd = brush.empty() ? x2Scale.domain()[0] : brush.extent()[0]
      //			sd = new Date(sd.getTime() - sd.getTimezoneOffset() * 60000);
    }

    if (
      ed.getTime() < sd.getTime() &&
      ed.getTime() != x2Scale.domain()[1].getTime()
    ) {
      ed = brush.empty() ? x2Scale.domain()[1] : brush.extent()[1]
      //			ed = new Date(ed.getTime() - ed.getTimezoneOffset() * 60000);
    }

    //		sd = new Date(sd.getTime() + sd.getTimezoneOffset() * 60000);
    //		ed = new Date(ed.getTime() + ed.getTimezoneOffset() * 60000);

    $('#startDate').val(sd.yyyymmdd())
    $('#endDate').val(ed.yyyymmdd())

    var xScaleDomain = [sd, ed]

    if (
      sd.getTime() == new Date(this.startDate).getTime() &&
      ed.getTime() == new Date(this.endDate).getTime()
    ) {
      sd = null
      ed = null
    }
    /*
     * define our brush extent to be begin and end of the year
     */
    brush.extent([sd, ed])

    // now draw the brush to match our extent
    // use transition to slow it down so we can see what is happening
    // remove transition so just d3.select(".brush") to just draw
    brush(context.select('.brush'))

    /*
     * sets domain to display
     */
    xScale.domain(xScaleDomain)
    //xScale.nice();

    if (
      xScaleDomain[0].getTime() == new Date(self.startDate).getTime() &&
      xScaleDomain[1].getTime() == new Date(self.endDate).getTime()
    ) {
      xScale.nice()
    }

    /*
     * updates chart to X domain
     */
    focus
      .select('.line')
      .attr('d', line)
      .style('clip-path', 'url(#' + clip_id + ')')

    this.redrawSeries()
    focus.select('.x.axis').call(xAxis)
  }

  this.resize = function () {
    console.log('resize')
    // update width
    width = $('#chart').width()
    width = width - margin.left - margin.right

    // resize the chart
    xScale.range([0, width])
    x2Scale.range([0, width])

    xAxis.scale(xScale)
    xAxis2.scale(x2Scale)
    /*d3.select(chart.node().parentNode)
        .style('height', (y.rangeExtent()[1] + margin.top + margin.bottom) + 'px')
        .style('width', (width + margin.left + margin.right) + 'px');*/

    // updates chart to X domain
    focus
      .select('.line')
      .attr('d', line)
      .style('clip-path', 'url(#' + clip_id + ')')

    this.redrawSeries()
    context
      .select('.line2')
      .attr('d', line2)
      .style('clip-path', 'url(#' + clip_id + ')')

    context.select('x brush').call(brush)

    // updates X axis to X domain
    focus.select('.x.axis').call(xAxis)
    context.select('.x.axis').call(xAxis2)
  }

  this.getDomain = function () {
    var interval = !brush || brush.empty() ? domain : brush.extent()
    return [interval[0].toISOString(), interval[1].toISOString()]
  }

  var isDateValid = function (strDate) {
    var timestamp = Date.parse(strDate)
    return !isNaN(timestamp)
  }

  this.destroy = function () {
    $(this.container[0]).empty()
  }

  this.addSerie = function (serie, dates) {
    const { type, name, className } = serie
    let svg, data
    switch (type) {
      case 'range':
        const { top, bottom } = serie
        data = dates.map((_, index) => {
          this.data[index][name] = top[index] - this.data[index].close
          return {
            date: format.parse(dates[index]),
            top: top[index],
            bottom: bottom[index],
          }
        })
        svg = d3.svg
          .area()
          .interpolate('monotone')
          .x(function (d) {
            return xScale(d.date)
          })
          .y0(function (d) {
            return yScale(d.bottom)
          })
          .y1(function (d) {
            return yScale(d.top)
          })
        break
      case 'line':
        data = dates.map((value, index) => {
          const data = serie.data[index]
          this.data[index][name] = data
          return {
            date: format.parse(dates[index]),
            data,
          }
        })
        svg = d3.svg
          .line()
          .x(function (d) {
            return xScale(d.date)
          })
          .y(function (d) {
            return yScale(d.data)
          })
        break
    }

    series = {
      ...series,
      [name]: {
        ...serie,
        svg,
      },
    }
    focus
      .append('path')
      .datum(data)
      .attr('class', className)
      .attr('d', svg)
      .style('clip-path', 'url(#' + clip_id + ')')
  }

  this.addSecondLine = function (slResponse) {
    var slValues = slResponse.h
    var slDates = slResponse.dates

    var slData = []
    slValues.forEach(function (value, index) {
      slData.push({
        date: format.parse(slDates[index]),
        secondLine: value,
      })
    })

    data.forEach(function (value, index) {
      value.secondLine = slValues[index]
    })

    var slYScale = d3.scale.linear().range([height, 0])
    var slYAxis = d3.svg.axis().scale(slYScale).orient('right')
    var slYDomain = [
      d3.min(data, function (d) {
        return d.secondLine
      }),
      d3.max(data, function (d) {
        return d.secondLine
      }),
    ]

    slYScale.domain(slYDomain)

    xDomainLimimts.min2 = slDates[0]
    xDomainLimimts.max2 = slDates[slDates.length - 1]

    this.secondLine = d3.svg
      .line()
      .x(function (d) {
        return xScale(d.date)
      })
      .y(function (d) {
        return slYScale(d.secondLine)
      })

    this.draw(true)
    this.addControl()

    focus
      .append('g')
      .attr('class', 'yaxis_right')
      .attr('transform', 'translate(' + width + ' ,0)')
      .call(slYAxis)

    focus
      .append('path')
      .datum(slData)
      .attr('class', 'secondLine')
      .attr('d', this.secondLine)
      .style('clip-path', 'url(#' + clip_id + ')')
  }

  this.scaleYDomain = function () {
    yDomain = [
      Math.min(yDomainLimimts.min1, yDomainLimimts.min2),
      Math.max(yDomainLimimts.max1, yDomainLimimts.max2),
    ]
    if (yDomain[0] == yDomain[1]) {
      yDomain[0] -= 1
      yDomain[1] += 1
    }

    // Y axis domain (taking into account standard deviation)
    yScale.domain(yDomain)
    yScale.nice()
  }

  this.scaleXDomain = function () {
    xDomainLimimts.min1 = this.startDate
    xDomainLimimts.max1 = this.endDate
    xDomain = [
      new Date(
        Math.min(new Date(xDomainLimimts.min1), new Date(xDomainLimimts.min2))
      ),
      new Date(
        Math.max(new Date(xDomainLimimts.max1), new Date(xDomainLimimts.max2))
      ),
    ]
    domain = xDomain

    // Y axis domain (taking into account standard deviation)
    xScale.domain(xDomain)
    // xScale.nice();
  }

  this.removeSecondLine = function (fullRemoval) {
    d3.select('path.secondLine').remove()
    d3.select('g.yaxis_right').remove()
    if (context) {
      context.remove()
      context = null
    }
    yDomainLimimts.min2 = Number.MAX_SAFE_INTEGER
    yDomainLimimts.max2 = -Number.MAX_SAFE_INTEGER

    xDomainLimimts.min2 = MAX_DATE
    xDomainLimimts.max2 = MIN_DATE

    if (fullRemoval) {
      this.draw(true)
      this.addControl()
    }
  }

  this.redrawSeries = function () {
    Object.keys(series).forEach((name) => {
      const serie = series[name]
      focus
        .select(`.${serie.className}`)
        .attr('d', serie.svg)
        .style('clip-path', 'url(#' + clip_id + ')')
    })
  }
}
