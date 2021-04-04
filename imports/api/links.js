import { Mongo } from "meteor/mongo";
import { createQuery } from "meteor/cultofcoders:grapher";
import SimpleSchema from "simpl-schema";

export const LinksCollection = new Mongo.Collection("links");
export const CommentsCollection = new Mongo.Collection("comments");

LinksCollection.attachSchema(
  new SimpleSchema({
    title: String,
    url: String,
    commentId: String,
  })
);

CommentsCollection.attachSchema(
  new SimpleSchema({
    authorName: String,
    comment: String,
  })
);

LinksCollection.addLinks({
  comment: {
    type: "one",
    collection: CommentsCollection,
    field: "commentId",
    autoremove: true,
  },
});

export const getLinksQuery = createQuery({
  links: {
    $paginate: true,
    title: 1,
    url: 1,
    comment: {
      authorName: 1,
    },
  },
});

if (Meteor.isServer) {
  LinksCollection.expose({});
}

Meteor.methods({
  removeLink(_id) {
    LinksCollection.remove(_id);
  },
});
