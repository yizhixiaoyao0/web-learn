import request from "@/utils/request";

export const getArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

export const getYourFeedArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params,
    headers: {
      Authorization: `Token `
    }
  });
};