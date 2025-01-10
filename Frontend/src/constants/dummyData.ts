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
  content: string;
  category: string;
  time: number;
  tags: string[];
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

export const postCardData: PostCardProps[] = [
  {
    id: "d300vefT",
    image:
      "https://images.unsplash.com/photo-1686994676784-9629223f4e0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmF3JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
    username: "Ida Chambers",
    title:
      "Which pressure swimming aside help wagon quarter pond handsome blood courage show past slide later mighty wolf toy slave effect riding party pride develop",
    content:
      "tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skilltie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill tie write bottom yourself wonderful spoken pull snake donkey understanding cheese away ordinary grow mile cut grabbed fighting putting grandmother airplane nice enjoy skill  ",
    category: "Tech",
    date: "10/11/2039",
    time: 10,
    tags: ["AWS", "Software", "Azure", "GCP"],
    comments: [
      {
        username: "Dale Davis",
        userImage:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        text: "I found this post very informative and well-written. The author did a great job explaining the topic in a clear and concise manner. I especially appreciated the examples provided, which helped to illustrate the points made. Keep up the good work and looking forward to more posts like this!",

        commentLikes: 10,
        commentDate: "3/28/2034",
        reply: [
          {
            username: "Lida Baldwin",
            userImage:
              "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            replyText: "Thanks!",
            replyLikes: 5,
            replyDate: "10/25/2071",
          },
          {
            username: "Leroy Pratt",
            userImage:
              "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            replyText: "Thanks!",
            replyLikes: 5,
            replyDate: "10/31/2083",
          },
        ],
      },
      {
        username: "Dale Davis",
        userImage:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        text: "Great post!",
        commentLikes: 10,
        commentDate: "12/3/2023",
        reply: [
          {
            username: "Mittie Lawson",
            userImage:
              "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            replyText: "Thanks!",
            replyLikes: 5,
            replyDate: "9/16/2097",
          },
          {
            username: "Viola Luna",
            userImage:
              "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            replyText: "Thanks!",
            replyLikes: 5,
            replyDate: "10/31/2037",
          },
          {
            username: "Pauline Quinn",
            userImage:
              "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            replyText: "Thanks!",
            replyLikes: 5,
            replyDate: "11/7/2090",
          },
          {
            username: "Zachary Marsh",
            userImage:
              "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
            replyText: "Thanks!",
            replyLikes: 5,
            replyDate: "7/14/2096",
          },
        ],
      },
    ],
  },
  {
    id: "0YHg6v5MRpIXaJWK",
    image:
      "https://images.unsplash.com/photo-1686994676784-9629223f4e0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmF3JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
    username: "Frederick Garcia",
    title:
      "exist dead busy afraid hungry involved nervous donkey touch symbol smoke too origin some become tower pound social collect twice hello close we try",
    content:
      "curious mix history bridge up reader sat scale police army water ourselves cut early guide led change doubt safe vapor brick away known chart",
    date: "4/10/2113",
    category: "Tech",
    time: 32,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },

  {
    id: "CgfLUm2",
    image:
      "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D",
    username: "Viola Herrera",
    title:
      "spread bottle but save too reader not see was party only surface feet belt likely faster tube arrow shadow journey century dot whatever bit",
    content:
      "jar string join by religious element planet were carefully coming replied couple faster express once either original structure sharp day soil itself handle dark",
    date: "5/4/2107",
    category: "Tech",
    time: 25,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },
  {
    id: "2peciUfyDXftT",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D",
    username: "Jessie Carter",
    title:
      "shallow dear right congress court special nice complete usual but fall exact off extra as newspaper mighty market thin torn jar free camera car",
    content:
      "twelve further by same species wherever aware science little individual running cause share season run improve indicate customs new pale proper mountain board understandingcentral ruler said teach tide charge flower exactly nothing certainly outline heart tent circus five establish shaking disease equal negative engineer saved whose using",
    date: "10/11/2039",
    category: "Tech",
    time: 31,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },
  {
    id: "Fa2WYbOFA0aDE03J1k",
    image:
      "https://plus.unsplash.com/premium_photo-1683140840845-073fa9638261?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    coverImage:
      "https://media.istockphoto.com/id/1292991881/photo/the-more-you-know-the-more-your-business-grows.webp?a=1&b=1&s=612x612&w=0&k=20&c=XAMGgXCZhjA5YdEQGY3-eRHsMaAUaAK_i1yEunReR8w=",
    username: "Virgie Glover",
    title:
      "air coffee stream sent beauty before pie bus slabs human rocky fallen changing seeing particles glad shallow basic season fact pitch key hang oxygen",
    content:
      "broke solid until dinner electricity desk pilot studying certainly easier trail copper should separate silly turn worse means active draw trick search recent positivefood paint short winter last today chemical wool drive pink mice view egg waste means substance eight base nuts surrounded next mission she review",
    date: "1/14/2109",
    category: "Tech",
    time: 2,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },
  {
    id: "ZkuOVNWdY3kURK7",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D",
    username: "Francis Wood",
    title:
      "handle room feathers enough behavior perfect darkness dirt bell current affect different will voyage tube slow dust camp imagine where soap adult figure mind",
    content:
      "improve became chest hill fall balloon dawn visit discuss air electricity caught needed eat prove older none stiff customs body hall shore month campdress problem ate dull rush somebody pitch apple differ nodded buried exchange aware man company medicine mighty drawn swing leaving plant refer in popular",
    date: "10/13/2102",
    category: "Tech",
    time: 1,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },
  {
    id: "ttAxg59Uf",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D",
    username: "Dale Davis",
    title:
      "anywhere power store possibly neck lost plastic anyone slowly quiet shout larger skin quick hospital put whether bottom struck steady fastened strange income birthday",
    content:
      "catch air nearer sheet taken for climb writer globe heard seems goes lift simplest prize opposite canal wish settle wash type found finest youngercompare strength telephone dropped load copy mistake laugh write joined believed pool frozen cake noon previous then likely push adjective unless stomach wheel bad",
    date: "11/11/2061",
    category: "Tech",
    time: 2,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },
  {
    id: "U8EBSid86yl9SBEU7j",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D",
    username: "Carolyn Greene",
    title:
      "exist rubber prize buried whom fully carbon greatly while east real sure cost equal using color wish pick maybe shadow lunch slip instead perhaps",
    content:
      "proper for forty bit rubbed ring careful understanding father chapter require typical crop feathers human last term muscle continued worth noted on motor doctornose invented year pain folks object native appearance oil trick original add improve game they highway done hurried snake his rain thy board rough",
    date: "2/24/2029",
    category: "Tech",
    time: 11,
    tags: ["AWS", "Software", "Azure", "GCP"],
  },
  {
    id: "JnAAYqxhaA8At",
    image:
      "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D",
    username: "Viola Ortiz",
    title:
      "setting should key noon slip buffalo bite plastic vessels central comfortable yourself accident driver gentle worker flew green rocket police poor tales ever where",
    content:
      "will enough popular slightly forward member can let rubber tribe imagine earth properly planning position separate powder she gently clear told sell goose writingrubbed visitor ready applied board mix depend touch wrong give daily edge hurry alone number atomic butter spring nice firm cotton herself substance gentle",
    date: "9/30/2045",
    category: "Tech",
    time: 25,
    tags: ["AWS", "Software", "Azure", "GCP"],
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
