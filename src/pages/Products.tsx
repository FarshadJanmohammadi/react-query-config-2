import React from "react";
import { getPosts } from "../api/requests";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  const {
    data: postsData,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });

  return (
    <div>
      {postsData?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
};

export default Products;
