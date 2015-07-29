(function(m) {

   function getUrl(v, debug) {
      return (debug ? APPCONFIG.MOCK_URL : APPCONFIG.BASE_URL) + v + APPCONFIG.SUFFIX;
   }

   m.factory('urlHelper', function() {
      return function(urlData) {
         var k, v, rst = {},
            debug = window.location.href.indexOf('debug=true') > -1;

         if (typeof(urlData) === 'string') {
            return getUrl(urlData, debug);
         }
         for (k in urlData) {
            if (typeof(urlData[k]) === 'string')
               v = urlData[k];
            else if (urlData[k].length === 1)
               v = urlData[k][0];
            else
               v = debug ? urlData[k][1] : urlData[k][0];

            rst[k] = getUrl(v, debug);
         }
         return rst;
      };
   });
})(webapp);