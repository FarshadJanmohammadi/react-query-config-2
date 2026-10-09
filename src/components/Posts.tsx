import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createPost, deletePost, getPosts } from "../api/requests";
import { toast } from "react-toastify";

const Posts = () => {
  const client = useQueryClient();

  const {
    data: postsData,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getPosts,
    retry: 6,
    // gcTime: 5_000,
    staleTime: 60_000,
  });

  const { mutate: mutateCreatePost } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getPosts"] });
    },
  });

  const { mutate: mutateDeletePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePost,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getPosts"] });
      toast.success("Post Removed!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isPending) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          client.invalidateQueries({ queryKey: ["getPosts"] });
        }}
      >
        Refresh Post Api
      </button>

      <button
        onClick={() => {
          mutateCreatePost({
            title: "new Post",
            body: "body new Post",
            userId: 113,
          });
        }}
      >
        Create New Post
      </button>
      <ul>
        {postsData?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <button onClick={() => mutateDeletePost(post.id)}>
              Delete post
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
