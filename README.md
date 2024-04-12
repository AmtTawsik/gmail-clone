# Qualyval Multi Page Form

  

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

  

## Setup

  

Make sure to install the dependencies:

  

```bash
# npm

npm  install

```

  

## Development Server

  

Start the development server on `http://localhost:3000`:

  

```bash

# npm

npm  run  dev

  

# pnpm

pnpm  run  dev

  

# yarn

yarn  dev

```

  

## Production

  

Build the application for production:

  

```bash
# npm

npm  run  build
```

  

Locally preview production build:

  

```bash

# npm
npm  run  preview
```

## Backend Setup
1. create a Realm App in MongoDB
2. enable a API KEY Authentication 
3. create a api key and store it 
4. create Database and Collection
5. create a Read Write All rule for collection

## Enviormental  Variables

```
// Realm App Id
NUXT_APP_ID

// API KEY given form API KEY authentication 
NUXT_SERVER_API_KEY

// Database name
NUXT_DB

// Collection name
NUXT_COLLECTION=users
```
## Question List
in the **pages/index.vue** we have **`questionSteps`** which contains all the Question objects

## Stepper List
in the **pages/index.vue** we have **`steppers`** which contains all the Question objects. Simply addind steppers name to the list creates a new Stepper

## Question Object
Question object has a specific object structers with some **required** and **type specific** Property 
```
{
	question: (required)
	type: (required)
	stageId: (required)
	field: (required)
	placeHolder: (required)
	options: (type specific | required)
	multiple: (type specific | optional)
	format: (only date type | optional )
	max: (only rating type | required)
	validation: (only number type | required) 
}
```

###  question : (required)
```
value: "any question in string format"
```
example: 
```
{
	question: "what is your name ?"
}
```

###  type : (required)
total types available : 9

```
value: text | number | email | file | date | rating | dropDown | iconCard | imageCard
```

example: 
```
{
	type: "text"
}
```
```
{
	type: "iconCard"
}
```
### stageId : (required)
associated stepper number from the stepper 
**`min: 1`**  and   **`max: number of stepper`**
```
value: number ( 1 - length of stepper list)
```
example: 
```
{
	stageId:2
}
```

### field: (required)
the field in which the data will be stored
* **This data will be stored in the database with this same field name so remember to confirm it**

```
value: "any field name you like"
```
example: 
##### field name for a rating input
```
{
	field: "review"
}
```  
### options: ( type specific | required )
this propery only applied to **type** `iconCard | imageCard | dropDown` 
```
datatype: Array[]
```

#### for iconCard
```
value:  [
		  {
			  icon: ** imported icon from heroicons **
			  name: "option field valid"
		  }
		]
```
example: 
```
{
	options: [
				{
					icon:UserIcon
					name:"User"
				},
				{
					icon:UserGroupIcon
					name:"Group"
				},
				{
					icon:BriefcaseIcon
					name:"Work"
				},
			 ]
}
```


#### for imageCard
```
value:  [
		  {
			  image: ** url of image/ imported image object from
			   		image folder in the project**
			  name: "option field valid"
		  }
		]
```
example: 
```
{
	options: [
				{
					image:'image url'
					name:"field 1"
				},
				{
					image:'image url'
					name:"field 2"
				},
				{
					image:'image url'
					name:"field 3"
				},
			 ]
}
```
#### for dropDown
```
value:  [
		  "any value associated to the question"
		]
```

example: 
```
{
	options: ['India',  "Russia",  "America", "France",  "England",  "United Kingdom"]
}
```
### multiple ( type specific | optional )
this propery only applied to **type** `iconCard | imageCard | file`
* **if this propery is not passed for the above mentioned types by default `false`  will be passed instead**
```
value: true | false
```
example: 
```
{
	multiple: true
}
```
### placeHolder: ( required ) 
not applicable for `imageCard | iconCard | rating | date`
* required for **file** type . there placeHolder is used for the button content to get the files 
```
value: "any thing you like"
```
example: 
```
{
	placeHolder:"Enter your name"
}
```
### format: ( only applicable for `date` )
```
values: D - short Day name (ex: Mon, Tue)
		DD - full day name (ex: Monday, Tuesday) 
		d - date with no leading 0 (ex: 8,9,5)
		dd - date with leading 0 (ex: 05, 08, 09)
		M - short Month name (ex: Apr, Jan)
		MM - full month Name (ex: April, January)
		m - month number with no leading 0 (ex: 5, 8, 3)
		mm - month number with leading 0 (ex: 05, 08, 03)
		yyyy - full year (ex: 2004,2023)
		yy - short year (ex: 04, 23)
```
example: 
```
{
	format: 'dd/mm/yyyy' | 'mm/dd/yy' | 'D d,M yyyy' | etc.
			(25/08/2023  |  08/25/23  |  Fri 25,Aug 2023)
}
```

### max ( only applicable for `rating`  | required )
max value for rating
```
value: number
```

example:

```
{
	max: 5 | 7 | 10 
}
```
### validation ( only applicable for `number` | required ) 
```
value: Regex
```

example: 
```
{
	validation: /^[6-9]\d{9}$/ (Regex to check indian phone number)
}
```