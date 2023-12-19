// JSON to TS generator

export interface IFeedObject {
  feed: IFeed;
}

export interface IFeed {
  author: IAuthor;
  entry: IEntry[];
  updated: IName;
  rights: IName;
  title: IName;
  icon: IName;
  link: ILink2[];
  id: IName;
}

interface ILink2 {
  attributes: IAttributes4;
}

interface IAttributes4 {
  rel: string;
  type?: string;
  href: string;
}

export interface IEntry {
  author: IAuthor2;
  updated: IName;
  'im:rating': IName;
  'im:version': IName;
  id: IName;
  title: IName;
  content: IContent;
  link: ILink;
  'im:voteSum': IName;
  'im:contentType': ImcontentType;
  'im:voteCount': IName;
}

interface ImcontentType {
  attributes: IAttributes3;
}

interface IAttributes3 {
  term: string;
  label: string;
}

interface ILink {
  attributes: IAttributes2;
}

interface IAttributes2 {
  rel: string;
  href: string;
}

interface IContent {
  label: string;
  attributes: IAttributes;
}

interface IAttributes {
  type: string;
}

interface IAuthor2 {
  uri: IName;
  name: IName;
  label: string;
}

interface IAuthor {
  name: IName;
  uri: IName;
}

interface IName {
  label: string;
}
