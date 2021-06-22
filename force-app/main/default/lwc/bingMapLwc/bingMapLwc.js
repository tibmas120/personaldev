import { LightningElement, track } from 'lwc';

import getAddressByCoordinatesApex from '@salesforce/apex/BingMapProvider.getAddressByCoordinates';
import getCoordinatesByAddressApex from '@salesforce/apex/BingMapProvider.getCoordinatesByAddressJson';
import getDrivingDistanceApex from '@salesforce/apex/BingMapProvider.getDrivingDistanceJson';

export default class BingMapTest extends LightningElement {
    @track isLoading = false;

    // address by coordinates 
    @track latitude = 47.64054;
    @track longtitude = -122.12934;
    @track queryAddressResult;
    

    // coordinates by address
    @track addressLine = 'Microsoft Way';
    @track countryRegion = 'US'; 
    @track locality = 'Redmond'; 
    @track postalCode = '98052'; 
    @track queryCoordinatesResult;

    // driving distance
    @track fromLatitude = 47.64054;
    @track fromLongtitude = -122.12934;
    @track toLatitude = 37.779160067439079
    @track toLongtitude = -122.42004945874214;
    @track distanceUnit = 'mi'; //'km' or 'mi'
    @track queryDistanceResult;

    handleLatitudeChange(event) {
        this.latitude = event.target.value;
    }
    handleLongtitudeChange(event) {
        this.longtitude = event.target.value;
    }

    handleAddressLineChange(event) {
        this.addressLine = event.target.value;
    }
    handleCountryRegionChange(event) {
        this.countryRegion = event.target.value;
    }
    handleLocalityChange(event) {
        this.locality = event.target.value;
    }
    handlePostalCodeChange(event) {
        this.postalCode = event.target.value;
    }

    handleQueryAddressClick(event) {
        this.isLoading = true;
        this.queryAddressResult = '';
        const _this = this;

        getAddressByCoordinatesApex({'latitude': this.latitude, 'longtitude': this.longtitude})
            .then(response => {
                if (true === response.isSuccess) {
                    let data = response.responseData;
                    this.queryAddressResult = JSON.stringify(response, null, 2);
                    console.log("response.responseData=" + JSON.stringify(data));
                } else {
                    this.queryAddressResult = 'ERROR: ' + JSON.stringify(response.errorData);
                    console.log("response.errorData=" + JSON.stringify(response.errorData));
                }
                return this.queryAddressResult;
            })
            .catch(error => {
                const message = 'Error received: code' + error.errorCode + ', ' + 'message ' + error.body.message;
                this.queryAddressResult = message;
            })
            .finally(function() { _this.isLoading = false; });

    }

    handleQueryCoordinatesClick(event) {
        this.isLoading = true;
        this.queryCoordinatesResult = '';
        const _this = this;
        const address = {
                    'addressLine': this.addressLine, 
                    'countryRegion': this.countryRegion, 
                    'locality': this.locality, 
                    'postalCode': this.postalCode, 
                };

        getCoordinatesByAddressApex( { 'addressJson': JSON.stringify(address) })
            .then(response => {
                if (true === response.isSuccess) {
                    let data = response.responseData;
                    this.queryCoordinatesResult = JSON.stringify(response, null, 2);
                    console.log("response.responseData=" + JSON.stringify(data));
                } else {
                    this.queryCoordinatesResult = 'ERROR: ' + JSON.stringify(response.errorData);
                    console.log("response.errorData=" + JSON.stringify(response.errorData));
                }
                return this.queryCoordinatesResult;
            })
            .catch(error => {
                const message = 'Error received: code' + error.errorCode + ', ' + 'message ' + error.body.message;
                this.queryCoordinatesResult = message;
            })
            .finally(function() { _this.isLoading = false; });

    }

    handleDrivingDistanceInputChange(event) {
        let value = event.target.value;
        switch(event.target.label) {
            case 'fromLatitude':
                this.fromLatitude = value;
                break;
            case 'fromLongtitude':
                this.fromLongtitude = value;
                break;
            case 'toLatitude':
                this.toLatitude = value;
                break;
            case 'toLongtitude':
                this.toLongtitude = value;
                break;
            case 'distanceUnit':
                this.distanceUnit = value;
                break;
            default:
                // code block
        }
    }

    handleQueryDrivingDistanceClick(event) {
        this.isLoading = true;
        this.queryDistanceResult = '';
        const _this = this;
       
        const paramsJson = {
                'wayPoint0_latitude': Number(this.fromLatitude),
                'wayPoint0_longtitude': Number(this.fromLongtitude),
                'wayPoint1_latitude': Number(this.toLatitude),
                'wayPoint1_longtitude': Number(this.toLongtitude),
                'distanceUnit': this.distanceUnit
            };

        getDrivingDistanceApex( { 'paramsJson': JSON.stringify(paramsJson) })
            .then(response => {
                if (true === response.isSuccess) {
                    let data = response.responseData;
                    this.queryDistanceResult = JSON.stringify(response, null, 2);
                    console.log("response.responseData=" + JSON.stringify(data));
                } else {
                    this.queryDistanceResult = 'ERROR: ' + JSON.stringify(response.errorData);
                    console.log("response.errorData=" + JSON.stringify(response.errorData));
                }
                return this.queryDistanceResult;
            })
            .catch(error => {
                const message = 'Error received: code' + error.errorCode + ', ' + 'message ' + error.body.message;
                this.queryDistanceResult = message;
            })
            .finally(function() { _this.isLoading = false; });

    }
}