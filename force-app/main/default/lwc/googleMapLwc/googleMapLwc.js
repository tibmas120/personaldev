import { LightningElement,api,wire } from 'lwc';
import getLocation from '@salesforce/apex/MapController.getLocation';

export default class GoogleMapLwc extends LightningElement {

    @api recordId;
    mapMarkers=[];
    
    @wire(getLocation, {locId: '$recordId'})
    wiredData({ error, data }) {
      if (data) {
        this.mapMarkers=[{
            location: {
                Latitude: data[0].Location__Latitude__s,
                Longitude:data[0].Location__Longitude__s 
            }
        }];
        console.log('Data', data);
      } else if (error) {
         console.error('Error:', error);
      }
    }
    

    /*connectedCallback(){
        console.log( "Record Id is " + this.recordId );
        this.mapMarkers=[{
            location: {
                Latitude: '20.24319277555409',
                Longitude:'85.7725424975398'
            }
        }];
    }*/
}