export default [{
    path: "/videoShow",
    name: "videoShow",
    children: [
        {
            path: "video",
            name: "VideoShow",
            component: () => import('@/views/creationShow/video/video.vue'),
        }
    ]
}] 