# Schema Information

## companies
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
name             | string    | not null
street_address   | string    | not null
city             | string    | not null
state            | string    | not null
zip              | integer   | not null
media_url        | string    | not null
description      | text      | not null
business_plan    | text      | not null

## updates
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
company_id  | integer   | not null, foreign key (references companies), indexed
title       | string    | not null
body        | string    | not null

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
company_id  | integer   | not null, foreign key (references companies), indexed
body        | string    | not null

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
company_id  | integer   | not null, foreign key (references companies), indexed

## founders
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
name             | string    | not null
street_address   | string    | not null
city             | string    | not null
state            | string    | not null
zip              | string    | not null
user_id          | integer   | not null, foreign key (references users), indexed
company_id       | integer   | not null, foreign key (references companies), indexed

## investors
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
name             | string    | not null
street_address   | string    | not null
city             | string    | not null
state            | string    | not null
zip              | string    | not null
user_id          | integer   | not null, foreign key (references users), indexed
company_id       | integer   | not null, foreign key (references companies), indexed

## offerings
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
price              | integer   | not null
total_shares       | integer   | not null
offering_date      | date      | not null
expiration_date    | date      | not null
company_id         | integer   | not null, foreign key (references companies), indexed
description        | string    | not null

## investments
column name            | data type | details
-----------------------|-----------|-----------------------
id                     | integer   | not null, primary key
shares                 | integer   | not null
user_id                | integer   | not null, foreign key (references users), indexed
offering_id            | integer   | not null, foreign key (references offerings), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
