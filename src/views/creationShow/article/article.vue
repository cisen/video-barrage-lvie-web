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
        <!-- 其他 ql-container ql-snow -->
        <div class="ql-editor" v-html="articleInfo.content">
        </div>
      </div>
      <!-- 底部评论 -->
      <div class="comments-box">
        <div class="comments-head">
          <SvgIcon name="editor" class="icon-edit"></SvgIcon> 评论
        </div>
        <div class="comments-main">
          <commentPosting :articleID="articleID" :articleInfo="articleInfo" @updateArticleInfo="updateArticleInfo"
            :commentsID="0"></commentPosting>
        </div>

        <div class="comments-show">
          <div class="comments-show-titel"><span>Comments | </span> <span>{{ articleInfo.comments_number }} 条评论</span>
          </div>
          <div class="comments-show-info">
            <div class="comment-info-detail" v-for="commentsItem in articleInfo.comments" :key="commentsItem.id">
              <el-avatar shape="square" :size="36" :src="commentsItem.photo" />
              <div class="comment-info-content">
                <div class="content-head">
                  <div> <span class="comment-info-username">{{ commentsItem.username }}</span> <span
                      class="comment-info-other">{{ dayjs(commentsItem.created_at).format('YYYY.MM.DD.hh.mm') }}</span>
                  </div>
                  <div class="commentInfo-reply">
                    <el-button type="primary" v-removeFocus round size="small"
                      @click="replyComments(commentsItem.id)">回复</el-button>
                  </div>
                </div>
                <!-- 评论内容部分 -->
                <div class="content-info">
                  {{ commentsItem.context }}
                </div>
                <!-- 子评论 -->
                <div class="comment-info-detail" v-for="lowerComments in commentsItem.lowerComments"
                  :key="lowerComments.id">
                  <el-avatar shape="square" :size="36" :src="lowerComments.photo" />
                  <div class="comment-info-content">
                    <div class="content-head">
                      <div> <span class="comment-info-username">{{ lowerComments.username }}</span> <span
                          class="comment-info-other">{{ dayjs(lowerComments.created_at).format('YYYY.MM.DD.hh.mm')
                          }}</span>
                      </div>
                      <div class="commentInfo-reply">
                        <el-tag effect="dark" round v-removeFocus @click="replyComments(lowerComments.id)">
                          回复
                        </el-tag>
                      </div>
                    </div>
                    <!-- 评论内容部分 -->
                    <div class="content-info">
                      <span v-if="lowerComments.comment_user_id != commentsItem.uid"><span class="at-user">@{{
                          lowerComments.comment_user_name
                      }} </span> : </span> {{ lowerComments.context }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 回复评论  dialog-->
        <el-dialog v-model="replyCommentsDialog.show" title="Shipping address">
          <commentPosting :articleID="articleID" :articleInfo="articleInfo" @updateArticleInfo="updateArticleInfo"
            :commentsID="replyCommentsDialog.commentsID"></commentPosting>
        </el-dialog>

      </div>
    </div>
  </div>

</template>

<script setup lang="ts" >
import commentPosting from "@/components/commentPosting/commentPosting.vue"

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import topNavigation from "@/components/topNavigation/topNavigation.vue"
import { useArticleShowProp, useInit } from "@/hooks/creationShow/article/useArticle"
import dayjs from "dayjs"
//代码高亮
import 'highlight.js/styles/agate.css'
import { vRemoveFocus } from "@/utils/customInstruction/focus"
import { onMounted, onUnmounted } from "vue";
import { GetArticleCommentRes } from "@/types/creationShow/article/article"
import { blossom } from "@/utils/effect/blossom"

components: {
  topNavigation
  commentPosting
}

const { articleID, articleInfo, router, route, replyCommentsDialog } = useArticleShowProp()

const updateArticleInfo = (commentsList: GetArticleCommentRes) => {
  //得到的数据
  articleInfo.value.comments = commentsList.comments
  articleInfo.value.comments_number = commentsList.comments_number
}

const replyComments = (commentsID: number) => {
  replyCommentsDialog.commentsID = commentsID
  replyCommentsDialog.show = !replyCommentsDialog.show
}

//樱花动效
const { startSakura, stopp } = blossom()
        
onMounted(async () => {
  startSakura()
  await useInit(articleID, articleInfo, route, router)
})

onUnmounted(()=>{
  stopp()
})

</script>

<style scoped lang="scss">
// 添加相关样式
.article-page {
  height: 100%;
  // background-color: $color-gray-background;

  .head {
    position: fixed;
    top: 0px;
    width: 100%;
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
    max-width: 45%;
    margin: 0 auto;
    padding: 40px 20px;


    .content {
      :deep(img) {
        max-width: 100%;
        border-radius: 5px;
      }

      :deep(pre, code) {
        background-color: rgba(45, 45, 45, 1) !important;
        color: #fafafad7 !important;
        padding: 32px 16px 18px 16px !important;
        overflow-x: auto !important;
        font-size: 16px;
        position: relative;
        border-radius: 5px;
        line-height: 1.6;
        margin-bottom: 1.6em;
        max-width: 100%;
        overflow: auto;
        text-shadow: none;
        box-shadow: 0 10px 10px 0px rgba(0, 0, 0, .4);
      }

      :deep(pre:before) {
        content: " ";
        position: absolute;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        background: #fc625d;
        width: 12px;
        height: 12px;
        left: 12px;
        margin-top: -18px;
        -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
        box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
        z-index: 2;
      }
    }

  }

  .comments-box {
    padding: 12px 15px;

    .comments-head {
      display: flex;
      align-items: center;
      color: #3f9eff;
      font-size: 28px;


      .icon-edit {
        width: 30px;
        height: 30px;
        margin-right: 6px;
      }
    }

    .comments-main {
      margin-top: 14px;
    }

    .comments-show {
      padding-top: 30px;

      .comments-show-titel {
        color: #797979;
        font-size: 18px;
      }

      .comments-show-info {
        padding-top: 20px;

        .comment-info-detail {
          display: flex;
          width: 100%;

          .comment-info-content {
            padding-left: 14px;
            width: 100%;

            .content-head {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .comment-info-username {
                color: #ef794f;
                font-size: 16px;
                font-weight: 600;
                margin-right: 5px;
              }

              .comment-info-other {
                font-size: 14px;
                color: #797979;
              }
            }

            .content-info {
              margin: 15px 0 25px;
              padding: 18px 20px;
              background: #f7f9fe;
              border-radius: 12px;
              color: #000;
              word-break: break-word;

              .at-user {
                color: #03a9f4;
              }
            }

          }

        }
      }
    }
  }
}
</style>