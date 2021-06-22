public without sharing virtual class BingMapProvider {
    private static String apiEndpoint = 'https://dev.virtualearth.net/REST/v1/';
    private static String apiKey = 'AslhgiiyIM-0vSCrTMx1Bk7foi7mWsZ1pWNf19f-HoLB3P_l4-eCFArTV8nd1MuW';

    /**
     * @description
     * Given decimal Lat/Lon coordinates - try to get address details
     * makes a call like this:
     *  http://dev.virtualearth.net/REST/v1/Locations/47.64054,-122.12934?o=json&key={{BingMapsAPIKey}}
     *
     * @param latitude - Decimal Latitude, e.g. 47.64054
     * @param longtitude - Decimal Longitude, e.g. -122.12934
     *
     * @return Response 
     *          where: Response.responseData = parsed Resource object (with Address containing postal address) or null
     */
    @AuraEnabled(cacheable=true)
    public static Response getAddressByCoordinates(final Decimal latitude, final Decimal longtitude) {
        final String endpointUrl = getApiEndpointUrl();
        String params = '{0},{1}?';
        final String paramsFormatted = String.format(params, new String[] {
                                            EncodingUtil.urlEncode('' + latitude, 'UTF-8'),
                                            EncodingUtil.urlEncode('' + longtitude, 'UTF-8')
                                        });

        final String url = endpointUrl + 'Locations/' + paramsFormatted;
        return sendResourcesQuery(url);
    }

    /**
     * @description
     * same as getCoordinatesByAddress(Address) but address value is expected as JSON string
     * this method is used to allow calling getCoordinatesByAddress from Aura/Lwc components
     * @param addressJson serialied version of Address
     *
     * @return Response 
     *          where: Response.responseData = parsed Resource object (with Address containing postal address) or null
     */
    @AuraEnabled(cacheable=true)
    public static Response getCoordinatesByAddressJson(final String addressJson) {
        final Address address = (Address)JSON.deserialize(addressJson, Address.class);
        return getCoordinatesByAddress(address);
    }
    
    /**
     * @description
     * Given an Address - try to get decimal Lat/Lon coordinates
     * makes a call like this:
     *  http://dev.virtualearth.net/REST/v1/Locations?query={Address}&key=A{BingKey}
     *
     * @param Address - address details
     *
     * @return Response 
     *          where: Response.responseData = parsed Resource object (with Point representing coordinates) or null
     */
    
    public static Response getCoordinatesByQuery(final String strAddress) {
        final String endpointUrl = getApiEndpointUrl();
        String strEncodedAddress = EncodingUtil.urlEncode(''+strAddress, 'UTF-8');
        final String url = endpointUrl + 'Locations?query='+strEncodedAddress;
        return sendResourcesQuery(url);
    }
    
    /**
     * @description
     * Given an Address - try to get decimal Lat/Lon coordinates
     * makes a call like this:
     *  http://dev.virtualearth.net/REST/v1/Locations?countryRegion={countryRegion}
     *      &locality={locality}&postalCode={postalCode}&addressLine={addressLine}&key={BingMapsKey}
     *
     * @param Address - address details
     *
     * @return Response 
     *          where: Response.responseData = parsed Resource object (with Point representing coordinates) or null
     */
    public static Response getCoordinatesByAddress(final Address address) {
        final String endpointUrl = getApiEndpointUrl();
        address.countryRegion = address.countryRegion == null ? '' : address.countryRegion;
        address.locality = address.locality== null ? '': address.locality;
        address.postalCode = address.postalCode == null ? '': address.postalCode;
        address.addressLine = address.addressLine == null ? '' : address.addressLine;
        
        String params = '?countryRegion={0}&locality={1}&postalCode={2}&addressLine={3}';
        final String paramsFormatted = String.format(params, new String[] {
                                            EncodingUtil.urlEncode('' + address.countryRegion, 'UTF-8'),
                                            EncodingUtil.urlEncode('' + address.locality, 'UTF-8'),
                                            EncodingUtil.urlEncode('' + address.postalCode, 'UTF-8'),
                                            EncodingUtil.urlEncode('' + address.addressLine, 'UTF-8')
                                        });
        final String url = endpointUrl + 'Locations/' + paramsFormatted;
        return sendResourcesQuery(url);
    }

    /**
     * @description
     * same as getDrivingDistance(Point, Point, DistanceUnit) but parameters are passed as a single object encoded in JSON string
     *      this method is used to allow calling getDrivingDistance from Aura/Lwc components
     *  @param paramsJson is a string containing JSON object of the following format
     *  {
     *      'wayPoint0_latitude': 12.34,
     *      'wayPoint0_longtitude': -23.45,
     *      'wayPoint1_latitude': 13.44,
     *      'wayPoint1_longtitude': -24.56,
     *      'distanceUnit': 'mi'
     *  }
     *  Note: distanceUnit can be either 'mi' or 'km'
     *
     * @return distance between two points
     *          where: Response.responseData = parsed Resource object (with travelDistance representing the driving distance) or null
     */
    @AuraEnabled(cacheable=true)
    public static Response getDrivingDistanceJson(final String paramsJson) {
        System.assertNotEquals(null, paramsJson, 'Non NULL parameter paramsJson is required');
        final Map<String, Object> valueByKey = (Map<String, Object>)JSON.deserializeUntyped(paramsJson);

        final Decimal wayPoint0_latitude = (Decimal)valueByKey.get('wayPoint0_latitude');
        final Decimal wayPoint0_longtitude = (Decimal)valueByKey.get('wayPoint0_longtitude');
        final Decimal wayPoint1_latitude = (Decimal)valueByKey.get('wayPoint1_latitude');
        final Decimal wayPoint1_longtitude = (Decimal)valueByKey.get('wayPoint1_longtitude');
        final String distanceUnitStr = (String)valueByKey.get('distanceUnit');

        final Point wayPoint0 = new Point(wayPoint0_latitude, wayPoint0_longtitude);
        final Point wayPoint1 = new Point(wayPoint1_latitude, wayPoint1_longtitude);
        
        final DistanceUnit distanceUnit = 'mi' == distanceUnitStr? DistanceUnit.MI : DistanceUnit.KM;

        return getDrivingDistance(wayPoint0, wayPoint1, distanceUnit);
    }
    /**
     * @description
     *      retrieve driving distance between two points
     *
     * @param wayPoint0 - lat,lon of the starting point
     * @param wayPoint1 - lat,lon of the finishing point
     * @param DistanceUnit - 'mi' or 'km'
     *
     * @return distance between two points
     *          where: Response.responseData = parsed Resource object (with travelDistance representing the driving distance) or null
     */
    public static Response getDrivingDistance(final Point wayPoint0, final Point wayPoint1, 
                                                                final DistanceUnit distanceUnit) {
        System.assertNotEquals(null, wayPoint0, 'Non NULL parameter wayPoint0 is required');
        System.assertNotEquals(null, wayPoint1, 'Non NULL parameter wayPoint1 is required');
        System.assertNotEquals(null, distanceUnit, 'Non NULL parameter distanceUnit is required');

        final String endpointUrl = getApiEndpointUrl();
        String params = 'wayPoint.0={0}&wayPoint.1={1}&routeAttributes=routeSummariesOnly&distanceUnit={2}';
        final String paramsFormatted = String.format(params, new String[] {
                                            wayPoint0.toUrlParameter(),
                                            wayPoint1.toUrlParameter(),
                                            EncodingUtil.urlEncode(distanceUnit.name().toLowerCase(), 'UTF-8')

                                        });

        final String url = endpointUrl + 'Routes?' + paramsFormatted;
        return sendResourcesQuery(url);
    }


    private static String getApiEndpointUrl() {
        return apiEndpoint;
    }
    
    private static String getApiKey(){
        return apiKey;
    }
    


    /**
     * generic method for processing HTTP response error
     */
    private static Response processError(final System.HttpResponse httpResponse, final Response response) {
        if (String.isBlank(httpResponse.getBody())) {
            // https://docs.microsoft.com/en-us/bingmaps/rest-services/status-codes-and-error-handling#handling-empty-responses
            response.errorData = 'Bing Map API returned empty response.' +
                                ' Check HTTP header X-MS-BM-WS-INFO.' +
                                ' If it is set to 1 - it is best to wait a few seconds and try again';
        } else {
            response.errorData = httpResponse.getBody();
        }
        return response;
    }


    /**
     * @return Resource or null (if failed to extract Resource from given valueByKey)
     */
    private static Resource parseLocationResult(final Map<String, Object> valueByKey) {
        final Object[] resourceSets = (Object[])valueByKey.get('resourceSets');
        if (null != resourceSets && !resourceSets.isEmpty()) {
            final Map<String, Object> resourceSet = (Map<String, Object>)resourceSets[0];
            final Object[] resources = (Object[])resourceSet.get('resources');
            if (null != resources && !resources.isEmpty()) {
                final String resourceStr = JSON.serialize( resources[0] );
                
                final Resource resource = (Resource)JSON.deserialize(resourceStr, Resource.class);
                return resource;
            }
        }
        return null;
    }

    /**
     * makes a call like this:
     *  http://dev.virtualearth.net/REST/v1/Locations/...&o=json&userIp=127.0.0.1&key={BingApiKey}'
     *
     * @param full request URL, excluding Bing Map API key, userIp and output format
     *
     * @returns Response 
     *          where: Response.responseData = parsed Resource object (with Point and Address) or null
     * generic method for sending requests to Bing Map API "Locations/" endpoint
     */
    private static Response sendResourcesQuery(final String url) {
        final HttpRequest req = new HttpRequest();
        final String key = getApiKey();
        final String completeUrl = url + '&o=json&userIp=127.0.0.1&key=' + key + '&incl=ciso2';
        System.debug('agX complete URL: ' + completeUrl);

        req.setEndpoint(completeUrl);
        req.setMethod('GET');
        final Http http = new Http();
        final System.HttpResponse httpResponse = http.send(req);
        
        final Response response = new Response();
        response.isSuccess = 200 == httpResponse.getStatusCode() && String.isNotBlank(httpResponse.getBody());

        if (response.isSuccess) {
            final Map<String, Object> valueByKey = (Map<String, Object>)JSON.deserializeUntyped(httpResponse.getBody());
            final Resource res = parseLocationResult(valueByKey);
            if (null == res) {
                response.isSuccess = false;
                response.errorData = 'Failed to extract Resource from API response. ' + httpResponse.getBody();
            } else {    
                response.responseData = res;
            }
        } else {
            processError(httpResponse, response);
        }

        return response;

    }

    ////////////////////////////////////////////////////////////////////////
    public class Resource {
        @AuraEnabled public String name;// e.g. '1 Microsoft Way, Redmond, WA 98052'
        @AuraEnabled public Point point;
        @AuraEnabled public Address address;
        @AuraEnabled public String confidence; //e.g. 'Medium'
        @AuraEnabled public String entityType; //e.g. 'Address'
        @AuraEnabled public String distanceUnit; //e.g. 'Kilometer'
        @AuraEnabled public Decimal travelDistance; //e.g. 1312.142
    }

    public class Point {
        public Point(final Decimal latitude, final Decimal longtitude) {
            coordinates = new Decimal[]{latitude, longtitude};
        }
        @AuraEnabled public Decimal[] coordinates;

        @AuraEnabled public Decimal getLatitude() {
            return null != coordinates && !coordinates.isEmpty()? coordinates[0] : null;
        }
        @AuraEnabled public Decimal getLongtitude() {
            return null != coordinates && coordinates.size() > 1 ? coordinates[1] : null;
        }
        public String toUrlParameter() {
            return EncodingUtil.urlEncode('' + getLatitude(), 'UTF-8') + ',' + 
                        EncodingUtil.urlEncode('' + getLongtitude(), 'UTF-8');
        }
    }

    public class Address {
        @AuraEnabled public String addressLine; // Street
        @AuraEnabled public String formattedAddress; // output parameter, not required for input
        @AuraEnabled public String countryRegion; //e.g. US
        @AuraEnabled public String countryRegionIso2;
        @AuraEnabled public String locality; // City, e.g. Redmond
        @AuraEnabled public String postalCode;
        @AuraEnabled public String adminDistrict;
    }

    public enum DistanceUnit {MI, KM}
    
    
    /**
     * @description
     *  use this to return response result of HTTP callout in a generic way
    **/
    public class Response {
        @AuraEnabled
        public Boolean isSuccess;
        @AuraEnabled
        public Object responseData;
        @AuraEnabled
        public Object errorData;

    }
}