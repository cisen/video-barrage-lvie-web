export default [{
    path: "/articleShow",
    name: "articleShow",

    children: [
        {
            path: "article",
            name: "ArticleShow",
            component: () => import('@/views/creationShow/article/article.vue'),
        }
    ]
}] 