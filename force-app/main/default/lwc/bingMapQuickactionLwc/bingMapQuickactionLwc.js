import { LightningElement } from 'lwc';

export default class BingMapQuickactionLwc extends LightningElement {

    connectedCallback(){

        var map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'AslhgiiyIM-0vSCrTMx1Bk7foi7mWsZ1pWNf19f-HoLB3P_l4-eCFArTV8nd1MuW',
            center: new Microsoft.Maps.Location(20.24319277555409,  85.7725424975398),
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            zoom: 10
        });
    }
}