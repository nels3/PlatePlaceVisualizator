# PlatePlaceVisualizator

Repository consists of website project that shows information about Plate Collection. Every plate can have such values as: photo, country, city and they are shown in various ways: in list, on maps, in statistics.

Technologies used:
React, Redux, Django, Rest API

Languages:
Javascript (frontend), Python (backend)

If you want to see some of the features, there is another repository called Collector, that is static version of this project. It is readonly and is fetching data from this version of project (Look at Exports in Statistics page). There could be some new features in this version that are not implemented in static version.

Link:
https://nels3.github.io/Collector/

## Pages 

### Home page
Welcome page
![obraz](https://user-images.githubusercontent.com/32846285/222169190-c0f489e2-7ee2-46fd-a2b4-3d3fe9fe8a88.png)

### Plates page
Here you can see all plates in collection. You can use filters on columns if you want.

![obraz](https://user-images.githubusercontent.com/32846285/222169414-9fd30626-41f6-4661-af31-a8f9200225f4.png)

Every plate can have country/city name both in english and in polish. When you change language in navbar - values in list will be changed to selected language.

Polish:
![obraz](https://user-images.githubusercontent.com/32846285/222169950-d371773f-b28c-4e13-af8e-0ce710e8f110.png)

English:
![obraz](https://user-images.githubusercontent.com/32846285/222170029-77c67ad5-e4dd-4d61-9331-b2a2bc52bc46.png)

#### Adding new plate
You can add new plate after clicking plus icon above the list.

Every plate can be attached to city or country. You can see added countries and cities in filters box above form. You can add possible options to dropdown in World Tab.
![obraz](https://user-images.githubusercontent.com/32846285/222167431-a00d2990-e0a0-43e2-9967-61717f8e2adc.png)

After selecting option from filter, all fields will be added to form. You can modify all of them. Then add only photo of plate.
![obraz](https://user-images.githubusercontent.com/32846285/222169002-61fb07a7-b2b9-4502-90f7-b02e2cb09bea.png)

#### Modyfing/delete existing plate
If you want modify/delete existing plate, just select it from list, modify fields and than choose option from buttons.
![obraz](https://user-images.githubusercontent.com/32846285/222170733-4e7decb3-a5b8-4e42-8c8b-5ca9f5e2ee5e.png)

### Gallery page
Here you can see photos of plates that matches filters.
![obraz](https://user-images.githubusercontent.com/32846285/222170982-64d348c2-0ce2-47bc-ab0b-ee6b53208a3b.png)

![obraz](https://user-images.githubusercontent.com/32846285/222171044-c28787b8-d6f7-4c6b-9fd1-5d74e90d6425.png)

After clicking on one image:
![obraz](https://user-images.githubusercontent.com/32846285/222171126-16dca542-c61f-47cf-983a-c03ec7cd2d89.png)

### MAp page
Here you can see markers of plates on various maps. Just select which map you want to see in filters:
![obraz](https://user-images.githubusercontent.com/32846285/222171416-a64cb462-5eca-499c-97bc-10f86d3ebad0.png)

![obraz](https://user-images.githubusercontent.com/32846285/222171519-d4563043-de27-4f6d-a5cf-64435108a111.png)

![obraz](https://user-images.githubusercontent.com/32846285/222171733-abaec5ef-9c59-4c17-adb2-30b7a63fb525.png)

-> You can select marker and see plate below map
![obraz](https://user-images.githubusercontent.com/32846285/222171954-20d0ded3-d5ad-4ca8-a134-ab192c58ed77.png)
![obraz](https://user-images.githubusercontent.com/32846285/222172049-e3fbbe25-4d42-404a-afff-d1de95cf96a7.png)

-> You can select plate in Plate page and see it marked on map
![obraz](https://user-images.githubusercontent.com/32846285/222172180-cd2c2686-d861-4542-bfc5-e3605eaf23a1.png)

### Statistics page
Here you can see some basic statistics of plates
![obraz](https://user-images.githubusercontent.com/32846285/222172410-43ca3649-fd27-4643-80ca-7951c620678f.png)

Below you can see buttons that enables exports of every data needed for static version of app.
![obraz](https://user-images.githubusercontent.com/32846285/222172653-47059410-f03c-4a86-ab15-33c2ce9a0fcf.png)

### World page
Here you can add country and city to database so you can use it when adding new plate to your collection.
![obraz](https://user-images.githubusercontent.com/32846285/222172856-f713a7fa-72d0-4da2-a0f1-38172ca7b193.png)

#### Add new country
Click plus icon below countries list.

Add country name:
![obraz](https://user-images.githubusercontent.com/32846285/222173063-9cde9e91-12a4-41a7-b519-4863497800bf.png)

Enter all data or...

Click question mark on the right:
![obraz](https://user-images.githubusercontent.com/32846285/222173407-d4f644e9-5afb-43bd-b390-8b6c10990ec7.png)

And add it using button.

#### Modify/delete existing country
Click on the country in countries list, modify fields and use update/delete button.

#### Add new city
Click plus icon below cities list.

Add all data or

Add city name and optionally country name and click question mark on the right:
![obraz](https://user-images.githubusercontent.com/32846285/222407608-681d6309-a7f2-4397-bbf6-3ababd38f30f.png)

![obraz](https://user-images.githubusercontent.com/32846285/222408081-1e70c0b1-73e0-40fe-870f-26fc4ac5e7e3.png)
Choose which result is the one you want to use. You will see five results sorted from the one with the biggest number of population. There is Rest Api used in the backend that is fetching data about cities.
![obraz](https://user-images.githubusercontent.com/32846285/222408351-efa2a9ee-786b-48af-81b7-b14c45b99306.png)
![obraz](https://user-images.githubusercontent.com/32846285/222408411-d2235564-6b67-4f76-9c07-5e3e601b9d8c.png)

Warning: If you will enter already exisiting city, information already in database will be retrieved. If you want other way, just delete city first. It will not delete any plate associated with this city.
