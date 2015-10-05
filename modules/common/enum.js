(function (window, angular) {
    'use strict';

    angular
        .module('ncarb.services.common')
        .service('enumService', enumService);
        
    function enumService() {
        var professionalStatus = [
            { value: 'Principal', text: 'Principal' },
            { value: 'CorporateOfficer', text: 'Corporate Officer' },
            { value: 'Employee', text: 'Employee' },
            { value: 'Other', text: 'Other' }
        ];
        
        var phoneTypes = [
            { value: 'Cell', text: 'Cell' },
            { value: 'Home', text: 'Home' },
            { value: 'Work', text: 'Work' }
        ];
        
        var salutations = [
            { value: 'mr', text: 'Mr.' },
            { value: 'ms', text: 'Ms.' },
            { value: 'mrs', text: 'Mrs.' },
            { value: 'miss', text: 'Miss' },
            { value: 'dr', text: 'Dr.' }
        ];

        var suffixes = [
            { value: 'junior', text: 'Jr.' },
            { value: 'senior', text: 'Sr.' },
            { value: 'second', text: 'II' },
            { value: 'third', text: 'III' },
            { value: 'fourth', text: 'IV' },
            { value: 'fifth', text: 'V' }
        ];

        var genders = [
            { value: 'male', text: 'Male' },
            { value: 'female', text: 'Female' },
            { value: "", text: 'Not indicated' }
        ];
        
        return {
            professionalStatus: professionalStatus,
            phoneTypes: phoneTypes,
            salutations: salutations,
            suffixes: suffixes,
            genders: genders
        };

    }
})(window, window.angular);