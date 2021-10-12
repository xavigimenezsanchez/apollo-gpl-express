const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (parent, { id }, context, info) => {
      return await Post.findById(id);
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const {
        post: { title, description },
      } = args;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, { id }, context, info) => {
      await Post.findByIdAndDelete(id);
      return `Post ${id} deleted`;
    },

    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const {
        post: { title, description },
      } = args;
      const update = {};
      if (title !== undefined) {
        update.title = title;
      }
      if (description !== undefined) {
        update.description = description;
      }
      return await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
