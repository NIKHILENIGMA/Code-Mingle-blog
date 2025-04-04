// Type definitions for dummy data
export interface Draft {
  title: string;
}

export interface Published {
  title: string;
}

export interface Submitted {
  title?: string;
}

export interface Comment {
  username: string;
  userImage?: string;
  text: string;
  commentDate?: string;
  commentLikes?: number;
  reply?: Reply[];
}

export interface Reply {
  username: string;
  userImage?: string;
  replyDate?: string;
  replyText: string;
  replyLikes?: number;
}

export interface PostCardProps {
  id: string;
  date: string;
  image: string;
  coverImage?: string;
  username: string;
  title: string;
  description: string;
  category: string;
  time: number;
  type: string;
  tags: string[];
  author: {
    name: string;
    image: string;
  };
  readTime: string;
  comments?: Comment[];
}

export const drafts: Draft[] = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit alias deserunt dignissimos error tempore maxime, excepturi necessitatibus pariatur porro laudantium molestias repudiandae quae, sit non incidunt illum amet repellendus quia.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel eius consequatur voluptas repellendus, impedit ex explicabo praesentium nesciunt iure et tempora eveniet cum blanditiis ipsum nobis, totam magni ut.",
  },
];

export const published: Published[] = [
  {
    title: "Published 1 of the blog",
  },
  {
    title: "Published 2 of the blog",
  },
];

export const profileCardData = [
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    cardId: "d300vefT",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    description:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding chees",
    time: "12:09 PM",
    readTime: "5 min read",
    likes: 23,
    comments: 12,
    blogCoverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const submitted: Submitted[] = [];
