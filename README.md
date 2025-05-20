# coming-soon-automation-app

Coming Soon Locations Automation App

**Documentation**

This app is designed as an immediate, short term stop gap to allow Services to cut out manual time from building custom solutions, making it easy to support Coming Soon locations in an automated fashion. 

At a high level this app will:

*   Create a connector to apply an existing Coming Soon entity template to entities. 
    
*   Create a connector to update fields that are used in the criteria of the saved filter to trigger SFLA and fields to determine which publishers it should be live on.
    
*   Create a connector to automatically opt in locations via Listings API per publisher readiness and date out from open date.
    
*   Create the necessary custom fields used in the connectors for determining if a location should be live 
    
*   Create saved filters to show which locations should be live on each publisher
    
*   Create a plugin used in the connector to determine eligibility to go live per publisher
    

Before installing the app the following steps must be completed:. 

1.  Listings configuration settings are set to have Automatically Opt In for all publishers turned OFF
    
2.  Created an Entity Template with relevant content populated for locations that are opening soon
    
3.  Have a valid linked account present for respective publishers (Google & Facebook)
    
4.  Have created a developer app with necessary permissions and obtained the API key
    
    1.  Required Entities endpoint Read/Write
        
    2.  Required Listings endpoint Read/Write
        

NOTE: This app includes the functionality to use Saved Filter License Assignment which may be different if your account is already set up with Saved Filter License Assignment. If you choose to use what is configured in this app make sure to update all of your entities with a Listings subscription to be contained in the new Saved Filter: Live on Listings by setting the Live on Listings field to Yes/true before linking to the Listings license pack. 

To install the app the following information is required:

*   The number of days ahead of open date to launch on each publisher: Google, Facebook, Yelp, and Extended Network 
    
    *   Google has a maximum of 90 days
        
    *   Facebook has a maximum of 90 days
        
    *   Yelp has a maximum of 30 days
        
    *   Extended network does not accept locations ahead of time, if there is a need to opt in early, the maximum is 7 days
        
*   Field Id for the field that contains the Open Date
    
    *   This can be either the built-in field or an existing custom field. The built-in field id is openDate
        
*   Template Id e.g. templateForSchedule
    
*   Template Fields to apply, e.g. linkedAccounts,googleAccountId,
    

NOTE: If you are leveraging Saved Filter License Assignment you must assign the Listings license packs to the Listings License Assignment Saved Filter before running the connectors for the first time. 

Connector Specifications
========================

All connectors are contained in this account for creation and QA [https://www.yext.com/s/3844360/addData/connectors](https://www.yext.com/s/3844360/addData/connectors) 

Apply Coming Soon Template
--------------------------

[https://www.yext.com/s/3844360/addData/connectors/25299](https://www.yext.com/s/3844360/addData/connectors/25299) 

**Fetch Entities**

This connector fetches entities with an Open date set that is greater than today's date (in the future) along with a subset of fields that are required for transforms (name, openDate, and meta information). A filter transform is used to remove any locations that already have a subscription  — using the Live on Listings field set to true.

[https://api.yext.com/v2/accounts/me/entities](https://api.yext.com/v2/accounts/me/entities)

filter={"openDate":{"$gt":"now/d"}}fields=name,openDate,metaapi\_key=XXXXXXXXXXXXXXXXXXXXXXX

**Apply Template**

 The specific template and templated fields are specified as variables during app installation. 

PUT https://api.yext.com/v2/accounts/me/entities/\[\[id\]\]

templateID = templateForComingSoon

templateFields = linkedAccounts,googleAccountId

BODY {}

Update Coming Soon Eligibility
------------------------------

[https://www.yext.com/s/3844360/addData/connectors/25334](https://www.yext.com/s/3844360/addData/connectors/25334) 

**Fetch Entities**

Fetch entities with an Open Date set that is greater than today's date using filters in the API. A filter transform is used to remove any locations that already have a subscription  — using the Live on Listings field set to true.

**Expose days before opening**

In the connector there is a column to display the selection for the number of days before opening each publisher(s) should go live. This is just for transparency and is not used. The check on the relative dates takes place in  a function in the following step.

**Check open dates**

Using a transform, a column will be added for each publisher and the extended network, containing a static numerical for all entities to be used as the number of days from opening to apply the template (and opt in). These values will be set as a variable during the installation flow.

Google Days Before Open = 90

Yelp Days Before Open = 30

Facebook Days Before Open = 90

Extended Network Days Before Open = 0

Using a transform for a plugin function, we check the open date relative to today’s date to determine if it is eligible for applying the template and opting in. The open date column is duplicated 4 times to be used with this function. There is one function for each publisher set (G,F,Y & EN) and is applied to each column mentioned above, respectively. These fields are used to determine when a publisher is ready to be opted into — mapping to 4 respective fields on the entity that are updated once they meet criteria (true/false).

Should Opt in On Google = TRUE

Should Opt in On Yelp = FALSE

Should Opt in On Facebook = TRUE 

Should Opt in On Extended Network = FALSE

**Trigger SFLA**

For any row that has any value of TRUE (meaning it’s ready for any publisher) the Live on Listings field. This triggers SFLA for a license to be assigned to the entity using 2 transforms.

 1. Check for License Assignment, merges all above opt-in checks into one value

2\. Live on Listings value is true if the Check for License Assignment field contains any single true value. 

Check for License Assignment = false-true-false-true

Live on Listings = true

Opt In Locations \_ \[Publisher Name\]
--------------------------------------

[https://www.yext.com/s/3844360/addData/connectors/25335](https://www.yext.com/s/3844360/addData/connectors/25335)

[https://www.yext.com/s/3844360/addData/connectors/25336](https://www.yext.com/s/3844360/addData/connectors/25336)

[https://www.yext.com/s/3844360/addData/connectors/25337](https://www.yext.com/s/3844360/addData/connectors/25337) 

[https://www.yext.com/s/3844360/addData/connectors/25338](https://www.yext.com/s/3844360/addData/connectors/25338) 

**Fetch entities**

These connectors fetch entities using the respective Live on Google, Live on Yelp, Live on Facebook, and Live on Extended Network fields to determine if they should be opted in or not. This is filtered in the API request URL.

GET [https://api.yext.com/v2/accounts/me/entities](https://api.yext.com/v2/accounts/me/entities)

fields: name,meta,optInLocations\_liveOnFacebook,optInLocations\_liveOnListings,openDate

filter: { "$and" : \[{ "optInLocations\_liveOnFacebook": {"$eq": true }}, {"openDate":{"$gt":"now/d"}} \] }

**Opt In locations**

Opt in the locations present for the single publisher. For the Extended Network connector there are no publisher Ids set as the endpoint will default to all publishers, opting in all remaining publishers.

PUT https://api.yext.com/v2/accounts/me/listings/listings/optin

locationIds = \[\[id\]\]

publisherIds = GOOGLEMYBUSINESS {FACEBOOK,YELP}
