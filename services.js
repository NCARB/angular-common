(function() {
    'use strict'

    var module = angular.module('ncarb.services', ['oauth'])
      .service('ClaimService', ClaimService)
      .service('ClaimTypeFactory', ClaimTypeFactory)
      .service('StorageService', StorageService);
      

    ClaimService.$inject = ['StorageService', 'Profile', 'ClaimTypeFactory'];

    function ClaimService(StorageService, Profile, ClaimTypeFactory) {

      //cacheFactory
      var personId;
      var email;
      var fullName;

      var service = {
        getPersonId: getPersonId,
        getEmail: getEmail,
        getFullName: getFullName,
        getClaim: getClaim
      };

      return service;

      function getPersonId() {
        return personId || getClaim('personId');
      };

      function getEmail() {
        return email || getClaim('email');
      };

      function getFullName() {

        if (fullName) {
          return fullName;
        }

        var firstName = getClaim('givenName');
        var lastName = getClaim('surname');

        if (firstName && lastName) {
          return firstName + ' ' + lastName;
        }
      };

      function isStaff() {
        var staffId = getClaim('staffId');

        return !!staffId;
      }

      function getClaim(name) {

        var profile = Profile.get();

        if (!profile) {
          profile = StorageService.getItem('profile');
        }

        if (profile && name) {

          var type = getClaimType(name);

          if (type) {
            var claim = _.findWhere(profile, {
              type: type
            });

            if (claim) {
              return claim.value;
            }
          }
        }
      };

      function getClaimType(name) {

        if (!name) {
          return;
        }

        return ClaimTypeFactory[name] || ClaimTypeFactory.ncarb[name] || ClaimTypeFactory.microsoft[name];
      }
    }

    function ClaimTypeFactory() {

      var claimTypes = {
        actor: 'http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor',
        anonymous: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous',
        authentication: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticated',
        authorizationDecision: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authorizationdecision',
        country: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country',
        dateOfBirth: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth',
        denyOnlySid: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/denyonlysid',
        dns: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dns',
        email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
        gender: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender',
        givenName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
        hash: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/hash',
        homePhone: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/homephone',
        locality: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/locality',
        mobilePhone: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone',
        name: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
        nameIdentifier: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
        otherPhone: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/otherphone',
        postalCode: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode',
        rsa: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/rsa',
        sid: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid',
        spn: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/spn',
        stateOrProvince: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/stateorprovince',
        streetAddress: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/streetaddress',
        surname: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
        system: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/system',
        thumbprint: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/thumbprint',
        upn: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn',
        uri: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri',
        webpage: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/webpage',
        x500DistinguishedName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/x500distinguishedname'
      };

      claimTypes.microsoft = {
        authenticationInstant: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationinstant',
        authenticationMethod: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod',
        cookiePath: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/cookiepath',
        denyOnlyPrimaryGroupSid: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarygroupsid',
        denyOnlyPrimarySid: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarysid',
        denyOnlyWindowsDeviceGroup: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlywindowsdevicegroup',
        dsa: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/dsa',
        expiration: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration',
        expired: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/expired',
        windowsAccountName: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsaccountname',
        windowsDeviceClaim: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsdeviceclaim',
        windowsDeviceGroup: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsdevicegroup',
        windowsFqbnVersion: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsfqbnversion',
        windowsSubAuthority: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowssubauthority',
        windowsUserClaim: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsuserclaim',
        userData: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata',
        version: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/version',
        serialNumber: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber',
        primaryGroupSid: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/primarygroupsid',
        primarySid: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid',
        role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
        groupSid: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid',
        isPersistent: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent'
      };

      claimTypes.ncarb = {
        personId: 'http://identity.ncarb.org/claims/personid',
        staffId: 'http://identity.ncarb.org/claims/staffId'
      };

      return claimTypes;

    };

  StorageService.$inject = ['$localStorage'];

  function StorageService($localStorage) {
    var service = {
      reset: reset,
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem
    };

    return service;

    function reset() {
      $localStorage.$reset();
    }

    function setItem(key, value) {
      $localStorage[key] = value;
    }

    function getItem(key) {
      return $localStorage[key];
    }

    function removeItem(key) {
      delete $localStorage[key];
    }
  }

})();