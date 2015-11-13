(function (window, angular) {
    'use strict';

    angular
        .module('ncarb.services.common')
        .service('enumService', enumService);
        
    function enumService() {
        var professionalStatus = decorate([
            { value: 'Principal', text: 'Principal' },
            { value: 'CorporateOfficer', text: 'Corporate Officer' },
            { value: 'Employee', text: 'Employee' },
            { value: 'Other', text: 'Other' }
        ]);
        
        var phoneTypes = decorate([
            { value: 'Cell', text: 'Cell' },
            { value: 'Home', text: 'Home' },
            { value: 'Work', text: 'Work' }
        ]);
        
        var salutations = decorate([
            { value: 'mr', text: 'Mr.' },
            { value: 'ms', text: 'Ms.' },
            { value: 'mrs', text: 'Mrs.' },
            { value: 'miss', text: 'Miss' },
            { value: 'dr', text: 'Dr.' }
        ]);

        var suffixes = decorate([
            { value: 'junior', text: 'Jr.' },
            { value: 'senior', text: 'Sr.' },
            { value: 'second', text: 'II' },
            { value: 'third', text: 'III' },
            { value: 'fourth', text: 'IV' },
            { value: 'fifth', text: 'V' }
        ]);

        var genders = decorate([
            { value: 'male', text: 'Male' },
            { value: 'female', text: 'Female' },
            { value: "", text: 'Not indicated' }
        ]);
        
        function decorate(textValueList) {
            textValueList.keys = [];
            textValueList.text = {};
            angular.forEach(textValueList, function(item) {
                textValueList.keys.push(item.value);
                textValueList.text[item.value] = item.text;
            });
            return textValueList;
        }
        
        return {
            decorate: decorate,
            professionalStatus: professionalStatus,
            phoneTypes: phoneTypes,
            salutations: salutations,
            suffixes: suffixes,
            genders: genders
        };

    }
})(window, window.angular);