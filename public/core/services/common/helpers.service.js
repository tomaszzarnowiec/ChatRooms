(function() {
    'use strict';

    angular
        .module('chatRoomsApp')
        .service('HelpersService', HelpersService);

    HelpersService.$inject = ['$http'];

    /* @ngInject */
    function HelpersService($http) {

            var srv = this;

            this.color = {
                info: '#5f99f5',
                success: '#34a853',
                warning: '#fbbc05',
                primary: '#4285f4',
                danger: '#ea4335'
            }

            this.isUndefinedOrNull = function(val){
                return angular.isUndefined(val) || val === null;
            }

            this.isAnyUndefined = function(arr){
                var is = false;

                if(!srv.isUndefinedOrNull(arr) && Array.isArray(arr)){
                    angular.forEach(arr, function(v,k){
                        is = srv.isUndefinedOrNull(v);
                    });
                } else {
                    console.error("Error! Not an Array provided for isAnyUndefined()");
                }

                return is;
            }

            this.countBrutto = function(netto){
                netto = parseFloat(netto);
                var brutto = netto + (netto * 23 / 100);
                brutto = brutto.toFixed(2);

                return brutto;
            }

            this.isEmptyObj = function(obj) {

                // null and undefined are "empty"
                if (obj == null) return true;

                // Assume if it has a length property with a non-zero value
                // that that property is correct.
                if (obj.length > 0)    return false;
                if (obj.length === 0)  return true;

                // Otherwise, does it have any properties of its own?
                // Note that this doesn't handle
                // toString and valueOf enumeration bugs in IE < 9
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) return false;
                }

                return true;
            },

            this.stringToBoolean = function(string){
                switch(string){
                    case "true": case "yes": case "1": return true;
                    case "false": case "no": case "0": case null: return false;
                    default: return Boolean(string);
                }
            },

            this.getCurrentDate = function(){
                var d = moment().format("YYYY-MM-DD");
                return d;
            },

            this.getCurrentTime = function(type){
                var dt = new Date();
                if(type == "full"){
                    var time = moment().format("HH:mm:ss");
                } else if (type == "small"){
                    var time = moment().format("HH:mm");
                } else {
                    var time = "00:00";
                }

                return time;
            }

            this.firstDayOfMonth = function(monthDate){
                // console.log(moment(monthDate, srv.dateFormat.month).format(srv.dateFormat.firstDayOfMonth));
                return moment(monthDate, srv.dateFormat.month).format(srv.dateFormat.firstDayOfMonth);
            }

            this.lastDayOfMonth = function(monthDate){
                // console.log(moment(monthDate, srv.dateFormat.month).endOf('month').format(srv.dateFormat.date));
                return moment(monthDate, srv.dateFormat.month).endOf('month').format(srv.dateFormat.date);
            }

            this.activeMonth = function(date) {
                return moment(date, srv.dateFormat.month).format(srv.dateFormat.humanizedMonth);
            }

            this.monthYearBefore = function(date) {
                return moment(date, srv.dateFormat.month).subtract(12, 'months').format(srv.dateFormat.month);
            }

            this.lastMonth = function(date) {
                return moment(date, srv.dateFormat.month).subtract(1, 'month').format(srv.dateFormat.humanizedMonth);
            }

            this.lastMonthDate = function(date) {
                return moment(date, srv.dateFormat.month).subtract(1, 'month').format(srv.dateFormat.month);
            }

            this.nextMonthDate = function(date) {
                return moment(date, srv.dateFormat.month).add(1, 'month').format(srv.dateFormat.month);
            }

            this.dateFormat = {
                firstDayOfMonth: 'YYYY-MM-01',
                date: 'YYYY-MM-DD',
                datetime: 'YYYY-MM-DD HH:mm',
                datetimeseconds: 'YYYY-MM-DD HH:mm:ss',
                time: 'HH:mm',
                month: 'YYYY-MM',
                humanizedMonth: 'MMMM YYYY'
            }

    }
})();
