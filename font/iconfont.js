;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shouji" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M702.691575 60.945047 321.292052 60.945047c-57.46069 0-104.018052 46.591131-104.018052 104.018052l0 693.454702c0 57.426921 46.558385 104.019075 104.018052 104.019075l381.400546 0c57.46069 0 104.018052-46.592155 104.018052-104.019075L806.71065 164.963099C806.71065 107.537202 760.153288 60.945047 702.691575 60.945047zM477.318618 95.617731l69.346391 0c9.582239 0 17.33583 7.754614 17.33583 17.33583 0 9.582239-7.753591 17.336854-17.33583 17.336854l-69.346391 0c-9.581216 0-17.33583-7.754614-17.33583-17.336854C459.982788 103.372346 467.737402 95.617731 477.318618 95.617731zM511.992325 920.077116c-24.481577 0-44.322461-19.840884-44.322461-44.322461 0-24.480554 19.841907-44.322461 44.322461-44.322461 24.480554 0 44.322461 19.84293 44.322461 44.322461C556.31581 900.237255 536.472879 920.077116 511.992325 920.077116zM737.364259 771.736603c0 9.582239-7.753591 17.33583-17.33583 17.33583L303.955198 789.072433c-9.582239 0-17.336854-7.753591-17.336854-17.33583L286.618345 182.299953c0-9.582239 7.754614-17.33583 17.336854-17.33583l416.07323 0c9.582239 0 17.33583 7.754614 17.33583 17.33583L737.364259 771.736603z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)