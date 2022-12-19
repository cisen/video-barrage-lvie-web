<template>
  <div class="article-page">
    <div class="head">
      <topNavigation color="#fff" :displaySearch="false"></topNavigation>
    </div>
    <!-- 封面图 -->
    <div class="cover-picture">
      <div class="article-info-container">
        <div class="title">{{ articleInfo.title }}</div>
        <div class="article-info">
          <span class="info-lb">
            <SvgIcon name="camera" class="icon-small"></SvgIcon> {{
                dayjs(articleInfo.created_at).format('YYYY.MM.DD.hh.mm')
            }}
          </span>
          <span class="info-lb">
            <SvgIcon name="hot" class="icon-small"></SvgIcon>
            <span>
              {{ articleInfo.heat }}
            </span>
          </span>
          <span class="info-lb">
            <SvgIcon name="comments" class="icon-small"></SvgIcon>
            <span>
              {{ articleInfo.comments_number }}
            </span>
          </span>
          <span class="info-lb">
            <SvgIcon name="like" class="icon-small"></SvgIcon>
            <span>
              {{ articleInfo.likes_number }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <!-- 文章内容 -->
    <div class="article-content">
      <div class="content">
        <p v-html="articleInfo.content"></p>

      </div>
    </div>
  </div>

</template>

<script setup lang="ts" >
import topNavigation from "@/components/topNavigation/topNavigation.vue"
import { useArticleShowProp, useInit } from "@/hooks/creationShow/article/useArticle"
import dayjs from "dayjs"
import { onMounted } from "vue";

components: {
  topNavigation
}

const { articleID, articleInfo, router, route } = useArticleShowProp()




onMounted(async () => {
  await useInit(articleID, articleInfo, route, router)
})
</script>

<style scoped lang="scss">

.article-page {
  height: 100%;
  // background-color: $color-gray-background;

  .head {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .cover-picture {
    width: 100%;
    height: 28rem;
    color: #fff;
    background-image: url("@/assets/img/temporary/34.jpg");
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    transform: translate3d(0px, 0px, 0px);

    .article-info-container {
      position: absolute;
      bottom: 15px;
      left: 20%;

      .title {
        font-size: 28px;
        margin-bottom: 15px;
      }



      .article-info {
        font-size: 14px;
        display: flex;

        .icon-small {
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }

        .info-lb {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 14px;
        }

      }
    }
  }

  .article-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;

   
    .content {
      :deep(img){
        max-width: 100%;
    border-radius: 5px;
      }
    }
   
  }
}
</style>