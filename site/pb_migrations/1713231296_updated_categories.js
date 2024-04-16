/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hbtdbvjttg7rskt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rgo9vxe8",
    "name": "department_count",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbxa1xyp",
    "name": "article_count",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "asplfong",
    "name": "faculty",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w4xvio44",
    "name": "departments",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xw2vruxs",
    "name": "titles",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pgv5kfrx",
    "name": "Themes",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ex6zcgey",
    "name": "faculty_count",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hbtdbvjttg7rskt")

  // remove
  collection.schema.removeField("rgo9vxe8")

  // remove
  collection.schema.removeField("wbxa1xyp")

  // remove
  collection.schema.removeField("asplfong")

  // remove
  collection.schema.removeField("w4xvio44")

  // remove
  collection.schema.removeField("xw2vruxs")

  // remove
  collection.schema.removeField("pgv5kfrx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ex6zcgey",
    "name": "Business",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
