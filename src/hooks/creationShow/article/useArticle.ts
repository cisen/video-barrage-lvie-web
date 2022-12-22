
import { Router, useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { getArticleContributionByID } from "@/apis/contribution"
import { GetArticleContributionByIDReq, GetArticleContributionByIDRes } from "@/types/creationShow/article/article"
import { blossom } from "@/utils/effect/blossom"
import { Ref, reactive, ref } from "vue"
import globalScss from "@/assets/styles/global/export.module.scss"
import Swal from 'sweetalert2';

export const useArticleShowProp = () => {
    const articleID = ref(0)
    const articleInfo = ref(<GetArticleContributionByIDRes>{})
    const router = useRouter()
    const route = useRoute()

    //回复二级评论
    const replyCommentsDialog = reactive({
        show: false,
        comments: "",
        commentsID: 0,
    })

    return {
        articleID,
        articleInfo,
        router,
        route,
        replyCommentsDialog,
    }
}
export const useInit = async (articleID: Ref<number>, articleInfo: Ref<GetArticleContributionByIDRes>, route: RouteLocationNormalizedLoaded, router: Router) => {
    try {
        if (!route.query.articleID) {
            router.back()
            Swal.fire({
                title: "缺少文章ID",
                heightAuto: false,
                confirmButtonColor: globalScss.colorButtonTheme,
                icon: "error",
            })
            router.back()
            return
        }
        articleID.value = Number(route.query.articleID)
        const { startSakura, stopp } = blossom()
        startSakura()
        window.onresize = function () {
            const canvasSnow = document.getElementById('canvas_sakura') as HTMLEmbedElement;
            if (!canvasSnow) return false
            canvasSnow.width = String(window.innerWidth);
            canvasSnow.height = String(window.innerHeight);
        }
        //获取文章内容
        const response = await getArticleContributionByID(<GetArticleContributionByIDReq>{
            articleID: articleID.value
        })
        if (!response.data) throw "文章内容为空"
        articleInfo.value = response.data

    } catch (err) {
        console.log(err)
    }
}