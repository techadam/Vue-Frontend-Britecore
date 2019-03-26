## Vue Frontend Britecore
This project is sequel to the Django REST API for software engineering challenge at britecore which involves building a REST API that allow insurers to define their own custom data model for their risks. The Django Rest API can be found on github at https://github.com/techadam/Django-REST-API-BriteCore

### Problem
BriteCore was created to work mostly with property-based insurance, the data model is pretty rigid. The data model assumes that all risks are properties and have addresses. This makes it difficult for BriteCore to work with different forms of insurance like Automobile Policies, Cyber Liability etc. Come up with a solution that allows insurers to define their own custom data model for their risks and should be able to create their own risk types and attach as many different fields as they would like.

### Solution & Approach
Vue was used to create an SPA for the front end. The frontend consumes the data from the Django REST API provided at https://github.com/techadam/Django-REST-API-BriteCore. I leveraged the features of Bootstrap 4 to create UI and alertify for Notification popups. On the frontend, Forms are provided for adding, updating risk types as well as risk fields.

### Setup
```bash
# clone the project
git clone https://github.com/techadam/Vue-Frontend-Britecore.git

# install dependencies
cd Risks
npm install

# serve with hot reload at localhost:8080
npm run server

# build for production with minification
npm run build
```
