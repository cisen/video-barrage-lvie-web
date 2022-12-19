export default [{
    path: "/creationShow",
    name: "CreationShow",

    children: [
        {
            path: "article",
            name: "ArticleShow",
            component: () => import('@/views/creationShow/article/article.vue'),
        }
    ]
}] 